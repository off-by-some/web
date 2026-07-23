<script lang="ts">
  import HeroPanel from '$lib/components/site/hero/HeroPanel';
  import StatCard from '$lib/components/site/metrics/StatCard';

  type Props = {
    stats?: Array<{
      count: string;
      label: string;
      type: 'years' | 'scale' | 'reliability' | 'performance' | 'languages';
    }>;
    title?: string;
  };

  let { stats = [], title = 'Lorem Ipsum' }: Props = $props();
</script>

<HeroPanel {title} titleId="stats-title" area="stats" delay="0.5s">
  <div class="stats-grid">
    {#each stats as stat, index (index)}
      <StatCard count={stat.count} label={stat.label} type={stat.type} />
    {/each}
  </div>
</HeroPanel>

<style lang="scss">
  @use 'styles/breakpoints' as *;

  .stats-grid {
    display: grid;
    gap: var(--token-space-fluid-md);
    grid-template-columns: 1fr;

    @media (min-width: $breakpoint-sm) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
