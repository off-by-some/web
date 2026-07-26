<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Header from '$lib/components/primitives/typography/Header';
  import { designReferences } from './docs/design-notes';
  import { hideControls } from './helpers/controls';

  type Args = {
    title: string;
    subtitle: string;
  };

  const { Story } = defineMeta({
    title: 'Library/Primitives/Typography/Header',
    component: Header,
    render: template,
    tags: ['autodocs'],
    argTypes: {
      ...hideControls(['as']),
    },
    args: {
      title: 'Header',
      subtitle: 'Semantic wrapper for composed headings.',
    },
    parameters: {
      docs: {
        description: {
          component: `A thin semantic wrapper — \`<header>\` by default, or \`<div>\` via \`as\` when a nested header would be invalid HTML — that box-sizing/font-inherit resets and gives every heading block one composition point. Line-height, measure, and text alignment aren't enforced here; each consumer (SectionHeader, SectionAccentHeader) sets its own, which is why those are the components to check against [W3C Visual Presentation](${designReferences.visualPresentation}) and [IFLA dyslexia-friendly printing guidance](${designReferences.dyslexiaPrinting}), not this wrapper.`,
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
    color: var(--token-theme-color-text-primary);
    font-family: var(--token-reference-typography-family-sans);
  }

  h2 {
    color: var(--token-theme-color-text-heading);
    font-size: var(--token-reference-typography-size-3xl);
    margin: 0;
    margin-block-end: var(--token-reference-spacing-fluid-sm);
  }

  p {
    color: var(--token-theme-color-text-secondary);
    font-size: var(--token-reference-typography-size-lg);
    margin: 0;
  }
</style>
