# BabelPhish Application Synchronization Status

This document tracks the synchronization status between the React application and the ServiceNow scoped application.

## Last Updated
2025-10-01

## Current Synchronization Status: ⚠️ REQUIRES MANUAL UPDATE

The React application is at v1.12.0. The ServiceNow application requires manual updates to reach parity. Detailed update instructions have been provided in `/servicenow/SERVICENOW_UPDATE_INSTRUCTIONS.md`.

---

## Feature Comparison Matrix

| Feature | React App | ServiceNow App | Status |
|---------|-----------|----------------|---------|
| **Login Page** | ✅ | ✅ | Synced |
| **Sidebar Navigation** | ✅ | ✅ | Synced |
| **Main Workspace** | ✅ | ✅ | Synced |
| **AI Store** | ✅ | ✅ | Synced |
| - Dropdown Filters (All, Recently Added, Name A-Z, Name Z-A, Favorites) | ✅ | ✅ | Synced |
| - Dynamic Search | ✅ | ✅ | Synced |
| - Favorite Assistants | ✅ | ✅ | Synced |
| - Assistant Count Display | ✅ | ✅ | Synced |
| **Prompt Catalog** | ✅ | ✅ | Synced |
| - Common Prompts Tab | ✅ | ✅ | Synced |
| - Favorite Prompts Tab (Dynamic) | ✅ | ✅ | Synced |
| - Favorite Toggle Functionality | ✅ | ✅ | Synced |
| - Filter Dropdowns (Assistant, Task, Functional Area) | ✅ | ✅ | Synced |
| **Find Answers Pages** | ✅ | ✅ | Synced |
| - Three-Panel Layout | ✅ | ✅ | Synced |
| - Center Panel (Knowledge Base Articles) | ✅ | ✅ | Synced |
| - Right Chat Panel (ODIN) | ✅ | ✅ | Synced |
| - Close Center Panel Functionality | ✅ | ✅ | Synced |
| - Dynamic Content Loading by Category | ✅ | ✅ | Synced |
| - IT Support Guides | ✅ | ✅ | Synced |
| - My Support Guides | ✅ | ✅ | Synced |
| - HR Policies | ✅ | ✅ | Synced |
| - NIEA Guides | ✅ | ✅ | Synced |
| - ADEPT Guides | ✅ | ✅ | Synced |
| - Freddie is IT | ✅ | ✅ | Synced |
| - Expandable Debug Information | ✅ | ✅ | Synced |
| - Center Panel Reopens on Category Change | ✅ | ✅ | Synced |
| **User Management** | ✅ | ✅ | Synced |
| **Role Management** | ✅ | ✅ | Synced |
| **Profile & Settings** | ✅ | ✅ | Synced |

---

## Technical Implementation Details

### React Application
- **Location**: `/src/components/`
- **Framework**: React 19.1.1 with TypeScript
- **Build Tool**: Vite 7.1.7
- **State Management**: React useState hooks
- **Styling**: CSS modules

### ServiceNow Application
- **Location**: `/servicenow/ui_page_babelphish_main.html`
- **Implementation**: Single-page Jelly application
- **JavaScript**: Vanilla ES5 for compatibility
- **Styling**: Embedded CSS in style tags
- **State Management**: Global variables and DOM manipulation

---

## Key Components Synchronized

### 1. AI Store Page
Both implementations include:
- 4 sample assistants (ODIN, Prompt Architect, Code Review Assistant, Content Writer)
- Dropdown filter with 5 options: All, Recently Added, Name A-Z, Name Z-A, Favorites
- Real-time search filtering as user types
- Favorite/unfavorite toggle with heart icon
- Dynamic assistant count updates
- Refresh functionality

### 2. Prompt Catalog Page
Both implementations include:
- Two-tab system: "Common Prompts" and "Favorite Prompts"
- Favorites tab appears dynamically when first prompt is favorited
- Favorites tab disappears when last favorite is removed
- Auto-switch to Common tab when last favorite is removed
- 4 sample prompts
- Filter dropdowns for Assistant, Task, and Functional Area
- Search functionality
- Heart icon toggle for favoriting

### 3. Find Answers Pages
Both implementations include:
- Three-panel layout (Sidebar, Center Panel, Chat Panel)
- Center panel with:
  - Category-specific title and description
  - Info box with "Try it yourself!" message
  - List of relevant articles
  - Refresh button
  - Close button (X)
  - **Expandable Debug Information section** (NEW)
    - Toggles open/closed on click
    - Shows category-specific debug data
    - Displays: Section ID, Assistant ID, Data status, Title, Article count, etc.
