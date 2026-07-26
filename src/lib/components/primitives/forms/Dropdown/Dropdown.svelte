<script lang="ts">
  import { onMount } from 'svelte';
  import Input from '$lib/components/primitives/forms/Input';

  interface DropdownOption {
    value: string;
    label: string;
    description?: string;
  }

  type Props = {
    options?: DropdownOption[];
    value?: string;
    placeholder?: string;
    disabled?: boolean;
    id?: string;
    ariaLabel?: string;
    error?: boolean;
  };

  let {
    options = [],
    value = $bindable(''),
    placeholder = 'Select an option',
    disabled = false,
    id = '',
    ariaLabel = '',
    error = false,
  }: Props = $props();

  let isOpen = $state(false);
  let focusedIndex = $state(-1);
  let triggerRef: HTMLButtonElement | undefined = $state();
  let menuRef: HTMLDivElement | undefined = $state();
  let containerRef: HTMLDivElement | undefined = $state();
  let optionRefs: HTMLButtonElement[] = $state([]);

  const selectedOption = $derived(options.find((opt) => opt.value === value));
  const displayText = $derived(selectedOption?.label || placeholder);
  const hasValue = $derived(Boolean(value?.trim()));
  const triggerAriaLabel = $derived(ariaLabel ? `${displayText} - ${ariaLabel}` : displayText);

  const triggerClasses = $derived(
    [
      'dropdown-trigger',
      isOpen && 'dropdown-trigger--open',
      hasValue && 'dropdown-trigger--filled',
      error && 'dropdown-trigger--error',
      disabled && 'dropdown-trigger--disabled',
    ]
      .filter(Boolean)
      .join(' '),
  );

  // Scroll focused item into view
  function scrollFocusedItemIntoView() {
    // Small delay to ensure DOM has updated
    setTimeout(() => {
      if (focusedIndex >= 0 && optionRefs[focusedIndex]) {
        optionRefs[focusedIndex].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'nearest',
        });
      }
    }, 0);
  }

  // Core dropdown functions
  function openDropdown() {
    if (disabled) return;
    isOpen = true;
    focusedIndex = value ? options.findIndex((opt) => opt.value === value) : 0;

    // Reset option refs for clean binding
    optionRefs = [];

    // Focus menu on next tick
    setTimeout(() => {
      menuRef?.focus();
      // Scroll to initially focused item if keyboard opened
      scrollFocusedItemIntoView();
    }, 0);
  }

  function closeDropdown() {
    isOpen = false;
    focusedIndex = -1;

    // Return focus to trigger
    setTimeout(() => {
      triggerRef?.focus();
    }, 0);
  }

  function selectOption(selectedValue: string) {
    const option = options.find((opt) => opt.value === selectedValue);
    if (!option) return;

    value = selectedValue;
    closeDropdown();
  }

  // Event handlers
  function handleTriggerClick() {
    if (disabled) return;

    if (isOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
  }

  function handleTriggerKeydown(event: KeyboardEvent) {
    if (disabled) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (isOpen) {
          closeDropdown();
        } else {
          openDropdown();
        }
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!isOpen) {
          openDropdown();
        } else {
          focusedIndex = focusedIndex < options.length - 1 ? focusedIndex + 1 : 0;
          scrollFocusedItemIntoView();
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (!isOpen) {
          openDropdown();
          focusedIndex = options.length - 1;
        } else {
          focusedIndex = focusedIndex > 0 ? focusedIndex - 1 : options.length - 1;
          scrollFocusedItemIntoView();
        }
        break;
      case 'Escape':
        if (isOpen) {
          event.preventDefault();
          closeDropdown();
        }
        break;
    }
  }

  function handleMenuKeydown(event: KeyboardEvent) {
    if (!isOpen || options.length === 0) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        focusedIndex = focusedIndex < options.length - 1 ? focusedIndex + 1 : 0;
        scrollFocusedItemIntoView();
        break;
      case 'ArrowUp':
        event.preventDefault();
        focusedIndex = focusedIndex > 0 ? focusedIndex - 1 : options.length - 1;
        scrollFocusedItemIntoView();
        break;
      case 'Home':
        event.preventDefault();
        focusedIndex = 0;
        scrollFocusedItemIntoView();
        break;
      case 'End':
        event.preventDefault();
        focusedIndex = options.length - 1;
        scrollFocusedItemIntoView();
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (focusedIndex >= 0) {
          selectOption(options[focusedIndex].value);
        }
        break;
      case 'Escape':
        event.preventDefault();
        closeDropdown();
        break;
      case 'Tab':
        closeDropdown();
        break;
    }
  }

  function handleOptionClick(optionValue: string) {
    selectOption(optionValue);
  }

  function handleOptionMouseEnter(index: number) {
    focusedIndex = index;
  }

  // Click outside detection
  function handleDocumentClick(event: MouseEvent) {
    if (!isOpen) return;

    const target = event.target as Element;

    // If click is outside the dropdown container, close it
    if (!containerRef?.contains(target)) {
      closeDropdown();
    }
  }

  // Escape key detection
  function handleDocumentKeydown(event: KeyboardEvent) {
    if (isOpen && event.key === 'Escape') {
      closeDropdown();
    }
  }

  // Setup event listeners
  onMount(() => {
    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('keydown', handleDocumentKeydown);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
      document.removeEventListener('keydown', handleDocumentKeydown);
    };
  });
