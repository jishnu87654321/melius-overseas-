const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(publicDir, file), 'utf8');

    // Remove the page loader div and script
    const loaderRegex = /<!-- Page Loader -->[\s\S]*?<\/script>\s*/i;
    content = content.replace(loaderRegex, '');

    fs.writeFileSync(path.join(publicDir, file), content);
});

console.log('Loader removed from all HTML files.');
