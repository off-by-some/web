import { existsSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const buildDir = path.join(rootDir, 'build');
const criticalCssPath = path.join(rootDir, 'static', 'index.css');
const copiedCriticalCssPath = path.join(buildDir, 'index.css');
const marker = '<!-- CRITICAL_CSS -->';

function escapeStyle(css) {
  return css.replaceAll('</style', '<\\/style');
}

function htmlFilesIn(dir) {
  if (!existsSync(dir)) return [];

  return readdirSync(dir).flatMap((entry) => {
    const fullPath = path.join(dir, entry);
    const stats = statSync(fullPath);

    if (stats.isDirectory()) return htmlFilesIn(fullPath);
    if (stats.isFile() && fullPath.endsWith('.html')) return [fullPath];
    return [];
  });
}

function inlineCriticalCss(html, criticalCss) {
  const styleTag = `<style data-critical-css>${criticalCss}</style>`;

  let nextHtml = html.replaceAll(marker, styleTag);

  nextHtml = nextHtml.replace(
    /<link\s+rel="stylesheet"\s+href="[^"]*\/?index\.css"\s*\/?>/g,
    styleTag,
  );

  return nextHtml;
}

if (!existsSync(criticalCssPath)) {
  throw new Error(`Critical CSS file not found: ${criticalCssPath}`);
}

const criticalCss = escapeStyle(readFileSync(criticalCssPath, 'utf8'));
const htmlFiles = htmlFilesIn(buildDir);

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const nextHtml = inlineCriticalCss(html, criticalCss);

  if (nextHtml !== html) {
    writeFileSync(file, nextHtml);
    console.log(`✅ Inlined critical CSS in ${path.relative(rootDir, file)}`);
  }
}

if (existsSync(copiedCriticalCssPath)) {
  rmSync(copiedCriticalCssPath);
  console.log(`✅ Removed unreferenced ${path.relative(rootDir, copiedCriticalCssPath)}`);
}
