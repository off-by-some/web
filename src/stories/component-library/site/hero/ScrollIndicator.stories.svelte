<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ScrollIndicator from '$lib/components/site/hero/ScrollIndicator';
  import { hideControls } from '../../../helpers/controls';

  type Args = {
    text: string;
  };

  const { Story } = defineMeta({
    title: 'Component Library/Site/Hero/Scroll Indicator',
    component: ScrollIndicator,
    render: template,
    tags: ['autodocs'],
    args: {
      text: 'Explore',
    },
    argTypes: {
      ...hideControls(['ariaLabel', 'onScrollRequested']),
    },
    parameters: {
      docs: {
        description: {
          component:
            'A compact hero affordance that reports `onScrollRequested` when activated. The floating mouse/wheel/arrow motion is disabled via `prefers-reduced-motion`, and the component hides below a 600px viewport height or on narrow mobile widths because the full hero already has a primary explore action.',
        },
      },
    },
  });
</script>

{#snippet template(args: Args)}
  <div class="story-shell">
    <ScrollIndicator text={args.text} onScrollRequested={() => console.log('Scroll requested')} />
  </div>
{/snippet}

<Story name="Default" />

<style lang="scss">
  .story-shell {
    min-block-size: 10rem;
    position: relative;
  }
</style>
