<script lang="ts">
  import AboutMe from '$lib/AboutMe.svelte';
  import TimelineSection from '$lib/TimelineSection.svelte';
  import SkillsSection from '$lib/SkillsSection.svelte';
  import Testimonials from '$lib/Testimonials.svelte';
  import ContactMe from '$lib/ContactMe.svelte';
  import { base } from '$app/paths';
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

  // Types for AboutMe
  interface Stat {
    count: string;
    label: string;
    type: 'years' | 'scale' | 'reliability' | 'performance' | 'languages';
  }

  interface TechStack {
    title: string;
    level: 'expert' | 'advanced';
    technologies: string[];
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

  // State for selected skills category
  let selectedSkillsCategory: string | null = null;

  function handlePrimaryAction() {
    smoothScrollTo('experience');
  }

  function handleSecondaryAction() {
    smoothScrollTo('contact');
  }

  function handleScrollIndicator() {
    smoothScrollTo('experience');
  }

  // Handle tech category clicks from AboutMe
  function handleTechCategoryClick(category: string) {
    selectedSkillsCategory = category;
    smoothScrollTo('skills'); // Scroll to skills section with offset
  }

  // All page content lives in src/lib/content/en.json — edit that file to change
  // what's on the page. Nothing below this comment is content, only derived data.
  const emailAddress = t.contactMe.emailAddress;
  const contactMethods = t.contactMe.methods as ContactMethod[];
  const skillCategories = t.skillsSection.categories as SkillCategory[];
  const experiences: Experience[] = t.timelineSection.experiences;
  const testimonials: Testimonial[] = t.testimonials.entries;

  // Dynamically generate tech stack from skill categories
  const aboutMeTechStack: TechStack[] = skillCategories.map((category) => ({
    title: category.name,
    level: category.mastery as 'expert' | 'advanced',
    technologies: category.skills.map((skill) => skill.name).sort((a, b) => a.length - b.length), // Sort by character count, shortest first
  }));

  const companyCount = experiences.length;

  // Stats come from JSON as-is, except "Companies Served" whose count is derived
  // from the experiences list rather than hand-maintained.
  const aboutMeStats: Stat[] = t.aboutMe.stats.map((stat) => ({
    ...stat,
    count: stat.count ?? String(companyCount),
  })) as Stat[];

  const timelineSubtitle = format(t.timelineSection.subtitle, { count: companyCount });
</script>

<main>
  <!-- About Me Section -->
  <AboutMe
    name={t.aboutMe.name}
    role={t.aboutMe.role}
    statusText={t.aboutMe.statusText}
    valueHeadline={t.aboutMe.valueHeadline}
    valueDescription={t.aboutMe.valueDescription}
    avatarSrc={t.aboutMe.avatarSrc}
    avatarAlt={t.aboutMe.avatarAlt}
    primaryButtonText={t.aboutMe.primaryButtonText}
    secondaryButtonText={t.aboutMe.secondaryButtonText}
    scrollText={t.aboutMe.scrollText}
    githubLabel={t.github.projectLinkLabel}
    metricsTitle={t.aboutMe.metricsTitle}
    techTitle={t.aboutMe.techTitle}
    scrollAriaLabel={t.aboutMe.scrollIndicatorAriaLabel}
    showCanvasBackground={true}
    stats={aboutMeStats}
    techStack={aboutMeTechStack}
    onPrimaryAction={handlePrimaryAction}
    onSecondaryAction={handleSecondaryAction}
    onScrollIndicator={handleScrollIndicator}
    onTechCategoryClick={handleTechCategoryClick}
  />

  <!-- Skills Section -->
  <SkillsSection
    title={t.skillsSection.title}
    subtitle={t.skillsSection.subtitle}
    {skillCategories}
    initialSelectedCategory={selectedSkillsCategory || skillCategories[0]?.name}
    onSkillSelect={(payload) => console.log('Skill selected:', payload)}
    onCategorySelect={(payload) => console.log('Category selected:', payload)}
  />

  <!-- Timeline Section -->
  <TimelineSection
    {experiences}
    title={t.timelineSection.title}
    subtitle={timelineSubtitle}
    onExperienceSelect={(experience) => console.log('Experience selected:', experience)}
  />

  <!-- Testimonials Section -->
  <Testimonials {testimonials} title={t.testimonials.title} subtitle={t.testimonials.subtitle} />

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
