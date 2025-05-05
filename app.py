from flask import Flask, render_template, g
import sqlite3

app = Flask(__name__)
DATABASE = 'database/database.db'

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

@app.route('/')
def index():
    cur = get_db().cursor()
    cur.execute("SELECT id, title, url, date FROM articles ORDER BY date DESC")
    articles = cur.fetchall()
    return render_template('index.html', articles=articles)

@app.route('/article/<int:article_id>')
def detail(article_id):
    cur = get_db().cursor()
    cur.execute("SELECT title, content, url, date FROM articles WHERE id = ?", (article_id,))
    article = cur.fetchone()
    return render_template('detail.html', article=article)