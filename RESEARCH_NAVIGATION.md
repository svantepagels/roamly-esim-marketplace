# RESEARCH NAVIGATION
## Quick Guide to RESEARCHER Deliverables

**Research Agent:** RESEARCHER  
**Task:** IPhoneFrame removal - industry research & best practices  
**Date:** April 14, 2026  
**Status:** ✅ COMPLETE

---

## 📚 Which Document Should I Read?

### For Stakeholders/Product Managers
👉 **Start here:** `RESEARCHER_EXECUTIVE_BRIEF.md` (7KB, 5 min read)
- Executive summary with risk assessment
- Critical findings requiring action
- Top 5 must-read industry sources
- Performance impact metrics

### For Developers (CODER Agent)
👉 **Start here:** `RESEARCHER_SUMMARY.md` (8KB, 5 min read)
- Quick reference with code examples
- Critical implementation details (dvh, safe-area, min-height)
- Testing recommendations
- Common pitfalls checklist

### For In-Depth Research
👉 **Full document:** `RESEARCHER_IPHONE_FRAME_REMOVAL.md` (28KB, 15 min read)
- 24 cited industry sources (2020-2026)
- Detailed best practices across 11 sections
- Complete testing strategies
- Performance considerations
- All source URLs with publication dates

---

## 📂 Research File Structure

```
roamly-fixed/
├── RESEARCHER_EXECUTIVE_BRIEF.md      ← Stakeholder summary (7KB)
├── RESEARCHER_SUMMARY.md              ← Developer quick reference (8KB)
├── RESEARCHER_IPHONE_FRAME_REMOVAL.md ← Full research (28KB)
└── RESEARCH_NAVIGATION.md             ← This file (navigation guide)
```

---

## 🎯 Key Research Findings (At-a-Glance)

### ✅ Validation
- ARCHITECT's plan matches 2024-2026 industry standards
- Flexbox layout is best practice for sticky header + scrollable content
- Removing device wrappers is industry consensus

### ⚠️ Critical Additions
1. **Use `100dvh` instead of `100vh`** (prevents mobile browser jank)
2. **Add safe-area insets** (prevents iPhone notch clipping)
3. **Add `min-height: 0` to flexbox child** (ensures correct scrolling)

### 🧪 Testing Priority
1. 🥇 Manual visual testing (real iOS device)
2. 🥈 Automated E2E (Playwright/Cypress)
3. 🥉 Unit tests (component rendering)

### 📊 Risk Level
🟢 **LOW** - Industry-standard refactoring, easy rollback

---

## 🔗 Related ARCHITECT Documents

These ARCHITECT deliverables work together with RESEARCHER findings:

| Document | Purpose | Use With |
|----------|---------|----------|
| `ARCHITECT_HANDOFF.md` | Architecture decisions | RESEARCHER_EXECUTIVE_BRIEF.md |
| `CODER_QUICK_START_IPHONE_REMOVAL.md` | Implementation guide | RESEARCHER_SUMMARY.md |
| `CODE_CHANGES_REQUIRED.md` | Exact code changes | RESEARCHER_IPHONE_FRAME_REMOVAL.md |
| `REMOVE_IPHONE_FRAME_SPEC.md` | Technical spec | RESEARCHER_IPHONE_FRAME_REMOVAL.md |

---

## 🚀 Workflow: How to Use Research

### For CODER Agent Implementation

```
Step 1: Read CODER_QUICK_START_IPHONE_REMOVAL.md (ARCHITECT)
        └─> Get implementation checklist

Step 2: Read RESEARCHER_SUMMARY.md (RESEARCHER)
        └─> Get critical implementation details (dvh, safe-area, min-height)

Step 3: Implement PageShell changes
        └─> Use code from CODER_QUICK_START + research additions

Step 4: Reference RESEARCHER_IPHONE_FRAME_REMOVAL.md if issues arise
        └─> Section 7: Common Pitfalls has solutions
```

### For Stakeholder Review

```
Step 1: Read RESEARCHER_EXECUTIVE_BRIEF.md
        └─> Get risk assessment and performance impact

Step 2: Review ARCHITECT_HANDOFF.md
        └─> Get architecture decisions

Step 3: Approve/reject based on LOW risk + HIGH benefit
```

---

## 📊 Research Metrics

**Sources analyzed:** 24 industry publications
- Publication range: 2020-2026
- Most recent: April 10, 2026 (4 days ago)
- Categories: Responsive design, flexbox, carousels, testing, anti-patterns

