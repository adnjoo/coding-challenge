import puppeteer from "puppeteer";
import fs from "fs";

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('http://localhost:5173');

  if (!fs.existsSync('../docs')) {
    fs.mkdirSync('../docs');
  }

  await page.screenshot({ path: '../docs/screenshot.png' });

  await browser.close();
})();
