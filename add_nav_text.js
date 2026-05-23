const fs = require('fs');
const path = require('path');
const publicDir = path.join(__dirname, 'public');

const htmlFiles = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

htmlFiles.forEach(file => {
    let filePath = path.join(publicDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // We look for the anchor tag with the logo img and optionally an existing span (in case we run it multiple times).
    // The exact string in index.html is:
    // <a class="font-headline-sm text-headline-sm font-bold text-on-background dark:text-surface-bright flex items-center gap-2" href="/">
    // <img src="/logo.png" alt="Melius Overseas" class="h-10 object-contain" />
    // </a>
    // We want to safely insert Melius Overseas after the image if it's not already there.

    // Regex to match the nav brand anchor tag
    // It captures everything up to the <img> tag
    const regex = /(<a[^>]*href="\/"[^>]*>\s*<img[^>]*src="\/logo\.png"[^>]*>)\s*<\/a>/i;
    
    if (regex.test(content)) {
        content = content.replace(regex, '$1\n<span>Melius Overseas</span>\n</a>');
        fs.writeFileSync(filePath, content);
        console.log(`Updated nav text in ${file}`);
    } else {
        console.log(`Could not find matching nav brand pattern in ${file}`);
    }
});
