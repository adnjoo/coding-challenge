import puppeteer from 'puppeteer';
import fs from 'fs';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('http://localhost:5173');

  // Select the third option from a select with id="collections"
  await page.select('#collections', 'The Potatoz');

  if (!fs.existsSync('../docs')) {
    fs.mkdirSync('../docs');
  }

  await page.screenshot({ path: '../docs/screenshot.png' });

  await browser.close();
})();
