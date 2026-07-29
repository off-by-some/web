<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import HeroMetricsPanel from '$lib/components/site/hero/HeroMetricsPanel';

  const stats: Array<{
    count: string;
    label: string;
    type: 'years' | 'scale' | 'reliability' | 'performance' | 'languages';
  }> = [
    { count: '12', label: 'Years Experience', type: 'years' },
    { count: '99.99%', label: 'System Uptime', type: 'reliability' },
    { count: '5x', label: 'Team Scale', type: 'scale' },
    { count: '40+', label: 'Systems Shipped', type: 'performance' },
  ];

  type Args = {
    title: string;
    stats: typeof stats;
  };

  const { Story } = defineMeta({
    title: 'Component Library/Site/Hero/Metrics Panel',
    component: HeroMetricsPanel,
    render: template,
    tags: ['autodocs'],
    args: {
      title: 'Key Metrics',
      stats,
    },
    parameters: {
      docs: {
        description: {
          component:
            'Thin wrapper around HeroPanel that owns the stats-panel layout, heading id, `area="stats"`, and a 0.5s entrance delay. The story exposes the visible title and stats content while keeping layout wiring out of the controls.',
        },
      },
    },
  });
</script>

{#snippet template(args: Args)}
  <div class="story-shell">
    <HeroMetricsPanel title={args.title} stats={args.stats} />
  </div>
{/snippet}

<Story name="Default" />

<style lang="scss">
  .story-shell {
    max-inline-size: 34rem;
  }
</style>
