# OperatorCarousel Speed Increase - Technical Specification

**Project:** Roamly Fixed  
**Task:** Increase OperatorCarousel infinite scroll animation speed  
**Target File:** `src/components/domain/OperatorCarousel/OperatorCarousel.module.css`  
**Date:** 2026-04-14

---

## Current State Analysis

### Existing Animation Configuration

**File:** `src/components/domain/OperatorCarousel/OperatorCarousel.module.css`

Current animation durations:
- **Mobile (default):** 60s
- **Tablet (768px+):** 45s  
- **Desktop (1024px+):** 60s

**Animation Technique:**
- Uses CSS `@keyframes scroll` with `translateX(-50%)`
- Duplicate operator logos rendered twice in track
- `will-change: transform` for GPU acceleration ✅
- `linear` timing function for constant speed ✅
- Pause on hover with `animation-play-state` ✅

**Performance Optimizations (Already Present):**
- ✅ CSS transforms (not left/margin)
- ✅ GPU acceleration via will-change
- ✅ Linear timing for smooth motion
- ✅ No layout recalculations

---

## Objective

Speed up the carousel scroll animation by **70%** to create a more dynamic, engaging experience.

**Target Animation Durations:**
- **Mobile (default):** 18s (was 60s)
- **Tablet (768px+):** 14s (was 45s)
- **Desktop (1024px+):** 18s (was 60s)

**Rationale:**
- 18-20 seconds provides noticeable speed increase without causing blur
- Maintains readability of operator logos during scroll
- Creates more dynamic, engaging visual effect
- Shorter duration = more cycles per visit = better brand exposure

---

## Technical Implementation

### File to Modify

**Path:** `src/components/domain/OperatorCarousel/OperatorCarousel.module.css`

### Exact Changes Required

#### 1. Base Animation Speed (Mobile)

**Location:** Line 75 in `.track` class

**Current Code:**
```css
.track {
  display: flex;
  gap: var(--space-12);
  animation: scroll 60s linear infinite;
  will-change: transform;
}
```

**Updated Code:**
```css
.track {
  display: flex;
  gap: var(--space-12);
  animation: scroll 18s linear infinite;
  will-change: transform;
}
```

**Change:** `60s` → `18s`

---

#### 2. Tablet Animation Speed (768px+)

**Location:** Line 138 in tablet media query

**Current Code:**
```css
@media (min-width: 768px) {
  /* ... */
  .track {
    gap: var(--space-16);
    animation-duration: 45s;
  }
}
```

**Updated Code:**
```css
@media (min-width: 768px) {
  /* ... */
  .track {
    gap: var(--space-16);
    animation-duration: 14s;
  }
}
```

**Change:** `45s` → `14s`

---

#### 3. Desktop Animation Speed (1024px+)

**Location:** Line 163 in desktop media query

**Current Code:**
```css
@media (min-width: 1024px) {
  /* ... */
  .track {
    gap: var(--space-20);
    animation-duration: 60s;
  }
}
```

**Updated Code:**
```css
@media (min-width: 1024px) {
  /* ... */
  .track {
    gap: var(--space-20);
    animation-duration: 18s;
  }
}
```

**Change:** `60s` → `18s`

---

## Performance Validation

### GPU Acceleration Check

**Existing (Keep Intact):**
```css
.track {
  will-change: transform;  /* ✅ Forces GPU layer */
}

@keyframes scroll {
  0% {
    transform: translateX(0);  /* ✅ Uses transform, not left/margin */
  }
  100% {
    transform: translateX(-50%);
  }
}
```

**No changes needed** - already optimized for 60fps performance.

### Blur Prevention

At 18s duration:
- Scroll speed: ~55px/s (estimated based on viewport width)
- Logo height: 60px (mobile), 80px (tablet), 120px (desktop)
- **Result:** Speed is well below blur threshold (~200px/s)

**Validation:** Logos will remain sharp and readable during scroll.

---

## Testing Requirements

### Manual Test Checklist

#### Desktop (1024px+)
- [ ] Animation completes full cycle in ~18 seconds
- [ ] Logos remain sharp (no blur)
- [ ] Infinite loop is seamless (no jump)
- [ ] Pause on hover works correctly
- [ ] Fade gradients on edges remain smooth

