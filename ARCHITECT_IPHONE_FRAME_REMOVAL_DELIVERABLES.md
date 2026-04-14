# Architect Deliverables: Remove IPhoneFrame Wrapper

**Date**: 2026-04-14  
**Agent**: ARCHITECT  
**Task**: Remove IPhoneFrame device wrapper from Roamly OperatorCarousel and all pages  
**Project**: /Users/administrator/.openclaw/workspace/roamly-fixed  
**Deployment**: https://roamly-fixed.vercel.app  

---

## Executive Summary

The current Roamly application wraps all pages in an IPhoneFrame device template component (375px × 812px with notch decoration). This creates an artificial "phone simulator" appearance that is not desired. The task is to remove this wrapper and implement a clean, standard mobile-responsive layout.

**Key Finding**: The OperatorCarousel component is already implemented correctly and has no dependencies on IPhoneFrame. The only changes needed are in the PageShell template component.

**Scope**: Minimal - only 2 files need changes (PageShell.tsx and new PageShell.module.css)

**Impact**: All pages (HomePage, DestinationPage, CheckoutPage, SuccessPage) will render with clean responsive layout instead of device frame wrapper.

---

## Architecture Analysis

### Current Component Hierarchy
```
App.tsx
  └── BrowserRouter
       └── ErrorBoundary
            └── PageShell ⚠️ (uses IPhoneFrame wrapper)
                 └── IPhoneFrame ⚠️ (device frame template)
                      ├── Header (in frame header zone)
                      ├── AppRoutes (in frame content zone)
                      │    └── HomePage
                      │         └── OperatorCarousel ✅ (independent, no frame dependency)
                      └── Footer (in frame footer zone)
```

### Target Component Hierarchy
```
App.tsx
  └── BrowserRouter
       └── ErrorBoundary
            └── PageShell ✅ (clean responsive wrapper)
                 ├── Header (sticky top)
                 ├── Main content (scrollable)
                 │    └── AppRoutes
                 │         └── HomePage
                 │              └── OperatorCarousel ✅ (unchanged)
                 └── Footer (static bottom, conditional)
```

### Key Differences
| Aspect | Before (IPhoneFrame) | After (Clean Layout) |
|--------|---------------------|----------------------|
| **Wrapper** | IPhoneFrame component | div with flex layout |
| **Width** | Fixed 375px | 100vw (responsive) |
| **Height** | Fixed 812px max | 100vh min (flexible) |
| **Decoration** | Notch + rounded corners + shadow | None |
| **Header** | Inside frame header zone | Direct child, sticky |
| **Content** | Inside frame content zone | Flex main element |
| **Footer** | Inside frame footer zone | Direct child, conditional |
| **Scrolling** | Frame content zone | Main element |

---

## Technical Specification

### File Changes Required

#### 1. src/components/templates/PageShell/PageShell.tsx

**Status**: ✏️ MODIFY

**Current Implementation**:
```typescript
import { IPhoneFrame } from '../IPhoneFrame';  // ❌ Remove this

export function PageShell({ children }: PageShellProps) {
  return (
    <IPhoneFrame                                 // ❌ Remove wrapper
      header={<Header />}
      footer={showFooter ? <Footer /> : undefined}
      showNotch={true}
    >
      {children}
    </IPhoneFrame>
  );
}
```

**New Implementation**:
```typescript
import styles from './PageShell.module.css';   // ✅ Add this

export function PageShell({ children }: PageShellProps) {
  return (
    <div className={styles.shell}>              // ✅ Clean wrapper
      <Header />                                 // ✅ Direct child
      <main className={styles.main}>             // ✅ Semantic main
        {children}
      </main>
      {showFooter && <Footer />}                 // ✅ Conditional footer
    </div>
  );
}
```

**Changes**:
- Remove IPhoneFrame import
- Add CSS module import
- Replace IPhoneFrame wrapper with div.shell
- Render Header as direct child (it handles its own sticky positioning)
- Wrap children in semantic `<main>` element with scrollable styling
- Render Footer conditionally as direct child

