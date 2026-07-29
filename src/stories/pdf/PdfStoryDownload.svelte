<script lang="ts">
  interface Props {
    download?: (() => Promise<void>) | undefined;
    label?: string;
  }

  let { download, label = 'Download PDF' }: Props = $props();
  let controlElement: HTMLDivElement;
  let downloading = $state(false);

  async function handleDownloadRequested() {
    if (!download || downloading) return;

    downloading = true;
    try {
      await download();
    } finally {
      downloading = false;
    }
  }

  $effect(() => {
    if (!controlElement) return;

    const originalParent = controlElement.parentNode;
    const nextSibling = controlElement.nextSibling;

    const dockBesideCodeToggle = () => {
      const preview = controlElement.closest('.sbdocs-preview');
      const codeToggle = preview?.querySelector<HTMLButtonElement>('.docblock-code-toggle');
      const target = codeToggle?.parentElement;

      if (!target || controlElement.parentElement === target) return;

      target.insertBefore(controlElement, codeToggle);
    };

    const animationFrame = requestAnimationFrame(dockBesideCodeToggle);
    const observer = new MutationObserver(dockBesideCodeToggle);

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      cancelAnimationFrame(animationFrame);
      observer.disconnect();

      if (controlElement.parentNode !== originalParent && originalParent) {
        originalParent.insertBefore(controlElement, nextSibling);
      }
    };
  });
</script>

<div class="pdf-story-download" bind:this={controlElement}>
  <button
    type="button"
    disabled={!download || downloading}
    aria-busy={downloading}
    class="pdf-story-download__button"
    onclick={handleDownloadRequested}
    title={label}
  >
    {downloading ? 'Generating...' : label}
  </button>
</div>

<style lang="scss">
  .pdf-story-download {
    align-self: flex-end;
    display: inline-flex;
    justify-content: flex-end;
    inline-size: auto;
    margin-inline-end: 0.375rem;
    pointer-events: none;
  }

  .pdf-story-download__button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-block-size: 1.5rem;
    padding-block: 0.25rem;
    padding-inline: 0.625rem;
    background: rgb(246, 249, 252);
    color: rgb(46, 52, 56);
    border: 0;
    border-radius: 0.1875rem;
    box-shadow: none;
    cursor: pointer;
    font-family:
      'Nunito Sans',
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      sans-serif;
    font-size: 0.8125rem;
    font-weight: 700;
    line-height: 1;
    text-decoration: none;
    pointer-events: auto;

    &:hover:not(:disabled) {
      background: rgb(236, 244, 249);
    }

    &:focus-visible {
      outline: 2px solid rgb(2, 156, 253);
      outline-offset: 2px;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
</style>
