<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import VisuallyHidden from '$lib/components/primitives/accessibility/VisuallyHidden';
  import { hideControls } from './helpers/controls';

  type Args = {
    text: string;
    as: 'span' | 'div' | 'p' | 'h2' | 'h3' | 'h4';
  };

  const { Story } = defineMeta({
    title: 'Library/Primitives/Accessibility/Visually Hidden',
    component: VisuallyHidden,
    render: template,
    tags: ['autodocs'],
    args: {
      text: 'Screen-reader-only status message',
      as: 'span',
    },
    argTypes: {
      ...hideControls(['children', 'className']),
      as: { control: 'select', options: ['span', 'div', 'p', 'h2', 'h3', 'h4'] },
      text: { control: 'text' },
    },
    parameters: {
      docs: {
        description: {
          component:
            'VisuallyHidden centralizes the screen-reader-only pattern used by live regions and hidden headings. It keeps content available to assistive technology without relying on each section to copy the same clipping CSS.',
        },
      },
    },
  });
</script>

{#snippet template(args: Args)}
  <div class="story-preview">
    <p>This story intentionally has no visible rendered content below.</p>
    <VisuallyHidden as={args.as}>{args.text}</VisuallyHidden>
  </div>
{/snippet}

<Story name="Default" />

<Story name="Live Region" asChild>
  <div class="story-preview">
    <p>The hidden status text is present in the accessibility tree.</p>
    <VisuallyHidden as="div" role="status" aria-live="polite">
      Filtered to Frontend Architecture. Showing 13 skills.
    </VisuallyHidden>
  </div>
</Story>

<style lang="scss">
  .story-preview {
    color: var(--token-theme-color-text-primary);
    font-family: var(--token-reference-typography-family-sans);
    max-inline-size: 28rem;
  }
</style>
