# ServiceNow Application Update Instructions

This document outlines the specific changes needed to bring the ServiceNow application to parity with the React application (v1.12.0).

## Critical Changes Required

### 1. Sidebar Toggle Button Icon Changes

**Location**: Line 28-32

**Current Code**:
```html
<button class="sidebar-toggle" onclick="toggleSidebar()">
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <line x1="9" y1="3" x2="9" y2="21"/>
  </svg>
</button>
```

**Update To**:
```html
<button class="sidebar-toggle" onclick="toggleSidebar()" title="Collapse" id="sidebar-toggle-btn">
  <svg id="toggle-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <line x1="9" y1="3" x2="9" y2="21"/>
  </svg>
</button>
```

### 2. Add Collapsed Navigation Section

**Location**: After line 226 (end of expanded navigation)

**Add**:
```html
<!-- Collapsed View -->
<div id="collapsed-nav" style="display: none;">
  <!-- AI Store Direct Link -->
  <div class="nav-item" onclick="navigateTo('aistore')" title="AI Store">
    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/>
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
      <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/>
      <path d="M2 7h20"/>
    </svg>
  </div>

  <!-- Prompt Catalog Direct Link -->
  <div class="nav-item" onclick="navigateTo('promptcatalog')" title="Prompt Catalog">
    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  </div>

  <!-- Workspace Flyout -->
  <div class="collapsed-menu-wrapper">
    <div class="nav-item" onclick="toggleCollapsedMenu('workspace')" title="Workspace">
      <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>
      </svg>
    </div>
    <div class="collapsed-submenu" id="collapsed-workspace-menu" style="display: none;">
      <div class="collapsed-submenu-item" onclick="navigateTo('mainworkspace'); hideCollapsedMenu('workspace');">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>
        </svg>
        <span>Main Workspace</span>
      </div>
      <div class="collapsed-submenu-item" onclick="navigateTo('mychanges'); hideCollapsedMenu('workspace');">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>
        </svg>
        <span>My Changes</span>
      </div>
      <div class="collapsed-submenu-item" onclick="navigateTo('incidents'); hideCollapsedMenu('workspace');">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>
        </svg>
        <span>Incidents</span>
      </div>
      <div class="collapsed-submenu-item" onclick="navigateTo('bable'); hideCollapsedMenu('workspace');">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>
        </svg>
        <span>Bable</span>
      </div>
    </div>
  </div>

  <!-- Find Answers Flyout -->
  <div class="collapsed-menu-wrapper">
    <div class="nav-item" onclick="toggleCollapsedMenu('findanswers')" title="Find Answers">
      <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    </div>
    <div class="collapsed-submenu" id="collapsed-findanswers-menu" style="display: none;">
      <div class="collapsed-submenu-item" onclick="navigateTo('findanswers-itsupport'); hideCollapsedMenu('findanswers');">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
        </svg>
        <span>IT Support Guides</span>
      </div>
      <div class="collapsed-submenu-item" onclick="navigateTo('findanswers-mysupport'); hideCollapsedMenu('findanswers');">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
        </svg>
        <span>My Support Guides</span>
      </div>
      <div class="collapsed-submenu-item" onclick="navigateTo('findanswers-hrpolicies'); hideCollapsedMenu('findanswers');">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
        </svg>
        <span>HR Policies</span>
      </div>
      <div class="collapsed-submenu-item" onclick="navigateTo('findanswers-nieaguides'); hideCollapsedMenu('findanswers');">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
        </svg>
        <span>NIEA Guides</span>
      </div>
      <div class="collapsed-submenu-item" onclick="navigateTo('findanswers-adeptguides'); hideCollapsedMenu('findanswers');">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
        </svg>
        <span>ADEPT Guides</span>
      </div>
      <div class="collapsed-submenu-item" onclick="navigateTo('findanswers-freddieit'); hideCollapsedMenu('findanswers');">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
        </svg>
        <span>Freddie is IT</span>
      </div>
    </div>
  </div>
</div>
```

### 3. Wrap Existing Navigation in Expanded Nav Div

**Location**: Line 36-227

**Wrap all existing nav sections with**:
```html
<div id="expanded-nav">
  <!-- All existing nav sections here -->
</div>
```

### 4. Update toggleSidebar() Function

**Location**: Line 774-777

**Replace**:
```javascript
function toggleSidebar() {
  var sidebar = document.querySelector('.sidebar');
  sidebar.classList.toggle('collapsed');
}
```

