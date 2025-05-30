const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

async function authorize() {
  const auth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS || '/secrets/service-account-key.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  return await auth.getClient();
}

app.post('/submit', async (req, res) => {
  try {
    const authClient = await authorize();
    const sheets = google.sheets({ version: 'v4', auth: authClient });

    const spreadsheetId = '<1lW7lVYXdFrgVaFF4j-YEbr2m17yQ7INtOVKrxwkOMss>';
    const values = [
      [
        new Date().toISOString(),
        req.body.name,
        req.body.email,
        req.body.message
      ],
    ];


    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:D',
      valueInputOption: 'RAW',
      requestBody: { values },
    });

    res.status(200).json({ message: 'データ送信成功！' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '送信失敗' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

