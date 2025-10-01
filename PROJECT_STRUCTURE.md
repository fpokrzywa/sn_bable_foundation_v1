# BabelPhish Project Structure

Complete directory structure and file organization for the BabelPhish application.

## Root Directory

```
babelphish-app/
├── src/                          # React application source
├── public/                       # React public assets
├── servicenow/                   # ServiceNow application files
├── dist/                         # React build output
├── node_modules/                 # Node dependencies
├── package.json                  # Node dependencies manifest
├── package-lock.json             # Locked dependency versions
├── tsconfig.json                 # TypeScript configuration
├── tsconfig.app.json             # App-specific TS config
├── tsconfig.node.json            # Node-specific TS config
├── vite.config.ts                # Vite build configuration
├── eslint.config.js              # ESLint configuration
├── index.html                    # React entry HTML
├── .env                          # Environment variables (Supabase)
├── README.md                     # Project overview
├── SYNC_STATUS.md                # Version history and sync status
├── THEME_GUIDE.md                # Complete theme documentation
├── CSS_FILE_LOCATIONS.md         # CSS file reference
└── PROJECT_STRUCTURE.md          # This file
```

## React Application (`src/`)

```
src/
├── main.tsx                      # React entry point
├── App.tsx                       # Main App component
├── App.css                       # Main application styles (35KB)
├── index.css                     # Global styles (700B)
├── testUsers.json                # Test user data
├── vite-env.d.ts                 # Vite type declarations
├── assets/                       # Static assets
│   └── react.svg                 # React logo
└── components/                   # React components
    ├── AIStorePage.tsx           # AI assistants marketplace
    ├── FindAnswersPage.tsx       # Knowledge base search
    ├── FindAnswersPage.css       # Find Answers styles
    ├── FishIcon.tsx              # BabelPhish logo component
    ├── LoginPage.tsx             # Authentication page
    ├── MainContent.tsx           # Main content router
    ├── ProfileSettingsPage.tsx   # User profile settings
    ├── PromptCatalogModal.tsx    # Prompt selection modal
    ├── PromptCatalogModal.css    # Prompt modal styles
    ├── PromptCatalogPage.tsx     # Prompt library page
    ├── RoleManagementPage.tsx    # Role administration
    ├── Sidebar.tsx               # Left navigation sidebar
    └── UserManagementPage.tsx    # User administration
```

## ServiceNow Application (`servicenow/`)

```
servicenow/
├── ui_page_babelphish_main.html        # Main application UI (55KB)
├── ui_page_babelphish_login.html       # Login page UI (12KB)
├── babelphish_styles.css               # Complete application styles (31KB)
├── script_include_babelphish_ajax.js   # Server-side AJAX handler
├── table_schema_conversation.xml       # Conversation table schema
├── README.md                           # ServiceNow installation guide
├── CSS_README.md                       # CSS management guide
├── INSTALLATION_GUIDE.md               # Detailed install steps
└── QUICK_START.md                      # Quick setup guide
```

## Documentation Files

### Root Level
- **README.md**: Project overview, features, and getting started
- **SYNC_STATUS.md**: Version history and feature synchronization
- **THEME_GUIDE.md**: Complete theming documentation
- **CSS_FILE_LOCATIONS.md**: CSS file reference guide
- **PROJECT_STRUCTURE.md**: This file

### ServiceNow Specific
- **servicenow/README.md**: ServiceNow installation overview
- **servicenow/CSS_README.md**: CSS management in ServiceNow
- **servicenow/INSTALLATION_GUIDE.md**: Step-by-step installation
- **servicenow/QUICK_START.md**: Quick setup reference

## Key Files by Function

### Styling & Theme
| File | Purpose | Size |
|---|---|---|
| `src/App.css` | React component styles | 35KB |
| `src/index.css` | React global styles | 700B |
| `servicenow/babelphish_styles.css` | ServiceNow styles | 31KB |
| `THEME_GUIDE.md` | Theme documentation | 15KB |

### Configuration
| File | Purpose |
|---|---|
| `package.json` | Dependencies and scripts |
| `tsconfig.json` | TypeScript settings |
| `vite.config.ts` | Build configuration |
| `eslint.config.js` | Linting rules |
| `.env` | Environment variables |

