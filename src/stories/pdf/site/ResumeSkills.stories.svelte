<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { ResumeSkills } from '$lib/pdf/site';
  import type { SkillCategory } from '$lib/pdf/site';
  import ResumeComponentStoryFrame from './ResumeComponentStoryFrame.svelte';
  import { storySkillCategories } from './resume-story-data';

  type Args = {
    categories: SkillCategory[];
    filename: string;
  };

  const { Story } = defineMeta({
    title: 'PDF/Site/Resume Skills',
    component: ResumeSkills,
    render: template,
    tags: ['autodocs'],
    args: {
      categories: storySkillCategories,
      filename: 'resume-skills.pdf',
    },
    argTypes: {
      categories: { control: 'object' },
      filename: { control: 'text' },
    },
  });
</script>

{#snippet template(args: Args)}
  <ResumeComponentStoryFrame filename={args.filename}>
    <ResumeSkills categories={args.categories} />
  </ResumeComponentStoryFrame>
{/snippet}

<Story name="Default" />
