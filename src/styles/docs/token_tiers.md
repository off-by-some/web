# Design Token Tier Best Practices & Decision Framework

## The Three-Tier Token Architecture

Understanding what makes each tier distinct is critical for building a maintainable design system. Each tier serves a specific purpose and has clear boundaries.

## Tier 1: Foundation/Primitive Tokens

### Definition
**Raw, context-free values that have no semantic meaning attached to them.**

### Key Characteristics
- ✅ **Pure Values**: Contains only the actual value (color, size, duration)
- ✅ **No Context**: No indication of where or how they should be used
- ✅ **Immutable**: These values rarely change once established
- ✅ **Scale-Based**: Organized in systematic scales/progressions
- ✅ **Technology Agnostic**: Could work across platforms (web, mobile, etc.)

### Decision Criteria: "Does this token..."
- [ ] Reference a design scale or palette position?
- [ ] Have no semantic meaning about usage?
- [ ] Represent a raw measurement or value?
- [ ] Work across multiple contexts without modification?

### Examples

```css
/* ✅ CORRECT - Foundation Tokens */
--primitive-color-blue-100: hsl(210, 100%, 98%);
--primitive-color-blue-500: hsl(210, 100%, 50%);
--primitive-color-blue-900: hsl(210, 100%, 10%);

--primitive-space-050: 0.125rem;  /* 2px */
--primitive-space-100: 0.25rem;   /* 4px */
--primitive-space-200: 0.5rem;    /* 8px */

--primitive-font-size-100: 0.75rem;   /* 12px */
--primitive-font-size-300: 1rem;      /* 16px */
--primitive-font-size-500: 1.25rem;   /* 20px */

--primitive-duration-100: 150ms;
--primitive-duration-200: 250ms;
--primitive-duration-300: 400ms;

/* ❌ WRONG - These have semantic meaning */
--primitive-color-primary: hsl(210, 100%, 50%);  /* "primary" is semantic */
--primitive-space-button-padding: 0.5rem;        /* "button" is contextual */
--primitive-font-heading: 1.25rem;               /* "heading" is semantic */
```

### Foundation Token Naming Pattern
```
--primitive-{category}-{scale}
--primitive-color-{hue}-{lightness}
--primitive-space-{scale}
--primitive-font-size-{scale}
```

## Tier 2: Semantic/System Tokens

### Definition
**Tokens that assign meaning and context to foundation values, but remain component-agnostic.**

### Key Characteristics
- ✅ **Contextual Meaning**: Describes the role or purpose
- ✅ **Component Agnostic**: Can be used across multiple components
- ✅ **Theme-able**: Can change based on themes (light/dark, brand variants)
- ✅ **References Foundation**: Always points to foundation tokens
- ✅ **Behavioral**: Describes what something does, not what it is

### Decision Criteria: "Does this token..."
- [ ] Describe a role or purpose in the interface?
- [ ] Work across multiple components?
- [ ] Change based on theme or context?
- [ ] Reference a foundation token?
- [ ] Avoid component-specific naming?

### Examples

```css
/* ✅ CORRECT - Semantic Tokens */
--color-brand-primary: var(--primitive-color-blue-500);
--color-text-primary: var(--primitive-color-gray-900);
--color-surface-raised: var(--primitive-color-gray-50);
--color-border-focus: var(--primitive-color-blue-500);

--spacing-section: var(--primitive-space-800);
--spacing-component: var(--primitive-space-400);
--spacing-inline: var(--primitive-space-200);

--typography-body-large: var(--primitive-font-size-400);
--typography-heading-primary: var(--primitive-font-size-700);
--typography-label: var(--primitive-font-size-200);

--motion-quick: var(--primitive-duration-100);
--motion-smooth: var(--primitive-duration-200);

/* ❌ WRONG - Too component-specific */
--color-hero-background: var(--primitive-color-blue-500);     /* Component-specific */
--spacing-button-internal: var(--primitive-space-200);        /* Component-specific */
--typography-hero-title: var(--primitive-font-size-800);      /* Component-specific */

/* ❌ WRONG - Still too primitive */
--color-blue: var(--primitive-color-blue-500);               /* No semantic meaning */
--spacing-medium: var(--primitive-space-400);                /* Size, not purpose */
```

