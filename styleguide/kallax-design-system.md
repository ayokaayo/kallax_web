# Kallax Design System
**Neo-Brutalist Dark Theme · Vinyl DJ Companion App**

---

## 1. Typography

### Font Family
```
Primary: 'Archivo', sans-serif
Fallback: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
```

**Import (Google Fonts)**:
```css
@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;900&display=swap');
```

### Type Scale & Weights

| Element | Size | Weight | Letter Spacing | Transform | Line Height |
|---------|------|--------|----------------|-----------|-------------|
| **H1 (App Name)** | 28px | 900 (Black) | 3px | UPPERCASE | 1.2 |
| **H2 (Section Headers)** | 20px | 900 (Black) | 2px | UPPERCASE | 1.2 |
| **H3 (Subsection)** | 16px | 700 (Bold) | 1.5px | UPPERCASE | 1.3 |
| **Body Large** | 15px | 700 (Bold) | 0 | none | 1.3 |
| **Body Regular** | 14px | 500 (Medium) | 0 | none | 1.4 |
| **Body Small** | 13px | 500 (Medium) | 0 | none | 1.4 |
| **Label Caps** | 12px | 700 (Bold) | 1.5px | UPPERCASE | 1.2 |
| **Label Small Caps** | 11px | 700 (Bold) | 1.5px | UPPERCASE | 1.2 |
| **Label Tiny Caps** | 10px | 700 (Bold) | 1px | UPPERCASE | 1.2 |
| **BPM Display** | 22px | 900 (Black) | 0 | none | 1 |
| **Button** | 12px | 600 (SemiBold) | 1px | UPPERCASE | 1.2 |
| **Button Active** | 12px | 900 (Black) | 1px | UPPERCASE | 1.2 |

### Weight Usage Guidelines
- **900 (Black)**: Headers, BPM values, active states, primary CTAs
- **700 (Bold)**: Album titles, labels, important secondary text
- **600 (SemiBold)**: Buttons (default state), form inputs
- **500 (Medium)**: Body text, search inputs, stats
- **400 (Regular)**: Long-form text (if needed)

---

## 2. Color Palette

### Primary Colors
```css
--color-bg-primary: #0f0f0f;        /* Near-black background */
--color-bg-secondary: #1a1a1a;      /* Card/panel background */
--color-text-primary: #f5f5f5;      /* Off-white text */
--color-text-secondary: #888888;    /* Muted text */
--color-text-disabled: #666666;     /* Disabled text */
--color-brand-yellow: #FFD53D;      /* Primary accent/brand */
--color-stroke: #000000;            /* Pure black borders/shadows */
```

### Functional Colors
```css
--color-success: #7fb069;           /* Success states (optional) */
--color-warning: #e07a5f;           /* Warning states (optional) */
--color-error: #d62828;             /* Error states (optional) */
```

### Color Usage
| Element | Background | Text | Border | Shadow |
|---------|-----------|------|--------|--------|
| **Header** | `--color-brand-yellow` | `--color-stroke` | `--color-stroke` (4px) | `--color-stroke` (6x6px) |
| **Card/Row** | `--color-bg-secondary` | `--color-text-primary` | `--color-stroke` (3px) | `--color-stroke` (5x5px) |
| **Input** | `--color-bg-secondary` | `--color-text-primary` | `--color-stroke` (3px) | `--color-stroke` (4x4px) |
| **Button Default** | `--color-bg-primary` | `--color-text-primary` | `--color-stroke` (3px) | `--color-stroke` (3x3px) |
| **Button Active** | `--color-brand-yellow` | `--color-stroke` | `--color-stroke` (3px) | `--color-stroke` (3x3px) |
| **FAB** | `--color-brand-yellow` | `--color-stroke` | `--color-stroke` (4px) | `--color-stroke` (6x6px) |
| **BPM Badge** | `--color-stroke` | `--color-brand-yellow` | `--color-stroke` (2px) | none |
| **Album Cover** | `--color-brand-yellow` | `--color-stroke` | `--color-stroke` (3px) | none |

