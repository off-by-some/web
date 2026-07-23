<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Input from '$lib/components/primitives/forms/Input';
  import { designReferences } from './docs/design-notes';

  type Args = {
    value: string;
    placeholder: string;
  };

  const { Story } = defineMeta({
    title: 'Library/Primitives/Forms/Input',
    component: Input,
    render: template,
    tags: ['autodocs'],
    args: {
      value: 'Filled value',
      placeholder: 'Type here',
    },
    parameters: {
      docs: {
        description: {
          component: `The text control underneath every Field — the empty, filled, and error states shown here are the same ones Field composes with a label and error message, not a separate visual language. Reference: [W3C Focus Appearance](${designReferences.focusAppearance}).`,
        },
      },
    },
  });
</script>

{#snippet template(args: Args)}
  <div class="story-stack">
    <Input value={args.value} placeholder={args.placeholder} />
  </div>
{/snippet}

<Story name="Input States" asChild>
  <div class="story-stack">
    <Input placeholder="Default input" />
    <Input value="Filled value" placeholder="Filled input" />
    <Input value="Needs attention" error placeholder="Error input" />
    <Input as="textarea" value="Tell me about your project." placeholder="Textarea" rows="4" />
  </div>
</Story>

<style lang="scss">
  .story-stack {
    display: grid;
    gap: var(--token-space-fluid-lg);
    max-width: 34rem;
  }
</style>
