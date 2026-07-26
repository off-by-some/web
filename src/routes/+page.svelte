<script lang="ts">
  import AboutMe from '$lib/AboutMe.svelte';
  import TimelineSection from '$lib/TimelineSection.svelte';
  import SkillsSection from '$lib/SkillsSection.svelte';
  import Projects from '$lib/Projects.svelte';
  import Testimonials from '$lib/Testimonials.svelte';
  import ContactMe from '$lib/ContactMe.svelte';
  import { t, format } from '$lib/content';

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

  interface ProjectHighlight {
    label: string;
    detail: string;
  }

  interface ProjectBadge {
    label: string;
    imageSrc: string;
    href?: string;
  }

  interface ProjectSecondaryLink {
    label: string;
    href: string;
    icon: 'docs' | 'dockerhub' | 'storybook';
  }

  interface Project {
    name: string;
    tagline: string;
    description: string[];
    bannerSrc: string;
    href: string;
    tags: string[];
    highlights?: ProjectHighlight[];
    badges?: ProjectBadge[];
    secondaryLink?: ProjectSecondaryLink;
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

  function handlePrimaryAction() {
    smoothScrollTo('contact');
  }

  function handleScrollIndicator() {
    smoothScrollTo('experience');
  }

  // All page content lives in src/lib/content/en.json — edit that file to change
  // what's on the page. Nothing below this comment is content, only derived data.
  const emailAddress = t.contactMe.emailAddress;
  const contactMethods = t.contactMe.methods as ContactMethod[];
  const skillCategories = t.skillsSection.categories as SkillCategory[];
  const experiences: Experience[] = t.timelineSection.experiences;
  const projects = t.projectsSection.projects as Project[];
  const testimonials: Testimonial[] = t.testimonials.entries;
  const linkedinUrl = contactMethods.find((method) => method.type === 'linkedin')?.href;
  const githubUrl = contactMethods.find((method) => method.type === 'github')?.href;
  const resumeHref = '/resume/Cassidy-Bridges-Software-Engineering.pdf';

  const companyCount = experiences.length;

  const timelineSubtitle = format(t.timelineSection.subtitle, { count: companyCount });
</script>

<main>
  <!-- About Me Section -->
  <AboutMe
    greeting={t.aboutMe.greeting}
    name={t.aboutMe.name}
    role={t.aboutMe.role}
    valueHeadline={t.aboutMe.valueHeadline}
    valueHeadlineEmphasis={t.aboutMe.valueHeadlineEmphasis}
    valueDescription={t.aboutMe.valueDescription}
    avatarSrc={t.aboutMe.avatarSrc}
    avatarAlt={t.aboutMe.avatarAlt}
    primaryButtonText={t.aboutMe.primaryButtonText}
    exploreLinkText={t.aboutMe.exploreLinkText}
    {linkedinUrl}
    {githubUrl}
    {resumeHref}
    scrollText={t.aboutMe.scrollText}
    scrollAriaLabel={t.aboutMe.scrollIndicatorAriaLabel}
    showCanvasBackground={true}
    portraitAnnotations={t.aboutMe.portraitAnnotations}
    onPrimaryAction={handlePrimaryAction}
    onScrollIndicator={handleScrollIndicator}
  />

  <!-- Timeline Section -->
  <TimelineSection
    {experiences}
    title={t.timelineSection.title}
    subtitle={timelineSubtitle}
    onExperienceSelect={(experience) => console.log('Experience selected:', experience)}
  />

  <!-- Skills Section -->
  <SkillsSection
    title={t.skillsSection.title}
    subtitle={t.skillsSection.subtitle}
    {skillCategories}
    initialSelectedCategory={skillCategories[0]?.name}
    onSkillSelect={(payload) => console.log('Skill selected:', payload)}
    onCategorySelect={(payload) => console.log('Category selected:', payload)}
  />

  <!-- Projects Section -->
  <Projects {projects} title={t.projectsSection.title} subtitle={t.projectsSection.subtitle} />

  <!-- Testimonials Section -->
  <Testimonials
    {testimonials}
    {linkedinUrl}
    title={t.testimonials.title}
    subtitle={t.testimonials.subtitle}
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