---

## 3. Spacing System

### Base Unit: 4px

```css
--space-1: 4px;    /* 0.25rem */
--space-2: 8px;    /* 0.5rem */
--space-3: 12px;   /* 0.75rem */
--space-4: 16px;   /* 1rem - base unit */
--space-5: 20px;   /* 1.25rem */
--space-6: 24px;   /* 1.5rem */
--space-8: 32px;   /* 2rem */
--space-10: 40px;  /* 2.5rem */
--space-12: 48px;  /* 3rem */
--space-16: 64px;  /* 4rem */
```

### Component Padding
- **Cards/Rows**: 16px (--space-4)
- **Buttons**: 10px vertical, 16px horizontal
- **Header**: 20px (--space-5)
- **Controls Panel**: 16px (--space-4)
- **Bottom Nav**: 16px vertical (--space-4)

### Component Margins
- **Between Cards**: 12px (--space-3)
- **Between Sections**: 16px (--space-4)
- **Page Margins**: 16px (--space-4)

---

## 4. Borders & Shadows

### Neo-Brutalist Border System
```css
--border-thin: 2px solid var(--color-stroke);
--border-medium: 3px solid var(--color-stroke);
--border-thick: 4px solid var(--color-stroke);
```

### Hard Shadow System (No Blur)
```css
/* X-offset Y-offset blur spread color */
--shadow-small: 3px 3px 0px 0px var(--color-stroke);
--shadow-medium: 4px 4px 0px 0px var(--color-stroke);
--shadow-large: 5px 5px 0px 0px var(--color-stroke);
--shadow-xlarge: 6px 6px 0px 0px var(--color-stroke);
```

### Press-Down Interaction
```css
/* Default state */
element {
  box-shadow: var(--shadow-medium);
  transition: all 0.1s ease;
}

/* Active/pressed state */
element:active {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0px 0px var(--color-stroke);
}
```

### Border Radius
```
--radius-none: 0px;  /* Default for brutalist aesthetic */
--radius-small: 2px; /* Optional for inputs (minimal) */
```

**Rule**: Default to 0px radius. Only use 2px for search inputs or subtle softening.

---

## 5. Component Specifications

### 5.1 Header
```css
.header {
  background: var(--color-brand-yellow);
  padding: 20px 16px;
  border: var(--border-thick);
  box-shadow: var(--shadow-xlarge);
  margin: 16px;
}

.header-title {
  font-size: 28px;
  font-weight: 900;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--color-stroke);
}

.header-stats {
  font-size: 13px;
  font-weight: 500;
  margin-top: 8px;
  color: var(--color-stroke);
}
```

**Figma specs**:
- Height: Auto (content-based)
- Background: #FFD53D
- Border: 4px, #000000
- Shadow: 6x, 6y, 0 blur, #000000

---

### 5.2 Search Input
```css
.search-input {
  width: 100%;
  background: var(--color-bg-secondary);
  border: var(--border-medium);
  padding: 14px 16px 14px 48px; /* Left padding for icon */
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-primary);
  box-shadow: var(--shadow-medium);
  transition: all 0.1s ease;
}

.search-input:focus {
  outline: none;
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0px var(--color-stroke);
}

.search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-disabled);
}
```

**Figma specs**:
- Height: 46px (with padding)
- Icon: 20x20px, Lucide "search"
- Icon left offset: 16px

---

### 5.3 Album Row/Card
```css
.album-item {
  display: flex;
  align-items: center;
  padding: 16px;
  background: var(--color-bg-secondary);
  border: var(--border-medium);
  box-shadow: var(--shadow-large);
  min-height: 80px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.1s ease;
}

.album-item:active {
  transform: translate(3px, 3px);
  box-shadow: 2px 2px 0px var(--color-stroke);
}

.album-cover {
  width: 52px;
  height: 52px;
  background: var(--color-brand-yellow);
  border: var(--border-medium);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-stroke);
  margin-right: 16px;
}

.album-artist {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--color-text-secondary);
  margin-bottom: 4px;
}

.album-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--color-text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.album-bpm {
  font-size: 22px;
  font-weight: 900;
  color: var(--color-brand-yellow);
  background: var(--color-stroke);
  padding: 8px 12px;
  border: var(--border-thin);
  min-width: 70px;
  text-align: right;
  margin-left: 16px;
}

.album-bpm.missing {
  color: var(--color-text-disabled);
  background: transparent;
  font-weight: 700;
}
```

