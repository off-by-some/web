#!/usr/bin/env node

/**
 * Resize images inside a copied static directory.
 * - Operates in-place on the target directory (default: ./static)
 * - If a folder name matches WxH (e.g., 50x50, 150x150), all raster images under that folder
 *   (recursively) are converted to WebP with a max size of WxH, preserving aspect ratio.
 * - After successful conversion, the original raster image is deleted.
 * - SVG files are left untouched.
 * - Folders that do not match WxH are ignored (left as-is, since they were copied from assets).
 */

import { execFile as execFileCallback } from 'child_process';
import { promisify } from 'util';
import { readdir, stat, mkdir, access, unlink } from 'fs/promises';
import { constants as fsConstants } from 'fs';
import { join, extname, basename } from 'path';

const execFile = promisify(execFileCallback);

function isRasterImage(filePath) {
  const ext = extname(filePath).toLowerCase();
  return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
}

function isSvg(filePath) {
  return extname(filePath).toLowerCase() === '.svg';
}

function parseSizeFromDirName(dirName) {
  const match = dirName.match(/^(\d+)x(\d+)$/i);
  if (!match) return null;
  return { width: Number(match[1]), height: Number(match[2]) };
}

async function which(cmd) {
  try {
    await execFile('which', [cmd]);
    return true;
  } catch {
    return false;
  }
}

async function resolveConvertBinary() {
  if (await which('magick')) return 'magick';
  if (await which('convert')) return 'convert';
  throw new Error('ImageMagick is not installed. Install it first (e.g., pacman -S imagemagick)');
}

async function ensureDir(path) {
  try {
    await access(path, fsConstants.F_OK);
  } catch {
    await mkdir(path, { recursive: true });
  }
}

async function fileIsNewer(fileA, fileB) {
  try {
    const a = await stat(fileA);
    const b = await stat(fileB);
    return a.mtimeMs > b.mtimeMs;
  } catch {
    return false;
  }
}

async function convertToWebp(convertBin, srcPath, destPath, width, height) {
  // "WxH>" preserves aspect ratio and only downsizes when larger
  const resizeArg = `${width}x${height}>`;
  const args =
    convertBin === 'magick'
      ? [
          'convert',
          srcPath,
          '-resize',
          resizeArg,
          '-strip',
          '-define',
          'webp:lossless=true',
          '-define',
          'webp:alpha-quality=100',
          '-define',
          'webp:method=6',
          destPath,
        ]
      : [
          srcPath,
          '-resize',
          resizeArg,
          '-strip',
          '-define',
          'webp:lossless=true',
          '-define',
          'webp:alpha-quality=100',
          '-define',
          'webp:method=6',
          destPath,
        ];

  await execFile(convertBin, args);
}

function getActiveSize(currentDir, parentSize) {
  const fromName = parseSizeFromDirName(basename(currentDir));
  if (fromName) return fromName;
  return parentSize || null;
}

async function processFile(rootDir, currentDir, fileName, activeSize, convertBin) {
  if (!activeSize) return;
  const relPath = join(currentDir, fileName);
  const absPath = join(rootDir, relPath);
  if (isSvg(absPath)) return;
  if (!isRasterImage(absPath)) return;
  const fileBase = basename(absPath, extname(absPath));
  const destPath = join(rootDir, currentDir, `${fileBase}.webp`);
  const destNewer = await fileIsNewer(destPath, absPath);
  if (destNewer) {
    if (extname(absPath).toLowerCase() !== '.webp') {
      try {
        await unlink(absPath);
      } catch {}
    }
    return;
  }
  await ensureDir(join(rootDir, currentDir));
  await convertToWebp(convertBin, absPath, destPath, activeSize.width, activeSize.height);
  if (extname(absPath).toLowerCase() !== '.webp') {
    await unlink(absPath);
  }
  console.log(
    `Converted to WebP (${activeSize.width}x${activeSize.height}): ${relPath} -> ${join(currentDir, fileBase + '.webp')}`,
  );
}

async function processDir(rootDir, currentDir, activeSize, convertBin) {
  const abs = join(rootDir, currentDir);
  const entries = await readdir(abs, { withFileTypes: true });
  const thisDirSize = getActiveSize(currentDir, activeSize);
  for (const entry of entries) {
    if (entry.isDirectory()) {
      await processDir(rootDir, join(currentDir, entry.name), thisDirSize, convertBin);
    } else {
      await processFile(rootDir, currentDir, entry.name, thisDirSize, convertBin);
    }
  }
}

export async function resizeStaticImages(targetRoot = join(process.cwd(), 'static')) {
  const convertBin = await resolveConvertBinary();
  await ensureDir(targetRoot);
  await processDir(targetRoot, '.', null, convertBin);
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  (async () => {
    const dirFlagIndex = process.argv.findIndex((arg) => arg === '--dir');
    const targetRoot =
      dirFlagIndex !== -1 && process.argv[dirFlagIndex + 1]
        ? process.argv[dirFlagIndex + 1]
        : join(process.cwd(), 'static');

    try {
      await resizeStaticImages(targetRoot);
      console.log('Image processing complete!');
      return;
    } catch (err) {
      console.error('Error during image processing:', err);
      process.exit(1);
    }
  })();
}
