# Code Changes Required: Remove IPhoneFrame Wrapper

## Summary

Two files need to be modified to remove the IPhoneFrame wrapper:
1. **PageShell.tsx** - Remove IPhoneFrame import and wrapper
2. **PageShell.module.css** - Create new CSS module for clean layout

## File 1: src/components/templates/PageShell/PageShell.tsx

### BEFORE (Current Code)
```typescript
import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { IPhoneFrame } from '../IPhoneFrame';
import { Header } from '../../layout/Header/Header';
import { Footer } from '../../layout/Footer/Footer';

interface PageShellProps {
  children: ReactNode;
}

export function PageShell({ children }: PageShellProps) {
  const location = useLocation();
  
  // Show footer on all pages except checkout flow
  const showFooter = !location.pathname.includes('/checkout');

  return (
    <IPhoneFrame
      header={<Header />}
      footer={showFooter ? <Footer /> : undefined}
      showNotch={true}
    >
      {children}
    </IPhoneFrame>
  );
}
```

### AFTER (New Code)
```typescript
import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from '../../layout/Header/Header';
import { Footer } from '../../layout/Footer/Footer';
import styles from './PageShell.module.css';

interface PageShellProps {
  children: ReactNode;
}

export function PageShell({ children }: PageShellProps) {
  const location = useLocation();
  
  // Show footer on all pages except checkout flow
  const showFooter = !location.pathname.includes('/checkout');

  return (
    <div className={styles.shell}>
      <Header />
      <main className={styles.main}>
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
}
```

### Changes Made
1. ❌ **Removed**: `import { IPhoneFrame } from '../IPhoneFrame';`
2. ✅ **Added**: `import styles from './PageShell.module.css';`
3. ❌ **Removed**: `<IPhoneFrame>` wrapper with header/footer/notch props
4. ✅ **Added**: Clean `<div className={styles.shell}>` wrapper
5. ✅ **Added**: `<Header />` as direct child (already sticky via its own CSS)
6. ✅ **Added**: `<main className={styles.main}>` wrapper for content
7. ✅ **Added**: Conditional `{showFooter && <Footer />}` render

## File 2: src/components/templates/PageShell/PageShell.module.css

### CREATE NEW FILE

```css
/**
 * PageShell: Clean responsive layout (no IPhoneFrame wrapper)
 * 
 * Architecture:
 * - Full viewport height container
 * - Header (sticky via Header.module.css)
 * - Main content (scrollable)
 * - Footer (static, positioned via margin-top: auto)
 */

.shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--color-fog);
  position: relative;
}

.main {
  flex: 1;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
}

/* 
 * Optional: Desktop max-width constraint
 * Uncomment if you want centered layout on large screens
 */
/*
@media (min-width: 1200px) {
  .shell {
    max-width: var(--max-width);
    margin: 0 auto;
    box-shadow: var(--shadow-sm);
  }
}
*/
```

### Notes
- The `.shell` class creates a flexbox column layout that fills the viewport
- `min-height: 100vh` ensures it's always at least full screen height
- `.main` is flex: 1 so it takes all available space between header and footer
- Header sticky positioning is handled by `Header.module.css` (already implemented)
- Footer uses `margin-top: auto` in `Footer.module.css` to stick to bottom
- Desktop centering is optional (commented out) - uncomment if desired

## Verification Checklist

### After Making Changes:

1. **Visual Check** - Run dev server and verify:
   ```bash
   npm run dev
   ```
   - [ ] No iPhone device frame visible
   - [ ] No notch decoration
   - [ ] Header sticks to top when scrolling
   - [ ] Content scrolls naturally
   - [ ] Footer appears at bottom
   - [ ] OperatorCarousel renders correctly on homepage

2. **Route Check** - Test all routes:
   - [ ] `/` - Homepage shows header, carousel, destinations, footer
   - [ ] `/destination/united-states` - Shows header, content, footer
   - [ ] `/checkout` - Shows header, checkout form, NO footer
   - [ ] `/success` - Shows header, success message, footer

3. **Responsive Check** - Test viewport sizes:
   - [ ] 375px (iPhone SE) - All content visible, no horizontal scroll
   - [ ] 390px (iPhone 12/13/14) - Clean layout
   - [ ] 428px (iPhone Pro Max) - Clean layout
   - [ ] 768px (tablet) - Responsive scaling
   - [ ] 1200px+ (desktop) - Full width OR centered (if you uncommented desktop styles)

