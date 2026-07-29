<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import AboutMe from '$lib/AboutMe.svelte';
  import content from '$lib/content/en.json';
  import ViewportFrame from '../helpers/ViewportFrame.svelte';
  import { sectionViewportGlobals, sectionViewportParameters } from '../helpers/section-viewports';
  import type { SectionViewport } from '../helpers/section-viewports';
  import { hideControls } from '../helpers/controls';
  import type {
    HeroActionsModel,
    HeroPortraitModel,
    HeroProfileModel,
    HeroScrollModel,
    HeroValueModel,
  } from '$lib/components/site/hero/types';

  type Args = {
    profile: HeroProfileModel;
    value: HeroValueModel;
    portrait: HeroPortraitModel;
    actions: HeroActionsModel;
    scroll: HeroScrollModel;
    showCanvasBackground: boolean;
    previewViewport: SectionViewport;
  };

  const contactMethods = content.contactMe.methods;
  const aboutMe = content.aboutMe;
  const linkedinUrl = contactMethods.find((method) => method.type === 'linkedin')?.href;
  const githubUrl = contactMethods.find((method) => method.type === 'github')?.href;

  const aboutMeArgs: Args = {
    profile: {
      greeting: aboutMe.greeting,
      name: aboutMe.name,
      role: aboutMe.role,
    },
    value: {
      headline: aboutMe.valueHeadline,
      headlineEmphasis: aboutMe.valueHeadlineEmphasis,
      description: aboutMe.valueDescription,
    },
    portrait: {
      src: aboutMe.avatarSrc,
      alt: aboutMe.avatarAlt,
      annotations: aboutMe.portraitAnnotations,
    },
    actions: {
      primaryLabel: aboutMe.primaryButtonText,
      primaryHref: '#contact',
      exploreLabel: aboutMe.exploreLinkText,
      exploreHref: '#experience',
      iconLinksLabel: 'Profile links',
      iconLinks: [
        ...(linkedinUrl
          ? [
              {
                label: 'Open LinkedIn profile',
                href: linkedinUrl,
                icon: 'linkedin' as const,
                external: true,
              },
            ]
          : []),
        ...(githubUrl
          ? [
              {
                label: 'Open GitHub profile',
                href: githubUrl,
                icon: 'github' as const,
                external: true,
              },
            ]
          : []),
        {
          label: 'Star this project on GitHub',
          href: 'https://github.com/off-by-some/web',
          icon: 'star',
          external: true,
        },
        {
          label: 'Download resume',
          href: '/resume/Cassidy-Bridges-Software-Engineering.pdf',
          icon: 'download',
          download: 'Cassidy-Bridges-Software-Engineering.pdf',
        },
      ],
    },
    scroll: {
      text: aboutMe.scrollText,
      ariaLabel: aboutMe.scrollIndicatorAriaLabel,
    },
    showCanvasBackground: true,
    previewViewport: 'desktop',
  };

  const { Story } = defineMeta({
    title: 'Page Sections/About Me',
    component: AboutMe,
    render: template,
    tags: ['autodocs'],
    args: aboutMeArgs,
    argTypes: {
      ...hideControls(['showCanvasBackground']),
      profile: { control: { type: 'object' } },
      value: { control: { type: 'object' } },
      portrait: {
        control: { type: 'object' },
        description: 'Portrait source, alt text, and desktop-only callouts.',
      },
      actions: { control: { type: 'object' } },
      scroll: { control: { type: 'object' } },
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
      profile={args.profile}
      value={args.value}
      portrait={args.portrait}
      actions={args.actions}
      scroll={args.scroll}
      showCanvasBackground={args.showCanvasBackground}
      onContactRequested={() => console.log('Contact requested')}
      onExploreRequested={() => console.log('Explore requested')}
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
