# BabelPhish Quick Start Guide

## What You Have

You now have all the files needed to deploy BabelPhish as a ServiceNow Scoped Application. Here's what's included:

### Files Overview

1. **ui_page_babelphish_main.html** - Main application interface with sidebar navigation and AI chat
2. **ui_page_babelphish_login.html** - Beautiful login page with modal authentication
3. **script_include_babelphish_ajax.js** - Server-side logic for AI processing
4. **table_schema_conversation.xml** - Database schema for conversation history
5. **INSTALLATION_GUIDE.md** - Comprehensive installation instructions
6. **QUICK_START.md** - This file

## Quick Installation (5 Minutes)

### Step 1: Log into ServiceNow
1. Go to: `https://dev309119.service-now.com`
2. Username: `ai_browser`
3. Password: `Appdev2025!`

### Step 2: Create Scoped Application
1. Navigate to: **System Applications > Studio**
2. Click: **Create Application**
3. Fill in:
   - Name: `BabelPhish`
   - Scope: `x_babelphish`
4. Click: **Create**

### Step 3: Create Database Table
1. In Studio, click: **Create Application File**
2. Select: **Data Model > Table**
3. Name: `BabelPhish Conversation`
4. Add these fields:

| Field Name | Type | Max Length | Reference |
|-----------|------|------------|-----------|
| user | Reference | 32 | sys_user |
| message | String | 4000 | - |
| response | String | 4000 | - |
| intent | String | 40 | - |
| confidence_score | Decimal | - | - |
| session_id | String | 40 | - |
| feedback_rating | Integer | - | - |
| feedback_comment | String | 1000 | - |

5. Submit

### Step 4: Create Script Include
1. Click: **Create Application File**
2. Select: **Server Development > Script Include**
3. Name: `BabelPhishAjax`
4. Check: **Client callable**
5. Paste code from: `script_include_babelphish_ajax.js`
6. Submit

### Step 5: Create UI Pages
1. Click: **Create Application File**
2. Select: **User Interface > UI Pages**
3. Create first page:
   - Name: `babelphish_login`
   - Paste code from: `ui_page_babelphish_login.html`
4. Create second page:
   - Name: `babelphish_main`
   - Paste code from: `ui_page_babelphish_main.html`
5. Submit both

### Step 6: Create Menu & Module
1. Click: **Create Application File**
2. Select: **User Interface > Application Menu**
3. Title: `BabelPhish`
4. Submit

5. Click: **Create Application File**
6. Select: **User Interface > Module**
7. Configure:
   - Title: `BabelPhish Home`
   - Application Menu: `BabelPhish`
   - Link Type: `URL (from arguments)`
   - Arguments: `babelphish_main.do`
8. Submit

### Step 7: Access BabelPhish
1. Refresh your browser
2. Find **BabelPhish** in the Application Navigator (left sidebar)
3. Click: **BabelPhish Home**
4. Enjoy your AI assistant!

## How to Use BabelPhish

### Navigation Menu

**AI Tools**
- AI Store - Browse available AI tools
- Prompt Catalog - View prompt templates

**Workspace**
- Main Workspace - Your primary work area
- My Changes - View your change requests
- Incidents - View your incident tickets
- Bable - Custom workspace

**User**
- Profile & Settings - Manage your profile

**Find Answers**
- IT Support Guides
- My Support Guides
- HR Policies
- NIEA Guides
- ADEPT Guides
- Freddie is IT

**Administration**
- User Management - Manage users
- Role Management - Manage roles
- Company Management - Manage companies

### AI Chat Features

Ask BabelPhish questions like:

- "Show me my incidents"
- "What change requests do I have?"
- "How do I reset my password?"
- "Help me with VPN access"
- "Create a new incident"

## Testing the Installation

### Test 1: Login Page
Navigate to: `https://dev309119.service-now.com/babelphish_login.do`
- You should see the landing page with fish logo
- Click "Login" button
- Login modal should appear

### Test 2: Main Interface
Navigate to: `https://dev309119.service-now.com/babelphish_main.do`
- You should see the sidebar with navigation
- Main content area with welcome message
- Input box at the bottom

### Test 3: AI Functionality
1. Type in the input box: "Show me my incidents"
2. Press Enter or click send icon
3. AI should respond with incident information

## Customization Quick Tips

### Change Colors
Edit the `:root` section in UI pages:
```css
:root {
  --color-primary: #0ea5e9;  /* Change to your brand color */
  --color-sidebar-bg: #f8fafc;
}
```

### Add New Menu Items
1. Find the sidebar-nav section in `ui_page_babelphish_main.html`
2. Copy an existing nav-section
3. Modify the text and icons
4. Add corresponding JavaScript handlers

### Customize AI Responses
Edit methods in `script_include_babelphish_ajax.js`:
- `_detectIntent()` - Add new keyword detection
- `_generateResponse()` - Modify response logic
- Create new handler methods for custom features

## Common URLs

- **Login Page**: `/babelphish_login.do`
- **Main App**: `/babelphish_main.do`
- **Conversation History**: `/x_babelphish_conversation_list.do`
- **Studio**: `/now/nav/ui/classic/params/target/%24sn_studio_workspace.do`

## Troubleshooting

### Issue: "Page not found"
**Solution**: Check that UI pages are created with exact names:
- `babelphish_login`
- `babelphish_main`

### Issue: "Access Denied"
**Solution**:
1. Check you're logged in
2. Verify ACLs are configured
3. Ensure user has required roles

### Issue: AI not responding
**Solution**:
1. Open browser console (F12)
2. Check for JavaScript errors
3. Verify Script Include is Client Callable
4. Check ServiceNow system logs

### Issue: Login not working
**Solution**:
- Verify you're using correct credentials
- Check session timeout settings
- Try clearing browser cache

## Next Steps

1. **Read the full Installation Guide** for detailed configuration options
2. **Customize the UI** to match your branding
3. **Add custom intents** for your specific use cases
4. **Integrate with external AI** services if needed
5. **Create reports** to track usage and feedback

## Support Resources

- **ServiceNow Docs**: docs.servicenow.com
- **System Logs**: Navigate to System Logs > System Log > All
- **Debug Mode**: Add `?sysparm_debug=true` to any URL

## Quick Reference

### File Locations in ServiceNow
- Tables: **System Definition > Tables**
- Script Includes: **System Definition > Script Includes**
- UI Pages: **System UI > UI Pages**
- ACLs: **System Security > Access Control (ACL)**

### Important Table Names
- Conversations: `x_babelphish_conversation`
- Users: `sys_user`
- Incidents: `incident`
- Changes: `change_request`
- Knowledge: `kb_knowledge`

### Useful Scripts

**Check if table exists:**
```javascript
var gr = new GlideRecord('x_babelphish_conversation');
gs.info('Table exists: ' + gr.isValid());
```

**Test Script Include:**
```javascript
var ajax = new BabelPhishAjax();
ajax.setParameter('sysparm_message', 'test');
var response = ajax.processMessage();
gs.info('Response: ' + response);
```

**Clear conversation history:**
```javascript
var gr = new GlideRecord('x_babelphish_conversation');
gr.deleteMultiple();
```

---

**You're Ready!**

Your BabelPhish application is ready to deploy. Follow the steps above and you'll have it running in minutes.

For detailed information, see **INSTALLATION_GUIDE.md**.
