<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import StatCard from '$lib/components/site/metrics/StatCard';

  type Args = {
    count: string;
    label: string;
    type: 'years' | 'scale' | 'reliability' | 'performance' | 'languages';
  };

  const { Story } = defineMeta({
    title: 'Library/Site/Metrics/Stat Card',
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

<style lang="scss">
  .story-grid {
    color: var(--token-text-primary);
    display: grid;
    font-family: var(--token-font-family-sans);
    gap: var(--token-space-fluid-lg);
    grid-template-columns: minmax(12rem, 1fr);
    max-width: 34rem;
  }
</style>
