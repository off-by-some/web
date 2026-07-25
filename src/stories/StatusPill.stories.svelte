<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import StatusPill from '$lib/components/site/status/StatusPill';

  type Args = {
    text: string;
  };

  const { Story } = defineMeta({
    title: 'Library/Site/Status/Status Pill',
    component: StatusPill,
    render: template,
    tags: ['autodocs'],
    args: {
      text: 'Building polished systems',
    },
    parameters: {
      docs: {
        description: {
          component:
            'StatusPill is the low-level pill surface for short state labels. Availability-specific copy and gold-accent rationale live in AvailabilityStatus.',
        },
      },
    },
  });
</script>

{#snippet template(args: Args)}
  <div class="story-row">
    <StatusPill text={args.text} />
  </div>
{/snippet}

<Story name="Default" />

<style lang="scss">
  .story-row {
    align-items: center;
    color: var(--token-text-primary);
    display: flex;
    flex-wrap: wrap;
    font-family: var(--token-font-family-sans);
    gap: var(--token-space-fluid-lg);
  }
</style>
