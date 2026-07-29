<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ContactMethodCard from '$lib/components/site/contact/ContactMethodCard';
  import { hideControls } from '../../../helpers/controls';

  type Args = {
    href: string;
    type: 'email' | 'linkedin' | 'github' | 'calendar';
    label: string;
    value: string;
    imagePath: string;
    description: string;
  };

  const { Story } = defineMeta({
    title: 'Component Library/Site/Contact/Contact Method Card',
    component: ContactMethodCard,
    render: template,
    tags: ['autodocs'],
    args: {
      href: 'https://github.com/off-by-some',
      type: 'github',
      label: 'GitHub',
      value: '@off-by-some',
      imagePath: 'svg/github_brand_icon.svg',
      description: 'View my code',
    },
    argTypes: {
      ...hideControls(['href', 'onContactRequested']),
      type: { control: 'select', options: ['email', 'linkedin', 'github', 'calendar'] },
      label: { control: 'text' },
      value: { control: 'text' },
      imagePath: { control: 'text' },
      description: { control: 'text' },
    },
    parameters: {
      docs: {
        description: {
          component:
            'One card layout for every contact channel — email, LinkedIn, GitHub, calendar — so a new channel only needs new content, not new hover or focus styling.',
        },
      },
    },
  });
</script>

{#snippet template(args: Args)}
  <div class="story-width">
    <ContactMethodCard
      href={args.href}
      type={args.type}
      label={args.label}
      value={args.value}
      imagePath={args.imagePath}
      description={args.description}
      onContactRequested={() => console.log('Contact requested')}
    />
  </div>
{/snippet}

<Story name="Default" />

<Story
  name="Email"
  args={{
    href: 'mailto:cassidybridges@gmail.com',
    type: 'email',
    label: 'Email',
    value: 'cassidybridges@gmail.com',
    imagePath: 'svg/email_brand_icon.svg',
    description: 'Direct message',
  }}
/>

<style lang="scss">
  .story-width {
    color: var(--token-theme-color-text-primary);
    font-family: var(--token-reference-typography-family-sans);
    max-inline-size: 34rem;
  }
</style>
