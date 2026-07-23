<script lang="ts">
  import Section from './components/primitives/layout/Section';
  import ContactForm from './components/site/contact/ContactForm';
  import type { ContactFormData } from './components/site/contact/ContactForm';
  import ContactMethodsPanel from './components/site/contact/ContactMethodsPanel';
  import type { ContactMethod } from './components/site/contact/ContactMethodsPanel';
  import AvailabilityStatus from './components/site/status/AvailabilityStatus';
  import type { ContactFormContent } from '$lib/content';

  type Props = {
    title?: string;
    subtitle?: string;
    emailAddress?: string;
    contactMethods?: ContactMethod[];
    availabilityText?: string;
    formContent?: ContactFormContent;
    methodsTitle?: string;
    methodsSubtitle?: string;
    onFormSubmit?: (formData: ContactFormData) => void;
    onContactMethodClick?: (method: ContactMethod) => void;
  };

  let {
    title = 'Lorem Ipsum Dolor',
    subtitle = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    emailAddress = 'you@example.com',
    contactMethods = [],
    availabilityText,
    formContent,
    methodsTitle,
    methodsSubtitle,
    onFormSubmit,
    onContactMethodClick,
  }: Props = $props();
</script>

<section class="contact" id="contact" aria-labelledby="contact-title">
  <Section className="contact__content">
    <div class="contact__container">
      <header class="contact__header">
        <h2 class="contact__title" id="contact-title">{title}</h2>
        <p class="contact__subtitle">{subtitle}</p>

        <AvailabilityStatus text={availabilityText} />
      </header>

      <div class="contact__main">
        <ContactForm {emailAddress} content={formContent} {onFormSubmit} />
        <ContactMethodsPanel
          title={methodsTitle}
          subtitle={methodsSubtitle}
          methods={contactMethods}
          onMethodClick={onContactMethodClick}
        />
      </div>
    </div>
  </Section>
</section>

<style lang="scss">
  @use 'styles/_breakpoints.scss' as *;

  .contact {
    position: relative;
    background: var(--token-gradients-contact);
    padding: var(--token-space-fluid-5xl) 0;
    overflow: hidden;
    font-family: var(--token-font-family-sans);
    font-feature-settings:
      'kern' 1,
      'liga' 1,
      'calt' 1,
      'ss01' 1;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  :global(.contact__content) {
    position: relative;
    max-width: var(--token-container-7xl);
    margin: 0 auto;
    padding: 0 var(--token-space-fluid-md);

    @media (min-width: $breakpoint-md) {
      padding: 0 var(--token-space-fluid-lg);
    }

    @media (min-width: $breakpoint-lg) {
      padding: 0 var(--token-space-fluid-xl);
      max-width: var(--token-container-max);
    }
  }

  .contact__container {
    animation: fadeInUp var(--token-motion-duration-slow) var(--token-motion-ease-out) both;
  }

  .contact__header {
    text-align: center;
    margin-bottom: var(--token-space-fluid-5xl);
    animation: fadeInUp var(--token-motion-duration-slow) var(--token-motion-ease-out) 0.2s both;
  }

  .contact__title {
    font-size: var(--token-font-size-4xl);
    font-weight: var(--token-font-weight-bold);
    line-height: var(--token-line-height-tight);
    color: var(--token-text-heading);
    margin-bottom: var(--token-space-fluid-md);
    letter-spacing: var(--token-letter-spacing-tight);
    background: var(--token-gradients-heading);
    background-size: 200% 200%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: textShimmer 8s ease-in-out infinite;

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-5xl);
      line-height: var(--token-line-height-snug);
    }

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-font-size-6xl);
      letter-spacing: var(--token-letter-spacing-normal);
    }
  }

  .contact__subtitle {
    font-size: var(--token-font-size-lg);
    color: var(--token-text-secondary);
    font-weight: var(--token-font-weight-normal);
    line-height: var(--token-line-height-relaxed);
    letter-spacing: var(--token-letter-spacing-normal);
    max-width: var(--token-container-5xl);
    margin: 0 auto var(--token-space-fluid-lg);

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-xl);
      line-height: var(--token-line-height-loose);
    }

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-font-size-2xl);
      letter-spacing: var(--token-letter-spacing-wide);
    }
  }

  .contact__main {
    display: grid;
    gap: var(--token-space-fluid-4xl);
    margin-bottom: var(--token-space-fluid-5xl);

    @media (min-width: $breakpoint-lg) {
      grid-template-columns: 1.2fr 0.8fr;
      gap: var(--token-space-fluid-3xl);
      align-items: start;
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(var(--token-space-fluid-xl));
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes textShimmer {
    0%,
    100% {
      background-position: 0% 50%;
    }

    50% {
      background-position: 100% 50%;
    }
  }

  @media (max-width: #{$breakpoint-lg}) {
    .contact__main {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: #{$breakpoint-md}) {
    .contact {
      padding: var(--token-space-fluid-4xl) 0;
    }

    :global(.contact__content) {
      padding: 0 var(--token-space-fluid-sm);
    }

    .contact__header {
      margin-bottom: var(--token-space-fluid-4xl);
    }
  }

  @media (max-width: #{$breakpoint-sm}) {
    .contact {
      padding: var(--token-space-fluid-3xl) 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .contact__container,
    .contact__header {
      animation: none;
      opacity: 1;
      transform: none;
    }

    .contact__title {
      animation: none;
    }
  }

  @media (prefers-contrast: high) {
    .contact__title {
      text-shadow: none;
      font-weight: var(--token-font-weight-bold);
      color: var(--token-text-primary);
      -webkit-text-fill-color: var(--token-text-primary);
    }
  }

  @media print {
    .contact {
      background: white;
      color: black;
      padding: var(--token-space-fluid-lg);
    }

    .contact__main {
      grid-template-columns: 1fr;
      gap: var(--token-space-fluid-lg);
    }

    .contact__title {
      color: black;
      -webkit-text-fill-color: black;
    }
  }
</style>
