<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import AvailabilityStatus from '$lib/components/site/status/AvailabilityStatus';
  import { designNotes, designReferences } from './docs/design-notes';

  const { Story } = defineMeta({
    title: 'Library/Site/Status/Availability Status',
    component: AvailabilityStatus,
    tags: ['autodocs'],
    args: {
      text: 'Available for new opportunities',
      entrance: false,
      delay: '0s',
    },
    parameters: {
      docs: {
        description: {
          component: `${designNotes.availability}\n\nReference: [W3C cognitive accessibility guidance](${designReferences.cognitive}).`,
        },
      },
    },
  });
</script>

<Story name="Default" asChild>
  <div class="story-row">
    <AvailabilityStatus text="Available for new opportunities" />
    <AvailabilityStatus text="Open to new opportunities" />
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
