<script lang="ts">
    import { onMount } from "svelte";
    import { createEventDispatcher } from "svelte";
    import Section from "./Section.svelte";

    interface Skill {
        name: string;
        level: "expert" | "advanced" | "proficient" | "learning";
        years?: number;
        category: string;
        description?: string;
        image: string;
    }

    interface SkillCategory {
        name: string;
        icon: string;
        color: string;
        skills: Skill[];
        mastery: "expert" | "advanced" | "proficient";
    }

    export let title: string;
    export let subtitle: string;
    export let skillCategories: SkillCategory[];
    export let initialSelectedCategory: string | null = null;

    const dispatch = createEventDispatcher<{
        skillSelect: { skill: Skill; category: SkillCategory };
        categorySelect: { category: SkillCategory };
    }>();

    let skillsElement: HTMLElement | null = null;
    let selectedCategory: string | null = initialSelectedCategory;
    let hoveredSkill: string | null = null;
    let cardVisibilityStates: Map<number, { opacity: number; transform: string }> = new Map();
    let announcementText: string = '';

    $: if (initialSelectedCategory !== undefined) {
        selectedCategory = initialSelectedCategory;
    }

    onMount(() => {
        const cleanup = initScrollBasedRendering();
        
        return () => {
            if (cleanup) cleanup();
        };
    });

    function initScrollBasedRendering() {
        if (!skillsElement) return;

        const config = {
            enterOffset: 150,
            exitOffset: 100,
            staggerDelay: 50,
            maxStagger: 800,
        };

        const handleScroll = () => {
            const container = skillsElement;
            if (!container) return;

            const viewportHeight = window.innerHeight;
            const viewportTop = window.scrollY;
            const viewportBottom = viewportTop + viewportHeight;
            
            const cards = container.querySelectorAll(".skill__card");
            
            cards.forEach((card, index) => {
                const cardElement = card as HTMLElement;
                const cardRect = cardElement.getBoundingClientRect();
                const cardTop = cardRect.top + viewportTop;
                const cardBottom = cardTop + cardRect.height;
                const cardCenter = cardTop + cardRect.height / 2;

                let visibility = 0;
                let translateY = 40;
                let scale = 0.95;

                const fadeInStart = viewportBottom + config.enterOffset;
                const fullyVisibleStart = viewportBottom;
                const fullyVisibleEnd = viewportTop;
                const fadeOutEnd = viewportTop - config.exitOffset;

                if (cardTop <= fadeInStart && cardBottom >= fadeOutEnd) {
                    if (cardTop <= fullyVisibleStart && cardBottom >= fullyVisibleEnd) {
                        visibility = 1;
                        translateY = 0;
                        scale = 1;
                    } else if (cardTop > fullyVisibleStart) {
                        const distanceBelow = cardTop - fullyVisibleStart;
                        const fadeDistance = config.enterOffset;
                        const fadeProgress = Math.max(0, 1 - (distanceBelow / fadeDistance));
                        
                        visibility = fadeProgress;
                        translateY = 40 * (1 - fadeProgress);
                        scale = 0.95 + (0.05 * fadeProgress);
                    } else if (cardBottom < fullyVisibleEnd) {
                        const distanceAbove = fullyVisibleEnd - cardBottom;
                        const fadeDistance = config.exitOffset;
                        const fadeProgress = Math.max(0, 1 - (distanceAbove / fadeDistance));
                        
                        visibility = fadeProgress;
                        translateY = 40 * (1 - fadeProgress);
                        scale = 0.95 + (0.05 * fadeProgress);
                    }
                }

                let finalOpacity = visibility;
                if (visibility > 0 && cardTop > fullyVisibleStart) {
                    const staggerOffset = index * 0.1;
                    const adjustedProgress = Math.max(0, visibility - staggerOffset);
                    finalOpacity = Math.min(visibility, adjustedProgress + staggerOffset);
                }

                const newState = {
                    opacity: Math.max(0, Math.min(1, finalOpacity)),
                    transform: `translateY(${translateY}px) scale(${scale})`
                };

                cardElement.style.opacity = newState.opacity.toString();
                cardElement.style.transform = newState.transform;
                cardElement.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';

                cardVisibilityStates.set(index, newState);
            });
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

        window.addEventListener("scroll", throttledScroll, { passive: true });
        window.addEventListener("resize", throttledScroll, { passive: true });

        handleScroll();

        return () => {
            window.removeEventListener("scroll", throttledScroll);
            window.removeEventListener("resize", throttledScroll);
        };
    }

    function handleCategoryFilter(category: SkillCategory | null) {
        selectedCategory = category?.name || null;
        
        // Announce filter change to screen readers
        const skillCount = category ? category.skills.length : allSkills.length;
        const categoryName = category ? category.name : "All Skills";
        announcementText = `Filtered to ${categoryName}. Showing ${skillCount} skills.`;
        
        cardVisibilityStates.clear();
        
        setTimeout(() => {
            if (skillsElement) {
                const cards = skillsElement.querySelectorAll(".skill__card");
                cards.forEach((card) => {
                    const cardElement = card as HTMLElement;
                    cardElement.style.opacity = "0";
                    cardElement.style.transform = "translateY(40px) scale(0.95)";
                });
                
                const scrollEvent = new Event('scroll');
                window.dispatchEvent(scrollEvent);
            }
        }, 50);
        
        if (category) {
            dispatch("categorySelect", { category });
        }
    }

    function handleSkillHover(
        skill: Skill & { categoryInfo: SkillCategory },
        isHovering: boolean,
    ) {
        hoveredSkill = isHovering ? skill.name : null;

        if (isHovering) {
            dispatch("skillSelect", { skill, category: skill.categoryInfo });
        }
    }

    function handleKeydown(event: KeyboardEvent, index: number) {
        switch (event.key) {
            case 'Enter':
            case ' ':
                event.preventDefault();
                const skill = filteredSkills[index];
                handleSkillHover(skill, true);
                announcementText = `Selected ${skill.name}. ${skill.level} level skill${skill.years ? ` with ${skill.years} years experience` : ''}${skill.description ? `. ${skill.description}` : ''}`;
                return;
            default:
                return;
        }
    }
    
    function getColumnsPerRow(): number {
        if (typeof window === 'undefined') return 2;
        const width = window.innerWidth;
        if (width >= 1024) return 3; // lg breakpoint
        return 2;
    }
    
    function handleFilterKeydown(event: KeyboardEvent, category: SkillCategory | null) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleCategoryFilter(category);
        }
    }

    $: allSkills = skillCategories.flatMap((category) =>
        category.skills.map((skill) => ({ ...skill, categoryInfo: category })),
    );

    $: filteredSkills = selectedCategory
        ? allSkills.filter(
              (skill) => skill.categoryInfo.name === selectedCategory,
          )
        : allSkills;

    $: skillsByLevel = {
        expert: filteredSkills.filter((s) => s.level === "expert").length,
        advanced: filteredSkills.filter((s) => s.level === "advanced").length,
        proficient: filteredSkills.filter((s) => s.level === "proficient")
            .length,
        learning: filteredSkills.filter((s) => s.level === "learning").length,
    };
