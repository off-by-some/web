<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import HeroPortrait from '$lib/components/site/hero/HeroPortrait';
  import content from '$lib/content/en.json';
  import { hideControls } from './helpers/controls';

  type Args = {
    avatarSrc: string;
    avatarAlt: string;
    annotations: Array<{ label: string }>;
  };

  const { Story } = defineMeta({
    title: 'Library/Site/Hero/Portrait',
    component: HeroPortrait,
    render: template,
    tags: ['autodocs'],
    args: {
      avatarSrc: content.aboutMe.avatarSrc,
      avatarAlt: content.aboutMe.avatarAlt,
      annotations: content.aboutMe.portraitAnnotations,
    },
    argTypes: {
      ...hideControls(['avatarAlt']),
      avatarSrc: { control: { type: 'text' } },
      annotations: { control: { type: 'object' } },
    },
    parameters: {
      docs: {
        description: {
          component:
            'Self-contained hero portrait composition: responsive cutout image, neon ring, subtle fade, and desktop annotation callouts. Page sections should only decide where it sits, not how the artwork is assembled.',
        },
      },
    },
  });
</script>

{#snippet template(args: Args)}
  <div class="story-shell">
    <HeroPortrait
      avatarSrc={args.avatarSrc}
      avatarAlt={args.avatarAlt}
      annotations={args.annotations}
    />
  </div>
{/snippet}

<Story name="Default" />

<style lang="scss">
  .story-shell {
    display: grid;
    place-items: center;
    min-block-size: 44rem;
    max-inline-size: 62rem;
    overflow: visible;
  }
</style>
