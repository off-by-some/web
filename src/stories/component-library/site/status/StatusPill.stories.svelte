<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import StatusPill from '$lib/components/site/status/StatusPill';

  type Args = {
    text: string;
    entrance: boolean;
    delay: string;
  };

  const { Story } = defineMeta({
    title: 'Component Library/Site/Status/Status Pill',
    component: StatusPill,
    render: template,
    tags: ['autodocs'],
    args: {
      text: 'Open to Staff / Lead roles',
      entrance: false,
      delay: '0s',
    },
    argTypes: {
      text: { control: { type: 'text' } },
      entrance: { control: { type: 'boolean' } },
      delay: { control: { type: 'text' } },
    },
    parameters: {
      docs: {
        description: {
          component:
            'StatusPill is the shared surface for concise availability and state labels. The gold dot is reserved for timely role/status information so it stays noticeable without becoming decoration.',
        },
      },
    },
  });
</script>

{#snippet template(args: Args)}
  <div class="story-row">
    <StatusPill text={args.text} entrance={args.entrance} delay={args.delay} />
  </div>
{/snippet}

<Story name="Default" />

<style lang="scss">
  .story-row {
    align-items: center;
    color: var(--token-theme-color-text-primary);
    display: flex;
    flex-wrap: wrap;
    font-family: var(--token-reference-typography-family-sans);
    gap: var(--token-reference-spacing-fluid-lg);
  }
</style>
