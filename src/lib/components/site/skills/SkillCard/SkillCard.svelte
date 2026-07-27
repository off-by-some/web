<script lang="ts">
  import Card from '$lib/components/primitives/surfaces/Card';
  import IconTile from '$lib/components/primitives/surfaces/IconTile';
  import ToneDot from '$lib/components/primitives/status/ToneDot';
  import VisuallyHidden from '$lib/components/primitives/accessibility/VisuallyHidden';

  type SkillLevel = 'expert' | 'advanced' | 'proficient' | 'learning';

  interface SkillCardData {
    name: string;
    level: SkillLevel;
    years?: number;
    description?: string;
    image: string;
  }

  // How many of the four mastery-meter bars light up for a given level.
  const levelRank: Record<SkillLevel, number> = {
    learning: 1,
    proficient: 2,
    advanced: 3,
    expert: 4,
  };

  // "Expert" reads as a self-declared claim; the meter already shows depth, so the
  // spoken/hidden label for the top tier says "Fluent" instead.
  const levelLabels: Record<SkillLevel, string> = {
    learning: 'Learning',
    proficient: 'Proficient',
    advanced: 'Advanced',
    expert: 'Fluent',
  };

  type Props = {
    skill: SkillCardData;
    delay?: string;
    hovered?: boolean;
    onEngagementChangeRequested?: (active: boolean) => void;
  };

  let {
    skill,
    delay = 'var(--token-reference-motion-delay-0)',
    hovered = false,
    onEngagementChangeRequested,
  }: Props = $props();
</script>

<article
  class="skill-card"
  class:skill-card--hovered={hovered}
  style="--skill-card-delay: {delay};"
