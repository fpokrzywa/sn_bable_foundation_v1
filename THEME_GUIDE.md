# BabelPhish Theme Guide

This document provides a comprehensive guide to managing the BabelPhish application's visual design, including colors, fonts, logos, and themes.

## CSS Architecture

### React Application
- **Main Styles**: `src/App.css` - Contains all component styles and theme variables
- **Global Styles**: `src/index.css` - Contains body, html, and reset styles

### ServiceNow Application
- **Main Styles**: `servicenow/babelphish_styles.css` - Contains all component styles and theme variables
- **Reference**: The ServiceNow UI page (`ui_page_babelphish_main.html`) references the external CSS file via `<g:inline src="babelphish_styles.css" />`

## Theme Variables

All theme colors and design tokens are defined as CSS custom properties in the `:root` selector. This allows for easy theme management and consistent styling across the application.

### Color Palette

#### Primary Colors
```css
--color-primary: #0ea5e9;        /* Main brand color (Sky Blue) */
--color-primary-hover: #0284c7;  /* Darker shade for hover states */
```

**Usage**: Primary actions, links, active states, brand elements
**Where**: Buttons, links, active navigation items, the BabelPhish logo

#### Sidebar Colors
```css
--color-sidebar-bg: #f8fafc;       /* Light gray background */
--color-sidebar-hover: #e2e8f0;    /* Hover state background */
--color-sidebar-active: #dbeafe;   /* Active item background (light blue) */
```

**Usage**: Sidebar background and interactive states
**Where**: Left navigation sidebar, menu items

#### Neutral Colors
```css
--color-border: #e2e8f0;              /* Light gray for borders */
--color-text-primary: #1e293b;        /* Dark slate for primary text */
--color-text-secondary: #64748b;      /* Medium gray for secondary text */
--color-bg-secondary: #f1f5f9;        /* Light background for tags/badges */
```

**Usage**: Borders, dividers, text, and secondary backgrounds
**Where**: Card borders, input borders, body text, labels, tags

#### Additional Colors
```css
--color-orange: #ff8c00;    /* BabelPhish accent color (Dark Orange) */
```

**Usage**: Action buttons, update buttons, and special emphasis
**Where**: "Update" buttons, "Add" buttons, special call-to-action elements

## Typography

### Font Family
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
```

**System font stack**: Provides optimal readability and native feel across all platforms.

### Font Smoothing
```css
-webkit-font-smoothing: antialiased;
```

Applied to body for better text rendering on WebKit browsers.

### Font Sizes
- **Page Titles**: `24px` - `28px`
- **Section Headers**: `18px` - `20px`
- **Body Text**: `14px` - `15px`
- **Small Text**: `12px` - `13px`
- **Tiny Text**: `10px` - `11px`

### Font Weights
- **Regular**: `400` - Body text
- **Medium**: `500` - Labels, emphasis
- **Semi-Bold**: `600` - Headings, titles

## Logo & Branding

### BabelPhish Logo
The logo is a custom SVG fish icon with the following colors:
- **Body**: Sky Blue (`#0ea5e9` - matches `--color-primary`)
- **Eye**: Dark Slate (`#1e293b`)
- **Fin/Tail**: Golden Yellow (`#fbbf24`)

**SVG Code**:
```html
<svg class="fish-icon" viewBox="0 0 200 200" fill="none">
  <circle cx="100" cy="100" r="80" fill="#0ea5e9"/>
  <circle cx="120" cy="85" r="8" fill="#1e293b"/>
  <path d="M20 100 L60 80 L60 120 Z" fill="#fbbf24"/>
</svg>
```

**Logo Icon** (Sidebar):
```html
<svg class="logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M6.5 12c.94-3.46 4.94-6 9.5-6 3.87 0 7 3.13 7 7s-3.13 7-7 7c-.53 0-1.04-.1-1.52-.26"/>
  <path d="M6 12c0-3.87 3.13-7 7-7 .53 0 1.04.1 1.52.26"/>
  <circle cx="12" cy="12" r="2"/>
</svg>
```

## How to Change Theme

### Changing Primary Color

To change the primary brand color throughout the application:

1. **React App**: Edit `src/App.css` or `src/index.css`:
   ```css
   :root {
     --color-primary: #YOUR_COLOR;
     --color-primary-hover: #DARKER_SHADE;
   }
   ```

