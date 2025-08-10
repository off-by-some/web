#!/usr/bin/env node

/**
 * Orchestrates static generation:
 * 1) Cleans and copies ./assets -> ./static (preserving structure)
 * 2) Runs OG image generation (which reads from assets)
 */

import { execFile as execFileCallback } from 'child_process';
import { promisify } from 'util';
import { rmSync, mkdirSync, cpSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const execFile = promisify(execFileCallback);
const __filename = fileURLToPath(import.meta.url);
const __dirname = __filename.substring(0, __filename.lastIndexOf('/'));

async function run(cmd, args, options = {}) {
  await execFile(cmd, args, { stdio: 'inherit', ...options });
}

async function copyAssetsToStatic() {
  const assetsDir = join(__dirname, '..', 'assets');
  const staticDir = join(__dirname, '..', 'static');

  // Clean static
  rmSync(staticDir, { recursive: true, force: true });
  mkdirSync(staticDir, { recursive: true });

  // Copy using Node's fs.cpSync for portability
  cpSync(assetsDir, staticDir, { recursive: true });
}

export async function generateStatic() {
  await copyAssetsToStatic();
  // Generate OG images
  await run('node', [join(__dirname, 'generate-og-images.js')]);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  generateStatic().catch((err) => {
    console.error('Failed to generate static:', err);
    process.exit(1);
  });
}
