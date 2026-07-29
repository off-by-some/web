<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ContactForm from '$lib/components/site/contact/ContactForm';
  import type { ContactFormData, FormErrors } from '$lib/components/site/contact/ContactForm';
  import content from '$lib/content/en.json';
  import type { ContactFormContent } from '$lib/content';
  import { hideControls } from '../../../helpers/controls';

  type Args = {
    emailAddress: string;
    content: ContactFormContent;
    initialFormData?: Partial<ContactFormData>;
    initialErrors?: FormErrors;
    initialSubmitting?: boolean;
    initialSubmitSuccess?: boolean;
  };

  const formContent = content.contactMe.contactForm;
  const validFormData: Partial<ContactFormData> = {
    name: 'Cassidy Bridges',
    email: 'cassidy@example.com',
    company: 'Northstar Labs',
    budget: '50k-100k',
    timeline: '2-3-months',
    subject: 'Platform modernization',
    message:
      'We need help untangling a frontend platform migration while keeping release velocity steady.',
  };

  const defaultArgs: Args = {
    emailAddress: content.contactMe.emailAddress,
    content: formContent,
  };

  const errorArgs: Args = {
    ...defaultArgs,
    initialFormData: {
      name: '',
      email: 'cassidy@',
      subject: '',
      message: 'Too short',
    },
    initialErrors: {
      name: formContent.validation.nameRequired,
      email: formContent.validation.emailInvalid,
      subject: formContent.validation.subjectRequired,
      message: formContent.validation.messageTooShort,
    },
  };

  const submittingArgs: Args = {
    ...defaultArgs,
    initialFormData: validFormData,
    initialSubmitting: true,
  };

  const successArgs: Args = {
    ...defaultArgs,
    initialFormData: validFormData,
    initialSubmitSuccess: true,
  };

  const { Story } = defineMeta({
    title: 'Component Library/Site/Contact/Contact Form',
    component: ContactForm,
    render: template,
    tags: ['autodocs'],
    args: defaultArgs,
    argTypes: {
      ...hideControls(['emailAddress']),
      content: {
        control: { type: 'object' },
        description: 'Copy, field labels, validation text, options, and mailto template.',
      },
      initialFormData: {
        control: { type: 'object' },
        description: 'Seed values for state previews and tests.',
      },
      initialErrors: {
        control: { type: 'object' },
        description: 'Seed validation errors for state previews and tests.',
      },
      initialSubmitting: { control: 'boolean' },
      initialSubmitSuccess: { control: 'boolean' },
    },
    parameters: {
      docs: {
        description: {
          component:
            'Contact Form composes Field, Input, Dropdown, Button, and Card into the real visitor submission flow. The state stories make validation, loading, and success treatments visible without requiring manual form interaction.',
        },
      },
    },
  });
</script>

{#snippet template(args: Args)}
  <div class="story-shell">
    <ContactForm
      emailAddress={args.emailAddress}
      content={args.content}
      initialFormData={args.initialFormData}
      initialErrors={args.initialErrors}
      initialSubmitting={args.initialSubmitting}
      initialSubmitSuccess={args.initialSubmitSuccess}
      onFormSubmit={(formData) => console.log('Form submitted:', formData)}
    />
  </div>
{/snippet}

<Story name="Default" args={defaultArgs} />

<Story name="Validation Errors" args={errorArgs} />

<Story name="Submitting" args={submittingArgs} />

<Story name="Success" args={successArgs} />

<style lang="scss">
  .story-shell {
    max-inline-size: 56rem;
  }
</style>
