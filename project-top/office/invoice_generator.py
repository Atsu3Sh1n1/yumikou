from fpdf import FPDF
import pandas as pd
import os
from datetime import datetime

class InvoicePDF(FPDF):
    def header(self):
        self.add_japanese_font()
        self.set_font("MS-Gothic", size=16)
        self.cell(0, 10, "請求書", ln=True, align="C")

    def add_invoice(self, client, date, amount, deadline):
        self.set_font("MS-Gothic", size=12)
        self.ln(10)
        self.cell(0, 10, f"顧客名：{client}", ln=True)
        self.cell(0, 10, f"請求日：{date}", ln=True)
        self.cell(0, 10, f"金額：¥{amount:,}", ln=True)
        self.cell(0, 10, f"支払期限：{deadline}", ln=True)

    def add_japanese_font(self):
        # MSゴシックの代わりに msmincho.ttf を使用する
        self.add_font("MS-Gothic", "", "C:\\Windows\\Fonts\\msmincho.ttf", uni=True)

def sanitize_filename(name):
    return "".join(c for c in name if c.isalnum() or c in ('_', '-'))

def generate_invoices(csv_file):
    df = pd.read_csv(csv_file)
    os.makedirs("請求書", exist_ok=True)

    for _, row in df.iterrows():
        pdf = InvoicePDF()
        pdf.add_page()
        pdf.add_invoice(row['顧客名'], row['請求日'], row['金額（税込）'], row['支払期限'])

        bill_date = datetime.strptime(row['請求日'], "%Y/%m/%d").strftime("%Y%m%d")
        filename = f"請求書/請求書_{bill_date}_{sanitize_filename(row['顧客名'])}.pdf"
        pdf.output(filename)
        print(f"{filename} を作成しました")

# 実行
generate_invoices("invoices.csv")
