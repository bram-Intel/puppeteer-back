const puppeteer = require('puppeteer');

async function scrapeChannel(url) {

	const browser = await puppeteer.launch();
	const page = await browser.newPage();
    const option1 = {
    	path: 'images.png',
    	fullPage: false,
    	omitBackground: true

    }
    const option2 = {
    	 path: 'bow.pdf',
    	 format: 'A4'
    }

	await page.goto(url);
	await page.screenshot(option1)
	await page.pdf(option2)

	const [element] = await page.$x('//*[@id="video-title"]');
	const text = await element.getProperty('textContent');
	const name = await text.jsonValue();

   const [element2] = await page.$x('/html/body/ytd-app/div/ytd-page-manager/ytd-browse/ytd-two-column-browse-results-renderer/div[1]/ytd-rich-grid-renderer/div[6]/ytd-rich-item-renderer[1]/div/ytd-rich-grid-media/div[1]/ytd-thumbnail/a/yt-img-shadow/img');
	const src = await element2.getProperty('src');
	const image = await src.jsonValue();

    browser.close();

  return {name , image}   
} 

module.exports = {
	  scrapeChannel
}
