<script lang="ts">
  import { createEventDispatcher, onMount, tick } from 'svelte';

  interface DropdownOption {
    value: string;
    label: string;
    description?: string;
  }

  export let options: DropdownOption[] = [];
  export let value: string = '';
  export let placeholder: string = 'Select an option';
  export let disabled: boolean = false;
  export let id: string = '';
  export let ariaLabel: string = '';
  export let error: boolean = false;

  const dispatch = createEventDispatcher<{
    change: { value: string; option: DropdownOption };
  }>();

  // State
  let isOpen = false;
  let focusedIndex = -1;
  let triggerRef: HTMLButtonElement;
  let menuRef: HTMLDivElement;
  let containerRef: HTMLDivElement;

  // Computed values
  $: selectedOption = options.find((opt) => opt.value === value);
  $: displayText = selectedOption?.label || placeholder;
  $: hasValue = Boolean(value?.trim());

  // CSS classes
  $: triggerClasses = [
    'dropdown-trigger',
    isOpen && 'dropdown-trigger--open',
    hasValue && 'dropdown-trigger--filled',
    error && 'dropdown-trigger--error',
    disabled && 'dropdown-trigger--disabled',
  ]
    .filter(Boolean)
    .join(' ');

  // Open/close dropdown
  const openDropdown = async () => {
    if (disabled || isOpen) return;

    isOpen = true;
    focusedIndex = value ? options.findIndex((opt) => opt.value === value) : 0;

    await tick();

    // Focus the menu for keyboard navigation
    if (menuRef) {
      menuRef.focus();
    }
  };

  const closeDropdown = () => {
    if (!isOpen) return;

    isOpen = false;
    focusedIndex = -1;

    // Return focus to trigger
    if (triggerRef) {
      triggerRef.focus();
    }
  };

  const toggleDropdown = () => {
    if (isOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
  };

  // Option selection
  const selectOption = (selectedValue: string) => {
    const option = options.find((opt) => opt.value === selectedValue);
    if (!option) return;

    value = selectedValue;
    dispatch('change', { value: selectedValue, option });
    closeDropdown();
  };

  // Keyboard navigation
  const handleTriggerKeydown = (event: KeyboardEvent) => {
    if (disabled) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
      case 'ArrowDown':
        event.preventDefault();
        openDropdown();
        break;
      case 'ArrowUp':
        event.preventDefault();
        openDropdown();
        // Set focus to last option when opening with up arrow
        focusedIndex = options.length - 1;
        break;
      case 'Escape':
        closeDropdown();
        break;
    }
  };

  const handleMenuKeydown = (event: KeyboardEvent) => {
    if (!isOpen || options.length === 0) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        focusedIndex = focusedIndex < options.length - 1 ? focusedIndex + 1 : 0;
        break;
      case 'ArrowUp':
        event.preventDefault();
        focusedIndex = focusedIndex > 0 ? focusedIndex - 1 : options.length - 1;
        break;
      case 'Home':
        event.preventDefault();
        focusedIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        focusedIndex = options.length - 1;
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
        // Allow normal tab behavior to close dropdown
        closeDropdown();
        break;
    }
  };

  // Click outside handler
  const handleClickOutside = (event: MouseEvent) => {
    if (!isOpen) return;

    const target = event.target as Node;
    if (containerRef && !containerRef.contains(target)) {
      closeDropdown();
    }
  };

  // Set up event listeners
  onMount(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  // Handle option click
  const handleOptionClick = (optionValue: string, event: MouseEvent) => {
    event.stopPropagation();
    selectOption(optionValue);
  };

  // Handle option mouse enter for focus
  const handleOptionMouseEnter = (index: number) => {
    focusedIndex = index;
  };
</script>

<div class="dropdown" bind:this={containerRef}>
  <button
    type="button"
    class={triggerClasses}
    {id}
    bind:this={triggerRef}
    on:click={toggleDropdown}
    on:keydown={handleTriggerKeydown}
    {disabled}
    aria-haspopup="listbox"
    aria-expanded={isOpen}
    aria-label={ariaLabel}
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
  </button>

  {#if isOpen}
    <!-- Backdrop to prevent clicks through -->
    <div class="dropdown-backdrop" aria-hidden="true"></div>

    <div
      class="dropdown-menu"
      role="listbox"
      aria-labelledby={id}
      bind:this={menuRef}
      on:keydown={handleMenuKeydown}
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
          on:click={(e) => handleOptionClick(option.value, e)}
          on:mouseenter={() => handleOptionMouseEnter(index)}
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
  .dropdown {
    position: relative;
    width: 100%;
  }

  .dropdown-trigger {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--token-space-fluid-sm);

    background: var(--token-surface-glass-strong);
    border: var(--token-border-default-small);
    border-radius: var(--token-radius-lg);
    padding: var(--token-space-fluid-md) var(--token-space-fluid-lg);

    font-size: var(--token-font-size-base);
    font-family: inherit;
    color: var(--token-text-primary);
    text-align: left;

    cursor: pointer;
    transition: all var(--token-motion-duration-normal) var(--token-motion-ease-out);
    box-shadow: var(--token-shadow-light);

    @media (min-width: 768px) {
      padding: var(--token-space-fluid-lg) var(--token-space-fluid-xl);
      font-size: var(--token-font-size-lg);
    }

    &:hover:not(:disabled):not(.dropdown-trigger--open) {
      border-color: var(--token-border-color-hover);
      background: var(--token-surface-glass-medium);
      box-shadow: var(--token-shadow-default);
    }

    &:focus {
      outline: none;
      border-color: var(--token-interactive-color);
      background: var(--token-surface-glass-medium);
      box-shadow: var(--token-shadow-focus);
    }

    &:focus-visible {
      outline: 2px solid var(--token-interactive-color);
      outline-offset: 2px;
    }

    &--open {
      border-color: var(--token-interactive-color);
      background: var(--token-surface-glass-medium);
      border-bottom-left-radius: var(--token-radius-sm);
      border-bottom-right-radius: var(--token-radius-sm);
      box-shadow: var(--token-shadow-focus);
    }

    &--filled:not(.dropdown-trigger--open):not(:focus) {
      background: var(--token-surface-glass-medium);
    }

    &--error {
      border-color: var(--token-status-danger-border);
      background: var(--token-status-danger-bg);
      box-shadow: 0 0 0 2px var(--token-status-danger-glow);
    }

    &--disabled {
      background: var(--token-surface-glass-subtle);
      border-color: var(--token-border-color-disabled);
      color: var(--token-text-disabled);
      cursor: not-allowed;
      opacity: 0.6;

      &:hover,
      &:focus {
        border-color: var(--token-border-color-disabled);
        background: var(--token-surface-glass-subtle);
        box-shadow: none;
      }
    }
  }

  .dropdown-trigger__text {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--token-text-primary);

    &--placeholder {
      color: var(--token-text-tertiary);
    }
  }

  .dropdown-trigger__icon {
    width: var(--token-size-4);
    height: var(--token-size-4);
    color: var(--token-text-tertiary);
    transition: transform var(--token-motion-duration-fast) var(--token-motion-ease-out);
    flex-shrink: 0;

    &--rotated {
      transform: rotate(180deg);
      color: var(--token-interactive-color);
    }
  }

  .dropdown-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    background: transparent;
    pointer-events: auto;
  }

  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 1001;

    background: var(--token-surface-glass-stronger);
    border: var(--token-border-default-small);
    border-top: none;
    border-bottom-left-radius: var(--token-radius-lg);
    border-bottom-right-radius: var(--token-radius-lg);

    max-height: 20rem;
    overflow-y: auto;

    box-shadow: var(--token-shadow-elevated);

    animation: slideDown 0.15s ease-out;

    &:focus {
      outline: none;
    }

    // Custom scrollbar
    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      background: var(--token-surface-glass-subtle);
      border-radius: var(--token-radius-sm);
    }

    &::-webkit-scrollbar-thumb {
      background: var(--token-surface-glass-medium);
      border-radius: var(--token-radius-sm);

      &:hover {
        background: var(--token-surface-glass-stronger);
      }
    }
  }

  .dropdown-option {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--token-space-fluid-sm);

    background: transparent;
    border: none;
    padding: var(--token-space-fluid-md) var(--token-space-fluid-lg);

    font-size: var(--token-font-size-sm);
    font-family: inherit;
    color: var(--token-text-primary);
    text-align: left;

    cursor: pointer;
    transition: all var(--token-motion-duration-fast) var(--token-motion-ease-out);

    @media (min-width: 768px) {
      padding: var(--token-space-fluid-lg) var(--token-space-fluid-xl);
      font-size: var(--token-font-size-base);
    }

    &:last-child {
      border-bottom-left-radius: var(--token-radius-lg);
      border-bottom-right-radius: var(--token-radius-lg);
    }

    &:hover,
    &--focused {
      background: var(--token-surface-glass-medium);
      color: var(--token-text-heading);
    }

    &--selected {
      background: var(--token-surface-glass-medium);
      color: var(--token-interactive-color);
      font-weight: var(--token-font-weight-medium);
    }

    &:focus {
      outline: none;
    }

    &:active {
      background: var(--token-surface-glass-stronger);
    }
  }

  .dropdown-option__content {
    flex: 1;
    min-width: 0;
  }

  .dropdown-option__label {
    display: block;
    font-weight: var(--token-font-weight-medium);
    line-height: var(--token-line-height-snug);
    margin-bottom: var(--token-space-1);
  }

  .dropdown-option__description {
    display: block;
    font-size: var(--token-font-size-xs);
    color: var(--token-text-tertiary);
    line-height: var(--token-line-height-relaxed);

    @media (min-width: 768px) {
      font-size: var(--token-font-size-sm);
    }
  }

  .dropdown-option__check {
    width: var(--token-size-4);
    height: var(--token-size-4);
    color: var(--token-interactive-color);
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
    .dropdown-trigger,
    .dropdown-menu {
      border-width: 2px;
    }

    .dropdown-option--focused,
    .dropdown-option--selected {
      outline: 2px solid currentColor;
      outline-offset: -2px;
    }
  }
</style>
