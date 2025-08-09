#!/usr/bin/env node

import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function generateOGImage() {
  console.log('Generating OG image...');

  let browser;
  try {
    // Paths used for cache validation
    const templatePath = join(__dirname, '../templates/og-template.html');
    const imagePath = join(__dirname, '../images/headshot.PNG');
    const outputDir = join(__dirname, '../static/og');
    const outputPath = join(outputDir, 'og-about.png');

    // If output exists and is newer than its inputs, skip regeneration
    if (existsSync(outputPath)) {
      try {
        const outStat = statSync(outputPath);
        const tplStat = statSync(templatePath);
        const imgStat = statSync(imagePath);
        const isUpToDate = outStat.mtimeMs >= tplStat.mtimeMs && outStat.mtimeMs >= imgStat.mtimeMs;
        if (isUpToDate) {
          console.log(`✓ OG image up-to-date, skipping: ${outputPath}`);
          return outputPath;
        }
      } catch {
        // If any stat check fails, fall through to regenerate
      }
    }

    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
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
    let html = readFileSync(templatePath, 'utf8');

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

    // Replace the hardcoded image path with base64 data
    html = html.replace('../images/headshot.PNG', imageDataUrl);

    // Set HTML content
    await page.setContent(html, {
      waitUntil: 'networkidle0',
    });

    // Wait for fonts and animations to load
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Add 5% zoom by scaling the content
    await page.evaluate(() => {
      document.body.style.transform = 'scale(1.05)';
      document.body.style.transformOrigin = 'center center';
    });

    // Take screenshot
    const screenshot = await page.screenshot({
      type: 'png',
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

    // Write PNG file
    writeFileSync(outputPath, screenshot);

    console.log(`✅ Generated: ${outputPath}`);
    return outputPath;
  } catch (error) {
    console.error('❌ Failed to generate OG image:', error);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateOGImage();
}

export { generateOGImage };
