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
    font-size: var(--token-reference-typography-size-xs);
    font-weight: var(--token-reference-typography-weight-semibold);
    color: var(--token-theme-color-text-tertiary);
    text-transform: uppercase;
    letter-spacing: var(--token-reference-typography-letter-spacing-extra-wide);
    margin-block-end: var(--token-reference-spacing-fluid-xs);
    line-height: var(--token-reference-typography-line-height-snug);

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-reference-typography-size-sm);
    }
  }

  .section-accent {
    inline-size: var(--token-reference-spacing-fluid-md);
    block-size: var(--section-accent-thickness, var(--token-reference-border-width-large));
    background: var(--token-theme-color-emphasis-color);
    border-radius: var(--token-reference-radius-full);
  }
</style>
