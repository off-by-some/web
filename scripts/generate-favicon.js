#!/usr/bin/env node

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceImage = path.join(__dirname, '../assets/images/headshot.png');
const outputDir = path.join(__dirname, '../static');

// Favicon sizes and formats
const faviconSizes = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 48, name: 'favicon-48x48.png' },
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 192, name: 'icon-192x192.png' },
  { size: 32, name: 'favicon.ico', format: 'ico' },
  { size: 32, name: 'favicon.jpg', format: 'jpeg' },
];

function circleMask(size) {
  return Buffer.from(
    `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#fff"/>
    </svg>`,
  );
}

function circularHeadshot(size) {
  return sharp(sourceImage)
    .resize(size, size, {
      fit: 'cover',
      position: 'center',
    })
    .composite([{ input: circleMask(size), blend: 'dest-in' }]);
}

async function generateFavicon() {
  try {
    console.log('🎨 Generating favicons...');

    // Check if source image exists
    try {
      await fs.access(sourceImage);
    } catch {
      console.error(`❌ Source image not found: ${sourceImage}`);
      console.error('Please ensure assets/images/headshot.png exists');
      process.exit(1);
    }

    // Ensure output directory exists
    try {
      await fs.access(outputDir);
    } catch {
      await fs.mkdir(outputDir, { recursive: true });
    }

    // Generate favicons for each size and format
    for (const favicon of faviconSizes) {
      const outputPath = path.join(outputDir, favicon.name);

      console.log(`📐 Generating ${favicon.name} (${favicon.size}x${favicon.size})...`);

      let processedImage = circularHeadshot(favicon.size);

      // Apply format-specific processing
      if (favicon.format === 'ico') {
        processedImage = processedImage.png();
      } else if (favicon.format === 'jpeg') {
        processedImage = processedImage.flatten({ background: '#0a0a0a' }).jpeg({ quality: 90 });
      } else {
        processedImage = processedImage.png();
      }

      // Save the favicon
      await processedImage.toFile(outputPath);
      console.log(`✅ Generated ${favicon.name}`);
    }

    console.log('🎉 All favicons generated successfully!');
    console.log(`📍 Location: ${outputDir}`);

    // Generate favicon.ico (multi-size ICO file)
    console.log('📦 Generating multi-size favicon.ico...');
    const ico32 = await circularHeadshot(32).png().toBuffer();

    // For now, we'll just copy the 32x32 as favicon.ico since creating a proper multi-size ICO is complex
    // In production, you might want to use a library like 'to-ico' for proper ICO generation
    await fs.writeFile(path.join(outputDir, 'favicon.ico'), ico32);
    console.log('✅ Generated favicon.ico');
  } catch (error) {
    console.error('❌ Error generating favicons:', error);
    process.exit(1);
  }
}

// Run the script
generateFavicon();
