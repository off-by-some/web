<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import GitHubProjectLink from '$lib/components/site/hero/GitHubProjectLink';

  const { Story } = defineMeta({
    title: 'Library/Site/Hero/GitHub Project Link',
    component: GitHubProjectLink,
    tags: ['autodocs'],
    args: {
      href: 'https://github.com/off-by-some/web',
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

<Story name="Default" asChild>
  <div class="story-shell">
    <GitHubProjectLink href="https://github.com/off-by-some/web" />
  </div>
</Story>

<style lang="scss">
  .story-shell {
    min-height: 8rem;
    position: relative;
  }
</style>
