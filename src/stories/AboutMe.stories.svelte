<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import AboutMe from '$lib/AboutMe.svelte';

  type StatType = 'years' | 'scale' | 'reliability' | 'performance' | 'languages';
  type TechLevel = 'expert' | 'advanced';

  const aboutMeStats: Array<{ count: string; label: string; type: StatType }> = [
    { count: '12', label: 'Years Experience', type: 'years' },
    { count: '15', label: 'Teams Led', type: 'scale' },
    { count: '99.99%', label: 'System Uptime', type: 'reliability' },
    { count: '16x', label: 'Code Reduction', type: 'performance' },
  ];

  const aboutMeTechStack: Array<{
    title: string;
    level: TechLevel;
    technologies: string[];
  }> = [
    {
      title: 'Frontend',
      level: 'expert',
      technologies: ['React', 'TypeScript', 'Next.js'],
    },
    {
      title: 'Backend',
      level: 'expert',
      technologies: ['Node.js', 'Python', 'Go'],
    },
    {
      title: 'Infrastructure',
      level: 'advanced',
      technologies: ['AWS', 'Kubernetes', 'Terraform'],
    },
    {
      title: 'Leadership',
      level: 'expert',
      technologies: ['Team Building', 'Architecture', 'Strategy'],
    },
  ];

  const aboutMeArgs = {
    name: 'Cassidy Bridges',
    role: 'Software Engineering Leader',
    statusText: 'Available for new opportunities',
    valueHeadline:
      'I architect systems that scale, lead teams that thrive, and build products that last.',
    valueDescription:
      'With over a decade of experience turning complex challenges into elegant solutions, I specialize in building high-performance engineering teams and resilient distributed systems. From React frontends to cloud infrastructure, I create technology that just works.',
    avatarSrc: 'headshot.png',
    avatarAlt: 'Cassidy Bridges',
    primaryButtonText: 'View Experience',
    secondaryButtonText: 'Get in Touch',
    scrollText: 'Explore my work',
    showCanvasBackground: true,
    stats: aboutMeStats,
    techStack: aboutMeTechStack,
  };

  const { Story } = defineMeta({
    title: 'Page Sections/About Me',
    component: AboutMe,
    tags: ['autodocs'],
    argTypes: {
      name: { control: { type: 'text' } },
      role: { control: { type: 'text' } },
      statusText: { control: { type: 'text' } },
      valueHeadline: { control: { type: 'text' } },
      valueDescription: { control: { type: 'text' } },
      avatarSrc: { control: { type: 'text' } },
      avatarAlt: { control: { type: 'text' } },
      primaryButtonText: { control: { type: 'text' } },
      secondaryButtonText: { control: { type: 'text' } },
      scrollText: { control: { type: 'text' } },
      showCanvasBackground: {
        control: { type: 'boolean' },
        description:
          'Turn off when AboutMe is nested inside a section that already paints its own background, to avoid stacking two canvases.',
      },
      stats: {
        control: { type: 'object' },
        description:
          "{count, label, type} tiles rendered in array order — type selects the tile's icon and accent color, it does not affect sorting.",
      },
      techStack: {
        control: { type: 'object' },
        description:
          '{title, level, technologies} groups rendered in array order — level ("expert" | "advanced") drives the badge shown next to the group title.',
      },
    },
    args: aboutMeArgs,
    parameters: {
      docs: {
        description: {
          component:
            "Assembles the entire hero section — profile, value prop, stats panel, tech panel, GitHub link, and scroll indicator — from one flat prop list; none of AboutMe's own props are rendered directly, they're all just passed through to whichever of the seven child components owns that piece of content. `showCanvasBackground` only toggles an empty `#hero-canvas-container` div — AboutMe doesn't render a canvas itself, so turning this on without something else painting into that container does nothing visible.",
        },
      },
    },
  });
</script>

<Story name="Default" args={aboutMeArgs}>
  <AboutMe
    {...aboutMeArgs}
    onPrimaryAction={() => console.log('Primary action')}
    onSecondaryAction={() => console.log('Secondary action')}
    onScrollIndicator={() => console.log('Scroll indicator clicked')}
  />
</Story>
