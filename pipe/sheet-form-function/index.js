const functions = require('@google-cloud/functions-framework');
const { google } = require('googleapis');
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');

const SPREADSHEET_ID = '1lW7lVYXdFrgVaFF4j-YEbr2m17yQ7INtOVKrxwkOMss';

// Secret Managerからサービスアカウントキーを取得
async function getServiceAccountKey() {
  const client = new SecretManagerServiceClient();
  const [version] = await client.accessSecretVersion({
    name: 'projects/steel-flare-461415-t2/secrets/service-account-key/versions/latest',
  });
  const payload = version.payload.data.toString('utf8');
  return JSON.parse(payload);
}

functions.http('submitForm', async (req, res) => {
  // CORSヘッダーを付与
  res.set('Access-Control-Allow-Origin', '*');  // 必要なら特定オリジンだけ許可
  res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  // プリフライトリクエストの処理
  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  try {
    const key = await getServiceAccountKey();

    const auth = new google.auth.GoogleAuth({
      credentials: key,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: client });

    const data = req.body.data;

    if (!Array.isArray(data) || data.length === 0) {
      res.status(400).send('Invalid data');
      return;
    }

    const values = data.map(item => [
      item.name || '',
      item.email || '',
      item.message || ''
    ]);

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'シート1!A:C',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: values,
      },
    });

    res.status(200).send('Success');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error');
  }
});