#### Tablet (768px+)
- [ ] Animation completes full cycle in ~14 seconds
- [ ] Logos remain sharp at 80px height
- [ ] Responsive breakpoint transition is smooth

#### Mobile (390px viewport)
- [ ] Animation completes full cycle in ~18 seconds
- [ ] Logos readable at 60px height
- [ ] Performance smooth on mobile hardware (60fps)

### Performance Metrics

**Target FPS:** 60fps constant  
**Method:** Chrome DevTools → Performance → Record during scroll  
**Success Criteria:** No frame drops, smooth transform animation

---

## Deployment Checklist

### 1. Code Changes
- [ ] Modify `OperatorCarousel.module.css` with exact changes above
- [ ] Verify no syntax errors in CSS

### 2. Local Testing
```bash
cd /Users/administrator/.openclaw/workspace/roamly-fixed
npm run dev
```
- [ ] Test on localhost:5173
- [ ] Verify all three breakpoints (mobile, tablet, desktop)
- [ ] Check browser console for errors

### 3. Build Verification
```bash
npm run build
```
- [ ] Build completes without errors
- [ ] Production bundle size unchanged (CSS-only change)

### 4. Git Commit
```bash
git add src/components/domain/OperatorCarousel/OperatorCarousel.module.css
git commit -m "feat(carousel): increase scroll speed to 18s for more dynamic UX"
git push origin main
```

### 5. Vercel Deployment
```bash
vercel --prod --yes
```
- [ ] Wait for build completion
- [ ] Visit https://roamly-fixed.vercel.app
- [ ] Verify carousel speed on production

### 6. Visual Verification
- [ ] Capture video/GIF showing faster animation
- [ ] Compare side-by-side with previous speed (if possible)

---

## Files Modified

| File | Lines Changed | Description |
|------|---------------|-------------|
| `src/components/domain/OperatorCarousel/OperatorCarousel.module.css` | 3 | Animation duration reduced from 60s/45s/60s to 18s/14s/18s across breakpoints |

**Total Changes:** 1 file, 3 lines

---

## Expected Outcome

### Before
- Mobile: 60-second scroll cycle
- Tablet: 45-second scroll cycle
- Desktop: 60-second scroll cycle
- User perception: Slow, passive background element

### After
- Mobile: 18-second scroll cycle (**70% faster**)
- Tablet: 14-second scroll cycle (**69% faster**)
- Desktop: 18-second scroll cycle (**70% faster**)
- User perception: Dynamic, engaging, modern animation

**Impact:**
- More operator logos visible per visit (3x exposure)
- Increased visual energy on landing page
- Maintains premium, polished feel (no blur or jank)

---

## Rollback Plan

If animation is too fast or causes issues:

**Revert commit:**
```bash
git revert HEAD
git push origin main
vercel --prod --yes
```

**Alternative speeds to test:**
- Conservative: 25s (58% faster than original)
- Moderate: 18s (70% faster - recommended)
- Aggressive: 12s (80% faster - test carefully)

---

## Success Metrics

✅ Animation duration reduced to ~18 seconds  
✅ Logos remain sharp and readable  
✅ 60fps performance maintained  
✅ Infinite loop seamless  
✅ Hover pause functionality intact  
✅ Deployed to production without errors  

---

## Coder Instructions

1. **Navigate to project:**
   ```bash
   cd /Users/administrator/.openclaw/workspace/roamly-fixed
   ```

2. **Open file:**
   ```bash
   src/components/domain/OperatorCarousel/OperatorCarousel.module.css
   ```

3. **Make three precise edits:**
   - Line ~75: `60s` → `18s` (base mobile)
   - Line ~138: `45s` → `14s` (tablet)
   - Line ~163: `60s` → `18s` (desktop)

4. **Test locally:**
   ```bash
   npm run dev
   # Visit localhost:5173, verify speed increase
   ```

5. **Build and deploy:**
   ```bash
   npm run build
   git add .
   git commit -m "feat(carousel): increase scroll speed to 18s for more dynamic UX"
   git push origin main
   vercel --prod --yes
   ```

6. **Verify production:**
   - Visit https://roamly-fixed.vercel.app
   - Confirm faster animation
   - Report deployment URL + animation duration

---

**End of Specification**
