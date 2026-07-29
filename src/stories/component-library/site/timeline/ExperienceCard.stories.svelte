<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ExperienceCard from '$lib/components/site/timeline/ExperienceCard';
  import { hideControls } from '../../../helpers/controls';

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
    detailsClickable: boolean;
  };

  const { Story } = defineMeta({
    title: 'Component Library/Site/Timeline/Experience Card',
    component: ExperienceCard,
    render: template,
    tags: ['autodocs'],
    args: {
      experience,
      active: true,
      expanded: true,
      detailsClickable: false,
    },
    argTypes: {
      ...hideControls(['index', 'delay', 'onDetailsToggleRequested']),
    },
    parameters: {
      docs: {
        description: {
          component:
            'Summary and highlight text run through a small markdown-link parser — write `[label](https://...)` inside `experience.summary` or `.highlights` and it renders as a real anchor; anything else stays literal text, so a bracket that is not a real link is left alone rather than stripped. The card is only clickable when `detailsClickable` is true; the "More/Less" button always reports the same semantic details-toggle request and stops its click from bubbling to the card surface.',
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
      detailsClickable={args.detailsClickable}
      onDetailsToggleRequested={() => console.log('Experience details toggle requested')}
    />
  </div>
{/snippet}

<Story name="Default" />

<Story name="Collapsed" args={{ expanded: false }} />

<Story name="Inactive" args={{ active: false }} />

<style lang="scss">
  .story-width {
    color: var(--token-theme-color-text-primary);
    font-family: var(--token-reference-typography-family-sans);
    inline-size: min(72rem, calc(100vw - 4rem));
    max-inline-size: 100%;
  }
</style>
