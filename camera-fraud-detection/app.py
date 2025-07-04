
import cv2
import exifread
import numpy as np
from PIL import Image
from pathlib import Path
import subprocess
import json
from flask import Flask, request, jsonify
import os

app = Flask(__name__)

# ffprobeのパス
FFPROBE_PATH = "/app/vendor/ffmpeg/bin/ffprobe"  # Herokuでのデフォルトパス

# 既知のセンサー型番リスト
KNOWN_SENSORS = {
    "IMX307": {"resolution": (1920, 1080), "megapixels": 2.0},
    "IMX335": {"resolution": (2592, 1944), "megapixels": 5.0},
    "IMX415": {"resolution": (3840, 2160), "megapixels": 8.0}
}

def analyze_image_sharpness(image):
    """画像のシャープネスを計算"""
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    laplacian = cv2.Laplacian(gray, cv2.CV_64F)
    sharpness = np.var(laplacian)
    return sharpness

def analyze_noise_level(image):
    """画像のノイズレベルを計算"""
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    noise_level = np.std(gray)
    return noise_level

def check_resolution_forgery(image, claimed_resolution):
    """解像度の水増しを検出"""
    height, width = image.shape[:2]
    actual_resolution = (width, height)
    sharpness = analyze_image_sharpness(image)
    noise_level = analyze_noise_level(image)
    resolution_match = actual_resolution == claimed_resolution
    sharpness_threshold = 50
    is_upsampled = sharpness < sharpness_threshold
    return {
        "actual_resolution": actual_resolution,
        "claimed_resolution": claimed_resolution,
        "resolution_match": resolution_match,
        "sharpness": round(sharpness, 2),
        "noise_level": round(noise_level, 2),
        "is_upsampled": is_upsampled
    }

def check_sensor_forgery(exif_data):
    """センサー型番の偽装をチェック"""
    if not exif_data:
        return {"sensor_info": "EXIFデータが見つかりません", "is_suspicious": True}
    model = exif_data.get("Image Model", "不明")
    make = exif_data.get("Image Make", "不明")
    sensor_info = str(exif_data)
    is_suspicious = True
    for sensor, specs in KNOWN_SENSORS.items():
        if sensor in sensor_info:
            is_suspicious = False
            return {
                "sensor_info": f"{make} {model} (センサー: {sensor})",
                "is_suspicious": is_suspicious,
                "expected_specs": specs
            }
    return {
        "sensor_info": f"{make} {model} (センサー情報不明)",
        "is_suspicious": is_suspicious
    }

def get_video_metadata(input_file):
    """ffprobeで動画のメタデータを取得"""
    try:
        cmd = [FFPROBE_PATH, '-v', 'quiet', '-print_format', 'json', '-show_format', '-show_streams', input_file]
        result = subprocess.run(cmd, capture_output=True, text=True, check=True)
        metadata = json.loads(result.stdout)
        return metadata
    except subprocess.CalledProcessError as e:
        return {"error": f"ffprobeエラー: {str(e)}"}
    except FileNotFoundError:
        return {"error": f"ffprobeが見つかりません: {FFPROBE_PATH}"}

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "ファイルが選択されていません"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "ファイル名が空です"}), 400

    # ファイルを一時保存
    upload_dir = "uploads"
    os.makedirs(upload_dir, exist_ok=True)
    file_path = os.path.join(upload_dir, file.filename)
    file.save(file_path)

    result = []
    file_ext = Path(file_path).suffix.lower()
    is_video = file_ext in [".mp4", ".avi", ".mov"]

    if is_video:
        cap = cv2.VideoCapture(file_path)
        if not cap.isOpened():
            os.remove(file_path)
            return jsonify({"error": "動画ファイルを開けませんでした"}), 400
        ret, frame = cap.read()
        if not ret:
            cap.release()
            os.remove(file_path)
            return jsonify({"error": "動画フレームを読み込めませんでした"}), 400
        width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
        claimed_resolution = (width, height)
        cap.release()

        metadata = get_video_metadata(file_path)
        result.append({"section": "動画メタデータ"})
        if "error" in metadata:
            result.append({"error": metadata["error"]})
        else:
            for stream in metadata.get("streams", []):
                if stream.get("codec_type") == "video":
                    result.append({
                        "解像度": f"{stream.get('width')}x{stream.get('height')}",
                        "コーデック": f"{stream.get('codec_name')} ({stream.get('codec_long_name', '不明')})",
                        "フレームレート": stream.get('r_frame_rate'),
                        "カメラ情報": stream.get('tags', {}).get('comment', 'カメラ情報なし')
                    })

        resolution_result = check_resolution_forgery(frame, claimed_resolution)
        result.append({"section": "動画ファイル分析結果"})
        result.append({
            "ファイル": file.filename,
            "実際の解像度": f"{resolution_result['actual_resolution'][0]}x{resolution_result['actual_resolution'][1]}",
            "謳われている解像度": f"{resolution_result['claimed_resolution'][0]}x{resolution_result['claimed_resolution'][1]}",
            "解像度一致": resolution_result['resolution_match'],
            "シャープネス": resolution_result['sharpness'],
            "ノイズレベル": resolution_result['noise_level'],
            "アップスケールの可能性": "高い" if resolution_result['is_upsampled'] else "低い",
            "センサー情報": "動画ファイルのためEXIFデータがありません",
            "注": "センサー情報は動画メタデータに通常含まれません。モデル名やマニュアルを確認してください。"
        })

    else:
        try:
            image = cv2.imread(file_path)
            if image is None:
                os.remove(file_path)
                return jsonify({"error": "画像ファイルを開けませんでした"}), 400
            with open(file_path, "rb") as f:
                exif_data = exifread.process_file(f)
            claimed_width = exif_data.get("EXIF ExifImageWidth", None)
            claimed_height = exif_data.get("EXIF ExifImageLength", None)
            claimed_resolution = (int(claimed_width.values[0]), int(claimed_height.values[0])) if claimed_width and claimed_height else image.shape[:2]
            resolution_result = check_resolution_forgery(image, claimed_resolution)
            result.append({"section": "画像ファイル分析結果"})
            result.append({
                "ファイル": file.filename,
                "実際の解像度": f"{resolution_result['actual_resolution'][0]}x{resolution_result['actual_resolution'][1]}",
                "謳われている解像度": f"{resolution_result['claimed_resolution'][0]}x{resolution_result['claimed_resolution'][1]}",
                "解像度一致": resolution_result['resolution_match'],
                "シャープネス": resolution_result['sharpness'],
                "ノイズレベル": resolution_result['noise_level'],
                "アップスケールの可能性": "高い" if resolution_result['is_upsampled'] else "低い"
            })
            sensor_result = check_sensor_forgery(exif_data)
            result.append({
                "センサー情報": sensor_result['sensor_info'],
                "偽装の可能性": "高い" if sensor_result['is_suspicious'] else "低い",
                "期待されるスペック": sensor_result.get('expected_specs', 'なし')
            })
        except Exception as e:
            os.remove(file_path)
            return jsonify({"error": f"画像処理中にエラーが発生しました: {str(e)}"}), 400

    os.remove(file_path)  # 一時ファイルを削除
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)