# Developer Guide: Rebtel Color System

**Quick Reference for Roamly Development Team**

---

## 🎨 Using the Color System

### The Golden Rule
**NEVER hardcode colors. ALWAYS use CSS variables.**

```css
/* ❌ DON'T DO THIS */
.button {
  background-color: #E31B3B;
  color: #FFFFFF;
}

/* ✅ DO THIS */
.button {
  background-color: var(--color-primary);
  color: var(--color-white);
}
```

---

## 📋 Color Token Reference

### Primary Brand Colors

```css
var(--color-primary)       /* #E31B3B - Rebtel Red (main brand color) */
var(--color-primary-dark)  /* #C01731 - Hover/active states */
var(--color-primary-light) /* #FFEEF1 - Backgrounds, subtle accents */
```

**Use for:** Buttons, CTAs, links, focus states, brand accents

### Greyscale Palette

```css
var(--color-grey-900)  /* #1A1A1A - Darkest (headings, primary text) */
var(--color-grey-700)  /* #4A4A4A - Dark (secondary text) */
var(--color-grey-500)  /* #9E9E9E - Mid (disabled states, placeholders) */
var(--color-grey-300)  /* #E0E0E0 - Light (borders, dividers) */
var(--color-grey-100)  /* #F5F5F5 - Lightest (backgrounds) */
var(--color-white)     /* #FFFFFF - Pure white (cards, inputs) */
var(--color-black)     /* #000000 - Pure black (secondary buttons) */
```

### Semantic Colors

```css
var(--color-success)       /* #00C853 - Green (success states) */
var(--color-success-light) /* #E8F5EE - Success backgrounds */
var(--color-error)         /* #DC2626 - Red (errors) */
var(--color-error-light)   /* #FEE2E2 - Error backgrounds */
var(--color-warning)       /* #F59E0B - Amber (warnings) */
var(--color-warning-light) /* #FEF3C7 - Warning backgrounds */
var(--color-info)          /* #3B82F6 - Blue (informational) */
var(--color-info-light)    /* #DBEAFE - Info backgrounds */
```

### Legacy Mappings (Backward Compatible)

```css
var(--color-ink)           /* Same as grey-900 (primary text) */
var(--color-stone)         /* Same as grey-700 (secondary text) */
var(--color-fog)           /* Same as grey-100 (page background) */
var(--color-border)        /* Same as grey-300 (dividers) */
var(--color-border-strong) /* Same as grey-500 (emphasized borders) */
var(--color-teal)          /* OLD NAME - now maps to primary red */
```

---

## 🛠️ Common Use Cases

### Buttons

```css
/* Primary button */
.button-primary {
  background-color: var(--color-primary);
  color: var(--color-white);
}

.button-primary:hover {
  background-color: var(--color-primary-dark);
}

/* Secondary button */
.button-secondary {
  background-color: var(--color-black);
  color: var(--color-white);
}

/* Outline button */
.button-outline {
  background-color: transparent;
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
}
```

### Links

```css
.link {
  color: var(--color-primary);
  text-decoration: none;
}

.link:hover {
  color: var(--color-primary-dark);
  text-decoration: underline;
}
```

### Text Hierarchy

```css
.heading {
  color: var(--color-grey-900);
  font-weight: var(--weight-bold);
}

.body-text {
  color: var(--color-grey-700);
  font-weight: var(--weight-regular);
}

.caption, .label {
  color: var(--color-grey-500);
  font-size: var(--text-sm);
}

.disabled {
  color: var(--color-grey-500);
}
```

### Form Inputs

```css
.input {
  background-color: var(--color-white);
  border: 1px solid var(--color-grey-300);
  color: var(--color-grey-900);
}

.input:focus {
  border-color: var(--color-primary);
  outline: 2px solid var(--color-primary-light);
}

.input::placeholder {
  color: var(--color-grey-500);
}

.input:disabled {
  background-color: var(--color-grey-100);
  color: var(--color-grey-500);
}
```

### Status Messages

```css
.alert-success {
  background-color: var(--color-success-light);
  border-left: 4px solid var(--color-success);
  color: var(--color-grey-900);
}

.alert-error {
  background-color: var(--color-error-light);
  border-left: 4px solid var(--color-error);
  color: var(--color-grey-900);
}

.alert-warning {
  background-color: var(--color-warning-light);
  border-left: 4px solid var(--color-warning);
  color: var(--color-grey-900);
}

.alert-info {
  background-color: var(--color-info-light);
  border-left: 4px solid var(--color-info);
  color: var(--color-grey-900);
}
```

