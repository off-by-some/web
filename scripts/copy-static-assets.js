#!/usr/bin/env node

import { access, copyFile, mkdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const assets = [
  {
    from: [
      path.join(rootDir, 'assets/documents/Cassidy-Bridges-Software-Engineering.pdf'),
      path.join(rootDir, 'assets/documents/Cassidy Bridges - Software Engineering.pdf'),
    ],
    to: path.join(rootDir, 'static/resume/Cassidy-Bridges-Software-Engineering.pdf'),
  },
];

async function firstExistingPath(paths) {
  for (const candidate of paths) {
    try {
      await access(candidate);
      return candidate;
    } catch {
      // Keep looking for the next supported source filename.
    }
  }

  throw new Error(
    `None of these source files exist: ${paths.map((file) => path.relative(rootDir, file)).join(', ')}`,
  );
}

async function copyStaticAssets() {
  for (const asset of assets) {
    const from = Array.isArray(asset.from) ? await firstExistingPath(asset.from) : asset.from;

    await mkdir(path.dirname(asset.to), { recursive: true });
    await copyFile(from, asset.to);
    console.log(`✅ Copied ${path.relative(rootDir, asset.to)}`);
  }
}

copyStaticAssets().catch((error) => {
  console.error('❌ Failed to copy static assets:', error);
  process.exit(1);
});
