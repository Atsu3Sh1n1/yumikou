import requests
from bs4 import BeautifulSoup

url = "https://www.monotaro.com/g/00022342/"
headers = {"User-Agent": "Mozilla/5.0"}

res = requests.get(url, headers=headers)
soup = BeautifulSoup(res.text, "lxml")

# 「Price Price--Md」クラスの<span>を取得
price_tag = soup.select_one("span.Price.Price--Md")

if price_tag:
    print("価格：", price_tag.text.strip())
else:
    print("価格が見つかりませんでした")
