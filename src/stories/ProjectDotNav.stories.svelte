<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ProjectDotNav from '$lib/components/site/projects/ProjectDotNav';
  import content from '$lib/content/en.json';
  import type { ProjectModel } from '$lib/components/site/projects';

  type Args = {
    projects: ProjectModel[];
    activeIndex: number;
    visible: boolean;
    position: 'top' | 'bottom';
    mediaReady: boolean;
  };

  const projects = content.projectsSection.projects as ProjectModel[];

  const { Story } = defineMeta({
    title: 'Library/Site/Projects/Project Dot Navigation',
    component: ProjectDotNav,
    render: template,
    tags: ['autodocs'],
    args: {
      projects,
      activeIndex: 0,
      visible: true,
      position: 'top',
      mediaReady: true,
    },
    argTypes: {
      projects: {
        control: { type: 'object' },
        description: 'Projects represented by circular banner thumbnails.',
      },
      activeIndex: {
        control: { type: 'number', min: 0, max: Math.max(projects.length - 1, 0), step: 1 },
        description: 'Selected project index owned by ProjectsSection.',
      },
      visible: {
        control: 'boolean',
        description: 'Semantic visibility state; hidden rails are removed from tab order.',
      },
      position: {
        control: 'select',
        options: ['top', 'bottom'],
        description: 'Directional entrance treatment for the rail.',
      },
      mediaReady: {
        control: 'boolean',
        description: 'Whether thumbnail media may render.',
      },
    },
    parameters: {
      docs: {
        description: {
          component:
            'Compact project navigation for tablet and mobile layouts. It receives selection state and reports selection intent, but does not own the active project.',
        },
      },
    },
  });
</script>

{#snippet template(args: Args)}
  <div class="story-dot-shell">
    <ProjectDotNav
      projects={args.projects}
      activeIndex={args.activeIndex}
      visible={args.visible}
      position={args.position}
      mediaReady={args.mediaReady}
      onSelectRequested={(index) => console.log('Project requested:', index)}
    />
  </div>
{/snippet}

<Story name="Default" />

<Story name="Bottom Position" args={{ position: 'bottom' }} />

<Story name="Hidden" args={{ visible: false }} />

<style lang="scss">
  .story-dot-shell {
    inline-size: min(100%, 40rem);
    color: var(--token-text-primary);
    font-family: var(--token-font-family-sans);
  }
</style>
