#!/usr/bin/env node

import {
  existsSync,
  mkdtempSync,
  mkdirSync,
  readFileSync,
  rmSync,
  statSync,
  unlinkSync,
  writeFileSync,
} from 'fs';
import { tmpdir } from 'os';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function generateOGImage() {
  console.log('Generating OG image...');

  let browser;
  let userDataDir;
  try {
    // Paths used for cache validation
    const templatePath = join(__dirname, '../assets/templates/og-template.html');
    const imagePath = join(__dirname, '../assets/images/headshot.png');
    const outputDir = join(__dirname, '../static/og');
    const outputPath = join(outputDir, 'og-about.jpg');
    const stalePngPath = join(outputDir, 'og-about.png');
    const docsOutputPath = join(__dirname, '../docs/og-about.jpg');

    const copyToDocs = () => {
      mkdirSync(dirname(docsOutputPath), { recursive: true });
      writeFileSync(docsOutputPath, readFileSync(outputPath));
      console.log(`✅ Copied: ${docsOutputPath}`);
    };

    // If output exists and is newer than its inputs, skip regeneration
    if (existsSync(outputPath)) {
      try {
        const outStat = statSync(outputPath);
        const tplStat = statSync(templatePath);
        const imgStat = statSync(imagePath);
        const isUpToDate = outStat.mtimeMs >= tplStat.mtimeMs && outStat.mtimeMs >= imgStat.mtimeMs;
        if (isUpToDate) {
          console.log(`✓ OG image up-to-date, skipping: ${outputPath}`);
          copyToDocs();
          return outputPath;
        }
      } catch {
        // If any stat check fails, fall through to regenerate
      }
    }

    userDataDir = mkdtempSync(join(tmpdir(), 'web-og-chrome-'));

    browser = await puppeteer.launch({
      headless: true,
      userDataDir,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-crash-reporter',
        '--disable-breakpad',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu',
      ],
    });

    const page = await browser.newPage();

    // Set viewport to match OG image dimensions
    await page.setViewport({
      width: 1200,
      height: 630,
      deviceScaleFactor: 2, // Higher quality
    });

    // Read the HTML template
    const html = readFileSync(templatePath, 'utf8');

    // Convert image to base64 for high quality and reliable loading
    let imageDataUrl = '';
    try {
      const imageBuffer = readFileSync(imagePath);
      const imageExt = imagePath.split('.').pop().toLowerCase();

      // Extract nested ternary logic into helper functions
      const getMimeType = (ext) => {
        if (ext === 'png') return 'image/png';
        if (ext === 'jpg' || ext === 'jpeg') return 'image/jpeg';
        if (ext === 'webp') return 'image/webp';
        return 'image/png';
      };

      const mimeType = getMimeType(imageExt);
      imageDataUrl = `data:${mimeType};base64,${imageBuffer.toString('base64')}`;
      console.log(
        `✓ Converted ${imagePath} to base64 (${Math.round(imageBuffer.length / 1024)}KB)`,
      );
    } catch (error) {
      console.warn(`⚠️  Failed to load image ${imagePath}:`, error.message);
      imageDataUrl = imagePath; // fallback to original path
    }

    // Set HTML content
    await page.setContent(html, {
      waitUntil: 'networkidle0',
    });

    // Ensure fonts are fully ready before injecting image
    try {
      await page.evaluate(() => (document.fonts ? document.fonts.ready : Promise.resolve()));
    } catch {}

    // Inject the avatar image via DOM and wait for it to load robustly
    await page.evaluate((dataUrl) => {
      const avatarImg = document.querySelector('[data-og-avatar]');
      if (!avatarImg) {
        throw new Error('Missing required [data-og-avatar] element in template');
      }

      return new Promise((resolve, reject) => {
        function handleLoad() {
          resolve(true);
        }
        function handleError() {
          reject(new Error('Avatar image failed to load'));
        }

        avatarImg.addEventListener('load', handleLoad, { once: true });
        avatarImg.addEventListener('error', handleError, { once: true });

        // If the image is cached/instantly available, resolve immediately
        avatarImg.src = dataUrl;
        if (avatarImg.complete && avatarImg.naturalWidth > 0) {
          resolve(true);
        }
      });
    }, imageDataUrl);

    // Small settle delay for layout effects
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Add 5% zoom by scaling the content
    await page.evaluate(() => {
      document.body.style.transform = 'scale(1.05)';
      document.body.style.transformOrigin = 'center center';
    });

    // Take screenshot. JPEG keeps the 2x OG dimensions but avoids shipping a
    // multi-megabyte PNG for social crawlers.
    const screenshot = await page.screenshot({
      type: 'jpeg',
      quality: 92,
      clip: {
        x: 0,
        y: 0,
        width: 1200,
        height: 630,
      },
      omitBackground: false,
    });

    // Ensure output directory exists
    mkdirSync(outputDir, { recursive: true });

    if (existsSync(stalePngPath)) {
      unlinkSync(stalePngPath);
    }

    // Write JPEG file
    writeFileSync(outputPath, screenshot);

    console.log(`✅ Generated: ${outputPath}`);
    copyToDocs();
    return outputPath;
  } catch (error) {
    console.error('❌ Failed to generate OG image:', error);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
    if (userDataDir) {
      rmSync(userDataDir, { recursive: true, force: true });
    }
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateOGImage();
}

export { generateOGImage };
