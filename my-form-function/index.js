const { google } = require('googleapis');

exports.submitForm = async (req, res) => {
  // CORS対応
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  try {
    const data = req.body;

    const auth = new google.auth.GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: client });

    const spreadsheetId = '1lW7lVYXdFrgVaFF4j-YEbr2m17yQ7INtOVKrxwkOMss'; // ←あなたのID

    const values = [
      [
        data.receiver || '',
        data.author || '',
        data.project || '',
        data.content || '',
        data.environment || '',
        data.result || '',
        new Date().toISOString()
      ],
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:G', // カラム範囲に合わせる
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: values,
      },
    });

    res.status(200).json({ message: 'データが保存されました！' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '保存中にエラーが発生しました。' });
  }
};
