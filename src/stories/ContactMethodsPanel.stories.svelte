<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ContactMethodsPanel from '$lib/components/site/contact/ContactMethodsPanel';
  import type { ContactMethod } from '$lib/components/site/contact/ContactMethodsPanel';

  const methods: ContactMethod[] = [
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
  ];

  const { Story } = defineMeta({
    title: 'Library/Site/Contact/Contact Methods Panel',
    component: ContactMethodsPanel,
    tags: ['autodocs'],
    args: {
      methods,
    },
    parameters: {
      docs: {
        description: {
          component:
            'Lays ContactMethodCards out in a responsive grid. It owns spacing and the wrap breakpoint only — resize the preview to see cards drop to a single column, rather than shrinking past a readable width.',
        },
      },
    },
  });
</script>

<Story name="Default" asChild>
  <div class="story-shell">
    <ContactMethodsPanel {methods} />
  </div>
</Story>

<style lang="scss">
  .story-shell {
    max-width: 34rem;
  }
</style>
