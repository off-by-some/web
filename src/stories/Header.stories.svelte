<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Header from '$lib/components/primitives/typography/Header';
  import { designReferences } from './docs/design-notes';

  type Args = {
    title: string;
    subtitle: string;
  };

  const { Story } = defineMeta({
    title: 'Library/Primitives/Typography/Header',
    component: Header,
    render: template,
    tags: ['autodocs'],
    args: {
      title: 'Header',
      subtitle: 'Semantic wrapper for composed headings.',
    },
    parameters: {
      docs: {
        description: {
          component: `Wraps composed headings so line-height, measure, and non-justified text stay consistent wherever a heading appears — the kind of detail that's easy to drift on page-by-page and hard to notice once it has. References: [W3C Visual Presentation](${designReferences.visualPresentation}) and [IFLA dyslexia-friendly printing guidance](${designReferences.dyslexiaPrinting}).`,
        },
      },
    },
  });
</script>

{#snippet template(args: Args)}
  <Header className="story-header">
    <h2>{args.title}</h2>
    <p>{args.subtitle}</p>
  </Header>
{/snippet}

<Story name="Default" />

<style lang="scss">
  :global(.story-header) {
    color: var(--token-text-primary);
    font-family: var(--token-font-family-sans);
  }

  h2 {
    color: var(--token-text-heading);
    font-size: var(--token-font-size-3xl);
    margin-bottom: var(--token-space-fluid-sm);
  }

  p {
    color: var(--token-text-secondary);
    font-size: var(--token-font-size-lg);
    margin: 0;
  }
</style>
