<script lang="ts">
  import { renderHtmlToPdf } from '../html-pdf';

  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import type { HtmlPdfOptions } from '../html-pdf';

  type Props = Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'class'> & {
    children: Snippet;
    class?: string;
    download?: (() => Promise<void>) | undefined;
    filename?: string;
    pageSize?: HtmlPdfOptions['pageSize'];
    renderWidth: string;
  };

  let {
    children,
    class: classProp = '',
    download = $bindable(),
    filename = 'document.pdf',
    pageSize = 'letter',
    renderWidth,
    ...rest
  }: Props = $props();

  let documentElement: HTMLElement;
  const classes = $derived(['pdf-document', classProp].filter(Boolean).join(' '));

  function nextAnimationFrame() {
    return new Promise<void>((resolve) => {
      requestAnimationFrame(() => {
        resolve();
      });
    });
  }

  function sourcePages(root: ParentNode) {
    const pages = Array.from(root.querySelectorAll<HTMLElement>('[data-pdf-page]'));
    if (pages.length === 0) {
      throw new Error('PdfDocument requires at least one PdfPage child.');
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

    await nextAnimationFrame();

    return {
      cleanup: () => {
        host.remove();
      },
      pages: sourcePages(clone),
    };
  }

  async function downloadDocument() {
    await document.fonts.ready;

    const { cleanup, pages } = await createSourcePages();

    try {
      const blob = await renderHtmlToPdf(pages, { pageSize });
      saveBlob(blob);
    } finally {
      cleanup();
    }
  }

  $effect(() => {
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
  .pdf-document {
    max-inline-size: 100%;
  }
</style>
