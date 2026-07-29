<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { ResumeProject } from '$lib/pdf/site';
  import type { Project } from '$lib/pdf/site';
  import ResumeComponentStoryFrame from './ResumeComponentStoryFrame.svelte';
  import { storyProject } from './resume-story-data';

  type Args = {
    filename: string;
    project: Project;
  };

  const { Story } = defineMeta({
    title: 'PDF/Site/Resume Project',
    component: ResumeProject,
    render: template,
    tags: ['autodocs'],
    args: {
      filename: 'resume-project.pdf',
      project: storyProject,
    },
    argTypes: {
      filename: { control: 'text' },
      project: { control: 'object' },
    },
  });
</script>

{#snippet template(args: Args)}
  <ResumeComponentStoryFrame filename={args.filename}>
    <ResumeProject project={args.project} />
  </ResumeComponentStoryFrame>
{/snippet}

<Story name="Default" />
