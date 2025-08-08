#!/usr/bin/env node

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function generateOGImage() {
  console.log('Generating OG image...');
  
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu'
      ]
    });
    
    const page = await browser.newPage();
    
    // Set viewport to match OG image dimensions
    await page.setViewport({
      width: 1200,
      height: 630,
      deviceScaleFactor: 2 // Higher quality
    });
    
    // Read the HTML template
    const templatePath = join(__dirname, '../templates/og-template.html');
    let html = readFileSync(templatePath, 'utf8');
    
    // Convert image to base64 for high quality and reliable loading
    const imagePath = join(__dirname, '../images/headshot.PNG');
    let imageDataUrl = '';
    try {
      const imageBuffer = readFileSync(imagePath);
      const imageExt = imagePath.split('.').pop().toLowerCase();
      const mimeType = imageExt === 'png' ? 'image/png' : 
                       imageExt === 'jpg' || imageExt === 'jpeg' ? 'image/jpeg' : 
                       imageExt === 'webp' ? 'image/webp' : 'image/png';
      imageDataUrl = `data:${mimeType};base64,${imageBuffer.toString('base64')}`;
      console.log(`✓ Converted ${imagePath} to base64 (${Math.round(imageBuffer.length / 1024)}KB)`);
    } catch (error) {
      console.warn(`⚠️  Failed to load image ${imagePath}:`, error.message);
      imageDataUrl = imagePath; // fallback to original path
    }
    
    // Replace the hardcoded image path with base64 data
    html = html.replace('../images/headshot.PNG', imageDataUrl);
    
    // Set HTML content
    await page.setContent(html, {
      waitUntil: 'networkidle0'
    });
    
    // Wait for fonts and animations to load
    await new Promise(resolve => setTimeout(resolve, 2000));
    
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
        height: 630
      },
      omitBackground: false
    });
    
    // Ensure output directory exists
    const outputDir = join(__dirname, '../static/og');
    mkdirSync(outputDir, { recursive: true });
    
    // Write PNG file
    const outputPath = join(outputDir, 'og-about.png');
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