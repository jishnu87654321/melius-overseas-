const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

const loaderHTML = `
<!-- Page Loader -->
<div id="page-loader" class="fixed inset-0 z-[9999] bg-surface flex items-center justify-center transition-opacity duration-700">
    <img src="/logo.png" alt="Loading" class="h-24 animate-pulse drop-shadow-md" />
</div>
<script>
    window.addEventListener('load', () => {
        const loader = document.getElementById('page-loader');
        if(loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 700);
        }
    });
</script>
`;

files.forEach(file => {
    let content = fs.readFileSync(path.join(publicDir, file), 'utf8');

    // Add loader after <body class="...">
    if (!content.includes('id="page-loader"')) {
        content = content.replace(/(<body[^>]*>)/i, `$1\n${loaderHTML}`);
    }

    // Replace navbar logo
    const navLogoRegex = /<a[^>]*href="\/[^>]*>[\s\S]*?<span[^>]*material-symbols-outlined[^>]*>public<\/span>[\s\S]*?Melius Overseas[\s\S]*?<\/a>/i;
    content = content.replace(navLogoRegex, `<a href="/" class="flex items-center gap-2"><img src="/logo.png" alt="Melius Overseas" class="h-10 object-contain" /></a>`);
    
    const navLogoRegex2 = /<a class="font-headline-sm[^>]*href="\/">[\s\S]*?<span[^>]*material-symbols-outlined[^>]*>public<\/span>[\s\S]*?Melius Overseas[\s\S]*?<\/a>/i;
    content = content.replace(navLogoRegex2, `<a href="/" class="flex items-center gap-2"><img src="/logo.png" alt="Melius Overseas" class="h-10 object-contain" /></a>`);

    // Replace footer logo
    const footerLogoRegex = /<a[^>]*href="#"[^>]*>[\s\S]*?<span[^>]*material-symbols-outlined[^>]*>public<\/span>[\s\S]*?Melius[\s\S]*?<\/a>/i;
    content = content.replace(footerLogoRegex, `<a href="/" class="block mb-4"><img src="/logo.png" alt="Melius Overseas" class="h-10 object-contain brightness-0 invert" /></a>`);

    fs.writeFileSync(path.join(publicDir, file), content);
});

console.log('Logos and loaders updated.');
