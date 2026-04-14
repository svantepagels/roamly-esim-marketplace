# RESEARCHER Quick Reference - Key Findings & Recommendations

**For CODER Agent** | **Updated**: 2026-04-14

---

## 🎯 TL;DR - What You Need to Know

✅ **ARCHITECT spec is excellent** - validated against industry best practices  
✅ **No major changes needed** - proceed with implementation as planned  
🔧 **Optional enhancements documented** - add if time permits  

---

## 📚 Documentation Reading Order

1. **START HERE**: `REBRAND_ARCHITECTURE.md` (primary technical spec)
2. **FOLLOW THIS**: `IMPLEMENTATION_CHECKLIST.md` (step-by-step tasks)
3. **REFERENCE**: `RESEARCH_REPORT.md` (validation + enhancements)
4. **VISUAL AID**: `VISUAL_REFERENCE.md` (before/after mockups)

---

## ✅ Validated Design Decisions

| Decision | Status | Research Source |
|----------|--------|-----------------|
| CSS custom properties for tokens | ✅ Perfect | Penpot, Digital Applied |
| Poppins (headings) + Inter (body) | ✅ Good | FontDiff, ALF Design Group |
| lucide-react icons (inline SVG) | ✅ Perfect | No changes needed |
| Atomic design structure | ✅ Best practice | GitHub examples |
| IPhoneFrame three-zone layout | ✅ Optimal | React pattern research |
| Playwright visual testing | ✅ Industry standard | Playwright docs |

---

## 🔧 Quick Enhancements (Copy-Paste Ready)

### 1. Font Preloading (Performance)

**Add to `index.html` `<head>`**:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```

### 2. CSS Variable Fallbacks (Safety)

**Add to all critical styles**:
```css
.button {
  background: var(--color-primary, #FF6B35); /* ← Fallback */
  color: var(--color-white, #FFFFFF);
}
```

### 3. Focus Visible Styles (Accessibility)

**Add to `rebtel-tokens.css`**:
```css
:root {
  --focus-ring: 2px solid var(--color-primary);
  --focus-ring-offset: 2px;
}
```

**Apply globally in `global.css`**:
```css
*:focus-visible {
  outline: var(--focus-ring);
  outline-offset: var(--focus-ring-offset);
}
```

### 4. Safe Area Insets (iPhone X+ Support)

**Add to `IPhoneFrame.module.css`**:
```css
.frame {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
}
```

### 5. Performance Optimization

**Add to card/container components**:
```css
.card {
  contain: layout style paint; /* CSS containment */
}

.content {
  will-change: scroll-position;
  -webkit-overflow-scrolling: touch; /* iOS momentum */
}
```

---

## 🎨 Typography Edge Cases

### If Poppins Looks "Cartoonish" (Post-Launch)

**Option A**: Use Inter for everything
```css
--font-display: 'Inter', sans-serif; /* font-weight: 700-900 for headings */
--font-sans: 'Inter', sans-serif;
```

**Option B**: Try DM Sans for headings
```css
--font-display: 'DM Sans', sans-serif;
--font-sans: 'Inter', sans-serif;
```

Update Google Fonts import:
```html
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```

---

## 🧪 Testing Enhancements

### Playwright Visual Regression (Recommended)

**Create `tests/visual/rebrand.spec.ts`**:

```typescript
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await page.evaluate(() => document.fonts.ready); // Wait for fonts
});

test('Orange primary color visible', async ({ page }) => {
  await page.click('text=United States');
  
  const primaryButton = page.locator('button.primary').first();
  await expect(primaryButton).toHaveCSS('background-color', 'rgb(255, 107, 53)');
  
  await expect(page).toHaveScreenshot('plan-selection-orange.png');
});

test('IPhoneFrame three-zone layout', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  
  const header = page.locator('header');
  await expect(header).toHaveCSS('position', 'sticky');
  
  await expect(page).toHaveScreenshot('mobile-layout.png');
});
```

**Run tests**:
```bash
npx playwright test --update-snapshots  # First run (create baselines)
npx playwright test                     # Subsequent runs (compare)
```

---

## 🚨 Color Contrast Warning

**Orange (#FF6B35) on white fails WCAG AA for small text**

**Fix**: Use darker orange for text links

```css
.link {
  color: var(--color-primary-dark); /* #E85A28 - better contrast */
}

.button.primary {
  background: var(--color-primary); /* ✅ White text is fine */
  color: var(--color-white);
}
```

---

## 📦 Deployment Checklist

```bash
# 1. Build locally
npm run build
npm run preview

# 2. Commit
git add .
git commit -m "feat: rebtel design system implementation"
git push origin main

# 3. Deploy
vercel --prod --yes

# 4. Visual verification
# - Open https://app-azure-sigma-98.vercel.app
# - Test in iPhone viewport (375px width)
# - Verify orange (#FF6B35) throughout
# - Test all pages (Home → Select → Cart → Checkout → Success)
```

---

## 🔍 Color Transformation Quick Reference

| Old Token | New Token | Hex Value |
|-----------|-----------|-----------|
| `--color-teal` | `--color-primary` | `#FF6B35` |
| `--color-teal-dark` | `--color-primary-dark` | `#E85A28` |
| `--color-teal-light` | `--color-primary-light` | `#FFF3EF` |

**Find & Replace**:
```bash
# In all .css files
--color-teal-dark  →  --color-primary-dark
--color-teal-light →  --color-primary-light
--color-teal       →  --color-primary
```

---

## 📊 Implementation Metrics

- **Components to update**: 21 total
- **CSS files affected**: ~30 files
- **Color token replacements**: 26 instances
- **Estimated time**: 17-24 hours (ARCHITECT estimate)
- **Testing time**: +4-6 hours (if adding Playwright tests)

---

## 🎯 Success Criteria Checklist

- [ ] All components use `rebtel-tokens.css`
- [ ] Primary color is `#FF6B35` throughout
- [ ] IPhoneFrame wraps all pages (three-zone layout)
- [ ] Typography is Poppins (headings) + Inter (body)
- [ ] All existing functionality works (plan selection, checkout)
- [ ] Playwright visual tests pass
- [ ] Manual testing checklist complete
- [ ] Deployed to Vercel production
- [ ] Visual verification in real iPhone (not just dev tools)

---

## 🚀 Start Implementation

```bash
cd /Users/administrator/.openclaw/workspace/roamly-fixed
git checkout -b feat/rebtel-design-system
npm run dev

# Open IMPLEMENTATION_CHECKLIST.md
# Start with Phase 1: Foundation
```

---

## 📞 If You Get Stuck

1. **Check**: `REBRAND_ARCHITECTURE.md` (Section X for detailed code)
2. **Search**: `RESEARCH_REPORT.md` (Section Y for best practices)
3. **Visual**: `VISUAL_REFERENCE.md` (Before/after comparisons)
4. **Ask**: COORDINATOR agent if critical decision needed

---

**Research validated** ✅  
**Ready for implementation** ✅  
**All resources prepared** ✅

**Good luck!** 🚀
