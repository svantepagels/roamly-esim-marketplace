# Architecture Specification: Remove IPhoneFrame Wrapper

## Executive Summary

Remove the IPhoneFrame device wrapper from the Roamly application to create a clean, standard mobile-responsive layout. The current implementation wraps all pages in a 375px iPhone device frame with notch decoration and fixed dimensions. This should be replaced with a flexible, responsive layout that works naturally across all screen sizes.

## Current Architecture

### Component Hierarchy
```
App.tsx
  └── PageShell
       └── IPhoneFrame (header/footer/notch wrapper)
            └── AppRoutes
                 └── HomePage (and other pages)
                      └── OperatorCarousel
```

### Current Implementation Files
- **src/components/templates/PageShell/PageShell.tsx**: Wraps all pages with IPhoneFrame
- **src/components/templates/IPhoneFrame/IPhoneFrame.tsx**: Device frame template component
- **src/components/templates/IPhoneFrame/IPhoneFrame.module.css**: Frame-specific styles
- **src/app/App.tsx**: Root component that uses PageShell

### IPhoneFrame Constraints (TO BE REMOVED)
```css
/* Current frame constraints */
max-width: 375px (--frame-width)
max-height: 812px (--frame-max-height)
border-radius: 36px (--frame-border-radius)
box-shadow: var(--shadow-xl)
notch height: 24px (--frame-notch-height)
```

## Target Architecture

### New Component Hierarchy
```
App.tsx
  └── PageShell (NO IPhoneFrame wrapper)
       ├── Header (sticky)
       ├── Main content (scrollable)
       └── Footer (sticky, conditional)
            └── AppRoutes
                 └── HomePage (and other pages)
                      └── OperatorCarousel
```

### Design Requirements

#### 1. PageShell Component Specification

**File**: `src/components/templates/PageShell/PageShell.tsx`

**Interface**:
```typescript
interface PageShellProps {
  children: ReactNode;
}
```

**Behavior**:
- Render Header as sticky top navigation
- Render main content area with children (scrollable)
- Conditionally render Footer (hide on /checkout routes)
- NO device frame wrapper
- NO notch decoration
- NO fixed width/height constraints
- Use standard responsive layout patterns

**Implementation Details**:
```typescript
import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from '../../layout/Header/Header';
import { Footer } from '../../layout/Footer/Footer';
import styles from './PageShell.module.css';

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

#### 2. PageShell CSS Module Specification

**File**: `src/components/templates/PageShell/PageShell.module.css`

**Requirements**:
- Full viewport height layout
- Sticky header at top
- Scrollable main content area
- Sticky footer at bottom (when present)
- Responsive background color (fog/white)
- Support for smooth scrolling
- Proper z-index stacking

**Implementation**:
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

/* Optional: Add max-width constraint for very large screens */
@media (min-width: 1200px) {
  .shell {
    max-width: var(--max-width);
    margin: 0 auto;
    box-shadow: var(--shadow-sm);
  }
}
```

#### 3. Header Component Requirements

**File**: `src/components/layout/Header/Header.tsx` (verify existing implementation)

**Behavior**:
- Must use `position: sticky` with `top: 0`
- White background with bottom border
- Proper z-index for stacking above content
- Height: `var(--header-height)` (56px)
- Responsive logo/navigation layout

**Expected CSS** (verify in Header.module.css):
```css
.header {
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  background: var(--color-white);
  border-bottom: 1px solid var(--color-border);
  height: var(--header-height);
}
```

#### 4. Footer Component Requirements

**File**: `src/components/layout/Footer/Footer.tsx` (verify existing implementation)

**Behavior**:
- Must use `position: sticky` with `bottom: 0` OR static positioning
- White background with top border
- Proper z-index for stacking above content
- Min-height: `var(--mobile-nav-height)` (72px)
- Responsive layout for links/copyright

**Expected CSS** (verify in Footer.module.css):
```css
.footer {
  position: sticky;
  bottom: 0;
  z-index: var(--z-sticky);
  background: var(--color-white);
  border-top: 1px solid var(--color-border);
  min-height: var(--mobile-nav-height);
}
```

#### 5. OperatorCarousel Verification

**File**: `src/components/domain/OperatorCarousel/OperatorCarousel.tsx`

**Current Status**: Already independent component, NO changes needed

