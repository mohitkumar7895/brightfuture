const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function processAllImages() {
  const backupDir = path.join(process.cwd(), 'public/images/originals_backup');
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  const galleryDir = path.join(process.cwd(), 'public/images/gallery');
  const files = fs.readdirSync(galleryDir).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));

  // Also include hero banner in public/images
  const allTargets = [
    ...files.map(f => ({ dir: galleryDir, name: f, fullPath: path.join(galleryDir, f) })),
    {
      dir: path.join(process.cwd(), 'public/images'),
      name: 'bright-future-toppers-celebration.jpg',
      fullPath: path.join(process.cwd(), 'public/images/bright-future-toppers-celebration.jpg'),
    },
    {
      dir: path.join(process.cwd(), 'public/images'),
      name: 'hero-classroom.jpg',
      fullPath: path.join(process.cwd(), 'public/images/hero-classroom.jpg'),
    }
  ];

  console.log(`Processing ${allTargets.length} images to High Definition (HD)...`);

  for (const target of allTargets) {
    if (!fs.existsSync(target.fullPath)) continue;

    // Backup first if not backed up yet
    const backupPath = path.join(backupDir, target.name);
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(target.fullPath, backupPath);
    }

    const inputBuf = fs.readFileSync(backupPath);
    const meta = await sharp(inputBuf).metadata();

    // Scale up by 2x for full HD resolution, up to max width/height ~2560px
    const scaleFactor = Math.min(2.0, 2560 / Math.max(meta.width, meta.height));
    const targetWidth = Math.round(meta.width * scaleFactor);
    const targetHeight = Math.round(meta.height * scaleFactor);

    console.log(`Enhancing ${target.name}: ${meta.width}x${meta.height} -> ${targetWidth}x${targetHeight} (HD 4:4:4 Quality 100)`);

    const enhancedBuf = await sharp(inputBuf)
      .resize({
        width: targetWidth,
        height: targetHeight,
        kernel: sharp.kernel.lanczos3,
        fit: 'fill',
      })
      .sharpen({
        sigma: 1.1,
        m1: 1.0,
        m2: 2.2,
      })
      .jpeg({
        quality: 100,
        chromaSubsampling: '4:4:4',
        mozjpeg: true,
      })
      .toBuffer();

    fs.writeFileSync(target.fullPath, enhancedBuf);
    console.log(`  ✓ Saved ${target.name}: ${(enhancedBuf.length / 1024).toFixed(1)} KB`);
  }

  console.log('\nAll images successfully converted to High Definition (HD)!');
}

processAllImages().catch(err => {
  console.error('Error enhancing images:', err);
  process.exit(1);
});