</script>

<div class="dropdown" bind:this={containerRef}>
  <Input
    as="button"
    className={triggerClasses}
    {id}
    bind:element={triggerRef}
    onclick={handleTriggerClick}
    onkeydown={(event: Event) => handleTriggerKeydown(event as unknown as KeyboardEvent)}
    {disabled}
    aria-haspopup="listbox"
    aria-expanded={isOpen}
    aria-label={triggerAriaLabel}
  >
    <span class="dropdown-trigger__text" class:dropdown-trigger__text--placeholder={!hasValue}>
      {displayText}
    </span>
    <svg
      class="dropdown-trigger__icon"
      class:dropdown-trigger__icon--rotated={isOpen}
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <path
        d="M6 8l4 4 4-4"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
      />
    </svg>
  </Input>

  {#if isOpen}
    <div
      class="dropdown-menu"
      role="listbox"
      aria-labelledby={id}
      bind:this={menuRef}
      onkeydown={handleMenuKeydown}
      tabindex="-1"
    >
      {#each options as option, index (option.value)}
        <button
          type="button"
          class="dropdown-option"
          class:dropdown-option--focused={focusedIndex === index}
          class:dropdown-option--selected={value === option.value}
          role="option"
          aria-selected={value === option.value}
          bind:this={optionRefs[index]}
          onclick={() => handleOptionClick(option.value)}
          onmouseenter={() => handleOptionMouseEnter(index)}
          tabindex="-1"
        >
          <div class="dropdown-option__content">
            <span class="dropdown-option__label">{option.label}</span>
            {#if option.description}
              <span class="dropdown-option__description">{option.description}</span>
            {/if}
          </div>
          {#if value === option.value}
            <svg class="dropdown-option__check" viewBox="0 0 20 20" aria-hidden="true">
              <path
                fill="currentColor"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              />
            </svg>
          {/if}
        </button>
      {/each}
    </div>
  {/if}
</div>

<style lang="scss">
  @use 'styles/breakpoints' as *;
  @use 'lib/components/primitives/root' as root;

  .dropdown {
    @include root.component-root;

    position: relative;
    inline-size: 100%;
  }

  .dropdown :global(.dropdown-trigger) {
    --input-text-align: left;

    inline-size: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--token-reference-spacing-fluid-sm);

    cursor: pointer;
  }

  .dropdown :global(.dropdown-trigger--open) {
    --input-filled-border-color: var(--token-theme-color-interactive-color);
    --input-filled-background: var(--token-theme-color-surface-glass-medium);
    --input-shadow: var(--token-theme-shadow-focus);

    border-end-start-radius: var(--token-reference-radius-sm);
    border-end-end-radius: var(--token-reference-radius-sm);
  }

  .dropdown :global(.dropdown-trigger--error) {
    --input-error-border-color: var(--token-theme-color-status-danger-border);
    --input-error-background: var(--token-theme-color-status-danger-bg);
    --input-error-glow: var(--token-theme-color-status-danger-glow);
  }

  .dropdown :global(.dropdown-trigger--disabled) {
    --input-disabled-background: var(--token-theme-color-surface-glass-subtle);
    --input-disabled-color: var(
      --token-theme-color-text-disabled,
      var(--token-theme-color-text-tertiary)
    );
  }

  .dropdown-trigger__text {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--token-theme-color-text-primary);

    &--placeholder {
      color: var(--token-theme-color-text-tertiary);
    }
  }

  .dropdown-trigger__icon {
    inline-size: var(--token-reference-size-5);
    block-size: var(--token-reference-size-5);
    color: var(--token-theme-color-text-tertiary);
    transition: transform var(--token-theme-motion-feedback-fast)
      var(--token-reference-motion-easing-standard);
    flex-shrink: 0;

    &--rotated {
      transform: rotate(180deg);
      color: var(--token-theme-color-interactive-color);
    }

    @media (min-width: $breakpoint-md) {
      inline-size: var(--token-reference-size-6);
      block-size: var(--token-reference-size-6);
    }
  }

  .dropdown-menu {
    position: absolute;
    inset-block-start: 100%;
    inset-inline: 0;
    z-index: var(--dropdown-menu-z-index, var(--token-reference-layer-popover));

    background: var(--token-theme-color-surface-glass-near-opaque);
    border: var(--token-theme-border-default-small);
    border-block-start: none;
    border-end-start-radius: var(--token-reference-radius-lg);
    border-end-end-radius: var(--token-reference-radius-lg);

    max-block-size: var(--dropdown-menu-max-block-size, var(--token-reference-spacing-20));
    overflow-block: auto;

    box-shadow: var(--token-theme-shadow-elevated);

    animation: slideDown
      var(--dropdown-menu-enter-duration, var(--token-component-menu-motion-enter-duration))
      var(--token-reference-motion-easing-standard);

    &:focus {
      outline: none;
    }

    // Custom scrollbar
    &::-webkit-scrollbar {
      inline-size: var(--dropdown-scrollbar-size, var(--token-reference-spacing-2));
    }

    &::-webkit-scrollbar-track {
      background: var(--token-theme-color-surface-glass-subtle);
      border-radius: var(--token-reference-radius-sm);
    }

    &::-webkit-scrollbar-thumb {
      background: var(--token-theme-color-surface-glass-medium);
      border-radius: var(--token-reference-radius-sm);

      &:hover {
        background: var(--token-theme-color-surface-glass-near-opaque);
      }
    }
  }

  .dropdown-option {
    @include root.interactive-root;

    inline-size: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--token-reference-spacing-fluid-sm);

    background: transparent;
    border: none;
    padding: var(--token-reference-spacing-fluid-md) var(--token-reference-spacing-fluid-lg);

    font-size: var(--token-reference-typography-size-sm);
    font-family: inherit;
    color: var(--token-theme-color-text-primary);
    text-align: left;

    cursor: pointer;
    transition:
      background-color var(--token-theme-motion-feedback-fast)
        var(--token-reference-motion-easing-standard),
      color var(--token-theme-motion-feedback-fast) var(--token-reference-motion-easing-standard);

    @media (min-width: $breakpoint-md) {
      padding: var(--token-reference-spacing-fluid-lg) var(--token-reference-spacing-fluid-xl);
      font-size: var(--token-reference-typography-size-base);
    }

    &:last-child {
      border-end-start-radius: var(--token-reference-radius-lg);
      border-end-end-radius: var(--token-reference-radius-lg);
    }

    &:hover,
    &--focused {
      background: var(--token-theme-color-surface-glass-medium);
      color: var(--token-theme-color-text-heading);
    }

    &--selected {
      background: var(--token-theme-color-surface-glass-medium);
      color: var(--token-theme-color-interactive-color);
      font-weight: var(--token-reference-typography-weight-medium);
    }

    &:focus {
      outline: none;
    }

    &:active {
      background: var(--token-theme-color-surface-glass-near-opaque);
    }
  }

  .dropdown-option__content {
    flex: 1;
    min-inline-size: 0;
  }

  .dropdown-option__label {
    display: block;
    font-weight: var(--token-reference-typography-weight-medium);
    line-height: var(--token-reference-typography-line-height-snug);
    margin-block-end: var(--token-reference-spacing-1);
  }

  .dropdown-option__description {
    display: block;
    font-size: var(--token-reference-typography-size-xs);
    color: var(--token-theme-color-text-tertiary);
    line-height: var(--token-reference-typography-line-height-relaxed);

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-reference-typography-size-sm);
    }
  }

  .dropdown-option__check {
    inline-size: var(--token-reference-size-4);
    block-size: var(--token-reference-size-4);
    color: var(--token-theme-color-interactive-color);
    flex-shrink: 0;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-8px) scale(0.98);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  // Accessibility
  @media (prefers-reduced-motion: reduce) {
    .dropdown-menu {
      animation: none;
    }
  }

  @media (prefers-contrast: high) {
    .dropdown :global(.dropdown-trigger),
    .dropdown-menu {
      border-width: var(--token-reference-border-width-large);
    }

    .dropdown-option--focused,
    .dropdown-option--selected {
      outline: var(--token-reference-border-width-large) solid currentColor;
      outline-offset: calc(var(--token-theme-focus-offset-sm) * -1);
    }
  }
</style>
