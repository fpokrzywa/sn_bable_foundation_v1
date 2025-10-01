# BabelPhish Styles CSS File

This file (`babelphish_styles.css`) contains all the styling for the BabelPhish ServiceNow application. It has been extracted from the HTML file to provide centralized theme management.

## File Purpose

This CSS file is referenced in the ServiceNow UI Page (`ui_page_babelphish_main.html`) using:

```xml
<g:inline src="babelphish_styles.css" />
```

## Uploading to ServiceNow

### Method 1: UI Action (Recommended)
1. Log into your ServiceNow instance
2. Navigate to **System UI > CSS Includes**
3. Click **New**
4. Fill in the form:
   - **Name**: `babelphish_styles`
   - **CSS**: Copy and paste the contents of `babelphish_styles.css`
   - **Active**: `true`
5. Click **Submit**

### Method 2: Update Set
If you're using an Update Set, the CSS file should be included automatically when you import the BabelPhish application components.

### Method 3: Via Studio
1. Open ServiceNow Studio
2. Navigate to **CSS Includes** in your application scope
3. Create or update the `babelphish_styles` record
4. Paste the CSS content
5. Save and commit

## What's Included

This CSS file contains:

### 1. Global Styles
- CSS reset
- Body and root styles
- Font family and smoothing

### 2. Theme Variables
```css
:root {
  --color-primary: #0ea5e9;
  --color-primary-hover: #0284c7;
  --color-sidebar-bg: #f8fafc;
  --color-sidebar-hover: #e2e8f0;
  --color-sidebar-active: #dbeafe;
  --color-border: #e2e8f0;
  --color-text-primary: #1e293b;
  --color-text-secondary: #64748b;
}
```

### 3. Component Styles
- Application layout (`.app`)
- Sidebar (`.sidebar`, `.sidebar-header`, `.sidebar-nav`)
- Navigation items (`.nav-item`, `.nav-subitems`)
- Page containers (`.page-container`)
- Welcome page (`.welcome-container`)
- AI Store (`.ai-store-page`, `.assistant-card`)
- Prompt Catalog (`.prompt-catalog-page`, `.prompt-card`)
- Find Answers (`.find-answers-layout`, `.chat-panel`)
- Modals (`.prompt-modal-overlay`, `.modal-overlay`)
- Forms and inputs
- Buttons and controls
- Cards and badges
- Hover actions for edit/delete

### 4. Responsive Behaviors
- Sidebar collapse/expand states
- Card hover effects
- Modal animations
- Interactive element transitions

## Customization

To customize the BabelPhish theme:

1. **Edit Colors**: Modify the CSS custom properties in `:root`
2. **Change Fonts**: Update the `font-family` in the `body` selector
3. **Adjust Spacing**: Modify padding and margin values
4. **Update Borders**: Change `border-radius` values

After making changes:
1. Update this file in ServiceNow (see "Uploading to ServiceNow" above)
2. Clear your browser cache
3. Refresh the BabelPhish page

## Synchronization with React App

This CSS file should be kept in sync with the React application styles located at:
- `src/App.css`
- `src/index.css`

Both applications should have identical styling to provide a consistent user experience.

## File Structure

The CSS is organized in the following order:

1. **Reset and Base Styles** (lines 1-20)
2. **CSS Custom Properties** (lines 21-40)
3. **Layout Styles** (lines 41-100)
4. **Sidebar Styles** (lines 101-250)
5. **Navigation Styles** (lines 251-350)
6. **Page-Specific Styles**:
   - Welcome Page (lines 351-450)
   - AI Store (lines 451-650)
   - Prompt Catalog (lines 651-850)
   - Find Answers (lines 851-1150)
7. **Modal Styles** (lines 1151-1350)
8. **Card and Component Styles** (lines 1351-1548)

## Version History

- **v1.6.0** (2025-09-30): Extracted CSS from HTML into separate file
- **v1.5.0** (2025-09-30): Added compact collapsed sidebar styles
- **v1.4.0** (2025-09-30): Added edit/delete hover actions and modals
- **v1.3.0** (2025-09-30): Added Prompt Catalog modal styles
- **v1.2.0** (2025-09-30): Updated Find Answers page styles
- **v1.1.0** (2025-09-29): Added AI Store and Prompt Catalog pages
- **v1.0.0** (2025-09-29): Initial version with base styles

## Troubleshooting

### Styles Not Applying
1. Verify the CSS file is uploaded to ServiceNow
2. Check that the UI Page references `babelphish_styles.css` correctly
3. Clear browser cache and hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
4. Ensure the CSS Include record is Active in ServiceNow

### CSS Conflicts
If you see styling issues:
1. Check for conflicting global styles in ServiceNow
2. Increase specificity of selectors if needed
3. Verify no other CSS files are overriding these styles

### Missing Styles
If some components don't appear styled:
1. Ensure you uploaded the complete file
2. Check the browser console for CSS loading errors
3. Verify the ServiceNow instance can access the CSS file

## Support

For questions or issues related to BabelPhish styling:
1. Refer to the main `THEME_GUIDE.md` in the project root
2. Check the `SYNC_STATUS.md` for version compatibility
3. Review the React app's `src/App.css` for comparison

## Maintenance

When updating styles:
1. **Always test** in both React and ServiceNow environments
2. **Document changes** in this file's version history
3. **Keep synchronized** with `src/App.css`
4. **Update** the `SYNC_STATUS.md` file
5. **Notify users** of any breaking changes

## Best Practices

1. ✅ Use CSS custom properties for colors and theme values
2. ✅ Keep class names semantic and consistent
3. ✅ Group related styles together
4. ✅ Add comments for complex styling
5. ✅ Test in multiple browsers
6. ✅ Maintain consistency with React app
7. ❌ Don't use inline styles in HTML
8. ❌ Don't hardcode color values (use variables)
9. ❌ Don't use `!important` unless absolutely necessary