</script>

<section class="skills" id="skills" bind:this={skillsElement} role="region" aria-labelledby="skills-heading">
    <!-- Screen reader announcements -->
    <div class="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {announcementText}
    </div>
    <Section className="skills__content">
        <div class="skills__container">
            <div class="skills__header">
                <h2 class="skills__title" id="skills-heading">{title}</h2>
                <p class="skills__subtitle">{subtitle}</p>
            </div>

            <div class="skills__filters" role="tablist" aria-label="Filter skills by category">
                <button
                    class="filter__button"
                    class:filter__button--active={!selectedCategory}
                    on:click={() => handleCategoryFilter(null)}
                    on:keydown={(e) => handleFilterKeydown(e, null)}
                    role="tab"
                    aria-selected={!selectedCategory}
                    aria-controls="skills-grid"
                    id="filter-all"
                >
                    All Skills
                    <span class="filter__count" aria-label="{allSkills.length} skills">{allSkills.length}</span>
                </button>

                {#each skillCategories as category, index}
                    <button
                        class="filter__button"
                        class:filter__button--active={selectedCategory === category.name}
                        on:click={() => handleCategoryFilter(category)}
                        on:keydown={(e) => handleFilterKeydown(e, category)}
                        role="tab"
                        aria-selected={selectedCategory === category.name}
                        aria-controls="skills-grid"
                        id="filter-{category.name.toLowerCase().replace(/\s+/g, '-')}"
                    >
                        <span class="filter__icon" aria-hidden="true">{category.icon}</span>
                        {category.name}
                        <span class="filter__count" aria-label="{category.skills.length} skills">{category.skills.length}</span>
                    </button>
                {/each}
            </div>

            <div class="skills__grid" role="grid" aria-labelledby="skills-heading" id="skills-grid" aria-rowcount="{Math.ceil(filteredSkills.length / getColumnsPerRow())}" aria-colcount="{getColumnsPerRow()}">
                {#each filteredSkills as skill, index}
                    <div
                        class="skill__card skill__card--{skill.level} skill__card--scroll-driven"
                        class:skill__card--hovered={hoveredSkill === skill.name}

                        data-card-index={index}
                        on:mouseenter={() => handleSkillHover(skill, true)}
                        on:mouseleave={() => handleSkillHover(skill, false)}
                        on:keydown={(e) => handleKeydown(e, index)}
                        role="gridcell"
                        tabindex="0"
                        aria-rowindex="{Math.floor(index / getColumnsPerRow()) + 1}"
                        aria-colindex="{(index % getColumnsPerRow()) + 1}"
                        aria-label="{skill.name}. {skill.level} level skill{skill.years ? ` with ${skill.years} years experience` : ''}{skill.description ? `. ${skill.description}` : ''}"
                        aria-describedby="skill-{index}-details"
                    >
                        <div class="skill__image">
                            <img
                                src={skill.image}
                                alt=""
                                loading="lazy"
                                role="presentation"
                            />
                            <div
                                class="skill__level-indicator skill__level-indicator--{skill.level}"
                                aria-label="{skill.level} level indicator"
                                role="img"
                            ></div>
                        </div>

                        <div class="skill__content">
                            <h3 class="skill__name" id="skill-{index}-name">{skill.name}</h3>
                            <div class="skill__meta" id="skill-{index}-details">
                                <span class="skill__level" aria-label="Skill level: {skill.level}">{skill.level}</span>
                                {#if skill.years}
                                    <span class="skill__years" aria-label="{skill.years} years of experience">{skill.years}y</span>
                                {/if}
                            </div>
                            {#if skill.description}
                                <p class="skill__description" id="skill-{index}-desc">
                                    {skill.description}
                                </p>
                            {/if}
                        </div>

                        <div class="skill__glow"></div>
                    </div>
                {/each}
            </div>

            <div class="skills__summary" role="region" aria-labelledby="skills-summary-heading">
                <h3 class="sr-only" id="skills-summary-heading">Skills Summary Statistics</h3>
                <div class="summary__grid" role="list" aria-label="Skills statistics">
                    <div class="summary__card" role="listitem" tabindex="0" aria-label="{allSkills.length} total technologies">
                        <div class="summary__number" aria-hidden="true">{allSkills.length}</div>
                        <div class="summary__label" aria-hidden="true">Technologies</div>
                    </div>
                    <div class="summary__card" role="listitem" tabindex="0" aria-label="{skillsByLevel.expert} expert level skills">
                        <div class="summary__number" aria-hidden="true">{skillsByLevel.expert}</div>
                        <div class="summary__label" aria-hidden="true">Expert Level</div>
                    </div>
                    <div class="summary__card" role="listitem" tabindex="0" aria-label="{skillCategories.length} skill domains">
                        <div class="summary__number" aria-hidden="true">{skillCategories.length}</div>
                        <div class="summary__label" aria-hidden="true">Domains</div>
                    </div>
                    <div class="summary__card" role="listitem" tabindex="0" aria-label="Over 12 years of experience">
                        <div class="summary__number" aria-hidden="true">12+</div>
                        <div class="summary__label" aria-hidden="true">Years</div>
                    </div>
                </div>

                <div class="skills__legend" role="list" aria-label="Skill level legend">
                    <div class="legend__item legend__item--expert" role="listitem" tabindex="0" aria-label="Expert level skills indicator">
                        <div class="legend__dot" aria-hidden="true"></div>
                        <span aria-hidden="true">Expert</span>
                    </div>
                    <div class="legend__item legend__item--advanced" role="listitem" tabindex="0" aria-label="Advanced level skills indicator">
                        <div class="legend__dot" aria-hidden="true"></div>
                        <span aria-hidden="true">Advanced</span>
                    </div>
                    <div class="legend__item legend__item--proficient" role="listitem" tabindex="0" aria-label="Proficient level skills indicator">
                        <div class="legend__dot" aria-hidden="true"></div>
                        <span aria-hidden="true">Proficient</span>
                    </div>
                    <div class="legend__item legend__item--learning" role="listitem" tabindex="0" aria-label="Learning level skills indicator">
                        <div class="legend__dot" aria-hidden="true"></div>
                        <span aria-hidden="true">Learning</span>
                    </div>
                </div>
            </div>
        </div>
    </Section>
</section>

<style lang="scss">
@use "styles/_reset.scss" as *;
@use "styles/animations.scss" as *;
@use "styles/_tokens.scss" as *;

:root {
    --skills-expert-color: var(--token-status-expert);
    --skills-advanced-color: var(--token-status-advanced);
    --skills-proficient-color: var(--token-status-proficient);
    --skills-learning-color: var(--token-status-learning);
    
    --skills-expert-glow: var(--token-shadow-glow-medium);
    --skills-advanced-glow: rgba(99, 102, 241, 0.15);
    --skills-proficient-glow: rgba(245, 158, 11, 0.15);
    --skills-learning-glow: rgba(6, 182, 212, 0.15);
    
    --skills-expert-glow-strong: var(--token-shadow-glow-strong);
    --skills-advanced-glow-strong: rgba(99, 102, 241, 0.3);
    --skills-proficient-glow-strong: rgba(245, 158, 11, 0.3);
    --skills-learning-glow-strong: rgba(6, 182, 212, 0.3);
}

/* Screen reader only content */
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}

.skills {
    position: relative;
    background: var(--token-gradients-skills);
    padding: var(--token-space-fluid-5xl) 0;
    overflow: hidden;
    font-family: var(--token-font-family-sans);
    font-feature-settings: "kern" 1, "liga" 1, "calt" 1, "ss01" 1;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.skills__content {
    position: relative;
    max-width: var(--token-container-7xl);
    margin: 0 auto;
    padding: 0 var(--token-space-fluid-md);

    @media (min-width: $breakpoint-md) {
        padding: 0 var(--token-space-fluid-lg);
    }

    @media (min-width: $breakpoint-lg) {
        padding: 0 var(--token-space-fluid-xl);
        max-width: var(--token-container-max);
    }
}

.skills__container {
    animation: fadeInUp var(--token-motion-duration-slow) var(--token-motion-ease-out) both;
}

.skills__header {
    text-align: center;
    margin-bottom: var(--token-space-fluid-5xl);
    animation: fadeInUp var(--token-motion-duration-slow) var(--token-motion-ease-out) 0.2s both;
}

.skills__title {
    font-size: var(--token-font-size-4xl);
    font-weight: var(--token-font-weight-bold);
    line-height: var(--token-line-height-tight);
    color: var(--token-text-heading);
    margin-bottom: var(--token-space-fluid-md);
    letter-spacing: var(--token-letter-spacing-tight);
    background: var(--token-gradients-heading);
    background-size: 200% 200%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: textShimmer 8s ease-in-out infinite;

    @media (min-width: $breakpoint-md) {
        font-size: var(--token-font-size-5xl);
        line-height: var(--token-line-height-snug);
    }

    @media (min-width: $breakpoint-lg) {
        font-size: var(--token-font-size-6xl);
        letter-spacing: var(--token-letter-spacing-normal);
    }
}

.skills__subtitle {
    font-size: var(--token-font-size-lg);
    color: var(--token-text-secondary);
    font-weight: var(--token-font-weight-normal);
    line-height: var(--token-line-height-relaxed);
    letter-spacing: var(--token-letter-spacing-normal);
    max-width: var(--token-container-5xl);
    margin: 0 auto;

    @media (min-width: $breakpoint-md) {
        font-size: var(--token-font-size-xl);
        line-height: var(--token-line-height-loose);
    }

    @media (min-width: $breakpoint-lg) {
        font-size: var(--token-font-size-2xl);
        letter-spacing: var(--token-letter-spacing-wide);
    }
}

.skills__filters {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: var(--token-space-fluid-md);
    margin-bottom: var(--token-space-fluid-5xl);
    animation: fadeInUp var(--token-motion-duration-slow) var(--token-motion-ease-out) 0.4s both;
}

.filter__button {
    display: flex;
    align-items: center;
    gap: var(--token-space-fluid-sm);
    background: var(--token-surface-glass-strong);
    border: var(--token-border-default-small);
    border-radius: var(--token-radius-full);
    padding: var(--token-space-fluid-sm) var(--token-space-fluid-lg);
    font-size: var(--token-font-size-sm);
    font-weight: var(--token-font-weight-medium);
    color: var(--token-text-overlay);
    cursor: pointer;
    transition: all var(--token-motion-duration-fast) var(--token-motion-ease-out);
    backdrop-filter: blur(var(--token-blur-lg));
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    letter-spacing: var(--token-letter-spacing-wide);
    line-height: var(--token-line-height-snug);
    box-shadow: var(--token-shadow-light);

    &::before {
        content: '';
        position: absolute;
        inset: 0;
        background: var(--token-surface-glass-iridescent);
        opacity: 0;
        transition: opacity var(--token-motion-duration-fast) var(--token-motion-ease-out);
        border-radius: inherit;
        pointer-events: none;
    }

    &:hover {
        transform: translateY(-3px) scale(1.02);
        border-color: var(--token-border-color-default);
        color: var(--token-text-primary);
        box-shadow: var(--token-shadow-elevated);

        &::before {
            opacity: 1;
        }
    }

    &:active {
        transform: translateY(-1px) scale(1);
        box-shadow: var(--token-shadow-light);
    }

    &--active {
        background: var(--token-surface-glass-strong);
        border-color: var(--token-border-color-hover);
        color: var(--token-text-primary);
        box-shadow: 
            var(--token-shadow-default),
            0 0 20px var(--token-shadow-glow-subtle);

        &::before {
            background: linear-gradient(
                135deg,
                var(--token-tint-overlay-subtle) 0%,
                transparent 50%
            );
            opacity: 1;
        }

        &:hover {
            transform: translateY(-4px) scale(1.02);
            border-color: var(--token-border-color-hover);
            box-shadow: 
                var(--token-shadow-default),
                0 0 25px var(--token-shadow-glow-medium);

            &::before {
                background: linear-gradient(
                    135deg,
                    var(--token-tint-overlay-medium) 0%,
                    transparent 50%,
                    var(--token-tint-overlay-subtle) 100%
                );
            }
        }
    }

    &:focus-visible {
        outline: 2px solid var(--token-interactive-color);
        outline-offset: 2px;
    }

    @media (min-width: $breakpoint-md) {
        font-size: var(--token-font-size-base);
        padding: var(--token-space-fluid-md) var(--token-space-fluid-xl);
    }
}

.filter__icon {
    font-size: var(--token-font-size-base);
    position: relative;
    z-index: 2;
}

.filter__count {
    background: var(--token-surface-glass-strong);
    border-radius: var(--token-radius-sm);
    padding: var(--token-space-1) var(--token-space-2);
    font-size: var(--token-font-size-xs);
    font-weight: var(--token-font-weight-semibold);
    position: relative;
    z-index: 2;
    letter-spacing: var(--token-letter-spacing-normal);
    line-height: var(--token-line-height-tight);
    backdrop-filter: blur(var(--token-blur-sm));
}

.filter__button--active .filter__count {
    background: var(--token-surface-glass-medium);
    color: var(--token-text-primary);
}

.skills__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--token-space-fluid-xl);
    margin-bottom: var(--token-space-fluid-5xl);
    position: relative;

    &::before {
        content: '';
        position: absolute;
        inset: 0;
        background: 
            radial-gradient(circle at 25% 25%, var(--token-tint-overlay-subtle) 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, var(--token-tint-overlay-subtle) 1px, transparent 1px);
        background-size: 50px 50px;
        opacity: 0;
        transition: opacity var(--token-motion-duration-slow) var(--token-motion-ease-out);
        pointer-events: none;
        z-index: 0;
    }

    &:hover::before {
        opacity: 0.3;
    }

    @media (min-width: $breakpoint-md) {
        gap: var(--token-space-fluid-2xl);
    }

    @media (min-width: $breakpoint-lg) {
        grid-template-columns: repeat(auto-fill, minmax(22rem, 1fr));
        gap: var(--token-space-fluid-2xl) var(--token-space-fluid-3xl);
    }
}

.skill__card {
    background: var(--token-surface-glass-medium);
    border: var(--token-border-default-small);
    border-radius: var(--token-radius-lg);
    padding: var(--token-space-fluid-xl);
    position: relative;
    cursor: pointer;
    backdrop-filter: blur(var(--token-blur-lg));
    box-shadow: var(--token-shadow-default);
    z-index: 1;
    
    &--scroll-driven {
        opacity: 0;
        transform: translateY(40px) scale(0.95);
    }

    &::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.02) 0%,
            transparent 50%,
            rgba(255, 255, 255, 0.01) 100%
        );
        border-radius: inherit;
        pointer-events: none;
        z-index: 0;
    }

    &::before {
        content: '';
        position: absolute;
        inset: 0;
        background: var(--token-surface-glass-iridescent);
        opacity: 0;
        transition: opacity var(--token-motion-duration-normal) var(--token-motion-ease-out);
        border-radius: inherit;
        pointer-events: none;
        z-index: 1;
    }

    @media (min-width: $breakpoint-md) {
        padding: var(--token-space-fluid-2xl);
        border-radius: var(--token-radius-xl);
    }

    &:hover {
        border-color: var(--token-border-color-default);
        box-shadow: var(--token-shadow-elevated);
        z-index: 10;
        
        &.skill__card--scroll-driven {
            transform: translateY(-5px) scale(1.02) !important;
            transition: all var(--token-motion-duration-normal) var(--token-motion-ease-out) !important;
        }
        
        &::before {
            opacity: 1;
        }
    }

    &:focus-within {
        outline: 2px solid var(--token-interactive-color);
        outline-offset: 2px;
        box-shadow: var(--token-shadow-focus);
    }

    &:focus {
        outline: 2px solid var(--token-interactive-color);
        outline-offset: 2px;
        box-shadow: var(--token-shadow-focus);
        z-index: 10;
    }



    &--expert:hover {
        border-color: var(--skills-expert-color);
        box-shadow: 
            var(--token-shadow-elevated),
            0 0 var(--token-space-fluid-xl) var(--skills-expert-glow-strong);

        &.skill__card--scroll-driven {
            transform: translateY(-5px) scale(1.02) !important;
        }

        &::before {
            background: linear-gradient(
                135deg,
                rgba(41, 238, 186, 0.1) 0%,
                transparent 50%,
                rgba(41, 238, 186, 0.05) 100%
            );
        }
    }

    &--advanced:hover {
        border-color: var(--skills-advanced-color);
        box-shadow: 
            var(--token-shadow-elevated),
            0 0 var(--token-space-fluid-xl) var(--skills-advanced-glow-strong);

        &.skill__card--scroll-driven {
            transform: translateY(-5px) scale(1.02) !important;
        }

        &::before {
            background: linear-gradient(
                135deg,
                rgba(99, 102, 241, 0.1) 0%,
                transparent 50%,
                rgba(99, 102, 241, 0.05) 100%
            );
        }
    }

    &--proficient:hover {
        border-color: var(--skills-proficient-color);
        box-shadow: 
            var(--token-shadow-elevated),
            0 0 var(--token-space-fluid-xl) var(--skills-proficient-glow-strong);

        &.skill__card--scroll-driven {
            transform: translateY(-5px) scale(1.02) !important;
        }

        &::before {
            background: linear-gradient(
                135deg,
                rgba(245, 158, 11, 0.1) 0%,
                transparent 50%,
                rgba(245, 158, 11, 0.05) 100%
            );
        }
    }

    &--learning:hover {
        border-color: var(--skills-learning-color);
        box-shadow: 
            var(--token-shadow-elevated),
            0 0 var(--token-space-fluid-xl) var(--skills-learning-glow-strong);

        &.skill__card--scroll-driven {
            transform: translateY(-5px) scale(1.02) !important;
        }

        &::before {
            background: linear-gradient(
                135deg,
                rgba(6, 182, 212, 0.1) 0%,
                transparent 50%,
                rgba(6, 182, 212, 0.05) 100%
            );
        }
    }
}

