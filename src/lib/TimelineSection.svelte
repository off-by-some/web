<script lang="ts">
    import { onMount } from "svelte";
    import { createEventDispatcher } from "svelte";
    import Section from "./Section.svelte";

    interface Experience {
        title: string;
        company: string;
        logo: string;
        date: string;
        dateValue: string;
        location: string;
        summary: string;
        highlights: string[];
        skills: string[];
    }

    export let experiences: Experience[];
    export let title: string = "Professional Experience";

    const dispatch = createEventDispatcher<{
        experienceSelect: { experience: Experience };
    }>();

    let expandedItems = new Set<number>();
    let timelineElement: HTMLElement | null = null;
    let timelineProgressElement: HTMLElement | null = null;
    let activeIndex = 0;

    onMount(() => {
        const cleanup = initScrollWatcher();
        initProgressAnimation();

        return () => {
            if (cleanup) cleanup();
        };
    });

    function initScrollWatcher() {
        if (!timelineElement) return;

        const handleScroll = () => {
            const container = timelineElement;
            if (!container) return;

            const containerRect = container.getBoundingClientRect();
            const containerTop = containerRect.top;
            const containerHeight = containerRect.height;
            const viewportCenter = window.innerHeight / 2;

            const items = container.querySelectorAll(".timeline__item");
            let closestIndex = 0;
            let minDistance = Infinity;

            items.forEach((item, index) => {
                const itemRect = item.getBoundingClientRect();
                const itemCenter = itemRect.top + itemRect.height / 2;
                const distance = Math.abs(itemCenter - viewportCenter);

                if (distance < minDistance) {
                    minDistance = distance;
                    closestIndex = index;
                }
            });

            if (activeIndex !== closestIndex) {
                console.log(
                    "Timeline item activated:",
                    closestIndex,
                    "distance:",
                    minDistance,
                );
                activeIndex = closestIndex;
                updateTimelineProgress(closestIndex);
            }
        };

        let ticking = false;
        const throttledScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", throttledScroll);
        window.addEventListener("resize", throttledScroll);

        handleScroll();

        return () => {
            window.removeEventListener("scroll", throttledScroll);
            window.removeEventListener("resize", throttledScroll);
        };
    }

    function initProgressAnimation() {
        if (!timelineProgressElement) return;

        timelineProgressElement.style.transform = "scaleY(0)";
        timelineProgressElement.style.transformOrigin = "top";
    }

    function updateTimelineProgress(activeIndex: number) {
        if (!timelineProgressElement || !timelineElement) return;

        const items = timelineElement.querySelectorAll(".timeline__item");
        if (items.length === 0) return;

        const progress = (activeIndex + 1) / items.length;

        requestAnimationFrame(() => {
            timelineProgressElement!.style.transform = `scaleY(${progress})`;
        });

        items.forEach((item, index) => {
            const dot = item.querySelector(".timeline__dot") as HTMLElement;

            if (dot) {
                if (index <= activeIndex) {
                    dot.style.opacity = "1";
                } else {
                    dot.style.opacity = "0.6";
                }
            }
        });
    }

    function handleReadMore(
        event: Event,
        experience: Experience,
        index: number,
    ) {
        event.preventDefault();

        const isExpanded = expandedItems.has(index);

        if (isExpanded) {
            expandedItems.delete(index);
        } else {
            expandedItems.add(index);
        }

        expandedItems = new Set(expandedItems);
        dispatch("experienceSelect", { experience });
    }
</script>

