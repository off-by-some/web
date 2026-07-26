<script lang="ts">
  import Section from './components/primitives/layout/Section';
  import ContactForm from './components/site/contact/ContactForm';
  import type { ContactFormData, FormErrors } from './components/site/contact/ContactForm';
  import ContactMethodsPanel from './components/site/contact/ContactMethodsPanel';
  import type { ContactMethod } from './components/site/contact/ContactMethodsPanel';
  import SectionHeader from './components/site/section-headings/SectionHeader';
  import StatusPill from './components/site/status/StatusPill';
  import type { ContactFormContent } from '$lib/content';

  type Props = {
    title?: string;
    subtitle?: string;
    emailAddress?: string;
    contactMethods?: ContactMethod[];
    availabilityText?: string;
    formContent?: ContactFormContent;
    formInitialData?: Partial<ContactFormData>;
    formInitialErrors?: FormErrors;
    formInitialSubmitting?: boolean;
    formInitialSubmitSuccess?: boolean;
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
    formInitialData,
    formInitialErrors,
    formInitialSubmitting,
    formInitialSubmitSuccess,
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
        <SectionHeader {title} {subtitle} titleId="contact-title" contentClass="contact__heading" />
        <StatusPill text={availabilityText} />
      </header>

      <div class="contact__main">
        <ContactForm
          {emailAddress}
          content={formContent}
          initialFormData={formInitialData}
          initialErrors={formInitialErrors}
          initialSubmitting={formInitialSubmitting}
          initialSubmitSuccess={formInitialSubmitSuccess}
          {onFormSubmit}
        />
        <ContactMethodsPanel
          title={methodsTitle}
          subtitle={methodsSubtitle}
          methods={contactMethods}
          onContactRequested={onContactMethodClick}
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
    animation: fadeInUp var(--token-motion-duration-slow) var(--token-motion-ease-out)
      var(--token-motion-delay-short) both;
  }

  :global(.contact__heading) {
    margin-block-end: var(--token-space-fluid-lg);
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
  }

  @media print {
    .contact {
      background: Canvas;
      color: CanvasText;
      padding: var(--token-space-fluid-lg);
    }

    .contact__main {
      grid-template-columns: 1fr;
      gap: var(--token-space-fluid-lg);
    }
  }
</style>
