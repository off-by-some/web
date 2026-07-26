<script lang="ts">
  import Image from '$lib/components/primitives/media/Image';
  import type { HeroPortraitAnnotation } from '$lib/components/site/hero/types';
  import productArrow from './assets/annotation-arrow-product.svg?url';
  import systemsArrow from './assets/annotation-arrow-systems.svg?url';
  import teamArrow from './assets/annotation-arrow-team.svg?url';

  type Props = {
    avatarSrc: string;
    avatarAlt: string;
    annotations?: HeroPortraitAnnotation[];
  };

  let { avatarSrc, avatarAlt, annotations = [] }: Props = $props();

  const annotationArrows = [systemsArrow, teamArrow, productArrow];
  const annotationSlots = ['systems', 'team', 'product'];
</script>

<div class="hero-portrait">
  <div class="hero-portrait__composition">
    <div class="hero-portrait__stage">
      <div class="hero-portrait__halo" aria-hidden="true"></div>

      <div class="hero-portrait__cutout-frame">
        <Image
          src={avatarSrc}
          alt={avatarAlt}
          className="hero-portrait__cutout"
          width={775}
          height={1000}
          priority
        />
      </div>
    </div>

    {#if annotations.length}
      <ul class="hero-portrait__annotations" aria-label="Highlights">
        {#each annotations as annotation, index (annotation.label)}
          <li class="annotation annotation--{annotationSlots[index] ?? 'default'}">
            <span
              class="annotation__connector"
              style:--annotation-arrow={`url("${annotationArrows[index % annotationArrows.length]}")`}
              aria-hidden="true"
            ></span>
            <span class="annotation__label">{annotation.label}</span>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</div>

<style lang="scss">
  @use 'styles/breakpoints' as *;
  @use 'lib/components/primitives/motion' as motion;

  .hero-portrait {
    display: flex;
    justify-content: center;
    inline-size: 100%;

    @include motion.fade-in-up(
      heroPortraitIn,
      1.5rem,
      var(--token-theme-motion-enter-default),
      var(--token-reference-motion-delay-300)
    );
  }

  .hero-portrait__composition {
    --portrait-w: min(100%, clamp(19rem, 84vw, 34rem));

    position: relative;
    isolation: isolate;
    inline-size: var(--portrait-w);
    max-inline-size: 100%;
    min-block-size: calc(var(--portrait-w) * 1.18);
    overflow: visible;

    @media (min-width: $breakpoint-md) {
      --portrait-w: min(100%, clamp(29rem, 60vw, 42rem));
    }

    @media (min-width: $breakpoint-lg) {
      --portrait-w: min(100%, clamp(48rem, 47vw, 66rem));
      min-block-size: calc(var(--portrait-w) * 1.08);
    }

    @media (min-width: $breakpoint-xlg) {
      --portrait-w: min(100%, clamp(52rem, 43vw, 72rem));
    }
  }

  .hero-portrait__stage {
    position: relative;
    inline-size: min(100%, calc(var(--portrait-w) * 0.9));
    aspect-ratio: 645 / 819;
    margin-inline: auto;
    isolation: isolate;

    @media (min-width: $breakpoint-lg) {
      inline-size: calc(var(--portrait-w) * 0.84);
      margin-inline: -1.75rem auto;
      transform: translateY(1.35rem);
    }
  }

  .hero-portrait__halo {
    position: absolute;
    z-index: 0;
    inline-size: 90%;
    aspect-ratio: 1;
    inset-inline-start: 50%;
    inset-block-start: 8%;
    transform: translateX(-39%);
    border-radius: var(--token-reference-radius-full);
    background: conic-gradient(
      from 310deg,
      var(--token-theme-color-interactive-color) 0deg,
      var(--token-feature-hero-portrait-halo-blue) 70deg,
      var(--token-feature-hero-portrait-halo-violet) 170deg,
      var(--token-theme-color-emphasis-color) 255deg,
      var(--token-theme-color-interactive-color) 360deg
    );
    box-shadow:
      0 0 2.75rem var(--token-feature-hero-portrait-halo-shadow-primary),
      0 0 4.75rem var(--token-feature-hero-portrait-halo-shadow-secondary);
    opacity: 0.84;
    mask-image:
      radial-gradient(farthest-side, transparent calc(100% - 0.32rem), black calc(100% - 0.24rem)),
      linear-gradient(to bottom, black 0%, black 54%, rgb(0 0 0 / 0.58) 66%, transparent 80%);
    mask-composite: intersect;
    mask-repeat: no-repeat;
    mask-size: 100% 100%;
    -webkit-mask-image:
      radial-gradient(farthest-side, transparent calc(100% - 0.32rem), black calc(100% - 0.24rem)),
      linear-gradient(to bottom, black 0%, black 54%, rgb(0 0 0 / 0.58) 66%, transparent 80%);
    -webkit-mask-composite: source-in;
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: 100% 100%;

    &::after {
      content: '';
      position: absolute;
      inset: -0.45rem;
      border-radius: inherit;
      background: inherit;
      filter: blur(0.85rem);
      opacity: 0.32;
    }
  }

  .hero-portrait__cutout-frame {
    position: absolute;
    z-index: 2;
    inset: 0;
    overflow: hidden;
    mask-image: linear-gradient(
      to bottom,
      black 0%,
      black 72%,
      rgb(0 0 0 / 0.82) 82%,
      rgb(0 0 0 / 0.28) 94%,
      transparent 100%
    );
    mask-repeat: no-repeat;
    mask-size: 100% 100%;
    -webkit-mask-image: linear-gradient(
      to bottom,
      black 0%,
      black 72%,
      rgb(0 0 0 / 0.82) 82%,
      rgb(0 0 0 / 0.28) 94%,
      transparent 100%
    );
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: 100% 100%;

    &::after {
      content: '';
      position: absolute;
      z-index: 2;
      inset-inline: -6%;
      inset-block-end: -1%;
      block-size: 15%;
      pointer-events: none;
      background: linear-gradient(
        to bottom,
        transparent 0%,
        var(--token-feature-hero-portrait-veil-light) 40%,
        var(--token-feature-hero-portrait-veil-medium) 76%,
        var(--token-feature-hero-portrait-veil-strong) 100%
      );
      filter: blur(0.9rem);
    }
  }

  :global(.hero-portrait__cutout) {
    position: absolute;
    z-index: 1;
    inset: 0;
    inline-size: 100%;
    block-size: 100%;
    object-fit: contain;
    object-position: bottom center;
    transform: scale(1.2);
    transform-origin: 50% 0;
  }

  .hero-portrait__annotations {
    display: none;
    list-style: none;
    margin: 0;
    padding: 0;
    position: absolute;
    inset: 0;
    z-index: 2;
    pointer-events: none;

    @media (min-width: $breakpoint-lg) {
      display: block;
    }
  }

  .annotation {
    --annotation-x: 58.5%;
    --annotation-y: 17%;

    position: absolute;
    inset-inline-start: var(--annotation-x);
    inset-block-start: var(--annotation-y);
    display: grid;
    grid-template-columns: 8.75rem max-content;
    align-items: center;
    gap: clamp(0.35rem, 0.6vw, 0.65rem);
    color: var(--token-theme-color-text-secondary);
    opacity: 0.9;
  }

  .annotation--team {
    --annotation-x: 61.5%;
    --annotation-y: 38.5%;
  }

  .annotation--product {
    --annotation-x: 59.5%;
    --annotation-y: 62%;
  }

  .annotation__connector {
    display: block;
    inline-size: 8.75rem;
    aspect-ratio: 240 / 128;
    flex-shrink: 0;
    background: currentColor;
    color: currentColor;
    opacity: 0.56;
    transform: translateY(0.1rem);
    mask: var(--annotation-arrow) center / contain no-repeat;
    -webkit-mask: var(--annotation-arrow) center / contain no-repeat;
  }

  .annotation__label {
    font-family: 'Bradley Hand', 'Segoe Print', 'Marker Felt', 'Comic Sans MS', cursive;
    font-style: italic;
    font-size: clamp(
      var(--token-reference-typography-size-lg),
      0.65rem + 0.65vw,
      var(--token-reference-typography-size-2xl)
    );
    font-weight: var(--token-reference-typography-weight-normal);
    line-height: 1;
    color: currentColor;
    letter-spacing: var(--token-reference-typography-letter-spacing-slightly-tight);
    white-space: nowrap;
    text-shadow:
      0 1px 0 var(--token-feature-hero-portrait-annotation-shadow-rest),
      0 0 1.35rem var(--token-feature-hero-portrait-annotation-shadow-glow);

    transform: rotate(-1deg);
  }

  @include motion.reduced-motion-reset('.hero-portrait');

  @media print {
    .hero-portrait__halo,
    .hero-portrait__annotations {
      display: none;
    }
  }
</style>
