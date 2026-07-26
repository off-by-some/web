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

  .section-title {
    font-size: var(--token-font-size-xs);
    font-weight: var(--token-font-weight-semibold);
    color: var(--token-text-tertiary);
    text-transform: uppercase;
    letter-spacing: var(--token-letter-spacing-extra-wide);
    margin-block-end: var(--token-space-fluid-xs);
    line-height: var(--token-line-height-snug);

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-font-size-sm);
    }
  }

  .section-accent {
    inline-size: var(--token-space-fluid-md);
    block-size: 2px;
    background: var(--token-emphasis-color);
    border-radius: var(--token-radius-full);
  }
</style>