### Semantic Token Categories

#### Color Semantics
```css
/* Brand & Identity */
--color-brand-primary: var(--primitive-color-blue-500);
--color-brand-secondary: var(--primitive-color-purple-500);

/* Interface Roles */
--color-text-primary: var(--primitive-color-gray-900);
--color-text-secondary: var(--primitive-color-gray-600);
--color-surface-primary: var(--primitive-color-white);
--color-surface-raised: var(--primitive-color-gray-50);
--color-border-default: var(--primitive-color-gray-200);

/* Feedback */
--color-feedback-success: var(--primitive-color-green-500);
--color-feedback-warning: var(--primitive-color-yellow-500);
--color-feedback-error: var(--primitive-color-red-500);

/* Interactive States */
--color-interactive-default: var(--primitive-color-blue-500);
--color-interactive-hover: var(--primitive-color-blue-600);
--color-interactive-pressed: var(--primitive-color-blue-700);
```

#### Spacing Semantics
```css
/* Layout Hierarchy */
--spacing-section: var(--primitive-space-800);      /* Between major sections */
--spacing-component: var(--primitive-space-400);    /* Between components */
--spacing-element: var(--primitive-space-200);      /* Between related elements */
--spacing-inline: var(--primitive-space-100);       /* Inline spacing */

/* Contextual Spacing */
--spacing-content-block: var(--primitive-space-600);
--spacing-list-item: var(--primitive-space-300);
--spacing-form-field: var(--primitive-space-400);
```

### Semantic Token Naming Pattern
```
--{category}-{role}-{variant?}
--color-{role}-{variant}
--spacing-{context}
--typography-{role}-{variant}
```

## Tier 3: Component Tokens

### Definition
**Tokens that are specific to individual components and may override or extend semantic tokens.**

### Key Characteristics
- ✅ **Component-Specific**: Only used within one component
- ✅ **Override Capability**: Can override semantic tokens for specific needs
- ✅ **Highly Contextual**: Tied to specific component behavior or appearance
- ✅ **References Semantic**: Usually points to semantic tokens (sometimes foundation)
- ✅ **Variant Support**: Supports component variants and states

### Decision Criteria: "Does this token..."
- [ ] Apply only to one specific component?
- [ ] Override a semantic token for component-specific needs?
- [ ] Support component variants or unique states?
- [ ] Have no use case outside this component?

### Examples

```css
/* ✅ CORRECT - Component Tokens */
--hero-background: var(--color-surface-primary);
--hero-title-color: var(--color-brand-primary);
--hero-spacing-internal: var(--spacing-component);
--hero-card-radius: var(--primitive-radius-200);  /* Specific override */

--button-padding-sm: var(--primitive-space-100) var(--primitive-space-300);
--button-padding-lg: var(--primitive-space-200) var(--primitive-space-500);
--button-primary-background: var(--color-brand-primary);
--button-primary-background-hover: var(--color-brand-primary-hover);

--card-background: var(--color-surface-raised);
--card-border: var(--color-border-default);
--card-shadow: var(--primitive-shadow-200);
--card-spacing: var(--spacing-component);

/* ❌ WRONG - Too generic for component tier */
--hero-blue: var(--primitive-color-blue-500);     /* Should be semantic */
--hero-medium-spacing: var(--primitive-space-400); /* Should be semantic */

/* ❌ WRONG - Hard-coded values */
--hero-background: #1DE9B6;                       /* Should reference other tiers */
--button-padding: 12px 24px;                      /* Should reference foundation */
```

### Component Token Organization

