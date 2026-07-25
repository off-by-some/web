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

  type Args = {
    title: string;
    subtitle: string;
    methods: ContactMethod[];
  };

  const { Story } = defineMeta({
    title: 'Library/Site/Contact/Contact Methods Panel',
    component: ContactMethodsPanel,
    render: template,
    tags: ['autodocs'],
    args: {
      title: 'Other Ways to Connect',
      subtitle: 'Prefer a different communication method? Choose what works best for you.',
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

{#snippet template(args: Args)}
  <div class="story-shell">
    <ContactMethodsPanel
      title={args.title}
      subtitle={args.subtitle}
      methods={args.methods}
      onMethodClick={(method) => console.log('Contact method clicked:', method)}
    />
  </div>
{/snippet}

<Story name="Default" />

<style lang="scss">
  .story-shell {
    max-width: 34rem;
  }
</style>
