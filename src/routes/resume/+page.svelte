<script lang="ts">
  import { ResumeToolbar } from '$lib/components/site';
  import { resumeContent, t } from '$lib/content';
  import { ResumeDocument } from '$lib/pdf/site';
  import type { ResumeData } from '$lib/pdf/site';

  const resume = resumeContent as ResumeData;

  let downloadResume: (() => Promise<void>) | undefined = $state();
  let generating = $state(false);

  async function handleDownloadRequested() {
    if (generating || !downloadResume) return;
    generating = true;

    try {
      await downloadResume();
    } finally {
      generating = false;
    }
  }
</script>

<svelte:head>
  <title>Resume — Cassidy Bridges</title>
  <meta name="description" content={t.meta.description} />
</svelte:head>

<div class="page">
  <ResumeToolbar
    title={`${resume.name} — Resume`}
    {generating}
    downloadReady={Boolean(downloadResume)}
    onDownloadRequested={handleDownloadRequested}
  />

  <main class="sheet-wrap">
    <ResumeDocument bind:download={downloadResume} {resume} />
  </main>
</div>

<style lang="scss">
  @use 'styles/breakpoints' as *;

  .page {
    min-height: 100vh;
    background-color: var(--token-theme-color-surface-color, #0b0f28);
    background-image:
      radial-gradient(
        ellipse 100% 50% at 50% -10%,
        color-mix(in srgb, var(--token-theme-color-interactive-color, #1de9b6) 16%, transparent) 0%,
        transparent 100%
      ),
      radial-gradient(
        ellipse 70% 25% at 50% 105%,
        color-mix(in srgb, var(--token-theme-color-surface-color, #0b0f28) 60%, transparent) 0%,
        transparent 100%
      );
    font-family: var(
      --token-reference-typography-family-sans,
      'Inter Variable',
      system-ui,
      sans-serif
    );
  }

  .sheet-wrap {
    padding-block-start: 2.5rem;
    padding-inline: 1rem;
    padding-block-end: 6rem;

    @media (min-width: $breakpoint-md) {
      padding-block-start: 3rem;
      padding-inline: 2rem;
      padding-block-end: 8rem;
    }
  }
</style>
