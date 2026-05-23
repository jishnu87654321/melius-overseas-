const fs = require('fs');

async function scrape() {
    try {
        const response = await fetch('https://melius-overseas.com/');
        const html = await response.text();
        fs.writeFileSync('home_html.txt', html);
        
        // Let's also fetch what we can find
        const match = html.match(/<script id=\"__NEXT_DATA__\" type=\"application\/json\">(.+?)<\/script>/);
        if(match) {
            fs.writeFileSync('next_data.json', match[1]);
            console.log('Saved next_data.json');
        } else {
            console.log('No Next.js data found');
        }
    } catch(e) {
        console.error(e);
    }
}

scrape();