### Cards & Containers

```css
.card {
  background-color: var(--color-white);
  border: 1px solid var(--color-grey-300);
  box-shadow: var(--shadow-md);
}

.card-header {
  background-color: var(--color-grey-100);
  border-bottom: 1px solid var(--color-grey-300);
}
```

---

## 🚨 Accessibility Guidelines

### Contrast Requirements (WCAG AA)

**Safe Combinations:**

✅ **White text on red background**
```css
background-color: var(--color-primary);  /* #E31B3B */
color: var(--color-white);               /* #FFFFFF */
/* Contrast: 4.47:1 - WCAG AA (large text) */
```

✅ **Grey-900 text on white background**
```css
background-color: var(--color-white);
color: var(--color-grey-900);
/* Contrast: 16.1:1 - WCAG AAA */
```

✅ **Grey-700 text on white background**
```css
background-color: var(--color-white);
color: var(--color-grey-700);
/* Contrast: 9.4:1 - WCAG AAA */
```

**Unsafe Combinations:**

❌ **Red text on white background (small sizes)**
```css
/* DON'T use for body text (< 14px) */
background-color: var(--color-white);
color: var(--color-primary);
/* Contrast: 4.47:1 - Insufficient for small text */
```

**Fix:** Use for links/CTAs only (larger text), or use `--color-primary-dark` for better contrast.

---

## 🔧 Modifying Colors

### How to Change a Color

1. **Open the tokens file:**
   ```bash
   /src/tokens/rebtel-tokens.css
   ```

2. **Find the variable:**
   ```css
   --color-primary: #E31B3B;
   ```

3. **Update the value:**
   ```css
   --color-primary: #NEW_COLOR;
   ```

4. **Test accessibility:**
   - Visit: https://webaim.org/resources/contrastchecker/
   - Check new color vs white (for buttons)
   - Ensure >= 4.5:1 contrast ratio

5. **Update the changelog:**
   ```css
   /*
     2026-04-XX: Changed primary to #NEW_COLOR
     Reason: [Your reason here]
   */
   ```

6. **Build and verify:**
   ```bash
   npm run build
   npm run dev
   ```

**All components automatically update** - no other files need modification!

---

## 🎯 When to Use Which Color

### Primary Red
- **Use:** Primary CTAs, links, focus states, brand moments
- **Don't use:** Body text (insufficient contrast), backgrounds (too bold)

### Greyscale
- **Grey-900:** Headings, primary text
- **Grey-700:** Body text, secondary headings
- **Grey-500:** Disabled text, placeholders, less important info
- **Grey-300:** Borders, dividers, subtle separators
- **Grey-100:** Page backgrounds, subtle containers

### Semantic Colors
- **Success (Green):** Confirmations, completed states, positive feedback
- **Error (Red):** Validation errors, destructive actions, failures
- **Warning (Amber):** Caution messages, pending states, important notices
- **Info (Blue):** Informational messages, tips, help text

---

## 📦 TypeScript Integration (Optional)

If you want type-safe color references in TypeScript:

```typescript
// colors.ts
export const colors = {
  primary: 'var(--color-primary)',
  primaryDark: 'var(--color-primary-dark)',
  primaryLight: 'var(--color-primary-light)',
  grey900: 'var(--color-grey-900)',
  grey700: 'var(--color-grey-700)',
  // ... etc
} as const;

export type ColorToken = keyof typeof colors;
```

**Usage in components:**
```tsx
import { colors } from '@/tokens/colors';

const Button = ({ variant }: ButtonProps) => (
  <button style={{ backgroundColor: colors.primary }}>
    Click me
  </button>
);
```

---

## 🐛 Debugging Color Issues

### Color Not Showing Up?

1. **Check token exists:**
   ```javascript
   // In browser console:
   getComputedStyle(document.documentElement)
     .getPropertyValue('--color-primary');
   // Should return: "#E31B3B" or "rgb(227, 27, 59)"
   ```

2. **Check element inherits:**
   ```javascript
   const element = document.querySelector('.your-element');
   getComputedStyle(element).backgroundColor;
   // Should show the computed value
   ```

