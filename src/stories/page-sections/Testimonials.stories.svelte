<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Testimonials from '$lib/Testimonials.svelte';
  import content from '$lib/content/en.json';
  import ViewportFrame from '../helpers/ViewportFrame.svelte';
  import { hideControls } from '../helpers/controls';
  import { sectionViewportGlobals, sectionViewportParameters } from '../helpers/section-viewports';
  import type { SectionViewport } from '../helpers/section-viewports';

  interface Testimonial {
    id: string;
    quote: string;
    author: string;
    role: string;
    company: string;
    relationship: string;
    date: string;
    avatar: string;
    companyLogo?: string;
    context: string;
    projectHighlight?: string;
    tags: string[];
  }

  type Args = {
    testimonials: Testimonial[];
    title: string;
    subtitle: string;
    linkedinUrl?: string;
    previewViewport: SectionViewport;
  };

  const testimonialContent = content.testimonials;
  const contactMethods = content.contactMe.methods;
  const testimonials = testimonialContent.entries as Testimonial[];
  const linkedinUrl = contactMethods.find((method) => method.type === 'linkedin')?.href;

  const defaultArgs: Args = {
    testimonials,
    title: testimonialContent.title,
    subtitle: testimonialContent.subtitle,
    linkedinUrl,
    previewViewport: 'desktop',
  };

  const { Story } = defineMeta({
    title: 'Page Sections/Testimonials',
    component: Testimonials,
    render: template,
    tags: ['autodocs'],
    args: defaultArgs,
    argTypes: {
      testimonials: {
        control: { type: 'object' },
        description:
          'Recommendation entries displayed by the carousel. Each item owns a stable id for tab and panel identity.',
      },
      title: { control: 'text' },
      subtitle: { control: 'text' },
      linkedinUrl: { control: 'text' },
      previewViewport: {
        control: 'select',
        options: ['mobile', 'ipad', 'desktop'],
        table: { disable: true },
      },
      ...hideControls(['onTestimonialSelectionRequested', 'onTimelineNavigationRequested']),
    },
    parameters: {
      layout: 'fullscreen',
      docs: {
        description: {
          component:
            'Testimonials owns carousel selection and mobile navigation. It reports requests to view a related timeline company, but the page decides how cross-section navigation is performed.',
        },
      },
    },
  });
</script>

{#snippet template(args: Args)}
  <ViewportFrame mode={args.previewViewport}>
    <Testimonials
      testimonials={args.testimonials}
      title={args.title}
      subtitle={args.subtitle}
      linkedinUrl={args.linkedinUrl}
      onTestimonialSelectionRequested={(testimonial) =>
        console.log('Testimonial selection requested:', testimonial)}
      onTimelineNavigationRequested={(payload) =>
        console.log('Timeline navigation requested:', payload)}
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
