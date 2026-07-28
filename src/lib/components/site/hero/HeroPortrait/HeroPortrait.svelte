<script lang="ts">
  import { onMount } from 'svelte';
  import Image from '$lib/components/primitives/media/Image';
  import type { HeroPortraitAnnotation } from '$lib/components/site/hero/types';
  import caveatLatinWoff2 from '@fontsource/caveat/files/caveat-latin-400-normal.woff2?url';
  import productArrow from './assets/annotation-arrow-product.svg?url';
  import systemsArrow from './assets/annotation-arrow-systems.svg?url';
  import teamArrow from './assets/annotation-arrow-team.svg?url';

  // The @font-face CSS is loaded lazily so this decorative, lg+-only font
  // never lands in the critical-path CSS bundle (it regressed LCP when
  // statically imported). The preload below starts fetching the font bytes
  // immediately in parallel, so by the time that CSS chunk arrives, the
  // browser already has the file cached and can apply it without a second
  // round trip. Scoped to lg+ since annotations are hidden below that.
  onMount(() => {
    import('@fontsource/caveat/400.css');
  });

  type Props = {
    avatarSrc: string;
    avatarAlt: string;
    annotations?: HeroPortraitAnnotation[];
  };

  let { avatarSrc, avatarAlt, annotations = [] }: Props = $props();

  const annotationArrows = [systemsArrow, teamArrow, productArrow];
  const annotationSlots = ['systems', 'team', 'product'];
</script>

<svelte:head>
  <link
    rel="preload"
    href={caveatLatinWoff2}
    as="font"
    type="font/woff2"
    crossorigin="anonymous"
    media="(min-width: 1170px)"
  />
</svelte:head>

<div class="hero-portrait">
  <div class="hero-portrait__composition">
    <div class="hero-portrait__stage">
      <div class="hero-portrait__halo" aria-hidden="true"></div>

      <div class="hero-portrait__cutout-frame">
        <Image
          src={avatarSrc}
          alt={avatarAlt}
          className="hero-portrait__cutout"
          style="max-inline-size: 115%;"
          placeholderSrc="inline/cassidy-cutout-placeholder.webp"
          width={1200}
          height={1548}
          sizes="(min-width: 1376px) 60vw, (min-width: 1024px) 42vw, (min-width: 768px) 70vw, 90vw"
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
    --portrait-w: min(100%, clamp(18rem, 78vw, 31rem));

    position: relative;
    isolation: isolate;
    inline-size: var(--portrait-w);
    max-inline-size: 115%;
    min-block-size: calc(var(--portrait-w) * 1.18);
    overflow: visible;

    @media (min-width: $breakpoint-md) {
      --portrait-w: min(100%, clamp(30rem, 56vw, 39rem));
      min-block-size: calc(var(--portrait-w) * 1.14);
    }

    @media (min-width: $breakpoint-md-lg) {
      --portrait-w: min(100%, clamp(24rem, 40vw, 34rem));
      min-block-size: calc(var(--portrait-w) * 1.12);
    }

    @media (min-width: $breakpoint-lg) {
      --portrait-w: min(100%, clamp(48rem, 47vw, 66rem));
      min-block-size: calc(var(--portrait-w) * 1.08);
    }

    @media (min-width: $breakpoint-xlg) {
      --portrait-w: min(100%, clamp(52rem, 43vw, 72rem));
    }

    // Width-driven sizing alone can make the portrait too tall for short
    // viewports (landscape phones especially, which are often wider than
    // $breakpoint-md but only a few hundred px tall). Cap it against the
    // viewport height directly once height is the tighter constraint.
    @media (max-height: 600px) {
      --portrait-w: min(58vh, 20rem);
      min-block-size: calc(var(--portrait-w) * 1.15);
    }
  }

  .hero-portrait__stage {
    position: relative;
    inline-size: min(100%, calc(var(--portrait-w) * 0.9));
    aspect-ratio: 645 / 819;
    margin-inline: auto;
    isolation: isolate;

    @media (min-width: $breakpoint-md-lg) {
      inline-size: min(100%, calc(var(--portrait-w) * 0.94));
    }

    @media (min-width: $breakpoint-lg) {
      inline-size: calc(var(--portrait-w) * 0.87);
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
  }

  :global(.hero-portrait__cutout) {
    position: absolute;
    z-index: 1;
    inset-block-start: 0;
    inset-inline-start: -7.5%;
    inline-size: 115%;
    block-size: 115%;
    object-fit: contain;
    object-position: bottom center;
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

    @media (min-width: $breakpoint-md-lg) {
      display: block;
    }
  }

  .annotation {
    --annotation-x: 58.5%;
    --annotation-y: 17%;
    --annotation-connector-y: 0.2rem;
    --annotation-label-x: 0;
    --annotation-label-y: 0;

    position: absolute;
    inset-inline-start: var(--annotation-x);
    inset-block-start: var(--annotation-y);
    display: grid;
    grid-template-columns: var(--annotation-connector-width, 6.75rem) max-content;
    align-items: center;
    gap: clamp(0.35rem, 0.6vw, 0.65rem);
    color: var(--token-theme-color-text-secondary);
    opacity: 0.9;

    @media (min-width: $breakpoint-lg) {
      --annotation-connector-width: 8.75rem;
    }
  }

  .annotation--systems {
    --annotation-connector-y: 0.55rem;
    --annotation-label-y: -1.45rem;

    @media (min-width: $breakpoint-lg) {
      --annotation-label-y: -2rem;
    }
  }

  .annotation--team {
    --annotation-x: 68.5%;
    --annotation-y: 38.5%;
    --annotation-label-x: 0.8rem;

    @media (min-width: $breakpoint-lg) {
      --annotation-x: 71%;
      --annotation-label-x: 1.45rem;
    }
  }

  .annotation--product {
    --annotation-x: 59.5%;
    --annotation-y: 62%;
  }

  .annotation__connector {
    display: block;
    inline-size: var(--annotation-connector-width, 6.75rem);
    aspect-ratio: 240 / 128;
    flex-shrink: 0;
    background: currentColor;
    color: currentColor;
    opacity: 0.56;
    transform: translateY(var(--annotation-connector-y));
    mask: var(--annotation-arrow) center / contain no-repeat;
    -webkit-mask: var(--annotation-arrow) center / contain no-repeat;
  }

  .annotation__label {
    font-family: 'Caveat', cursive;
    font-size: clamp(
      var(--token-reference-typography-size-base),
      0.7rem + 0.55vw,
      var(--token-reference-typography-size-xl)
    );
    font-weight: var(--token-reference-typography-weight-normal);
    line-height: 1;
    color: currentColor;
    letter-spacing: var(--token-reference-typography-letter-spacing-slightly-tight);
    white-space: nowrap;
    text-shadow:
      0 1px 0 var(--token-feature-hero-portrait-annotation-shadow-rest),
      0 0 1.35rem var(--token-feature-hero-portrait-annotation-shadow-glow);

    transform: translate(var(--annotation-label-x), var(--annotation-label-y)) rotate(-1deg);

    @media (min-width: $breakpoint-lg) {
      font-size: clamp(
        var(--token-reference-typography-size-lg),
        0.65rem + 0.65vw,
        var(--token-reference-typography-size-2xl)
      );
    }
  }

  @include motion.reduced-motion-reset('.hero-portrait');

  @media print {
    .hero-portrait__halo,
    .hero-portrait__annotations {
      display: none;
    }
  }
</style>
