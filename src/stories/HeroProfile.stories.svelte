<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import HeroProfile from '$lib/components/site/hero/HeroProfile';
  import { hideControls } from './helpers/controls';

  type Args = {
    greeting?: string;
    name: string;
    role: string;
    titleId: string;
  };

  const { Story } = defineMeta({
    title: 'Library/Site/Hero/Profile',
    component: HeroProfile,
    render: template,
    tags: ['autodocs'],
    args: {
      greeting: "Hi, I'm",
      name: 'Cassidy Bridges',
      role: 'Software Engineering Leader',
      titleId: 'storybook-profile-name',
    },
    argTypes: {
      ...hideControls(['titleId']),
    },
    parameters: {
      docs: {
        description: {
          component:
            'Hero identity block for greeting, name, role, and accent mark. The portrait and actions stay separate so the typography can be reused without carrying page-specific layout.',
        },
      },
    },
  });
</script>

{#snippet template(args: Args)}
  <div class="story-shell">
    <HeroProfile
      greeting={args.greeting}
      name={args.name}
      role={args.role}
      titleId={args.titleId}
    />
  </div>
{/snippet}

<Story name="Default" />

<style lang="scss">
  .story-shell {
    max-width: 42rem;
  }
</style>
