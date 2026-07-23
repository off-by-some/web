<script lang="ts">
  import Header from '$lib/components/primitives/typography/Header';

  type Props = {
    title: string;
    titleId: string;
  };

  let { title, titleId }: Props = $props();
</script>

<Header as="div" className="section-accent-header">
  <h3 class="section-title" id={titleId}>{title}</h3>
  <div class="section-accent" aria-hidden="true"></div>
</Header>

<style lang="scss">
  @use 'styles/breakpoints' as *;

  :global(.section-accent-header) {
    margin-bottom: var(--token-space-fluid-md);
  }

  .section-title {
    font-size: var(--token-font-size-xs);
    font-weight: var(--token-font-weight-semibold);
    color: var(--token-text-tertiary);
    text-transform: uppercase;
    letter-spacing: var(--token-letter-spacing-extra-wide);
    margin-bottom: var(--token-space-fluid-xs);
    line-height: var(--token-line-height-snug);
    transition: color 0.3s var(--token-motion-ease-out);

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-font-size-sm);
    }
  }

  .section-accent {
    width: var(--token-space-fluid-md);
    height: 2px;
    background: var(--token-emphasis-color);
    border-radius: var(--token-radius-full);
    transition: width 0.3s var(--token-motion-ease-out);
  }

  :global(.section-accent-header:hover) .section-title {
    color: var(--token-text-secondary);
  }

  :global(.section-accent-header:hover) .section-accent {
    width: var(--token-space-fluid-md);
  }
</style>
