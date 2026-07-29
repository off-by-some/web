<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { ResumeDocument } from '$lib/pdf/site';
  import type { ResumeData } from '$lib/pdf/site';
  import { hideControls } from '../../helpers/controls';
  import ResumeDocumentExample from './ResumeDocumentExample.svelte';
  import { storyResume } from './resume-story-data';

  type Args = {
    resume: ResumeData;
  };

  const { Story } = defineMeta({
    title: 'PDF/Site/Resume Document',
    component: ResumeDocument,
    render: template,
    tags: ['autodocs'],
    args: {
      resume: storyResume,
    },
    argTypes: {
      ...hideControls(['download']),
      resume: { control: 'object' },
    },
    parameters: {
      docs: {
        description: {
          component:
            'Site-specific resume renderer. The same Svelte components produce the Storybook preview, route preview, and downloadable vector PDF.',
        },
      },
    },
  });
</script>

{#snippet template(args: Args)}
  <ResumeDocumentExample resume={args.resume} />
{/snippet}

<Story name="Default" />
