<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Section from './Section.svelte';
  import Image from './Image/Image.svelte';
  import Dropdown from './Dropdown.svelte';

  interface ContactForm {
    name: string;
    email: string;
    subject: string;
    message: string;
    company?: string;
    budget?: string;
    timeline?: string;
  }

  interface FormErrors {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
  }

  interface ContactMethod {
    type: 'email' | 'linkedin' | 'github' | 'calendar';
    label: string;
    value: string;
    href: string;
    imagePath: string;
    description: string;
  }

  interface DropdownOption {
    value: string;
    label: string;
    description?: string;
  }

  export let title: string = "Let's Build Something Amazing";
  export let subtitle: string =
    "Ready to turn a vision into reality? I'd love to hear about your project.";
  export let emailAddress: string = 'cassidybridges@gmail.com';
  export let contactMethods: ContactMethod[] = [];

  const dispatch = createEventDispatcher<{
    formSubmit: { formData: ContactForm };
    contactMethodClick: { method: ContactMethod };
  }>();

  const budgetOptions: DropdownOption[] = [
    { value: 'under-10k', label: 'Under $10K', description: 'Small projects and quick fixes' },
    { value: '10k-25k', label: '$10K - $25K', description: 'Medium-sized applications' },
    { value: '25k-50k', label: '$25K - $50K', description: 'Complex web applications' },
    { value: '50k-100k', label: '$50K - $100K', description: 'Enterprise solutions' },
    { value: '100k-150k', label: '$100K - $150K', description: 'Large-scale platforms' },
    { value: '150k-200k', label: '$150K - $200K', description: 'Complex enterprise systems' },
    { value: '200k-plus', label: '$200K+', description: 'Major digital transformations' },
    { value: 'discuss', label: "Let's discuss", description: 'Custom pricing for unique projects' },
  ];

  const timelineOptions: DropdownOption[] = [
    { value: 'asap', label: 'ASAP', description: 'Rush project, immediate start' },
    { value: '1-month', label: 'Within 1 month', description: 'Quick turnaround needed' },
    { value: '2-3-months', label: '2-3 months', description: 'Standard project timeline' },
    { value: '3-6-months', label: '3-6 months', description: 'Complex project development' },
    { value: '6-plus-months', label: '6+ months', description: 'Long-term strategic project' },
    { value: 'flexible', label: 'Timeline is flexible', description: 'No rush, quality focused' },
  ];

  const createInitialFormData = (): ContactForm => ({
    name: '',
    email: '',
    subject: '',
    message: '',
    company: '',
    budget: '',
    timeline: '',
  });

  const validationRules = {
    name: (value: string) => (!value.trim() ? 'Name is required' : null),
    email: (value: string) => {
      if (!value.trim()) return 'Email is required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
      return null;
    },
    subject: (value: string) => (!value.trim() ? 'Subject is required' : null),
    message: (value: string) => {
      if (!value.trim()) return 'Message is required';
      if (value.length < 10) return 'Message must be at least 10 characters';
      return null;
    },
  };

  let formData = createInitialFormData();
  let errors: FormErrors = {};
  let isSubmitting = false;
  let submitSuccess = false;
  let formElement: HTMLFormElement;
  let hasAttemptedSubmit = false;

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    Object.entries(validationRules).forEach(([field, validator]) => {
      const error = validator(formData[field as keyof ContactForm] as string);
      if (error) newErrors[field as keyof FormErrors] = error;
    });

    errors = newErrors;
    return Object.keys(newErrors).length === 0;
  };

  const constructEmailBody = () => {
    const getBudgetLabel = (value: string) =>
      budgetOptions.find((opt) => opt.value === value)?.label || value;
    const getTimelineLabel = (value: string) =>
      timelineOptions.find((opt) => opt.value === value)?.label || value;

    const optionalFields = [
      formData.company && `Company: ${formData.company}`,
      formData.budget && `Budget: ${getBudgetLabel(formData.budget)}`,
      formData.timeline && `Timeline: ${getTimelineLabel(formData.timeline)}`,
    ]
      .filter(Boolean)
      .join('\n');

    return encodeURIComponent(
      `Hi Cassidy,

${formData.message}

---
Contact Details:
Name: ${formData.name}
Email: ${formData.email}
${optionalFields}

Best regards,
${formData.name}`,
    );
  };

  const resetFormWithDelay = () => {
    setTimeout(() => {
      submitSuccess = false;
      formData = createInitialFormData();
      hasAttemptedSubmit = false;
    }, 3000);
  };

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    hasAttemptedSubmit = true;

    if (!validateForm()) {
      (formElement.querySelector('.form__input--error') as HTMLElement | null)?.focus();
      return;
    }

    isSubmitting = true;
    const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(formData.subject)}&body=${constructEmailBody()}`;

    try {
      window.location.href = mailtoLink;

      setTimeout(() => {
        isSubmitting = false;
        submitSuccess = true;
        resetFormWithDelay();
      }, 1000);

      dispatch('formSubmit', { formData });
    } catch (error) {
      console.error('Error opening email client:', error);
      isSubmitting = false;
    }
  };

  const handleInputChange = (field: keyof ContactForm, value: string) => {
    formData[field] = value;

    if (hasAttemptedSubmit && errors[field as keyof FormErrors]) {
      const updated = { ...errors };
      delete (updated as Record<string, unknown>)[field as string];
      errors = updated;
    }
  };

  const handleContactMethodClick = (method: ContactMethod) =>
    dispatch('contactMethodClick', { method });

  const getInputClass = (field: keyof FormErrors): string => {
    if (errors[field]) return 'form__input form__input--error';
    if (formData[field]?.trim()) return 'form__input form__input--filled';
    return 'form__input';
  };

  const getFieldErrorId = (field: string): string => `${field}-error`;
  const getAriaInvalid = (field: keyof FormErrors): boolean => !!errors[field];
  const getAriaDescribedBy = (field: keyof FormErrors): string | undefined =>
    errors[field] ? getFieldErrorId(field) : undefined;

  const getCharacterCountAnnouncement = (count: number): string => {
    if (count === 0) return 'No characters entered';
    if (count === 1) return '1 character entered';
    return `${count} characters entered`;
  };
</script>

<section class="contact" id="contact" aria-labelledby="contact-title">
  <Section className="contact__content">
    <div class="contact__container">
      <header class="contact__header">
        <h2 class="contact__title" id="contact-title">{title}</h2>
        <p class="contact__subtitle">{subtitle}</p>

        <div class="contact__availability" role="status" aria-live="polite">
          <div class="availability__indicator" aria-hidden="true"></div>
          <span>Open to new opportunities</span>
        </div>
      </header>

      <div class="contact__main">
        <section class="contact__form-section" aria-labelledby="form-title">
          <div class="form__header">
            <h3 id="form-title">Send a Message</h3>
            <p>
              Share what you're working on, and let's explore how we can build something great
              together.
            </p>
          </div>

          <form
            class="contact__form"
            on:submit={handleSubmit}
            bind:this={formElement}
            novalidate
            aria-label="Contact form"
          >
            <div class="form__row">
              <div class="form__group">
                <label for="name" class="form__label"> Name * </label>
                <input
                  type="text"
                  id="name"
                  class={getInputClass('name')}
                  bind:value={formData.name}
                  on:input={(e: Event) =>
                    handleInputChange('name', (e.currentTarget as HTMLInputElement).value)}
                  placeholder="Your full name"
                  disabled={isSubmitting}
                  required
                  autocomplete="name"
                  aria-invalid={getAriaInvalid('name')}
                  aria-describedby={getAriaDescribedBy('name')}
                />
                {#if errors.name}
                  <span
                    class="form__error"
                    id={getFieldErrorId('name')}
                    role="alert"
                    aria-live="polite"
                  >
                    {errors.name}
                  </span>
                {/if}
              </div>

              <div class="form__group">
                <label for="email" class="form__label"> Email * </label>
                <input
                  type="email"
                  id="email"
                  class={getInputClass('email')}
                  bind:value={formData.email}
                  on:input={(e: Event) =>
                    handleInputChange('email', (e.currentTarget as HTMLInputElement).value)}
                  placeholder="your@email.com"
                  disabled={isSubmitting}
                  required
                  autocomplete="email"
                  aria-invalid={getAriaInvalid('email')}
                  aria-describedby={getAriaDescribedBy('email')}
                />
                {#if errors.email}
                  <span
                    class="form__error"
                    id={getFieldErrorId('email')}
                    role="alert"
                    aria-live="polite"
                  >
                    {errors.email}
                  </span>
                {/if}
              </div>
            </div>

            <div class="form__row">
              <div class="form__group">
                <label for="company" class="form__label"> Company </label>
                <input
                  type="text"
                  id="company"
                  class="form__input"
                  bind:value={formData.company}
                  on:input={(e: Event) =>
                    handleInputChange('company', (e.currentTarget as HTMLInputElement).value)}
                  placeholder="Your company"
                  disabled={isSubmitting}
                  autocomplete="organization"
                />
              </div>

              <div class="form__group">
                <label for="budget" class="form__label"> Budget Range </label>
                <Dropdown
                  id="budget"
                  options={budgetOptions}
                  bind:value={formData.budget}
                  placeholder="Select budget range"
                  disabled={isSubmitting}
                  ariaLabel="Select your project budget range"
                />
              </div>
            </div>

            <div class="form__group">
              <label for="subject" class="form__label"> Subject * </label>
              <input
                type="text"
                id="subject"
                class={getInputClass('subject')}
                bind:value={formData.subject}
                on:input={(e: Event) =>
                  handleInputChange('subject', (e.currentTarget as HTMLInputElement).value)}
                placeholder="What's your project about?"
                disabled={isSubmitting}
                required
                aria-invalid={getAriaInvalid('subject')}
                aria-describedby={getAriaDescribedBy('subject')}
              />
              {#if errors.subject}
                <span
                  class="form__error"
                  id={getFieldErrorId('subject')}
                  role="alert"
                  aria-live="polite"
                >
                  {errors.subject}
                </span>
              {/if}
            </div>

            <div class="form__group">
              <label for="timeline" class="form__label"> Timeline </label>
              <Dropdown
                id="timeline"
                options={timelineOptions}
                bind:value={formData.timeline}
                placeholder="When do you need this completed?"
                disabled={isSubmitting}
                ariaLabel="Select your project timeline"
              />
            </div>

            <div class="form__group">
              <label for="message" class="form__label"> Message * </label>
              <textarea
                id="message"
                class={getInputClass('message')}
                bind:value={formData.message}
                on:input={(e: Event) =>
                  handleInputChange('message', (e.currentTarget as HTMLTextAreaElement).value)}
                placeholder="Tell me about your project, goals, and any specific requirements..."
                rows="5"
                disabled={isSubmitting}
                required
                aria-describedby="message-counter"
                aria-invalid={getAriaInvalid('message')}
              ></textarea>
              {#if errors.message}
                <span
                  class="form__error"
                  id={getFieldErrorId('message')}
                  role="alert"
                  aria-live="polite"
                >
                  {errors.message}
                </span>
              {/if}
              <div
                class="form__counter"
                id="message-counter"
                aria-live="polite"
                aria-label={getCharacterCountAnnouncement(formData.message.length)}
              >
                {formData.message.length} characters
              </div>
            </div>

            <button
              type="submit"
              class="form__submit"
              class:form__submit--loading={isSubmitting}
              class:form__submit--success={submitSuccess}
              disabled={isSubmitting || submitSuccess}
              aria-describedby="submit-status"
            >
              {#if isSubmitting}
                <span class="submit__spinner" aria-hidden="true"></span>
                Making something happen...
              {:else if submitSuccess}
                <span class="submit__check" aria-hidden="true">✓</span>
                Message on the way!
              {:else}
                Send Message
              {/if}
            </button>
            <div id="submit-status" class="sr-only" aria-live="polite">
              {#if isSubmitting}
                Form is being submitted
              {:else if submitSuccess}
                Form submitted successfully
              {/if}
            </div>
          </form>
        </section>

        <section class="contact__methods" aria-labelledby="methods-title">
          <h3 id="methods-title">Other Ways to Connect</h3>
          <p>Prefer a different communication method? Choose what works best for you.</p>

          <div class="methods__grid" role="list" aria-label="Contact methods">
            {#each contactMethods as method, mIdx (mIdx)}
              <a
                href={method.href}
                class="method__card"
                on:click={() => handleContactMethodClick(method)}
                target={method.type === 'email' ? '_self' : '_blank'}
                rel={method.type === 'email' ? '' : 'noopener noreferrer'}
                aria-label="Contact via {method.label}: {method.value} - {method.description}"
              >
                <div class="method__icon" aria-hidden="true">
                  <Image src={method.imagePath} alt="" sizes="48px" loading="lazy" />
                </div>
                <div class="method__content">
                  <h4 class="method__label">{method.label}</h4>
                  <p class="method__value">{method.value}</p>
                  <span class="method__description">{method.description}</span>
                </div>
              </a>
            {/each}
          </div>
        </section>
      </div>

      <section class="contact__footer" aria-labelledby="stats-title">
        <div class="footer__stats">
          <div class="stat__item" role="img" aria-label="1 million plus users reached">
            <div class="stat__number">1M+</div>
            <div class="stat__label">Users Reached</div>
          </div>
          <div class="stat__item" role="img" aria-label="100 percent client satisfaction">
            <div class="stat__number">100%</div>
            <div class="stat__label">Client Satisfaction</div>
          </div>
          <div class="stat__item" role="img" aria-label="12 plus years experience">
            <div class="stat__number">12+</div>
            <div class="stat__label">Years Experience</div>
          </div>
        </div>
      </section>
    </div>
  </Section>
</section>

<style lang="scss">
  @use 'styles/animations.scss' as *;
  @use 'styles/_breakpoints.scss' as *;

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  :root {
    --contact-success-color: var(--token-status-success-color);
    --contact-warning-color: var(--token-status-warning-color);
    --contact-error-color: var(--token-status-danger-color);
    --contact-available-color: var(--token-status-success-color);

    --contact-success-bg: var(--token-status-success-bg);
    --contact-success-border: var(--token-status-success-border);
    --contact-success-glow: var(--token-status-success-glow);
    --contact-error-border: var(--token-status-danger-border);
    --contact-error-bg: var(--token-status-danger-bg);
    --contact-error-glow: var(--token-status-danger-glow);
    --contact-warning-border: var(--token-status-warning-border);
    --contact-warning-bg: var(--token-status-warning-bg);
  }

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

  .contact__content {
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

  .contact__availability {
    display: inline-flex;
    align-items: center;
    gap: var(--token-space-fluid-sm);
    background: var(--token-surface-glass-strong);
    border: var(--token-border-default-small);
    border-radius: var(--token-radius-full);
    padding: var(--token-space-fluid-sm) var(--token-space-fluid-lg);
    font-size: var(--token-font-size-sm);
    font-weight: var(--token-font-weight-medium);
    color: var(--token-text-overlay);
    backdrop-filter: blur(var(--token-blur-lg));
    letter-spacing: var(--token-letter-spacing-wide);
    line-height: var(--token-line-height-snug);
    box-shadow: var(--token-shadow-light);
    position: relative;
    cursor: pointer;
    transition: all var(--token-motion-duration-fast) var(--token-motion-ease-out);

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, var(--token-tint-overlay-subtle) 0%, transparent 50%);
      opacity: 0;
      transition: opacity var(--token-motion-duration-fast) var(--token-motion-ease-out);
      border-radius: inherit;
      pointer-events: none;
    }

    &:hover {
      transform: translateY(-2px) scale(1.02);
      border-color: var(--token-border-color-hover);
      color: var(--token-text-primary);
      box-shadow:
        var(--token-shadow-default),
        0 0 15px var(--token-shadow-glow-subtle);

      &::before {
        opacity: 1;
      }
    }

    &:focus-visible {
      outline: 2px solid var(--token-interactive-color);
      outline-offset: 3px;
    }

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-base);
      padding: var(--token-space-fluid-md) var(--token-space-fluid-xl);
    }
  }

  .availability__indicator {
    width: var(--token-space-3);
    height: var(--token-space-3);
    background: var(--token-attention-color);
    border-radius: var(--token-radius-full);
    animation: pulseIndicator var(--token-motion-duration-pulse) ease-in-out infinite;
    box-shadow: 0 0 var(--token-space-3) var(--token-attention-glow);
    transition: transform var(--token-motion-duration-fast) var(--token-motion-ease-out);
  }

  .contact__availability:hover .availability__indicator {
    transform: scale(1.2);
    box-shadow: 0 0 var(--token-space-4) var(--token-attention-glow);
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

  .contact__form-section {
    background: var(--token-surface-glass-medium);
    border: var(--token-border-default-small);
    border-radius: var(--token-radius-lg);
    padding: var(--token-space-fluid-2xl);
    backdrop-filter: blur(var(--token-blur-lg));
    position: relative;
    animation: slideInUp var(--token-motion-duration-slow) var(--token-motion-ease-out) 0.4s both;
    box-shadow: var(--token-shadow-default);

    background: linear-gradient(
      135deg,
      var(--token-surface-glass-medium) 0%,
      var(--token-surface-glass-strong) 100%
    );

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: var(--token-surface-glass-iridescent);
      opacity: 0;
      transition: opacity var(--token-motion-duration-normal) var(--token-motion-ease-out);
      border-radius: inherit;
      pointer-events: none;
    }

    &:hover {
      box-shadow: var(--token-shadow-elevated);

      &::before {
        opacity: 1;
      }
    }

    @media (min-width: $breakpoint-md) {
      padding: var(--token-space-fluid-3xl);
      border-radius: var(--token-radius-xl);
    }
  }

  .form__header {
    text-align: center;
    margin-bottom: var(--token-space-fluid-2xl);
    position: relative;
    z-index: 2;

    h3 {
      font-size: var(--token-font-size-xl);
      font-weight: var(--token-font-weight-semibold);
      color: var(--token-text-primary);
      margin-bottom: var(--token-space-fluid-sm);
      letter-spacing: var(--token-letter-spacing-normal);
      line-height: var(--token-line-height-snug);

      @media (min-width: $breakpoint-md) {
        font-size: var(--token-font-size-2xl);
        line-height: var(--token-line-height-normal);
      }

      @media (min-width: $breakpoint-lg) {
        font-size: var(--token-font-size-3xl);
        letter-spacing: var(--token-letter-spacing-tight);
      }
    }

    p {
      font-size: var(--token-font-size-sm);
      color: var(--token-text-overlay);
      line-height: var(--token-line-height-relaxed);
      letter-spacing: var(--token-letter-spacing-normal);

      @media (min-width: $breakpoint-md) {
        font-size: var(--token-font-size-base);
        line-height: var(--token-line-height-loose);
      }

      @media (min-width: $breakpoint-lg) {
        font-size: var(--token-font-size-lg);
        letter-spacing: var(--token-letter-spacing-wide);
      }
    }
  }

  .contact__form {
    display: flex;
    flex-direction: column;
    gap: var(--token-space-fluid-xl);
    position: relative;
    z-index: 2;
  }

  .form__row {
    display: grid;
    gap: var(--token-space-fluid-lg);

    @media (min-width: $breakpoint-sm) {
      grid-template-columns: 1fr 1fr;
    }
  }

  .form__group {
    position: relative;
  }

  .form__label {
    display: block;
    font-size: var(--token-font-size-sm);
    font-weight: var(--token-font-weight-medium);
    color: var(--token-text-overlay);
    margin-bottom: var(--token-space-fluid-sm);
    letter-spacing: var(--token-letter-spacing-wide);
    line-height: var(--token-line-height-snug);

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-base);
    }
  }

  .form__input {
    width: 100%;
    background: var(--token-surface-glass-strong);
    border: var(--token-border-default-small);
    border-radius: var(--token-radius-lg);
    padding: var(--token-space-fluid-md) var(--token-space-fluid-lg);
    font-size: var(--token-font-size-base);
    font-family: inherit;
    color: var(--token-text-primary);
    transition: all var(--token-motion-duration-normal) var(--token-motion-ease-out);
    backdrop-filter: blur(var(--token-blur-lg));
    letter-spacing: var(--token-letter-spacing-normal);
    line-height: var(--token-line-height-normal);
    position: relative;
    box-shadow: var(--token-shadow-light);

    @media (min-width: $breakpoint-md) {
      padding: var(--token-space-fluid-lg) var(--token-space-fluid-xl);
      font-size: var(--token-font-size-lg);
    }

    &::placeholder {
      color: var(--token-text-tertiary);
      letter-spacing: var(--token-letter-spacing-normal);
    }

    &:focus {
      outline: none;
      border-color: var(--token-interactive-color);
      background: var(--token-surface-glass-medium);
      box-shadow:
        var(--token-shadow-focus),
        0 0 20px var(--token-shadow-glow-subtle);
      transform: translateY(-2px);
    }

    &:focus-visible {
      outline: 3px solid var(--token-interactive-color);
      outline-offset: 2px;
    }

    &:hover:not(:focus) {
      border-color: var(--token-border-color-hover);
      background: var(--token-surface-glass-medium);
      box-shadow: var(--token-shadow-default);
    }

    &--filled {
      border-color: var(--token-border-color-hover);
      background: var(--token-surface-glass-medium);
    }

    &--success {
      border-color: var(--contact-success-border);
      background: var(--contact-success-bg);
      box-shadow: 0 0 0 2px var(--contact-success-glow);
    }

    &--warning {
      border-color: var(--contact-warning-border);
      background: var(--contact-warning-bg);
      box-shadow: 0 0 0 2px var(--token-status-warning-border);
    }

    &--error {
      border-color: var(--contact-error-border);
      background: var(--contact-error-bg);
      box-shadow: 0 0 0 2px var(--contact-error-glow);
    }
  }

  textarea.form__input {
    resize: vertical;
    min-height: 8rem;
    font-family: inherit;
    line-height: var(--token-line-height-relaxed);
  }

  .form__error {
    position: absolute;
    bottom: calc(-1 * var(--token-space-fluid-lg));
    left: 0;
    font-size: var(--token-font-size-xs);
    font-weight: var(--token-font-weight-medium);
    color: var(--contact-error-color);
    display: flex;
    align-items: center;
    gap: var(--token-space-2);
    letter-spacing: var(--token-letter-spacing-normal);
    line-height: var(--token-line-height-snug);

    &::before {
      content: '⚠';
      font-size: var(--token-font-size-sm);
    }
  }

  .form__counter {
    position: absolute;
    bottom: calc(-1 * var(--token-space-fluid-lg));
    right: 0;
    font-size: var(--token-font-size-xs);
    color: var(--token-text-tertiary);
    letter-spacing: var(--token-letter-spacing-normal);
    line-height: var(--token-line-height-snug);
  }

  .form__submit {
    background: var(--token-interactive-color);
    border: none;
    border-radius: var(--token-radius-full);
    padding: var(--token-space-fluid-lg) var(--token-space-fluid-2xl);
    font-size: var(--token-font-size-base);
    font-weight: var(--token-font-weight-medium);
    font-family: inherit;
    color: var(--token-text-dark);
    cursor: pointer;
    transition: all var(--token-motion-duration-fast) var(--token-motion-ease-out);
    margin-top: var(--token-space-fluid-lg);
    min-height: var(--token-size-12);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--token-space-fluid-sm);
    box-shadow:
      var(--token-shadow-elevated),
      0 0 20px var(--token-interactive-glow);
    position: relative;
    overflow: hidden;
    letter-spacing: var(--token-letter-spacing-wide);
    line-height: var(--token-line-height-snug);

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-lg);
      padding: var(--token-space-fluid-xl) var(--token-space-fluid-3xl);
    }

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(
        135deg,
        var(--token-tint-overlay-medium) 0%,
        transparent 50%,
        var(--token-tint-overlay-subtle) 100%
      );
      opacity: 0;
      transition: opacity var(--token-motion-duration-fast) var(--token-motion-ease-out);
      border-radius: inherit;
      z-index: 0;
    }

    span {
      position: relative;
      z-index: 2;
    }

    &:hover:not(:disabled) {
      transform: translateY(-4px) scale(1.02);
      box-shadow:
        var(--token-shadow-interactive),
        var(--token-shadow-elevated),
        0 0 30px var(--token-state-hover-glow);

      &::before {
        opacity: 1;
      }
    }

    &:active:not(:disabled) {
      transform: translateY(-2px) scale(1);
      box-shadow: var(--token-shadow-interactive), var(--token-shadow-default);
      transition: all 0.1s ease-out;
    }

    &:focus-visible {
      outline: 3px solid var(--token-interactive-color);
      outline-offset: 3px;
    }

    &--loading {
      background: var(--contact-warning-color);
      cursor: not-allowed;

      &::before {
        opacity: 0.6;
      }
    }

    &--success {
      background: var(--contact-success-color);
      animation: successPulse var(--token-motion-duration-slow) ease-in-out;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: var(--token-opacity-default);
    }
  }

  .submit__spinner {
    width: var(--token-size-4);
    height: var(--token-size-4);
    border: 2px solid transparent;
    border-top: 2px solid var(--token-text-dark);
    border-radius: var(--token-radius-full);
    animation: spin var(--token-motion-duration-slow) linear infinite;
  }

  .submit__check {
    font-size: var(--token-font-size-lg);
    animation: bounceIn 0.6s var(--token-motion-ease-bounce);
  }

  .contact__methods {
    background: var(--token-surface-glass-medium);
    border: var(--token-border-default-small);
    border-radius: var(--token-radius-lg);
    padding: var(--token-space-fluid-2xl);
    backdrop-filter: blur(var(--token-blur-lg));
    position: relative;
    animation: slideInUp var(--token-motion-duration-slow) var(--token-motion-ease-out) 0.6s both;
    box-shadow: var(--token-shadow-default);

    background: linear-gradient(
      135deg,
      var(--token-surface-glass-medium) 0%,
      var(--token-surface-glass-strong) 100%
    );

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: var(--token-surface-glass-iridescent);
      opacity: 0;
      transition: opacity var(--token-motion-duration-normal) var(--token-motion-ease-out);
      border-radius: inherit;
      pointer-events: none;
    }

    &:hover {
      box-shadow: var(--token-shadow-elevated);

      &::before {
        opacity: 1;
      }
    }

    @media (min-width: $breakpoint-md) {
      padding: var(--token-space-fluid-3xl);
      border-radius: var(--token-radius-xl);
    }

    h3 {
      font-size: var(--token-font-size-lg);
      font-weight: var(--token-font-weight-semibold);
      color: var(--token-text-primary);
      margin-bottom: var(--token-space-fluid-sm);
      letter-spacing: var(--token-letter-spacing-normal);
      line-height: var(--token-line-height-snug);
      position: relative;
      z-index: 2;

      @media (min-width: $breakpoint-md) {
        font-size: var(--token-font-size-xl);
        line-height: var(--token-line-height-normal);
      }

      @media (min-width: $breakpoint-lg) {
        font-size: var(--token-font-size-2xl);
        letter-spacing: var(--token-letter-spacing-tight);
      }
    }

    p {
      font-size: var(--token-font-size-sm);
      color: var(--token-text-overlay);
      line-height: var(--token-line-height-relaxed);
      margin-bottom: var(--token-space-fluid-xl);
      letter-spacing: var(--token-letter-spacing-normal);
      position: relative;
      z-index: 2;

      @media (min-width: $breakpoint-md) {
        font-size: var(--token-font-size-base);
        line-height: var(--token-line-height-loose);
      }

      @media (min-width: $breakpoint-lg) {
        font-size: var(--token-font-size-lg);
        letter-spacing: var(--token-letter-spacing-wide);
      }
    }
  }

  .methods__grid {
    display: flex;
    flex-direction: column;
    gap: var(--token-space-fluid-lg);
    position: relative;
    z-index: 2;

    @media (min-width: $breakpoint-md) {
      gap: var(--token-space-fluid-xl);
    }
  }

  .method__card {
    display: flex;
    align-items: center;
    gap: var(--token-space-fluid-lg);
    padding: var(--token-space-fluid-lg);
    background: var(--token-surface-glass-strong);
    border: var(--token-border-default-small);
    border-radius: var(--token-radius-lg);
    text-decoration: none;
    color: inherit;
    transition: all var(--token-motion-duration-normal) var(--token-motion-ease-out);
    position: relative;
    box-shadow: var(--token-shadow-light);

    background: linear-gradient(
      135deg,
      var(--token-surface-glass-strong) 0%,
      var(--token-surface-glass-medium) 100%
    );

    @media (min-width: $breakpoint-md) {
      padding: var(--token-space-fluid-xl);
      gap: var(--token-space-fluid-xl);
      border-radius: var(--token-radius-xl);
    }

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, var(--token-tint-overlay-subtle) 0%, transparent 50%);
      opacity: 0;
      transition: opacity var(--token-motion-duration-fast) var(--token-motion-ease-out);
      border-radius: inherit;
      pointer-events: none;
    }

    &:hover {
      transform: translateY(-3px) scale(1.02);
      border-color: var(--token-border-color-hover);
      box-shadow:
        var(--token-shadow-default),
        0 0 20px var(--token-shadow-glow-subtle);

      &::before {
        opacity: 1;
      }
    }

    &:active {
      transform: translateY(-1px) scale(1);
      box-shadow: var(--token-shadow-light);
    }

    &:focus-visible {
      outline: 3px solid var(--token-interactive-color);
      outline-offset: 2px;
    }
  }

  .method__icon {
    width: var(--token-size-12);
    height: var(--token-size-12);
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--token-surface-glass-medium);
    border: var(--token-border-default-small);
    border-radius: var(--token-radius-lg);
    flex-shrink: 0;
    transition: all var(--token-motion-duration-normal) var(--token-motion-ease-out);
    position: relative;
    z-index: 2;
    box-shadow: var(--token-shadow-light);
    overflow: hidden;

    :global(img) {
      width: 100%;
      height: 100%;
      object-fit: contain;
      filter: var(--token-icon-filter, none);
      transition: all var(--token-motion-duration-normal) var(--token-motion-ease-out);
    }

    @media (min-width: $breakpoint-md) {
      width: 4rem;
      height: 4rem;
      border-radius: var(--token-radius-xl);
    }
  }

  .method__card:hover .method__icon {
    transform: scale(1.05);
    box-shadow: var(--token-shadow-default);

    :global(img) {
      transform: scale(1.1);
      filter: var(--token-icon-filter-hover, var(--token-icon-filter, none));
    }
  }

  .method__content {
    flex: 1;
    min-width: 0;
    position: relative;
    z-index: 2;
  }

  .method__label {
    font-size: var(--token-font-size-sm);
    font-weight: var(--token-font-weight-semibold);
    color: var(--token-text-primary);
    margin-bottom: var(--token-space-1);
    letter-spacing: var(--token-letter-spacing-normal);
    line-height: var(--token-line-height-snug);

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-base);
      line-height: var(--token-line-height-normal);
    }

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-font-size-lg);
      letter-spacing: var(--token-letter-spacing-tight);
    }
  }

  .method__value {
    font-size: var(--token-font-size-sm);
    font-weight: var(--token-font-weight-medium);
    color: var(--token-text-brand);
    margin-bottom: var(--token-space-2);
    letter-spacing: var(--token-letter-spacing-normal);
    line-height: var(--token-line-height-snug);

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-base);
    }

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-font-size-lg);
      letter-spacing: var(--token-letter-spacing-wide);
    }
  }

  .method__description {
    font-size: var(--token-font-size-xs);
    color: var(--token-text-tertiary);
    letter-spacing: var(--token-letter-spacing-normal);
    line-height: var(--token-line-height-relaxed);

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-sm);
      line-height: var(--token-line-height-loose);
    }
  }

  .contact__footer {
    background: var(--token-surface-glass-medium);
    border: var(--token-border-default-small);
    border-radius: var(--token-radius-lg);
    padding: var(--token-space-fluid-lg);
    backdrop-filter: blur(var(--token-blur-lg));
    text-align: center;
    position: relative;
    animation: fadeInUp var(--token-motion-duration-slow) var(--token-motion-ease-out) 0.8s both;
    box-shadow: var(--token-shadow-default);

    background: linear-gradient(
      135deg,
      var(--token-surface-glass-medium) 0%,
      var(--token-surface-glass-strong) 100%
    );

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: var(--token-surface-glass-iridescent);
      opacity: 0;
      transition: opacity var(--token-motion-duration-normal) var(--token-motion-ease-out);
      border-radius: inherit;
      pointer-events: none;
    }

    &:hover {
      box-shadow: var(--token-shadow-elevated);

      &::before {
        opacity: 1;
      }
    }

    @media (min-width: $breakpoint-md) {
      padding: var(--token-space-fluid-xl);
      border-radius: var(--token-radius-xl);
    }
  }

  .footer__stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--token-space-fluid-sm);
    position: relative;
    z-index: 2;

    @media (min-width: $breakpoint-md) {
      grid-template-columns: repeat(3, 1fr);
      gap: var(--token-space-fluid-md);
    }

    @media (max-width: #{$breakpoint-sm}) {
      grid-template-columns: 1fr;
      gap: var(--token-space-fluid-md);
    }
  }

  .stat__item {
    padding: var(--token-space-fluid-md);
    text-align: center;
    background: var(--token-gradients-stat-default);
    border: var(--token-border-default-small);
    border-radius: var(--token-radius-md);
    transition: all var(--token-motion-duration-normal) var(--token-motion-ease-out);
    position: relative;
    cursor: pointer;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, var(--token-tint-overlay-subtle) 0%, transparent 70%);
      opacity: 0;
      transition: opacity var(--token-motion-duration-normal) var(--token-motion-ease-out);
      border-radius: inherit;
    }

    &:hover {
      transform: translateY(-5px) scale(1.02);
      background: var(--token-gradients-stat-hover);
      border-color: var(--token-border-color-hover);
      box-shadow:
        var(--token-shadow-interactive),
        var(--token-shadow-default),
        0 0 20px var(--token-shadow-glow-subtle);

      &::before {
        opacity: 1;
      }

      .stat__number {
        transform: scale(1.1);
        color: var(--token-text-heading);
      }
    }

    &:nth-child(even) {
      background: var(--token-gradients-stat-alt);

      &:hover {
        background: var(--token-gradients-stat-alt_hover);
      }
    }

    @media (min-width: $breakpoint-md) {
      padding: var(--token-space-fluid-lg);
      border-radius: var(--token-radius-lg);
    }
  }

  .stat__number {
    font-size: var(--token-font-size-2xl);
    font-weight: var(--token-font-weight-bold);
    line-height: var(--token-line-height-tight);
    margin-bottom: var(--token-space-1);
    color: var(--token-text-emphasis-heading);
    letter-spacing: var(--token-letter-spacing-tight);
    transition: all var(--token-motion-duration-normal) var(--token-motion-ease-out);
    position: relative;
    z-index: 2;

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-3xl);
    }

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-font-size-35xl);
      line-height: var(--token-line-height-snug);
    }
  }

  .stat__label {
    font-size: var(--token-font-size-xs);
    font-weight: var(--token-font-weight-medium);
    color: var(--token-text-tertiary);
    text-transform: uppercase;
    letter-spacing: var(--token-letter-spacing-widest);
    line-height: var(--token-line-height-relaxed);
    transition: color var(--token-motion-duration-normal) var(--token-motion-ease-out);
    position: relative;
    z-index: 2;

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-font-size-sm);
      letter-spacing: var(--token-letter-spacing-extra-wide);
    }
  }

  .stat__item:hover .stat__label {
    color: var(--token-text-secondary);
  }

  // Animations
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

  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(var(--token-space-fluid-2xl)) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
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

  @keyframes pulseIndicator {
    0%,
    100% {
      opacity: 1;
      transform: scale(1);
      box-shadow: 0 0 var(--token-space-3) var(--token-attention-glow);
    }
    50% {
      opacity: 0.7;
      transform: scale(1.2);
      box-shadow: 0 0 var(--token-space-4) var(--token-attention-glow);
    }
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes successPulse {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }

  @keyframes bounceIn {
    0% {
      opacity: 0;
      transform: scale(0.3);
    }
    50% {
      opacity: 1;
      transform: scale(1.05);
    }
    70% {
      transform: scale(0.9);
    }
    100% {
      transform: scale(1);
    }
  }

  // Responsive Design
  @media (max-width: #{$breakpoint-lg}) {
    .contact__main {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: #{$breakpoint-md}) {
    .contact {
      padding: var(--token-space-fluid-4xl) 0;
    }

    .contact__content {
      padding: 0 var(--token-space-fluid-sm);
    }

    .contact__header {
      margin-bottom: var(--token-space-fluid-4xl);
    }

    .contact__form-section,
    .contact__methods,
    .contact__footer {
      padding: var(--token-space-fluid-xl);
    }

    .form__row {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: #{$breakpoint-sm}) {
    .contact {
      padding: var(--token-space-fluid-3xl) 0;
    }

    .contact__form-section,
    .contact__methods {
      padding: var(--token-space-fluid-lg);
    }

    .contact__footer {
      padding: var(--token-space-fluid-lg);
    }

    .method__card {
      flex-direction: column;
      text-align: center;
      gap: var(--token-space-fluid-md);
    }

    .method__icon {
      width: var(--token-size-12);
      height: var(--token-size-12);
    }

    .form__input:focus {
      transform: none;
    }

    .form__submit:hover,
    .method__card:hover,
    .contact__availability:hover {
      transform: translateY(-2px);
    }
  }

  // Accessibility & Motion Preferences
  @media (prefers-reduced-motion: reduce) {
    .contact__container,
    .contact__header,
    .contact__form-section,
    .contact__methods,
    .contact__footer {
      animation: none;
      opacity: 1;
      transform: none;
    }

    .contact__title {
      animation: none;
    }

    .availability__indicator {
      animation: none;
    }

    .form__submit:hover,
    .method__card:hover,
    .stat__item:hover,
    .contact__availability:hover {
      transform: none;
    }

    .form__input:focus {
      transform: none;
    }
  }

  @media (prefers-contrast: high) {
    .form__input,
    .method__card,
    .contact__form-section,
    .contact__methods,
    .contact__footer {
      border-width: var(--token-size-2);
      border-color: currentColor;
    }

    .contact__title,
    .stat__number {
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

    .contact__form-section,
    .contact__methods,
    .contact__footer {
      border: var(--token-border-default-small);
      background: white;
      break-inside: avoid;
      box-shadow: none;
    }

    .contact__main {
      grid-template-columns: 1fr;
      gap: var(--token-space-fluid-lg);
    }

    .form__submit {
      display: none;
    }

    .contact__title {
      color: black;
      -webkit-text-fill-color: black;
    }
  }
</style>
