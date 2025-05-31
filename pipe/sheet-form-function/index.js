const functions = require('@google-cloud/functions-framework');
const { google } = require('googleapis');
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');
const cors = require('cors')({ origin: true });

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
  cors(req, res, async () => {
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

      const { name, email, message } = req.body;

      await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: 'シート1!A:C',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [[name, email, message]],
        },
      });

      res.status(200).send('Success');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error');
    }
  });
});
