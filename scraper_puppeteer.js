const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  console.log("Navigating to universities page...");
  await page.goto('https://www.melius-overseas.com/universities', { waitUntil: 'networkidle2' });

  // Extract names and images
  const data = await page.evaluate(() => {
    // We try to find cards. Often h3 or specific divs contain names
    const names = Array.from(document.querySelectorAll('h3, h2, .font-bold')).map(el => el.innerText.trim()).filter(text => text.includes('University') || text.includes('Medical'));
    
    // We also look for images inside similar structures
    const images = Array.from(document.querySelectorAll('img')).map(img => img.src).filter(src => src && !src.includes('logo') && !src.includes('brand'));

    return { names, images };
  });

  console.log("Data extracted:", JSON.stringify(data, null, 2));
  fs.writeFileSync('scraped_univs.json', JSON.stringify(data, null, 2));

  await browser.close();
})();