**Dependencies**: None (Header and Footer components already have correct styling)

#### 2. src/components/templates/PageShell/PageShell.module.css

**Status**: ✨ CREATE NEW FILE

**Implementation**:
```css
/**
 * PageShell: Clean responsive layout
 * Replaces IPhoneFrame device wrapper with standard mobile-first layout
 */

.shell {
  /* Flexbox column layout for header/main/footer */
  display: flex;
  flex-direction: column;
  
  /* Full viewport height */
  min-height: 100vh;
  
  /* Background color for main content area */
  background: var(--color-fog);
  
  /* Positioning context for children */
  position: relative;
}

.main {
  /* Take all available space between header and footer */
  flex: 1;
  
  /* Full width */
  width: 100%;
  
  /* Scrollable content */
  overflow-y: auto;
  overflow-x: hidden;
  
  /* Smooth scrolling on iOS */
  -webkit-overflow-scrolling: touch;
}

/* Optional: Desktop max-width constraint */
@media (min-width: 1200px) {
  .shell {
    max-width: var(--max-width);
    margin: 0 auto;
    box-shadow: var(--shadow-sm);
  }
}
```

**Purpose**:
- `.shell` creates full-height flexbox container
- `.main` is flexible content area that takes available space
- Desktop media query is optional for centered layout on large screens

**Design Tokens Used**:
- `var(--color-fog)` - Background color (already defined)
- `var(--max-width)` - Max width for desktop (1120px, already defined)
- `var(--shadow-sm)` - Optional shadow for desktop (already defined)

### Components That DO NOT Need Changes

#### ✅ src/components/domain/OperatorCarousel/OperatorCarousel.tsx
**Status**: NO CHANGES NEEDED

**Current Implementation**: Already independent, self-contained component
```typescript
export const OperatorCarousel: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>TRUSTED BY TRAVELERS WORLDWIDE</p>
        <h2 className={styles.title}>Supported Networks</h2>
        <p className={styles.subtitle}>
          Connect via 200+ mobile operators worldwide
        </p>
      </div>
      <div className={styles.carousel}>
        <div className={styles.track}>
          {/* Infinite scrolling logos */}
        </div>
      </div>
      <p className={styles.disclaimer}>
        Network logos are trademarks of their respective owners.
      </p>
    </section>
  );
};
```

**Why no changes needed**:
- Component is self-contained with own CSS module
- No references to IPhoneFrame
- No parent-dependent styling
- Already responsive
- Already has greyscale logos
- Already has infinite scroll animation

#### ✅ src/components/layout/Header/Header.tsx
**Status**: NO CHANGES NEEDED

**Current Implementation**: Already has sticky positioning
```css
/* Header.module.css */
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--color-white);
  border-bottom: 1px solid var(--color-border);
}
```

**Why no changes needed**:
- Already uses position: sticky
- Already has correct z-index
- Already has white background with border
- Works independently of parent wrapper

#### ✅ src/components/layout/Footer/Footer.tsx
**Status**: NO CHANGES NEEDED

**Current Implementation**: Uses margin-top: auto for flexbox positioning
```css
/* Footer.module.css */
.footer {
  margin-top: auto;  /* Sticks to bottom in flex parent */
  background: var(--color-fog);
  border-top: 1px solid var(--color-border);
}
```

**Why no changes needed**:
- Already uses margin-top: auto (works with flex parent)
- Already has correct styling
- Responsive layout already implemented

#### ✅ src/pages/Home/HomePage.tsx
**Status**: NO CHANGES NEEDED

**Current Implementation**: Already renders OperatorCarousel directly
```typescript
<div className={styles.page}>
  <div className={styles.hero}>
    <h1>Instant data, everywhere.</h1>
    <SearchBar />
  </div>
  
  <OperatorCarousel />  {/* Already direct child, no wrapper */}
  
  <div className={styles.section}>
    {/* Destinations grid */}
  </div>
</div>
```

