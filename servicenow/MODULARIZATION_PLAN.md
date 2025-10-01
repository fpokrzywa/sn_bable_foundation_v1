# BabelPhish ServiceNow Application Modularization Plan

## Executive Summary

This plan outlines the complete refactoring of the BabelPhish ServiceNow application from a monolithic 1,295-line single file into a modular, maintainable architecture using ServiceNow best practices.

---

## Current State Analysis

### Problems with Current Architecture

1. **Single File Monolith**: 1,295 lines in `ui_page_babelphish_main.html`
   - 400+ lines of HTML structure
   - 700+ lines of inline JavaScript
   - 150+ lines of embedded data
   - All business logic mixed with presentation

2. **Maintainability Issues**:
   - Difficult to locate and fix bugs
   - Hard to test individual components
   - Merge conflicts in team environments
   - No code reusability

3. **Performance Concerns**:
   - All code loads upfront regardless of usage
   - No lazy loading of features
   - Large file size impacts page load time

4. **Scalability Limitations**:
   - Adding new features requires editing massive file
   - Risk of breaking existing functionality
   - Difficult to version control changes

---

## Target Architecture

### Modular Component Structure

```
servicenow/
├── ui_pages/
│   └── babelphish_main.html                    # Main shell (100-150 lines)
│
├── ui_macros/
│   ├── babelphish_sidebar.xml                  # Sidebar container (50 lines)
│   ├── babelphish_sidebar_header.xml           # Logo & toggle (30 lines)
│   ├── babelphish_sidebar_nav_expanded.xml     # Expanded navigation (150 lines)
│   ├── babelphish_sidebar_nav_collapsed.xml    # Collapsed navigation (100 lines)
│   ├── babelphish_sidebar_footer.xml           # User info & logout (30 lines)
│   ├── babelphish_page_welcome.xml             # Welcome page (80 lines)
│   ├── babelphish_page_aistore.xml             # AI Store page (100 lines)
│   ├── babelphish_page_catalog.xml             # Prompt Catalog page (120 lines)
│   ├── babelphish_page_findanswers.xml         # Find Answers page (150 lines)
│   └── babelphish_modal_prompt.xml             # Prompt modal (80 lines)
│
├── ui_scripts/ (Client-side JavaScript)
│   ├── babelphish_app.js                       # Main app controller (80 lines)
│   ├── babelphish_sidebar.js                   # Sidebar logic (120 lines)
│   ├── babelphish_navigation.js                # Navigation controller (100 lines)
│   ├── babelphish_store.js                     # AI Store logic (150 lines)
│   ├── babelphish_catalog.js                   # Catalog logic (150 lines)
│   ├── babelphish_findanswers.js               # Find Answers logic (100 lines)
│   ├── babelphish_modal.js                     # Modal logic (80 lines)
│   └── babelphish_utils.js                     # Utility functions (60 lines)
│
├── script_includes/ (Server-side JavaScript)
│   ├── babelphish_ajax.js                      # Already exists - AJAX handler
│   ├── babelphish_data_service.js              # Data access layer (100 lines)
│   ├── babelphish_assistant_service.js         # Assistant management (80 lines)
│   ├── babelphish_prompt_service.js            # Prompt management (80 lines)
│   └── babelphish_auth_service.js              # Authentication helpers (60 lines)
│
├── style_sheets/
│   └── babelphish_styles.css                   # Already exists - Keep as is
│
└── database/
    ├── table_babelphish_assistant.xml          # Assistants table
    ├── table_babelphish_prompt.xml             # Prompts table
    ├── table_babelphish_favorite.xml           # User favorites table
    └── table_babelphish_settings.xml           # User settings table
```

---

## Phase 1: Database Schema Design

### Supabase Tables

#### 1. `babelphish_assistants`
```sql
CREATE TABLE babelphish_assistants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  model text NOT NULL,
  icon text NOT NULL,
  icon_color text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE babelphish_assistants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read assistants"
  ON babelphish_assistants FOR SELECT
  TO authenticated
  USING (true);
```

