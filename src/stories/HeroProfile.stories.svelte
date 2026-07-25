<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import HeroProfile from '$lib/components/site/hero/HeroProfile';
  import { hideControls } from './helpers/controls';

  type Args = {
    name: string;
    role: string;
    statusText: string;
    avatarSrc: string;
    avatarAlt: string;
    titleId: string;
  };

  const { Story } = defineMeta({
    title: 'Library/Site/Hero/Profile',
    component: HeroProfile,
    render: template,
    tags: ['autodocs'],
    args: {
      name: 'Cassidy Bridges',
      role: 'Engineering Leader',
      statusText: 'Open to Staff / Lead roles',
      avatarSrc: 'headshot.png',
      avatarAlt: 'Portrait of Cassidy Bridges',
      titleId: 'storybook-profile-name',
    },
    argTypes: {
      ...hideControls(['avatarAlt', 'titleId']),
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

{#snippet template(args: Args)}
  <div class="story-shell">
    <HeroProfile
      name={args.name}
      role={args.role}
      statusText={args.statusText}
      avatarSrc={args.avatarSrc}
      avatarAlt={args.avatarAlt}
      titleId={args.titleId}
      onclick={() => console.log('Profile clicked')}
    />
  </div>
{/snippet}

<Story name="Default" />

<style lang="scss">
  .story-shell {
    max-width: 34rem;
  }
</style>