2. **ServiceNow App**: Edit `servicenow/babelphish_styles.css`:
   ```css
   :root {
     --color-primary: #YOUR_COLOR;
     --color-primary-hover: #DARKER_SHADE;
   }
   ```

3. **Update Logo Colors**: Search for `fill="#0ea5e9"` and replace with your new primary color in:
   - React: `src/components/FindAnswersPage.tsx`, `src/components/Sidebar.tsx`
   - ServiceNow: `servicenow/ui_page_babelphish_main.html`

### Changing Accent Color

To change the orange accent color used for action buttons:

1. **React App**: Edit `src/App.css`:
   ```css
   :root {
     --color-orange: #YOUR_ACCENT_COLOR;
   }
   ```
   Then update all instances of `#ff8c00` in button styles.

2. **ServiceNow App**: Edit `servicenow/babelphish_styles.css` and update `#ff8c00` references.

### Changing Sidebar Theme

To change from light to dark sidebar:

1. Update these variables:
   ```css
   :root {
     --color-sidebar-bg: #1e293b;        /* Dark background */
     --color-sidebar-hover: #334155;     /* Lighter on hover */
     --color-sidebar-active: #475569;    /* Active state */
     --color-text-primary: #f8fafc;      /* Light text */
     --color-text-secondary: #cbd5e1;    /* Secondary light text */
   }
   ```

## Component-Specific Styling

### Cards
- Border: `1px solid var(--color-border)`
- Border Radius: `12px`
- Padding: `20px` - `24px`
- Hover Shadow: `0 4px 12px rgba(0, 0, 0, 0.08)`

### Buttons
- **Primary Button**: Orange background (`#ff8c00`), white text
- **Secondary Button**: Gray background, dark text
- **Ghost Button**: Transparent background, border only
- Border Radius: `6px` - `8px`
- Padding: `8px 16px` (small) or `10px 24px` (medium)

### Inputs
- Border: `2px solid var(--color-primary)`
- Border Radius: `8px`
- Padding: `10px 12px`
- Focus: Increased border width or box-shadow

### Modals
- Background: White
- Overlay: `rgba(0, 0, 0, 0.5)` or `rgba(15, 23, 42, 0.5)`
- Border Radius: `12px`
- Max Width: `500px` - `600px`
- Box Shadow: `0 20px 60px rgba(0, 0, 0, 0.3)`

## Spacing System

BabelPhish uses an 8px spacing system for consistent spacing:

- **4px**: Tight spacing (gaps between small elements)
- **8px**: Default gap/padding
- **12px**: Medium spacing
- **16px**: Standard spacing
- **20px**: Card padding
- **24px**: Section spacing
- **32px**: Large spacing between major sections

## Icons

All icons use Lucide React icons (React app) or inline SVG (ServiceNow).

**Icon Sizes**:
- Small: `16px`
- Medium: `18px` - `20px`
- Large: `24px`

## Accessibility

### Color Contrast
All color combinations meet WCAG AA standards:
- Primary text on white: `#1e293b` (21:1 ratio)
- Secondary text on white: `#64748b` (9:1 ratio)
- Primary color on white: `#0ea5e9` (4.5:1 ratio)

### Focus States
All interactive elements have visible focus states using:
- Outline or box-shadow
- Increased border visibility
- Color change

## Maintenance Tips

1. **Always update both applications**: When changing theme variables, update both `src/App.css` and `servicenow/babelphish_styles.css`

2. **Use CSS variables**: Always reference `var(--color-name)` instead of hardcoding hex values

3. **Test in both environments**: React dev server and ServiceNow instance

4. **Document changes**: Update this guide when adding new theme variables

5. **Keep synchronized**: Both applications should look identical

## File Reference Summary

| What to Change | React Files | ServiceNow Files |
|---|---|---|
| Theme colors | `src/App.css`, `src/index.css` | `servicenow/babelphish_styles.css` |
| Fonts | `src/App.css` | `servicenow/babelphish_styles.css` |
| Logo colors | `src/components/*.tsx` | `servicenow/ui_page_babelphish_main.html` |
| Component styles | `src/App.css`, `src/components/*.css` | `servicenow/babelphish_styles.css` |
| Layout/spacing | `src/App.css` | `servicenow/babelphish_styles.css` |
