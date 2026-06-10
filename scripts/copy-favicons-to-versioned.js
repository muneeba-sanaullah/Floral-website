#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';

const publicDir = path.resolve('./public');
const files = [
  'logo.png',
  'favicon-16.png',
  'favicon-32.png',
  'favicon-48.png',
  'favicon-96.png',
  'favicon-192.png',
  'favicon-512.png'
];

async function run() {
  await fs.mkdir(publicDir, { recursive: true });
  for (const f of files) {
    const src = path.join(publicDir, f);
    const dest = path.join(publicDir, f.replace('.png', '.v2.png'));
    try {
      await fs.copyFile(src, dest);
      console.log(`Copied ${src} -> ${dest}`);
    } catch (e) {
      console.warn(`Skipping ${src} (not found)`);
    }
  }
}

run().catch(err => { console.error(err); process.exit(1); });
