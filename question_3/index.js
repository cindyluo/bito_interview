const puppeteer = require('puppeteer');
const { google } = require('googleapis');

main();

async function main() {
  const bitoFeesURL = 'https://www.bitopro.com/ns/fees';
  const vipLevels = await vipLevelCrawler(bitoFeesURL);
  saveData(vipLevels);
}

async function vipLevelCrawler(URL) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(URL);
  const vipLevels = await page.evaluate(() => {
    const vipStr = document.querySelectorAll(
      '#__next > div.sc-45d5b270-0.jaOrsi.site-layout > div.sc-ae3accfd-0.sc-fdc560d0-0.hablgR > div > div > div.sc-ae3accfd-0.dQulAq > div:nth-child(1) > div:nth-child(4) > table'
    );
    const vipRows = vipStr[0].innerText.split('\n');
    const vipResults = vipRows.map((vipRow) => vipRow.split('\t'));
    return vipResults;
  });
  await browser.close();
  return vipLevels;
}

async function saveData(data) {
  const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const authClientObject = await auth.getClient();
  const sheets = google.sheets({
    version: 'v4',
    auth: authClientObject,
  });

  await sheets.spreadsheets.values.append({
    spreadsheetId: '1NoXtyvtrxVpCQvWMmueuM5Qy-ef7X6l56dLrttzgIIc',
    range: 'VIP!A1',
    valueInputOption: 'USER_ENTERED',
    resource: {
      values: data,
    },
  });
}