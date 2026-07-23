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

  const { Story } = defineMeta({
    title: 'Library/Site/Hero/Metrics Panel',
    component: HeroMetricsPanel,
    tags: ['autodocs'],
    args: {
      stats,
    },
    parameters: {
      docs: {
        description: {
          component:
            'Thin wrapper around HeroPanel that hardcodes its own title ("Key Metrics"), heading id, `area="stats"`, and a 0.5s entrance delay — none of that is configurable from outside. It exists so the hero section only has to pass a `stats` array, not know about HeroPanel\'s title/area contract.',
        },
      },
    },
  });
</script>

<Story name="Default" asChild>
  <div class="story-shell">
    <HeroMetricsPanel {stats} />
  </div>
</Story>

<style lang="scss">
  .story-shell {
    max-width: 34rem;
  }
</style>
