<script lang="ts">
  import Image from '$lib/components/primitives/media/Image';
  import ToneDot from '$lib/components/primitives/status/ToneDot';
  import StatusPill from '$lib/components/site/status/StatusPill';

  type Props = {
    name: string;
    role: string;
    statusText: string;
    avatarSrc: string;
    avatarAlt: string;
    titleId?: string;
    onclick?: (event: MouseEvent) => void;
  };

  let {
    name,
    role,
    statusText,
    avatarSrc,
    avatarAlt,
    titleId = 'profile-name',
    onclick,
  }: Props = $props();
</script>

<div class="profile-section">
  <button class="avatar" {onclick} aria-label="View profile details for {name}" type="button">
    <div class="avatar__frame">
      <Image
        src={avatarSrc}
        alt={avatarAlt}
        className="avatar__image"
        sizes="(max-width: 768px) 112px, (max-width: 1376px) 130px, 240px"
        width={240}
        height={240}
        priority
      />
      <div class="avatar__glow" aria-hidden="true"></div>
    </div>
    <div class="avatar__rings" aria-hidden="true">
      <div class="ring ring--1"></div>
      <div class="ring ring--2"></div>
      <div class="ring ring--3"></div>
    </div>
    <ToneDot tone="available" pulse className="avatar__status-dot" />

    <span class="avatar__tooltip">
      <StatusPill text={statusText} className="avatar__tooltip-pill" />
    </span>
  </button>

  <div class="profile-content">
    <div class="profile-header">
      <h1 class="profile-name" id={titleId}>{name}</h1>
      <div class="profile-accent" aria-hidden="true"></div>
    </div>

    <p class="profile-role">{role}</p>

    <!-- Mobile layouts do not expose hover-only information, so the status is
         rendered as regular content below the role at that breakpoint. -->
    <div class="profile-availability">
      <StatusPill text={statusText} className="profile-availability__pill" entrance delay="1s" />
    </div>
  </div>
</div>

