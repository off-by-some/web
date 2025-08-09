<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";

    interface DropdownOption {
        value: string;
        label: string;
        description?: string;
    }

    export let options: DropdownOption[] = [];
    export let value: string = "";
    export let placeholder: string = "Select an option";
    export let disabled: boolean = false;
    export let id: string = "";
    export let ariaLabel: string = "";
    export let error: boolean = false;

    const dispatch = createEventDispatcher<{
        change: { value: string; option: DropdownOption };
    }>();

    const keyActions = {
        trigger: {
            'Enter': () => dropdownOpen ? selectFocusedOption() : toggleDropdown(),
            ' ': () => dropdownOpen ? selectFocusedOption() : toggleDropdown(),
            'Escape': () => dropdownOpen && handleEscape(),
            'ArrowDown': () => dropdownOpen ? moveFocus(1) : toggleDropdown(),
            'ArrowUp': () => dropdownOpen && moveFocus(-1),
            'Home': () => dropdownOpen && setFocus(0),
            'End': () => dropdownOpen && setFocus(options.length - 1)
        },
        option: {
            'Enter': (index: number) => selectOption(options[index].value),
            ' ': (index: number) => selectOption(options[index].value),
            'ArrowDown': () => moveFocusAndApply(1),
            'ArrowUp': () => moveFocusAndApply(-1),
            'Home': () => setFocusAndApply(0),
            'End': () => setFocusAndApply(options.length - 1),
            'Escape': () => handleEscape()
        }
    };

    const classes = {
        base: 'dropdown__trigger',
        open: 'dropdown__trigger--open',
        filled: 'dropdown__trigger--filled',
        error: 'dropdown__trigger--error'
    };

    let dropdownOpen = false;
    let dropdownEl: HTMLDivElement;
    let triggerEl: HTMLButtonElement;
    let focusedIndex = -1;

    const getOptionElement = (index: number): HTMLElement | null =>
        dropdownEl?.querySelector(`[data-index="${index}"]`) as HTMLElement;

    const scrollFocusedOptionIntoView = () => {
        if (focusedIndex >= 0 && dropdownOpen) {
            getOptionElement(focusedIndex)?.scrollIntoView({ 
                block: 'nearest', 
                behavior: 'smooth' 
            });
        }
    };

    const buildTriggerClass = () => [
        classes.base,
        dropdownOpen && classes.open,
        hasValue && classes.filled,
        error && classes.error
    ].filter(Boolean).join(" ");

    const resetState = () => {
        dropdownOpen = false;
        focusedIndex = -1;
    };

    const wrapIndex = (index: number): number => {
        if (options.length === 0) return -1;
        if (index < 0) return options.length - 1;
        if (index >= options.length) return 0;
        return index;
    };

    const setFocusWithBounds = (index: number): boolean => {
        if (index >= 0 && index < options.length) {
            focusedIndex = index;
            scrollFocusedOptionIntoView();
            return true;
        }
        return false;
    };

    const focusOptionElement = (index: number) => {
        getOptionElement(index)?.focus();
    };

    const moveFocus = (direction: number) => {
        if (options.length === 0) return;
        focusedIndex = wrapIndex(focusedIndex + direction);
        scrollFocusedOptionIntoView();
    };

    const moveFocusAndApply = (direction: number) => {
        moveFocus(direction);
        focusOptionElement(focusedIndex);
    };

    const setFocus = (index: number) => {
        setFocusWithBounds(index);
    };

    const setFocusAndApply = (index: number) => {
        if (setFocusWithBounds(index)) {
            focusOptionElement(focusedIndex);
        }
    };

    const toggleDropdown = () => {
        if (disabled) return;
        
        dropdownOpen = !dropdownOpen;
        
        if (dropdownOpen) {
            focusedIndex = 0;
            setTimeout(() => {
                scrollFocusedOptionIntoView();
                focusOptionElement(0);
            }, 0);
        } else {
            focusedIndex = -1;
        }
    };

    const selectFocusedOption = () => {
        if (focusedIndex >= 0) {
            selectOption(options[focusedIndex].value);
        }
    };

    const handleEscape = () => {
        resetState();
        (triggerEl as HTMLButtonElement | undefined)?.focus();
    };

    const selectOption = (selectedValue: string) => {
        const option = options.find(opt => opt.value === selectedValue);
        if (!option) return;

        value = selectedValue;
        dispatch("change", { value: selectedValue, option });
        resetState();
        triggerEl?.blur();
        
        setTimeout(() => dropdownOpen = false, 0);
    };

    const handleTabNavigation = (event: KeyboardEvent, index: number) => {
        const isFirstOption = index === 0;
        const isLastOption = index === options.length - 1;
        
        if (event.shiftKey && isFirstOption) {
            resetState();
            triggerEl?.focus();
        } else if (!event.shiftKey && isLastOption) {
            resetState();
        }
    };

    const createKeydownHandler = (actionMap: Record<string, Function>, index?: number) => 
        (event: KeyboardEvent) => {
            if (disabled) return;
            
            if (event.key === 'Tab' && index !== undefined) {
                handleTabNavigation(event, index);
                return;
            }

            const action = actionMap[event.key];
            if (action) {
                event.preventDefault();
                action(index);
            }
        };

    const createBlurHandler = (condition: (target: Node) => boolean) => 
        (event: FocusEvent) => {
            const relatedTarget = event.relatedTarget as Node;
            if (condition(relatedTarget)) {
                resetState();
            }
        };

    const handleTriggerBlur = createBlurHandler(
        (target) => !dropdownEl?.contains(target)
    );

    const handleOptionBlur = createBlurHandler(
        (target) => !dropdownEl?.contains(target)
    );

    const handleClickOutside = (event: PointerEvent) => {
        if (dropdownEl && !dropdownEl.contains(event.target as Node)) {
            resetState();
            triggerEl?.blur();
        }
    };

    const setupEventListeners = () => {
        document.addEventListener('pointerdown', handleClickOutside);
        return () => document.removeEventListener('pointerdown', handleClickOutside);
    };

    $: selectedOption = options.find(opt => opt.value === value);
    $: displayText = selectedOption?.label || placeholder;
    $: hasValue = Boolean(value?.trim());
    $: triggerClass = buildTriggerClass();
    $: focusedIndex >= 0 && dropdownOpen && scrollFocusedOptionIntoView();

    onMount(setupEventListeners);
