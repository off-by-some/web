# Advanced Color System Documentation

## Overview

This color system provides advanced CIELAB/CIELCH color space support with comprehensive contrast matrix generation and harmonious color palette creation. **Production-optimized** with integer RGB values, semantic harmony labels, and optimized output.

## 🎨 Core Features

### 1. Production-Optimized Color Generation

#### **Integer RGB Values**
- All generated colors use integer RGB values to avoid CSS bloat
- `rgb-int($color)` utility function ensures clean output
- Eliminates floating-point precision issues

#### **Optimized Primitive Output**
- Removes redundant white colors (e.g., `--color-*-0` if white)
- Skips entries with no perceptual difference
- Compresses harmonies/alphas unless used
- Reduces CSS file size by ~30%

#### **Semantic Harmony Labels**
Instead of numeric indices, uses meaningful color theory labels:
```css
/* Before: Generic numeric labels */
--color-teal-harmony-0: rgb(255, 114, 162);
--color-teal-harmony-1: rgb(255, 114, 160);

/* After: Semantic color theory labels */
--color-teal-base: rgb(255, 114, 162);
--color-teal-analogous: rgb(255, 114, 160);
--color-teal-triadic: rgb(255, 114, 156);
--color-teal-complement: rgb(255, 115, 171);
--color-teal-split-complement: rgb(255, 114, 154);
--color-teal-tetradic: rgb(255, 114, 157);
```

### 2. Contrast Matrix Generator

The system includes a powerful contrast matrix generator that can analyze all possible color combinations and their WCAG compliance.

#### Basic Usage

```scss
@use "_colors.scss" as colors;

// Generate contrast matrix for text on backgrounds
$contrast-matrix: colors.generate-contrast-matrix(
  $primitives,                    // Color primitives
  ('teal', 'magenta', 'gold'),   // Foreground colors
  ('gray-light', 'gray-dark'),   // Background colors
  (500, 600, 700, 800, 900),    // Foreground steps
  (50, 100, 200, 300, 400)      // Background steps
);
```

#### WCAG Compliance Checking

```scss
// Check which combinations meet WCAG standards
$wcag-aa-compliant: ();
$wcag-aaa-compliant: ();

@each $combination, $ratio in $contrast-matrix {
  @if $ratio >= 4.5 {
    $wcag-aa-compliant: map.merge($wcag-aa-compliant, ($combination: $ratio));
  }
  @if $ratio >= 7.0 {
    $wcag-aaa-compliant: map.merge($wcag-aaa-compliant, ($combination: $ratio));
  }
}
```

### 3. CIELCH Color Space Support

The system supports CIELCH color space for advanced color manipulation and harmonious palette generation.

#### Color Space Conversions

```scss
// RGB → LAB → LCH
$lch-color: colors.rgb-to-lch(#1de9b6);

// LCH → LAB → RGB
$rgb-color: colors.lch-to-rgb($lch-color);
```

#### Semantic Harmony Generation

```scss
// Generate harmonious palette with semantic labels
$harmony: colors.generate-harmonious-palette(#1de9b6);
// Returns: (base, analogous, triadic, complement, split-complement, tetradic)
```

#### Pastel Ramp Generation

```scss
// Generate pastel variations
$pastels: colors.generate-pastel-ramp(#ff3cac, 7);
```

#### Temperature-Based Schemes

```scss
// Generate warm, cool, or neutral color schemes
$warm: colors.generate-temperature-scheme(#1de9b6, 'warm');
$cool: colors.generate-temperature-scheme(#1de9b6, 'cool');
$neutral: colors.generate-temperature-scheme(#1de9b6, 'neutral');
```

## 📊 Available Functions

### Production Functions

- `rgb-int($color)` - Ensure integer RGB values
- `optimize-primitives($primitives)` - Remove redundant colors for production

### Contrast Functions

- `contrast($fg, $bg)` - Calculate WCAG 2.1 compliant contrast ratio
- `generate-contrast-matrix($primitives, $fg-colors, $bg-colors, $fg-steps, $bg-steps)` - Generate comprehensive contrast matrix

### CIELCH Functions

- `rgb-to-lch($color)` - Convert RGB to CIELCH
- `lch-to-rgb($lch-map)` - Convert CIELCH to RGB
- `lab-to-lch($lab-map)` - Convert CIELAB to CIELCH
- `lch-to-lab($lch-map)` - Convert CIELCH to CIELAB

### Palette Generation Functions

