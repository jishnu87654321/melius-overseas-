const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

const loaderHtml = `
<!-- Smooth Page Loader -->
<style>
  #smooth-loader {
    position: fixed; inset: 0; z-index: 99999;
    background-color: #f8f9fa;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.6s;
  }
  #smooth-loader.hidden {
    opacity: 0; visibility: hidden; pointer-events: none;
  }
  .loader-logo {
    height: 64px;
    object-fit: contain;
    margin-bottom: 32px;
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  .loading-bar-container {
    width: 240px;
    height: 4px;
    background-color: rgba(0, 86, 210, 0.1);
    border-radius: 4px;
    overflow: hidden;
    position: relative;
  }
  .loading-bar {
    position: absolute;
    top: 0; left: 0; bottom: 0;
    width: 40%;
    background-color: #0056d2;
    border-radius: 4px;
    animation: loading-bar-anim 1.5s ease-in-out infinite;
  }
  @keyframes loading-bar-anim {
    0% { transform: translateX(-150%); }
    100% { transform: translateX(350%); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.6; }
  }
</style>
<div id="smooth-loader">
  <img src="/logo.png" alt="Melius Overseas" class="loader-logo" />
  <div class="loading-bar-container">
    <div class="loading-bar"></div>
  </div>
</div>
<script>
  window.addEventListener('load', () => {
    setTimeout(() => {
      const loader = document.getElementById('smooth-loader');
      if (loader) loader.classList.add('hidden');
    }, 150);
  });
</script>
<!-- End Smooth Page Loader -->
`;

files.forEach(file => {
    let content = fs.readFileSync(path.join(publicDir, file), 'utf8');

    const oldLoaderRegex = /<!-- Smooth Page Loader -->[\s\S]*?<!-- End Smooth Page Loader -->\s*/i;
    content = content.replace(oldLoaderRegex, '');

    content = content.replace(/(<body[^>]*>)/i, '$1\n' + loaderHtml);

    fs.writeFileSync(path.join(publicDir, file), content);
});

console.log('Smooth loader added to all HTML files.');
