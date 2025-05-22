from flask import Flask, render_template
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

def get_price():
    url = "https://www.monotaro.com/g/00022342/"
    headers = {"User-Agent": "Mozilla/5.0"}
    res = requests.get(url, headers=headers)
    soup = BeautifulSoup(res.text, "lxml")
    price_tag = soup.select_one("span.Price.Price--Md")
    if price_tag:
        return price_tag.text.strip()
    else:
        return "価格が見つかりませんでした"

@app.route("/")
def index():
    price = get_price()
    return render_template("index.html", price=price)

if __name__ == "__main__":
    app.run(debug=True)
