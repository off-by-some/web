<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Projects from '$lib/Projects.svelte';
  import content from '$lib/content/en.json';
  import type { ProjectModel } from '$lib/components/site/projects';
  import ViewportFrame from './helpers/ViewportFrame.svelte';
  import { sectionViewportGlobals, sectionViewportParameters } from './helpers/section-viewports';
  import type { SectionViewport } from './helpers/section-viewports';

  type Args = {
    projects: ProjectModel[];
    title: string;
    subtitle: string;
    previewViewport: SectionViewport;
  };

  const projectSection = content.projectsSection;
  const defaultArgs: Args = {
    projects: projectSection.projects as ProjectModel[],
    title: projectSection.title,
    subtitle: projectSection.subtitle,
    previewViewport: 'desktop',
  };

  const { Story } = defineMeta({
    title: 'Page Sections/Projects',
    component: Projects,
    render: template,
    tags: ['autodocs'],
    args: defaultArgs,
    argTypes: {
      projects: {
        control: { type: 'object' },
        description:
          'Project entries rendered in tab order. Desktop uses the tab rail; narrower screens use dot navigation.',
      },
      title: {
        control: 'text',
        description: 'Heading rendered by the shared SectionHeader component.',
      },
      subtitle: {
        control: 'text',
        description: 'Supporting text rendered beneath the section heading.',
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
            'Projects is the full portfolio-work section. These stories focus on responsive behavior because the primary interaction is the same across every project: choose an entry, read the detail panel, then follow the project action.',
        },
      },
    },
  });
</script>

{#snippet template(args: Args)}
  <ViewportFrame mode={args.previewViewport}>
    <Projects projects={args.projects} title={args.title} subtitle={args.subtitle} />
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
