/**
 * convert-images.mjs
 * Compresses all photos in src/assets/photos → public/photos as WebP.
 * Preserves filename stem, outputs <stem>.webp
 * Run: node scripts/convert-images.mjs
 */

import sharp from 'sharp'
import { readdir, mkdir } from 'fs/promises'
import { join, basename, extname } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SRC = join(__dirname, '../src/assets/photos')
const OUT = join(__dirname, '../public/photos')

await mkdir(OUT, { recursive: true })

const files = await readdir(SRC)
const images = files.filter(f => /\.(jpe?g|png|webp|JPG|JPEG|PNG)$/i.test(f))

// Per-file configuration — maps source filename → output settings
// quality 82 = excellent visual quality, typically 150–400 KB for a portrait
const CONFIG = {
  // Bride portrait — tall crop, 1200px on longest side
  'keerthana.jpg':       { width: 1200, suffix: 'keerthana' },
  // Groom portrait
  'Vasanth.jpg':         { width: 1200, suffix: 'vasanth' },
  // Couple photo together
  'Couple-photo.jpg':    { width: 1400, suffix: 'couple' },
  // Both families combined
  'Both-family.jpeg':    { width: 1400, suffix: 'both-family' },
  // Keerthana family
  'Keerthana-family.jpeg': { width: 1400, suffix: 'keerthana-family' },
  // Vasanth family
  'Vasanth-family.jpeg': { width: 1400, suffix: 'vasanth-family' },
  // Welcome / entrance photo — used as venue or hero bg
  'Welcome-photo.jpeg':  { width: 1400, suffix: 'welcome' },
  // DSC raw copy
  'DSC04215.JPG copy.jpg': { width: 1400, suffix: 'memory-1' },
  // Couple with Continental GT
  'gt.png':                { width: 1200, suffix: 'gt' },
  // Ring ceremony — editorial portrait crop for ceremony section
  'ring.jpg':              { width: 1200, suffix: 'ring-portrait' },
  // Proposal photo
  'proposal.jpg':          { width: 1400, suffix: 'proposal' },
  // Groom extended family
  'Groom-family.jpg':      { width: 1400, suffix: 'groom-family' },
  // Bride extended family
  'Bride-family.jpg':      { width: 1400, suffix: 'bride-family' },
  // Bride family 2
  "bride's-family2.jpg":   { width: 1400, suffix: 'bride-family-2' },
  // Couples cake cutting celebration
  'couples.JPG':           { width: 1400, suffix: 'couples' },
  // Bride relatives and elders
  'brides-relatives.JPG':  { width: 1400, suffix: 'bride-relatives' },
  // Vishwa with sister Keerthana
  'viee-kee.png':          { width: 800, suffix: 'viee-kee' },
  'vishwa.png':            { width: 800, suffix: 'vishwa' },
}

console.log(`\n📸  Converting ${images.length} images → public/photos/\n`)

for (const file of images) {
  const cfg = CONFIG[file] ?? { width: 1400, suffix: basename(file, extname(file)).toLowerCase().replace(/\s+/g, '-') }
  const srcPath = join(SRC, file)
  const outName = `${cfg.suffix}.webp`
  const outPath = join(OUT, outName)

  try {
    const info = await sharp(srcPath)
      .rotate()                          // auto-rotate from EXIF
      .resize({ width: cfg.width, withoutEnlargement: true })
      .webp({ quality: 82, effort: 4 }) // effort 4 = good compression speed balance
      .toFile(outPath)

    const sizeMB = (info.size / 1024 / 1024).toFixed(2)
    console.log(`  ✓  ${file.padEnd(32)} →  ${outName.padEnd(24)} ${info.width}×${info.height}  ${sizeMB} MB`)
  } catch (err) {
    console.error(`  ✗  ${file}  ERROR: ${err.message}`)
  }
}

console.log('\n✅  Done. Images are in public/photos/\n')