- Right chat panel with:
  - ODIN branding with purple gradient icon
  - Model selector (GPT-4o, GPT-4, GPT-3.5)
  - Prompts and Clear buttons
  - Message input with paperclip icon
  - Send button
  - Search type options (Web Search, Research, Help me with this)
- Six categories with unique content:
  - IT Support Guides (3 articles)
  - My Support Guides (2 articles)
  - HR Policies (3 articles)
  - NIEA Guides (2 articles)
  - ADEPT Guides (2 articles)
  - Freddie is IT (2 articles)
- **Center panel closes and chat expands to full width when X is clicked**
- **Center panel automatically reopens when user clicks a different Find Answers menu item** (NEW)

---

## Design Consistency

Both applications share:
- **Color Scheme**:
  - Primary: #0ea5e9 (Sky Blue)
  - Sidebar Background: #f8fafc
  - Border: #e2e8f0
  - Text Primary: #1e293b
  - Text Secondary: #64748b
  - Success: #10b981
  - Warning: #f59e0b

- **Typography**:
  - Font Family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto
  - Page Titles: 28px, 600 weight
  - Section Headings: 18px, 600 weight
  - Body Text: 14-15px, 400 weight

- **Spacing System**:
  - Base unit: 8px
  - Common gaps: 8px, 12px, 16px, 20px, 24px, 32px

- **Border Radius**:
  - Buttons: 6-8px
  - Cards: 12px
  - Input fields: 8px
  - Pills/Badges: 6px

---

## Navigation Structure (Identical in Both Apps)

```
BabelPhish
├── AI Tools
│   ├── AI Store
│   └── Prompt Catalog
├── Workspace
│   ├── Main Workspace
│   ├── My Changes
│   ├── Incidents
│   └── Bable
├── User
│   └── Profile & Settings
├── Find Answers
│   ├── IT Support Guides
│   ├── My Support Guides
│   ├── HR Policies
│   ├── NIEA Guides
│   ├── ADEPT Guides
│   └── Freddie is IT
└── Administration
    ├── User Management
    ├── Role Management
    └── Company Management
```

---

## Future Synchronization Protocol

**CRITICAL**: Going forward, all changes made to either application MUST be synchronized to the other.

### Process for Making Changes:

1. **Before Making Changes**:
   - Identify which application is being modified
   - Note all components/pages affected

2. **During Implementation**:
   - Implement changes in primary application
   - Test functionality

3. **After Implementation**:
   - Immediately sync changes to the other application
   - Adapt code for platform differences (React vs Vanilla JS)
   - Test both applications
   - Update this SYNC_STATUS.md document

4. **Build & Verify**:
   - Run `npm run build` to verify React app
   - Manually verify ServiceNow UI page loads correctly
   - Check that all features work in both environments

### Platform-Specific Adaptations:

**React → ServiceNow**:
- Convert JSX to HTML strings
- Replace useState/useEffect with global variables and event listeners
- Convert arrow functions to function declarations
- Replace map/filter with forEach loops
- Adapt imports to inline implementations

**ServiceNow → React**:
- Convert HTML strings to JSX
- Replace global variables with useState
- Convert function declarations to arrow functions
- Replace forEach with map/filter where appropriate
- Split inline code into separate components/modules

---

## Version History

### v1.13.0 (2025-10-01)
- **STATUS**: ServiceNow Update Required
  - Created detailed update instructions in `SERVICENOW_UPDATE_INSTRUCTIONS.md`
  - ServiceNow application needs manual updates to match React v1.12.0
  - Key missing features in ServiceNow:
    - Collapsed sidebar with click-to-open flyout menus
    - Toggle button icon changes (PanelLeftClose ⟷ PanelLeftOpen)
    - Tooltips on collapsed menu items
    - State management for collapsed menus
    - App container padding adjustment when sidebar collapsed
  - CSS styles are already in sync via `babelphish_styles.css`
  - JavaScript and HTML structure updates documented for manual application
  - **React Application**: Fully up to date at v1.12.0
  - **ServiceNow Application**: Requires updates per instruction document