#### 2. `babelphish_prompts`
```sql
CREATE TABLE babelphish_prompts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assistant_id uuid REFERENCES babelphish_assistants(id),
  title text NOT NULL,
  description text NOT NULL,
  tags text[] DEFAULT '{}',
  task text,
  functional_area text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE babelphish_prompts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read prompts"
  ON babelphish_prompts FOR SELECT
  TO authenticated
  USING (true);
```

#### 3. `babelphish_favorites`
```sql
CREATE TABLE babelphish_favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  item_type text NOT NULL CHECK (item_type IN ('assistant', 'prompt')),
  item_id uuid NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, item_type, item_id)
);

ALTER TABLE babelphish_favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own favorites"
  ON babelphish_favorites FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
```

#### 4. `babelphish_conversations`
```sql
CREATE TABLE babelphish_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  title text,
  assistant_id uuid REFERENCES babelphish_assistants(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE babelphish_conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own conversations"
  ON babelphish_conversations FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
```

#### 5. `babelphish_messages`
```sql
CREATE TABLE babelphish_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid REFERENCES babelphish_conversations(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('user', 'assistant')),
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE babelphish_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view messages in their conversations"
  ON babelphish_messages FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM babelphish_conversations
      WHERE babelphish_conversations.id = babelphish_messages.conversation_id
      AND babelphish_conversations.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create messages in their conversations"
  ON babelphish_messages FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM babelphish_conversations
      WHERE babelphish_conversations.id = babelphish_messages.conversation_id
      AND babelphish_conversations.user_id = auth.uid()
    )
  );
```

---

## Phase 2: Script Includes (Server-side Logic)

### 1. BabelPhishDataService
**Purpose**: Central data access layer for Supabase
**File**: `script_include_babelphish_data_service.js`

```javascript
var BabelPhishDataService = Class.create();
BabelPhishDataService.prototype = Object.extendsObject(AbstractAjaxProcessor, {

    getAssistants: function() {
        // Fetch from Supabase
    },

    getPrompts: function(assistantId) {
        // Fetch prompts, optionally filtered
    },

    getUserFavorites: function(userId, itemType) {
        // Get user's favorites
    },

    toggleFavorite: function(userId, itemType, itemId) {
        // Add or remove favorite
    },

    type: 'BabelPhishDataService'
});
```

### 2. BabelPhishAssistantService
**Purpose**: Assistant-specific business logic
**File**: `script_include_babelphish_assistant_service.js`

### 3. BabelPhishPromptService
**Purpose**: Prompt-specific business logic
**File**: `script_include_babelphish_prompt_service.js`

### 4. BabelPhishAuthService
**Purpose**: Authentication and authorization helpers
**File**: `script_include_babelphish_auth_service.js`

---

## Phase 3: UI Scripts (Client-side JavaScript)

### 1. BabelPhishApp (Main Controller)
**Purpose**: Application initialization and coordination
**File**: `ui_script_babelphish_app.js`

```javascript
var BabelPhishApp = {
    isInitialized: false,

    initialize: function() {
        if (this.isInitialized) return;

        this.initSidebar();
        this.initNavigation();
        this.initPages();
        this.bindGlobalEvents();

        this.isInitialized = true;
    },

    initSidebar: function() {
        BabelPhishSidebar.initialize();
    },

    initNavigation: function() {
        BabelPhishNavigation.initialize();
    },

    initPages: function() {
        BabelPhishStore.initialize();
        BabelPhishCatalog.initialize();
        BabelPhishFindAnswers.initialize();
    },

    bindGlobalEvents: function() {
        // Global event handlers
    }
};
```

### 2. BabelPhishSidebar
**Purpose**: Sidebar state and interaction management
**File**: `ui_script_babelphish_sidebar.js`

### 3. BabelPhishNavigation
**Purpose**: Page navigation and routing
**File**: `ui_script_babelphish_navigation.js`

### 4. BabelPhishStore
**Purpose**: AI Store page logic
**File**: `ui_script_babelphish_store.js`

### 5. BabelPhishCatalog
**Purpose**: Prompt Catalog page logic
**File**: `ui_script_babelphish_catalog.js`

