/* One-shot : génère les 12 variantes (3 photos × 2 tailles × WebP+JPG) dans assets/photos/ */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SRC = path.resolve(__dirname, '..', 'assets');
const OUT = path.resolve(__dirname, '..', 'assets', 'photos');
fs.mkdirSync(OUT, { recursive: true });

const mappings = [
    { src: 'aperogreg.webp',       name: 'photo-1-diner'   },
    { src: 'imagegregapero.webp',  name: 'photo-2-apero'   },
    { src: 'imaggregrepas.webp',   name: 'photo-3-cuisine' },
];

const widths = { '1x': 800, '2x': 1600 };

(async () => {
    for (const m of mappings) {
        const srcPath = path.join(SRC, m.src);
        const meta = await sharp(srcPath).metadata();
        console.log(`\n→ ${m.src}  (${meta.width}×${meta.height})`);
        for (const [tag, w] of Object.entries(widths)) {
            const base = () => sharp(srcPath).resize({ width: w, withoutEnlargement: true });
            const webpPath = path.join(OUT, `${m.name}@${tag}.webp`);
            const jpgPath  = path.join(OUT, `${m.name}@${tag}.jpg`);
            await base().webp({ quality: 82 }).toFile(webpPath);
            await base().jpeg({ quality: 85, mozjpeg: true }).toFile(jpgPath);
            const wSize = (fs.statSync(webpPath).size / 1024).toFixed(0);
            const jSize = (fs.statSync(jpgPath).size / 1024).toFixed(0);
            console.log(`   ${tag.padEnd(2)} → ${m.name}@${tag}.webp (${wSize} KB)  +  .jpg (${jSize} KB)`);
        }
    }
    console.log('\n✓ Toutes les variantes générées dans assets/photos/');
})().catch(e => { console.error('✗ Échec:', e); process.exit(1); });
