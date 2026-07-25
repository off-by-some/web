<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import TimelineSection from '$lib/TimelineSection.svelte';
  import content from '$lib/content/en.json';
  import { format } from '$lib/content';
  import ViewportFrame from './helpers/ViewportFrame.svelte';
  import { sectionViewportGlobals, sectionViewportParameters } from './helpers/section-viewports';
  import type { SectionViewport } from './helpers/section-viewports';

  interface Experience {
    title: string;
    company: string;
    logo: string;
    date: string;
    dateValue: string;
    location: string;
    summary: string;
    highlights: string[];
    skills: string[];
  }

  type Args = {
    experiences: Experience[];
    title: string;
    subtitle: string;
    initialActiveIndex?: number;
    initialExpandedItems?: number[];
    previewViewport: SectionViewport;
  };

  const timeline = content.timelineSection;
  const experiences = timeline.experiences as Experience[];
  const defaultArgs: Args = {
    experiences,
    title: timeline.title,
    subtitle: format(timeline.subtitle, { count: experiences.length }),
    previewViewport: 'desktop',
  };

  const expandedArgs: Args = {
    ...defaultArgs,
    initialActiveIndex: 0,
    initialExpandedItems: [0],
  };

  const { Story } = defineMeta({
    title: 'Page Sections/Timeline',
    component: TimelineSection,
    render: template,
    tags: ['autodocs'],
    args: defaultArgs,
    argTypes: {
      experiences: {
        control: { type: 'object' },
        description:
          'Experience entries rendered in chronological story order, including logo, summary, highlights, and skills.',
      },
      title: { control: 'text' },
      subtitle: { control: 'text' },
      initialActiveIndex: {
        control: { type: 'number', min: 0 },
        description: 'Initial focused timeline item for demos and tests.',
      },
      initialExpandedItems: {
        control: { type: 'object' },
        description: 'Timeline item indexes that start expanded.',
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
            'Timeline is the professional experience section. The desktop layout alternates cards around the progress line; tablet and mobile collapse into a single readable column with floating navigation.',
        },
      },
    },
  });
</script>

{#snippet template(args: Args)}
  <ViewportFrame mode={args.previewViewport}>
    <TimelineSection
      experiences={args.experiences}
      title={args.title}
      subtitle={args.subtitle}
      initialActiveIndex={args.initialActiveIndex}
      initialExpandedItems={args.initialExpandedItems}
      onExperienceSelect={(experience) => console.log('Experience selected:', experience)}
    />
  </ViewportFrame>
{/snippet}

<Story
  name="Desktop"
  args={{ ...defaultArgs, previewViewport: 'desktop' }}
  globals={sectionViewportGlobals.desktop}
  parameters={sectionViewportParameters('desktop')}
/>

<Story
  name="Mobile"
  args={{ ...defaultArgs, previewViewport: 'mobile' }}
  globals={sectionViewportGlobals.mobile}
  parameters={sectionViewportParameters('mobile')}
/>

<Story
  name="iPad"
  args={{ ...defaultArgs, previewViewport: 'ipad' }}
  globals={sectionViewportGlobals.ipad}
  parameters={sectionViewportParameters('ipad')}
/>

<Story
  name="Expanded Card"
  args={{ ...expandedArgs, previewViewport: 'desktop' }}
  globals={sectionViewportGlobals.desktop}
  parameters={sectionViewportParameters('desktop')}
/>
