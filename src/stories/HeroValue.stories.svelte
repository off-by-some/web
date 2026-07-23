<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import HeroValue from '$lib/components/site/hero/HeroValue';

  const { Story } = defineMeta({
    title: 'Library/Site/Hero/Value Statement',
    component: HeroValue,
    tags: ['autodocs'],
    args: {
      headline: 'I build resilient systems and focused engineering teams.',
      description:
        'From architecture to delivery, I turn messy product ideas into reliable software with clear operational guardrails.',
      primaryButtonText: 'Start a Conversation',
      secondaryButtonText: 'View Experience',
    },
    parameters: {
      docs: {
        description: {
          component:
            "Headline, supporting line, and two buttons in one fixed rhythm — the pitch and its two calls to action can't be reformatted independently of each other, which keeps the hero from ever shipping a headline without a matching action.",
        },
      },
    },
  });
</script>

<Story name="Default" asChild>
  <div class="story-shell">
    <HeroValue
      headline="I build resilient systems and focused engineering teams."
      description="From architecture to delivery, I turn messy product ideas into reliable software with clear operational guardrails."
      primaryButtonText="Start a Conversation"
      secondaryButtonText="View Experience"
    />
  </div>
</Story>

<style lang="scss">
  .story-shell {
    max-width: 42rem;
  }
</style>
