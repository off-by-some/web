<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import AboutMe from '$lib/AboutMe.svelte';
  import content from '$lib/content/en.json';
  import ViewportFrame from './helpers/ViewportFrame.svelte';
  import { sectionViewportGlobals, sectionViewportParameters } from './helpers/section-viewports';
  import type { SectionViewport } from './helpers/section-viewports';
  import { hideControls } from './helpers/controls';

  type StatType = 'years' | 'scale' | 'reliability' | 'performance' | 'languages';
  type TechLevel = 'expert' | 'advanced';

  type Args = {
    name: string;
    role: string;
    statusText: string;
    valueHeadline: string;
    valueDescription: string;
    avatarSrc: string;
    avatarAlt: string;
    primaryButtonText: string;
    linkedinUrl?: string;
    githubUrl?: string;
    resumeHref?: string;
    scrollText: string;
    showCanvasBackground: boolean;
    metricsTitle?: string;
    techTitle?: string;
    scrollAriaLabel?: string;
    stats: Array<{ count: string; label: string; type: StatType }>;
    techStack: Array<{
      title: string;
      level: TechLevel;
      technologies: string[];
    }>;
    previewViewport: SectionViewport;
  };

  const contactMethods = content.contactMe.methods;
  const skillCategories = content.skillsSection.categories;
  const companyCount = content.timelineSection.experiences.length;
  const aboutMe = content.aboutMe;
  const linkedinUrl = contactMethods.find((method) => method.type === 'linkedin')?.href;
  const githubUrl = contactMethods.find((method) => method.type === 'github')?.href;

  const stats = aboutMe.stats.map((stat) => ({
    type: stat.type as StatType,
    label: stat.label,
    count: 'count' in stat && stat.count ? stat.count : String(companyCount),
  }));

  const techStack = skillCategories.map((category) => ({
    title: category.name,
    level: category.mastery as TechLevel,
    technologies: category.skills.map((skill) => skill.name).sort((a, b) => a.length - b.length),
  }));

  const aboutMeArgs: Args = {
    name: aboutMe.name,
    role: aboutMe.role,
    statusText: aboutMe.statusText,
    valueHeadline: aboutMe.valueHeadline,
    valueDescription: aboutMe.valueDescription,
    avatarSrc: aboutMe.avatarSrc,
    avatarAlt: aboutMe.avatarAlt,
    primaryButtonText: aboutMe.primaryButtonText,
    linkedinUrl,
    githubUrl,
    resumeHref: '/resume/Cassidy-Bridges-Software-Engineering.pdf',
    scrollText: aboutMe.scrollText,
    showCanvasBackground: true,
    metricsTitle: aboutMe.metricsTitle,
    techTitle: aboutMe.techTitle,
    scrollAriaLabel: aboutMe.scrollIndicatorAriaLabel,
    stats,
    techStack,
    previewViewport: 'desktop',
  };

  const { Story } = defineMeta({
    title: 'Page Sections/About Me',
    component: AboutMe,
    render: template,
    tags: ['autodocs'],
    args: aboutMeArgs,
    argTypes: {
      ...hideControls([
        'avatarAlt',
        'linkedinUrl',
        'githubUrl',
        'resumeHref',
        'scrollAriaLabel',
        'showCanvasBackground',
      ]),
      name: { control: { type: 'text' } },
      role: { control: { type: 'text' } },
      statusText: { control: { type: 'text' } },
      valueHeadline: { control: { type: 'text' } },
      valueDescription: { control: { type: 'text' } },
      avatarSrc: { control: { type: 'text' } },
      primaryButtonText: { control: { type: 'text' } },
      scrollText: { control: { type: 'text' } },
      metricsTitle: { control: { type: 'text' } },
      techTitle: { control: { type: 'text' } },
      stats: {
        control: { type: 'object' },
        description: 'Metric tiles rendered in order. Type selects the visual treatment.',
      },
      techStack: {
        control: { type: 'object' },
        description:
          'Technology groups rendered in order. Level controls the status treatment on each group.',
      },
      previewViewport: {
        control: 'select',
        options: ['mobile', 'ipad', 'desktop'],
        table: { disable: true },
      },
    },
    parameters: {
      layout: 'fullscreen',
      docs: {
        description: {
          component:
            'About Me is the opening section of the site: profile, role signal, value proposition, social/resume actions, key metrics, and technology groups. The stories below treat it as a full viewport experience because its composition changes meaningfully between phone, tablet, and desktop widths.',
        },
      },
    },
  });
</script>

{#snippet template(args: Args)}
  <ViewportFrame mode={args.previewViewport}>
    <AboutMe
      name={args.name}
      role={args.role}
      statusText={args.statusText}
      valueHeadline={args.valueHeadline}
      valueDescription={args.valueDescription}
      avatarSrc={args.avatarSrc}
      avatarAlt={args.avatarAlt}
      primaryButtonText={args.primaryButtonText}
      linkedinUrl={args.linkedinUrl}
      githubUrl={args.githubUrl}
      resumeHref={args.resumeHref}
      scrollText={args.scrollText}
      showCanvasBackground={args.showCanvasBackground}
      metricsTitle={args.metricsTitle}
      techTitle={args.techTitle}
      scrollAriaLabel={args.scrollAriaLabel}
      stats={args.stats}
      techStack={args.techStack}
      onPrimaryAction={() => console.log('Primary action')}
      onScrollIndicator={() => console.log('Scroll indicator clicked')}
      onTechCategoryClick={(category) => console.log('Tech category clicked:', category)}
    />
  </ViewportFrame>
{/snippet}

<Story
  name="Desktop"
  args={{ ...aboutMeArgs, previewViewport: 'desktop' }}
  globals={sectionViewportGlobals.desktop}
  parameters={sectionViewportParameters('desktop')}
/>

<Story
  name="Mobile"
  args={{ ...aboutMeArgs, previewViewport: 'mobile' }}
  globals={sectionViewportGlobals.mobile}
  parameters={sectionViewportParameters('mobile')}
/>

<Story
  name="iPad"
  args={{ ...aboutMeArgs, previewViewport: 'ipad' }}
  globals={sectionViewportGlobals.ipad}
  parameters={sectionViewportParameters('ipad')}
/>
