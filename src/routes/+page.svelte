<script lang="ts">
  import AboutMe from '$lib/AboutMe.svelte';
  import TimelineSection from '$lib/TimelineSection.svelte';
  import SkillsSection from '$lib/SkillsSection.svelte';
  import Projects from '$lib/Projects.svelte';
  import Testimonials from '$lib/Testimonials.svelte';
  import ContactMe from '$lib/ContactMe.svelte';
  import { t, format } from '$lib/content';
  import type {
    HeroActionsModel,
    HeroPortraitModel,
    HeroProfileModel,
    HeroScrollModel,
    HeroValueModel,
  } from '$lib/components/site/hero/types';
  import type { ProjectModel } from '$lib/components/site/projects';

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

  // Types for ContactMe
  interface ContactMethod {
    type: 'email' | 'linkedin' | 'github' | 'calendar';
    label: string;
    value: string;
    href: string;
    imagePath: string;
    description: string;
  }

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

  function smoothScrollTo(elementId: string, offset: number = 0) {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }

  function handleContactRequested() {
    smoothScrollTo('contact');
  }

  function handleExploreRequested() {
    smoothScrollTo('experience');
  }

  function handleTimelineNavigationRequested(companyName: string) {
    const companyItems = document.querySelectorAll('[data-company]');
    const targetItem = Array.from(companyItems).find(
      (item) => item.getAttribute('data-company')?.toLowerCase() === companyName.toLowerCase(),
    );

    if (targetItem) {
      targetItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      smoothScrollTo('experience');
    }
  }

  // All page content lives in src/lib/content/en.json — edit that file to change
  // what's on the page. Nothing below this comment is content, only derived data.
  const emailAddress = t.contactMe.emailAddress;
  const contactMethods = t.contactMe.methods as ContactMethod[];
  const skillCategories = t.skillsSection.categories as SkillCategory[];
  const experiences: Experience[] = t.timelineSection.experiences;
  const projects = t.projectsSection.projects as ProjectModel[];
  const testimonials: Testimonial[] = t.testimonials.entries;
  const linkedinUrl = contactMethods.find((method) => method.type === 'linkedin')?.href;
  const githubUrl = contactMethods.find((method) => method.type === 'github')?.href;
  const resumeHref = '/resume/Cassidy-Bridges-Software-Engineering.pdf';

  const companyCount = experiences.length;

  const timelineSubtitle = format(t.timelineSection.subtitle, { count: companyCount });

  const heroProfile: HeroProfileModel = {
    greeting: t.aboutMe.greeting,
    name: t.aboutMe.name,
    role: t.aboutMe.role,
  };

  const heroValue: HeroValueModel = {
    headline: t.aboutMe.valueHeadline,
    headlineEmphasis: t.aboutMe.valueHeadlineEmphasis,
    description: t.aboutMe.valueDescription,
  };

  const heroPortrait: HeroPortraitModel = {
    src: t.aboutMe.avatarSrc,
    alt: t.aboutMe.avatarAlt,
    annotations: t.aboutMe.portraitAnnotations,
  };

  const heroActions: HeroActionsModel = {
    primaryLabel: t.aboutMe.primaryButtonText,
    primaryHref: '#contact',
    exploreLabel: t.aboutMe.exploreLinkText,
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
        href: resumeHref,
        icon: 'download',
        download: 'Cassidy-Bridges-Software-Engineering.pdf',
      },
    ],
  };

  const heroScroll: HeroScrollModel = {
    text: t.aboutMe.scrollText,
    ariaLabel: t.aboutMe.scrollIndicatorAriaLabel,
  };
</script>

<main>
  <!-- About Me Section -->
  <AboutMe
    profile={heroProfile}
    value={heroValue}
    portrait={heroPortrait}
    actions={heroActions}
    scroll={heroScroll}
    showCanvasBackground={true}
    onContactRequested={handleContactRequested}
    onExploreRequested={handleExploreRequested}
  />

  <!-- Timeline Section -->
  <TimelineSection
    {experiences}
    title={t.timelineSection.title}
    subtitle={timelineSubtitle}
    onExperienceDetailsToggleRequested={(experience) =>
      console.log('Experience details toggled:', experience)}
  />

  <!-- Skills Section -->
  <SkillsSection
    title={t.skillsSection.title}
    subtitle={t.skillsSection.subtitle}
    {skillCategories}
    initialSelectedCategory={skillCategories[0]?.name}
    onSkillSelectionRequested={(payload) => console.log('Skill selection requested:', payload)}
    onCategorySelectionRequested={(payload) =>
      console.log('Category selection requested:', payload)}
  />

  <!-- Projects Section -->
  <Projects {projects} title={t.projectsSection.title} subtitle={t.projectsSection.subtitle} />

  <!-- Testimonials Section -->
  <Testimonials
    {testimonials}
    {linkedinUrl}
    title={t.testimonials.title}
    subtitle={t.testimonials.subtitle}
    onTimelineNavigationRequested={(payload) => handleTimelineNavigationRequested(payload.company)}
  />

  <!-- Contact Me Section -->
  <ContactMe
    title={t.contactMe.title}
    subtitle={t.contactMe.subtitle}
    {emailAddress}
    {contactMethods}
    availabilityText={t.contactMe.availabilityText}
    formContent={t.contactMe.contactForm}
    methodsTitle={t.contactMe.contactMethodsPanel.title}
    methodsSubtitle={t.contactMe.contactMethodsPanel.subtitle}
    onFormSubmit={(formData) => console.log('Form submitted:', formData)}
    onContactMethodClick={(method) => console.log('Contact method clicked:', method)}
  />
</main>

<style lang="scss">
  main {
    min-height: 100vh;
    background: var(--token-surface-color, #0a0a0a);
  }
</style>
