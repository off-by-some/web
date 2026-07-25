<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import HeroActionLink from '$lib/components/site/hero/HeroActionLink';
  import { hideControls } from './helpers/controls';

  type Args = {
    href: string;
    label: string;
    icon: 'github' | 'linkedin' | 'download' | 'arrow' | 'star';
    shape: 'circle' | 'label' | 'corner';
  };

  const { Story } = defineMeta({
    title: 'Library/Site/Hero/Action Link',
    component: HeroActionLink,
    render: template,
    tags: ['autodocs'],
    args: {
      href: 'https://github.com/off-by-some',
      label: 'Open GitHub profile',
      icon: 'github',
      shape: 'circle',
    },
    argTypes: {
      ...hideControls(['href', 'download', 'target', 'rel']),
      label: { control: { type: 'text' } },
      icon: { control: { type: 'select' }, options: ['github', 'linkedin', 'download', 'arrow'] },
      shape: { control: { type: 'select' }, options: ['circle', 'label', 'corner'] },
    },
    parameters: {
      docs: {
        description: {
          component:
            'Reusable hero action link for the circular social controls, resume download button, text-arrow contact CTA, and the expanding project link in the corner. This keeps the hero action language centralized instead of restyling each link separately.',
        },
      },
    },
  });
</script>

{#snippet template(args: Args)}
  <div class:story-corner={args.shape === 'corner'} class="story-shell">
    <HeroActionLink
      href={args.href}
      label={args.label}
      icon={args.icon}
      shape={args.shape}
      target="_blank"
      rel="noopener noreferrer"
      onclick={() => console.log('Hero action clicked')}
    />
  </div>
{/snippet}

<Story name="Default" />

<Story
  name="Corner"
  args={{
    href: 'https://github.com/off-by-some/web',
    label: 'Check out this project on GitHub',
    icon: 'github',
    shape: 'corner',
  }}
/>

<style lang="scss">
  .story-shell {
    display: flex;
    align-items: center;
    gap: var(--token-space-fluid-lg);
    min-height: 7rem;
  }

  .story-corner {
    min-height: 8rem;
    position: relative;
  }
</style>
