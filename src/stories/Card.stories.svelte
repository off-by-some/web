<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Card from '$lib/components/primitives/surfaces/Card';
  import { designReferences } from './docs/design-notes';

  type Args = {
    headline: string;
    body: string;
  };

  const { Story } = defineMeta({
    title: 'Library/Primitives/Surfaces/Card',
    component: Card,
    render: template,
    tags: ['autodocs'],
    argTypes: {
      headline: { control: 'text' },
      body: { control: 'text' },
    },
    args: {
      headline: 'Hover Me!',
      body: 'This is the shared composable card surface.',
    },
    parameters: {
      docs: {
        description: {
          component: `The glass layer, border lift, and iridescent hover state live here once, so every card on the site — contact methods, hero panels, skill tiles — inherits the same feel instead of reimplementing it. Reference: [W3C cognitive accessibility guidance](${designReferences.cognitive}), which favors this kind of one-pattern-everywhere consistency.`,
        },
      },
    },
  });
</script>

{#snippet template(args: Args)}
  <div class="story-surface">
    <Card>
      <h3>{args.headline}</h3>
      <p>{args.body}</p>
    </Card>
  </div>
{/snippet}

<Story name="Default" />

<Story name="Hover Interaction" asChild>
  <div class="story-surface">
    <Card>
      <h3>Hover Me!</h3>
      <p>Move across the card to preview the shared iridescent hover state.</p>
    </Card>
  </div>
</Story>

<style lang="scss">
  .story-surface {
    color: var(--token-text-primary);
    font-family: var(--token-font-family-sans);
    min-height: 12rem;
    width: min(100%, 24rem);

    h3 {
      margin: 0 0 var(--token-space-fluid-sm);
    }

    p {
      color: var(--token-text-secondary);
      margin: 0;
    }
  }
</style>