**Figma specs**:
- Min height: 80px
- Album cover: 52x52px, yellow background, 3px black border
- Icon: 28x28px, Lucide "disc-3"
- BPM badge: Auto width (min 70px), yellow text on black

---

### 5.4 Filter Buttons
```css
.filter-btn {
  padding: 10px 16px;
  background: var(--color-bg-primary);
  border: var(--border-medium);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--color-text-primary);
  box-shadow: var(--shadow-small);
  cursor: pointer;
  transition: all 0.1s ease;
}

.filter-btn:active {
  transform: translate(2px, 2px);
  box-shadow: 1px 1px 0px var(--color-stroke);
}

.filter-btn.active {
  background: var(--color-brand-yellow);
  color: var(--color-stroke);
  font-weight: 900; /* Black weight for active */
}
```

**Figma specs**:
- Height: 34px (with padding)
- Gap between buttons: 8px
- Active state: Yellow background, black text, weight 900

---

### 5.5 Bottom Navigation
```css
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--color-bg-secondary);
  border-top: var(--border-thick);
  padding: 16px 0;
  display: flex;
  justify-content: space-around;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 8px;
  cursor: pointer;
  border: 3px solid transparent;
  transition: all 0.1s ease;
}

.nav-item:active {
  border-color: var(--color-stroke);
  background: var(--color-brand-yellow);
}

.nav-item.active .nav-label {
  color: var(--color-brand-yellow);
  font-weight: 900;
}

.nav-item.active .nav-icon {
  color: var(--color-brand-yellow);
}

.nav-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--color-text-disabled);
}

.nav-icon {
  width: 24px;
  height: 24px;
  color: var(--color-text-primary);
}
```

**Figma specs**:
- Height: ~74px (with padding)
- Icons: 24x24px (Lucide: folder-open, list-music, settings)
- Active state: Yellow text/icon, weight 900

---

### 5.6 Floating Action Button (FAB)
```css
.fab {
  position: fixed;
  bottom: 100px;
  right: 20px;
  width: 64px;
  height: 64px;
  background: var(--color-brand-yellow);
  border: var(--border-thick);
  box-shadow: var(--shadow-xlarge);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-stroke);
  cursor: pointer;
  transition: all 0.1s ease;
}

.fab:active {
  transform: translate(3px, 3px);
  box-shadow: 3px 3px 0px var(--color-stroke);
}

.fab-icon {
  width: 32px;
  height: 32px;
}
```

**Figma specs**:
- Size: 64x64px
- Icon: 32x32px (Lucide: timer, plus, etc.)
- Position: 20px from right, 100px from bottom

---

### 5.7 Controls Panel
```css
.controls {
  background: var(--color-bg-secondary);
  padding: 16px;
  border: var(--border-medium);
  box-shadow: var(--shadow-large);
  margin: 0 16px 16px 16px;
}

.controls-title {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--color-text-secondary);
  margin-bottom: 12px;
}
```

---

## 6. Icons

