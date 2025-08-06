# Cognitive Color System

A three-color design system engineered for clarity, speed, and accessibility in high-cognition interfaces. Built on research in visual perception and cognitive psychology, not aesthetic trends.

## Design Philosophy

This system uses strategic constraint—limiting the palette to three primary hues (teal, magenta, gold)—to create what cognitive scientists call [selective attention](https://en.wikipedia.org/wiki/Selective_attention). When fewer stimuli compete for user focus, each becomes more effective at capturing and directing attention.

The restraint is intentional: no blues competing with teal, no reds fighting magenta, no yellows diluting gold's urgency signal. This creates cognitive efficiency where fewer, well-calibrated hues reduce decision fatigue and sharpen user perception.

## The Three-Color Strategy

### Why Three Colors?

While no universal law declares three colors optimal, research in visual perception and working memory consistently supports limited, strategic palettes for enhanced user comprehension. Three distinct hues provide:

- **Cognitive simplicity** – Reduces color overload and supports faster processing
- **Functional differentiation** – Sufficient contrast for hierarchy and state signaling  
- **Memorability** – A manageable set for consistent user associations

This constraint serves as a foundation, not a limit. Tints, shades, and neutrals extend the expressive range while preserving the psychological intent of each hue—ensuring clarity without introducing cognitive noise. Complex data visualizations, geographic applications, or specific accessibility needs may require systematic expansion beyond three colors.

### Color Psychology & Function

The triad follows [split-complementary harmony](https://en.wikipedia.org/wiki/Harmony_%28color%29) principles, balancing warm and cool hues for stable yet expressive contrast.

**Teal** (`#1DE9B6`) – Foundation of Trust  
Balances blue's stability with green's growth associations. [Cross-cultural studies](https://eric.ed.gov/?id=EJ706686) link green-blue hues to trustworthiness and clarity. High luminance ensures visibility on dark backgrounds.
- *Usage*: Primary interactions, brand identity, progress indicators

**Magenta** (`#FF3CAC`) – Attention Director  
Warm enough to capture attention, sophisticated enough to avoid stress responses. [Research suggests](https://doi.org/10.3758/s13423-024-02615-z) pink-purple hues encourage engagement and analytical thinking without over-arousal.
- *Usage*: Data visualization, metrics, secondary interactions requiring cognitive processing

**Gold** (`#FFD966`) – Urgency Signal  
High-contrast attention disruptor with cultural associations of importance. To preserve its urgency signal, gold is used sparingly—overuse leads to habituation, dulling its attention-grabbing power.
- *Usage*: Status indicators, notifications, time-sensitive actions

### Color System Overview

| Hue | Hex | Role | Description |
|-----|-----|------|-------------|
| ![Teal](https://placehold.co/15x15/1DE9B6/1DE9B6.png) Teal | `#1DE9B6` | Primary / Brand | Trust, clarity |
| ![Magenta](https://placehold.co/15x15/FF3CAC/FF3CAC.png) Magenta | `#FF3CAC` | Secondary / Analytical | Attention without urgency |
| ![Gold](https://placehold.co/15x15/FFD966/FFD966.png) Gold | `#FFD966` | Status / Urgency | Positive disruption |
| ![Dark BG](https://placehold.co/15x15/0B0F28/0B0F28.png) Dark BG | `#0B0F28` | Background / Focus Field | Reduced strain, contrast anchor |

## Dark Interface Psychology

The deep blue-purple background (`#0B0F28`) leverages the [pop-out effect](https://en.wikipedia.org/wiki/Visual_search) where bright elements gain prominence against dark backgrounds. This isn't pure black—[studies show](https://www.allaboutvision.com/conditions/computer-vision-syndrome/digital-eye-strain/is-dark-mode-better-for-eyes/) that excessive contrast can increase pupil dilation and reduce visual acuity.

**Benefits:**
- Enhanced focus through visual hierarchy
- Reduced eye strain in low-light environments  
- Improved contrast perception for interactive elements

## Technical Implementation

### Three-Tier Token Architecture
```
Primitive → Semantic → Component
#1DE9B6 → --color-brand-primary → button-primary-bg
```

This token structure mirrors how users form associations: from perceiving a raw hue, to learning its function, to applying it within familiar interface contexts. It prevents color proliferation while enabling consistent evolution.

### Systematic Transparency
Rather than arbitrary grays, this system uses white/black overlays at precise opacity levels (2%, 3%, 5%, 6%, 8%, 9%, 12%, 20%). These specific opacities create scalable contrast steps, offering predictable luminance relationships across environments—crucial for accessibility and visual hierarchy.

## Accessibility as Foundation

Accessibility isn't additive—it's foundational. The system achieves:

- **7:1 contrast ratio** for teal-on-dark (exceeding [WCAG 2.2](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum) 4.5:1 minimum)
- **Luminance-based distinctions** supporting color blindness accommodation
- **Multi-modal communication** through color, shape, contrast, and motion

## Research & Limitations

**What it's built on:**
- [Selective attention](https://en.wikipedia.org/wiki/Selective_attention) and visual search
- [Color harmony principles](https://en.wikipedia.org/wiki/Harmony_%28color%29) 
- Cognitive load theory and visual perception

**What's emerging:**
- [Task-evoked pupillary response](https://en.wikipedia.org/wiki/Task-invoked_pupillary_response) 🧪

**Where validation is needed:**
- Cross-cultural color associations
- Individual differences in dark mode preferences
- Long-term cognitive effects of constrained palettes

This system draws from established research while acknowledging that color perception varies across cultures, individuals, and contexts. The psychological associations described reflect general tendencies rather than universal laws.

## Implementation

The system works as invisible infrastructure—supporting user decision-making without creating cognitive noise. When color systems achieve this functional precision, they reduce visual friction and enhance clarity through thoughtful alignment with human perceptual patterns.

This represents design maturity: visual language sophisticated enough for edge cases, accessible enough for diverse needs, and systematic enough for consistent evolution. That's not just good design—it's design that understands its role in the larger ecosystem of [human-computer interaction](https://en.wikipedia.org/wiki/Human%E2%80%93computer_interaction).

