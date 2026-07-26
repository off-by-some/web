import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const buildDir = path.join(rootDir, 'build');

function escapeStyle(css) {
  return css.replaceAll('</style', '<\\/style');
}

function attributeValue(tag, name) {
  const pattern = new RegExp(`\\s${name}=(["'])(.*?)\\1`, 'i');
  return tag.match(pattern)?.[2];
}

function isDisabledStylesheet(tag) {
  return /\sdisabled(?:\s|>|=)/i.test(tag) || /media=(["'])\(max-width:\s*0\)\1/i.test(tag);
}

function stylesheetPathFromHref(href) {
  if (!href.includes('/_app/immutable/assets/') && !href.includes('./_app/immutable/assets/')) {
    return null;
  }

  const assetPath = href
    .replace(/^https?:\/\/[^/]+/i, '')
    .replace(/^\/web\//, '')
    .replace(/^\.\//, '')
    .replace(/^\//, '');

  if (!assetPath.endsWith('.css')) return null;

  const cssPath = path.join(buildDir, assetPath);
  return cssPath.startsWith(buildDir) ? cssPath : null;
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

function inlineActiveAppStylesheets(html) {
  return html.replace(/<link\b[^>]*>/gi, (tag) => {
    const rel = attributeValue(tag, 'rel');
    const href = attributeValue(tag, 'href');

    if (rel?.toLowerCase() !== 'stylesheet' || !href || isDisabledStylesheet(tag)) {
      return tag;
    }

    const cssPath = stylesheetPathFromHref(href);
    if (!cssPath || !existsSync(cssPath)) return tag;

    const css = escapeStyle(readFileSync(cssPath, 'utf8'));
    return `<style data-app-css="${href}">${css}</style>`;
  });
}

const htmlFiles = htmlFilesIn(buildDir);

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const nextHtml = inlineActiveAppStylesheets(html);

  if (nextHtml !== html) {
    writeFileSync(file, nextHtml);
    console.log(`✅ Inlined active app stylesheets in ${path.relative(rootDir, file)}`);
  }
}
