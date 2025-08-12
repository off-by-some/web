#!/usr/bin/env node

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { dirname, basename, extname } from 'path';
import puppeteer from 'puppeteer';

/**
 * Screenshot HTML content using Puppeteer
 * @param {Object} options - Screenshot options
 * @param {string} [options.htmlPath] - Path to HTML file
 * @param {string} [options.htmlContent] - Direct HTML content string
 * @param {string} options.outputPath - Path where screenshot will be saved
 * @param {Object} [options.viewport] - Viewport configuration
 * @param {number} [options.viewport.width=1200] - Viewport width
 * @param {number} [options.viewport.height=630] - Viewport height
 * @param {number} [options.viewport.deviceScaleFactor=2] - Device scale factor
 * @param {Object} [options.clip] - Screenshot clipping area
 * @param {Function} [options.beforeScreenshot] - Function to run before taking screenshot
 * @param {Object} [options.puppeteerOptions] - Additional Puppeteer launch options
 * @param {Object} [options.screenshotOptions] - Additional screenshot options
 * @returns {Promise<string>} Path to the generated screenshot
 */
export async function screenshotHTML({
  htmlPath,
  htmlContent,
  outputPath,
  viewport = { width: 1200, height: 630, deviceScaleFactor: 2 },
  clip,
  beforeScreenshot,
  puppeteerOptions = {},
  screenshotOptions = {},
}) {
  if (!htmlPath && !htmlContent) {
    throw new Error('Either htmlPath or htmlContent must be provided');
  }

  if (!outputPath) {
    throw new Error('outputPath is required');
  }

  let browser;
  try {
    // Default Puppeteer options for headless screenshot generation
    const defaultPuppeteerOptions = {
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
    };

    browser = await puppeteer.launch({
      ...defaultPuppeteerOptions,
      ...puppeteerOptions,
    });

    const page = await browser.newPage();

    // Set viewport
    await page.setViewport(viewport);

    // Get HTML content
    const html = htmlContent || readFileSync(htmlPath, 'utf8');

    // Set HTML content
    await page.setContent(html, {
      waitUntil: 'networkidle0',
    });

    // Ensure fonts are fully ready
    try {
      await page.evaluate(() => (document.fonts ? document.fonts.ready : Promise.resolve()));
    } catch {}

    // Run any custom setup before screenshot
    if (beforeScreenshot && typeof beforeScreenshot === 'function') {
      await beforeScreenshot(page);
    }

    // Default screenshot options
    const defaultScreenshotOptions = {
      type: 'png',
      omitBackground: false,
    };

    // Add clipping if specified
    if (clip) {
      defaultScreenshotOptions.clip = clip;
    }

    // Take screenshot
    const screenshot = await page.screenshot({
      ...defaultScreenshotOptions,
      ...screenshotOptions,
    });

    // Ensure output directory exists
    mkdirSync(dirname(outputPath), { recursive: true });

    // Write file
    writeFileSync(outputPath, screenshot);

    return outputPath;
  } catch (error) {
    console.error('❌ Failed to generate screenshot:', error);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

/**
 * Screenshot a live URL using Puppeteer
 * @param {Object} options - Screenshot options
 * @param {string} options.url - URL to screenshot
 * @param {string} options.outputPath - Path where screenshot will be saved
 * @param {Object} [options.viewport] - Viewport configuration
 * @param {number} [options.viewport.width=1200] - Viewport width
 * @param {number} [options.viewport.height=630] - Viewport height
 * @param {number} [options.viewport.deviceScaleFactor=2] - Device scale factor
 * @param {Object} [options.clip] - Screenshot clipping area
 * @param {Function} [options.beforeScreenshot] - Function to run before taking screenshot
 * @param {Object} [options.puppeteerOptions] - Additional Puppeteer launch options
 * @param {Object} [options.screenshotOptions] - Additional screenshot options
 * @returns {Promise<string>} Path to the generated screenshot
 */
export async function screenshotURL({
  url,
  outputPath,
  viewport = { width: 1200, height: 630, deviceScaleFactor: 2 },
  clip,
  beforeScreenshot,
  puppeteerOptions = {},
  screenshotOptions = {},
}) {
  if (!url) {
    throw new Error('url is required');
  }

  if (!outputPath) {
    throw new Error('outputPath is required');
  }

  let browser;
  try {
    // Default Puppeteer options for headless screenshot generation
    const defaultPuppeteerOptions = {
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
    };

    browser = await puppeteer.launch({
      ...defaultPuppeteerOptions,
      ...puppeteerOptions,
    });

    const page = await browser.newPage();

    // Set viewport
    await page.setViewport(viewport);

    // Navigate to the URL
    await page.goto(url, {
      waitUntil: 'networkidle0',
    });

    // Ensure fonts are fully ready
    try {
      await page.evaluate(() => (document.fonts ? document.fonts.ready : Promise.resolve()));
    } catch {}

    // Run any custom setup before screenshot
    if (beforeScreenshot && typeof beforeScreenshot === 'function') {
      await beforeScreenshot(page);
    }

    // Default screenshot options
    const defaultScreenshotOptions = {
      type: 'png',
      omitBackground: false,
    };

    // Add clipping if specified
    if (clip) {
      defaultScreenshotOptions.clip = clip;
    }

    // Take screenshot
    const screenshot = await page.screenshot({
      ...defaultScreenshotOptions,
      ...screenshotOptions,
    });

    // Ensure output directory exists
    mkdirSync(dirname(outputPath), { recursive: true });

    // Write file
    writeFileSync(outputPath, screenshot);

    return outputPath;
  } catch (error) {
    console.error('❌ Failed to generate screenshot:', error);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// CLI functionality
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage: node screenshot.js <html-file> [output-file]');
    console.log('  html-file: Path to HTML file to screenshot');
    console.log('  output-file: Optional output path (defaults to <html-file>.png)');
    process.exit(1);
  }

  const htmlPath = args[0];
  let outputPath = args[1];

  // Generate default output path if not provided
  if (!outputPath) {
    const name = basename(htmlPath, extname(htmlPath));
    outputPath = `${name}.png`;
  }

  console.log(`Screenshotting ${htmlPath} to ${outputPath}...`);

  try {
    const result = await screenshotHTML({
      htmlPath,
      outputPath,
    });

    console.log(`✅ Screenshot saved: ${result}`);
  } catch (error) {
    console.error('❌ Failed to screenshot HTML:', error.message);
    process.exit(1);
  }
}

// Run CLI if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
