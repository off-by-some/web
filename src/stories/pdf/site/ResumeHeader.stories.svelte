<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { ResumeHeader } from '$lib/pdf/site';
  import type { ResumeData } from '$lib/pdf/site';
  import ResumeComponentStoryFrame from './ResumeComponentStoryFrame.svelte';
  import { storyResume } from './resume-story-data';

  type Args = {
    contacts: ResumeData['contacts'];
    filename: string;
    name: ResumeData['name'];
    role: ResumeData['role'];
  };

  const { Story } = defineMeta({
    title: 'PDF/Site/Resume Header',
    component: ResumeHeader,
    render: template,
    tags: ['autodocs'],
    args: {
      contacts: storyResume.contacts,
      filename: 'resume-header.pdf',
      name: storyResume.name,
      role: storyResume.role,
    },
    argTypes: {
      contacts: { control: 'object' },
      filename: { control: 'text' },
      name: { control: 'text' },
      role: { control: 'text' },
    },
  });
</script>

{#snippet template(args: Args)}
  <ResumeComponentStoryFrame filename={args.filename}>
    <ResumeHeader name={args.name} role={args.role} contacts={args.contacts} />
  </ResumeComponentStoryFrame>
{/snippet}

<Story name="Default" />