**Why no changes needed**:
- OperatorCarousel already rendered without wrapper
- Component hierarchy already correct
- No IPhoneFrame dependencies

---

## Implementation Guide for Coder

### Pre-Implementation Checklist

1. ✅ Navigate to project directory:
   ```bash
   cd /Users/administrator/.openclaw/workspace/roamly-fixed
   ```

2. ✅ Verify current implementation:
   ```bash
   cat src/components/templates/PageShell/PageShell.tsx
   ```
   Expected: Should see IPhoneFrame wrapper

3. ✅ Check for existing CSS module:
   ```bash
   ls -la src/components/templates/PageShell/
   ```
   Expected: Should NOT see PageShell.module.css (you'll create it)

### Implementation Steps

#### Step 1: Modify PageShell.tsx

```bash
# Edit the file
# Replace contents with new implementation (see CODE_CHANGES_REQUIRED.md)
```

**Exact changes**:
1. Line 3: Remove `import { IPhoneFrame } from '../IPhoneFrame';`
2. Line 4: Add `import styles from './PageShell.module.css';`
3. Lines 14-21: Replace IPhoneFrame wrapper with div.shell + Header + main + Footer

#### Step 2: Create PageShell.module.css

```bash
# Create the file
touch src/components/templates/PageShell/PageShell.module.css

# Add CSS contents (see CODE_CHANGES_REQUIRED.md)
```

**Contents**: .shell and .main class definitions with responsive flexbox layout

#### Step 3: Test Locally

```bash
# Start dev server
npm run dev
```

**Visual verification**:
- [ ] No iPhone device frame visible
- [ ] No notch decoration
- [ ] Header sticks to top when scrolling
- [ ] Content scrolls naturally
- [ ] OperatorCarousel renders on homepage
- [ ] Logos are greyscale and scrolling
- [ ] Footer appears at bottom

**Route testing**:
- [ ] `/` - Homepage with header + carousel + destinations + footer
- [ ] `/destination/united-states` - Destination page with footer
- [ ] `/checkout` - Checkout page WITHOUT footer
- [ ] `/success` - Success page with footer

**Responsive testing**:
- [ ] 375px viewport - Clean layout, no horizontal scroll
- [ ] 390px viewport - Clean layout
- [ ] 768px viewport - Responsive scaling
- [ ] 1200px viewport - Full width or centered (if desktop styles uncommented)

#### Step 4: Commit Changes

```bash
git add src/components/templates/PageShell/
git status  # Verify: 1 modified, 1 new file
git commit -m "refactor: remove IPhoneFrame wrapper for clean responsive layout"
```

#### Step 5: Deploy

```bash
# Push to GitHub
git push origin main

# Deploy to Vercel
vercel --prod --yes

# Wait for deployment (typically 30-60 seconds)
```

#### Step 6: Verify Deployment

```bash
# Open production URL
open https://roamly-fixed.vercel.app
```

**Production verification**:
- [ ] Homepage loads without device frame
- [ ] OperatorCarousel renders and scrolls
- [ ] Header is sticky
- [ ] Footer appears (except on /checkout)
- [ ] All routes work
- [ ] Responsive on mobile/tablet/desktop

#### Step 7: Capture Screenshot

```bash
# Screenshot production homepage
# Include:
# - Full page view
# - OperatorCarousel section
# - Mobile viewport (390px)
```

### Post-Implementation Checklist

- [ ] PageShell.tsx modified correctly
- [ ] PageShell.module.css created with correct styles
- [ ] Local testing passed
- [ ] All routes work correctly
- [ ] Footer conditional logic works
- [ ] Committed to git
- [ ] Pushed to GitHub
- [ ] Deployed to Vercel
- [ ] Production verification passed
- [ ] Screenshot captured

---

## Testing Matrix

### Functional Testing

| Test Case | Expected Result | Status |
|-----------|-----------------|--------|
| Load homepage | Header + carousel + destinations + footer visible | ⏳ |
| Scroll homepage | Header sticks to top | ⏳ |
| Navigate to destination | Page loads with footer | ⏳ |
| Navigate to checkout | Page loads WITHOUT footer | ⏳ |
| Navigate to success | Page loads with footer | ⏳ |
| Carousel animation | Logos scroll infinitely | ⏳ |
| Carousel logos | Greyscale styling applied | ⏳ |
| Mobile navigation | Cart button works in header | ⏳ |

### Visual Testing

| Viewport | Expected Layout | Status |
|----------|-----------------|--------|
| 375px (iPhone SE) | Full width, no frame, no horizontal scroll | ⏳ |
| 390px (iPhone 12/13/14) | Full width, clean layout | ⏳ |
| 428px (iPhone Pro Max) | Full width, clean layout | ⏳ |
| 768px (iPad) | Responsive scaling | ⏳ |
| 1200px+ (Desktop) | Full width OR centered (if enabled) | ⏳ |

### Regression Testing

| Component | Expected Behavior | Status |
|-----------|------------------|--------|
| OperatorCarousel | Renders without changes | ⏳ |
| Header | Sticky positioning works | ⏳ |
| Footer | Shows on correct routes | ⏳ |
| SearchBar | Functions correctly | ⏳ |
| CountryCard | Displays correctly | ⏳ |
| Destination page | Loads plan cards | ⏳ |
| Checkout flow | Completes successfully | ⏳ |

---

## Success Criteria

### Must Have (P0)
1. ✅ IPhoneFrame wrapper removed from PageShell
2. ✅ No device frame visible in UI
3. ✅ No notch decoration
4. ✅ Header sticky at top
5. ✅ Content scrollable
6. ✅ Footer conditional on routes
7. ✅ OperatorCarousel renders on homepage
8. ✅ All routes functional
9. ✅ Deployed to Vercel
10. ✅ No console errors

### Should Have (P1)
1. ✅ Responsive on 375px - 1200px viewports
2. ✅ Smooth scrolling on iOS
3. ✅ Carousel animation works
4. ✅ Greyscale logos render
5. ✅ No visual regressions

### Nice to Have (P2)
1. ⭕ Desktop max-width constraint (optional)
2. ⭕ Centered layout on large screens (optional)
3. ⭕ Remove unused IPhoneFrame files (optional, low priority)

---

## Risk Assessment

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Header not sticky | High | Low | Already implemented in Header.module.css |
| Content doesn't scroll | High | Low | CSS flexbox + overflow-y: auto |
| Footer positioning broken | Medium | Low | Uses margin-top: auto (already working) |
| OperatorCarousel breaks | High | Very Low | No dependencies on IPhoneFrame |
| Layout shift on mobile | Medium | Low | Test on multiple viewports |
| Horizontal scrollbar | Low | Low | overflow-x: hidden on main |
| Z-index conflicts | Low | Low | Header already uses z-index: 100 |

**Overall Risk Level**: 🟢 **LOW**

**Justification**:
- Changes are isolated to PageShell component
- OperatorCarousel already independent
- Header/Footer already have correct styling
- No API changes, no data model changes
- Easy rollback via git revert

---

## Rollback Plan

If deployment causes issues:

### Quick Rollback (< 5 minutes)
```bash
# Revert the commit
git revert HEAD

# Push rollback
git push origin main

# Redeploy
vercel --prod --yes
```

### Manual Rollback
```bash
# Restore PageShell.tsx to original state
# Delete PageShell.module.css
# Commit and push
```

---

## Performance Considerations

### Before (IPhoneFrame)
- Fixed 375px width (responsive to frame size, not viewport)
- Box shadow rendering (GPU layer)
- Rounded corners (border-radius: 36px)
- Nested scrolling (frame content zone)

### After (Clean Layout)
- 100vw width (native viewport responsiveness)
- No box shadow (unless enabled on desktop)
- No rounded corners
- Direct scrolling on main element

**Expected Performance Impact**: ⬆️ **Slight improvement**
- Simpler DOM structure (one less wrapper)
- Less CSS paint (no shadow, no rounded corners)
- Native viewport sizing (no fixed constraints)

---

## Documentation Updates Needed

### Update README_REBRAND.md
- [x] Documented in this file
- [ ] Update README if it mentions IPhoneFrame wrapper

### Update Component Documentation
- [x] PageShell architecture documented
- [x] OperatorCarousel verified as independent
- [ ] Create CHANGELOG entry

---

## Deliverables Summary

### Documentation
1. ✅ **REMOVE_IPHONE_FRAME_SPEC.md** - Full architectural specification
2. ✅ **CODE_CHANGES_REQUIRED.md** - Exact code changes with before/after
3. ✅ **ARCHITECT_IPHONE_FRAME_REMOVAL_DELIVERABLES.md** - This file (comprehensive deliverables)

### Code Changes
1. ⏳ **PageShell.tsx** - Modified to remove IPhoneFrame wrapper
2. ⏳ **PageShell.module.css** - New file with clean layout styles

### Testing
1. ⏳ Local testing completed
2. ⏳ Route testing completed
3. ⏳ Responsive testing completed
4. ⏳ Regression testing completed

### Deployment
1. ⏳ Git commit created
2. ⏳ Pushed to GitHub
3. ⏳ Deployed to Vercel
4. ⏳ Production verification
5. ⏳ Screenshot captured

---

## Next Steps for Coder

1. **Read** CODE_CHANGES_REQUIRED.md for exact code changes
2. **Navigate** to project directory: `/Users/administrator/.openclaw/workspace/roamly-fixed`
3. **Modify** PageShell.tsx per specification
4. **Create** PageShell.module.css per specification
5. **Test** locally using `npm run dev`
6. **Commit** changes with descriptive message
7. **Deploy** to Vercel using `vercel --prod --yes`
8. **Verify** production deployment
9. **Capture** screenshot of fixed layout
10. **Report** completion with deployment URL and results

---

## Questions for Coder to Answer in Completion Report

1. Did the IPhoneFrame removal complete successfully?
2. Are there any console errors or warnings?
3. Does the OperatorCarousel render and animate correctly?
4. Is the Header sticky when scrolling?
5. Does the Footer show/hide correctly based on routes?
6. Are all viewports tested (375px, 390px, 768px, 1200px+)?
7. Does the production deployment work correctly?
8. Screenshot URL?
9. Any issues encountered during implementation?
10. Any recommendations for follow-up improvements?

---

**Architect Agent Signature**: ✅ Specification Complete  
**Ready for Coder**: Yes  
**Estimated Implementation Time**: 30-45 minutes  
**Confidence Level**: High (95%)  

---

## Appendix: Design Token Reference

### Tokens Used in New Implementation

```css
/* Layout */
--max-width: 1120px;           /* Desktop max-width constraint */
--header-height: 56px;         /* Header height (already used by Header) */
--mobile-nav-height: 72px;     /* Footer min-height (already used by Footer) */

/* Colors */
--color-fog: #f5f5f5;          /* Background for main content */
--color-white: #ffffff;        /* Header/Footer background */
--color-border: #e5e5e5;       /* Header/Footer borders */
--color-ink: #1a1a1a;          /* Text color */

/* Z-index */
--z-sticky: 100;               /* Sticky elements (Header uses this) */

/* Effects */
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);  /* Optional desktop shadow */
```

### Tokens NO LONGER USED (Can be removed in future cleanup)

```css
/* IPhoneFrame-specific tokens */
--frame-width: 375px;          /* ❌ No longer needed */
--frame-max-height: 812px;     /* ❌ No longer needed */
--frame-border-radius: 36px;   /* ❌ No longer needed */
--frame-notch-height: 24px;    /* ❌ No longer needed */
--shadow-xl: ...;              /* ❌ Was for frame shadow */
```

---

**End of Architect Deliverables**