**Documents created:** 4 files (48KB total)
- Executive brief: 7KB
- Summary: 8KB
- Full research: 28KB
- Navigation: 5KB

**Git commits:** 3 commits
- Research document
- Summary
- Executive brief

---

## 🎓 Learn More (Top 5 External Sources)

If you want to dive deeper into the research sources:

1. **Mobile Viewport Units (100dvh)**  
   https://blog.openreplay.com/fix-100vh-mobile-viewport/  
   → Why `100vh` fails on mobile browsers

2. **Flexbox Sticky Headers**  
   https://www.bitovi.com/blog/use-flexbox-to-create-a-sticky-header-and-sidebar-with-flexible-content  
   → Exact pattern used in PageShell

3. **Responsive Design 2024**  
   https://whitelabeliq.medium.com/responsive-design-in-2024-best-practices-for-multi-device-compatibility-4c2909347356  
   → Industry consensus on mobile-first

4. **React Testing Responsive Components**  
   https://copyprogramming.com/howto/react-testing-library-rtl-test-a-responsive-design  
   → Testing strategies

5. **React Anti-Patterns**  
   https://itnext.io/6-common-react-anti-patterns-that-are-hurting-your-code-quality-904b9c32e933  
   → Wrapper component pitfalls

**All 24 sources documented in:** `RESEARCHER_IPHONE_FRAME_REMOVAL.md` (Section 11)

---

## 🐛 Troubleshooting: If Implementation Fails

**Problem:** Content shifts when scrolling on mobile  
**Solution:** Check you used `100dvh` (not `100vh`)  
**Reference:** RESEARCHER_SUMMARY.md, Section "Critical: Use 100dvh"

**Problem:** Content clips behind iPhone notch  
**Solution:** Check safe-area insets are added  
**Reference:** RESEARCHER_SUMMARY.md, Section "Critical: Safe-Area Insets"

**Problem:** Long pages don't scroll  
**Solution:** Check `.main` has `min-height: 0` and `overflow-y: auto`  
**Reference:** RESEARCHER_SUMMARY.md, Section "Critical: min-height"

**Problem:** Footer doesn't hide on /checkout  
**Solution:** Verify `useLocation()` logic was preserved  
**Reference:** RESEARCHER_IPHONE_FRAME_REMOVAL.md, Section 7.4

**Full troubleshooting guide:**  
`RESEARCHER_IPHONE_FRAME_REMOVAL.md` → Section 7: Common Pitfalls

---

## ✅ Completion Checklist

**Research deliverables:**
- [x] Full research document (28KB, 24 sources)
- [x] Executive brief for stakeholders
- [x] Quick reference for developers
- [x] Navigation guide (this file)
- [x] All committed to git

**Critical findings documented:**
- [x] Use `100dvh` instead of `100vh`
- [x] Add safe-area insets for iPhone
- [x] Add `min-height: 0` to flexbox child
- [x] Testing strategy (manual > E2E > unit)
- [x] Common pitfalls + solutions

**Next agent:**
- [ ] CODER implements changes
- [ ] TESTER validates deployment
- [ ] COORDINATOR reports completion

---

## 📞 Quick Reference

**When you need...**
| Need | Document | Section |
|------|----------|---------|
| **Quick summary** | RESEARCHER_SUMMARY.md | Full document |
| **Risk assessment** | RESEARCHER_EXECUTIVE_BRIEF.md | Risk Assessment |
| **Code examples** | RESEARCHER_SUMMARY.md | Code samples throughout |
| **Testing strategy** | RESEARCHER_IPHONE_FRAME_REMOVAL.md | Section 6 |
| **Pitfall solutions** | RESEARCHER_IPHONE_FRAME_REMOVAL.md | Section 7 |
| **Industry sources** | RESEARCHER_IPHONE_FRAME_REMOVAL.md | Section 11 |
| **Implementation checklist** | RESEARCHER_IPHONE_FRAME_REMOVAL.md | Section 9 |

---

**Questions?** All research is self-contained in this directory.  
**Ready to implement?** Start with `CODER_QUICK_START_IPHONE_REMOVAL.md` + `RESEARCHER_SUMMARY.md`

---

**RESEARCHER agent deliverables complete.** ✅  
**Total research: 4 documents, 48KB, 24 sources, 3 git commits** 📝
