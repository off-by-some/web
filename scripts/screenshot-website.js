#!/usr/bin/env node

import { spawn } from 'child_process';
import { screenshotURL } from './screenshot.js';

/**
 * Screenshot the website's about me section
 */
async function screenshotWebsite() {
  console.log('🌐 Starting website screenshot process...\n');

  let serverProcess;

  try {
    // Start the preview server
    console.log('🚀 Starting preview server...');
    serverProcess = spawn('/usr/bin/npm', ['run', 'preview'], {
      stdio: ['pipe', 'pipe', 'pipe'],
      shell: true,
    });

    // Wait for server to be ready
    await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Server startup timeout'));
      }, 30000); // 30 second timeout

      serverProcess.stdout.on('data', (data) => {
        const output = data.toString();
        console.log(`📡 Server: ${output.trim()}`);

        if (output.includes('Server ready and listening on port')) {
          clearTimeout(timeout);
          resolve();
        }
      });

      serverProcess.stderr.on('data', (data) => {
        console.error(`❌ Server error: ${data.toString().trim()}`);
      });

      serverProcess.on('error', (error) => {
        clearTimeout(timeout);
        reject(error);
      });
    });

    // Give the server a moment to fully stabilize
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log('✅ Server is ready, taking screenshot...');

    // Use the existing screenshotURL function with custom beforeScreenshot logic
    const outputPath = 'docs/website-preview.png';

    await screenshotURL({
      url: 'http://localhost:4173',
      outputPath,
      viewport: { width: 1920, height: 1080, deviceScaleFactor: 1 },
      beforeScreenshot: async (page) => {
        // Wait for the about me section to be fully loaded
        await page.waitForSelector('[data-section="about-me"]', { timeout: 10000 });

        // Additional wait for animations to complete
        await new Promise((resolve) => setTimeout(resolve, 3000));

        // Find the about me section and get its bounding box
        const aboutMeSection = await page.$('[data-section="about-me"]');

        if (!aboutMeSection) {
          throw new Error('About me section not found');
        }

        const boundingBox = await aboutMeSection.boundingBox();

        if (!boundingBox) {
          throw new Error('Could not get bounding box of about me section');
        }

        // Set the clip to only capture the about me section
        page.clip = {
          x: boundingBox.x,
          y: boundingBox.y,
          width: boundingBox.width,
          height: boundingBox.height,
        };

        console.log(
          `📏 Screenshot dimensions: ${Math.ceil(boundingBox.width)}x${Math.ceil(boundingBox.height)}`,
        );
      },
    });

    console.log(`✅ Website screenshot saved: ${outputPath}\n`);
  } catch (error) {
    console.error('❌ Failed to screenshot website:', error.message);
    process.exit(1);
  } finally {
    // Cleanup
    if (serverProcess) {
      serverProcess.kill();
    }
  }
}

// Run the script
screenshotWebsite();