4. **Component Check** - Verify OperatorCarousel:
   - [ ] Logos render in greyscale
   - [ ] Infinite scroll animation works
   - [ ] "TRUSTED BY TRAVELERS WORLDWIDE" text visible
   - [ ] "Supported Networks" heading visible
   - [ ] Subtitle visible
   - [ ] Disclaimer visible at bottom

## Implementation Steps

### Step 1: Modify PageShell.tsx
```bash
# Open the file
cd /Users/administrator/.openclaw/workspace/roamly-fixed
code src/components/templates/PageShell/PageShell.tsx

# Replace the entire file contents with the AFTER code above
```

### Step 2: Create PageShell.module.css
```bash
# Create the new CSS file
touch src/components/templates/PageShell/PageShell.module.css

# Add the CSS contents from above
```

### Step 3: Test Locally
```bash
# Start dev server
npm run dev

# Open in browser
# Test all routes and viewports per checklist above
```

### Step 4: Commit and Deploy
```bash
# Stage changes
git add src/components/templates/PageShell/

# Commit
git commit -m "refactor: remove IPhoneFrame wrapper for clean responsive layout"

# Push to GitHub
git push origin main

# Deploy to Vercel
vercel --prod --yes
```

### Step 5: Verify Deployment
```bash
# Visit production URL
open https://roamly-fixed.vercel.app

# Test all routes and responsive behavior
# Capture screenshot for documentation
```

## Expected Visual Changes

### Before
```
┌─────────────────────────┐
│   ╭───────────╮         │  ← Notch decoration
│   ╰───────────╯         │
├─────────────────────────┤
│        Header           │  ← Inside 375px frame
├─────────────────────────┤
│                         │
│     HomePage            │  ← Content in frame
│   OperatorCarousel      │
│                         │
├─────────────────────────┤
│        Footer           │  ← Inside frame
└─────────────────────────┘
  ← Rounded corners, shadow, fixed width
```

### After
```
┌──────────────────────────────┐
│           Header             │  ← Sticky, full width
├──────────────────────────────┤
│                              │
│         HomePage             │  ← Scrollable content
│      OperatorCarousel        │  ← Full responsive width
│                              │
│                              │
├──────────────────────────────┤
│           Footer             │  ← Static, full width
└──────────────────────────────┘
  ← Clean, responsive, no frame
```

## Common Issues & Solutions

### Issue 1: Header not sticky
**Symptom**: Header scrolls away when you scroll down
**Solution**: Header already has `position: sticky` in Header.module.css - this should work. If not, check z-index.

### Issue 2: Content doesn't scroll
**Symptom**: Page is fixed height, content cuts off
**Solution**: Verify `.main` has `overflow-y: auto` in PageShell.module.css

### Issue 3: Footer not at bottom
**Symptom**: Footer appears in middle of page on short content
**Solution**: Footer already has `margin-top: auto` in Footer.module.css - this works with flexbox parent

### Issue 4: Horizontal scrollbar appears
**Symptom**: Page is wider than viewport on mobile
**Solution**: Check for elements with fixed px widths. Add `overflow-x: hidden` to `.main`

### Issue 5: OperatorCarousel breaks
**Symptom**: Carousel doesn't render or looks broken
**Solution**: Very unlikely - carousel has no IPhoneFrame dependencies. Check browser console for errors.

## Rollback Procedure

If changes cause issues, rollback is simple:

```bash
# Revert the commit
git revert HEAD

# Push rollback
git push origin main

# Redeploy
vercel --prod --yes
```

Or manually restore original PageShell.tsx code (the BEFORE version above).

## Success Metrics

After deployment, verify:

1. ✅ No iPhone device frame visible
2. ✅ No notch decoration
3. ✅ Header sticky at top
4. ✅ Content scrolls smoothly
5. ✅ Footer conditional on routes
6. ✅ OperatorCarousel renders and animates
7. ✅ Responsive on 375px - 1200px+ viewports
8. ✅ No console errors
9. ✅ No visual regressions
10. ✅ All routes function correctly

## Timeline

- **Modify PageShell.tsx**: 5 minutes
- **Create PageShell.module.css**: 5 minutes
- **Local testing**: 10 minutes
- **Commit and deploy**: 5 minutes
- **Verify deployment**: 5 minutes

**Total**: ~30 minutes

## Notes for Coder Agent

- These are the ONLY two files that need changes
- No other components need modification
- OperatorCarousel component stays exactly as-is
- Header component stays exactly as-is
- Footer component stays exactly as-is
- HomePage stays exactly as-is
- Do NOT delete IPhoneFrame files (keep them in codebase for now)
- Focus on clean implementation per spec above