### v1.12.0 (2025-10-01)
- **NEW**: Light Borderless Loading Overlay
  - Loading overlay now has light, semi-opaque background (rgba(240, 245, 250, 0.85))
  - Increased blur effect (12px) for frosted glass appearance
  - Removed white container background, border, padding, and shadow from loading container
  - Spinner and text now appear directly on blurred background
  - No visible edges or card-like borders
  - Clean, minimal loading experience matching modern design patterns
  - **React Application**: Fully implemented
  - **ServiceNow Application**: CSS styles synchronized in babelphish_styles.css

### v1.11.0 (2025-09-30)
- **NEW**: Click-to-Open Flyout Menus for Collapsed Sidebar
  - Changed submenu behavior from hover to click for better control
  - **Workspace Menu**: Click icon to open/close flyout with 4 options
  - **Find Answers Menu**: Click icon to open/close flyout with 6 options
  - Direct navigation items unchanged:
    - AI Store: Click to navigate directly
    - Prompt Catalog: Click to navigate directly
  - Click behavior:
    - Click parent icon → Toggle submenu open/closed
    - Click submenu item → Navigate to page and close menu
    - Click parent icon again → Close submenu
  - State management:
    - `collapsedWorkspaceOpen` tracks Workspace submenu
    - `collapsedFindAnswersOpen` tracks Find Answers submenu
    - Each menu can be opened/closed independently
  - Animation:
    - Smooth slide-in animation with `slideIn` keyframe
    - 200ms ease transition
    - Slides from left with opacity fade
  - UI matches expanded sidebar behavior but in flyout form
  - **React Application**: Click-to-open implemented
  - **ServiceNow Application**: CSS styles synchronized

### v1.10.0 (2025-09-30)
- **NEW**: Hover-to-Show Submenus with Proper Content Padding (Deprecated - See v1.11.0)
  - Main content now respects collapsed sidebar with 76px left padding
  - Nothing appears underneath the floating collapsed sidebar
  - Submenu behavior updated:
    - **Hover to show**: Move mouse over icon to reveal submenu
    - **Click to navigate**: Click submenu items to navigate to pages
    - No more click-to-toggle on parent icons
  - Workspace submenu (hover to show):
    - Main Workspace
    - My Changes
    - Incidents
    - Bable
  - Find Answers submenu (hover to show):
    - IT Support Guides
    - My Support Guides
    - HR Policies
    - NIEA Guides
    - ADEPT Guides
    - Freddie is IT
  - Layout improvements:
    - App container gets `.sidebar-collapsed` class when sidebar collapses
    - Main content width: 100% with proper box-sizing
    - 76px left padding when sidebar is collapsed (52px sidebar + 24px spacing)
  - Z-index hierarchy:
    - Collapsed sidebar: 1001
    - Floating submenus: 1000
  - CSS updates:
    - Submenus hidden by default with `display: none`
    - `.collapsed-menu-wrapper:hover .collapsed-submenu` shows on hover
    - Smooth transitions maintained
  - Component architecture:
    - Sidebar passes collapsed state to App via callback
    - App applies appropriate class to container
    - Proper state management for UI responsiveness
  - **React Application**: Fully implemented with hover behavior
  - **ServiceNow Application**: CSS styles synchronized

### v1.9.0 (2025-09-30)
- **NEW**: Centered Floating Collapsed Sidebar with No Scrollbars
  - Collapsed sidebar now floats in center of screen (vertically centered)
  - Positioned 12px from left edge with elegant floating effect
  - No scrollbars anywhere in the application
  - Clean, minimal aesthetic with hidden overflow
  - Collapsed sidebar features:
    - Fixed positioning with `position: fixed`
    - Vertically centered with `top: 50%` and `transform: translateY(-50%)`
    - 16px border radius for modern floating appearance
    - Subtle box shadow for depth
    - Max height of `calc(100vh - 48px)` to prevent overflow
    - Auto-adjusts height based on content
  - Responsive design:
    - Mobile (< 768px): Adjusts positioning and spacing
    - Small screens (< 480px): Reduces width to 48px
    - Tall screens (> 900px): Max height capped at 600px
    - Short screens (< 600px): Adjusts centering logic
  - Scrollbar styling (when needed):
    - Thin 6px width scrollbars
    - Transparent track
    - Semi-transparent thumb with hover state
    - Visible only in expanded sidebar
  - Body and app container:
    - `overflow: hidden` prevents page scrolling
    - `max-height: 100vh` maintains viewport constraint
  - Collapsed sidebar overflow set to `visible` for floating menus
  - Smooth transitions on all positioning changes
  - **React Application**: Fully implemented and tested
  - **ServiceNow Application**: CSS styles synchronized