.skill__image {
    position: relative;
    width: var(--token-size-14);
    height: var(--token-size-14);
    margin: 0 auto var(--token-space-fluid-lg);
    border-radius: var(--token-radius-lg);
    background: var(--token-surface-color);
    border: var(--token-border-default-small);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--token-motion-duration-normal) var(--token-motion-ease-out);
    box-shadow: var(--token-shadow-light);

    @media (min-width: $breakpoint-md) {
        width: 4rem;
        height: 4rem;
        border-radius: var(--token-radius-xl);
    }

    img {
        width: 3rem;
        height: 3rem;
        border-radius: var(--token-radius-sm);
        object-fit: contain;
        transition: transform var(--token-motion-duration-normal) var(--token-motion-ease-out);
        filter: drop-shadow(0 var(--token-space-1) var(--token-space-2) var(--token-shadow-light));
    }
}

.skill__card:hover .skill__image {
    transform: scale(1.05);
    box-shadow: var(--token-shadow-interactive);

    img {
        transform: scale(1.1);
        filter: drop-shadow(0 var(--token-space-2) var(--token-space-4) var(--token-shadow-medium));
    }
}

.skill__level-indicator {
    position: absolute;
    top: calc(-1 * var(--token-space-1));
    right: calc(-1 * var(--token-space-1));
    width: var(--token-size-4);
    height: var(--token-size-4);
    border-radius: var(--token-radius-full);
    border: var(--token-border-default-small);
    z-index: var(--token-z-raised);
    transition: all var(--token-motion-duration-normal) var(--token-motion-ease-out);

    @media (min-width: $breakpoint-md) {
        width: var(--token-size-5);
        height: var(--token-size-5);
    }

    &--expert {
        background: var(--skills-expert-color);
        box-shadow: 0 0 var(--token-space-3) var(--skills-expert-glow-strong);
    }

    &--advanced {
        background: var(--skills-advanced-color);
        box-shadow: 0 0 var(--token-space-3) var(--skills-advanced-glow-strong);
    }

    &--proficient {
        background: var(--skills-proficient-color);
        box-shadow: 0 0 var(--token-space-3) var(--skills-proficient-glow-strong);
    }

    &--learning {
        background: var(--skills-learning-color);
        box-shadow: 0 0 var(--token-space-3) var(--skills-learning-glow-strong);
    }
}

