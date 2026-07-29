<script lang="ts">
  import { t } from '$lib/content';

  import ResumeDocument from './ResumeDocument.svelte';
  import ResumeToolbar from './ResumeToolbar.svelte';
  import { downloadResumePdf } from './resume-pdf';
  import { resume } from './resume-model';

  let generating = $state(false);

  async function handleDownloadRequested() {
    if (generating) return;
    generating = true;

    try {
      await downloadResumePdf();
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
    onDownloadRequested={handleDownloadRequested}
  />

  <main class="sheet-wrap">
    <ResumeDocument {resume} />
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
    padding: 2.5rem 1rem 6rem;

    @media (min-width: $breakpoint-md) {
      padding: 3rem 2rem 8rem;
    }
  }
</style>
