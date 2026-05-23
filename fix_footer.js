const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(publicDir, file), 'utf8');

    // 1. Replace logo in Navbar
    // Example: <span class="material-symbols-outlined text-tertiary" style="font-variation-settings: 'FILL' 1;">language</span> Melius Overseas
    // It can also just be Melius.
    content = content.replace(
        /<span class="material-symbols-outlined text-tertiary"[^>]*>language<\/span>\s*Melius(?: Overseas)?/gi,
        '<img src="/logo.png" alt="Melius Overseas" class="h-10 object-contain" />'
    );

    // 2. Replace logo in Footer (where it has text-surface-lowest and text-tertiary-fixed or text-tertiary)
    content = content.replace(
        /<span class="material-symbols-outlined text-tertiary(?:-fixed)?"[^>]*>language<\/span>\s*Melius(?: Overseas)?/gi,
        '<img src="/logo.png" alt="Melius Overseas" class="h-10 object-contain brightness-0 invert" />'
    );

    // 3. Remove "Connect" section
    const connectRegex = /<!-- Contact \/ Social Column -->[\s\S]*?(?=<!-- Copyright Row -->)/i;
    content = content.replace(connectRegex, '');

    // 4. Update grid columns in footer
    content = content.replace(/grid-cols-1 md:grid-cols-4/g, 'grid-cols-1 md:grid-cols-3');
    content = content.replace(/col-span-1 md:col-span-4/g, 'col-span-1 md:col-span-3');

    fs.writeFileSync(path.join(publicDir, file), content);
});

console.log('Fixed header/footer logos and removed connect section.');
