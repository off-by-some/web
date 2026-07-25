<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ScrollIndicator from '$lib/components/site/hero/ScrollIndicator';
  import { hideControls } from './helpers/controls';

  type Args = {
    text: string;
  };

  const { Story } = defineMeta({
    title: 'Library/Site/Hero/Scroll Indicator',
    component: ScrollIndicator,
    render: template,
    tags: ['autodocs'],
    args: {
      text: 'Explore',
    },
    argTypes: {
      ...hideControls(['ariaLabel']),
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

{#snippet template(args: Args)}
  <div class="story-shell">
    <ScrollIndicator text={args.text} />
  </div>
{/snippet}

<Story name="Default" />

<style lang="scss">
  .story-shell {
    min-height: 10rem;
    position: relative;
  }
</style>
