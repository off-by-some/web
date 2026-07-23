<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ScrollIndicator from '$lib/components/site/hero/ScrollIndicator';

  const { Story } = defineMeta({
    title: 'Library/Site/Hero/Scroll Indicator',
    component: ScrollIndicator,
    tags: ['autodocs'],
    args: {
      text: 'Explore',
    },
    parameters: {
      docs: {
        description: {
          component:
            'Purely decorative — the floating mouse/wheel/arrow animation is disabled via `prefers-reduced-motion`, but it also hides itself completely below a 600px viewport height or on narrow mobile widths via a hardcoded media query, not a prop. If the hero ever gets shorter, check this component before assuming the indicator is broken.',
        },
      },
    },
  });
</script>

<Story name="Default" asChild>
  <div class="story-shell">
    <ScrollIndicator text="Explore" />
  </div>
</Story>

<style lang="scss">
  .story-shell {
    min-height: 10rem;
    position: relative;
  }
</style>
