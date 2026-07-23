import { readFileSync } from 'node:fs';
import { resolve as resolvePath } from 'node:path';
import { asset } from '$app/paths';
import type { Handle } from '@sveltejs/kit';

const CRITICAL_CSS_MARKER = '<!-- CRITICAL_CSS -->';
const CRITICAL_CSS_PATH = resolvePath('static/index.css');

let criticalCssCache: string | undefined;

function getCriticalCss() {
  if (criticalCssCache !== undefined) return criticalCssCache;

  try {
    criticalCssCache = readFileSync(CRITICAL_CSS_PATH, 'utf8').replaceAll('</style', '<\\/style');
  } catch {
    criticalCssCache = '';
  }

  return criticalCssCache;
}

function getCriticalCssMarkup() {
  const criticalCss = getCriticalCss();

  if (criticalCss) {
    return `<style data-critical-css>${criticalCss}</style>`;
  }

  return `<link rel="stylesheet" href="${asset('/index.css')}" />`;
}

export const handle: Handle = async ({ event, resolve }) =>
  resolve(event, {
    transformPageChunk: ({ html }) => html.replace(CRITICAL_CSS_MARKER, getCriticalCssMarkup()),
  });
