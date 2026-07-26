<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ProjectTabList from '$lib/components/site/projects/ProjectTabList';
  import content from '$lib/content/en.json';
  import type { ProjectModel } from '$lib/components/site/projects';

  type Args = {
    projects: ProjectModel[];
    activeIndex: number;
  };

  const projects = content.projectsSection.projects as ProjectModel[];

  const { Story } = defineMeta({
    title: 'Library/Site/Projects/Project Tab List',
    component: ProjectTabList,
    render: template,
    tags: ['autodocs'],
    args: {
      projects,
      activeIndex: 0,
    },
    argTypes: {
      projects: {
        control: { type: 'object' },
        description: 'Project options rendered in desktop tab order.',
      },
      activeIndex: {
        control: { type: 'number', min: 0, max: Math.max(projects.length - 1, 0), step: 1 },
        description: 'Selected project index owned by ProjectsSection.',
      },
    },
    parameters: {
      docs: {
        description: {
          component:
            'Desktop project picker with vertical tab semantics and keyboard navigation. It reports selection requests instead of owning project state.',
        },
      },
    },
  });
</script>

{#snippet template(args: Args)}
  <div class="story-tab-shell">
    <ProjectTabList
      projects={args.projects}
      activeIndex={args.activeIndex}
      onSelectRequested={(index, metadata) =>
        console.log('Project requested:', { index, cause: metadata.cause })}
    />
  </div>
{/snippet}

<Story name="Default" />

<style lang="scss">
  .story-tab-shell {
    inline-size: min(100%, 22rem);
    color: var(--token-theme-color-text-primary);
    font-family: var(--token-reference-typography-family-sans);
  }
</style>
