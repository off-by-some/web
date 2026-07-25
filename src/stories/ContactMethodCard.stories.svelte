<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ContactMethodCard from '$lib/components/site/contact/ContactMethodCard';
  import { hideControls } from './helpers/controls';

  type Args = {
    href: string;
    type: 'email' | 'linkedin' | 'github' | 'calendar';
    label: string;
    value: string;
    imagePath: string;
    description: string;
  };

  const { Story } = defineMeta({
    title: 'Library/Site/Contact/Contact Method Card',
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
      ...hideControls(['href', 'type']),
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
      onclick={() => console.log('Contact method clicked')}
    />
  </div>
{/snippet}

<Story name="Default" />

<style lang="scss">
  .story-width {
    color: var(--token-text-primary);
    font-family: var(--token-font-family-sans);
    max-width: 34rem;
  }
</style>
