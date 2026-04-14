# Coder Quick Start: Remove IPhoneFrame Wrapper

**Task**: Remove IPhoneFrame device wrapper from Roamly  
**Project**: `/Users/administrator/.openclaw/workspace/roamly-fixed`  
**Time**: ~30 minutes  
**Difficulty**: 🟢 Easy  

---

## TL;DR

Replace the IPhoneFrame device wrapper in PageShell with a clean responsive flex layout. Only 2 files need changes.

---

## Step-by-Step Implementation

### 1. Navigate to Project
```bash
cd /Users/administrator/.openclaw/workspace/roamly-fixed
pwd  # Verify you're in the right directory
```

### 2. Modify PageShell.tsx

**File**: `src/components/templates/PageShell/PageShell.tsx`

**Find this code**:
```typescript
import { IPhoneFrame } from '../IPhoneFrame';

export function PageShell({ children }: PageShellProps) {
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

**Replace with this**:
```typescript
import styles from './PageShell.module.css';

export function PageShell({ children }: PageShellProps) {
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

**Full new file** (copy this entire code):
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

### 3. Create PageShell.module.css

**File**: `src/components/templates/PageShell/PageShell.module.css` (NEW FILE)

**Create and add this code**:
```css
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

/* Optional: Desktop max-width constraint */
/* Uncomment if you want centered layout on large screens */
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

### 4. Test Locally

```bash
npm run dev
```

**Open** http://localhost:5173

**Verify**:
- [ ] No iPhone device frame visible
- [ ] No notch decoration
- [ ] Header sticks to top when scrolling
- [ ] OperatorCarousel renders on homepage
- [ ] Logos are greyscale and scrolling
- [ ] Footer shows on `/` but NOT on `/checkout`

### 5. Test Routes

- [ ] `/` - Homepage (should have footer)
- [ ] `/destination/united-states` - Destination page (should have footer)
- [ ] `/checkout` - Checkout page (should NOT have footer)
- [ ] `/success` - Success page (should have footer)

### 6. Test Responsive

Use browser DevTools to test these viewports:
- [ ] 375px (iPhone SE)
- [ ] 390px (iPhone 12/13/14)
- [ ] 428px (iPhone Pro Max)
- [ ] 768px (iPad)
- [ ] 1200px+ (Desktop)

**Check**: No horizontal scrollbar, clean layout at all sizes

### 7. Commit and Deploy

```bash
# Stage changes
git add src/components/templates/PageShell/

# Verify changes
git status

# Commit
git commit -m "refactor: remove IPhoneFrame wrapper for clean responsive layout"

# Push to GitHub
git push origin main

# Deploy to Vercel
vercel --prod --yes
```

### 8. Verify Production

```bash
# Open production URL
open https://roamly-fixed.vercel.app
```

**Verify**:
- [ ] Homepage loads without device frame
- [ ] OperatorCarousel works
- [ ] All routes work
- [ ] Responsive on mobile/tablet/desktop

### 9. Capture Screenshot

Take a screenshot of the homepage showing:
- Clean mobile layout (no device frame)
- OperatorCarousel section
- Mobile viewport (390px or similar)

---

## What Changed

### Before
```
<IPhoneFrame> ← 375px × 812px device wrapper
  <Header /> ← inside frame
  <Content /> ← inside frame
  <Footer /> ← inside frame
</IPhoneFrame>
```

### After
```
<div className={styles.shell}> ← flex layout, 100vw
  <Header /> ← sticky top
  <main className={styles.main}> ← scrollable
    <Content />
  </main>
  <Footer /> ← static bottom
</div>
```

---

## Troubleshooting

### Header not sticky
**Fix**: Header already has `position: sticky` in Header.module.css - should work automatically

### Content doesn't scroll
**Fix**: Verify `.main` has `overflow-y: auto` in PageShell.module.css

### Footer not at bottom
**Fix**: Footer already uses `margin-top: auto` in Footer.module.css - works with flex parent

### Horizontal scrollbar appears
**Fix**: Already handled with `overflow-x: hidden` on `.main`

### OperatorCarousel broken
**Unlikely**: Component has no IPhoneFrame dependencies. Check browser console for errors.

---

## Completion Report Template

After deployment, report back with:

```
✅ COMPLETED: Remove IPhoneFrame Wrapper

Files Changed:
- src/components/templates/PageShell/PageShell.tsx (modified)
- src/components/templates/PageShell/PageShell.module.css (created)

Local Testing:
- [ ] Homepage renders without device frame: YES/NO
- [ ] Header sticky: YES/NO
- [ ] OperatorCarousel works: YES/NO
- [ ] Footer conditional: YES/NO
- [ ] All routes work: YES/NO
- [ ] Responsive 375px-1200px: YES/NO

Deployment:
- Commit: [commit hash]
- Production URL: https://roamly-fixed.vercel.app
- Status: SUCCESS/FAILED

Screenshot:
[URL to screenshot]

Issues Encountered:
[None / List any issues]

Console Errors:
[None / List any errors]
```

---

## Files to Review

If you need more context, read these in order:

1. **CODE_CHANGES_REQUIRED.md** - Exact before/after code
2. **REMOVE_IPHONE_FRAME_SPEC.md** - Full architectural spec
3. **ARCHITECT_IPHONE_FRAME_REMOVAL_DELIVERABLES.md** - Comprehensive deliverables

---

## Success Checklist

- [ ] IPhoneFrame wrapper removed
- [ ] No device frame visible
- [ ] No notch decoration
- [ ] Header sticky
- [ ] Content scrollable
- [ ] Footer conditional
- [ ] OperatorCarousel renders
- [ ] All routes work
- [ ] Responsive tested
- [ ] Deployed to Vercel
- [ ] Production verified
- [ ] Screenshot captured
- [ ] No console errors

---

**Ready to Code!** 🚀
