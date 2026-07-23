<script lang="ts">
  import Button from '$lib/components/primitives/actions/Button';
  import Card from '$lib/components/primitives/surfaces/Card';
  import Dropdown from '$lib/components/primitives/forms/Dropdown';
  import Field from '$lib/components/primitives/forms/Field';
  import Input from '$lib/components/primitives/forms/Input';
  import { format } from '$lib/content';
  import type { ContactFormContent } from '$lib/content';
  import type { ContactFormData } from './types';

  interface FormErrors {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
  }

  const DEFAULT_CONTENT: ContactFormContent = {
    title: 'Lorem Ipsum Dolor',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    formAriaLabel: 'Lorem ipsum form',
    fields: {
      nameLabel: 'Lorem',
      namePlaceholder: 'Lorem ipsum',
      emailLabel: 'Ipsum',
      emailPlaceholder: 'lorem@ipsum.com',
      companyLabel: 'Dolor',
      companyPlaceholder: 'Lorem ipsum',
      budgetLabel: 'Lorem Ipsum',
      budgetPlaceholder: 'Select lorem ipsum',
      budgetAriaLabel: 'Select lorem ipsum dolor sit amet',
      subjectLabel: 'Sit',
      subjectPlaceholder: 'Lorem ipsum dolor sit amet?',
      timelineLabel: 'Amet',
      timelinePlaceholder: 'Lorem ipsum dolor sit amet?',
      timelineAriaLabel: 'Select lorem ipsum dolor sit amet',
      messageLabel: 'Consectetur',
      messagePlaceholder: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    validation: {
      nameRequired: 'Lorem ipsum is required',
      emailRequired: 'Lorem ipsum is required',
      emailInvalid: 'Please enter a valid lorem ipsum',
      subjectRequired: 'Lorem ipsum is required',
      messageRequired: 'Lorem ipsum is required',
      messageTooShort: 'Lorem ipsum must be at least 10 characters',
    },
    counter: {
      zero: 'No lorem ipsum entered',
      one: '1 lorem ipsum entered',
      many: '{count} lorem ipsum entered',
    },
    submit: {
      idle: 'Lorem Ipsum',
      loading: 'Lorem ipsum...',
      success: 'Lorem ipsum!',
    },
    status: {
      submitting: 'Lorem ipsum is being submitted',
      success: 'Lorem ipsum submitted successfully',
    },
    budgetOptions: [
      { value: 'lorem', label: 'Lorem Ipsum', description: 'Lorem ipsum dolor sit amet' },
      { value: 'ipsum', label: 'Dolor Sit Amet', description: 'Consectetur adipiscing elit' },
    ],
    timelineOptions: [
      { value: 'lorem', label: 'Lorem Ipsum', description: 'Lorem ipsum dolor sit amet' },
      { value: 'ipsum', label: 'Dolor Sit Amet', description: 'Consectetur adipiscing elit' },
    ],
    emailTemplate: {
      greeting: 'Lorem ipsum,',
      contactDetailsHeading: 'Lorem Ipsum:',
      nameLine: 'Lorem: {name}',
      emailLine: 'Ipsum: {email}',
      companyLine: 'Dolor: {company}',
      budgetLine: 'Sit: {budget}',
      timelineLine: 'Amet: {timeline}',
      signoff: 'Lorem ipsum,\n{name}',
    },
  };

  type Props = {
    emailAddress?: string;
    content?: ContactFormContent;
    onFormSubmit?: (formData: ContactFormData) => void;
  };

  let {
    emailAddress = 'you@example.com',
    content = DEFAULT_CONTENT,
    onFormSubmit,
  }: Props = $props();

  const createInitialFormData = (): ContactFormData => ({
    name: '',
    email: '',
    subject: '',
    message: '',
    company: '',
    budget: '',
    timeline: '',
  });

  const validationRules = $derived({
    name: (value: string) => (!value.trim() ? content.validation.nameRequired : null),
    email: (value: string) => {
      if (!value.trim()) return content.validation.emailRequired;
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return content.validation.emailInvalid;
      return null;
    },
    subject: (value: string) => (!value.trim() ? content.validation.subjectRequired : null),
    message: (value: string) => {
      if (!value.trim()) return content.validation.messageRequired;
      if (value.length < 10) return content.validation.messageTooShort;
      return null;
    },
  });

  let formData = $state(createInitialFormData());
  let errors = $state<FormErrors>({});
  let isSubmitting = $state(false);
  let submitSuccess = $state(false);
  let formElement: HTMLFormElement | undefined = $state();
  let hasAttemptedSubmit = false;

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    Object.entries(validationRules).forEach(([field, validator]) => {
      const error = validator(formData[field as keyof ContactFormData] as string);
      if (error) newErrors[field as keyof FormErrors] = error;
    });

    errors = newErrors;
    return Object.keys(newErrors).length === 0;
  };

  const constructEmailBody = () => {
    const getBudgetLabel = (value: string) =>
      content.budgetOptions.find((opt) => opt.value === value)?.label || value;
    const getTimelineLabel = (value: string) =>
      content.timelineOptions.find((opt) => opt.value === value)?.label || value;

    const optionalFields = [
      formData.company && format(content.emailTemplate.companyLine, { company: formData.company }),
      formData.budget &&
        format(content.emailTemplate.budgetLine, { budget: getBudgetLabel(formData.budget) }),
      formData.timeline &&
        format(content.emailTemplate.timelineLine, {
          timeline: getTimelineLabel(formData.timeline),
        }),
    ]
      .filter(Boolean)
      .join('\n');

    const body = [
      content.emailTemplate.greeting,
      '',
      formData.message,
      '',
      '---',
      content.emailTemplate.contactDetailsHeading,
      format(content.emailTemplate.nameLine, { name: formData.name }),
      format(content.emailTemplate.emailLine, { email: formData.email }),
      optionalFields,
      '',
      format(content.emailTemplate.signoff, { name: formData.name }),
    ].join('\n');

    return encodeURIComponent(body);
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
      (formElement?.querySelector('.input--error') as HTMLElement | null)?.focus();
      return;
    }

    isSubmitting = true;
    const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(
      formData.subject,
    )}&body=${constructEmailBody()}`;

    try {
      window.location.href = mailtoLink;

      setTimeout(() => {
        isSubmitting = false;
        submitSuccess = true;
        resetFormWithDelay();
      }, 1000);

      onFormSubmit?.(formData);
    } catch (error) {
      console.error('Error opening email client:', error);
      isSubmitting = false;
    }
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    formData[field] = value;

    if (hasAttemptedSubmit && errors[field as keyof FormErrors]) {
      const updated = { ...errors };
      delete (updated as Record<string, unknown>)[field as string];
      errors = updated;
    }
  };

  const getFieldErrorId = (field: string): string => `${field}-error`;
  const getAriaInvalid = (field: keyof FormErrors): boolean => Boolean(errors[field]);
  const getAriaDescribedBy = (field: keyof FormErrors): string | undefined =>
    errors[field] ? getFieldErrorId(field) : undefined;

  const getCharacterCountAnnouncement = (count: number): string => {
    if (count === 0) return content.counter.zero;
    if (count === 1) return content.counter.one;
    return format(content.counter.many, { count });
  };
</script>

<Card as="section" className="contact-form-card" aria-labelledby="form-title">
  <div class="contact-form__header">
    <h3 id="form-title">{content.title}</h3>
    <p>{content.subtitle}</p>
  </div>

  <form
    class="contact-form"
    onsubmit={handleSubmit}
    bind:this={formElement}
    novalidate
    aria-label={content.formAriaLabel}
  >
    <div class="contact-form__row">
      <Field
        id="name"
        label={content.fields.nameLabel}
        required
        error={errors.name}
        errorId={getFieldErrorId('name')}
      >
        <Input
          type="text"
          id="name"
          bind:value={formData.name}
          error={Boolean(errors.name)}
          onValueChange={(value) => handleInputChange('name', value)}
          placeholder={content.fields.namePlaceholder}
          disabled={isSubmitting}
          required
          autocomplete="name"
          aria-invalid={getAriaInvalid('name')}
          aria-describedby={getAriaDescribedBy('name')}
        />
      </Field>

      <Field
        id="email"
        label={content.fields.emailLabel}
        required
        error={errors.email}
        errorId={getFieldErrorId('email')}
      >
        <Input
          type="email"
          id="email"
          bind:value={formData.email}
          error={Boolean(errors.email)}
          onValueChange={(value) => handleInputChange('email', value)}
          placeholder={content.fields.emailPlaceholder}
          disabled={isSubmitting}
          required
          autocomplete="email"
          aria-invalid={getAriaInvalid('email')}
          aria-describedby={getAriaDescribedBy('email')}
        />
      </Field>
    </div>

    <div class="contact-form__row">
      <Field id="company" label={content.fields.companyLabel}>
        <Input
          type="text"
          id="company"
          bind:value={formData.company}
          onValueChange={(value) => handleInputChange('company', value)}
          placeholder={content.fields.companyPlaceholder}
          disabled={isSubmitting}
          autocomplete="organization"
        />
      </Field>

      <Field id="budget" label={content.fields.budgetLabel}>
        <Dropdown
          id="budget"
          options={content.budgetOptions}
          bind:value={formData.budget}
          placeholder={content.fields.budgetPlaceholder}
          disabled={isSubmitting}
          ariaLabel={content.fields.budgetAriaLabel}
        />
      </Field>
    </div>

    <Field
      id="subject"
      label={content.fields.subjectLabel}
      required
      error={errors.subject}
      errorId={getFieldErrorId('subject')}
    >
      <Input
        type="text"
        id="subject"
        bind:value={formData.subject}
        error={Boolean(errors.subject)}
        onValueChange={(value) => handleInputChange('subject', value)}
        placeholder={content.fields.subjectPlaceholder}
        disabled={isSubmitting}
        required
        aria-invalid={getAriaInvalid('subject')}
        aria-describedby={getAriaDescribedBy('subject')}
      />
    </Field>

    <Field id="timeline" label={content.fields.timelineLabel}>
      <Dropdown
        id="timeline"
        options={content.timelineOptions}
        bind:value={formData.timeline}
        placeholder={content.fields.timelinePlaceholder}
        disabled={isSubmitting}
        ariaLabel={content.fields.timelineAriaLabel}
      />
    </Field>

    <Field
      id="message"
      label={content.fields.messageLabel}
      required
      error={errors.message}
      errorId={getFieldErrorId('message')}
      counter={`${formData.message.length} characters`}
      counterId="message-counter"
      counterAriaLabel={getCharacterCountAnnouncement(formData.message.length)}
    >
      <Input
        as="textarea"
        id="message"
        bind:value={formData.message}
        error={Boolean(errors.message)}
        onValueChange={(value) => handleInputChange('message', value)}
        placeholder={content.fields.messagePlaceholder}
        rows="5"
        disabled={isSubmitting}
        required
        aria-describedby={errors.message
          ? `${getFieldErrorId('message')} message-counter`
          : 'message-counter'}
        aria-invalid={getAriaInvalid('message')}
      />
    </Field>

    <Button
      variant="primary"
      type="submit"
      className="contact-form__submit {isSubmitting
        ? 'contact-form__submit--loading'
        : ''} {submitSuccess ? 'contact-form__submit--success' : ''}"
      disabled={isSubmitting || submitSuccess}
      aria-describedby="submit-status"
    >
      {#if isSubmitting}
        <span class="submit__spinner" aria-hidden="true"></span>
        {content.submit.loading}
      {:else if submitSuccess}
        <span class="submit__check" aria-hidden="true">✓</span>
        {content.submit.success}
      {:else}
        {content.submit.idle}
      {/if}
    </Button>

    <div id="submit-status" class="sr-only" aria-live="polite">
      {#if isSubmitting}
        {content.status.submitting}
      {:else if submitSuccess}
        {content.status.success}
      {/if}
    </div>
  </form>
</Card>

<style lang="scss">
  @use 'styles/breakpoints' as *;
  @use 'lib/components/primitives/motion' as motion;

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

  :global(.contact-form-card) {
    --card-background: linear-gradient(
      135deg,
      var(--token-surface-glass-medium) 0%,
      var(--token-surface-glass-strong) 100%
    );
    --card-radius: var(--token-radius-lg);
    --card-padding: var(--token-space-fluid-2xl);
    --card-hover-transform: none;
    --card-hover-shadow: var(--token-shadow-elevated);
    --card-hover-iridescent-opacity: 1;

    position: relative;
    @include motion.fade-in-up(
      contactFormSlideInUp,
      var(--token-space-fluid-2xl),
      var(--token-motion-duration-slow),
      0.4s,
      both,
      0.95
    );

    @media (min-width: $breakpoint-md) {
      --card-padding: var(--token-space-fluid-3xl);
      --card-radius: var(--token-radius-xl);
    }
  }

  .contact-form__header {
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

  .contact-form {
    display: flex;
    flex-direction: column;
    gap: var(--token-space-fluid-xl);
    position: relative;
    z-index: 2;
  }

  .contact-form__row {
    display: grid;
    gap: var(--token-space-fluid-lg);

    @media (min-width: $breakpoint-sm) {
      grid-template-columns: 1fr 1fr;
    }
  }

  :global(.contact-form__submit) {
    --button-width: 100%;
    --button-min-height: var(--token-size-12);
    --button-padding: var(--token-space-fluid-lg) var(--token-space-fluid-2xl);
    --button-padding-md: var(--token-space-fluid-xl) var(--token-space-fluid-3xl);
    --button-font-size: var(--token-font-size-base);
    --button-font-size-md: var(--token-font-size-lg);

    margin-top: var(--token-space-fluid-lg);
  }

  :global(.contact-form__submit--loading) {
    --button-primary-background: var(--token-status-warning-color);
  }

  :global(.contact-form__submit--success) {
    --button-primary-background: var(--token-status-success-color);
    animation: successPulse var(--token-motion-duration-slow) ease-in-out;
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

  @media (max-width: #{$breakpoint-md}) {
    :global(.contact-form-card) {
      --card-padding: var(--token-space-fluid-xl);
    }

    .contact-form__row {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: #{$breakpoint-sm}) {
    :global(.contact-form-card) {
      --card-padding: var(--token-space-fluid-lg);
    }

    :global(.contact-form__submit:hover) {
      transform: translateY(-2px);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    :global(.contact-form-card),
    :global(.contact-form__submit:hover) {
      animation: none;
      opacity: 1;
      transform: none;
    }
  }

  @media (prefers-contrast: high) {
    .contact-form :global(.input),
    :global(.contact-form-card) {
      border-width: var(--token-size-2);
      border-color: currentColor;
    }
  }

  @media print {
    :global(.contact-form-card) {
      border: var(--token-border-default-small);
      background: white;
      break-inside: avoid;
      box-shadow: none;
    }

    :global(.contact-form__submit) {
      display: none;
    }
  }
</style>
