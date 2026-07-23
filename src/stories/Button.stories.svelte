<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Button from '$lib/components/primitives/actions/Button';
  import { designReferences } from './docs/design-notes';

  type Args = {
    text: string;
    variant: 'primary' | 'secondary';
  };

  const { Story } = defineMeta({
    title: 'Library/Primitives/Actions/Button',
    component: Button,
    render: template,
    tags: ['autodocs'],
    argTypes: {
      text: { control: 'text' },
      variant: { control: 'select', options: ['primary', 'secondary'] },
    },
    args: {
      text: 'Button',
      variant: 'primary',
    },
    parameters: {
      docs: {
        description: {
          component: `Primary is for the one action a view wants you to take; secondary is for anything that shouldn't compete with it. Both share the same focus ring and press animation, so switching \`variant\` never costs you keyboard or hover behavior — only the visual weight changes. Reference: [W3C Focus Appearance](${designReferences.focusAppearance}).`,
        },
      },
    },
  });
</script>

{#snippet template(args: Args)}
  <Button variant={args.variant}>{args.text}</Button>
{/snippet}

<Story name="Primary and Secondary" asChild>
  <div class="story-row">
    <Button variant="primary">Button</Button>
    <Button variant="secondary">Button</Button>
  </div>
</Story>

<style lang="scss">
  .story-row {
    align-items: center;
    color: var(--token-text-primary);
    display: flex;
    flex-wrap: wrap;
    font-family: var(--token-font-family-sans);
    gap: var(--token-space-fluid-lg);
  }
</style>
