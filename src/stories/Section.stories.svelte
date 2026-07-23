<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Section from '$lib/components/primitives/layout/Section';

  type Args = {
    text: string;
  };

  const { Story } = defineMeta({
    title: 'Library/Primitives/Layout/Section',
    component: Section,
    render: template,
    tags: ['autodocs'],
    args: {
      text: 'Section constrains page content and keeps wrappers consistent.',
    },
    parameters: {
      docs: {
        description: {
          component:
            'Just a max-width and padding wrapper. Swap the child content in the control below and the constraint holds — no page section picks its own width, so nothing on the page can silently drift wider than the rest.',
        },
      },
    },
  });
</script>

{#snippet template(args: Args)}
  <Section className="story-section">
    <p>{args.text}</p>
  </Section>
{/snippet}

<Story name="Default" />

<style lang="scss">
  :global(.story-section) {
    color: var(--token-text-secondary);
    font-family: var(--token-font-family-sans);
  }
</style>
