<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import GitHubProjectLink from '$lib/components/site/hero/GitHubProjectLink';
  import { hideControls } from './helpers/controls';

  type Args = {
    href: string;
    label: string;
  };

  const { Story } = defineMeta({
    title: 'Library/Site/Hero/GitHub Project Link',
    component: GitHubProjectLink,
    render: template,
    tags: ['autodocs'],
    args: {
      href: 'https://github.com/off-by-some/web',
      label: 'Check out this project on GitHub',
    },
    argTypes: {
      ...hideControls(['href']),
      label: { control: 'text' },
    },
    parameters: {
      docs: {
        description: {
          component:
            'Idles as a collapsed icon pill that expands to show its label on hover, but it also wiggles and glows on its own every 15 seconds (the last ~15% of its animation loop) to catch the eye even if nobody hovers it — watch the preview for a few seconds without touching it. That self-announcing motion has no `prefers-reduced-motion` guard, unlike most other animated components in this library.',
        },
      },
    },
  });
</script>

{#snippet template(args: Args)}
  <div class="story-shell">
    <GitHubProjectLink href={args.href} label={args.label} />
  </div>
{/snippet}

<Story name="Default" />

<style lang="scss">
  .story-shell {
    min-height: 8rem;
    position: relative;
  }
</style>
