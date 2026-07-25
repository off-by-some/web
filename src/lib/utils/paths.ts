import { resolve } from '$app/paths';

const isExternalUrl = (href: string): boolean =>
  /^[a-z][a-z\d+.-]*:/i.test(href) || href.startsWith('//');

const resolvePath = resolve as (href: `/${string}`) => string;

export function withBasePath(href = ''): string {
  if (!href || !href.startsWith('/') || isExternalUrl(href)) return href;

  return resolvePath(href as `/${string}`);
}
