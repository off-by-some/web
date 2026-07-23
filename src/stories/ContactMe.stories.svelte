<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ContactMe from '$lib/ContactMe.svelte';

  interface ContactMethod {
    type: 'email' | 'linkedin' | 'github' | 'calendar';
    label: string;
    value: string;
    href: string;
    imagePath: string;
    description: string;
  }

  const contactMethods: ContactMethod[] = [
    {
      type: 'email',
      label: 'Email',
      value: 'cassidy@example.com',
      href: 'mailto:cassidy@example.com',
      imagePath: 'svg/email_brand_icon.svg',
      description: 'Direct message',
    },
    {
      type: 'linkedin',
      label: 'LinkedIn',
      value: '/in/cassidybridges',
      href: 'https://linkedin.com/in/cassidybridges',
      imagePath: 'svg/linkedin_brand_icon.svg',
      description: 'Professional network',
    },
    {
      type: 'github',
      label: 'GitHub',
      value: '@cassidybridges',
      href: 'https://github.com/cassidybridges',
      imagePath: 'svg/github_brand_icon.svg',
      description: 'View my code',
    },
    {
      type: 'calendar',
      label: 'Schedule Call',
      value: 'Book 30min',
      href: 'https://calendly.com/cassidybridges',
      imagePath: 'svg/calendar_brand_icon.svg',
      description: 'Set up a conversation',
    },
  ];

  const { Story } = defineMeta({
    title: 'Page Sections/Contact',
    component: ContactMe,
    tags: ['autodocs'],
    parameters: {
      docs: {
        description: {
          component:
            'Lays ContactForm and ContactMethodsPanel side by side above the lg breakpoint (stacked below it) and always renders an AvailabilityStatus reading "Open to new opportunities" above them — that status text is hardcoded here, not one of ContactMe\'s own props, so changing it means editing this component rather than the page that uses it.',
        },
      },
    },
  });
</script>

<Story name="Default">
  <ContactMe
    title="Let's Build Something Amazing"
    subtitle="Ready to turn your vision into reality? I'd love to hear about your project."
    emailAddress="cassidy@example.com"
    {contactMethods}
  />
</Story>

<Story name="Form Only">
  <ContactMe
    title="Get in Touch"
    subtitle="I'm always interested in new opportunities."
    emailAddress="contact@example.com"
  />
</Story>
