<script lang="ts">
  import AboutMe from '$lib/AboutMe.svelte';
  import TimelineSection from '$lib/TimelineSection.svelte';
  import SkillsSection from '$lib/SkillsSection.svelte';
  import Projects from '$lib/Projects.svelte';
  import Testimonials from '$lib/Testimonials.svelte';
  import ContactMe from '$lib/ContactMe.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

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

  const contact = $derived(data.contact);
  const contactMethods = $derived(data.contactMethods);
  const emailAddress = $derived(data.emailAddress);
  const experiences = $derived(data.experiences);
  const heroActions = $derived(data.heroActions);
  const heroPortrait = $derived(data.heroPortrait);
  const heroProfile = $derived(data.heroProfile);
  const heroScroll = $derived(data.heroScroll);
  const heroValue = $derived(data.heroValue);
  const linkedinUrl = $derived(data.linkedinUrl);
  const projects = $derived(data.projects);
  const projectsSection = $derived(data.projectsSection);
  const skillCategories = $derived(data.skillCategories);
  const skillsSection = $derived(data.skillsSection);
  const testimonials = $derived(data.testimonials);
  const testimonialsSection = $derived(data.testimonialsSection);
  const timelineSection = $derived(data.timelineSection);
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
    title={timelineSection.title}
    subtitle={timelineSection.subtitle}
    onExperienceDetailsToggleRequested={(experience) =>
      console.log('Experience details toggled:', experience)}
  />

  <!-- Skills Section -->
  <SkillsSection
    title={skillsSection.title}
    subtitle={skillsSection.subtitle}
    {skillCategories}
    initialSelectedCategory={skillCategories[0]?.name}
    onSkillSelectionRequested={(payload) => console.log('Skill selection requested:', payload)}
    onCategorySelectionRequested={(payload) =>
      console.log('Category selection requested:', payload)}
  />

  <!-- Projects Section -->
  <Projects {projects} title={projectsSection.title} subtitle={projectsSection.subtitle} />

  <!-- Testimonials Section -->
  <Testimonials
    {testimonials}
    {linkedinUrl}
    title={testimonialsSection.title}
    subtitle={testimonialsSection.subtitle}
    onTimelineNavigationRequested={(payload) => handleTimelineNavigationRequested(payload.company)}
  />

  <!-- Contact Me Section -->
  <ContactMe
    title={contact.title}
    subtitle={contact.subtitle}
    {emailAddress}
    {contactMethods}
    availabilityText={contact.availabilityText}
    formContent={contact.formContent}
    methodsTitle={contact.methodsTitle}
    methodsSubtitle={contact.methodsSubtitle}
    onFormSubmit={(formData) => console.log('Form submitted:', formData)}
    onContactMethodClick={(method) => console.log('Contact method clicked:', method)}
  />
</main>

<style lang="scss">
  main {
    min-height: 100vh;
    background: var(--token-theme-color-surface-color, #0a0a0a);
  }
</style>
