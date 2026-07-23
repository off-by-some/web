<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import HeroPanel from '$lib/components/site/hero/HeroPanel';
  import StatCard from '$lib/components/site/metrics/StatCard';

  type Args = {
    title: string;
    titleId: string;
    area: 'stats' | 'tech';
    delay: string;
  };

  const { Story } = defineMeta({
    title: 'Library/Site/Hero/Panel Frame',
    component: HeroPanel,
    render: template,
    tags: ['autodocs'],
    args: {
      title: 'Key Metrics',
      titleId: 'story-hero-panel-title',
      area: 'stats',
      delay: '0s',
    },
    parameters: {
      docs: {
        description: {
          component:
            "Shared shell for the hero's stats and tech panels. The `area` prop only changes grid placement — it doesn't touch spacing or styling — so the two panels can't drift apart visually even as their content diverges.",
        },
      },
    },
  });
</script>

{#snippet template(args: Args)}
  <div class="story-shell">
    <HeroPanel title={args.title} titleId={args.titleId} area={args.area} delay={args.delay}>
      <div class="story-grid">
        <StatCard count="12" label="Years Experience" type="years" />
        <StatCard count="99.99%" label="System Uptime" type="reliability" />
      </div>
    </HeroPanel>
  </div>
{/snippet}

<Story name="Default" asChild>
  <div class="story-shell">
    <HeroPanel title="Key Metrics" titleId="story-hero-panel-title" area="stats" delay="0s">
      <div class="story-grid">
        <StatCard count="12" label="Years Experience" type="years" />
        <StatCard count="99.99%" label="System Uptime" type="reliability" />
      </div>
    </HeroPanel>
  </div>
</Story>

<style lang="scss">
  .story-shell {
    max-width: 30rem;
  }

  .story-grid {
    display: grid;
    gap: var(--token-space-fluid-md);
    grid-template-columns: repeat(2, minmax(10rem, 1fr));
  }
</style>