#### By Component
```css
/* Hero Component */
--hero-background: var(--color-surface-primary);
--hero-text-color: var(--color-text-primary);
--hero-spacing: var(--spacing-section);

/* Button Component */
--button-background-primary: var(--color-brand-primary);
--button-text-primary: var(--color-text-inverse);
--button-padding-default: var(--primitive-space-200) var(--primitive-space-400);

/* Card Component */
--card-background: var(--color-surface-raised);
--card-border: var(--color-border-default);
--card-shadow: var(--primitive-shadow-100);
```

### Component Token Naming Pattern
```
--{component}-{property}-{variant?}
--{component}-{element}-{property}-{variant?}
```

## Decision Framework: Which Tier?

### The Token Classification Test

Ask these questions **in order**:

#### 1. Is it a raw value with no context?
- **YES** → Foundation Tier
- **NO** → Continue to #2

#### 2. Does it describe a role that multiple components could use?
- **YES** → Semantic Tier  
- **NO** → Continue to #3

#### 3. Is it specific to one component or component variant?
- **YES** → Component Tier
- **NO** → Reconsider the token's purpose

### Practical Examples

```css
/* Example 1: Button Padding */
--primitive-space-200: 0.5rem;                    /* Foundation: Raw value */
--spacing-component: var(--primitive-space-200);  /* Semantic: Role-based */
--button-padding: var(--spacing-component);       /* Component: Specific usage */

/* Example 2: Primary Color */
--primitive-color-blue-500: hsl(210, 100%, 50%);  /* Foundation: Raw color */
--color-brand-primary: var(--primitive-color-blue-500); /* Semantic: Brand role */
--hero-accent-color: var(--color-brand-primary);  /* Component: Specific usage */

/* Example 3: Typography */
--primitive-font-size-500: 1.25rem;               /* Foundation: Raw size */
--typography-heading-secondary: var(--primitive-font-size-500); /* Semantic: Role */
--card-title-size: var(--typography-heading-secondary); /* Component: Specific */
```

## Common Anti-Patterns to Avoid

### ❌ Mixing Tiers
```css
/* WRONG: Semantic token referencing component token */
--color-text-primary: var(--button-text-color);

/* WRONG: Foundation token with semantic naming */
--primitive-color-primary: hsl(210, 100%, 50%);
```

### ❌ Skipping Tiers
```css
/* WRONG: Component token directly referencing foundation */
--button-background: var(--primitive-color-blue-500);
/* Should be: --button-background: var(--color-brand-primary); */
```

### ❌ Over-Componentization
```css
/* WRONG: Creating component tokens for common patterns */
--hero-text-color: var(--color-text-primary);
--card-text-color: var(--color-text-primary);
--modal-text-color: var(--color-text-primary);
/* Should just use: var(--color-text-primary) directly */
```

## Validation Rules

### Foundation Tier Rules
1. ✅ Must contain only raw values (no `var()` references)
2. ✅ Must use systematic naming (scales, not semantics)
3. ✅ Must not reference other tokens
4. ✅ Should rarely change once established

### Semantic Tier Rules
1. ✅ Must reference foundation tokens (or other semantic tokens)
2. ✅ Must describe role/purpose, not appearance
3. ✅ Must be component-agnostic
4. ✅ Can change based on theme/context

### Component Tier Rules
1. ✅ Must reference semantic tokens (preferred) or foundation tokens
2. ✅ Must be component-specific
3. ✅ Can override semantic defaults
4. ✅ Should support component variants

## Benefits of Proper Tier Separation

### 🎯 **Maintainability**
- Changes cascade appropriately through the system
- Easy to update themes by changing semantic tokens
- Component changes don't affect other components

### 🎯 **Scalability**  
- New components can reuse semantic tokens
- Foundation provides consistent scale
- Easy to add new themes or variants

### 🎯 **Clarity**
- Clear ownership and responsibility for each token
- Obvious where to make changes
- Self-documenting system

### 🎯 **Flexibility**
- Components can override when needed
- Themes can rebrand without touching components
- Platform-specific adaptations possible