<section class="timeline" id="experience">
    <Section className="timeline__content">
        <div class="timeline__header">
            <h2 class="timeline__title">{title}</h2>
            <div class="timeline__subtitle">
                Building exceptional teams and products across {experiences.length}
                organizations
            </div>
        </div>

        <div class="timeline__container" bind:this={timelineElement}>
            <div class="timeline__line">
                <div
                    class="timeline__progress"
                    bind:this={timelineProgressElement}
                ></div>
            </div>

            {#each experiences as experience, index}
                <div
                    class="timeline__item"
                    class:timeline__item--active={activeIndex === index}
                    class:timeline__item--expanded={expandedItems.has(index)}
                    class:timeline__item--left={index % 2 === 0}
                    class:timeline__item--right={index % 2 === 1}
                    data-index={index}
                >
                    <div class="timeline__card">
                        <div class="timeline__marker">
                            <div class="timeline__dot"></div>
                            <div class="timeline__date">{experience.dateValue}</div>
                        </div>
                        <div class="timeline__card-header">
                            <div class="timeline__logo-container">
                                <img
                                    src={experience.logo}
                                    alt="{experience.company} logo"
                                    class="timeline__logo"
                                    loading="lazy"
                                />
                            </div>
                            <div class="timeline__meta">
                                <h3 class="timeline__role">
                                    {experience.title}
                                </h3>
                                <div class="timeline__company">
                                    {experience.company}
                                </div>
                                <div class="timeline__period">
                                    {experience.date} • {experience.location}
                                </div>
                            </div>
                            <button
                                class="timeline__toggle"
                                on:click={(e) =>
                                    handleReadMore(e, experience, index)}
                                aria-expanded={expandedItems.has(index)}
                            >
                                <span class="toggle__text">
                                    {expandedItems.has(index)
                                        ? "Hide Details"
                                        : "View Details"}
                                </span>
                                <svg
                                    class="toggle__chevron"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M6 9L12 15L18 9"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </button>
                        </div>

                        <div class="timeline__summary">
                            {experience.summary}
                        </div>

                        <div
                            class="timeline__details"
                            class:timeline__details--expanded={expandedItems.has(
                                index,
                            )}
                        >
                            <div class="timeline__highlights">
                                <h4>Key Achievements</h4>
                                <ul>
                                    {#each experience.highlights as highlight}
                                        <li>{highlight}</li>
                                    {/each}
                                </ul>
                            </div>

                            <div class="timeline__skills">
                                {#each experience.skills as skill}
                                    <span class="timeline__skill">{skill}</span>
                                {/each}
                            </div>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </Section>
</section>

<style lang="scss">
@use "styles/_reset.scss" as *;
@use "styles/animations.scss" as *;
@use "styles/_tokens.scss" as *;

.timeline {
    position: relative;
    background: var(--token-gradients-timeline);
    padding: var(--token-space-fluid-5xl) 0;
    overflow: hidden;
    font-family: var(--token-font-family-sans);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.timeline__content {
    position: relative;
    max-width: var(--token-container-max);
    margin: 0 auto;
    padding: 0 var(--token-space-fluid-md);

    @media (min-width: $breakpoint-md) {
        padding: 0 var(--token-space-fluid-lg);
    }

    @media (min-width: $breakpoint-lg) {
        padding: 0 var(--token-space-fluid-xl);
    }
}

.timeline__header {
    text-align: center;
    margin-bottom: var(--token-space-fluid-5xl);
    animation: fade-in-up 1s var(--token-motion-ease-out) both;
}

.timeline__title {
    font-size: var(--token-font-size-5xl);
    font-weight: var(--token-font-weight-bold);
    line-height: var(--token-line-height-tight);
    color: var(--token-text-heading);
    margin-bottom: var(--token-space-fluid-md);
    letter-spacing: var(--token-letter-spacing-tight);
}

.timeline__subtitle {
    font-size: var(--token-font-size-lg);
    color: var(--token-text-secondary);
    font-weight: var(--token-font-weight-normal);
    line-height: var(--token-line-height-relaxed);
    letter-spacing: var(--token-letter-spacing-normal);
}

.timeline__container {
    position: relative;
    padding: var(--token-space-fluid-2xl) 0;
    gap: var(--token-space-fluid-lg);
}

.timeline__line {
    position: absolute;
    left: var(--token-space-fluid-lg);
    top: 0;
    bottom: 0;
    width: var(--token-size-px);
    background: linear-gradient(
        to bottom,
        transparent 0%,
        var(--token-tint-primary-rest) 20%,
        var(--token-tint-primary-rest) 80%,
        transparent 100%
    );
    border-radius: var(--token-radius-full);
    opacity: var(--token-opacity-subtle);

    @media (min-width: $breakpoint-lg) {
        left: 50%;
        transform: translateX(-50%);
        width: var(--token-size-2);
    }

    @media (max-width: calc(#{$breakpoint-md} - 1px)) {
        display: none;
    }

    @media (min-width: $breakpoint-md) and (max-width: #{$breakpoint-lg}) {
        width: var(--token-size-2);
        left: calc(var(--token-space-fluid-md) - var(--token-size-1));
    }
}

.timeline__progress {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        to bottom,
        transparent 0%,
        var(--token-interactive-color) 20%,
        var(--token-interactive-color) 80%,
        transparent 100%
    );
    border-radius: inherit;
    transform: scaleY(0);
    transform-origin: top;
    transition: transform 0.6s var(--token-motion-ease-out);
    box-shadow: 0 0 var(--token-space-2) var(--token-shadow-glow-subtle);
}

.timeline__item {
    position: relative;
    margin-bottom: var(--token-space-fluid-2xl);
    padding-left: var(--token-space-fluid-4xl);
    opacity: 0;
    transform: translateY(var(--token-space-fluid-lg));
    animation: timeline-entrance 0.8s var(--token-motion-ease-out) forwards;

    @media (max-width: calc(#{$breakpoint-md} - 1px)) {
        padding-left: 0;
    }

    &[data-index="0"] { animation-delay: 0.1s; }
    &[data-index="1"] { animation-delay: 0.2s; }
    &[data-index="2"] { animation-delay: 0.3s; }
    &[data-index="3"] { animation-delay: 0.4s; }
    &[data-index="4"] { animation-delay: 0.5s; }
    &[data-index="5"] { animation-delay: 0.6s; }
    &[data-index="6"] { animation-delay: 0.7s; }
    &[data-index="7"] { animation-delay: 0.8s; }
    &[data-index="8"] { animation-delay: 0.9s; }
    &[data-index="9"] { animation-delay: 1s; }

    @media (min-width: $breakpoint-lg) {
        display: grid;
        grid-template-columns: 1.2fr auto 1.2fr;
        gap: var(--token-space-fluid-lg) var(--token-space-fluid-2xl);
        padding-left: 0;
        margin-bottom: var(--token-space-fluid-3xl);
    }
}

@media (min-width: $breakpoint-lg) {
    .timeline__item--left {
        .timeline__card {
            grid-column: 1;
            justify-self: end;
            margin-right: 35px;
        }
    }

    .timeline__item--right {
        .timeline__card {
            grid-column: 3;
            justify-self: start;
            margin-left: 35px;
        }
    }
}

.timeline__item--active {
    .timeline__marker .timeline__dot {
        background: var(--token-interactive-color);
        backdrop-filter: blur(var(--token-blur-sm));
        box-shadow: 
            0 0 0 var(--token-size-2) var(--token-surface-color),
            0 0 0 var(--token-size-3) var(--token-interactive-hover),
            0 0 var(--token-space-fluid-md) var(--token-interactive-glow),
            var(--token-shadow-focus);
        transform: scale(1.2);
        opacity: 1;
    }

    .timeline__card {
        border-color: var(--token-interactive-hover);
        background: var(--token-surface-glass-medium);
        box-shadow: 
            var(--token-shadow-interactive), 
            var(--token-shadow-elevated),
            0 0 20px var(--token-shadow-glow-subtle);
        
        &::before {
            background: linear-gradient(
                135deg,
                var(--token-tint-overlay-medium) 0%,
                transparent 50%,
                var(--token-tint-overlay-subtle) 100%
            );
        }

        &:hover {
            transform: translateY(-6px) scale(1.02);
            box-shadow: 
                var(--token-shadow-interactive), 
                var(--token-shadow-elevated),
                0 0 30px var(--token-state-hover-glow);
        }
    }
}

.timeline__marker {
    width: 7rem;
    position: absolute;
    top: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: var(--token-z-raised);

    @media (min-width: $breakpoint-md) and (max-width: calc(#{$breakpoint-lg} - 1px)) {
        left: -115px;
    }

    @media (min-width: $breakpoint-lg) {
        .timeline__item--left & {
            right: -8.3rem;
        }
        
        .timeline__item--right & {
            left: -8.4rem;
        }
    }

    @media (max-width: calc(#{$breakpoint-md} - 1px)) {
        display: none;
    }
}

.timeline__dot {
    width: var(--token-size-5);
    height: var(--token-size-5);
    border-radius: var(--token-radius-full);
    background: var(--token-surface-glass-strong);
    border: var(--token-border-default-small);
    transition: all var(--token-motion-duration-normal) var(--token-motion-ease-out);
    margin-bottom: var(--token-space-fluid-sm);
    z-index: var(--token-z-raised);
    position: relative;
    opacity: var(--token-opacity-medium);
    backdrop-filter: blur(var(--token-blur-sm));
    box-shadow: var(--token-shadow-light);
}

.timeline__date {
    font-size: var(--token-font-size-xs);
    font-weight: var(--token-font-weight-semibold);
    letter-spacing: var(--token-letter-spacing-extra-wide);
    line-height: var(--token-line-height-snug);
    color: var(--token-text-tertiary);
    opacity: var(--token-opacity-medium);
    text-transform: uppercase;
    white-space: nowrap;
    background: var(--token-surface-glass-strong);
    padding: var(--token-space-fluid-xs) var(--token-space-fluid-sm);
    border-radius: var(--token-radius-sm);
    backdrop-filter: blur(var(--token-blur-lg));
    border: var(--token-border-default-small);
    box-shadow: var(--token-shadow-light);

    @media (max-width: #{$breakpoint-lg}) {
        display: none;
    }
}

.timeline__card {
    background: var(--token-surface-glass-medium);
    border: var(--token-border-default-small);
    border-radius: var(--token-radius-lg);
    padding: var(--token-space-fluid-lg);
    margin: var(--token-space-fluid-lg) 0;
    backdrop-filter: blur(var(--token-blur-lg));
    transition: all var(--token-motion-duration-normal) var(--token-motion-ease-out);
    position: relative;
    width: 100%;
    box-shadow: var(--token-shadow-default);

    &::before {
        content: '';
        position: absolute;
        inset: 0;
        background: var(--token-surface-glass-iridescent);
        opacity: 0;
        transition: opacity var(--token-motion-duration-normal) var(--token-motion-ease-out);
        border-radius: inherit;
        pointer-events: none;
    }

    @media (min-width: $breakpoint-md) {
        padding: var(--token-space-fluid-xl);
        border-radius: var(--token-radius-xl);
    }

    &:hover {
        transform: translateY(-4px) scale(1.02);
        border-color: var(--token-border-color-default);
        box-shadow: var(--token-shadow-elevated);
        
        &::before {
            opacity: 1;
        }
    }

    &:focus-within {
        box-shadow: var(--token-shadow-focus);
        border-color: var(--token-border-focus);
    }
}

.timeline__item--expanded .timeline__card {
    box-shadow: 
        var(--token-shadow-elevated),
        0 0 15px var(--token-shadow-glow-subtle);
    border-color: var(--token-border-color-hover);
    
    &:hover {
        box-shadow: 
            var(--token-shadow-interactive), 
            var(--token-shadow-elevated),
            0 0 25px var(--token-shadow-glow-medium);
        transform: translateY(-5px) scale(1.02);
    }

    &:focus-within {
        box-shadow: var(--token-shadow-focus);
    }
}

.timeline__card-header {
    display: flex;
    gap: var(--token-space-fluid-md);
    margin-bottom: var(--token-space-fluid-lg);
    align-items: flex-start;

    @media (min-width: $breakpoint-md) {
        gap: var(--token-space-fluid-lg);
    }
}

.timeline__logo-container {
    flex-shrink: 0;
    position: relative;
}

.timeline__logo {
    width: var(--token-size-12);
    height: var(--token-size-12);
    border-radius: var(--token-radius-md);
    object-fit: contain;
    background: var(--token-surface-color);
    padding: var(--token-space-2);
    border: var(--token-border-default-small);
    transition: all var(--token-motion-duration-normal) var(--token-motion-ease-out);
    filter: drop-shadow(0 var(--token-space-2) var(--token-space-4) var(--token-shadow-light));

    @media (min-width: $breakpoint-md) {
        border-radius: var(--token-radius-lg);
        padding: var(--token-space-fluid-sm);
    }

    &:hover {
        filter: drop-shadow(0 var(--token-space-2) var(--token-space-4) var(--token-shadow-light))
                brightness(1.1);
        transform: scale(1.03);
    }
}

.timeline__meta {
    flex: 1;
    min-width: 0;
}

.timeline__role {
    font-size: clamp(var(--token-font-size-lg), 3.2cqw, var(--token-font-size-3xl));
    font-weight: var(--token-font-weight-semibold);
    color: var(--token-text-primary);
    margin-bottom: var(--token-space-fluid-xs);
    line-height: var(--token-line-height-snug);
    letter-spacing: var(--token-letter-spacing-normal);
}

.timeline__company {
    font-size: clamp(var(--token-font-size-base), 1.8cqw, var(--token-font-size-lg));
    font-weight: var(--token-font-weight-medium);
    color: var(--token-text-emphasis-default);
    margin-bottom: var(--token-space-fluid-xs);
    line-height: var(--token-line-height-snug);
    letter-spacing: var(--token-letter-spacing-normal);
}

.timeline__period {
    font-size: var(--token-font-size-sm);
    color: var(--token-text-tertiary);
    font-weight: var(--token-font-weight-normal);
    letter-spacing: var(--token-letter-spacing-wide);
    line-height: var(--token-line-height-relaxed);
    opacity: var(--token-opacity-medium);
}

.timeline__summary {
    font-size: clamp(var(--token-font-size-base), 1.5cqw, var(--token-font-size-lg));
    line-height: var(--token-line-height-relaxed);
    color: var(--token-text-secondary);
    margin-bottom: var(--token-space-fluid-lg);
    letter-spacing: var(--token-letter-spacing-normal);
}

.timeline__details {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.4s var(--token-motion-ease-out);
}

.timeline__details--expanded {
    max-height: 80rem;
    margin-bottom: var(--token-space-fluid-lg);
}

.timeline__highlights {
    background: var(--token-surface-glass-strong);
    border: var(--token-border-default-small);
    border-radius: var(--token-radius-lg);
    padding: var(--token-space-fluid-lg);
    margin-bottom: var(--token-space-fluid-lg);
    backdrop-filter: blur(var(--token-blur-lg));
    box-shadow: var(--token-shadow-light);
    position: relative;

    &::before {
        content: '';
        position: absolute;
        inset: 0;
        background: var(--token-surface-glass-iridescent);
        opacity: 0;
        transition: opacity var(--token-motion-duration-normal) var(--token-motion-ease-out);
        border-radius: inherit;
        pointer-events: none;
    }

    &:hover::before {
        opacity: 0.5;
    }

    h4 {
        font-size: var(--token-font-size-base);
        font-weight: var(--token-font-weight-semibold);
        color: var(--token-text-emphasis-default);
        margin-bottom: var(--token-space-fluid-md);
        letter-spacing: var(--token-letter-spacing-normal);
        line-height: var(--token-line-height-snug);
    }

    ul {
        list-style: none;
        padding: 0;
        margin: 0;

        li {
            position: relative;
            padding-left: var(--token-space-fluid-lg);
            margin-bottom: var(--token-space-fluid-sm);
            line-height: var(--token-line-height-relaxed);
            color: var(--token-text-overlay);
            font-size: var(--token-font-size-sm);
            letter-spacing: var(--token-letter-spacing-normal);

            &::before {
                content: "✓";
                position: absolute;
                left: 0;
                color: var(--token-text-emphasis-default);
                font-weight: var(--token-font-weight-semibold);
                font-size: var(--token-font-size-sm);
            }

            &:last-child {
                margin-bottom: 0;
            }
        }
    }
}

.timeline__skills {
    display: flex;
    flex-wrap: wrap;
    gap: var(--token-space-fluid-xs);
}

.timeline__skill {
    padding: var(--token-space-fluid-xs) var(--token-space-fluid-sm);
    background: var(--token-tint-highlight);
    border: var(--token-border-default-small);
    border-radius: var(--token-radius-sm);
    font-size: var(--token-font-size-xs);
    font-weight: var(--token-font-weight-medium);
    letter-spacing: var(--token-letter-spacing-normal);
    line-height: var(--token-line-height-snug);
    color: var(--token-text-primary);
    white-space: nowrap;
    transition: all var(--token-motion-duration-fast) var(--token-motion-ease-out);

    &:hover {
        background: var(--token-tint-highlight);
        border-color: var(--token-text-emphasis-default);
        transform: translateY(-1px);
    }
}

.timeline__toggle {
    background: var(--token-surface-glass-strong);
    border: var(--token-border-default-small);
    border-radius: var(--token-radius-full);
    padding: var(--token-space-fluid-sm) var(--token-space-fluid-lg);
    font-size: var(--token-font-size-sm);
    font-weight: var(--token-font-weight-medium);
    letter-spacing: var(--token-letter-spacing-wide);
    line-height: var(--token-line-height-snug);
    color: var(--token-text-overlay);
    cursor: pointer;
    transition: all var(--token-motion-duration-fast) var(--token-motion-ease-out);
    backdrop-filter: blur(var(--token-blur-lg));
    margin-top: var(--token-space-fluid-md);
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: var(--token-space-fluid-xs);
    box-shadow: var(--token-shadow-light);
    position: relative;

    &::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(
            135deg,
            var(--token-tint-overlay-subtle) 0%,
            transparent 50%
        );
        opacity: 0;
        transition: opacity var(--token-motion-duration-fast) var(--token-motion-ease-out);
        border-radius: inherit;
        pointer-events: none;
    }

    &:hover {
        background: var(--token-surface-glass-strong);
        color: var(--token-text-primary);
        border-color: var(--token-border-color-hover);
        transform: translateY(-3px) scale(1.02);
        box-shadow: 
            var(--token-shadow-default),
            0 0 20px var(--token-shadow-glow-subtle);

        &::before {
            opacity: 1;
        }
    }

    &:active {
        transform: translateY(-1px) scale(1);
        box-shadow: var(--token-shadow-light);
    }

    &:focus-visible {
        outline: 2px solid var(--token-interactive-color);
        outline-offset: 2px;
    }
}

.toggle__chevron {
    transition: transform var(--token-motion-duration-fast) var(--token-motion-ease-out);
    flex-shrink: 0;
}

.timeline__item--expanded .toggle__chevron {
    transform: rotate(180deg);
}

@media (max-width: #{$breakpoint-md}) {
    .timeline__card {
        padding: var(--token-space-fluid-lg);
        max-width: none;
        border-left: var(--token-size-2) solid var(--token-interactive-color);
        border-radius: var(--token-radius-lg) var(--token-radius-lg) var(--token-radius-lg) var(--token-radius-md);
    }

    .timeline__card-header {
        display: grid;
        grid-template-columns: auto 1fr auto;
        gap: var(--token-space-fluid-md);
        align-items: center;
        text-align: left;
    }

    .timeline__meta {
        min-width: 0;
    }

    .timeline__role {
        font-size: var(--token-font-size-lg);
        margin-bottom: var(--token-space-fluid-xs);
    }

    .timeline__company {
        font-size: var(--token-font-size-base);
        margin-bottom: var(--token-space-fluid-xs);
    }

    .timeline__period {
        font-size: var(--token-font-size-xs);
    }

    .timeline__details {
        margin-top: var(--token-space-fluid-md);
    }

    .timeline__toggle {
        flex-shrink: 0;
        padding: var(--token-space-2);
        border-radius: var(--token-radius-full);
        min-width: var(--token-size-12);
        height: var(--token-size-12);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: auto;
        background: var(--token-surface-glass-strong);
        backdrop-filter: blur(var(--token-blur-lg));
        box-shadow: var(--token-shadow-light);

        &:hover {
            background: var(--token-interactive-color);
            color: var(--token-text-dark);
            transform: translateY(-2px) scale(1.05);
            box-shadow: 
                var(--token-shadow-interactive),
                0 0 15px var(--token-interactive-glow);
        }

        &:active {
            transform: translateY(-1px) scale(0.98);
        }
    }

    .toggle__text {
        display: none;
    }
}

@media (max-width: #{$breakpoint-sm}) {
    .timeline {
        padding: var(--token-space-fluid-4xl) 0;
    }

    .timeline__content {
        padding: 0 var(--token-space-fluid-sm);
    }

    .timeline__header {
        margin-bottom: var(--token-space-fluid-4xl);
    }

    .timeline__item {
        padding-left: var(--token-space-fluid-lg);
        margin-bottom: var(--token-space-fluid-2xl);
    }

    .timeline__line {
        display: none;
    }

    .timeline__marker {
        display: none;
    }

    .timeline__card {
        padding: var(--token-space-fluid-md);
        margin: var(--token-space-fluid-md) 0;
    }

    .timeline__highlights {
        padding: var(--token-space-fluid-md);
    }
}

@media (min-width: $breakpoint-md) {
    .timeline__title {
        font-size: var(--token-font-size-6xl);
        line-height: var(--token-line-height-snug);
    }

    .timeline__subtitle {
        font-size: var(--token-font-size-xl);
        line-height: var(--token-line-height-loose);
    }

    .timeline__role {
        font-size: var(--token-font-size-xl);
        line-height: var(--token-line-height-normal);
    }

    .timeline__company {
        font-size: var(--token-font-size-lg);
    }

    .timeline__summary {
        font-size: var(--token-font-size-lg);
        line-height: var(--token-line-height-loose);
    }

    .timeline__highlights h4 {
        font-size: var(--token-font-size-lg);
    }

    .timeline__highlights ul li {
        font-size: var(--token-font-size-base);
        line-height: var(--token-line-height-loose);
    }

    .timeline__skill {
        font-size: var(--token-font-size-sm);
    }

    .timeline__toggle {
        font-size: var(--token-font-size-base);
    }
}

@media (min-width: $breakpoint-lg) {
    .timeline__title {
        font-size: var(--token-font-size-7xl);
        letter-spacing: var(--token-letter-spacing-normal);
    }

    .timeline__subtitle {
        font-size: var(--token-font-size-2xl);
        letter-spacing: var(--token-letter-spacing-wide);
    }

    .timeline__role {
        font-size: var(--token-font-size-2xl);
        letter-spacing: var(--token-letter-spacing-tight);
    }

    .timeline__summary {
        letter-spacing: var(--token-letter-spacing-wide);
    }

    .timeline__date {
        font-size: var(--token-font-size-sm);
        letter-spacing: var(--token-letter-spacing-widest);
    }
}

@keyframes timeline-entrance {
    from {
        opacity: 0;
        transform: translateY(var(--token-space-fluid-lg));
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fade-in-up {
    from {
        opacity: 0;
        transform: translateY(var(--token-space-fluid-lg));
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@media (prefers-reduced-motion: reduce) {
    .timeline__item {
        animation: none;
        opacity: 1;
        transform: none;
    }

    .timeline__dot,
    .timeline__card,
    .timeline__progress,
    .timeline__toggle,
    .timeline__skill {
        transition: none;
    }
}

@media (prefers-contrast: high) {
    .timeline__card,
    .timeline__highlights {
        border-width: var(--token-size-2);
        border-color: currentColor;
    }
}

@media print {
    .timeline {
        background: white;
        color: black;
    }

    .timeline__card {
        border: var(--token-border-default-small);
        box-shadow: none;
        break-inside: avoid;
    }

    .timeline__toggle {
        display: none;
    }

    .timeline__details {
        max-height: none;
        overflow: visible;
    }
}
</style>
