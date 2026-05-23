const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(publicDir, file), 'utf8');

    // Update navigation links
    content = content.replace(
        /<a class="[^"]*?" href="#">Home<\/a>/g,
        (match) => match.replace('href="#"', 'href="/"')
    );
    content = content.replace(
        /<a class="[^"]*?" href="#">Roadmap<\/a>/g,
        (match) => match.replace('href="#"', 'href="/roadmap"')
    );
    content = content.replace(
        /<a class="[^"]*?" href="#">Universities<\/a>/g,
        (match) => match.replace('href="#"', 'href="/universities"')
    );
    content = content.replace(
        /<a class="[^"]*?" href="#">Stay<\/a>/g,
        (match) => match.replace('href="#"', 'href="/stay"')
    );
    content = content.replace(
        /<a class="[^"]*?" href="#">Contact<\/a>/g,
        (match) => match.replace('href="#"', 'href="/contact"')
    );
    
    // Also fix the logo link if any
    content = content.replace(
        /<a class="font-headline-sm text-headline-sm font-bold text-on-background dark:text-surface-bright flex items-center gap-2" href="#">/g,
        '<a class="font-headline-sm text-headline-sm font-bold text-on-background dark:text-surface-bright flex items-center gap-2" href="/">'
    );

    // Footer links
    content = content.replace(
        /<a class="font-body-md text-body-md text-surface-variant\/70 hover:text-tertiary-fixed-dim transition-colors" href="#">Roadmap<\/a>/g,
        '<a class="font-body-md text-body-md text-surface-variant/70 hover:text-tertiary-fixed-dim transition-colors" href="/roadmap">Roadmap</a>'
    );
    content = content.replace(
        /<a class="font-body-md text-body-md text-surface-variant\/70 hover:text-tertiary-fixed-dim transition-colors" href="#">Universities<\/a>/g,
        '<a class="font-body-md text-body-md text-surface-variant/70 hover:text-tertiary-fixed-dim transition-colors" href="/universities">Universities</a>'
    );
    content = content.replace(
        /<a class="font-body-md text-body-md text-surface-variant\/70 hover:text-tertiary-fixed-dim transition-colors" href="#">Stay<\/a>/g,
        '<a class="font-body-md text-body-md text-surface-variant/70 hover:text-tertiary-fixed-dim transition-colors" href="/stay">Stay</a>'
    );
    content = content.replace(
        /<a class="font-body-md text-body-md text-surface-variant\/70 hover:text-tertiary-fixed-dim transition-colors" href="#">Admissions<\/a>/g,
        '<a class="font-body-md text-body-md text-surface-variant/70 hover:text-tertiary-fixed-dim transition-colors" href="/roadmap">Admissions</a>'
    );

    fs.writeFileSync(path.join(publicDir, file), content, 'utf8');
});

console.log('Navigation links updated in all HTML files.');
