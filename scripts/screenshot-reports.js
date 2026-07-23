#!/usr/bin/env node

import { readdirSync, statSync } from 'fs';
import { join, extname } from 'path';
import { screenshotHTML } from './screenshot.js';

/**
 * Find the first HTML file in a directory
 * @param {string} dirPath - Directory path to search
 * @returns {string|null} Path to first HTML file found, or null if none found
 */
function findFirstHtmlFile(dirPath) {
  try {
    const files = readdirSync(dirPath);

    // Sort files to ensure consistent ordering (alphabetical)
    const sortedFiles = files.sort();

    for (const file of sortedFiles) {
      const filePath = join(dirPath, file);
      const stats = statSync(filePath);

      // Check if it's a file and has .html extension
      if (stats.isFile() && extname(file).toLowerCase() === '.html') {
        return filePath;
      }
    }

    return null;
  } catch (error) {
    console.error(`❌ Error reading directory ${dirPath}:`, error.message);
    return null;
  }
}

/**
 * Screenshot reports from bundle-stats and lighthouseci directories
 */
async function screenshotReports() {
  console.log('📸 Starting report screenshots...\n');

  const reports = [
    {
      name: 'bundle-stats',
      dir: '.bundle-stats',
      outputName: 'bundle-stats-report',
      viewport: { width: 1000, height: 250, deviceScaleFactor: 1 },
    },
    {
      name: 'lighthouseci',
      dir: 'metrics/lhci',
      outputName: 'lighthouse-report',
      viewport: { width: 1000, height: 800, deviceScaleFactor: 1 },
    },
  ];

  for (const report of reports) {
    console.log(`🔍 Looking for HTML files in ${report.dir}...`);

    const htmlFile = findFirstHtmlFile(report.dir);

    if (!htmlFile) {
      console.log(`⚠️  No HTML files found in ${report.dir}\n`);
      continue;
    }

    console.log(`📄 Found HTML file: ${htmlFile}`);

    const outputPath = `docs/${report.outputName}.png`;

    try {
      console.log(`📸 Taking screenshot...`);

      await screenshotHTML({
        htmlPath: htmlFile,
        outputPath,
        viewport: report.viewport,
        beforeScreenshot: async (_page) => {
          await new Promise((resolve) => setTimeout(resolve, 2000));
        },
      });

      console.log(`✅ Screenshot saved: ${outputPath}\n`);
    } catch (error) {
      console.error(`❌ Failed to screenshot ${report.name}:`, error.message);
    }
  }

  console.log('🎉 Report screenshot process completed!');
}

async function main() {
  try {
    await screenshotReports();
  } catch (error) {
    console.error('❌ Script failed:', error.message);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { screenshotReports };
