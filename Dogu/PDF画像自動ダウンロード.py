import os
import time
import requests
import fitz  # PyMuPDF

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager


URL = "https://acrobat.adobe.com/id/urn:aaid:sc:AP:a9072c27-fa59-482c-9b18-fff34fa86133?viewer!megaVerb=group-edit"

# ★ デスクトップに保存（分かりやすく）
OUTPUT_DIR = os.path.join(os.path.expanduser("~"), "Desktop", "pdf_images")
PDF_PATH = os.path.join(OUTPUT_DIR, "temp.pdf")


# ===== PDF URL取得 =====
def get_pdf_url(url):
    options = Options()
    options.add_argument("--headless")

    options.set_capability("goog:loggingPrefs", {"performance": "ALL"})

    driver = webdriver.Chrome(
        service=Service(ChromeDriverManager().install()),
        options=options
    )

    driver.get(url)
    time.sleep(10)  # 少し長めに待つ

    logs = driver.get_log("performance")

    pdf_url = None

    for log in logs:
        message = log["message"]

        if ".pdf" in message and "http" in message:
            start = message.find("http")
            end = message.find(".pdf") + 4
            pdf_url = message[start:end]
            break

    driver.quit()
    return pdf_url


# ===== PDFダウンロード =====
def download_pdf(pdf_url):
    headers = {"User-Agent": "Mozilla/5.0"}
    res = requests.get(pdf_url, headers=headers)
    res.raise_for_status()

    with open(PDF_PATH, "wb") as f:
        f.write(res.content)


# ===== ページを画像化 =====
def extract_images():
    doc = fitz.open(PDF_PATH)

    for i in range(len(doc)):
        page = doc[i]

        # ★ 高画質（3倍）
        mat = fitz.Matrix(3, 3)
        pix = page.get_pixmap(matrix=mat)

        filename = os.path.join(OUTPUT_DIR, f"page_{i+1}.png")
        pix.save(filename)

    print(f"{len(doc)}ページ → 画像化完了")


# ===== 実行 =====
if __name__ == "__main__":
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    print("PDF URL取得中...")
    pdf_url = get_pdf_url(URL)

    if not pdf_url:
        print("PDF URL取得失敗 → 手動DLした方が早いパターン")
        exit()

    print("PDFダウンロード中...")
    download_pdf(pdf_url)

    print("画像生成中...")
    extract_images()

    print(f"完了 → 保存先: {OUTPUT_DIR}")