### v1.8.0 (2025-09-30)
- **NEW**: Floating Context Menus for Collapsed Sidebar
  - Click on collapsed menu items to open floating context menus
  - Beautiful floating panels appear to the right of collapsed icons
  - Multi-item sections (Workspace, Find Answers) show all sub-options
  - White background with subtle shadow and border
  - Smooth slide-in animation from left
  - Click outside or select an item to close the menu
  - **Workspace menu** shows:
    - Main Workspace
    - My Changes
    - Incidents
    - Bable
  - **Find Answers menu** shows:
    - IT Support Guides
    - My Support Guides
    - HR Policies
    - NIEA Guides
    - ADEPT Guides
    - Freddie is IT
  - Tooltips still show on hover for quick reference
  - Single-item sections (AI Store, Prompt Catalog) navigate directly
  - Menu positioning automatically adjusts to icon location
  - Consistent styling with main application design
  - 12px border radius for modern look
  - Icon + text layout matching expanded sidebar
  - Hover states on all menu items
  - **React Application**: Fully implemented with state management
  - **ServiceNow Application**: CSS styles added (JavaScript pending)

### v1.7.0 (2025-09-30)
- **NEW**: Enhanced Collapsed Sidebar with Tooltips
  - Added tooltips on hover for all collapsed menu items
  - Tooltip shows full name of menu item when sidebar is collapsed
  - Dark background tooltip with white text for excellent visibility
  - Smooth fade-in animation on hover
  - Simplified collapsed menu structure:
    - Expand/Collapse toggle button
    - AI Store (direct link)
    - Prompt Catalog (direct link)
    - Workspace (click opens floating menu)
    - Find Answers (click opens floating menu)
    - Logout button
  - Toggle button icon changes: PanelLeftClose (expanded) to PanelLeftOpen (collapsed)
  - All tooltips positioned to the right of icons with consistent styling
  - **React Application**: Fully implemented
  - **ServiceNow Application**: CSS tooltip styles added (JavaScript updates pending)
  - No nested menus shown when collapsed - only top-level actions
  - Clean, intuitive navigation that respects minimal space usage

### v1.6.0 (2025-09-30)
- **NEW**: Centralized CSS Management
  - Extracted all embedded CSS from ServiceNow HTML into separate file `babelphish_styles.css`
  - Created comprehensive `THEME_GUIDE.md` documenting all theme variables, colors, fonts, and logos
  - Created `servicenow/CSS_README.md` with instructions for uploading and managing CSS in ServiceNow
  - Both React and ServiceNow apps now use external CSS files for centralized theme management
  - Single source of truth for all design tokens and styling
  - **React Application**:
    - `src/App.css` - Main component styles
    - `src/index.css` - Global styles
  - **ServiceNow Application**:
    - `servicenow/babelphish_styles.css` - Complete application styles (31KB)
    - Referenced via `<g:inline src="babelphish_styles.css" />` in UI page
  - **Theme Variables** documented:
    - Primary colors (`--color-primary`, `--color-primary-hover`)
    - Sidebar colors (`--color-sidebar-bg`, `--color-sidebar-hover`, `--color-sidebar-active`)
    - Text colors (`--color-text-primary`, `--color-text-secondary`)
    - Border colors (`--color-border`)
    - Accent colors (`--color-orange`)
  - **Documentation includes**:
    - Complete color palette reference
    - Typography specifications
    - Logo SVG code and color values
    - Component styling guidelines
    - Spacing system (8px grid)
    - How to change themes
    - File structure and organization
    - Maintenance best practices
  - Easier theme customization - change colors in one place
  - Better maintainability - no more embedded styles in HTML
  - Improved development workflow
  - Consistent styling between React and ServiceNow applications

### v1.5.0 (2025-09-30)
- **NEW**: Compact collapsed sidebar design
  - Reduced collapsed width from 60px to 52px for minimal space usage
  - Icon-only navigation bar when collapsed
  - Toggle button styled with border and background when collapsed
  - All text, chevrons, and submenus hidden when collapsed
  - Vertical stack of centered icons only
  - Header border removed when collapsed
  - Footer border removed when collapsed
  - Clean, minimalist design matching modern UI patterns
  - Smooth transitions between expanded and collapsed states
  - Fully synchronized between React and ServiceNow applications