</script>

<div class="dropdown" bind:this={dropdownEl}>
    <button
        type="button"
        class={triggerClass}
        {id}
        bind:this={triggerEl}
        on:click={toggleDropdown}
        on:keydown={createKeydownHandler(keyActions.trigger)}
        on:blur={handleTriggerBlur}
        {disabled}
        aria-haspopup="listbox"
        aria-expanded={dropdownOpen}
        aria-label={ariaLabel}
    >
        <span class="dropdown__value" class:dropdown__value--placeholder={!hasValue}>
            {displayText}
        </span>
        <svg 
            class="dropdown__chevron" 
            class:dropdown__chevron--rotated={dropdownOpen}
            viewBox="0 0 20 20" 
            aria-hidden="true" 
            focusable="false"
        >
            <path d="M6 8l4 4 4-4" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
        </svg>
    </button>

    {#if dropdownOpen}
        <div 
            class="dropdown__menu"
            role="listbox"
            aria-labelledby={id}
        >
            {#each options as option, index}
                <button
                    type="button"
                    class="dropdown__option"
                    class:dropdown__option--focused={focusedIndex === index}
                    class:dropdown__option--selected={value === option.value}
                    role="option"
                    aria-selected={value === option.value}
                    on:click={() => selectOption(option.value)}
                    on:mouseenter={() => focusedIndex = index}
                    on:keydown={createKeydownHandler(keyActions.option, index)}
                    on:focus={() => focusedIndex = index}
                    on:blur={handleOptionBlur}
                    data-index={index}
                    tabindex={focusedIndex === index ? 0 : -1}
                >
                    <div class="dropdown__option-content">
                        <span class="dropdown__option-label">{option.label}</span>
                        {#if option.description}
                            <span class="dropdown__option-description">{option.description}</span>
                        {/if}
                    </div>
                    {#if value === option.value}
                        <svg class="dropdown__check" viewBox="0 0 20 20" aria-hidden="true">
                            <path fill="currentColor" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                        </svg>
                    {/if}
                </button>
            {/each}
        </div>
    {/if}
</div>

<style lang="scss">
@use "styles/_breakpoints.scss" as *;

.dropdown {
    position: relative;
    width: 100%;
}

/* Base styles */
.dropdown__trigger {
    width: 100%;
    background: var(--token-surface-glass-strong);
    border: var(--token-border-default-small);
    border-radius: var(--token-radius-lg);
    padding: var(--token-space-fluid-md) var(--token-space-fluid-lg);
    font-size: var(--token-font-size-base);
    font-family: inherit;
    color: var(--token-text-primary);
    transition: all var(--token-motion-duration-normal) var(--token-motion-ease-out);
    backdrop-filter: blur(var(--token-blur-lg));
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: left;
    box-shadow: var(--token-shadow-light);
    position: relative;

    @media (min-width: 768px) {
        padding: var(--token-space-fluid-lg) var(--token-space-fluid-xl);
        font-size: var(--token-font-size-lg);
    }
}

.dropdown__trigger:hover:not(:disabled):not(.dropdown__trigger--open):not(:focus) {
    border-color: var(--token-border-color-hover);
    background: var(--token-surface-glass-medium);
    box-shadow: var(--token-shadow-default);
}

.dropdown__trigger:hover:has(+ .dropdown__menu) {
    border-color: inherit;
    background: inherit;
    box-shadow: inherit;
}

.dropdown__trigger:focus {
    outline: none;
    border-color: var(--token-interactive-color);
    background: var(--token-surface-glass-medium);
    box-shadow: 
        var(--token-shadow-focus),
        0 0 20px var(--token-shadow-glow-subtle);
    transform: translateY(-2px);
}

.dropdown__trigger:focus-visible {
    outline: 3px solid var(--token-interactive-color);
    outline-offset: 2px;
}

.dropdown__trigger--open {
    border-color: var(--token-interactive-color);
    background: var(--token-surface-glass-medium);
    border-bottom-left-radius: var(--token-radius-sm);
    border-bottom-right-radius: var(--token-radius-sm);
    box-shadow: 
        var(--token-shadow-focus),
        0 0 20px var(--token-shadow-glow-subtle);
    pointer-events: auto;
}

.dropdown__trigger--filled:not(.dropdown__trigger--open):not(:focus) {
    background: var(--token-surface-glass-medium);
    box-shadow: var(--token-shadow-light);
    transform: none;
}

.dropdown__trigger--filled:not(.dropdown__trigger--open):not(:focus):hover {
    border-color: var(--token-border-color-hover);
    box-shadow: var(--token-shadow-default);
}

.dropdown__trigger--error {
    border-color: var(--token-status-danger-border);
    background: var(--token-status-danger-bg);
    box-shadow: 0 0 0 2px var(--token-status-danger-glow);
}

.dropdown__trigger:disabled {
    opacity: var(--token-opacity-default);
    cursor: not-allowed;
}

.dropdown__value {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    letter-spacing: var(--token-letter-spacing-normal);
    line-height: var(--token-line-height-normal);
    color: var(--token-text-primary);

    &--placeholder {
        color: var(--token-text-tertiary);
    }
}

.dropdown__chevron {
    width: var(--token-size-4);
    height: var(--token-size-4);
    color: var(--token-text-tertiary);
    transition: all var(--token-motion-duration-fast) var(--token-motion-ease-out);
    flex-shrink: 0;
    margin-left: var(--token-space-fluid-sm);

    &--rotated {
        transform: rotate(180deg);
        color: var(--token-interactive-color);
    }
}

.dropdown__menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--token-surface-glass-strong);
    border: var(--token-border-default-small);
    border-top: none;
    border-bottom-left-radius: var(--token-radius-lg);
    border-bottom-right-radius: var(--token-radius-lg);
    backdrop-filter: blur(var(--token-blur-lg));
    box-shadow: 
        var(--token-shadow-elevated),
        0 0 30px var(--token-shadow-glow-subtle);
    z-index: 1000;
    max-height: 20rem;
    overflow-y: auto;
    animation: dropdownSlideIn var(--token-motion-duration-fast) var(--token-motion-ease-out);

    // Custom scrollbar
    &::-webkit-scrollbar {
        width: var(--token-space-2);
    }

    &::-webkit-scrollbar-track {
        background: var(--token-surface-glass-subtle);
        border-radius: var(--token-radius-sm);
    }

    &::-webkit-scrollbar-thumb {
        background: var(--token-surface-glass-medium);
        border-radius: var(--token-radius-sm);
        
        &:hover {
            background: var(--token-surface-glass-strong);
        }
    }

    scrollbar-width: thin;
    scrollbar-color: var(--token-surface-glass-medium) var(--token-surface-glass-subtle);
}

.dropdown__option {
    width: 100%;
    background: transparent;
    border: none;
    padding: var(--token-space-fluid-md) var(--token-space-fluid-lg);
    font-size: var(--token-font-size-sm);
    font-family: inherit;
    color: var(--token-text-primary);
    cursor: pointer;
    transition: all var(--token-motion-duration-fast) var(--token-motion-ease-out);
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: left;
    position: relative;

    @media (min-width: 768px) {
        padding: var(--token-space-fluid-lg) var(--token-space-fluid-xl);
        font-size: var(--token-font-size-base);
    }

    &:first-child {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
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
        background: var(--token-surface-glass-medium);
        color: var(--token-text-heading);
    }

    &:active {
        background: var(--token-surface-glass-strong);
        transform: scale(0.98);
    }
}

.dropdown__option-content {
    flex: 1;
    min-width: 0;
}

.dropdown__option-label {
    display: block;
    font-weight: var(--token-font-weight-medium);
    line-height: var(--token-line-height-snug);
    letter-spacing: var(--token-letter-spacing-normal);
    margin-bottom: var(--token-space-1);
}

.dropdown__option-description {
    display: block;
    font-size: var(--token-font-size-xs);
    color: var(--token-text-tertiary);
    line-height: var(--token-line-height-relaxed);
    letter-spacing: var(--token-letter-spacing-normal);

    @media (min-width: 768px) {
        font-size: var(--token-font-size-sm);
    }
}

.dropdown__check {
    width: var(--token-size-4);
    height: var(--token-size-4);
    color: var(--token-interactive-color);
    flex-shrink: 0;
    margin-left: var(--token-space-fluid-sm);
}

@keyframes dropdownSlideIn {
    from {
        opacity: 0;
        transform: translateY(-var(--token-space-2)) scale(0.98);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

// Accessibility & Motion Preferences
@media (prefers-reduced-motion: reduce) {
    .dropdown__menu {
        animation: none;
    }

    .dropdown__trigger:hover,
    .dropdown__trigger:focus {
        transform: none;
    }
}

@media (prefers-contrast: high) {
    .dropdown__trigger,
    .dropdown__menu {
        border-width: var(--token-size-2);
        border-color: currentColor;
    }

    .dropdown__option--focused,
    .dropdown__option--selected {
        outline: 2px solid currentColor;
        outline-offset: -2px;
    }
}
</style>