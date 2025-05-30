# Node.js公式イメージ
FROM node:20

# 作業ディレクトリ作成
WORKDIR /usr/src/app

# package.json と package-lock.json をコピーして依存インストール
COPY package*.json ./
RUN npm install

# ソースコードをコピー
COPY . .

# Cloud Runが使うポートを開放
EXPOSE 8080

# アプリ起動
CMD [ "node", "index.js" ]
