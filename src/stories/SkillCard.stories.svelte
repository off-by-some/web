<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import SkillCard from '$lib/components/site/skills/SkillCard';

  const skill = {
    name: 'TypeScript',
    level: 'expert',
    years: 9,
    description: 'Complex type systems and scalable frontend architecture',
    image: 'svg/Typescript_logo.svg',
  } as const;

  const { Story } = defineMeta({
    title: 'Library/Site/Skills/Skill Card',
    component: SkillCard,
    tags: ['autodocs'],
    args: {
      skill,
      index: 0,
      hovered: false,
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

<Story name="Default" asChild>
  <div class="story-width">
    <SkillCard {skill} />
  </div>
</Story>

<style lang="scss">
  .story-width {
    color: var(--token-text-primary);
    font-family: var(--token-font-family-sans);
    max-width: 22rem;
  }
</style>
