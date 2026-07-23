<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ContactMethodCard from '$lib/components/site/contact/ContactMethodCard';

  const { Story } = defineMeta({
    title: 'Library/Site/Contact/Contact Method Card',
    component: ContactMethodCard,
    tags: ['autodocs'],
    args: {
      href: 'https://github.com/off-by-some',
      type: 'github',
      label: 'GitHub',
      value: '@off-by-some',
      imagePath: 'svg/github_brand_icon.svg',
      description: 'View my code',
    },
    parameters: {
      docs: {
        description: {
          component:
            'One card layout for every contact channel — email, LinkedIn, GitHub, calendar — so a new channel only needs new content, not new hover or focus styling. Switch `type` in the controls to see the icon swap while everything else holds still.',
        },
      },
    },
  });
</script>

<Story name="GitHub" asChild>
  <div class="story-width">
    <ContactMethodCard
      href="https://github.com/off-by-some"
      type="github"
      label="GitHub"
      value="@off-by-some"
      imagePath="svg/github_brand_icon.svg"
      description="View my code"
    />
  </div>
</Story>

<style lang="scss">
  .story-width {
    color: var(--token-text-primary);
    font-family: var(--token-font-family-sans);
    max-width: 34rem;
  }
</style>