3. **Check CSS variable syntax:**
   ```css
   /* ✅ Correct */
   color: var(--color-primary);
   
   /* ❌ Wrong */
   color: --color-primary;  /* Missing var() */
   color: var(color-primary); /* Missing -- prefix */
   ```

4. **Check specificity:**
   ```css
   /* More specific rule wins */
   .button { color: var(--color-primary); }
   .button.special { color: blue; } /* This overrides */
   ```

### Wrong Color Showing Up?

1. **Search for hardcoded values:**
   ```bash
   grep -r "#FF6B35" src/  # Old orange color
   grep -r "rgb(255, 107, 53)" src/
   ```

2. **Check for inline styles:**
   ```html
   <!-- ❌ Don't do this -->
   <div style="color: #E31B3B">Text</div>
   
   <!-- ✅ Do this -->
   <div className="text-primary">Text</div>
   ```

---

## 📚 Additional Resources

### Documentation Files
- **RESEARCHER_COLOR_VALIDATION.md** - Comprehensive 20KB validation report
- **VERIFICATION_GUIDE.md** - Testing and verification steps
- **COLOR_CORRECTION_SUMMARY.md** - Quick reference
- **ARCHITECT_FINAL_OUTPUT.md** - Implementation summary

### Design System References
- **Rebtel Brand Guidelines** - Official brand color specifications
- **Figma Design File** - Visual design reference (sync with tokens)
- **WebAIM Contrast Checker** - https://webaim.org/resources/contrastchecker/

### Code Locations
- **Tokens:** `/src/tokens/rebtel-tokens.css`
- **Button Styles:** `/src/components/atoms/Button/Button.module.css`
- **Global Styles:** `/src/global.css`

---

## ✅ Checklist for New Features

When building a new component:

- [ ] Used CSS variables for all colors
- [ ] No hardcoded hex/rgb values
- [ ] Tested accessibility (contrast ratios)
- [ ] Checked hover/active/focus states
- [ ] Verified dark text on light backgrounds (and vice versa)
- [ ] Used semantic colors appropriately (success/error/etc.)
- [ ] Documented any custom color logic
- [ ] Tested in browser dev tools

---

## 🚀 Quick Start Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Find hardcoded colors
grep -r "#[0-9A-Fa-f]\{6\}" src/ --include="*.css" --include="*.tsx"

# Test accessibility (manual)
# 1. Open https://webaim.org/resources/contrastchecker/
# 2. Enter foreground: #E31B3B
# 3. Enter background: #FFFFFF
# 4. Verify >= 4.5:1 ratio
```

---

## 🎓 Best Practices Summary

1. **Always use CSS variables** - Never hardcode colors
2. **Test accessibility** - WCAG AA minimum (4.5:1 contrast)
3. **Use semantic naming** - `--color-success` not `--color-green-500`
4. **Document changes** - Update tokens file changelog
5. **Think in tokens** - Design with reusable variables in mind
6. **Check contrast** - Especially for text on colored backgrounds
7. **Leverage greyscale** - Use the full palette for text hierarchy
8. **Keep it simple** - Don't introduce new color variables without reason

---

## 💡 Pro Tips

1. **Browser DevTools:** Inspect element and look at "Computed" tab to see resolved CSS variable values

2. **CSS Variable Fallbacks:**
   ```css
   color: var(--color-primary, #E31B3B);
   /* If variable fails, fallback to #E31B3B */
   ```

3. **Dynamic Theming:**
   ```javascript
   // Change colors at runtime (e.g., for dark mode)
   document.documentElement.style.setProperty('--color-primary', '#NEW_COLOR');
   ```

4. **Scoped Variables:**
   ```css
   .dark-theme {
     --color-primary: #FF6B35; /* Override for dark mode */
   }
   ```

5. **Debugging in Console:**
   ```javascript
   // Get all CSS variables
   Array.from(document.styleSheets)
     .flatMap(sheet => Array.from(sheet.cssRules))
     .filter(rule => rule.style && rule.selectorText === ':root')
     .map(rule => rule.style.cssText);
   ```

---

**Questions?** Check `RESEARCHER_COLOR_VALIDATION.md` for comprehensive research and validation.

**Last Updated:** 2026-04-14  
**Maintained By:** Roamly Development Team
