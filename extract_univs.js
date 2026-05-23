const fs = require('fs');
const content = fs.readFileSync('C:\\Users\\jishn\\.gemini\\antigravity\\brain\\9d521dca-ad56-49aa-bf83-f4f554d957e1\\.system_generated\\steps\\702\\content.md', 'utf8');

// The data is inside __next_f.push arrays which contain serialized JSON.
// Let's just use a regex to find typical university names:
const matches = content.match(/[A-Z][a-zA-Z\s\-]+ University/g);
const matches2 = content.match(/University of [A-Z][a-zA-Z\s\-]+/g);
const matches3 = content.match(/[A-Z][a-zA-Z\s\-]+ Medical [A-Z][a-zA-Z\s\-]+/g);

const all = new Set([
  ...(matches || []),
  ...(matches2 || []),
  ...(matches3 || [])
]);

console.log(Array.from(all));