**Verification Required**:
- Component renders correctly without IPhoneFrame wrapper
- Infinite scroll animation works on standard layout
- Logos display in greyscale with correct sizing
- Mobile responsive (works at 390px viewport and larger)
- No IPhoneFrame-specific CSS dependencies

**Expected Behavior**:
```typescript
// Already implemented correctly as:
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
</section>
```

## Implementation Checklist

### Phase 1: Remove IPhoneFrame Wrapper

- [ ] **Modify PageShell.tsx**
  - Remove `import { IPhoneFrame } from '../IPhoneFrame'`
  - Remove `<IPhoneFrame>` wrapper
  - Add direct Header/Main/Footer structure
  - Import new `PageShell.module.css`

- [ ] **Create PageShell.module.css**
  - Implement flexible layout system
  - Support sticky header/footer
  - Scrollable main content area
  - Responsive breakpoints for large screens

### Phase 2: Verification

- [ ] **Check Header Component**
  - Verify sticky positioning
  - Verify white background + border
  - Verify z-index stacking

- [ ] **Check Footer Component**
  - Verify sticky positioning (or static if preferred)
  - Verify white background + border
  - Verify responsive layout

- [ ] **Check OperatorCarousel**
  - Verify rendering on HomePage
  - Verify infinite scroll animation
  - Verify greyscale logos
  - Verify mobile responsiveness

### Phase 3: Cleanup (Optional)

- [ ] **Remove IPhoneFrame files** (only if completely unused)
  - src/components/templates/IPhoneFrame/IPhoneFrame.tsx
  - src/components/templates/IPhoneFrame/IPhoneFrame.module.css
  - src/components/templates/IPhoneFrame/index.ts
  
  **WARNING**: Only delete if no other components import IPhoneFrame

- [ ] **Update design tokens** (optional)
  - Consider removing `--frame-width`, `--frame-max-height`, `--frame-border-radius`, `--frame-notch-height`
  - Only if these tokens are not used elsewhere

### Phase 4: Testing

- [ ] **Visual Testing**
  - Test on 375px viewport (iPhone SE)
  - Test on 390px viewport (iPhone 12/13/14)
  - Test on 428px viewport (iPhone Pro Max)
  - Test on tablet (768px+)
  - Test on desktop (1200px+)

- [ ] **Component Testing**
  - Homepage renders correctly
  - OperatorCarousel displays and scrolls
  - Header is sticky at top
  - Footer is sticky/static at bottom
  - Scrolling works smoothly

- [ ] **Route Testing**
  - / (HomePage) - shows footer
  - /destination/:slug - shows footer
  - /checkout - hides footer
  - /success - shows footer

### Phase 5: Deployment

- [ ] **Commit changes**
  ```bash
  git add src/components/templates/PageShell/
  git commit -m "refactor: remove IPhoneFrame wrapper for clean responsive layout"
  ```

- [ ] **Push to GitHub**
  ```bash
  git push origin main
  ```

- [ ] **Deploy to Vercel**
  ```bash
  vercel --prod --yes
  ```

- [ ] **Verify deployment**
  - Visit https://roamly-fixed.vercel.app
  - Test homepage rendering
  - Test carousel functionality
  - Test responsive breakpoints
  - Capture screenshot

## Expected Outcomes

### Before (Current State)
- Pages wrapped in 375px × 812px iPhone device frame
- Notch decoration at top
- Fixed width/height constraints
- Box shadow around entire frame
- Rounded corners (36px)
- Desktop users see "phone simulator" appearance

### After (Target State)
- Pages use full viewport width
- No device frame decoration
- No notch element
- Flexible responsive layout
- Natural mobile-first design
- Desktop users see clean full-width layout (with optional max-width constraint)

### Visual Comparison

**Current Layout Structure**:
```
┌─────────────────────────┐
│   ╭───────────╮         │  ← Notch decoration
│   ╰───────────╯         │
├─────────────────────────┤
│        Header           │  ← Inside frame (375px max)
├─────────────────────────┤
│                         │
│     HomePage            │  ← Content scrolls inside frame
│   OperatorCarousel      │
│                         │
├─────────────────────────┤
│        Footer           │  ← Inside frame
└─────────────────────────┘
  ← Box shadow, rounded corners, fixed 375px width
```

