const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync('scraped_univs.json', 'utf8'));

// Filter out duplicates and invalid ones
const uniqueUnivs = [];
const seenNames = new Set();
for (let i = 0; i < data.names.length; i++) {
  if (data.images[i] && !seenNames.has(data.names[i])) {
    seenNames.add(data.names[i]);
    uniqueUnivs.push({ name: data.names[i], image: data.images[i] });
  }
}

// 1. Update universities.html with Bento Grid
const univHtmlPath = path.join(__dirname, 'public', 'universities.html');
let univHtml = fs.readFileSync(univHtmlPath, 'utf8');

const spans = ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-12'];

let gridCards = uniqueUnivs.map((u, i) => {
  const span = spans[i % spans.length];
  return `
<!-- Card ${i+1} -->
<div class="${span} relative rounded-[24px] overflow-hidden group aspect-[4/5] sm:aspect-auto sm:h-[600px] w-full cursor-pointer hover:shadow-2xl transition-all duration-500">
    <img class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="${u.image}" alt="${u.name}" />
    <div class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"></div>
    
    <div class="absolute top-6 right-6 bg-surface-variant/20 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-surface-lowest/10">
       <span class="text-[#facc15] material-symbols-outlined text-sm">check_circle</span>
       <span class="text-surface-lowest text-xs font-bold uppercase tracking-widest">NMC APPROVED</span>
    </div>

    <div class="absolute bottom-0 left-0 w-full p-8 md:p-12 flex flex-col justify-end">
        <h3 class="font-display-lg text-4xl md:text-5xl text-surface-lowest font-medium mb-4 group-hover:text-[#facc15] transition-colors">${u.name}</h3>

        <div class="flex flex-wrap items-center gap-6 border-t border-surface-variant/20 pt-6">
            <a href="/register" class="inline-flex items-center gap-2 mt-2 text-sm font-semibold text-tertiary hover:text-[#facc15] transition-colors">
                Explore Program <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
            </a>
        </div>
    </div>
</div>
`;
}).join('\n');

const gridStartStr = '<div class="grid grid-cols-1 lg:grid-cols-12 gap-6">';
const sectionEndStr = '</section>'; // The section right after the grid
const gridStartIndex = univHtml.indexOf(gridStartStr);
// Find the first </section> AFTER the grid start
const gridEndIndex = univHtml.indexOf(sectionEndStr, gridStartIndex);

if (gridStartIndex !== -1 && gridEndIndex !== -1) {
  // We need to just close the grid div before closing the section
  univHtml = univHtml.substring(0, gridStartIndex + gridStartStr.length) + '\n' + gridCards + '\n</div>\n' + univHtml.substring(gridEndIndex);
  fs.writeFileSync(univHtmlPath, univHtml);
  console.log('Updated universities.html');
}