<style lang="scss">
  @use 'styles/breakpoints' as *;

  .profile-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--token-space-fluid-lg);
    text-align: center;
    animation: fadeInUp 1s var(--token-motion-ease-out) 0.3s both;

    @media (min-width: $breakpoint-md) {
      align-items: flex-start;
      text-align: left;
      gap: var(--token-space-fluid-lg);
    }

    @media (min-width: $breakpoint-lg) {
      align-items: flex-start;
      text-align: left;
    }
  }

  .avatar {
    position: relative;
    width: var(--token-size-avatar-sm);
    height: var(--token-size-avatar-sm);
    padding: var(--token-space-fluid-xs);
    flex-shrink: 0;
    cursor: pointer;
    transition: transform 0.4s var(--token-motion-ease-out);
    background: none;
    border: none;

    @media (min-width: $breakpoint-lg) {
      width: var(--token-size-avatar-lg);
      height: var(--token-size-avatar-lg);
    }

    &:focus {
      outline: 2px solid var(--token-interactive-color);
      outline-offset: 4px;
      border-radius: var(--token-radius-full);
    }

    &:hover {
      transform: scale(1.05);

      .avatar__glow {
        opacity: 0.6;
        filter: blur(var(--token-blur-md));
      }

      .ring {
        opacity: 0.8;
      }
    }
  }

  .avatar__frame {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: var(--token-radius-full);
    background: var(--token-gradients-hero);
    padding: 3px;
    overflow: hidden;
    transition: all 0.4s var(--token-motion-ease-out);

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: var(--token-gradients-frame);
      border-radius: inherit;
      opacity: 0;
      animation: frameRotate 8s linear infinite;
      transition: opacity 0.4s var(--token-motion-ease-out);
    }

    .avatar:hover & {
      &::before {
        opacity: 0.6;
      }
    }
  }

  :global(.avatar__image) {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: var(--token-radius-full);
    object-fit: cover;
    object-position: center center;
    border: var(--token-border-default-small);
    z-index: 1;
    transition: filter 0.4s var(--token-motion-ease-out);
  }

  .avatar:hover :global(.avatar__image) {
    filter: brightness(1.1) contrast(1.1);
  }

  .avatar__glow {
    position: absolute;
    inset: calc(-1 * var(--token-space-fluid-sm));
    background: var(--token-gradients-hero);
    border-radius: var(--token-radius-full);
    filter: blur(var(--token-blur-sm));
    opacity: 0.2;
    z-index: -1;
    animation: avatarPulse 6s ease-in-out infinite alternate;
    transition: all 0.4s var(--token-motion-ease-out);
  }

  .avatar__rings {
    position: absolute;
    inset: calc(-1 * var(--token-space-fluid-sm));
    pointer-events: none;

    @media (max-width: calc($breakpoint-lg - 1px)) {
      display: none;
    }
  }

  .ring {
    position: absolute;
    border: var(--token-border-hover-small);
    border-radius: var(--token-radius-full);
    opacity: 0.15;
    transition: opacity 0.4s var(--token-motion-ease-out);

    &--1 {
      inset: 0;
      animation: ringRotate1 30s linear infinite;
      border-style: solid;
    }

    &--2 {
      inset: var(--token-space-fluid-xs);
      border-style: dashed;
      animation: ringRotate2 45s linear infinite reverse;
    }

    &--3 {
      inset: var(--token-space-fluid-sm);
      border-style: dotted;
      animation: ringRotate3 60s linear infinite;
    }
  }

  .profile-content {
    flex: 1;
    min-width: 0;
  }

  .profile-header {
    position: relative;
    margin-bottom: var(--token-space-fluid-xs);
  }

  .profile-name {
    font-size: var(--token-font-size-4xl);
    font-weight: var(--token-font-weight-bold);
    line-height: var(--token-line-height-tight);
    margin-bottom: var(--token-space-fluid-xs);
    color: var(--token-text-heading);
    letter-spacing: var(--token-letter-spacing-tight);
    background: var(--token-gradients-heading);
    background-size: 200% 200%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: textShimmer 8s ease-in-out infinite;

    @media (min-width: $breakpoint-md) {
      line-height: var(--token-line-height-snug);
    }

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-font-size-5xl);
    }

    @media (min-width: $breakpoint-xlg) {
      font-size: var(--token-font-size-6xl);
    }
  }

  .profile-accent {
    width: 0;
    height: 3px;
    background: var(--token-emphasis-color);
    border-radius: var(--token-radius-full);
    animation: accentExpand 1.8s var(--token-motion-ease-out) 0.8s both;
    margin: 0 auto;

    @media (min-width: $breakpoint-md) {
      margin: 0;
    }
  }

  .profile-role {
    font-size: var(--token-font-size-lg);
    font-weight: var(--token-font-weight-medium);
    color: var(--token-text-secondary);
    letter-spacing: var(--token-letter-spacing-normal);
    line-height: 1.08;
    opacity: 0;
    animation: fadeInUp 0.6s var(--token-motion-ease-out) 0.9s both;
    margin-bottom: 0;

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-xl);
    }

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-font-size-2xl);
      font-weight: var(--token-font-weight-normal);
    }
  }

  .profile-availability {
    display: none;
    margin-top: var(--token-space-fluid-sm);

    @media (max-width: calc($breakpoint-md - 1px)) {
      display: inline-flex;
      justify-content: center;
    }
  }

  :global(.avatar__status-dot) {
    position: absolute;
    bottom: 6%;
    right: 6%;
    transform: translate(15%, 15%);
    z-index: 2;
    --tone-dot-size: clamp(0.85rem, 0.7rem + 1vw, 1.25rem);
    --tone-dot-border: 3px solid var(--token-background-color);
  }

  :global(.avatar__tooltip) {
    display: none;
    position: absolute;
    bottom: 8%;
    left: 100%;
    margin-left: var(--token-space-fluid-md);
    z-index: 5;

    @media (min-width: $breakpoint-md) and (hover: hover) and (pointer: fine) {
      display: block;
      opacity: 0;
      transform: translate(-6px, 0) scale(0.95);
      transform-origin: left center;
      pointer-events: none;
      transition:
        opacity 0.25s var(--token-motion-ease-out),
        transform 0.25s var(--token-motion-ease-out);
    }
  }

  .avatar:hover :global(.avatar__tooltip),
  .avatar:focus-visible :global(.avatar__tooltip) {
    @media (min-width: $breakpoint-md) and (hover: hover) and (pointer: fine) {
      opacity: 1;
      transform: translate(0, 0) scale(1);
    }
  }

  :global(.avatar__tooltip-pill) {
    cursor: default;
    white-space: nowrap;
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

  @keyframes frameRotate {
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes avatarPulse {
    from {
      opacity: 0.2;
      transform: scale(1);
    }

    to {
      opacity: 0.4;
      transform: scale(1.02);
    }
  }

  @keyframes ringRotate1 {
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes ringRotate2 {
    to {
      transform: rotate(-360deg);
    }
  }

  @keyframes ringRotate3 {
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes textShimmer {
    0%,
    100% {
      background-position: 0% 50%;
    }

    50% {
      background-position: 100% 50%;
    }
  }

  @keyframes accentExpand {
    to {
      width: clamp(3rem, 3rem + 2vw, 6rem);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .profile-section,
    .profile-name,
    .profile-role {
      animation: none;
      opacity: 1;
      transform: none;
    }

    .profile-accent {
      width: clamp(3rem, 3rem + 2vw, 6rem);
    }

    .avatar__rings {
      display: none;
    }

    :global(.avatar__tooltip) {
      transition: none;
    }

    .avatar:hover {
      transform: none;
    }
  }

  @media (prefers-contrast: high) {
    .profile-name {
      text-shadow: none;
      font-weight: var(--token-font-weight-bold);
      color: var(--token-text-primary);
      -webkit-text-fill-color: var(--token-text-primary);
    }
  }

  @media print {
    .avatar__glow,
    .avatar__rings {
      display: none;
    }

    .profile-name {
      color: black;
      -webkit-text-fill-color: black;
    }
  }
</style>
