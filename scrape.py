import requests
from bs4 import BeautifulSoup
import sqlite3
import json
from datetime import datetime

DB_PATH = 'database/database.db'

def create_table():
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute('''CREATE TABLE IF NOT EXISTS articles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        content TEXT,
        url TEXT UNIQUE,
        date TEXT
    )''')
    conn.commit()
    conn.close()

def fetch_articles(url):
    articles = []
    res = requests.get(url)
    soup = BeautifulSoup(res.text, 'html.parser')
    if "newpage_00001" in url:
        items = soup.select(".m-grid__item a")
        for item in items[:10]:
            title = item.text.strip()
            href = "https://www.mhlw.go.jp" + item['href']
            date = datetime.now().strftime("%Y-%m-%d")
            articles.append((title, "", href, date))
    elif "0000148322" in url:
        items = soup.select("section ul li a")
        for item in items[:10]:
            title = item.text.strip()
            href = "https://www.mhlw.go.jp" + item['href']
            date = datetime.now().strftime("%Y-%m-%d")
            articles.append((title, "", href, date))
    return articles

def save_articles(articles):
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    for title, content, url, date in articles:
        try:
            cur.execute("INSERT INTO articles (title, content, url, date) VALUES (?, ?, ?, ?)",
                        (title, content, url, date))
        except sqlite3.IntegrityError:
            continue
    conn.commit()
    conn.close()

def main():
    create_table()
    with open('urls.json', 'r', encoding='utf-8') as f:
        urls = json.load(f)
    for url in urls:
        articles = fetch_articles(url)
        save_articles(articles)

if __name__ == '__main__':
    main()