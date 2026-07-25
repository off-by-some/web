<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ExperienceCard from '$lib/components/site/timeline/ExperienceCard';
  import { hideControls } from './helpers/controls';

  const experience = {
    title: 'Principal Engineer',
    company: 'Example Studio',
    logo: 'svg/Svelte_Logo.svg',
    date: '2021 - Present',
    dateValue: '2021',
    location: 'Remote',
    summary: 'Built design systems and delivery patterns for high-polish product surfaces.',
    highlights: [
      'Created a composable component library with shared card and button primitives.',
      'Improved frontend consistency while preserving existing visual polish.',
    ],
    skills: ['Svelte', 'SCSS', 'Design Systems'],
  };

  type Args = {
    experience: typeof experience;
    active: boolean;
    expanded: boolean;
  };

  const { Story } = defineMeta({
    title: 'Library/Site/Timeline/Experience Card',
    component: ExperienceCard,
    render: template,
    tags: ['autodocs'],
    args: {
      experience,
      active: true,
      expanded: true,
    },
    argTypes: {
      ...hideControls(['index', 'clickable']),
    },
    parameters: {
      docs: {
        description: {
          component:
            'Summary and highlight text run through a small markdown-link parser — write `[label](https://...)` inside `experience.summary` or `.highlights` and it renders as a real anchor; anything else stays literal text, so a bracket that isn\'t a real link is left alone rather than stripped. The card is only clickable when `clickable` is true (ExperienceCard itself doesn\'t decide this — TimelineSection passes it based on a desktop breakpoint check); the "More/Less" expand button works independently and stops its click from bubbling to the card underneath it.',
        },
      },
    },
  });
</script>

{#snippet template(args: Args)}
  <div class="story-width">
    <ExperienceCard
      experience={args.experience}
      index={0}
      active={args.active}
      expanded={args.expanded}
      clickable={false}
      onSelect={() => console.log('Experience selected')}
      onToggle={() => console.log('Experience toggled')}
    />
  </div>
{/snippet}

<Story name="Default" />

<style lang="scss">
  .story-width {
    color: var(--token-text-primary);
    font-family: var(--token-font-family-sans);
    width: min(72rem, calc(100vw - 4rem));
    max-width: 100%;
  }
</style>
