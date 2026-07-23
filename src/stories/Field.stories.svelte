<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Field from '$lib/components/primitives/forms/Field';
  import Input from '$lib/components/primitives/forms/Input';
  import { designReferences } from './docs/design-notes';

  type Args = {
    id: string;
    label: string;
    required: boolean;
    error: string;
    value: string;
  };

  const { Story } = defineMeta({
    title: 'Library/Primitives/Forms/Field',
    component: Field,
    render: template,
    tags: ['autodocs'],
    args: {
      id: 'story-field',
      label: 'Name',
      required: true,
      error: '',
      value: 'Cassidy Bridges',
    },
    argTypes: {
      value: { control: 'text' },
    },
    parameters: {
      docs: {
        description: {
          component: `Keeps label, required marker, help text, error text, and character counter attached to one control, so a validation error always has an obvious anchor instead of floating text somewhere else on the page. The "Default" story below stacks a clean, a counted, and an errored field so you can compare all three states at once. Reference: [W3C cognitive accessibility guidance](${designReferences.cognitive}).`,
        },
      },
    },
  });
</script>

{#snippet template(args: Args)}
  <div class="story-stack">
    <Field id={args.id} label={args.label} required={args.required} error={args.error}>
      <Input id={args.id} value={args.value} placeholder="Your full name" />
    </Field>
  </div>
{/snippet}

<Story name="Default" asChild>
  <div class="story-stack">
    <Field id="story-name" label="Name" required>
      <Input id="story-name" value="Cassidy Bridges" placeholder="Your full name" />
    </Field>

    <Field id="story-message" label="Message" counter="21 characters">
      <Input as="textarea" id="story-message" value="A short project note." rows="4" />
    </Field>

    <Field id="story-error" label="Email" required error="Please enter a valid email address">
      <Input id="story-error" value="cassidy" error />
    </Field>
  </div>
</Story>

<style lang="scss">
  .story-stack {
    color: var(--token-text-primary);
    display: grid;
    font-family: var(--token-font-family-sans);
    gap: var(--token-space-fluid-2xl);
    max-width: 34rem;
  }
</style>
