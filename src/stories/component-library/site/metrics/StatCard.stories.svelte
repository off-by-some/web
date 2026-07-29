<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import StatCard from '$lib/components/site/metrics/StatCard';
  import { hideControls } from '../../../helpers/controls';

  type Args = {
    count: string;
    label: string;
    type: 'years' | 'scale' | 'reliability' | 'performance' | 'languages';
  };

  const { Story } = defineMeta({
    title: 'Component Library/Site/Metrics/Stat Card',
    component: StatCard,
    render: template,
    tags: ['autodocs'],
    args: {
      count: '12',
      label: 'Years Experience',
      type: 'years',
    },
    argTypes: {
      type: {
        control: 'select',
        options: ['years', 'scale', 'reliability', 'performance', 'languages'],
      },
      ...hideControls(['delay']),
    },
    parameters: {
      docs: {
        description: {
          component:
            "Counts up from 0 the first time the card scrolls into view (an IntersectionObserver that fires once, not on mount) rather than animating immediately — scroll the preview out and back in and it won't replay. It parses the leading numeric portion of `count` and keeps any suffix static, so `99.99%`, `16x`, and `40+` all animate their number while their suffix stays put.",
        },
      },
    },
  });
</script>

{#snippet template(args: Args)}
  <div class="story-grid">
    <StatCard count={args.count} label={args.label} type={args.type} />
  </div>
{/snippet}

<Story name="Default" />

<Story
  name="Percentage Suffix"
  args={{ count: '99.99%', label: 'System Uptime', type: 'reliability' }}
/>

<Story name="Multiplier Suffix" args={{ count: '5x', label: 'Team Scale', type: 'scale' }} />

<Story name="Plus Suffix" args={{ count: '40+', label: 'Systems Shipped', type: 'performance' }} />

<style lang="scss">
  .story-grid {
    color: var(--token-theme-color-text-primary);
    display: grid;
    font-family: var(--token-reference-typography-family-sans);
    gap: var(--token-reference-spacing-fluid-lg);
    grid-template-columns: minmax(12rem, 1fr);
    max-inline-size: 34rem;
  }
</style>
