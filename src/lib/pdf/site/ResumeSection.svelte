<script lang="ts">
  import { PdfRule } from '$lib/pdf/primitives';

  import type { Snippet } from 'svelte';

  interface Props {
    children: Snippet;
    title: string;
  }

  const { children, title }: Props = $props();
</script>

<section class="resume-section">
  <h2 class="resume-section__heading">
    <span>{title}</span>
    <span class="resume-section__rule"><PdfRule /></span>
  </h2>
  {@render children()}
</section>

<style lang="scss">
  .resume-section__heading {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.625rem;
    font-weight: var(--token-reference-typography-weight-bold, 700);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--resume-color-section, #0e7c62);
    margin: 0;
    margin-block-end: 0.6rem;
  }

  .resume-section__rule {
    display: block;
    flex: 1;
    color: var(--resume-color-section, #136353);
    opacity: 0.45;
  }
</style>
