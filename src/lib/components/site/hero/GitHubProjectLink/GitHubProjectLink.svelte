<script lang="ts">
  import { resolve } from '$app/paths';

  type Props = {
    href: string;
    label?: string;
  };

  let { href, label = 'Lorem ipsum dolor sit amet' }: Props = $props();

  const resolvePath = resolve as (path: string) => string;

  const resolvedHref = $derived(href.startsWith('/') ? resolvePath(href) : href);
</script>

<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
<a href={resolvedHref} class="github-link" aria-label={label}>
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
    <path
      d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
    />
  </svg>
  <span class="github-text">{label}</span>
</a>

<style lang="scss">
  @use 'styles/breakpoints' as *;

  .github-link {
    position: absolute;
    top: var(--token-space-fluid-lg);
    right: var(--token-space-fluid-lg);
    z-index: 10;
    display: flex;
    align-items: center;
    gap: 0;
    padding: 7px;
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: var(--token-radius-full);
    color: var(--color-grayscale-50);
    text-decoration: none;
    font-size: var(--token-font-size-sm);
    font-weight: 500;
    overflow: hidden;
    width: 40px;
    height: 40px;
    opacity: 0.85;
    animation: githubNotice 15s ease-in-out infinite;
    transition:
      width 0.4s var(--token-motion-ease-out),
      gap 0.4s var(--token-motion-ease-out),
      padding 0.4s var(--token-motion-ease-out),
      background 0.3s var(--token-motion-ease-out),
      opacity 0.3s var(--token-motion-ease-out),
      transform 0.2s var(--token-motion-ease-out);

    svg {
      flex-shrink: 0;
      width: 24px;
      height: 24px;
      opacity: 0.85;
      transition:
        transform 0.6s var(--token-motion-ease-out),
        opacity 0.3s var(--token-motion-ease-out);
    }

    &:hover {
      width: 310px;
      height: auto;
      gap: var(--token-space-xs);
      background: rgba(255, 255, 255, 0.15);
      border-color: rgba(255, 255, 255, 0.3);
      color: var(--color-grayscale-0);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      opacity: 1;
      animation: none;

      svg {
        transform: rotate(360deg);
        opacity: 1;
      }

      .github-text {
        opacity: 1;
        transition-delay: 0.15s;
      }
    }

    &:active {
      transform: scale(0.98);
    }

    @media (max-width: $breakpoint-sm) {
      top: var(--token-space-fluid-md);
      right: var(--token-space-fluid-md);

      &:hover {
        width: 270px;
      }
    }

    @media (max-width: $breakpoint-sm) and (max-width: 400px) {
      &:hover {
        width: 230px;
        font-size: var(--token-font-size-xs);
      }
    }
  }

  .github-text {
    opacity: 0;
    padding-left: 10px;
    white-space: nowrap;
    transition: opacity 0.3s var(--token-motion-ease-out);
  }

  @keyframes githubNotice {
    0%,
    85% {
      transform: rotate(0deg);
      border-color: rgba(255, 255, 255, 0.2);
      opacity: 0.85;
    }

    86% {
      border-color: var(--token-attention-color);
      box-shadow: 0 0 0 2px var(--token-attention-glow);
      opacity: 1;
    }

    87% {
      transform: rotate(-8deg);
    }

    88% {
      transform: rotate(8deg);
    }

    89% {
      transform: rotate(-8deg);
    }

    90% {
      transform: rotate(8deg);
    }

    91% {
      transform: rotate(-6deg);
    }

    92% {
      transform: rotate(6deg);
    }

    93% {
      transform: rotate(-4deg);
    }

    94% {
      transform: rotate(4deg);
    }

    95% {
      transform: rotate(0deg);
      border-color: var(--token-attention-color);
      box-shadow: 0 0 0 2px var(--token-attention-glow);
    }

    96% {
      border-color: rgba(255, 255, 255, 0.2);
      box-shadow: none;
    }

    100% {
      transform: rotate(0deg);
      border-color: rgba(255, 255, 255, 0.2);
      opacity: 0.85;
    }
  }
</style>
