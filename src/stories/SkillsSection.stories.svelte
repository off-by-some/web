<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import SkillsSection from '$lib/SkillsSection.svelte';
  import content from '$lib/content/en.json';
  import ViewportFrame from './helpers/ViewportFrame.svelte';
  import { sectionViewportGlobals, sectionViewportParameters } from './helpers/section-viewports';
  import type { SectionViewport } from './helpers/section-viewports';

  interface Skill {
    name: string;
    level?: 'expert' | 'advanced' | 'proficient' | 'learning';
    years?: number;
    category: string;
    description?: string;
    image: string;
  }

  interface SkillCategory {
    name: string;
    icon: string;
    color: string;
    skills: Skill[];
    mastery: 'expert' | 'advanced' | 'proficient';
  }

  type Args = {
    title: string;
    subtitle: string;
    skillCategories: SkillCategory[];
    initialSelectedCategory?: string | null;
    previewViewport: SectionViewport;
  };

  const skills = content.skillsSection;
  const skillCategories = skills.categories as SkillCategory[];
  const defaultArgs: Args = {
    title: skills.title,
    subtitle: skills.subtitle,
    skillCategories,
    initialSelectedCategory: skillCategories[0]?.name,
    previewViewport: 'desktop',
  };

  const { Story } = defineMeta({
    title: 'Page Sections/Skills',
    component: SkillsSection,
    render: template,
    tags: ['autodocs'],
    args: defaultArgs,
    argTypes: {
      title: { control: 'text' },
      subtitle: { control: 'text' },
      skillCategories: {
        control: { type: 'object' },
        description:
          'Skill categories and cards. Missing skill levels are derived from years of experience.',
      },
      initialSelectedCategory: {
        control: 'select',
        options: skillCategories.map((category) => category.name),
        description:
          'Category name to select on first render. Change this control to preview another category.',
      },
      previewViewport: {
        control: 'select',
        options: ['mobile', 'ipad', 'desktop'],
        table: { disable: true },
      },
    },
    parameters: {
      layout: 'fullscreen',
      docs: {
        description: {
          component:
            'Skills is the searchable competency section. It demonstrates how the shared card, tone, image, and filter-button primitives work together across a dense grid.',
        },
      },
    },
  });
</script>

{#snippet template(args: Args)}
  <ViewportFrame mode={args.previewViewport}>
    <SkillsSection
      title={args.title}
      subtitle={args.subtitle}
      skillCategories={args.skillCategories}
      initialSelectedCategory={args.initialSelectedCategory}
      onSkillSelect={(payload) => console.log('Skill selected:', payload)}
      onCategorySelect={(payload) => console.log('Category selected:', payload)}
    />
  </ViewportFrame>
{/snippet}

<Story
  name="Desktop"
  args={{ ...defaultArgs, previewViewport: 'desktop' }}
  globals={sectionViewportGlobals.desktop}
  parameters={sectionViewportParameters('desktop')}
/>

<Story
  name="Mobile"
  args={{ ...defaultArgs, previewViewport: 'mobile' }}
  globals={sectionViewportGlobals.mobile}
  parameters={sectionViewportParameters('mobile')}
/>

<Story
  name="iPad"
  args={{ ...defaultArgs, previewViewport: 'ipad' }}
  globals={sectionViewportGlobals.ipad}
  parameters={sectionViewportParameters('ipad')}
/>