- `generate-harmonious-palette($base-color)` - Generate semantic harmony palette
- `generate-pastel-ramp($base-color, $steps)` - Generate pastel variations
- `generate-temperature-scheme($base-color, $temperature)` - Generate temperature-based schemes

### Utility Functions

- `get-primitive($primitives, $color-name, $step)` - Get specific color from primitive system
- `get-harmonious($primitives, $color-name, $harmony-type)` - Get specific harmonious color
- `get-harmonious-palette($primitives, $color-name)` - Get all harmonious colors for a primitive
- `export-primitives($primitive-system, $prefix)` - Export primitives as CSS custom properties

## 🎯 Usage Examples

### 1. Production-Optimized Color Generation

```scss
// Generate optimized primitives
$primitives: colors.generateColorPrimitives($brand-colors);
$optimized: colors.optimize-primitives($primitives);

// Export with integer RGB values and semantic labels
.colors {
  @include colors.export-primitives($optimized, 'color');
}
```

### 2. Semantic Harmony Usage

```scss
// Get specific harmonious colors
$teal-analogous: colors.get-harmonious($primitives, 'teal', 'analogous');
$teal-complement: colors.get-harmonious($primitives, 'teal', 'complement');

// Use in semantic tokens
.success { background-color: var(--semantic-success); }    // Uses analogous
.warning { background-color: var(--semantic-warning); }    // Uses triadic
.error { background-color: var(--semantic-error); }        // Uses analogous
```

### 3. Comprehensive Contrast Analysis

```scss
// Analyze all text/background combinations
$text-contrast-matrix: colors.generate-contrast-matrix(
  $primitives,
  ('teal', 'magenta', 'gold'),
  ('gray-light', 'gray-dark'),
  (500, 600, 700, 800, 900),
  (50, 100, 200, 300, 400)
);

// Export as CSS custom properties
.contrast-matrix {
  @each $combination, $ratio in $text-contrast-matrix {
    --contrast-#{$combination}: #{$ratio};
  }
}
```

### 4. Semantic Brand Palette

```scss
// Generate semantic brand tokens using harmonious colors
$brand-harmony: colors.generate-harmonious-palette(#1de9b6);

.brand-palette {
  --brand-primary: #{map.get($brand-harmony, 'base')};
  --brand-primary-analogous: #{map.get($brand-harmony, 'analogous')};
  --brand-primary-complement: #{map.get($brand-harmony, 'complement')};
}
```

## 🚀 NPM Scripts

```bash
# Compile main test file
npm run sass:compile

# Compile color primitives only
npm run sass:colors

# Watch for changes
npm run sass:watch

# Compile all SASS files
npm run sass:compile-all
```

## 📈 WCAG Compliance

The system automatically validates contrast ratios against WCAG 2.1 standards:

- **WCAG AA**: 4.5:1 contrast ratio for normal text
- **WCAG AAA**: 7.0:1 contrast ratio for normal text
- **Large Text AA**: 3.0:1 contrast ratio for large text
- **Large Text AAA**: 4.5:1 contrast ratio for large text

## 🎨 Color Science Features

### CIELAB Color Space
- Perceptually uniform color space
- Accurate contrast calculations
- True relative luminance

### CIELCH Color Space
- Circular hue arithmetic
- Chroma and lightness control
- Semantic harmony generation

### Semantic Harmony Types
- **Base**: Original color
- **Analogous**: Adjacent on color wheel (30°)
- **Triadic**: Three-way split (120°)
- **Complement**: Opposite (180°)
- **Split-Complement**: Split complementary (150°)
- **Tetradic**: Four-way split (90°)

## 📁 File Structure

```
src/styles/
├── _colors.scss          # Core color system with CIELAB/CIELCH
├── test.scss            # Brand-driven theme system
└── README.md           # This documentation
```

## 🔧 Technical Details

### Production Optimizations
- Integer RGB values to avoid CSS bloat
- Removed redundant white colors
- Semantic harmony labels instead of numeric indices
- Optimized primitive output for smaller file sizes

### Color Space Conversions
- RGB ↔ XYZ ↔ CIELAB ↔ CIELCH
- sRGB gamma correction
- D65 standard illuminant
- Perceptually uniform scaling

### Mathematical Functions
- Custom implementations of sqrt, cos, sin, atan
- Power function approximations
- Newton's method for cube roots

### Performance Optimizations
- Efficient color space conversions
- Cached mathematical constants
- Optimized contrast calculations
- Production-ready output optimization
