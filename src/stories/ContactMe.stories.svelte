<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ContactMe from '$lib/ContactMe.svelte';
  import content from '$lib/content/en.json';
  import ViewportFrame from './helpers/ViewportFrame.svelte';
  import { sectionViewportGlobals, sectionViewportParameters } from './helpers/section-viewports';
  import type { SectionViewport } from './helpers/section-viewports';
  import type { ContactFormData, FormErrors } from '$lib/components/site/contact/ContactForm';
  import type { ContactMethod } from '$lib/components/site/contact/ContactMethodsPanel';
  import type { ContactFormContent } from '$lib/content';
  import { hideControls } from './helpers/controls';

  type Args = {
    title: string;
    subtitle: string;
    emailAddress: string;
    availabilityText: string;
    contactMethods: ContactMethod[];
    formContent: ContactFormContent;
    methodsTitle: string;
    methodsSubtitle: string;
    formInitialData?: Partial<ContactFormData>;
    formInitialErrors?: FormErrors;
    formInitialSubmitting?: boolean;
    formInitialSubmitSuccess?: boolean;
    previewViewport: SectionViewport;
  };

  const contact = content.contactMe;
  const defaultArgs: Args = {
    title: contact.title,
    subtitle: contact.subtitle,
    emailAddress: contact.emailAddress,
    availabilityText: contact.availabilityText,
    contactMethods: contact.methods as ContactMethod[],
    formContent: contact.contactForm,
    methodsTitle: contact.contactMethodsPanel.title,
    methodsSubtitle: contact.contactMethodsPanel.subtitle,
    previewViewport: 'desktop',
  };

  const errorArgs: Args = {
    ...defaultArgs,
    formInitialData: {
      name: '',
      email: 'cassidy@',
      subject: '',
      message: 'Too short',
    },
    formInitialErrors: {
      name: contact.contactForm.validation.nameRequired,
      email: contact.contactForm.validation.emailInvalid,
      subject: contact.contactForm.validation.subjectRequired,
      message: contact.contactForm.validation.messageTooShort,
    },
  };

  const submittingArgs: Args = {
    ...defaultArgs,
    formInitialData: {
      name: 'Cassidy Bridges',
      email: 'cassidy@example.com',
      company: 'Northstar Labs',
      budget: '50k-100k',
      timeline: '2-3-months',
      subject: 'Platform modernization',
      message:
        'We need help untangling a frontend platform migration while keeping release velocity steady.',
    },
    formInitialSubmitting: true,
  };

  const { Story } = defineMeta({
    title: 'Page Sections/Contact',
    component: ContactMe,
    render: template,
    tags: ['autodocs'],
    args: defaultArgs,
    argTypes: {
      ...hideControls(['emailAddress']),
      title: { control: 'text' },
      subtitle: { control: 'text' },
      availabilityText: { control: 'text' },
      contactMethods: { control: { type: 'object' } },
      formContent: { control: { type: 'object' } },
      methodsTitle: { control: 'text' },
      methodsSubtitle: { control: 'text' },
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
            'Contact combines the shared availability status, the full contact form, and alternate contact-method cards. Responsive stories show where the two-column desktop layout becomes a stacked mobile flow.',
        },
      },
    },
  });
</script>

{#snippet template(args: Args)}
  <ViewportFrame mode={args.previewViewport}>
    <ContactMe
      title={args.title}
      subtitle={args.subtitle}
      emailAddress={args.emailAddress}
      contactMethods={args.contactMethods}
      availabilityText={args.availabilityText}
      formContent={args.formContent}
      methodsTitle={args.methodsTitle}
      methodsSubtitle={args.methodsSubtitle}
      formInitialData={args.formInitialData}
      formInitialErrors={args.formInitialErrors}
      formInitialSubmitting={args.formInitialSubmitting}
      formInitialSubmitSuccess={args.formInitialSubmitSuccess}
      onFormSubmit={(formData) => console.log('Form submitted:', formData)}
      onContactMethodClick={(method) => console.log('Contact method clicked:', method)}
    />
  </ViewportFrame>
{/snippet}

<Story
  name="Desktop"
  args={{ ...defaultArgs, previewViewport: 'desktop' }}
  globals={sectionViewportGlobals.desktop}
  parameters={sectionViewportParameters('desktop')}
/>

<Story
  name="Mobile"
  args={{ ...defaultArgs, previewViewport: 'mobile' }}
  globals={sectionViewportGlobals.mobile}
  parameters={sectionViewportParameters('mobile')}
/>

<Story
  name="iPad"
  args={{ ...defaultArgs, previewViewport: 'ipad' }}
  globals={sectionViewportGlobals.ipad}
  parameters={sectionViewportParameters('ipad')}
/>

<Story
  name="Form Errors"
  args={{ ...errorArgs, previewViewport: 'desktop' }}
  globals={sectionViewportGlobals.desktop}
  parameters={sectionViewportParameters('desktop')}
/>

<Story
  name="Form Submitting"
  args={{ ...submittingArgs, previewViewport: 'desktop' }}
  globals={sectionViewportGlobals.desktop}
  parameters={sectionViewportParameters('desktop')}
/>
