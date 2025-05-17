from flask import Flask, request, send_file, render_template
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.lib.units import mm
import io

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/generate-pdf", methods=["POST"])
def generate_pdf():
    data = request.get_json()

    total = sum([data[k]['subtotal'] for k in ['scaffold', 'weight', 'welding']])

    buffer = io.BytesIO()
    c = canvas.Canvas(buffer, pagesize=A4)
    width, height = A4

    y = height - 30 * mm
    c.setFont("Helvetica-Bold", 14)
    c.drawCentredString(width / 2, y, f"見積金額：￥{total:,}（税抜）")

    y -= 20 * mm
    c.setFont("Helvetica", 12)
    for label, section in [("足場", data["scaffold"]), ("重量", data["weight"]), ("溶接", data["welding"])]:
        c.drawString(20 * mm, y, f"{label}：¥{section['subtotal']:,} ／ 工数: {section['manhour']}人日")
        y -= 10 * mm

    c.save()
    buffer.seek(0)
    return send_file(buffer, as_attachment=True, download_name="見積書.pdf", mimetype="application/pdf")

if __name__ == "__main__":
    app.run(debug=True)
