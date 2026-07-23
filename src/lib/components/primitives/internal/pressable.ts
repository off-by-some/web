const NATIVELY_INTERACTIVE = new Set(['button', 'a', 'input', 'select', 'textarea']);

interface PressableInput {
  as: string;
  disabled?: boolean;
  onclick?: (event: MouseEvent) => void;
}

interface PressableAttrs {
  role?: 'button';
  tabindex?: number;
  onkeydown?: (event: KeyboardEvent) => void;
}

/**
 * Gives a polymorphic element (`as="div"`, `"section"`, ...) real button
 * behavior the moment it's handed a click handler: `role="button"`, tab
 * focus, and Enter/Space activation. Elements that are already natively
 * interactive, or that have no click handler at all, are returned as-is —
 * this only fires for the case that's otherwise silently inaccessible.
 */
export function pressableAttrs({ as, disabled, onclick }: PressableInput): PressableAttrs {
  if (!onclick || NATIVELY_INTERACTIVE.has(as)) return {};

  return {
    role: 'button',
    tabindex: disabled ? -1 : 0,
    onkeydown: (event: KeyboardEvent) => {
      if (disabled || (event.key !== 'Enter' && event.key !== ' ')) return;
      event.preventDefault();
      onclick(event as unknown as MouseEvent);
    },
  };
}
