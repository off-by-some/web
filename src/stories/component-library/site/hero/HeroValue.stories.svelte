<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import HeroValue from '$lib/components/site/hero/HeroValue';

  type Args = {
    headline: string;
    headlineEmphasis?: { primary?: string; accent?: string };
    description: string;
  };

  const { Story } = defineMeta({
    title: 'Component Library/Site/Hero/Value Statement',
    component: HeroValue,
    render: template,
    tags: ['autodocs'],
    args: {
      headline:
        'I architect systems that scale, lead teams that thrive, and build products that last.',
      headlineEmphasis: { primary: 'scale', accent: 'last' },
      description:
        'I turn complex challenges into durable systems and help high-performing engineering teams do their best work, from product architecture to cloud infrastructure.',
    },
    parameters: {
      docs: {
        description: {
          component:
            'Hero value statement: headline, semantic emphasis, and supporting copy. Actions live in Hero Actions so copy and navigation behavior can change independently.',
        },
      },
    },
  });
</script>

{#snippet template(args: Args)}
  <div class="story-shell">
    <HeroValue
      headline={args.headline}
      headlineEmphasis={args.headlineEmphasis}
      description={args.description}
    />
  </div>
{/snippet}

<Story name="Default" />

<style lang="scss">
  .story-shell {
    max-inline-size: 42rem;
  }
</style>
