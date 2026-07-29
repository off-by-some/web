<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import SkillCard from '$lib/components/site/skills/SkillCard';
  import { hideControls } from '../../../helpers/controls';

  type Skill = {
    name: string;
    level: 'expert' | 'advanced' | 'proficient' | 'learning';
    years?: number;
    description?: string;
    image: string;
  };

  const skill: Skill = {
    name: 'TypeScript',
    level: 'expert',
    years: 9,
    description: 'Complex type systems and scalable frontend architecture',
    image: 'svg/Typescript_logo.svg',
  };

  type Args = {
    skill: Skill;
    hovered: boolean;
  };

  const { Story } = defineMeta({
    title: 'Component Library/Site/Skills/Skill Card',
    component: SkillCard,
    render: template,
    tags: ['autodocs'],
    args: {
      skill,
      hovered: false,
    },
    argTypes: {
      ...hideControls(['delay', 'onEngagementChangeRequested']),
    },
    parameters: {
      docs: {
        description: {
          component:
            "`level` drives its own accent color and glow (expert/advanced/proficient/learning each get a distinct hue) independently of `years` — nothing here calculates level from years, that math lives in SkillsSection instead. The description line is hidden until hover/focus above the md breakpoint, but stays visible at reduced opacity below it, since hover isn't a reliable signal on touch.",
        },
      },
    },
  });
</script>

{#snippet template(args: Args)}
  <div class="story-width">
    <SkillCard
      skill={args.skill}
      hovered={args.hovered}
      onEngagementChangeRequested={(active) => console.log('Skill engagement changed:', active)}
    />
  </div>
{/snippet}

<Story name="Default" />

<Story
  name="Advanced"
  args={{
    skill: { ...skill, name: 'Go', level: 'advanced', years: 6, image: 'icons/golang logo.png' },
  }}
/>

<Story
  name="Proficient"
  args={{
    skill: {
      ...skill,
      name: 'GraphQL',
      level: 'proficient',
      years: 3,
      image: 'icons/Graphql.webp',
    },
  }}
/>

<Story
  name="Learning"
  args={{
    skill: { ...skill, name: 'Jest', level: 'learning', years: 1, image: 'svg/Jest.svg' },
  }}
/>

<Story name="Hovered" args={{ hovered: true }} />

<style lang="scss">
  .story-width {
    color: var(--token-theme-color-text-primary);
    font-family: var(--token-reference-typography-family-sans);
    max-inline-size: 22rem;
  }
</style>
