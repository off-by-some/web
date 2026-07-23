<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import StatusPill from '$lib/components/site/status/StatusPill';

  const { Story } = defineMeta({
    title: 'Library/Site/Status/Status Pill',
    component: StatusPill,
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

<Story name="Availability" asChild>
  <div class="story-row">
    <StatusPill text="Building polished systems" />
    <StatusPill text="Ready for careful handoff" />
  </div>
</Story>

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
