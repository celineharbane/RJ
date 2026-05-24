/* Extract embedded base64 photo from after-work-poster.html → assets/after-work-bg.jpg */
const fs = require('fs');

const SRC = 'd:/rjgreg/after-work-poster.html';
const OUT = 'd:/rjgreg/assets/after-work-bg.jpg';

const html = fs.readFileSync(SRC, 'utf8');

// Locate the data URL inside background-image: url('data:image/jpeg;base64,...')
const m = html.match(/data:image\/jpeg;base64,([A-Za-z0-9+/=]+)/);
if (!m) {
    console.error('No embedded base64 jpeg found in after-work-poster.html');
    process.exit(1);
}

const base64 = m[1];
const buf = Buffer.from(base64, 'base64');
fs.writeFileSync(OUT, buf);

console.log(`Extracted ${buf.length} bytes → ${OUT}`);
console.log(`Base64 source: ${base64.length} chars`);
