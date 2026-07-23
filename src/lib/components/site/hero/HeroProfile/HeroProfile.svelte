<script lang="ts">
  import Image from '$lib/components/primitives/media/Image';
  import AvailabilityStatus from '$lib/components/site/status/AvailabilityStatus';

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
        sizes="(max-width: 768px) 120px, (max-width: 1376px) 150px, 180px"
        loading="lazy"
      />
      <div class="avatar__glow" aria-hidden="true"></div>
    </div>
    <div class="avatar__rings" aria-hidden="true">
      <div class="ring ring--1"></div>
      <div class="ring ring--2"></div>
      <div class="ring ring--3"></div>
    </div>
  </button>

  <div class="profile-content">
    <div class="profile-header">
      <h1 class="profile-name" id={titleId}>{name}</h1>
      <div class="profile-accent" aria-hidden="true"></div>
    </div>

    <p class="profile-role">{role}</p>

    <AvailabilityStatus text={statusText} entrance delay="1.4s" />
  </div>
</div>

<style lang="scss">
  @use 'styles/breakpoints' as *;

  .profile-section {
    grid-area: profile;
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
    margin-bottom: var(--token-space-fluid-sm);
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
    letter-spacing: var(--token-letter-spacing-wide);
    line-height: var(--token-line-height-relaxed);
    opacity: 0;
    animation: fadeInUp 0.6s var(--token-motion-ease-out) 1s both;
    margin-bottom: var(--token-space-fluid-2xl);

    @media (min-width: $breakpoint-md) {
      font-size: var(--token-font-size-xl);
    }

    @media (min-width: $breakpoint-lg) {
      font-size: var(--token-font-size-2xl);
      font-weight: var(--token-font-weight-normal);
      letter-spacing: var(--token-letter-spacing-normal);
    }
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
