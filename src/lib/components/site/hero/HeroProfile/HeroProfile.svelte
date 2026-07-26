<script lang="ts">
  type Props = {
    greeting?: string;
    name: string;
    role: string;
    titleId?: string;
  };

  let { greeting, name, role, titleId = 'profile-name' }: Props = $props();
</script>

<div class="profile-section">
  {#if greeting}
    <p class="profile-greeting" aria-hidden="true">
      <span class="profile-greeting__wave">👋</span>
      {greeting}
    </p>
  {/if}

  <h1 class="profile-name" id={titleId}>{name}</h1>
  <p class="profile-role">{role}</p>
  <div class="profile-accent" aria-hidden="true"></div>
</div>

<style lang="scss">
  @use 'styles/breakpoints' as *;

  .profile-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    animation: fadeInUp 1s var(--token-motion-ease-out) 0.3s both;

    @media (min-width: $breakpoint-lg) {
      align-items: flex-start;
      text-align: left;
    }
  }

  .profile-greeting {
    display: inline-flex;
    align-items: center;
    gap: var(--token-space-fluid-xs);
    font-size: var(--token-font-size-sm);
    font-weight: var(--token-font-weight-semibold);
    text-transform: uppercase;
    letter-spacing: var(--token-letter-spacing-widest);
    color: var(--token-text-tertiary);
    margin-bottom: clamp(0.85rem, 2vh, 1.35rem);
    opacity: 0;
    animation: fadeInUp 0.6s var(--token-motion-ease-out) 0.15s both;
  }

  .profile-greeting__wave {
    font-size: var(--token-font-size-lg);
    line-height: 1;
    animation: wave 2.5s ease-in-out 1.2s infinite;
    transform-origin: 70% 70%;
  }

  .profile-name {
    display: block;
    font-size: clamp(3.6rem, 16vw, 6.25rem);
    font-weight: var(--token-font-weight-bold);
    line-height: 1;
    margin-bottom: clamp(0.9rem, 1.8vh, 1.45rem);
    padding-bottom: 0.08em;
    color: var(--token-text-heading);
    letter-spacing: var(--token-letter-spacing-tight);
    background: var(--token-gradients-heading);
    background-size: 200% 200%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: textShimmer 8s ease-in-out infinite;

    @media (min-width: $breakpoint-md) {
      font-size: clamp(5.25rem, 9vw, 8rem);
      line-height: 0.98;
      padding-bottom: 0.07em;
    }

    @media (min-width: $breakpoint-lg) {
      font-size: clamp(5rem, 5.15vw, 7.2rem);
      line-height: 0.96;
      padding-bottom: 0.055em;
      white-space: nowrap;
    }

    @media (min-width: $breakpoint-xlg) {
      font-size: clamp(7rem, 4.9vw, 9.25rem);
    }
  }

  .profile-role {
    font-size: clamp(var(--token-font-size-lg), 4vw, var(--token-font-size-xl));
    font-weight: var(--token-font-weight-medium);
    color: var(--token-text-secondary);
    letter-spacing: var(--token-letter-spacing-normal);
    line-height: var(--token-line-height-snug);
    opacity: 0;
    animation: fadeInUp 0.6s var(--token-motion-ease-out) 0.9s both;
    margin-bottom: 0;

    @media (min-width: $breakpoint-md) {
      font-size: clamp(var(--token-font-size-xl), 3vw, var(--token-font-size-2xl));
    }

    @media (min-width: $breakpoint-lg) {
      font-size: clamp(var(--token-font-size-2xl), 1.75vw, var(--token-font-size-3xl));
      font-weight: var(--token-font-weight-normal);
    }
  }

  .profile-accent {
    width: clamp(2.35rem, 1.9rem + 1.6vw, 3.35rem);
    height: 3px;
    background: var(--token-emphasis-color);
    border-radius: var(--token-radius-full);
    margin: var(--token-space-fluid-md) auto 0;
    transform-origin: left center;
    animation: accentExpand 1.8s var(--token-motion-ease-out) 0.8s both;

    @media (min-width: $breakpoint-lg) {
      margin: var(--token-space-fluid-md) 0 0;
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

  @keyframes wave {
    0%,
    100% {
      transform: rotate(0deg);
    }

    10%,
    30% {
      transform: rotate(14deg);
    }

    20% {
      transform: rotate(-8deg);
    }

    40% {
      transform: rotate(14deg);
    }

    50% {
      transform: rotate(0deg);
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
    from {
      transform: scaleX(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .profile-section,
    .profile-name,
    .profile-role,
    .profile-greeting,
    .profile-accent {
      animation: none;
      opacity: 1;
      transform: none;
    }

    .profile-greeting__wave {
      animation: none;
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
    .profile-name {
      color: black;
      -webkit-text-fill-color: black;
    }
  }
</style>