**With**:
```javascript
var isCollapsed = false;
var collapsedMenus = {
  workspace: false,
  findanswers: false
};

function toggleSidebar() {
  isCollapsed = !isCollapsed;
  var sidebar = document.querySelector('.sidebar');
  var appContainer = document.querySelector('.app');
  var toggleIcon = document.getElementById('toggle-icon');
  var expandedNav = document.getElementById('expanded-nav');
  var collapsedNav = document.getElementById('collapsed-nav');
  var toggleButton = document.getElementById('sidebar-toggle-btn');

  if (isCollapsed) {
    sidebar.classList.add('collapsed');
    appContainer.classList.add('sidebar-collapsed');
    expandedNav.style.display = 'none';
    collapsedNav.style.display = 'block';

    // Change icon to PanelLeftOpen
    toggleIcon.innerHTML = '<path d="M3 3h18v18H3z"/><path d="M15 3v18"/>';
    toggleButton.setAttribute('title', 'Expand');
  } else {
    sidebar.classList.remove('collapsed');
    appContainer.classList.remove('sidebar-collapsed');
    expandedNav.style.display = 'block';
    collapsedNav.style.display = 'none';

    // Change icon to PanelLeftClose
    toggleIcon.innerHTML = '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/>';
    toggleButton.setAttribute('title', 'Collapse');

    // Hide all collapsed menus
    hideAllCollapsedMenus();
  }
}

function toggleCollapsedMenu(menuName) {
  var menu = document.getElementById('collapsed-' + menuName + '-menu');
  if (!menu) return;

  // Close other menus
  for (var key in collapsedMenus) {
    if (key !== menuName && collapsedMenus[key]) {
      hideCollapsedMenu(key);
    }
  }

  collapsedMenus[menuName] = !collapsedMenus[menuName];
  menu.style.display = collapsedMenus[menuName] ? 'block' : 'none';
}

function hideCollapsedMenu(menuName) {
  var menu = document.getElementById('collapsed-' + menuName + '-menu');
  if (menu) {
    menu.style.display = 'none';
    collapsedMenus[menuName] = false;
  }
}

function hideAllCollapsedMenus() {
  for (var key in collapsedMenus) {
    hideCollapsedMenu(key);
  }
}
```

### 5. Update Navigation Event Handlers

**Location**: After line 780 (DOMContentLoaded function)

**Replace the existing section toggle logic with**:
```javascript
// Handle section toggles
document.querySelectorAll('[data-section]').forEach(function(item) {
  item.addEventListener('click', function(e) {
    if (isCollapsed) return; // Don't toggle when collapsed

    var section = this.getAttribute('data-section');
    var subitems = document.getElementById(section + '-subitems');
    var chevron = this.querySelector('.chevron');

    if (subitems) {
      var isOpen = subitems.classList.contains('open');

      // Close all other sections
      document.querySelectorAll('.nav-subitems').forEach(function(otherSubitems) {
        if (otherSubitems !== subitems) {
          otherSubitems.classList.remove('open');
        }
      });

      // Reset all other chevrons
      document.querySelectorAll('[data-section] .chevron').forEach(function(otherChevron) {
        if (otherChevron !== chevron) {
          otherChevron.style.transform = 'rotate(0deg)';
        }
      });

      if (isOpen) {
        subitems.classList.remove('open');
        chevron.style.transform = 'rotate(0deg)';
      } else {
        subitems.classList.add('open');
        chevron.style.transform = 'rotate(90deg)';
      }
    }
  });
});
```

### 6. Update navigateTo() Function

**Add at the beginning of the function**:
```javascript
function navigateTo(destination) {
  console.log('Navigating to: ' + destination);

  // Hide all collapsed menus
  hideAllCollapsedMenus();

  // Rest of existing code...
}
```

## Summary

These changes will bring the ServiceNow application to v1.12.0 parity with the React application, including:

1. ✅ Collapsible sidebar with icon toggle
2. ✅ Separate expanded and collapsed navigation views
3. ✅ Click-to-open flyout menus for Workspace and Find Answers
4. ✅ Tooltips on collapsed icons (via title attributes)
5. ✅ Toggle button icon changes (PanelLeftClose ⟷ PanelLeftOpen)
6. ✅ Proper state management for collapsed menus
7. ✅ App container padding when sidebar is collapsed

The CSS styles are already in place in `babelphish_styles.css` - these JavaScript and HTML changes complete the implementation.
