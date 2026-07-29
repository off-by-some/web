<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import TechCategoryCard from '$lib/components/site/skills/TechCategoryCard';
  import { hideControls } from '../../../helpers/controls';

  const technologies = ['React', 'TypeScript', 'Svelte', 'SCSS', 'Accessibility', 'Storybook'];

  const overflowTechnologies = technologies.concat(['Node.js', 'GraphQL', 'Docker', 'Kubernetes']);

  type Args = {
    title: string;
    level: 'expert' | 'advanced';
    technologies: string[];
    narrow: boolean;
  };

  const { Story } = defineMeta({
    title: 'Component Library/Site/Skills/Technology Category Card',
    component: TechCategoryCard,
    render: template,
    tags: ['autodocs'],
    args: {
      title: 'Frontend Architecture',
      level: 'expert',
      technologies,
      narrow: false,
    },
    argTypes: {
      level: {
        control: 'select',
        options: ['expert', 'advanced'],
      },
      narrow: {
        control: 'boolean',
        description:
          'Story-only toggle that shrinks the preview to force the tag-overflow "+N" collapse described above.',
      },
      ...hideControls(['delay', 'onSelectRequested']),
    },
    parameters: {
      docs: {
        description: {
          component:
            'Measures how many technology tags fit in two lines by rendering an offscreen clone and re-measuring on every resize (via ResizeObserver), then collapses whatever doesn\'t fit into a single "+N" tag rather than wrapping to a third line. Resize the preview pane to watch tags move in and out of the overflow count — this is the one component here that touches the DOM directly for layout instead of relying on CSS alone.',
        },
      },
    },
  });
</script>

{#snippet template(args: Args)}
  <div class="story-width" class:story-width--narrow={args.narrow}>
    <TechCategoryCard
      title={args.title}
      level={args.level}
      technologies={args.technologies}
      onSelectRequested={() => console.log('Technology category selected')}
    />
  </div>
{/snippet}

<Story name="Default" />

<Story name="Advanced" args={{ level: 'advanced' }} />

<Story
  name="Overflow in Narrow Container"
  args={{ technologies: overflowTechnologies, narrow: true }}
/>

<style lang="scss">
  .story-width {
    color: var(--token-theme-color-text-primary);
    font-family: var(--token-reference-typography-family-sans);
    max-inline-size: 30rem;
  }

  .story-width--narrow {
    max-inline-size: 16rem;
  }
</style>
