<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import AboutMe from '$lib/AboutMe.svelte';
  import { fn } from 'storybook/test';

  const { Story } = defineMeta({
    title: 'Components/AboutMe',
    component: AboutMe,
    tags: ['autodocs'],
    argTypes: {
      name: {
        control: { type: 'text' },
        description: 'Full name to display',
      },
      role: {
        control: { type: 'text' },
        description: 'Professional role/title',
      },
      statusText: {
        control: { type: 'text' },
        description: 'Current availability status',
      },
      valueHeadline: {
        control: { type: 'text' },
        description: 'Main value proposition headline',
      },
      valueDescription: {
        control: { type: 'text' },
        description: 'Detailed value proposition description',
      },
      avatarSrc: {
        control: { type: 'text' },
        description: 'Avatar image source',
      },
      avatarAlt: {
        control: { type: 'text' },
        description: 'Avatar image alt text',
      },
      primaryButtonText: {
        control: { type: 'text' },
        description: 'Primary button text',
      },
      primaryButtonHref: {
        control: { type: 'text' },
        description: 'Primary button link',
      },
      secondaryButtonText: {
        control: { type: 'text' },
        description: 'Secondary button text',
      },
      secondaryButtonHref: {
        control: { type: 'text' },
        description: 'Secondary button link',
      },
      scrollText: {
        control: { type: 'text' },
        description: 'Scroll indicator text',
      },
      showCanvasBackground: {
        control: { type: 'boolean' },
        description: 'Whether to show canvas background container',
      },
      stats: {
        control: { type: 'object' },
        description: 'Array of stats to display',
      },
      techStack: {
        control: { type: 'object' },
        description: 'Array of tech stack categories',
      },
    },
    args: {
      primaryAction: fn(),
      secondaryAction: fn(),
      scrollIndicator: fn(),
    },
  });
</script>

<Story
  name="Default"
  args={{
    name: 'Cassidy Bridges',
    role: 'Software Engineering Leader',
    statusText: 'Available for new opportunities',
    valueHeadline:
      'I architect systems that scale, lead teams that thrive, and build products that last.',
    valueDescription:
      'With over a decade of experience turning complex challenges into elegant solutions, I specialize in building high-performance engineering teams and resilient distributed systems. From React frontends to cloud infrastructure, I create technology that just works.',
    avatarSrc: '/headshot.webp',
    avatarAlt: 'Cassidy Bridges',
    primaryButtonText: 'View Experience',
    primaryButtonHref: '#experience',
    secondaryButtonText: 'Get in Touch',
    secondaryButtonHref: '#contact',
    scrollText: 'Explore my work',
    showCanvasBackground: true,
    stats: [
      { count: '12', label: 'Years<br>Experience', type: 'years' },
      { count: '15', label: 'Teams<br>Lead', type: 'scale' },
      { count: '99.99%', label: 'System<br>Uptime', type: 'reliability' },
      { count: '16x', label: 'Code<br>Reduction', type: 'performance' },
    ],
    techStack: [
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
    ],
  }}
>
  <AboutMe
    name="Cassidy Bridges"
    role="Software Engineering Leader"
    statusText="Available for new opportunities"
    valueHeadline="I architect systems that scale, lead teams that thrive, and build products that last."
    valueDescription="With over a decade of experience turning complex challenges into elegant solutions, I specialize in building high-performance engineering teams and resilient distributed systems. From React frontends to cloud infrastructure, I create technology that just works."
    avatarSrc="/headshot.webp"
    avatarAlt="Cassidy Bridges"
    primaryButtonText="View Experience"
    primaryButtonHref="#experience"
    secondaryButtonText="Get in Touch"
    secondaryButtonHref="#contact"
    scrollText="Explore my work"
    showCanvasBackground={true}
    stats={[
      { count: '12', label: 'Years<br>Experience', type: 'years' },
      { count: '15', label: 'Teams<br>Lead', type: 'scale' },
      { count: '99.99%', label: 'System<br>Uptime', type: 'reliability' },
      { count: '16x', label: 'Code<br>Reduction', type: 'performance' },
    ]}
    techStack={[
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
    ]}
    on:primaryAction={(e) => console.log('Primary action:', e.detail)}
    on:secondaryAction={(e) => console.log('Secondary action:', e.detail)}
    on:scrollIndicator={() => console.log('Scroll indicator clicked')}
  />
</Story>
