#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import toIco from 'to-ico';

const argv = process.argv.slice(2);
const input = argv[0] || './public/logo.png';
const outDir = argv[1] || './public';

const sizes = [16, 32, 48, 64, 96, 128, 180, 192, 256, 512];

async function fileExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch (e) {
    return false;
  }
}

async function run() {
  const resolvedInput = path.resolve(input);
  const resolvedOut = path.resolve(outDir);

  if (!(await fileExists(resolvedInput))) {
    console.error(`Input file not found: ${resolvedInput}`);
    process.exit(1);
  }

  try {
    await fs.mkdir(resolvedOut, { recursive: true });
  } catch (e) {}

  const generated = [];
  for (const s of sizes) {
    const outPath = path.join(resolvedOut, `favicon-${s}.png`);
    await sharp(resolvedInput)
      .resize(s, s, { fit: 'cover' })
      .png({ compressionLevel: 9 })
      .toFile(outPath);
    generated.push(outPath);
    console.log(`Generated ${outPath}`);
  }

  // Create favicon.ico from a subset of sizes (16,32,48,64)
  try {
    const icoSizes = [16, 32, 48, 64];
    const icoSourcesPaths = icoSizes.map((s) => path.join(resolvedOut, `favicon-${s}.png`));
    const icoBuffers = await Promise.all(icoSourcesPaths.map((p) => fs.readFile(p)));
    const icoBuffer = await toIco(icoBuffers);
    const icoPath = path.join(resolvedOut, 'favicon.ico');
    await fs.writeFile(icoPath, icoBuffer);
    console.log(`Generated ${icoPath}`);
  } catch (err) {
    console.warn('Failed to generate favicon.ico:', err.message || err);
  }

  console.log('Favicon generation complete. Place the generated files in your public/ directory or commit them.');
}

run().catch(err => {
  console.error('Favicon generation failed:', err);
  process.exit(1);
});