.skill__card:hover .skill__level-indicator {
    transform: scale(1.2);
    box-shadow: 
        0 0 var(--token-space-4) currentColor,
        0 0 var(--token-space-6) rgba(255, 255, 255, 0.1);
}

.skill__content {
    text-align: center;
    position: relative;
    z-index: 2;
}

.skill__name {
    font-size: var(--token-font-size-lg);
    font-weight: var(--token-font-weight-semibold);
    color: var(--token-text-primary);
    margin-bottom: var(--token-space-fluid-sm);
    letter-spacing: var(--token-letter-spacing-normal);
    line-height: var(--token-line-height-snug);

    @media (min-width: $breakpoint-md) {
        font-size: var(--token-font-size-xl);
        line-height: var(--token-line-height-normal);
    }

    @media (min-width: $breakpoint-lg) {
        font-size: var(--token-font-size-2xl);
        letter-spacing: var(--token-letter-spacing-tight);
    }
}

.skill__meta {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--token-space-fluid-sm);
    margin-bottom: var(--token-space-fluid-md);
    flex-wrap: wrap;
    position: relative;
    z-index: 2;
}

.skill__level {
    font-size: var(--token-font-size-xs);
    font-weight: var(--token-font-weight-semibold);
    text-transform: uppercase;
    letter-spacing: var(--token-letter-spacing-widest);
    line-height: var(--token-line-height-tight);
    padding: var(--token-space-2) var(--token-space-3);
    border-radius: var(--token-radius-sm);
    background: var(--token-surface-glass-strong);
    color: var(--token-text-overlay);
    border: var(--token-border-default-small);
    backdrop-filter: blur(var(--token-blur-sm));
    transition: all var(--token-motion-duration-fast) var(--token-motion-ease-out);
    position: relative;
    z-index: 2;

    @media (min-width: $breakpoint-md) {
        font-size: var(--token-font-size-sm);
        padding: var(--token-space-fluid-xs) var(--token-space-fluid-sm);
    }
}