### 6. BabelPhishFindAnswers
**Purpose**: Find Answers page logic
**File**: `ui_script_babelphish_findanswers.js`

### 7. BabelPhishModal
**Purpose**: Modal dialogs management
**File**: `ui_script_babelphish_modal.js`

### 8. BabelPhishUtils
**Purpose**: Shared utility functions
**File**: `ui_script_babelphish_utils.js`

```javascript
var BabelPhishUtils = {
    showLoading: function() {
        // Show loading overlay
    },

    hideLoading: function() {
        // Hide loading overlay
    },

    showError: function(message) {
        // Show error message
    },

    debounce: function(func, wait) {
        // Debounce function
    },

    escapeHtml: function(text) {
        // Escape HTML entities
    }
};
```

---

## Phase 4: UI Macros (Reusable Components)

### 1. Main Sidebar Components

#### babelphish_sidebar.xml
```xml
<?xml version="1.0" encoding="utf-8" ?>
<j:jelly trim="false" xmlns:j="jelly:core" xmlns:g="glide">
<div class="sidebar" id="sidebar">
  <g:call function="babelphish_sidebar_header" />

  <nav class="sidebar-nav" id="sidebar-nav">
    <g:call function="babelphish_sidebar_nav_expanded" />
    <g:call function="babelphish_sidebar_nav_collapsed" />
  </nav>

  <g:call function="babelphish_sidebar_footer" />
</div>
</j:jelly>
```

#### babelphish_sidebar_header.xml
Header with logo and toggle button

#### babelphish_sidebar_nav_expanded.xml
Full navigation with sections and subitems

#### babelphish_sidebar_nav_collapsed.xml
Collapsed navigation with icons and flyouts

#### babelphish_sidebar_footer.xml
User info and logout button

### 2. Page Components

#### babelphish_page_welcome.xml
Welcome/home page content

#### babelphish_page_aistore.xml
AI Store page with filters and cards

#### babelphish_page_catalog.xml
Prompt Catalog page with filters

#### babelphish_page_findanswers.xml
Find Answers page with categories

### 3. Shared Components

#### babelphish_modal_prompt.xml
Prompt selection modal

---

## Phase 5: Main UI Page Refactor

### Simplified Main Page
**File**: `ui_page_babelphish_main.html`

```xml
<?xml version="1.0" encoding="utf-8" ?>
<j:jelly trim="false" xmlns:j="jelly:core" xmlns:g="glide">
<g:evaluate>
var isLoggedIn = gs.getUser().getID() != '';
if (!isLoggedIn) {
  g.getSession().put('babelphish_return_url', g.getRequest().getRequestURL());
  response.sendRedirect('babelphish_login');
}
</g:evaluate>

<html>
<head>
  <title>BabelPhish - The Intelligent Experience</title>

  <!-- CSS -->
  <g:inline src="babelphish_styles.css" />

  <!-- UI Scripts (Client-side JavaScript) -->
  <g:requires name="babelphish_utils.jsdbx" />
  <g:requires name="babelphish_app.jsdbx" />
  <g:requires name="babelphish_sidebar.jsdbx" />
  <g:requires name="babelphish_navigation.jsdbx" />
  <g:requires name="babelphish_store.jsdbx" />
  <g:requires name="babelphish_catalog.jsdbx" />
  <g:requires name="babelphish_findanswers.jsdbx" />
  <g:requires name="babelphish_modal.jsdbx" />
</head>
<body>
  <div class="app" id="app-container">
    <!-- Sidebar Component -->
    <g:call function="babelphish_sidebar" />

    <!-- Main Content Area -->
    <div class="main-content">
      <!-- Page Components -->
      <g:call function="babelphish_page_welcome" />
      <g:call function="babelphish_page_aistore" />
      <g:call function="babelphish_page_catalog" />
      <g:call function="babelphish_page_findanswers" />
    </div>
  </div>

  <!-- Modal Components -->
  <g:call function="babelphish_modal_prompt" />

  <!-- Initialize Application -->
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      BabelPhishApp.initialize();
    });
  </script>
</body>
</html>
</j:jelly>
```

