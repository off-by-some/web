<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Card from '$lib/components/primitives/surfaces/Card';
  import { designReferences } from '../../../docs/design-notes';
  import { hideControls } from '../../../helpers/controls';

  type Args = {
    headline: string;
    body: string;
    pressable: boolean;
  };

  const { Story } = defineMeta({
    title: 'Component Library/Primitives/Surfaces/Card',
    component: Card,
    render: template,
    tags: ['autodocs'],
    argTypes: {
      ...hideControls(['as', 'type']),
      headline: { control: 'text' },
      body: { control: 'text' },
      pressable: {
        control: 'boolean',
        description:
          'Card renders as a plain, non-interactive container unless it receives an `onclick` — passing one is what opts it into a role, tab focus, and the hover/active/focus treatment below. This toggle simulates that by attaching a no-op handler.',
      },
    },
    args: {
      headline: 'Hover Me!',
      body: 'This is the shared composable card surface.',
      pressable: false,
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
    <Card onclick={args.pressable ? () => {} : undefined}>
      <h3>{args.headline}</h3>
      <p>{args.body}</p>
    </Card>
  </div>
{/snippet}

<Story name="Default" />

<Story
  name="Pressable"
  args={{
    headline: 'Hover, Focus, or Press',
    body: 'An onclick handler opts the card into interactive semantics and this hover/active/focus treatment.',
    pressable: true,
  }}
/>

<style lang="scss">
  .story-surface {
    color: var(--token-theme-color-text-primary);
    font-family: var(--token-reference-typography-family-sans);
    inline-size: min(100%, 24rem);
    min-block-size: 12rem;

    h3 {
      margin: 0;
      margin-block-end: var(--token-reference-spacing-fluid-sm);
    }

    p {
      color: var(--token-theme-color-text-secondary);
      margin: 0;
    }
  }
</style>