.skill__card:hover .skill__level {
    background: var(--token-interactive-color);
    color: var(--token-text-dark);
    transform: scale(1.05);
}

.skill__years {
    font-size: var(--token-font-size-xs);
    font-weight: var(--token-font-weight-medium);
    color: var(--token-text-tertiary);
    background: var(--token-surface-glass-strong);
    padding: var(--token-space-2) var(--token-space-3);
    border-radius: var(--token-radius-sm);
    letter-spacing: var(--token-letter-spacing-normal);
    line-height: var(--token-line-height-snug);
    border: var(--token-border-default-small);
    backdrop-filter: blur(var(--token-blur-sm));
    position: relative;
    z-index: 2;

    @media (min-width: $breakpoint-md) {
        font-size: var(--token-font-size-sm);
        padding: var(--token-space-fluid-xs) var(--token-space-fluid-sm);
    }
}

.skill__description {
    font-size: var(--token-font-size-sm);
    line-height: var(--token-line-height-relaxed);
    color: var(--token-text-overlay);
    opacity: 0;
    transform: translateY(var(--token-space-fluid-sm));
    transition: all var(--token-motion-duration-normal) var(--token-motion-ease-out);
    letter-spacing: var(--token-letter-spacing-normal);
    margin-top: var(--token-space-fluid-sm);
    position: relative;
    z-index: 2;

    @media (min-width: $breakpoint-md) {
        font-size: var(--token-font-size-base);
        line-height: var(--token-line-height-loose);
    }
}

