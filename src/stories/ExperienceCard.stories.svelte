<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ExperienceCard from '$lib/components/site/timeline/ExperienceCard';

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

  const { Story } = defineMeta({
    title: 'Library/Site/Timeline/Experience Card',
    component: ExperienceCard,
    tags: ['autodocs'],
    args: {
      experience,
      index: 0,
      active: true,
      expanded: true,
      clickable: true,
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

<Story name="Expanded" asChild>
  <ExperienceCard {experience} index={0} active expanded clickable />
</Story>
