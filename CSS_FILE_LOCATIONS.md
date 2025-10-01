# CSS File Locations - Quick Reference

This document provides a quick reference for all CSS files in the BabelPhish project.

## React Application

### Main Application Styles
**File**: `src/App.css`
**Size**: ~35KB
**Contains**:
- All component styles
- Theme CSS variables
- Layout and grid systems
- Cards, buttons, modals
- Sidebar and navigation
- Page-specific styles
- Hover actions and animations

### Global Styles
**File**: `src/index.css`
**Size**: ~700 bytes
**Contains**:
- HTML and body resets
- Base font settings
- Global box-sizing

### Component-Specific Styles
**File**: `src/components/FindAnswersPage.css`
**Size**: Small
**Contains**:
- Find Answers page specific styles
- Not used elsewhere

**File**: `src/components/PromptCatalogModal.css`
**Size**: Small
**Contains**:
- Prompt modal specific styles

## ServiceNow Application

### Complete Application Styles
**File**: `servicenow/babelphish_styles.css`
**Size**: 31KB (1548 lines)
**Contains**:
- ALL ServiceNow application styles
- Extracted from embedded `<style>` tag
- Identical structure to React `App.css`
- Theme CSS variables
- All component styles

### UI Pages (Reference Only - No Embedded CSS)
**File**: `servicenow/ui_page_babelphish_main.html`
**References**: `<g:inline src="babelphish_styles.css" />`
**Contains**: Only HTML structure, no CSS

**File**: `servicenow/ui_page_babelphish_login.html`
**Contains**: Login page HTML with minimal inline styles

## Theme Documentation

### Complete Theme Guide
**File**: `THEME_GUIDE.md`
**Location**: Project root
**Contains**:
- CSS architecture overview
- Complete color palette
- Typography specifications
- Logo and branding guidelines
- How to change themes
- Component styling guides
- Spacing system
- File reference summary

### ServiceNow CSS Management
**File**: `servicenow/CSS_README.md`
**Contains**:
- How to upload CSS to ServiceNow
- File structure documentation
- Troubleshooting guide
- Maintenance best practices

## Synchronization

Both React and ServiceNow CSS files should be kept in sync:

| React Files | ServiceNow Files |
|---|---|
| `src/App.css` | `servicenow/babelphish_styles.css` |
| `src/index.css` | (included in babelphish_styles.css) |

## CSS Variables Location

Theme variables (`:root`) are defined in:
- **React**: `src/App.css` (or `src/index.css`)
- **ServiceNow**: `servicenow/babelphish_styles.css`

## Key Variables

```css
--color-primary: #0ea5e9;              /* Sky Blue */
--color-primary-hover: #0284c7;        /* Darker Blue */
--color-sidebar-bg: #f8fafc;           /* Light Gray */
--color-sidebar-hover: #e2e8f0;        /* Medium Gray */
--color-sidebar-active: #dbeafe;       /* Light Blue */
--color-border: #e2e8f0;               /* Border Gray */
--color-text-primary: #1e293b;         /* Dark Slate */
--color-text-secondary: #64748b;       /* Medium Slate */
--color-bg-secondary: #f1f5f9;         /* Light Background */
--color-orange: #ff8c00;               /* Accent Orange */
```

## Quick Change Reference

### To Change Primary Color
1. Edit `:root` in both `src/App.css` and `servicenow/babelphish_styles.css`
2. Update `--color-primary` and `--color-primary-hover`
3. Search for `#0ea5e9` in SVG logo code and update

### To Change Accent Color
1. Edit `:root` in both CSS files
2. Update `--color-orange`
3. Search for `#ff8c00` and replace in button styles

### To Change Fonts
1. Update `font-family` in `body` selector in both CSS files
2. Ensure font is available (system font or imported)

## File Sizes

| File | Size | Lines |
|---|---|---|
| `src/App.css` | ~35KB | ~1000 |
| `src/index.css` | ~700B | ~20 |
| `servicenow/babelphish_styles.css` | ~31KB | ~1548 |
| `THEME_GUIDE.md` | ~15KB | ~400 |

## Best Practices

1. ✅ Always update both React and ServiceNow CSS files together
2. ✅ Use CSS variables instead of hardcoded colors
3. ✅ Test in both environments after changes
4. ✅ Document major changes in SYNC_STATUS.md
5. ✅ Keep this reference updated when adding new CSS files

## Need Help?

- **Theme customization**: See `THEME_GUIDE.md`
- **ServiceNow CSS upload**: See `servicenow/CSS_README.md`
- **Version history**: See `SYNC_STATUS.md`
- **General questions**: See `README.md`

---

**Last Updated**: v1.6.0 (2025-09-30)
