<script lang="ts">
  import { ResumeDocument } from '$lib/pdf/site';
  import type { ResumeData } from '$lib/pdf/site';
  import PdfStoryDownload from '../PdfStoryDownload.svelte';

  interface Props {
    resume: ResumeData;
  }

  const { resume }: Props = $props();
  let download: (() => Promise<void>) | undefined = $state();
</script>

<div class="resume-story">
  <PdfStoryDownload {download} />
  <ResumeDocument bind:download {resume} />
</div>

<style lang="scss">
  .resume-story {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    inline-size: min(100%, 60rem);
    padding-block: 1rem;
    color: var(--token-theme-color-text-primary);
    font-family: var(--token-reference-typography-family-sans);
  }
</style>
