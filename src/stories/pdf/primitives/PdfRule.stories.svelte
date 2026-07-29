<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { PdfRule } from '$lib/pdf/primitives';
  import { hideControls } from '../../helpers/controls';
  import PdfStoryFrame from '../PdfStoryFrame.svelte';

  type Args = {
    filename: string;
    renderWidth: string;
  };

  const { Story } = defineMeta({
    title: 'PDF/Primitives/Pdf Rule',
    component: PdfRule,
    render: template,
    tags: ['autodocs'],
    args: {
      filename: 'pdf-rule.pdf',
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
            'PDF-aware rule primitive. It renders as a normal DOM element and as a vector rule in the exported PDF, using currentColor for styling.',
        },
      },
    },
  });
</script>

{#snippet template(args: Args)}
  <PdfStoryFrame filename={args.filename} renderWidth={args.renderWidth}>
    <section class="pdf-rule-story">
      <PdfRule class="pdf-rule-story__rule pdf-rule-story__rule--primary" />
      <PdfRule class="pdf-rule-story__rule pdf-rule-story__rule--muted" />
    </section>
  </PdfStoryFrame>
{/snippet}

<Story name="Default" />

<style lang="scss">
  .pdf-rule-story {
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
    padding-block-start: 1rem;
  }

  :global(.pdf-rule-story__rule) {
    display: block;
    block-size: 0.125rem;
  }

  :global(.pdf-rule-story__rule--primary) {
    color: #1de9b6;
  }

  :global(.pdf-rule-story__rule--muted) {
    color: #136353;
    opacity: 0.45;
  }
</style>
