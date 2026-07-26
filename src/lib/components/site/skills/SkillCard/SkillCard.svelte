<script lang="ts">
  import Card from '$lib/components/primitives/surfaces/Card';
  import IconTile from '$lib/components/primitives/surfaces/IconTile';
  import ToneDot from '$lib/components/primitives/status/ToneDot';

  interface SkillCardData {
    name: string;
    level: 'expert' | 'advanced' | 'proficient' | 'learning';
    years?: number;
    description?: string;
    image: string;
  }

  type Props = {
    skill: SkillCardData;
    delay?: string;
    hovered?: boolean;
    onEngagementChangeRequested?: (active: boolean) => void;
  };

  let {
    skill,
    delay = 'var(--token-motion-delay-none)',
    hovered = false,
    onEngagementChangeRequested,
  }: Props = $props();

  const toTitleCase = (str: string): string =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
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
        <span class="skill-level skill-level--{skill.level}">
          {toTitleCase(skill.level)}
        </span>
        {#if skill.years}
          <span class="skill-years">{skill.years}y</span>
        {/if}
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
      var(--token-motion-duration-slow),
      var(--skill-card-delay),
      forwards
    );
  }

  :global(.skill-card__button) {
    --card-padding: var(--token-space-fluid-lg);
    --card-hover-transform: translateY(-4px) scale(1.02);

    cursor: pointer;
    block-size: 100%;
    text-align: center;
    inline-size: 100%;

    @media (min-width: $breakpoint-md) {
      --card-padding: var(--token-space-fluid-xl);
    }

    @media (min-width: $breakpoint-lg) {
      --card-padding: var(--token-space-fluid-2xl);
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
        --card-hover-shadow: var(--token-shadow-elevated), 0 0 30px #{map.get($config, glow)};
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

    margin: 0 auto var(--token-space-fluid-md);

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
    --tone-dot-border: var(--token-border-size-large) solid var(--token-surface-color);

    @media (min-width: $breakpoint-md) {
      --tone-dot-size: 1.25rem;
    }
  }

  .skill-content {
    position: relative;
    z-index: 1;
  }

  .skill-name {
    font-size: var(--token-font-size-base);
    font-weight: var(--token-font-weight-semibold);
    color: var(--token-text-primary);
    margin-block-end: var(--token-space-fluid-xs);
    line-height: var(--token-line-height-snug);

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-lg);
    }

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-font-size-xl);
    }
  }

  .skill-meta {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--token-space-fluid-xs);
    margin-block-end: var(--token-space-fluid-sm);
    flex-wrap: wrap;

    @media (min-width: $breakpoint-md) {
      gap: var(--token-space-fluid-sm);
    }
  }

  .skill-level {
    font-size: var(--token-font-size-xs);
    font-weight: var(--token-font-weight-semibold);
    text-transform: uppercase;
    letter-spacing: var(--token-letter-spacing-widest);
    padding: var(--token-space-1) var(--token-space-2);
    border-radius: var(--token-radius-sm);
    background: var(--token-surface-glass-strong);
    border: var(--token-border-default-small);
    backdrop-filter: blur(var(--token-blur-sm));
    transition:
      background-color var(--token-motion-duration-normal) var(--token-motion-ease-out),
      border-color var(--token-motion-duration-normal) var(--token-motion-ease-out),
      color var(--token-motion-duration-normal) var(--token-motion-ease-out);

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-sm);
      padding: var(--token-space-2) var(--token-space-3);
    }
  }

  @each $skill-tone, $config in tone.$tones {
    @if list.index(('expert', 'advanced', 'proficient', 'learning'), $skill-tone) {
      .skill-level--#{$skill-tone} {
        color: #{map.get($config, color)};
        border-color: #{map.get($config, color)};
      }

      :global(.skill-card__button:hover) .skill-level--#{$skill-tone} {
        background: #{map.get($config, color)};
        color: var(--token-text-dark);
      }
    }
  }

  .skill-years {
    font-size: var(--token-font-size-xs);
    font-weight: var(--token-font-weight-medium);
    color: var(--token-text-tertiary);
    background: var(--token-surface-glass-strong);
    padding: var(--token-space-1) var(--token-space-2);
    border-radius: var(--token-radius-sm);
    border: var(--token-border-default-small);
    backdrop-filter: blur(var(--token-blur-sm));

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-sm);
      padding: var(--token-space-2) var(--token-space-3);
    }
  }

  .skill-description {
    font-size: var(--token-font-size-xs);
    line-height: var(--token-line-height-relaxed);
    color: var(--token-text-secondary);
    opacity: 0;
    transform: translateY(8px);
    transition:
      color var(--token-motion-duration-normal) var(--token-motion-ease-out),
      opacity var(--token-motion-duration-normal) var(--token-motion-ease-out),
      transform var(--token-motion-duration-normal) var(--token-motion-ease-out);

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-sm);
    }

    @media (max-width: calc($breakpoint-md - 1px)) {
      opacity: 0.8;
      transform: translateY(0);
    }
  }
</style>
