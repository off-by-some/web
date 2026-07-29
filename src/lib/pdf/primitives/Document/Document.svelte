<script lang="ts">
  import { renderHtmlToPdf } from '../html-pdf';

  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import type { HtmlPdfOptions } from '../html-pdf';
  import type { DocumentFont } from './types';

  type Props = Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'class'> & {
    children: Snippet;
    class?: string;
    download?: (() => Promise<void>) | undefined;
    filename?: string;
    fonts?: readonly DocumentFont[];
    pageSize?: HtmlPdfOptions['pageSize'];
    renderWidth: string;
  };

  const fontDataCache = new Map<string, Promise<string>>();
  const browserFontCache = new Map<string, Promise<void>>();

  let {
    children,
    class: classProp = '',
    download = $bindable(),
    filename = 'document.pdf',
    fonts = [],
    pageSize = 'letter',
    renderWidth,
    ...rest
  }: Props = $props();

  let documentElement: HTMLElement;
  const classes = $derived(['document', classProp].filter(Boolean).join(' '));

  function nextAnimationFrame() {
    return new Promise<void>((resolve) => {
      requestAnimationFrame(() => {
        resolve();
      });
    });
  }

  function sourcePages(root: ParentNode) {
    const pages = Array.from(root.querySelectorAll<HTMLElement>('[data-page]'));
    if (pages.length === 0) {
      throw new Error('Document requires at least one Page child.');
    }

    return pages;
  }

  function saveBlob(blob: Blob) {
    const url = URL.createObjectURL(blob);
    const anchorDocument = accessibleTopDocument() ?? document;
    const anchor = anchorDocument.createElement('a');

    anchor.href = url;
    anchor.download = filename;
    anchor.style.display = 'none';

    anchorDocument.body.append(anchor);
    anchor.click();
    anchor.remove();

    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 0);
  }

  function accessibleTopDocument() {
    try {
      return window.top?.document;
    } catch {
      return undefined;
    }
  }

  async function waitForImages(root: ParentNode) {
    const images = Array.from(root.querySelectorAll<HTMLImageElement>('img'));

    await Promise.all(
      images.map((image) => {
        if (image.complete) return undefined;
        return new Promise<void>((resolve) => {
          image.addEventListener('load', () => resolve(), { once: true });
          image.addEventListener('error', () => resolve(), { once: true });
        });
      }),
    );
  }

  function arrayBufferToBase64(buffer: ArrayBuffer) {
    const bytes = new Uint8Array(buffer);
    const chunkSize = 0x8000;
    let binary = '';

    for (let index = 0; index < bytes.length; index += chunkSize) {
      binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
    }

    return btoa(binary);
  }

  function fontData(url: string) {
    const cached = fontDataCache.get(url);
    if (cached) return cached;

    const data = fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Document could not load PDF font: ${url}`);
        }

        return response.arrayBuffer();
      })
      .then(arrayBufferToBase64);

    fontDataCache.set(url, data);
    return data;
  }

  function browserFontStyle(style: DocumentFont['style']) {
    if (style === 'italic' || style === 'bolditalic') return 'italic';
    return 'normal';
  }

  function browserFontWeight(font: DocumentFont) {
    if (font.weight) return font.weight.toString();
    return font.style === 'bold' || font.style === 'bolditalic' ? '700' : '400';
  }

  function browserFontKey(font: DocumentFont) {
    return `${font.family}\0${browserFontStyle(font.style)}\0${browserFontWeight(font)}\0${font.url}`;
  }

  function browserFontData(font: DocumentFont) {
    const key = browserFontKey(font);
    const cached = browserFontCache.get(key);
    if (cached) return cached;

    const data = (async () => {
      if (typeof FontFace === 'undefined') return;

      const face = new FontFace(font.family, `url("${font.url}")`, {
        style: browserFontStyle(font.style),
        weight: browserFontWeight(font),
      });

      document.fonts.add(await face.load());
    })();

    browserFontCache.set(key, data);
    return data;
  }

  async function loadBrowserFonts() {
    await Promise.all(fonts.map(browserFontData));
  }

  async function loadFonts() {
    return Promise.all(
      fonts.map(async ({ url, ...font }) => ({
        ...font,
        data: await fontData(url),
      })),
    );
  }

  async function createSourcePages() {
    const host = document.createElement('div');
    const clone = documentElement.cloneNode(true) as HTMLElement;

    host.setAttribute('data-pdf-host', '');
    host.style.position = 'fixed';
    host.style.insetBlockStart = '0';
    host.style.insetInlineStart = '-10000px';
    host.style.inlineSize = renderWidth;
    host.style.maxInlineSize = 'none';
    host.style.pointerEvents = 'none';
    host.style.zIndex = '-1';

    clone.style.inlineSize = renderWidth;
    clone.style.maxInlineSize = 'none';

    host.append(clone);
    document.body.append(host);

    await waitForImages(clone);
    await nextAnimationFrame();

    return {
      cleanup: () => {
        host.remove();
      },
      pages: sourcePages(clone),
    };
  }

  async function downloadDocument() {
    await loadBrowserFonts();
    await document.fonts.ready;

    const { cleanup, pages } = await createSourcePages();

    try {
      const blob = await renderHtmlToPdf(pages, { fonts: await loadFonts(), pageSize });
      saveBlob(blob);
    } finally {
      cleanup();
    }
  }

  $effect(() => {
    void loadBrowserFonts();
    download = downloadDocument;

    return () => {
      download = undefined;
    };
  });
</script>

<div {...rest} class={classes} bind:this={documentElement}>
  {@render children()}
</div>

<style lang="scss">
  .document {
    max-inline-size: 100%;
  }
</style>