.skill__card:hover .skill__description {
    opacity: 1;
    transform: translateY(0);
}

.skills__summary {
    background: var(--token-surface-glass-medium);
    border: var(--token-border-default-small);
    border-radius: var(--token-radius-lg);
    padding: var(--token-space-fluid-lg);
    backdrop-filter: blur(var(--token-blur-lg));
    animation: fadeInUp var(--token-motion-duration-slow) var(--token-motion-ease-out) 0.6s both;
    position: relative;
    overflow: hidden;
    box-shadow: var(--token-shadow-default);

    &::before {
        content: '';
        position: absolute;
        inset: 0;
        background: var(--token-surface-glass-iridescent);
        opacity: 0;
        transition: opacity var(--token-motion-duration-normal) var(--token-motion-ease-out);
        border-radius: inherit;
    }

    &:hover::before {
        opacity: 1;
    }

    &:hover .section__title {
        color: var(--token-text-secondary);
    }

    @media (min-width: $breakpoint-md) {
        padding: var(--token-space-fluid-xl);
        border-radius: var(--token-radius-xl);
    }
}

.section__title {
    font-size: var(--token-font-size-xs);
    font-weight: var(--token-font-weight-semibold);
    color: var(--token-text-tertiary);
    text-transform: uppercase;
    letter-spacing: var(--token-letter-spacing-extra-wide);
    margin-bottom: var(--token-space-fluid-sm);
    line-height: var(--token-line-height-snug);
    transition: color var(--token-motion-duration-normal) var(--token-motion-ease-out);

    @media (min-width: $breakpoint-lg) {
        font-size: var(--token-font-size-sm);
        letter-spacing: var(--token-letter-spacing-widest);
    }
}

