<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ProjectCard from '$lib/components/site/projects/ProjectCard';
  import content from '$lib/content/en.json';
  import type { ProjectModel } from '$lib/components/site/projects';

  type Args = {
    project: ProjectModel;
    mediaReady: boolean;
  };

  const projects = content.projectsSection.projects as ProjectModel[];
  const defaultProject = projects[0];
  const highlightedProject =
    projects.find((project) => project.highlights?.length) ?? defaultProject;
  const longProject: ProjectModel = {
    ...defaultProject,
    name: 'A Deliberately Long Project Name That Must Wrap Cleanly',
    tagline:
      'A long tagline that checks whether spacing, wrapping, and action layout still hold inside a constrained card.',
    tags: [
      'Long Content',
      'Responsive Layout',
      'Accessible Interactions',
      'Component Contracts',
      'Design Systems',
    ],
  };

  const { Story } = defineMeta({
    title: 'Component Library/Site/Projects/Project Card',
    component: ProjectCard,
    render: template,
    tags: ['autodocs'],
    args: {
      project: defaultProject,
      mediaReady: true,
    },
    argTypes: {
      project: {
        control: { type: 'object' },
        description:
          'A cohesive project presentation model. The card does not reach back into route or page content.',
      },
      mediaReady: {
        control: 'boolean',
        description:
          'Whether banner and badge media may render. ProjectsSection owns when to prefetch and reveal media.',
      },
    },
    parameters: {
      docs: {
        description: {
          component:
            'ProjectCard owns the detail surface for one project: banner, badges, copy, highlights, tags, and actions. Its outer box stretches to the parent while internal typography responds to the card container.',
        },
      },
    },
  });
</script>

{#snippet template(args: Args)}
  <div class="story-card-shell">
    <ProjectCard project={args.project} mediaReady={args.mediaReady} />
  </div>
{/snippet}

<Story name="Default" />
<Story name="With Highlights" args={{ project: highlightedProject, mediaReady: true }} />
<Story name="Long Content" args={{ project: longProject, mediaReady: true }} />
<Story name="Media Not Ready" args={{ project: defaultProject, mediaReady: false }} />

<style lang="scss">
  .story-card-shell {
    inline-size: min(100%, 56rem);
    min-inline-size: 0;
    color: var(--token-theme-color-text-primary);
    font-family: var(--token-reference-typography-family-sans);
  }
</style>
