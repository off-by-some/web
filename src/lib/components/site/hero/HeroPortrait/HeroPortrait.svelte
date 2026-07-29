<script lang="ts">
  import Image from '$lib/components/primitives/media/Image';
  import type { HeroPortraitAnnotation } from '$lib/components/site/hero/types';
  import caveatLatinWoff2 from '@fontsource/caveat/files/caveat-latin-400-normal.woff2?url';

  const ANNOTATION_VISIBILITY_QUERY = '(min-width: 64rem) and (min-aspect-ratio: 4/3)';

  type AnnotationSlot = {
    name: string;
    arrowTransform: string;
    labelX: number;
    labelY: number;
    labelSize: number;
    labelRotate: number;
    shadowPath: string;
    linePath: string;
    headPath: string;
  };

  const annotationSlots: AnnotationSlot[] = [
    {
      name: 'systems',
      arrowTransform: 'translate(438 122) scale(0.43)',
      labelX: 536,
      labelY: 136,
      labelSize: 22,
      labelRotate: -5,
      shadowPath: 'M222 19C180 15 142 23 108 43C76 61 52 67 24 68',
      linePath: 'M220 20C181 18 144 26 109 45C78 61 53 67 25 69',
      headPath: 'M42 58L25 69L44 78',
    },
    {
      name: 'team',
      arrowTransform: 'translate(490 284) scale(0.45)',
      labelX: 600,
      labelY: 323,
      labelSize: 22,
      labelRotate: -2,
      shadowPath: 'M222 58C183 52 149 54 116 64C85 74 56 73 27 66',
      linePath: 'M221 60C184 56 150 57 117 66C86 75 57 74 28 67',
      headPath: 'M48 58L28 67L47 78',
    },
    {
      name: 'product',
      arrowTransform: 'translate(440 500) scale(0.45)',
      labelX: 548,
      labelY: 548,
      labelSize: 22,
      labelRotate: -4,
      shadowPath: 'M222 106C184 109 149 99 116 78C86 58 58 47 27 45',
      linePath: 'M221 104C185 106 150 97 117 76C87 59 58 49 28 47',
      headPath: 'M49 38L28 47L47 60',
    },
  ];

  const fallbackAnnotationSlot = annotationSlots[annotationSlots.length - 1];

  function getAnnotationSlot(index: number) {
    return annotationSlots[index] ?? fallbackAnnotationSlot;
  }

  type Props = {
    avatarSrc: string;
    avatarAlt: string;
    annotations?: HeroPortraitAnnotation[];
  };

  let { avatarSrc, avatarAlt, annotations = [] }: Props = $props();

  const annotationSummary = $derived(annotations.map((annotation) => annotation.label).join(', '));
</script>

<svelte:head>
  <link
    rel="preload"
    href={caveatLatinWoff2}
    as="font"
    type="font/woff2"
    crossorigin="anonymous"
    media={ANNOTATION_VISIBILITY_QUERY}
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

      {#if annotations.length}
        <svg
          class="hero-portrait__annotations"
          viewBox="0 0 645 819"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label={`Highlights: ${annotationSummary}`}
        >
          {#each annotations as annotation, index (annotation.label)}
            {@const slot = getAnnotationSlot(index)}
            <g class="annotation annotation--{slot.name}">
              <g class="annotation__connector" transform={slot.arrowTransform} aria-hidden="true">
                <path class="annotation__connector-shadow" d={slot.shadowPath} />
                <path class="annotation__connector-line" d={slot.linePath} />
                <path class="annotation__connector-head" d={slot.headPath} />
              </g>
              <text
                class="annotation__label"
                x={slot.labelX}
                y={slot.labelY}
                font-size={slot.labelSize}
                transform={`rotate(${slot.labelRotate} ${slot.labelX} ${slot.labelY})`}
              >
                {annotation.label}
              </text>
            </g>
          {/each}
        </svg>
      {/if}
    </div>
  </div>
</div>

<style lang="scss">
  @use 'styles/breakpoints' as *;
  @use 'lib/components/primitives/motion' as motion;

  @font-face {
    font-family: 'Hero Annotation';
    font-style: normal;
    font-weight: 400;
    font-display: block;
    src: url('@fontsource/caveat/files/caveat-latin-400-normal.woff2') format('woff2');
  }

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

    @media (min-width: $breakpoint-md-lg) and (min-aspect-ratio: 4 / 3) {
      --portrait-w: min(100%, clamp(24rem, 40vw, 70rem), 80svh);
      min-block-size: calc(var(--portrait-w) * 1.1);
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
    position: absolute;
    inset: 0;
    z-index: 3;
    inline-size: 100%;
    block-size: 100%;
    overflow: visible;
    pointer-events: none;
    color: color-mix(
      in srgb,
      var(--token-theme-color-text-secondary) 72%,
      var(--token-theme-color-interactive-color) 28%
    );
    filter: saturate(0.85);

    @media (min-width: $breakpoint-md-lg) and (min-aspect-ratio: 4 / 3) {
      display: block;
    }
  }

  .annotation {
    opacity: 0.78;
  }

  .annotation__connector {
    fill: none;
    stroke: currentColor;
    stroke-linecap: round;
    stroke-linejoin: round;
    vector-effect: non-scaling-stroke;
  }

  .annotation__connector-shadow {
    opacity: 0.12;
    stroke-width: 2.75;
  }

  .annotation__connector-line {
    opacity: 0.5;
    stroke-width: 1.45;
  }

  .annotation__connector-head {
    opacity: 0.42;
    stroke-linejoin: round;
    stroke-width: 1.55;
  }

  .annotation__label {
    font-family: 'Hero Annotation', cursive;
    font-weight: var(--token-reference-typography-weight-normal);
    line-height: 1;
    fill: currentColor;
    letter-spacing: 0;
    white-space: nowrap;
    paint-order: stroke fill;
    stroke: color-mix(in srgb, var(--token-theme-color-surface-color) 38%, transparent);
    stroke-width: 0.85px;
    stroke-linejoin: round;
    text-shadow:
      0 0 0.75rem var(--token-feature-hero-portrait-annotation-shadow-glow),
      0 1px 0 var(--token-feature-hero-portrait-annotation-shadow-rest);
  }

  .annotation--systems {
    color: color-mix(
      in srgb,
      var(--token-feature-hero-portrait-halo-blue) 38%,
      var(--token-theme-color-text-secondary)
    );
  }

  .annotation--team {
    color: color-mix(
      in srgb,
      var(--token-theme-color-text-secondary) 82%,
      var(--token-feature-hero-portrait-halo-violet)
    );
  }

  .annotation--product {
    color: color-mix(
      in srgb,
      var(--token-theme-color-interactive-color) 22%,
      var(--token-theme-color-text-secondary)
    );
  }

  @include motion.reduced-motion-reset('.hero-portrait');

  @media print {
    .hero-portrait__halo,
    .hero-portrait__annotations {
      display: none;
    }
  }
</style>
