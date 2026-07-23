<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import SkillsSection from '$lib/SkillsSection.svelte';

  interface Skill {
    name: string;
    level?: 'expert' | 'advanced' | 'proficient' | 'learning';
    years?: number;
    category: string;
    description?: string;
    image: string;
  }

  interface SkillCategory {
    name: string;
    icon: string;
    color: string;
    skills: Skill[];
    mastery: 'expert' | 'advanced' | 'proficient';
  }

  const skillCategories: SkillCategory[] = [
    {
      name: 'Frontend Architecture',
      icon: '',
      color: 'primary',
      mastery: 'expert',
      skills: [
        {
          name: 'React',
          level: 'expert',
          years: 11,
          category: 'framework',
          description: 'Advanced patterns and performance optimization',
          image: 'icons/react-logo.png',
        },
        {
          name: 'TypeScript',
          level: 'expert',
          years: 9,
          category: 'language',
          description: 'Complex type systems and scalable frontend architecture',
          image: 'svg/Typescript_logo.svg',
        },
        {
          name: 'Svelte',
          years: 1,
          category: 'framework',
          description: 'Modern reactive patterns',
          image: 'svg/Svelte_Logo.svg',
        },
      ],
    },
    {
      name: 'Backend Systems',
      icon: '',
      color: 'secondary',
      mastery: 'expert',
      skills: [
        {
          name: 'Node.js',
          level: 'expert',
          years: 11,
          category: 'runtime',
          description: 'Microservices and event-driven architecture',
          image: 'icons/nodejs.png',
        },
        {
          name: 'PostgreSQL',
          years: 15,
          category: 'database',
          description: 'Complex queries and optimization',
          image: 'icons/postgresql.png',
        },
      ],
    },
  ];

  const { Story } = defineMeta({
    title: 'Page Sections/Skills',
    component: SkillsSection,
    tags: ['autodocs'],
    parameters: {
      docs: {
        description: {
          component:
            "When a skill omits `level`, it's derived from `years` instead (>7y expert, >4y advanced, >2y proficient, else learning) — try removing `level` from a skill with `years` set to see it reclassified. Categories are purely a filter over this computed list, not a separate source of level data. Swiping left/right on mobile cycles through categories the same as clicking a filter button.",
        },
      },
    },
  });
</script>

<Story name="Default">
  <SkillsSection
    title="Technical Expertise"
    subtitle="Skills shaped by curiosity, tested through years of real-world impact."
    {skillCategories}
    initialSelectedCategory="Frontend Architecture"
  />
</Story>

<Story name="Filtered to Backend">
  <SkillsSection
    title="Core Skills"
    subtitle="A smaller cross-section of the component-driven skills grid."
    {skillCategories}
    initialSelectedCategory="Backend Systems"
  />
</Story>
