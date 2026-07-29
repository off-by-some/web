<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { HorizontalRule } from '$lib/pdf/primitives';
  import { hideControls } from '../../helpers/controls';
  import PdfStoryFrame from '../PdfStoryFrame.svelte';

  type Args = {
    filename: string;
    renderWidth: string;
  };

  const { Story } = defineMeta({
    title: 'PDF/Primitives/Horizontal Rule',
    component: HorizontalRule,
    render: template,
    tags: ['autodocs'],
    args: {
      filename: 'horizontal-rule.pdf',
      renderWidth: '34rem',
    },
    argTypes: {
      ...hideControls([]),
      filename: { control: 'text' },
      renderWidth: { control: 'text' },
    },
    parameters: {
      docs: {
        description: {
          component:
            'A decorative divider that exports as a vector rule in the PDF. Color is inherited via `currentColor` — set `color` on the element or a parent to style it. Always hidden from screen readers.',
        },
      },
    },
  });
</script>

{#snippet template(args: Args)}
  <PdfStoryFrame filename={args.filename} renderWidth={args.renderWidth}>
    <section class="horizontal-rule-story">
      <HorizontalRule class="horizontal-rule-story__rule horizontal-rule-story__rule--primary" />
      <HorizontalRule class="horizontal-rule-story__rule horizontal-rule-story__rule--muted" />
    </section>
  </PdfStoryFrame>
{/snippet}

<Story name="Default" />

<style lang="scss">
  .horizontal-rule-story {
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
    padding-block-start: 1rem;
  }

  :global(.horizontal-rule-story__rule) {
    display: block;
    block-size: 0.125rem;
  }

  :global(.horizontal-rule-story__rule--primary) {
    color: #1de9b6;
  }

  :global(.horizontal-rule-story__rule--muted) {
    color: #136353;
    opacity: 0.45;
  }
</style>
