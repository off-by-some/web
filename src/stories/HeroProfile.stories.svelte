<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import HeroProfile from '$lib/components/site/hero/HeroProfile';

  const { Story } = defineMeta({
    title: 'Library/Site/Hero/Profile',
    component: HeroProfile,
    tags: ['autodocs'],
    args: {
      name: 'Cassidy Bridges',
      role: 'Engineering Leader',
      statusText: 'Available for new opportunities',
      avatarSrc: 'headshot.png',
      avatarAlt: 'Portrait of Cassidy Bridges',
    },
    parameters: {
      docs: {
        description: {
          component:
            'Pairs the avatar Image with name, role, and availability status in the one layout the hero (and any future profile block) can reuse — resolving avatar formats and responsive sources is handled entirely by Image underneath.',
        },
      },
    },
  });
</script>

<Story name="Default" asChild>
  <div class="story-shell">
    <HeroProfile
      name="Cassidy Bridges"
      role="Engineering Leader"
      statusText="Available for new opportunities"
      avatarSrc="headshot.png"
      avatarAlt="Portrait of Cassidy Bridges"
    />
  </div>
</Story>

<style lang="scss">
  .story-shell {
    max-width: 34rem;
  }
</style>
