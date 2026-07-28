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
      arrowTransform: 'translate(486 70) scale(0.48)',
      labelX: 602,
      labelY: 84,
      labelSize: 27,
      labelRotate: -3,
      shadowPath: 'M222 18C176 16 136 27 100 52C68 74 43 82 18 88',
      linePath: 'M220 20C175 19 137 30 101 53C70 73 45 82 19 88',
      headPath: 'M37 76L18 88L39 98',
    },
    {
      name: 'team',
      arrowTransform: 'translate(518 284) scale(0.5)',
      labelX: 652,
      labelY: 330,
      labelSize: 27,
      labelRotate: -2,
      shadowPath: 'M222 58C180 52 142 54 105 66C73 76 47 76 18 67',
      linePath: 'M221 60C179 55 143 57 106 68C74 77 47 76 19 68',
      headPath: 'M39 57L18 68L38 80',
    },
    {
      name: 'product',
      arrowTransform: 'translate(482 522) scale(0.5)',
      labelX: 620,
      labelY: 578,
      labelSize: 27,
      labelRotate: -2,
      shadowPath: 'M222 110C178 112 140 101 105 77C75 56 48 45 18 42',
      linePath: 'M221 108C178 109 141 98 106 75C76 56 48 46 19 43',
      headPath: 'M40 34L18 43L36 58',
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
    color: var(--token-theme-color-text-secondary);

    @media (min-width: $breakpoint-md-lg) and (min-aspect-ratio: 4 / 3) {
      display: block;
    }
  }

  .annotation {
    opacity: 0.9;
  }

  .annotation__connector {
    fill: none;
    stroke: currentColor;
    stroke-linecap: round;
  }

  .annotation__connector-shadow {
    opacity: 0.18;
    stroke-width: 3.8;
  }

  .annotation__connector-line {
    opacity: 0.56;
    stroke-width: 2.2;
  }

  .annotation__connector-head {
    opacity: 0.52;
    stroke-linejoin: round;
    stroke-width: 2.5;
  }

  .annotation__label {
    font-family: 'Hero Annotation', cursive;
    font-weight: var(--token-reference-typography-weight-normal);
    line-height: 1;
    fill: currentColor;
    letter-spacing: var(--token-reference-typography-letter-spacing-slightly-tight);
    white-space: nowrap;
    text-shadow:
      0 1px 0 var(--token-feature-hero-portrait-annotation-shadow-rest),
      0 0 1.35rem var(--token-feature-hero-portrait-annotation-shadow-glow);
  }

  @include motion.reduced-motion-reset('.hero-portrait');

  @media print {
    .hero-portrait__halo,
    .hero-portrait__annotations {
      display: none;
    }
  }
</style>
