const { google } = require('googleapis');
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const sheets = google.sheets('v4');

async function authorize() {
  const auth = new google.auth.GoogleAuth({
    keyFile: 'service-account-key.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  return await auth.getClient();
}

app.post('/submit', async (req, res) => {
  try {
    const authClient = await authorize();
    const spreadsheetId = 'steel-flare-461415-t2';
    const values = [
      [
        new Date().toISOString(),
        req.body.name,
        req.body.email,
        req.body.message
      ],
    ];
    await sheets.spreadsheets.values.append({
      auth: authClient,
      spreadsheetId,
      range: 'Sheet1!A:D',
      valueInputOption: 'RAW',
      requestBody: { values },
    });
    res.status(200).send({ message: 'データ送信成功！' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: '送信失敗' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
