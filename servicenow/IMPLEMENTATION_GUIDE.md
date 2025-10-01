# BabelPhish ServiceNow Implementation Guide

**Complete Installation, Configuration, and Deployment Guide**

---

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Quick Start (5 Minutes)](#quick-start-5-minutes)
4. [Detailed Installation Steps](#detailed-installation-steps)
5. [CSS Styles Setup](#css-styles-setup)
6. [Configuration & Customization](#configuration--customization)
7. [Modular Architecture (Advanced)](#modular-architecture-advanced)
8. [Updating to Latest Version](#updating-to-latest-version)
9. [Testing & Verification](#testing--verification)
10. [Troubleshooting](#troubleshooting)
11. [Maintenance & Support](#maintenance--support)

---

## Overview

BabelPhish is an intelligent AI assistant for ServiceNow that provides users with a conversational interface to interact with ServiceNow data and services.

### Features

- **Conversational Interface**: Natural language interaction with ServiceNow
- **AI Store**: Browse and select from various AI assistants
- **Prompt Catalog**: Access pre-built prompt templates
- **Find Answers**: Quick access to IT support, HR policies, and guides
- **Workspace Integration**: Direct links to incidents, changes, and tasks
- **Beautiful UI**: Modern, responsive design with collapsible sidebar
- **Secure**: Built on ServiceNow's native authentication and RLS

### What's Included

**UI Components**:
- Login Page (`ui_page_babelphish_login.html`)
- Main Application Interface (`ui_page_babelphish_main.html`)
- External CSS Stylesheet (`babelphish_styles.css`)

**Backend Components**:
- Script Include for AI processing (`script_include_babelphish_ajax.js`)
- Database table for conversation history (`table_schema_conversation.xml`)

**Optional Modular Components** (Advanced):
- UI Scripts for client-side logic
- UI Macros for reusable components
- Additional Script Includes for data services

---

## Prerequisites

### Required

- ServiceNow instance (San Diego or later recommended)
- Administrator access to the instance
- 10-15 minutes for basic installation
- Basic understanding of ServiceNow development

### Optional (For Advanced Features)

- Knowledge of JavaScript
- Understanding of CSS for customization
- Supabase account (for modular architecture with external database)

---

## Quick Start (5 Minutes)

Follow these steps to get BabelPhish running immediately.

### Step 1: Log into ServiceNow

Navigate to your ServiceNow instance and log in with admin credentials.

**Example**:
```
URL: https://dev309119.service-now.com
Username: ai_browser
Password: Appdev2025!
```

### Step 2: Create Scoped Application

1. Navigate to **System Applications > Studio**
2. Click **Create Application**
3. Fill in:
   - **Name**: `BabelPhish`
   - **Scope**: `x_babelphish`
   - **Version**: `1.0.0`
4. Click **Create**

### Step 3: Create Database Table

1. In Studio, click **Create Application File**
2. Select **Data Model > Table**
3. Configure:
   - **Label**: `BabelPhish Conversation`
   - **Name**: `x_babelphish_conversation` (auto-generated)
   - **Extends**: Base Table
   - **Add module to menu**: Yes
   - **Create access controls**: Yes

4. Add these fields:

| Field Name | Type | Max Length | Reference | Mandatory |
|-----------|------|------------|-----------|-----------|
| user | Reference | 32 | sys_user | Yes |
| message | String | 4000 | - | Yes |
| response | String | 4000 | - | Yes |
| intent | String | 40 | - | No |
| confidence_score | Decimal | - | - | No |
| session_id | String | 40 | - | No |
| feedback_rating | Integer | - | - | No |
| feedback_comment | String | 1000 | - | No |

5. Click **Submit**

### Step 4: Create Script Include

1. Click **Create Application File**
2. Select **Server Development > Script Include**
3. Configure:
   - **Name**: `BabelPhishAjax`
   - **API Name**: `x_babelphish.BabelPhishAjax`
   - **Client callable**: ✓ Check this box
   - **Accessible from**: All application scopes

4. Copy and paste the code from `script_include_babelphish_ajax.js`
5. Click **Submit**

### Step 5: Upload CSS Styles

1. Navigate to **System UI > CSS Includes**
2. Click **New**
3. Fill in:
   - **Name**: `babelphish_styles`
   - **CSS**: Copy and paste the entire contents of `babelphish_styles.css`
   - **Active**: ✓ Check this box
4. Click **Submit**

### Step 6: Create UI Pages

#### Login Page

1. In Studio, click **Create Application File**
2. Select **User Interface > UI Pages**
3. Configure:
   - **Name**: `babelphish_login`
   - **Category**: general
4. Copy and paste the code from `ui_page_babelphish_login.html`
5. Click **Submit**

#### Main Application Page

1. Click **Create Application File**
2. Select **User Interface > UI Pages**
3. Configure:
   - **Name**: `babelphish_main`
   - **Category**: general
4. Copy and paste the code from `ui_page_babelphish_main.html`
5. Click **Submit**

### Step 7: Create Menu & Module

#### Create Application Menu

1. Click **Create Application File**
2. Select **User Interface > Application Menu**
3. Configure:
   - **Title**: `BabelPhish`
   - **Hint**: AI-powered ServiceNow assistant
   - **Order**: 100
4. Click **Submit**

#### Create Module

1. Click **Create Application File**
2. Select **User Interface > Module**
3. Configure:
   - **Title**: `BabelPhish Home`
   - **Application Menu**: BabelPhish (select from dropdown)
   - **Link Type**: URL (from arguments)
   - **Arguments**: `babelphish_main.do`
   - **Order**: 100
4. Click **Submit**

### Step 8: Test Installation

1. Refresh your browser
2. Find **BabelPhish** in the Application Navigator
3. Click **BabelPhish Home**
4. You should see the BabelPhish interface!

**Test URLs**:
- Login: `https://YOUR_INSTANCE.service-now.com/babelphish_login.do`
- Main App: `https://YOUR_INSTANCE.service-now.com/babelphish_main.do`

---

## Detailed Installation Steps

### Creating Access Control Rules (ACLs)

Secure your application with proper access controls.

#### Read ACL

1. Navigate to **System Security > Access Control (ACL)**
2. Click **New**
3. Configure:
   - **Type**: record
   - **Operation**: read
   - **Name**: x_babelphish_conversation
   - **Requires role**: user
   - **Script**:
   ```javascript
   // Users can only read their own conversations
   answer = current.user == gs.getUserID() || gs.hasRole('admin');
   ```
4. Click **Submit**

#### Create ACL

1. Click **New**
2. Configure:
   - **Type**: record
   - **Operation**: create
   - **Name**: x_babelphish_conversation
   - **Requires role**: user
3. Click **Submit**

#### Write ACL

1. Click **New**
2. Configure:
   - **Type**: record
   - **Operation**: write
   - **Name**: x_babelphish_conversation
   - **Requires role**: user
   - **Script**:
   ```javascript
   // Users can only update their own conversations
   answer = current.user == gs.getUserID() || gs.hasRole('admin');
   ```
3. Click **Submit**

#### Delete ACL

1. Click **New**
2. Configure:
   - **Type**: record
   - **Operation**: delete
   - **Name**: x_babelphish_conversation
   - **Requires role**: admin
3. Click **Submit**

---

## CSS Styles Setup

### Method 1: CSS Include (Recommended)

Already completed in Step 5 of Quick Start.

### Method 2: Inline in UI Page

If you prefer to keep styles inline:

1. Open `ui_page_babelphish_main.html` in Studio
2. Replace the line:
   ```xml
   <g:inline src="babelphish_styles.css" />
   ```
3. With:
   ```html
   <style>
     /* Paste entire contents of babelphish_styles.css here */
   </style>
   ```

### Method 3: Via Update Set

If importing via Update Set, CSS should be included automatically.

### Verifying CSS is Loaded

1. Open BabelPhish in browser
2. Press F12 to open Developer Tools
3. Go to **Network** tab
4. Refresh page
5. Look for `babelphish_styles.css` in the list
6. Status should be `200 OK`

---

## Configuration & Customization

### Customize Colors & Branding

Edit the CSS variables in `babelphish_styles.css`:

```css
:root {
  --color-primary: #0ea5e9;          /* Change to your brand color */
  --color-primary-hover: #0284c7;
  --color-sidebar-bg: #f8fafc;       /* Sidebar background */
  --color-sidebar-hover: #e2e8f0;
  --color-sidebar-active: #dbeafe;
  --color-border: #e2e8f0;
  --color-text-primary: #1e293b;
  --color-text-secondary: #64748b;
}
```

After editing:
1. Save changes in ServiceNow
2. Clear browser cache
3. Refresh BabelPhish page

### Add Custom AI Intents

Modify `script_include_babelphish_ajax.js`:

#### 1. Add Intent Detection

Find the `_detectIntent()` method and add:

```javascript
_detectIntent: function(message) {
  var msg = message.toLowerCase();

  // Add your custom intent
  if (msg.indexOf('custom keyword') > -1) {
    return 'custom_intent';
  }

  // Existing intents...
},
```

#### 2. Add Response Handler

Create a new handler method:

```javascript
_handleCustomQuery: function(message) {
  // Your custom logic here
  var response = 'Custom response based on: ' + message;
  return response;
},
```

#### 3. Update Response Generator

Find `_generateResponse()` and add:

```javascript
_generateResponse: function(intent, message) {
  switch(intent) {
    case 'custom_intent':
      return this._handleCustomQuery(message);
    // Other cases...
  }
},
```

### Add New Navigation Items

Edit `ui_page_babelphish_main.html`:

1. Find the `<nav class="sidebar-nav">` section
2. Copy an existing `<div class="nav-section">` block
3. Modify the text, icons, and onclick handlers
4. Add corresponding JavaScript function to handle navigation

Example:

```html
<div class="nav-section">
  <div class="nav-item" data-section="custom">
    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <!-- Your custom icon SVG -->
    </svg>
    <span>Custom Section</span>
    <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  </div>
  <div class="nav-subitems" id="custom-subitems">
    <div class="nav-item" data-item="customitem" onclick="navigateTo('customitem')">
      <span>Custom Item</span>
    </div>
  </div>
</div>
```

### Integrate External AI Services

To connect to OpenAI, Azure AI, or other services:

#### 1. Store API Key Securely

1. Navigate to **System Properties > System Properties**
2. Create new property:
   - **Name**: `babelphish.openai.api_key`
   - **Type**: string
   - **Encrypted**: Yes
   - **Value**: Your API key

#### 2. Update Script Include

Add REST call in `processMessage()`:

```javascript
processMessage: function() {
  var message = this.getParameter('sysparm_message');

  // Call external AI service
  var request = new sn_ws.RESTMessageV2();
  request.setEndpoint('https://api.openai.com/v1/chat/completions');
  request.setHttpMethod('POST');
  request.setRequestHeader('Authorization', 'Bearer ' + gs.getProperty('babelphish.openai.api_key'));
  request.setRequestHeader('Content-Type', 'application/json');

  var body = {
    model: 'gpt-4',
    messages: [
      {role: 'user', content: message}
    ]
  };

  request.setRequestBody(JSON.stringify(body));

  var response = request.execute();
  var responseBody = response.getBody();
  var parsedResponse = JSON.parse(responseBody);

  var answer = parsedResponse.choices[0].message.content;

  // Save conversation
  this._saveConversation(message, answer, 'external_ai', 1.0);

  return answer;
},
```

---

## Modular Architecture (Advanced)

For large-scale deployments, consider the modular architecture.

### Benefits

- **Maintainability**: Smaller, focused files
- **Reusability**: Share components across pages
- **Testability**: Unit test individual modules
- **Team Collaboration**: Multiple developers can work simultaneously
- **Performance**: Load only what's needed

### Architecture Overview

```
servicenow/
├── ui_pages/
│   └── babelphish_main.html          # Main shell (simplified)
├── ui_scripts/                        # Client-side JavaScript
│   ├── babelphish_utils.js
│   ├── babelphish_app.js
│   ├── babelphish_sidebar.js
│   ├── babelphish_navigation.js
│   └── babelphish_store.js
├── ui_macros/                         # Reusable HTML components
│   ├── babelphish_sidebar.xml
│   ├── babelphish_page_aistore.xml
│   └── babelphish_page_catalog.xml
├── script_includes/                   # Server-side logic
│   ├── babelphish_ajax.js
│   ├── babelphish_data_service.js
│   └── babelphish_auth_service.js
└── babelphish_styles.css             # Centralized styles
```

### Implementation Steps

See **MODULARIZATION_PLAN.md** for complete details.

**Quick Summary**:

1. **Phase 1**: Extract JavaScript into UI Scripts
2. **Phase 2**: Create UI Macros for HTML components
3. **Phase 3**: Create Script Includes for data access
4. **Phase 4**: Refactor main UI page to use modules
5. **Phase 5**: Test and deploy

**Timeline**: 4-5 weeks for full implementation

**Files Already Created**:
- `babelphish_utils.js` (192 lines)
- `babelphish_app.js` (113 lines)
- `babelphish_sidebar.js` (213 lines)
- `babelphish_navigation.js` (108 lines)
- `babelphish_store.js` (235 lines)

**Status**: 20% complete (5 of 8 UI Scripts created)

---

## Updating to Latest Version

### Current Version Status

**React Application**: v1.12.0 (Latest)
**ServiceNow Application**: v1.0.0 (Requires updates)

### Update to v1.12.0

To bring ServiceNow to parity with React v1.12.0:

#### Updates Required

1. **Collapsible Sidebar with Icon Toggle**
2. **Separate Expanded and Collapsed Navigation Views**
3. **Click-to-Open Flyout Menus**
4. **Toggle Button Icon Changes**
5. **Tooltips on Collapsed Icons**
6. **State Management for Collapsed Menus**

#### Detailed Instructions

See **SERVICENOW_UPDATE_INSTRUCTIONS.md** for step-by-step code changes.

**Summary of Changes**:

1. Update sidebar toggle button HTML (add IDs and title)
2. Add collapsed navigation section (200+ lines of HTML)
3. Wrap existing navigation in `expanded-nav` div
4. Update `toggleSidebar()` JavaScript function
5. Add collapsed menu management functions
6. Update navigation event handlers

**Estimated Time**: 30-45 minutes

**Risk Level**: Low (all changes are additive)

---

## Testing & Verification

### Test Checklist

#### Installation Tests

- [ ] Login page loads at `/babelphish_login.do`
- [ ] Main app loads at `/babelphish_main.do`
- [ ] CSS styles are applied correctly
- [ ] No JavaScript errors in console
- [ ] No server errors in logs

#### Functionality Tests

- [ ] Sidebar navigation works
- [ ] All menu items are clickable
- [ ] AI Store page displays
- [ ] Prompt Catalog page displays
- [ ] Find Answers page displays
- [ ] Message input accepts text
- [ ] AI responds to queries
- [ ] Conversations are saved to database

#### Sidebar Tests (v1.12.0)

- [ ] Sidebar collapses when toggle clicked
- [ ] Toggle icon changes correctly
- [ ] Collapsed view shows icons only
- [ ] Workspace flyout menu opens/closes
- [ ] Find Answers flyout menu opens/closes
- [ ] Only one flyout menu opens at a time
- [ ] Tooltips appear on hover in collapsed mode
- [ ] App content adjusts when sidebar collapsed

#### Security Tests

- [ ] Unauthenticated users cannot access main page
- [ ] Users can only see their own conversations
- [ ] ACLs prevent unauthorized data access
- [ ] Input is validated server-side

#### Browser Tests

Test in multiple browsers:
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

#### Mobile Tests

- [ ] Responsive design works on mobile
- [ ] Touch interactions work correctly
- [ ] No horizontal scrolling

### Performance Tests

1. **Page Load Time**: Should be < 3 seconds
2. **AI Response Time**: Should be < 2 seconds
3. **Navigation**: Should be instant (< 100ms)

Use browser Developer Tools to measure:
- Network tab for load times
- Performance tab for runtime metrics
- Console for any warnings or errors

---

## Troubleshooting

### Common Issues & Solutions

#### Issue: Page Not Found

**Symptoms**: 404 error when accessing BabelPhish

**Solutions**:
1. Verify UI pages are created with exact names:
   - `babelphish_login`
   - `babelphish_main`
2. Check URL matches format: `https://INSTANCE.service-now.com/PAGE_NAME.do`
3. Ensure pages are in correct application scope
4. Verify pages are active (check Active checkbox)

#### Issue: Access Denied

**Symptoms**: User sees "Access Denied" message

**Solutions**:
1. Check user is logged in to ServiceNow
2. Verify user has required roles (at least `user` role)
3. Check ACLs are configured correctly
4. Review system logs for permission errors
5. Ensure table `x_babelphish_conversation` exists
6. Verify Script Include is accessible from all scopes

#### Issue: AI Not Responding

**Symptoms**: Message input doesn't trigger response

**Solutions**:
1. Open browser console (F12) and check for JavaScript errors
2. Verify Script Include `BabelPhishAjax` exists
3. Confirm Script Include is marked as **Client Callable**
4. Check ServiceNow system logs for server errors
5. Test Script Include directly in Scripts - Background:
   ```javascript
   var ajax = new BabelPhishAjax();
   var result = ajax.processMessage();
   gs.info('Test result: ' + result);
   ```
6. Verify GlideAjax is correctly configured in UI page

#### Issue: Styles Not Applying

**Symptoms**: Page looks unstyled or broken

**Solutions**:
1. Verify CSS file uploaded to **System UI > CSS Includes**
2. Check CSS Include is **Active**
3. Confirm UI page references CSS correctly:
   ```xml
   <g:inline src="babelphish_styles.css" />
   ```
4. Clear browser cache (Ctrl+Shift+Del)
5. Hard refresh page (Ctrl+Shift+R or Cmd+Shift+R)
6. Check browser console for CSS loading errors
7. Verify no conflicting global styles

#### Issue: Login Not Working

**Symptoms**: Cannot authenticate

**Solutions**:
1. Verify credentials are correct
2. Check user account is active
3. Review session timeout settings
4. Try incognito/private browsing mode
5. Clear cookies and browser cache
6. Check ServiceNow authentication is working elsewhere
7. Review authentication configuration in UI page

#### Issue: Conversation History Not Saving

**Symptoms**: Conversations don't appear in table

**Solutions**:
1. Verify table `x_babelphish_conversation` exists
2. Check ACLs allow create operations
3. Review Script Include `_saveConversation()` method
4. Check system logs for database errors
5. Test direct insert:
   ```javascript
   var gr = new GlideRecord('x_babelphish_conversation');
   gr.initialize();
   gr.user = gs.getUserID();
   gr.message = 'test';
   gr.response = 'test response';
   gr.insert();
   ```

#### Issue: Sidebar Not Collapsing

**Symptoms**: Toggle button doesn't collapse sidebar

**Solutions**:
1. Check `toggleSidebar()` function exists in JavaScript
2. Verify button has correct onclick handler
3. Check CSS includes collapsed styles
4. Review browser console for JavaScript errors
5. Ensure IDs are correct: `sidebar`, `expanded-nav`, `collapsed-nav`
6. Verify v1.12.0 updates are applied (see SERVICENOW_UPDATE_INSTRUCTIONS.md)

#### Issue: Flyout Menus Not Working

**Symptoms**: Collapsed menu flyouts don't open

**Solutions**:
1. Verify collapsed navigation HTML is added
2. Check `toggleCollapsedMenu()` function exists
3. Confirm menu IDs match JavaScript references
4. Review CSS for `.collapsed-submenu` styles
5. Check browser console for errors
6. Ensure sidebar is actually collapsed

### Debug Mode

Enable ServiceNow debug mode:

1. Add `?sysparm_debug=true` to any URL
2. View detailed server logs
3. See SQL queries being executed
4. Review script execution times

Example: `https://INSTANCE.service-now.com/babelphish_main.do?sysparm_debug=true`

### Logging

Add logging to troubleshoot:

**Client-side**:
```javascript
console.log('BabelPhish: Message sent', message);
```

**Server-side**:
```javascript
gs.info('BabelPhish: Processing message - ' + message);
gs.error('BabelPhish: Error occurred - ' + error);
```

View logs at: **System Logs > System Log > All**

---

## Maintenance & Support

### Backup & Export

#### Export Application

1. Navigate to **System Applications > Applications**
2. Find BabelPhish application
3. Click application name
4. Related Links > **Export to XML**
5. Save XML file to safe location

#### Backup Database

1. Navigate to table: `/x_babelphish_conversation_list.do`
2. Export data to XML or Excel
3. Store backup regularly

### Updates & Upgrades

#### Before Updating

1. **Export current version** (backup)
2. **Test in sub-production** environment first
3. **Document all customizations** you've made
4. **Review changelog** for breaking changes
5. **Notify users** of upcoming changes

#### Apply Updates

1. Import new version to dev instance
2. Test all functionality
3. Compare with production version
4. Apply updates to production
5. Monitor for issues

### Monitoring Usage

#### Create Reports

1. Navigate to **Reports > Create New**
2. Data Source: `x_babelphish_conversation`
3. Metrics to track:
   - Total conversations per day
   - Most common intents
   - Average confidence scores
   - User satisfaction ratings
   - Response times

#### Dashboard

Create a dashboard with:
- **Usage Trends**: Conversations over time
- **Top Intents**: Most requested queries
- **User Satisfaction**: Feedback ratings
- **Performance**: Average response times

### Scheduled Maintenance

#### Clean Old Data

Create scheduled job to archive old conversations:

```javascript
var gr = new GlideRecord('x_babelphish_conversation');
gr.addQuery('sys_created_on', '<', gs.daysAgo(90));
gr.deleteMultiple();
```

#### Generate Reports

Schedule weekly usage reports:

```javascript
var report = new SNC.ReportGenerator();
report.generate('babelphish_usage_report');
```

### Getting Help

#### ServiceNow Resources

- **Documentation**: docs.servicenow.com
- **Community**: community.servicenow.com
- **Developer Portal**: developer.servicenow.com

#### BabelPhish Resources

- **README.md**: General overview
- **INSTALLATION_GUIDE.md**: Detailed setup (this file consolidates it)
- **QUICK_START.md**: 5-minute guide (this file consolidates it)
- **CSS_README.md**: Styling guide (this file consolidates it)
- **SERVICENOW_UPDATE_INSTRUCTIONS.md**: Version updates (this file consolidates it)
- **MODULARIZATION_PLAN.md**: Advanced architecture
- **MODULARIZATION_STATUS.md**: Current modular progress
- **SYNC_STATUS.md**: React/ServiceNow sync status
- **THEME_GUIDE.md**: Design system

#### Support Checklist

When seeking help, provide:
1. ServiceNow instance version
2. BabelPhish version
3. Error messages (browser console & system logs)
4. Steps to reproduce issue
5. Screenshots if applicable
6. Recent changes made

---

## Advanced Features

### Analytics Dashboard

Track BabelPhish usage with a custom dashboard:

1. **Create Report Source**:
   - Table: `x_babelphish_conversation`
   - Group by: Intent
   - Aggregate: Count

2. **Create Dashboard**:
   - Navigate to **Performance Analytics > Dashboards**
   - Add reports created above
   - Share with stakeholders

### Integration with Virtual Agent

Connect BabelPhish to ServiceNow Virtual Agent:

1. Create Virtual Agent topic
2. Add BabelPhish fallback handler
3. Route complex queries to BabelPhish AI

### External Integrations

#### Microsoft Teams

1. Create Teams webhook
2. Add webhook URL to BabelPhish
3. Send notifications to Teams

#### Slack

1. Create Slack app
2. Configure OAuth
3. Enable Slack commands for BabelPhish

#### Email Notifications

1. Create Notification record
2. Trigger on specific intents
3. Send email summaries

### Custom Roles

Create dedicated roles for better security:

1. **babelphish_user**: Basic access
2. **babelphish_power_user**: Advanced features
3. **babelphish_admin**: Configuration access

---

## Quick Reference

### URLs

- **Login**: `/babelphish_login.do`
- **Main App**: `/babelphish_main.do`
- **Conversations**: `/x_babelphish_conversation_list.do`
- **Studio**: `/now/nav/ui/classic/params/target/%24sn_studio_workspace.do`

### Table Names

- Conversations: `x_babelphish_conversation`
- Users: `sys_user`
- Incidents: `incident`
- Changes: `change_request`
- Knowledge: `kb_knowledge`

### Script Snippets

#### Test Table Exists

```javascript
var gr = new GlideRecord('x_babelphish_conversation');
gs.info('Table exists: ' + gr.isValid());
```

#### Test Script Include

```javascript
var ajax = new BabelPhishAjax();
ajax.setParameter('sysparm_message', 'test query');
var response = ajax.processMessage();
gs.info('AI Response: ' + response);
```

#### Clear All Conversations

```javascript
var gr = new GlideRecord('x_babelphish_conversation');
gr.deleteMultiple();
gs.info('All conversations cleared');
```

#### Count Conversations

```javascript
var gr = new GlideRecord('x_babelphish_conversation');
gr.query();
gs.info('Total conversations: ' + gr.getRowCount());
```

---

## Version History

### v1.12.0 (React - Latest)
- Collapsible sidebar with dynamic icon toggle
- Separated expanded and collapsed navigation views
- Click-to-open flyout menus for Workspace and Find Answers
- Tooltips on collapsed menu items
- State management for collapsed menus
- App container padding adjustment when sidebar collapsed

### v1.0.0 (ServiceNow - Current)
- Initial release
- Core AI conversation interface
- Intent detection (incidents, changes, knowledge, user)
- Beautiful login page
- Sidebar navigation
- Conversation history
- Authentication and security
- AI Store page
- Prompt Catalog page
- Find Answers page

### Update Path

To update ServiceNow from v1.0.0 to v1.12.0:
See **SERVICENOW_UPDATE_INSTRUCTIONS.md** section above

---

## Conclusion

You now have a complete guide to implementing BabelPhish in your ServiceNow instance.

### Next Steps

1. **Start with Quick Start** if you haven't installed yet
2. **Test thoroughly** using the test checklist
3. **Customize** to match your organization's needs
4. **Monitor usage** and gather feedback
5. **Plan updates** to stay current with latest features
6. **Consider modular architecture** for scaling

### Success Criteria

Your BabelPhish implementation is successful when:

- ✅ All users can access and use the interface
- ✅ AI responds accurately to queries
- ✅ Conversations are saved correctly
- ✅ Performance meets expectations
- ✅ Security and access controls are working
- ✅ Users report improved productivity
- ✅ Maintenance is straightforward

---

**BabelPhish** - Making ServiceNow More Human

*For questions, issues, or feature requests, refer to the Support section above.*

---

**Document Version**: 1.0
**Last Updated**: October 1, 2025
**Maintained By**: BabelPhish Development Team
