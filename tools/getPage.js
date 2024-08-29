import puppeteer from "puppeteer";

export async function getChallengeInfo(url) {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();

  await page.goto(url);

  const description = await getElementContent(page, ".elfjS");
  const title = await getElementContent(page, ".text-title-large");
  const difficulty = await getElementContent(page, 'div[class*="text-difficulty-"]');

  await browser.close();

  return {
    title,
    difficulty,
    description
  }
}

async function getElementContent(page, selector) {
  await page.waitForSelector(selector);

  const element = await page.$(selector);

  return await page.evaluate((el) => el.textContent, element);
}
