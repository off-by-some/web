<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import TechCategoryCard from '$lib/components/site/skills/TechCategoryCard';
  import { hideControls } from './helpers/controls';

  const technologies = ['React', 'TypeScript', 'Svelte', 'SCSS', 'Accessibility', 'Storybook'];

  type Args = {
    title: string;
    technologies: string[];
  };

  const { Story } = defineMeta({
    title: 'Library/Site/Skills/Technology Category Card',
    component: TechCategoryCard,
    render: template,
    tags: ['autodocs'],
    args: {
      title: 'Frontend Architecture',
      technologies,
    },
    argTypes: {
      ...hideControls(['level']),
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
  <div class="story-width">
    <TechCategoryCard
      title={args.title}
      level="expert"
      technologies={args.technologies}
      onclick={() => console.log('Technology category clicked')}
    />
  </div>
{/snippet}

<Story name="Default" />

<style lang="scss">
  .story-width {
    color: var(--token-text-primary);
    font-family: var(--token-font-family-sans);
    max-width: 30rem;
  }
</style>
