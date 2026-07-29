<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Button from '$lib/components/primitives/actions/Button';
  import { designReferences } from '../../../docs/design-notes';
  import { hideControls } from '../../../helpers/controls';

  type Args = {
    text: string;
    variant: 'primary' | 'secondary';
    disabled: boolean;
  };

  const { Story } = defineMeta({
    title: 'Component Library/Primitives/Actions/Button',
    component: Button,
    render: template,
    tags: ['autodocs'],
    argTypes: {
      ...hideControls(['as', 'type']),
      text: { control: 'text' },
      variant: { control: 'select', options: ['primary', 'secondary'] },
      disabled: { control: 'boolean' },
    },
    args: {
      text: 'Button',
      variant: 'primary',
      disabled: false,
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
  <Button variant={args.variant} disabled={args.disabled}>{args.text}</Button>
{/snippet}

<Story name="Default" />

<Story name="Secondary" args={{ text: 'Secondary Button', variant: 'secondary' }} />

<Story name="Disabled" args={{ text: 'Disabled Button', variant: 'primary', disabled: true }} />
