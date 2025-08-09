<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ContactMe from '$lib/ContactMe.svelte';
  import { fn } from 'storybook/test';

  const { Story } = defineMeta({
    title: 'Components/ContactMe',
    component: ContactMe,
    tags: ['autodocs'],
    argTypes: {
      title: {
        control: { type: 'text' },
        description: 'Main section title',
      },
      subtitle: {
        control: { type: 'text' },
        description: 'Section subtitle/description',
      },
      emailAddress: {
        control: { type: 'text' },
        description: 'Primary email address for contact',
      },
      enableAnimations: {
        control: { type: 'boolean' },
        description: 'Whether to enable interactive animations',
      },
      showAlternativeContact: {
        control: { type: 'boolean' },
        description: 'Whether to show alternative contact methods',
      },
      contactMethods: {
        control: { type: 'object' },
        description: 'Array of alternative contact methods',
      },
    },
    args: {
      formSubmit: fn(),
      contactMethodClick: fn(),
    },
  });
</script>

<Story
  name="Default"
  args={{
    title: "Let's Build Something Amazing",
    subtitle: "Ready to turn your vision into reality? I'd love to hear about your project.",
    emailAddress: 'cassidy@example.com',
    enableAnimations: true,
    showAlternativeContact: true,
    contactMethods: [
      {
        type: 'email',
        label: 'Email',
        value: 'cassidy@example.com',
        href: 'mailto:cassidy@example.com',
        icon: '📧',
        description: 'Send me a message directly',
      },
      {
        type: 'linkedin',
        label: 'LinkedIn',
        value: '/in/cassidybridges',
        href: 'https://linkedin.com/in/cassidybridges',
        icon: '💼',
        description: 'Connect professionally',
      },
      {
        type: 'github',
        label: 'GitHub',
        value: '@cassidybridges',
        href: 'https://github.com/cassidybridges',
        icon: '🚀',
        description: 'Check out my work',
      },
      {
        type: 'calendar',
        label: 'Schedule Call',
        value: 'Book 30min',
        href: 'https://calendly.com/cassidybridges',
        icon: '📅',
        description: "Let's talk in person",
      },
    ],
  }}
>
  <ContactMe
    title="Let's Build Something Amazing"
    subtitle="Ready to turn your vision into reality? I'd love to hear about your project."
    emailAddress="cassidy@example.com"
    enableAnimations={true}
    showAlternativeContact={true}
    on:formSubmit={(e) => console.log('Form submitted:', e.detail)}
    on:contactMethodClick={(e) => console.log('Contact method clicked:', e.detail)}
  />
</Story>

<Story
  name="Minimal"
  args={{
    title: 'Get in Touch',
    subtitle: "I'm always interested in new opportunities.",
    emailAddress: 'contact@example.com',
    enableAnimations: false,
    showAlternativeContact: false,
  }}
>
  <ContactMe
    title="Get in Touch"
    subtitle="I'm always interested in new opportunities."
    emailAddress="contact@example.com"
    enableAnimations={false}
    showAlternativeContact={false}
    on:formSubmit={(e) => console.log('Form submitted:', e.detail)}
    on:contactMethodClick={(e) => console.log('Contact method clicked:', e.detail)}
  />
</Story>

<Story
  name="Custom Contact Methods"
  args={{
    title: "Let's Connect",
    subtitle: 'Choose your preferred way to reach out.',
    emailAddress: 'hello@example.com',
    enableAnimations: true,
    showAlternativeContact: true,
    contactMethods: [
      {
        type: 'email',
        label: 'Direct Email',
        value: 'hello@example.com',
        href: 'mailto:hello@example.com',
        icon: '✉️',
        description: 'Send me an email',
      },
      {
        type: 'phone',
        label: 'Phone',
        value: '+1 (555) 123-4567',
        href: 'tel:+15551234567',
        icon: '📞',
        description: 'Call me directly',
      },
      {
        type: 'linkedin',
        label: 'LinkedIn',
        value: '/in/example',
        href: 'https://linkedin.com/in/example',
        icon: '🔗',
        description: 'Professional network',
      },
      {
        type: 'github',
        label: 'GitHub',
        value: '@example',
        href: 'https://github.com/example',
        icon: '🚀',
        description: 'Check out my work',
      },
    ],
  }}
>
  <ContactMe
    title="Let's Connect"
    subtitle="Choose your preferred way to reach out."
    emailAddress="hello@example.com"
    enableAnimations={true}
    showAlternativeContact={true}
    contactMethods={[
      {
        type: 'email',
        label: 'Direct Email',
        value: 'hello@example.com',
        href: 'mailto:hello@example.com',
        icon: '✉️',
        description: 'Send me an email',
      },
      {
        type: 'phone',
        label: 'Phone',
        value: '+1 (555) 123-4567',
        href: 'tel:+15551234567',
        icon: '📞',
        description: 'Call me directly',
      },
      {
        type: 'linkedin',
        label: 'LinkedIn',
        value: '/in/example',
        href: 'https://linkedin.com/in/example',
        icon: '🔗',
        description: 'Professional network',
      },
      {
        type: 'github',
        label: 'GitHub',
        value: '@example',
        href: 'https://github.com/example',
        icon: '🚀',
        description: 'Check out my work',
      },
    ]}
    on:formSubmit={(e) => console.log('Form submitted:', e.detail)}
    on:contactMethodClick={(e) => console.log('Contact method clicked:', e.detail)}
  />
</Story>

<Story
  name="No Animations"
  args={{
    title: 'Contact Information',
    subtitle: 'Get in touch for collaboration opportunities.',
    emailAddress: 'info@example.com',
    enableAnimations: false,
    showAlternativeContact: true,
  }}
>
  <ContactMe
    title="Contact Information"
    subtitle="Get in touch for collaboration opportunities."
    emailAddress="info@example.com"
    enableAnimations={false}
    showAlternativeContact={true}
    on:formSubmit={(e) => console.log('Form submitted:', e.detail)}
    on:contactMethodClick={(e) => console.log('Contact method clicked:', e.detail)}
  />
</Story>