.section__accent {
    width: 1.5rem;
    height: 2px;
    background: var(--token-emphasis-color);
    border-radius: var(--token-radius-full);
    margin-bottom: var(--token-space-fluid-md);
    transition: width var(--token-motion-duration-normal) var(--token-motion-ease-out);
}

.skills__summary:hover .section__accent {
    width: 3rem;
}

.summary__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--token-space-fluid-sm);
    margin-bottom: var(--token-space-fluid-2xl);

    @media (min-width: $breakpoint-md) {
        grid-template-columns: repeat(4, 1fr);
        gap: var(--token-space-fluid-md);
    }
}

.summary__card {
    padding: var(--token-space-fluid-md);
    text-align: center;
    background: var(--token-gradients-stat-default);
    border: var(--token-border-default-small);
    border-radius: var(--token-radius-md);
    transition: all var(--token-motion-duration-normal) var(--token-motion-ease-out);
    position: relative;
    cursor: pointer;
    overflow: hidden;

    &::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.02) 0%,
            transparent 50%,
            rgba(255, 255, 255, 0.01) 100%
        );
        border-radius: inherit;
        pointer-events: none;
        z-index: 0;
    }

    &::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(
            135deg,
            var(--token-tint-overlay-subtle) 0%,
            transparent 70%
        );
        opacity: 0;
        transition: opacity var(--token-motion-duration-normal) var(--token-motion-ease-out);
        border-radius: inherit;
        z-index: 1;
    }

    &:hover {
        transform: translateY(-5px) scale(1.02);
        background: var(--token-gradients-stat-hover);
        border-color: var(--token-border-color-hover);
        box-shadow: 
            var(--token-shadow-interactive), 
            var(--token-shadow-default),
            0 0 20px var(--token-shadow-glow-subtle);

        &::before {
            opacity: 1;
        }

        .summary__number {
            transform: scale(1.1);
            color: var(--token-text-heading);
        }
    }

    &:nth-child(even) {
        background: var(--token-gradients-stat-alt);

        &:hover {
            background: var(--token-gradients-stat-alt_hover);
        }
    }
}

.summary__number {
    font-size: var(--token-font-size-2xl);
    font-weight: var(--token-font-weight-bold);
    line-height: var(--token-line-height-tight);
    margin-bottom: var(--token-space-1);
    color: var(--token-text-emphasis-heading);
    letter-spacing: var(--token-letter-spacing-tight);
    transition: all var(--token-motion-duration-normal) var(--token-motion-ease-out);
    position: relative;
    z-index: 2;

    @media (min-width: $breakpoint-md) {
        font-size: var(--token-font-size-3xl);
    }

    @media (min-width: $breakpoint-lg) {
        font-size: var(--token-font-size-35xl);
        line-height: var(--token-line-height-snug);
    }
}

.summary__label {
    font-size: var(--token-font-size-xs);
    font-weight: var(--token-font-weight-medium);
    color: var(--token-text-tertiary);
    text-transform: uppercase;
    letter-spacing: var(--token-letter-spacing-widest);
    line-height: var(--token-line-height-relaxed);
    transition: color var(--token-motion-duration-normal) var(--token-motion-ease-out);
    position: relative;
    z-index: 2;

    @media (min-width: $breakpoint-lg) {
        font-size: var(--token-font-size-sm);
        letter-spacing: var(--token-letter-spacing-extra-wide);
    }
}

.summary__card:hover .summary__label {
    color: var(--token-text-secondary);
}

.skills__legend {
    display: flex;
    justify-content: center;
    gap: var(--token-space-fluid-xl);
    flex-wrap: wrap;
    padding-top: var(--token-space-fluid-xl);
    border-top: var(--token-border-default-small);
    animation: fadeInUp var(--token-motion-duration-slow) var(--token-motion-ease-out) 0.8s both;

    @media (min-width: $breakpoint-md) {
        gap: var(--token-space-fluid-2xl);
    }
}

