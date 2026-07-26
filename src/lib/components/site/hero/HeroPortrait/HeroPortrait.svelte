<script lang="ts">
  import Image from '$lib/components/primitives/media/Image';

  type Annotation = { label: string };

  type Props = {
    avatarSrc: string;
    avatarAlt: string;
    annotations?: Annotation[];
  };

  let { avatarSrc, avatarAlt, annotations = [] }: Props = $props();

  const connectors = [
    {
      path: 'M 210,22 C 166,21 126,32 88,54 C 60,70 35,82 8,86',
      arrow: 'M 27,75 8,86 29,94',
    },
    {
      path: 'M 210,64 C 166,60 126,63 88,72 C 58,79 34,79 8,72',
      arrow: 'M 28,63 8,72 27,83',
    },
    {
      path: 'M 210,106 C 166,108 126,96 88,74 C 60,58 34,48 8,45',
      arrow: 'M 29,37 8,45 26,58',
    },
  ];
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
          <li class="annotation">
            <svg
              class="annotation__connector"
              viewBox="0 0 220 128"
              width="132"
              height="76"
              aria-hidden="true"
            >
              <path
                d={connectors[index % connectors.length].path}
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
              <path
                d={connectors[index % connectors.length].arrow}
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span class="annotation__label">{annotation.label}</span>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</div>

<style lang="scss">
  @use 'styles/breakpoints' as *;

  .hero-portrait {
    display: flex;
    justify-content: center;
    width: 100%;
    animation: fadeInUp 1s var(--token-motion-ease-out) 0.3s both;
  }

  .hero-portrait__composition {
    --portrait-w: min(100%, clamp(19rem, 84vw, 34rem));

    position: relative;
    isolation: isolate;
    width: var(--portrait-w);
    max-width: 100%;
    min-height: calc(var(--portrait-w) * 1.18);
    overflow: visible;

    @media (min-width: $breakpoint-md) {
      --portrait-w: min(100%, clamp(29rem, 60vw, 42rem));
    }

    @media (min-width: $breakpoint-lg) {
      --portrait-w: min(100%, clamp(48rem, 47vw, 66rem));
      min-height: calc(var(--portrait-w) * 1.08);
    }

    @media (min-width: $breakpoint-xlg) {
      --portrait-w: min(100%, clamp(52rem, 43vw, 72rem));
    }
  }

  .hero-portrait__stage {
    position: relative;
    width: min(100%, calc(var(--portrait-w) * 0.9));
    aspect-ratio: 645 / 819;
    margin-inline: auto;
    isolation: isolate;

    @media (min-width: $breakpoint-lg) {
      width: calc(var(--portrait-w) * 0.84);
      margin-inline: -1.75rem auto;
      transform: translateY(1.35rem);
    }
  }

  .hero-portrait__halo {
    position: absolute;
    z-index: 0;
    width: 90%;
    aspect-ratio: 1;
    left: 50%;
    top: 8%;
    transform: translateX(-39%);
    border-radius: var(--token-radius-full);
    background: conic-gradient(
      from 310deg,
      var(--token-interactive-color) 0deg,
      #60a5fa 70deg,
      #8b5cf6 170deg,
      var(--token-emphasis-color) 255deg,
      var(--token-interactive-color) 360deg
    );
    box-shadow:
      0 0 2.75rem rgb(29 233 182 / 0.22),
      0 0 4.75rem rgb(139 92 246 / 0.2);
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
      left: -6%;
      right: -6%;
      bottom: -1%;
      height: 15%;
      pointer-events: none;
      background: linear-gradient(
        to bottom,
        rgb(13 20 39 / 0) 0%,
        rgb(13 20 39 / 0.26) 40%,
        rgb(13 20 39 / 0.7) 76%,
        rgb(13 20 39 / 0.95) 100%
      );
      filter: blur(0.9rem);
    }
  }

  :global(.hero-portrait__cutout) {
    position: absolute;
    z-index: 1;
    inset: 0;
    width: 100%;
    height: 100%;
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
    left: var(--annotation-x);
    top: var(--annotation-y);
    display: grid;
    grid-template-columns: 8.25rem max-content;
    align-items: center;
    gap: var(--token-space-fluid-xs);
    color: var(--token-text-secondary);
    opacity: 0.9;

    &:nth-child(2) {
      --annotation-x: 61.5%;
      --annotation-y: 38.5%;
    }

    &:nth-child(3) {
      --annotation-x: 59.5%;
      --annotation-y: 62%;
    }
  }

  .annotation__connector {
    flex-shrink: 0;
    color: currentColor;
    opacity: 0.58;
    transform: translateY(0.1rem);

    path {
      stroke-width: 1.45;
    }
  }

  .annotation__label {
    font-family: 'Bradley Hand', 'Segoe Print', 'Marker Felt', 'Comic Sans MS', cursive;
    font-style: italic;
    font-size: clamp(var(--token-font-size-lg), 0.65rem + 0.65vw, var(--token-font-size-2xl));
    font-weight: var(--token-font-weight-normal);
    line-height: 1;
    color: currentColor;
    letter-spacing: var(--token-letter-spacing-normal);
    white-space: nowrap;
    text-shadow:
      0 1px 0 rgb(5 7 24 / 0.35),
      0 0 1.35rem rgb(5 7 24 / 0.8);

    transform: rotate(-1deg);
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(1.5rem);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .hero-portrait {
      animation: none;
      opacity: 1;
      transform: none;
    }
  }

  @media print {
    .hero-portrait__halo,
    .hero-portrait__annotations {
      display: none;
    }
  }
</style>