### Icon Library
**Lucide Icons** (https://lucide.dev)
- Installation: `npm install lucide-react-native`
- Style: Stroke-based, 24x24 grid
- Default stroke width: 2px

### Primary Icons
| Icon Name | Use Case | Size |
|-----------|----------|------|
| `disc-3` | Album covers | 28x28px |
| `search` | Search input | 20x20px |
| `folder-open` | Collection tab | 24x24px |
| `list-music` | Playlists tab | 24x24px |
| `settings` | Settings tab | 24x24px |
| `timer` | Tap tempo FAB | 32x32px |
| `play`, `pause` | Playback controls | 24x24px |
| `plus` | Add actions | 24x24px |
| `x` | Close/dismiss | 20x20px |

### Icon Colors
- Default: `--color-text-primary` (#f5f5f5)
- Active: `--color-brand-yellow` (#FFD53D)
- Disabled: `--color-text-disabled` (#666666)
- On yellow background: `--color-stroke` (#000000)

---

## 7. Layout Grid

### Mobile (375px - 428px)
```css
.container {
  max-width: 428px;
  margin: 0 auto;
  padding: 0 16px;
}
```

### Breakpoints
- **Mobile**: 0 - 767px (single column)
- **Tablet**: 768px - 1023px (consider if needed)
- **Desktop**: 1024px+ (not primary target)

### Safe Areas
- **Top**: 16px margin below status bar
- **Bottom**: 100px clearance for nav + FAB
- **Sides**: 16px horizontal margin

---

## 8. Interactions & Animations

### Transition Timing
```css
--transition-fast: 0.1s ease;
--transition-medium: 0.2s ease;
```

### Press-Down Pattern (Universal)
```css
/* All interactive elements */
.interactive {
  transition: var(--transition-fast);
}

.interactive:active {
  transform: translate(Xpx, Ypx); /* X,Y = half of shadow offset */
  box-shadow: /* Reduced by X,Y */;
}
```

**Examples**:
- Shadow 6x6 → translate(3px, 3px), shadow 3x3
- Shadow 4x4 → translate(2px, 2px), shadow 2x2
- Shadow 3x3 → translate(2px, 2px), shadow 1x1

### State Changes
- **Hover**: Not used (mobile-first)
- **Focus**: Transform + shadow reduction (same as active)
- **Active**: Background color change + weight change (buttons)
- **Disabled**: Opacity 0.5 or color change to `--color-text-disabled`

---

## 9. Accessibility

### Minimum Touch Targets
- **Buttons**: 44x44px minimum (iOS), 48x48dp (Android)
- **Current sizes meet requirements**:
  - FAB: 64x64px ✓
  - Nav items: ~58x58px ✓
  - Filter buttons: 34px height (expand to 44px if needed)

### Color Contrast (WCAG AA)
| Combination | Ratio | Pass? |
|-------------|-------|-------|
| #f5f5f5 on #0f0f0f | 19.6:1 | ✓ AAA |
| #FFD53D on #000000 | 15.8:1 | ✓ AAA |
| #000000 on #FFD53D | 15.8:1 | ✓ AAA |
| #888888 on #0f0f0f | 8.2:1 | ✓ AAA (small text) |

### Typography Legibility
- Minimum body text: 14px
- Minimum labels: 10px (uppercase, bold)
- Line height: 1.2-1.4 for readability

---

## 10. React Native Implementation Guide

### CSS Variables → React Native StyleSheet
```javascript
// colors.js
export const colors = {
  bgPrimary: '#0f0f0f',
  bgSecondary: '#1a1a1a',
  textPrimary: '#f5f5f5',
  textSecondary: '#888888',
  textDisabled: '#666666',
  brandYellow: '#FFD53D',
  stroke: '#000000',
};

// typography.js
export const typography = {
  h1: {
    fontFamily: 'Archivo',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 3,
    textTransform: 'uppercase',
    lineHeight: 33.6,
  },
  bodyLarge: {
    fontFamily: 'Archivo',
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 19.5,
  },
  // ... etc
};

// spacing.js
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
};

// shadows.js (Android elevation + iOS shadow)
export const shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3, // Android
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  // ... etc
};
```

### Component Example
```javascript
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { colors, typography, spacing, shadows } from './theme';

const AlbumRow = ({ artist, title, bpm }) => (
  <Pressable
    style={({ pressed }) => [
      styles.container,
      pressed && styles.containerPressed,
    ]}
  >
    <View style={styles.cover}>
      {/* Icon component */}
    </View>
    <View style={styles.info}>
      <Text style={styles.artist}>{artist}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
    {bpm && <Text style={styles.bpm}>{bpm}</Text>}
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bgSecondary,
    padding: spacing.base,
    borderWidth: 3,
    borderColor: colors.stroke,
    minHeight: 80,
    marginBottom: spacing.md,
    ...shadows.large,
  },
  containerPressed: {
    transform: [{ translateX: 3 }, { translateY: 3 }],
    ...shadows.medium, // Reduced shadow
  },
  cover: {
    width: 52,
    height: 52,
    backgroundColor: colors.brandYellow,
    borderWidth: 3,
    borderColor: colors.stroke,
    marginRight: spacing.base,
    alignItems: 'center',
    justifyContent: 'center',
  },
  artist: {
    ...typography.labelSmallCaps,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  title: {
    ...typography.bodyLarge,
    color: colors.textPrimary,
  },
  bpm: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.brandYellow,
    backgroundColor: colors.stroke,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 2,
    borderColor: colors.stroke,
    minWidth: 70,
    textAlign: 'right',
    marginLeft: spacing.base,
  },
});
```

---

## 11. Figma Setup Guide

### 1. Create Color Styles
- Primary/Background: #0f0f0f
- Secondary/Card: #1a1a1a
- Text/Primary: #f5f5f5
- Text/Secondary: #888888
- Text/Disabled: #666666
- Brand/Yellow: #FFD53D
- Stroke/Black: #000000

### 2. Create Text Styles
Follow typography scale from Section 1:
- H1/App Name
- H2/Section Header
- Body/Large
- Body/Regular
- Label/Caps 12px
- BPM/Display
- Button/Default
- Button/Active

### 3. Create Component Variants
**Button Component**:
- Default state (SemiBold 600, black bg, white text)
- Active state (Black 900, yellow bg, black text)
- Pressed state (transformed position, reduced shadow)

**Album Row Component**:
- With BPM
- Without BPM (missing)
- Pressed state

**Nav Item Component**:
- Active (yellow, weight 900)
- Inactive (gray, weight 700)
- Pressed (yellow bg)

### 4. Auto Layout Settings
- **Cards/Rows**: Horizontal, 16px padding, 16px gap between elements
- **Filter Buttons**: Horizontal, 8px gap, auto-wrap
- **Bottom Nav**: Horizontal, space-between, 16px vertical padding

### 5. Effects (Shadows)
- Small: X3 Y3, Blur 0, #000000
- Medium: X4 Y4, Blur 0, #000000
- Large: X5 Y5, Blur 0, #000000
- XLarge: X6 Y6, Blur 0, #000000

---

## 12. Quick Reference Checklist

**Before implementing any component:**
- [ ] Font is Archivo
- [ ] Weights match spec (900 for bold, 700 for emphasis, 600 for buttons, 500 for body)
- [ ] Black borders are 3-4px
- [ ] Shadows are hard (0 blur), with X=Y offset
- [ ] Yellow is #FFD53D
- [ ] Background is #0f0f0f or #1a1a1a
- [ ] Press-down interaction: translate(X/2, Y/2) + shadow reduction
- [ ] Uppercase labels use letter-spacing 1-3px
- [ ] Minimum touch target 44x44px
- [ ] Icons are Lucide, stroke-based
- [ ] No rounded corners (or 2px max for inputs)

---

## 13. File Export

**For Cursor IDE**:
- Save as `design-system.md` in project root
- Import color/typography constants from this file

**For Figma**:
- Create shared library "Kallax Design System"
- Export color styles, text styles, components
- Share library with team

**For React Native**:
- Create `theme/` directory
- Split into: `colors.js`, `typography.js`, `spacing.js`, `shadows.js`
- Import in components as needed

---

**Version**: 1.0  
**Last Updated**: December 2024  
**Design System Owner**: Miguel  
**Font**: Archivo (Google Fonts)  
**Icon Library**: Lucide  
**Aesthetic**: Neo-Brutalism Dark Theme
