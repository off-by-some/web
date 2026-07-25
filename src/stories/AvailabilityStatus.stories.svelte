<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import AvailabilityStatus from '$lib/components/site/status/AvailabilityStatus';
  import { designNotes, designReferences } from './docs/design-notes';
  import { hideControls } from './helpers/controls';

  type Args = {
    text: string;
  };

  const { Story } = defineMeta({
    title: 'Library/Site/Status/Availability Status',
    component: AvailabilityStatus,
    render: template,
    tags: ['autodocs'],
    args: {
      text: 'Available for new opportunities',
    },
    argTypes: {
      ...hideControls(['entrance', 'delay']),
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

{#snippet template(args: Args)}
  <div class="story-row">
    <AvailabilityStatus text={args.text} />
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
