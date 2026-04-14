# Carousel Speed Increase - Quick Reference

**Task:** Speed up OperatorCarousel animation  
**File:** `src/components/domain/OperatorCarousel/OperatorCarousel.module.css`  
**Changes:** 3 lines

---

## Before & After

### Change 1: Mobile/Base Animation (Line ~75)

**BEFORE:**
```css
.track {
  display: flex;
  gap: var(--space-12);
  animation: scroll 60s linear infinite;  ← CHANGE THIS
  will-change: transform;
}
```

**AFTER:**
```css
.track {
  display: flex;
  gap: var(--space-12);
  animation: scroll 18s linear infinite;  ← 60s → 18s
  will-change: transform;
}
```

---

### Change 2: Tablet Animation (Line ~138)

**BEFORE:**
```css
@media (min-width: 768px) {
  .section {
    padding: var(--space-20) var(--space-6);
  }

  .title {
    font-size: var(--text-5xl);
  }

  .logo {
    height: 80px;
  }

  .track {
    gap: var(--space-16);
    animation-duration: 45s;  ← CHANGE THIS
  }
}
```

**AFTER:**
```css
@media (min-width: 768px) {
  .section {
    padding: var(--space-20) var(--space-6);
  }

  .title {
    font-size: var(--text-5xl);
  }

  .logo {
    height: 80px;
  }

  .track {
    gap: var(--space-16);
    animation-duration: 14s;  ← 45s → 14s
  }
}
```

---

### Change 3: Desktop Animation (Line ~163)

**BEFORE:**
```css
@media (min-width: 1024px) {
  .section {
    padding: var(--space-24) var(--space-8);
  }

  .title {
    font-size: var(--text-6xl);
  }

  .subtitle {
    font-size: var(--text-xl);
  }

  .logo {
    height: 120px;
  }

  .track {
    gap: var(--space-20);
    animation-duration: 60s;  ← CHANGE THIS
  }
}
```

**AFTER:**
```css
@media (min-width: 1024px) {
  .section {
    padding: var(--space-24) var(--space-8);
  }

  .title {
    font-size: var(--text-6xl);
  }

  .subtitle {
    font-size: var(--text-xl);
  }

  .logo {
    height: 120px;
  }

  .track {
    gap: var(--space-20);
    animation-duration: 18s;  ← 60s → 18s
  }
}
```

---

## Summary of Changes

| Location | Old Value | New Value | Speedup |
|----------|-----------|-----------|---------|
| Line ~75 (mobile) | `60s` | `18s` | 3.3x faster |
| Line ~138 (tablet) | `45s` | `14s` | 3.2x faster |
| Line ~163 (desktop) | `60s` | `18s` | 3.3x faster |

---

## One-Line Deploy

```bash
cd /Users/administrator/.openclaw/workspace/roamly-fixed && npm run build && git add . && git commit -m "feat(carousel): increase scroll speed to 18s for more dynamic UX" && git push origin main && vercel --prod --yes
```

---

## Visual Test

After deploying, visit https://roamly-fixed.vercel.app and:
1. Scroll to "Supported Networks" section
2. Time the carousel: Should complete full cycle in **~18 seconds**
3. Verify logos are sharp (no blur)
4. Hover over carousel: Should pause animation

**Expected:** Noticeably faster, more dynamic animation while remaining smooth and readable.

---

**That's it!** Three simple changes, massive UX improvement. 🚀
