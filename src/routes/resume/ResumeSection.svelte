<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    children: Snippet;
    last?: boolean;
    title: string;
  }

  const { children, last = false, title }: Props = $props();
</script>

<section class="rs" class:rs--last={last}>
  <h2 class="rs__heading">
    <span>{title}</span>
    <span class="rs__rule" data-pdf-rule aria-hidden="true"></span>
  </h2>
  {@render children()}
</section>

<style lang="scss">
  .rs {
    margin-block-end: 1rem;
  }

  .rs--last {
    margin-block-end: 0;
  }

  .rs__heading {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.625rem;
    font-weight: var(--token-reference-typography-weight-bold, 700);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--resume-color-section, #0e7c62);
    margin: 0 0 0.6rem;

    .rs__rule {
      flex: 1;
      block-size: 1px;
      background: var(--resume-color-section, #136353);
      opacity: 0.45;
      border-radius: var(--token-reference-radius-full, 9999px);
    }
  }
</style>