>
  <Card
    as="button"
    className="skill-card__button skill-card__button--{skill.level}"
    type="button"
    onclick={() => onEngagementChangeRequested?.(true)}
    onmouseenter={() => onEngagementChangeRequested?.(true)}
    onmouseleave={() => onEngagementChangeRequested?.(false)}
  >
    <IconTile src={skill.image} alt="" sizes="48px" className="skill-image">
      <ToneDot tone={skill.level} className="skill-level-indicator" />
    </IconTile>

    <div class="skill-content">
      <h3 class="skill-name">{skill.name}</h3>

      <div class="skill-meta">
        <span
          class="mastery-chip mastery-chip--{skill.level}"
          style="--mastery-fill: {(levelRank[skill.level] / 4) * 100}%;"
        >
          <span class="mastery-chip__track" aria-hidden="true">
            <span class="mastery-chip__fill"></span>
          </span>
          {#if skill.years}
            <span class="mastery-chip__years">{skill.years} yrs</span>
          {/if}
        </span>
        <VisuallyHidden>
          {levelLabels[skill.level]} level{#if skill.years}, {skill.years} years experience{/if}
        </VisuallyHidden>
      </div>

      {#if skill.description}
        <p class="skill-description">{skill.description}</p>
      {/if}
    </div>
  </Card>
</article>

<style lang="scss">
  @use 'sass:map';
  @use 'sass:list';
  @use 'styles/breakpoints' as *;
  @use 'lib/components/primitives/motion' as motion;
  @use 'lib/components/primitives/tone' as tone;

  .skill-card {
    @include motion.fade-in-up(
      skillCardFadeIn,
      20px,
      var(--token-theme-motion-feedback-slow),
      var(--skill-card-delay),
      forwards
    );
  }

  :global(.skill-card__button) {
    --card-padding: var(--token-reference-spacing-fluid-lg);
    --card-hover-transform: translateY(-4px) scale(1.02);

    cursor: pointer;
    block-size: 100%;
    text-align: center;
    inline-size: 100%;

    @media (min-width: $breakpoint-md) {
      --card-padding: var(--token-reference-spacing-fluid-xl);
    }

    @media (min-width: $breakpoint-lg) {
      --card-padding: var(--token-reference-spacing-fluid-2xl);
    }
  }

  :global(.skill-card__button:hover .skill-image) {
    transform: scale(1.05);
  }

  :global(.skill-card__button:hover .skill-image .icon-tile__image) {
    transform: scale(1.1);
  }

  :global(.skill-card__button:hover .skill-level-indicator) {
    transform: scale(1.2);
  }

  :global(.skill-card__button:hover) .skill-description {
    opacity: 1;
    transform: translateY(0);
  }

  @each $skill-tone, $config in tone.$tones {
    @if list.index(('expert', 'advanced', 'proficient', 'learning'), $skill-tone) {
      :global(.skill-card__button--#{$skill-tone}:hover) {
        --card-hover-border-color: #{map.get($config, color)};
        --card-hover-shadow: var(--token-theme-shadow-elevated), 0 0 30px #{map.get($config, glow)};
        --card-iridescent-background: linear-gradient(
          135deg,
          #{map.get($config, color)} 0%,
          transparent 50%
        );
        --card-hover-iridescent-opacity: 0.1;
      }
    }
  }

  :global(.skill-image) {
    position: relative;
    --icon-tile-size: 3rem;
    --icon-tile-image-size: 2rem;
    --icon-tile-padding: 0;

    margin: 0 auto var(--token-reference-spacing-fluid-md);

    @media (min-width: $breakpoint-md) {
      --icon-tile-size: 4rem;
      --icon-tile-image-size: 2.5rem;
    }

    @media (min-width: $breakpoint-lg) {
      --icon-tile-size: 5rem;
      --icon-tile-image-size: 3rem;
    }
  }

  :global(.skill-level-indicator) {
    position: absolute;
    inset-block-start: -4px;
    inset-inline-end: -4px;
    --tone-dot-size: 1rem;
    --tone-dot-border: var(--token-reference-border-width-large) solid
      var(--token-theme-color-surface-color);

    @media (min-width: $breakpoint-md) {
      --tone-dot-size: 1.25rem;
    }
  }

  .skill-content {
    position: relative;
    z-index: 1;
  }

  .skill-name {
    font-size: var(--token-reference-typography-size-base);
    font-weight: var(--token-reference-typography-weight-semibold);
    color: var(--token-theme-color-text-primary);
    margin-block-end: var(--token-reference-spacing-fluid-xs);
    line-height: var(--token-reference-typography-line-height-snug);

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-reference-typography-size-lg);
    }

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-reference-typography-size-xl);
    }
  }

  .skill-meta {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--token-reference-spacing-fluid-xs);
    margin-block-end: var(--token-reference-spacing-fluid-sm);
    flex-wrap: wrap;

    @media (min-width: $breakpoint-md) {
      gap: var(--token-reference-spacing-fluid-sm);
    }
  }

  .mastery-chip {
    display: inline-flex;
    align-items: center;
    gap: var(--token-reference-spacing-2);
    padding: var(--token-reference-spacing-1) var(--token-reference-spacing-3);
    border-radius: var(--token-reference-radius-full);
    background: var(--token-theme-color-surface-glass-strong);
    border: var(--token-theme-border-default-small);
    backdrop-filter: blur(var(--token-reference-blur-sm));
    transition: border-color var(--token-theme-motion-feedback-default)
      var(--token-reference-motion-easing-standard);
  }

  .mastery-chip__track {
    display: block;
    inline-size: 2rem;
    block-size: 4px;
    border-radius: var(--token-reference-radius-full);
    background: var(--token-theme-color-border-default);
    overflow: hidden;

    @media (min-width: $breakpoint-md) {
      inline-size: 2.5rem;
    }
  }

  .mastery-chip__fill {
    display: block;
    inline-size: var(--mastery-fill);
    block-size: 100%;
    border-radius: inherit;
    transform-origin: left;
    transition:
      box-shadow var(--token-theme-motion-feedback-default)
        var(--token-reference-motion-easing-standard),
      transform var(--token-theme-motion-feedback-default)
        var(--token-reference-motion-easing-standard);
  }

  @each $skill-tone, $config in tone.$tones {
    @if list.index(('expert', 'advanced', 'proficient', 'learning'), $skill-tone) {
      .mastery-chip--#{$skill-tone} .mastery-chip__fill {
        background: #{map.get($config, color)};
      }

      :global(.skill-card__button--#{$skill-tone}:hover) .mastery-chip {
        border-color: #{map.get($config, color)};
      }

      :global(.skill-card__button--#{$skill-tone}:hover) .mastery-chip__fill {
        box-shadow: 0 0 6px #{map.get($config, glow)};
        transform: scaleX(1.04);
      }
    }
  }

  .mastery-chip__years {
    font-size: var(--token-reference-typography-size-xs);
    font-weight: var(--token-reference-typography-weight-medium);
    color: var(--token-theme-color-text-tertiary);
    white-space: nowrap;

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-reference-typography-size-sm);
    }
  }

  .skill-description {
    font-size: var(--token-reference-typography-size-xs);
    line-height: var(--token-reference-typography-line-height-relaxed);
    color: var(--token-theme-color-text-secondary);
    opacity: 0;
    transform: translateY(8px);
    transition:
      color var(--token-theme-motion-feedback-default) var(--token-reference-motion-easing-standard),
      opacity var(--token-theme-motion-feedback-default)
        var(--token-reference-motion-easing-standard),
      transform var(--token-theme-motion-feedback-default)
        var(--token-reference-motion-easing-standard);

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-reference-typography-size-sm);
    }

    @media (max-width: calc($breakpoint-md - 1px)) {
      opacity: 0.8;
      transform: translateY(0);
    }
  }
</style>