### React Components
| File | Purpose |
|---|---|
| `main.tsx` | App entry point |
| `App.tsx` | Root component |
| `Sidebar.tsx` | Navigation |
| `AIStorePage.tsx` | AI assistants |
| `PromptCatalogPage.tsx` | Prompt library |
| `FindAnswersPage.tsx` | Knowledge base |
| `LoginPage.tsx` | Authentication |

### ServiceNow Components
| File | Purpose |
|---|---|
| `ui_page_babelphish_main.html` | Main application |
| `ui_page_babelphish_login.html` | Login page |
| `babelphish_styles.css` | All styles |
| `script_include_babelphish_ajax.js` | Backend logic |
| `table_schema_conversation.xml` | Database schema |

## File Naming Conventions

### React Components
- **Pattern**: `ComponentName.tsx` (PascalCase)
- **Example**: `AIStorePage.tsx`, `PromptCatalogModal.tsx`

### React Styles
- **Pattern**: `ComponentName.css` (PascalCase)
- **Example**: `App.css`, `FindAnswersPage.css`

### ServiceNow Files
- **Pattern**: `type_name_description.extension` (snake_case)
- **Example**: `ui_page_babelphish_main.html`

## Build Output

```
dist/
├── index.html                    # Built HTML entry
├── assets/
│   ├── index-[hash].css          # Bundled CSS (~40KB)
│   └── index-[hash].js           # Bundled JavaScript (~258KB)
└── vite.svg                      # Vite logo
```

## Dependencies

### Production Dependencies
- `react` & `react-dom`: UI framework
- `@supabase/supabase-js`: Database client
- `lucide-react`: Icon library

### Development Dependencies
- `vite`: Build tool
- `typescript`: Type system
- `eslint`: Code linting
- `@vitejs/plugin-react`: React support

## Environment Variables (`.env`)

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

## Build Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## CSS Architecture

### CSS Custom Properties Location
Both files define theme variables in `:root`:
- `src/App.css`
- `servicenow/babelphish_styles.css`

### CSS Organization
1. Reset and base styles
2. CSS custom properties (`:root`)
3. Layout styles (`.app`, `.sidebar`, `.main-content`)
4. Component styles (organized by page/component)
5. Utility classes
6. Animations and transitions

## Component Hierarchy

```
App
├── LoginPage (if not authenticated)
└── MainContent (if authenticated)
    ├── Sidebar
    │   ├── Navigation sections
    │   └── User info footer
    └── Page Content
        ├── Welcome Page (default)
        ├── AI Store Page
        ├── Prompt Catalog Page
        ├── Find Answers Page
        ├── User Management Page
        ├── Role Management Page
        └── Profile Settings Page
```

## Notable Features by File

### `App.tsx`
- Authentication check
- Supabase integration
- Route management
- User state management

### `Sidebar.tsx`
- Collapsible navigation
- Multi-level menu
- Active state tracking
- Responsive design

### `babelphish_styles.css`
- Complete ServiceNow styling
- 1548 lines of CSS
- All theme variables
- Component-specific styles

## File Size Summary

| Category | Total Size | File Count |
|---|---|---|
| React Source | ~150KB | 15 |
| React Styles | ~36KB | 3 |
| ServiceNow UI | ~67KB | 2 |
| ServiceNow Styles | ~31KB | 1 |
| ServiceNow Backend | ~10KB | 2 |
| Documentation | ~50KB | 9 |
| **Total** | **~344KB** | **32 files** |

## Version Control

### Files to Commit
- All `src/` files
- All `servicenow/` files
- All documentation (`.md` files)
- Configuration files (`package.json`, `tsconfig.json`, etc.)

### Files to Ignore (`.gitignore`)
- `node_modules/`
- `dist/`
- `.env` (contains secrets)
- `.DS_Store`
- `*.log`

## Quick Navigation

- **React Development**: Start in `src/`
- **ServiceNow Development**: Start in `servicenow/`
- **Theme Changes**: Edit CSS files + see `THEME_GUIDE.md`
- **New Features**: Update `SYNC_STATUS.md`
- **Installation**: See `servicenow/INSTALLATION_GUIDE.md`

---

**Last Updated**: v1.6.0 (2025-09-30)