.legend__item {
    display: flex;
    align-items: center;
    gap: var(--token-space-fluid-sm);
    font-size: var(--token-font-size-xs);
    font-weight: var(--token-font-weight-medium);
    color: var(--token-text-tertiary);
    letter-spacing: var(--token-letter-spacing-wide);
    line-height: var(--token-line-height-snug);
    cursor: pointer;
    transition: all var(--token-motion-duration-fast) var(--token-motion-ease-out);
    padding: var(--token-space-2) var(--token-space-3);
    border-radius: var(--token-radius-sm);

    @media (min-width: $breakpoint-md) {
        font-size: var(--token-font-size-sm);
    }

    &:hover {
        color: var(--token-text-primary);
        transform: translateY(-2px);
    }
}

.legend__dot {
    width: var(--token-space-3);
    height: var(--token-space-3);
    border-radius: var(--token-radius-full);
    flex-shrink: 0;
    transition: all var(--token-motion-duration-fast) var(--token-motion-ease-out);

    @media (min-width: $breakpoint-md) {
        width: var(--token-space-4);
        height: var(--token-space-4);
    }
}

.legend__item:hover .legend__dot {
    transform: scale(1.3);
}

.legend__item--expert .legend__dot {
    background: var(--skills-expert-color);
    box-shadow: 0 0 var(--token-space-3) var(--skills-expert-glow-strong);
}

.legend__item--advanced .legend__dot {
    background: var(--skills-advanced-color);
    box-shadow: 0 0 var(--token-space-3) var(--skills-advanced-glow-strong);
}

.legend__item--proficient .legend__dot {
    background: var(--skills-proficient-color);
    box-shadow: 0 0 var(--token-space-3) var(--skills-proficient-glow-strong);
}

.legend__item--learning .legend__dot {
    background: var(--skills-learning-color);
    box-shadow: 0 0 var(--token-space-3) var(--skills-learning-glow-strong);
}

@media (max-width: #{$breakpoint-md}) {
    .skills {
        padding: var(--token-space-fluid-4xl) 0;
    }

    .skills__content {
        padding: 0 var(--token-space-fluid-sm);
    }

    .skills__header {
        margin-bottom: var(--token-space-fluid-4xl);
    }

    .skills__filters {
        gap: var(--token-space-fluid-sm);
        margin-bottom: var(--token-space-fluid-4xl);
    }

    .filter__button {
        padding: var(--token-space-fluid-sm) var(--token-space-fluid-md);
        font-size: var(--token-font-size-xs);
    }

    .skills__grid {
        gap: var(--token-space-fluid-md);
        margin-bottom: var(--token-space-fluid-4xl);
    }

    .skill__card {
        padding: var(--token-space-fluid-lg);
        
        &:hover.skill__card--scroll-driven {
            transform: translateY(-3px) scale(1.01) !important;
            transition: all var(--token-motion-duration-fast) var(--token-motion-ease-out) !important;
        }
    }

    .skill__description {
        opacity: var(--token-opacity-medium);
        transform: translateY(0);
        margin-top: var(--token-space-fluid-sm);
    }

    .skill__card:hover .skill__description {
        opacity: 1;
    }

    .skills__summary {
        padding: var(--token-space-fluid-xl);
    }

    .skills__legend {
        gap: var(--token-space-fluid-md);
    }
}

@media (max-width: #{$breakpoint-sm}) {
    .skills {
        padding: var(--token-space-fluid-3xl) 0;
    }

    .skills__filters {
        flex-direction: column;
        align-items: center;
        gap: var(--token-space-fluid-sm);
    }

    .filter__button {
        min-width: var(--token-size-40);
        justify-content: center;
    }

    .summary__grid {
        grid-template-columns: 1fr;
        gap: var(--token-space-fluid-md);
    }

    .skills__legend {
        flex-direction: column;
        align-items: center;
        gap: var(--token-space-fluid-sm);
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(var(--token-space-fluid-xl));
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes textShimmer {
    0%, 100% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
}

@media (prefers-reduced-motion: reduce) {
    .skill__card,
    .skills__container,
    .skills__header,
    .skills__filters,
    .skills__summary,
    .skills__legend {
        animation: none;
    }
    
    .skill__card--scroll-driven {
        opacity: 1 !important;
        transform: none !important;
        transition: none !important;
    }

    .skill__card:hover,
    .filter__button:hover,
    .summary__card:hover {
        transform: none !important;
        transition: none !important;
    }

    .skill__description {
        opacity: 1;
        transform: none;
    }
}

@media (prefers-contrast: high) {
    .skill__card,
    .filter__button,
    .summary__card {
        border-width: var(--token-size-2);
        border-color: currentColor;
    }

    .skill__name,
    .summary__number {
        text-shadow: none;
        font-weight: var(--token-font-weight-bold);
    }
}

.skill__card:focus-visible,
.filter__button:focus-visible {
    outline: 2px solid var(--token-interactive-color);
    outline-offset: 2px;
}

@media print {
    .skills {
        background: white;
        color: black;
        padding: var(--token-space-fluid-lg);
    }

    .skill__card,
    .summary__card {
        border: var(--token-border-default-small);
        box-shadow: none;
        break-inside: avoid;
    }

    .skills__filters {
        display: none;
    }

    .skills__grid {
        grid-template-columns: repeat(2, 1fr);
        gap: var(--token-space-fluid-lg);
    }

    .skill__description {
        opacity: 1;
        transform: none;
    }
}
</style>
