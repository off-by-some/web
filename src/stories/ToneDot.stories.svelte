<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ToneDot from '$lib/components/primitives/status/ToneDot';

  type Tone = 'expert' | 'advanced' | 'proficient' | 'learning' | 'available' | 'interactive';

  type Args = {
    tone: Tone;
    pulse: boolean;
  };

  const tones: Tone[] = [
    'expert',
    'advanced',
    'proficient',
    'learning',
    'available',
    'interactive',
  ];

  const { Story } = defineMeta({
    title: 'Library/Primitives/Status/Tone Dot',
    component: ToneDot,
    render: template,
    tags: ['autodocs'],
    args: {
      tone: 'interactive',
      pulse: false,
    },
    parameters: {
      docs: {
        description: {
          component:
            'ToneDot centralizes the glowing status dot shape used for mastery indicators, availability, and interactive state. It maps semantic tones to token-backed color and glow values.',
        },
      },
    },
  });
</script>

{#snippet template(args: Args)}
  <div class="story-row">
    <ToneDot tone={args.tone} pulse={args.pulse} />
    <span>{args.tone}</span>
  </div>
{/snippet}

<Story name="Default" />

<Story name="All Tones" asChild>
  <div class="tone-grid">
    {#each tones as tone (tone)}
      <div class="tone-item">
        <ToneDot {tone} pulse={tone === 'available'} />
        <span>{tone}</span>
      </div>
    {/each}
  </div>
</Story>

<style lang="scss">
  .story-row,
  .tone-item {
    align-items: center;
    color: var(--token-text-primary);
    display: flex;
    gap: var(--token-space-fluid-sm);
  }

  .tone-grid {
    display: grid;
    gap: var(--token-space-fluid-md);
    grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
    max-width: 42rem;
  }

  .tone-item {
    background: var(--token-surface-glass-medium);
    border: var(--token-border-default-small);
    border-radius: var(--token-radius-lg);
    padding: var(--token-space-fluid-md);
    text-transform: capitalize;
  }
</style>