### v1.4.0 (2025-09-30)
- **NEW**: Edit and Delete functionality for Prompt Catalog and AI Store cards
  - Hover over any card to reveal edit (pencil) and delete (trash) icons in bottom right corner
  - Icons appear with smooth fade-in animation
  - Edit icon opens comprehensive Edit modal with all fields
  - Delete icon opens confirmation modal with warning message
  - **Edit Prompt Modal** includes:
    - Title, Description, User Message, System Message fields
    - Category dropdown selector
    - Tags management (add/remove tags dynamically)
    - "Make this prompt public" checkbox
    - Cancel and "Update Prompt" buttons (orange theme)
  - **Edit Assistant Modal** includes:
    - Name, Description, Model fields
    - Icon selector dropdown
    - Icon color picker
    - Cancel and "Update Assistant" buttons (orange theme)
  - **Delete Confirmation Modal** includes:
    - Red trash icon in circle background
    - Clear warning message
    - Item name display in blue
    - "This action cannot be undone" warning text
    - Cancel and "Yes, Delete" buttons (red delete button)
  - All modals feature:
    - Dark overlay background
    - Click-outside-to-close functionality
    - X close button in top right
    - Smooth animations and transitions
  - Fully synchronized between React and ServiceNow applications

### v1.3.0 (2025-09-30)
- **NEW**: Prompt Catalog Modal in Find Answers page
  - Clicking "Prompts" button opens modal overlay with full catalog
  - BabelPhish-themed design with orange accents
  - Two tabs: "Agentic Weaver Common Prompts" and "Your Prompts" (appears when prompts are favorited)
  - Filter dropdowns for Assistant, Task, and Functional Area
  - Search functionality to filter prompts
  - Grid layout showing 5 sample prompts
  - Heart icon to favorite/unfavorite prompts
  - "View full Prompt Catalog" link with external icon
  - Modal close button (X) and click-outside-to-close functionality
  - Fully synchronized between React and ServiceNow applications

### v1.2.0 (2025-09-30)
- **NEW**: Find Answers chat panel redesigned with Main Workspace look and feel
  - Replaced ODIN chat interface with centered workspace layout
  - Added BabelPhish fish icon at top of panel
  - Centered "Welcome to BabelPhish" title and subtitle
  - Quick action links (Get my incidents, Show me high priority changes, Are there any recurring problems?)
  - Rounded input with Sparkles icon send button
  - "Use Commands" and "Workspace" footer buttons
  - Model dropdown, Prompts button, and Clear button remain at the top
  - Maintains same centered, clean aesthetic as Main Workspace page

### v1.1.0 (2025-09-30)
- **NEW**: Expandable Debug Information in Find Answers pages
  - Click to toggle debug details open/closed
  - Shows category-specific metadata (Section ID, Assistant ID, Article count, etc.)
- **NEW**: Center panel automatically reopens when switching between Find Answers categories
  - Ensures users can always see the content when navigating
  - Chat panel returns to standard width when center panel reopens

### v1.0.0 (2025-09-30)
- Initial synchronization completed
- All core features implemented in both applications
- AI Store with advanced filtering
- Prompt Catalog with dynamic favorites tab
- Find Answers three-panel layout
- Full feature parity achieved

---

## Testing Checklist

When making changes, verify these items in both applications:

- [ ] Login page displays correctly
- [ ] Sidebar navigation works for all sections
- [ ] AI Store shows 4 assistants
- [ ] AI Store filters work (All, Recently Added, Name A-Z, Name Z-A, Favorites)
- [ ] AI Store search filters in real-time
- [ ] AI Store favorite toggle works
- [ ] Prompt Catalog shows prompts
- [ ] Prompt Catalog favorites tab appears when favoriting
- [ ] Prompt Catalog favorites tab disappears when unfavoriting last item
- [ ] Find Answers loads correct content for each category
- [ ] Find Answers center panel closes properly
- [ ] Find Answers chat panel expands when center closes
- [ ] Find Answers debug information toggles open/closed
- [ ] Find Answers center panel reopens when clicking different category
- [ ] Find Answers debug info updates with correct category data
- [ ] All 6 Find Answers categories work
- [ ] User Management page displays
- [ ] Role Management page displays
- [ ] Profile Settings page displays
- [ ] Refresh buttons work where present
- [ ] Build completes without errors

---

## Notes

- Both applications are designed to work independently
- No shared database or API between them currently
- All data is stored in-memory (sample data)
- Future enhancement: Connect both to Supabase for shared data persistence
- ServiceNow implementation uses Jelly for server-side rendering
- React implementation uses client-side rendering only

---

## Contact

For questions about synchronization or to report sync issues, please update this document and notify the development team.