**Target Layout Structure**:
```
┌─────────────────────────┐
│        Header           │  ← Sticky, full viewport width
├─────────────────────────┤
│                         │
│     HomePage            │  ← Main content, responsive width
│   OperatorCarousel      │
│                         │
│                         │
├─────────────────────────┤
│        Footer           │  ← Sticky/static, full viewport width
└─────────────────────────┘
  ← No frame, no shadow, responsive layout
```

## Responsive Breakpoints

### Mobile (default)
- Width: 100vw
- Layout: Single column
- Header/Footer: Full width
- Content: Full width with container padding

### Tablet (768px+)
- Width: 100vw
- Layout: Single column with wider container
- Header/Footer: Full width
- Content: Centered with max-width

### Desktop (1200px+)
- Width: 100vw OR max-width: var(--max-width) with centering
- Layout: Single column, centered
- Header/Footer: Full width OR centered with content
- Content: Centered with max-width (1120px)

## Design Token Usage

### Keep These Tokens
```css
--max-width: 1120px;
--header-height: 56px;
--footer-height: 64px;
--mobile-nav-height: 72px;
--color-fog: (background color)
--color-white: (header/footer background)
--color-border: (header/footer borders)
--z-sticky: (stacking context)
--shadow-sm: (optional desktop shadow)
```

### Remove/Ignore These Tokens
```css
--frame-width: 375px; (not needed for responsive layout)
--frame-max-height: 812px; (not needed)
--frame-border-radius: 36px; (not needed)
--frame-notch-height: 24px; (not needed)
--shadow-xl: (was for frame shadow)
```

## Success Criteria

1. ✅ IPhoneFrame wrapper removed from PageShell
2. ✅ Header renders as sticky element at top
3. ✅ Main content scrolls naturally
4. ✅ Footer renders conditionally (hidden on /checkout)
5. ✅ OperatorCarousel displays correctly on HomePage
6. ✅ Infinite scroll animation works
7. ✅ Logos render in greyscale
8. ✅ Layout responsive from 375px to 1200px+
9. ✅ No visual regressions on other pages
10. ✅ Deployed successfully to Vercel

## Risk Mitigation

### Potential Issues

1. **Header/Footer not sticky**
   - Solution: Verify CSS uses `position: sticky` with correct `top/bottom` values
   - Fallback: Use `position: fixed` if sticky doesn't work in older browsers

2. **OperatorCarousel breaks**
   - Root cause: Unlikely, component is already independent
   - Solution: Verify CSS doesn't reference IPhoneFrame parent selectors
   - Test: Check carousel rendering and animation

3. **Layout shift on different viewports**
   - Solution: Test on multiple screen sizes
   - Add responsive breakpoints in PageShell.module.css
   - Use flexible units (%, vw, vh) instead of fixed px

4. **Z-index stacking issues**
   - Solution: Verify Header/Footer use `var(--z-sticky)`
   - Ensure OperatorCarousel doesn't override z-index
   - Check modal/overlay components don't conflict

5. **Background color inconsistencies**
   - Solution: Ensure PageShell uses `var(--color-fog)`
   - Ensure Header/Footer use `var(--color-white)`
   - Test in light/dark mode if applicable

## Timeline

- **Phase 1** (Remove wrapper): 15 minutes
- **Phase 2** (Verification): 10 minutes
- **Phase 3** (Cleanup): 5 minutes
- **Phase 4** (Testing): 15 minutes
- **Phase 5** (Deployment): 10 minutes

**Total estimated time**: ~55 minutes

## Next Steps for Coder Agent

1. Read this specification thoroughly
2. Navigate to project directory: `/Users/administrator/.openclaw/workspace/roamly-fixed`
3. Verify current state by examining PageShell.tsx
4. Implement changes according to Phase 1-3 checklist
5. Run local dev server to test changes: `npm run dev`
6. Verify all routes render correctly
7. Commit and deploy per Phase 5 checklist
8. Report completion with deployment URL and screenshot

## Notes

- The OperatorCarousel component is already correctly implemented without IPhoneFrame dependencies
- No changes needed to HomePage.tsx (it already renders carousel directly)
- Focus on PageShell refactoring only
- Keep Header and Footer components as-is (just verify sticky positioning)
- IPhoneFrame files can remain in codebase (don't delete unless certain no dependencies exist)
