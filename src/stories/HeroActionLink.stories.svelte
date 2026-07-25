<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import HeroActionLink from '$lib/components/site/hero/HeroActionLink';
  import { hideControls } from './helpers/controls';

  type Args = {
    href: string;
    label: string;
    icon: 'github' | 'linkedin' | 'download' | 'arrow' | 'star';
    shape: 'circle' | 'label';
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
      shape: { control: { type: 'select' }, options: ['circle', 'label'] },
    },
    parameters: {
      docs: {
        description: {
          component:
            'Reusable hero action link for circular social controls, resume download buttons, and text-arrow contact CTAs. This keeps the hero action language centralized instead of restyling each link separately.',
        },
      },
    },
  });
</script>

{#snippet template(args: Args)}
  <div class="story-shell">
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

<style lang="scss">
  .story-shell {
    display: flex;
    align-items: center;
    gap: var(--token-space-fluid-lg);
    min-height: 7rem;
  }
</style>
