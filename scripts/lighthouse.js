#!/usr/bin/env node

import { getTargetUrl } from './target-url.js';
import { runNpm } from './npm-run.js';

const targetUrl = getTargetUrl();

if (targetUrl) {
  console.log(`🌐 Auditing remote URL with Lighthouse: ${targetUrl}\n`);
  process.env.TARGET_URL = targetUrl;
} else {
  console.log('🏗️  No --url provided, building the site first...\n');
  runNpm(['run', 'build']);
}

runNpm(['run', 'lighthouse:run']);
