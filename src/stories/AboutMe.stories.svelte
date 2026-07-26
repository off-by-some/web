<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import AboutMe from '$lib/AboutMe.svelte';
  import content from '$lib/content/en.json';
  import ViewportFrame from './helpers/ViewportFrame.svelte';
  import { sectionViewportGlobals, sectionViewportParameters } from './helpers/section-viewports';
  import type { SectionViewport } from './helpers/section-viewports';
  import { hideControls } from './helpers/controls';

  type Args = {
    greeting?: string;
    name: string;
    role: string;
    valueHeadline: string;
    valueHeadlineEmphasis?: { primary?: string; accent?: string };
    valueDescription: string;
    avatarSrc: string;
    avatarAlt: string;
    primaryButtonText: string;
    exploreLinkText?: string;
    linkedinUrl?: string;
    githubUrl?: string;
    resumeHref?: string;
    resumeFilename?: string;
    scrollText: string;
    showCanvasBackground: boolean;
    scrollAriaLabel?: string;
    portraitAnnotations?: Array<{ label: string }>;
    previewViewport: SectionViewport;
  };

  const contactMethods = content.contactMe.methods;
  const aboutMe = content.aboutMe;
  const linkedinUrl = contactMethods.find((method) => method.type === 'linkedin')?.href;
  const githubUrl = contactMethods.find((method) => method.type === 'github')?.href;

  const aboutMeArgs: Args = {
    greeting: aboutMe.greeting,
    name: aboutMe.name,
    role: aboutMe.role,
    valueHeadline: aboutMe.valueHeadline,
    valueHeadlineEmphasis: aboutMe.valueHeadlineEmphasis,
    valueDescription: aboutMe.valueDescription,
    avatarSrc: aboutMe.avatarSrc,
    avatarAlt: aboutMe.avatarAlt,
    primaryButtonText: aboutMe.primaryButtonText,
    exploreLinkText: aboutMe.exploreLinkText,
    linkedinUrl,
    githubUrl,
    resumeHref: '/resume/Cassidy-Bridges-Software-Engineering.pdf',
    resumeFilename: 'Cassidy-Bridges-Software-Engineering.pdf',
    scrollText: aboutMe.scrollText,
    showCanvasBackground: true,
    scrollAriaLabel: aboutMe.scrollIndicatorAriaLabel,
    portraitAnnotations: aboutMe.portraitAnnotations,
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
        'resumeFilename',
        'scrollAriaLabel',
        'showCanvasBackground',
      ]),
      greeting: { control: { type: 'text' } },
      name: { control: { type: 'text' } },
      role: { control: { type: 'text' } },
      valueHeadline: { control: { type: 'text' } },
      valueHeadlineEmphasis: { control: { type: 'object' } },
      valueDescription: { control: { type: 'text' } },
      avatarSrc: { control: { type: 'text' } },
      primaryButtonText: { control: { type: 'text' } },
      exploreLinkText: { control: { type: 'text' } },
      scrollText: { control: { type: 'text' } },
      portraitAnnotations: {
        control: { type: 'object' },
        description: 'Desktop-only callouts rendered around the portrait composition.',
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
            'About Me is the opening section of the site: greeting, identity, value proposition, portrait art, social/resume actions, and scroll affordance. The stories below treat it as a full viewport experience because its composition changes meaningfully between phone, tablet, and desktop widths.',
        },
      },
    },
  });
</script>

{#snippet template(args: Args)}
  <ViewportFrame mode={args.previewViewport}>
    <AboutMe
      greeting={args.greeting}
      name={args.name}
      role={args.role}
      valueHeadline={args.valueHeadline}
      valueHeadlineEmphasis={args.valueHeadlineEmphasis}
      valueDescription={args.valueDescription}
      avatarSrc={args.avatarSrc}
      avatarAlt={args.avatarAlt}
      primaryButtonText={args.primaryButtonText}
      exploreLinkText={args.exploreLinkText}
      linkedinUrl={args.linkedinUrl}
      githubUrl={args.githubUrl}
      resumeHref={args.resumeHref}
      resumeFilename={args.resumeFilename}
      scrollText={args.scrollText}
      showCanvasBackground={args.showCanvasBackground}
      scrollAriaLabel={args.scrollAriaLabel}
      portraitAnnotations={args.portraitAnnotations}
      onPrimaryAction={() => console.log('Primary action')}
      onScrollIndicator={() => console.log('Scroll indicator clicked')}
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
