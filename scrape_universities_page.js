const fs = require('fs');

async function fetchUniversities() {
  try {
    const res = await fetch('https://www.melius-overseas.com/universities');
    if (!res.ok) {
        console.log('Failed to fetch:', res.status);
        return;
    }
    const html = await res.text();
    fs.writeFileSync('universities_page.html', html);
    
    const match = html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]+?)<\/script>/);
    if (match) {
        fs.writeFileSync('universities_next_data.json', match[1]);
        console.log('Saved Next.js data!');
    } else {
        console.log('No Next.js data found on universities page');
    }
  } catch (err) {
    console.error(err);
  }
}
fetchUniversities();