**Result**: Main page reduced from 1,295 lines to ~60 lines!

---

## Phase 6: Implementation Steps

### Step 1: Database Setup (Week 1)
1. Create Supabase migration files
2. Apply migrations to create tables
3. Set up RLS policies
4. Seed initial data (assistants, prompts)
5. Test database access

### Step 2: Script Includes (Week 1-2)
1. Create `BabelPhishDataService`
2. Create `BabelPhishAssistantService`
3. Create `BabelPhishPromptService`
4. Create `BabelPhishAuthService`
5. Update existing `BabelPhishAjax` to use services
6. Test server-side logic

### Step 3: UI Scripts (Week 2-3)
1. Create `BabelPhishUtils`
2. Create `BabelPhishApp`
3. Create `BabelPhishSidebar`
4. Create `BabelPhishNavigation`
5. Create `BabelPhishStore`
6. Create `BabelPhishCatalog`
7. Create `BabelPhishFindAnswers`
8. Create `BabelPhishModal`
9. Test client-side logic

### Step 4: UI Macros (Week 3-4)
1. Create sidebar macros
2. Create page macros
3. Create modal macros
4. Test macro rendering
5. Test macro parameters

### Step 5: Main Page Refactor (Week 4)
1. Create new simplified main page
2. Test all functionality
3. Performance testing
4. Browser compatibility testing

### Step 6: Migration & Cleanup (Week 4-5)
1. Back up existing page
2. Deploy modular version
3. User acceptance testing
4. Remove old monolithic file
5. Update documentation

---

## Phase 7: Testing Strategy

### Unit Tests
- Test each UI Script independently
- Test each Script Include independently
- Mock dependencies

### Integration Tests
- Test UI Script + Script Include interactions
- Test AJAX calls and responses
- Test database operations

### UI Tests
- Test each page renders correctly
- Test navigation flows
- Test user interactions
- Test responsive design

### Performance Tests
- Page load time
- AJAX response time
- Memory usage
- Browser performance

---

## Phase 8: Benefits & Metrics

### Code Organization
- **Before**: 1 file, 1,295 lines
- **After**: ~35 files, avg 80 lines each
- **Improvement**: 93% reduction in file complexity

### Maintainability
- Single responsibility per file
- Easy to locate and fix bugs
- Clear separation of concerns
- Easier code reviews

### Reusability
- UI Macros can be used in other pages
- UI Scripts can be shared across applications
- Script Includes provide consistent data access

### Performance
- Lazy loading capabilities
- Reduced initial page load
- Better browser caching
- Modular updates

### Team Collaboration
- Multiple developers can work simultaneously
- Reduced merge conflicts
- Clear ownership boundaries
- Better onboarding for new developers

---

## Phase 9: Migration Checklist

- [ ] Database schema created in Supabase
- [ ] RLS policies configured and tested
- [ ] Initial data seeded
- [ ] All Script Includes created
- [ ] All UI Scripts created
- [ ] All UI Macros created
- [ ] Main UI Page refactored
- [ ] CSS remains unchanged
- [ ] All functionality tested
- [ ] Performance benchmarks met
- [ ] Documentation updated
- [ ] Team training completed
- [ ] Backup of original file created
- [ ] Modular version deployed to dev
- [ ] User acceptance testing passed
- [ ] Production deployment

---

## Phase 10: Documentation Updates

### Files to Update
1. `README.md` - Architecture overview
2. `INSTALLATION_GUIDE.md` - New installation steps
3. `QUICK_START.md` - Updated quick start
4. `SYNC_STATUS.md` - Modular architecture notes
5. New: `ARCHITECTURE.md` - Detailed architecture guide
6. New: `DEVELOPMENT_GUIDE.md` - Development workflow
7. New: `API_REFERENCE.md` - Script Include APIs

---

## Conclusion

This modularization plan transforms the BabelPhish ServiceNow application from a monolithic single file into a well-architected, maintainable, and scalable application following ServiceNow best practices.

**Timeline**: 4-5 weeks
**Effort**: Medium to High
**Risk**: Low (with proper testing)
**Value**: Very High

Next step: Begin implementation with database schema design.
