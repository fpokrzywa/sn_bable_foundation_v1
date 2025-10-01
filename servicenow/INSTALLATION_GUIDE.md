# BabelPhish ServiceNow Installation Guide

## Overview

BabelPhish is an intelligent AI assistant for ServiceNow that provides users with a conversational interface to interact with ServiceNow data and services. This guide will walk you through the installation and configuration process.

## Prerequisites

- ServiceNow instance (tested on San Diego, Tokyo, Utah, Vancouver releases)
- Administrator access to the instance
- Basic understanding of ServiceNow development concepts

## Installation Steps

### Step 1: Create a Scoped Application

1. Log into your ServiceNow instance as an administrator
2. Navigate to **System Applications > Studio**
3. Click **Create Application**
4. Fill in the application details:
   - **Name**: BabelPhish
   - **Scope**: x_babelphish (or your preferred scope name)
   - **Version**: 1.0.0
5. Click **Create**

### Step 2: Create the Conversation History Table

1. In Studio, click **Create Application File**
2. Select **Data Model > Table**
3. Configure the table:
   - **Label**: BabelPhish Conversation
   - **Name**: x_babelphish_conversation (auto-generated)
   - **Extends**: Base Table
   - **Add module to menu**: Yes
   - **Create access controls**: Yes

4. Add the following fields (columns):

   | Label | Name | Type | Max Length | Reference | Mandatory |
   |-------|------|------|------------|-----------|-----------|
   | User | user | Reference | 32 | sys_user | Yes |
   | Message | message | String | 4000 | - | Yes |
   | Response | response | String | 4000 | - | Yes |
   | Intent | intent | String | 40 | - | No |
   | Confidence Score | confidence_score | Decimal | - | - | No |
   | Session ID | session_id | String | 40 | - | No |
   | Feedback Rating | feedback_rating | Integer | - | - | No |
   | Feedback Comment | feedback_comment | String | 1000 | - | No |

5. Click **Submit**

### Step 3: Create the Script Include

1. In Studio, click **Create Application File**
2. Select **Server Development > Script Include**
3. Configure:
   - **Name**: BabelPhishAjax
   - **API Name**: x_babelphish.BabelPhishAjax
   - **Client callable**: Check this box
   - **Accessible from**: All application scopes

4. Copy and paste the code from `script_include_babelphish_ajax.js`
5. Click **Submit**

### Step 4: Create the Login UI Page

1. In Studio, click **Create Application File**
2. Select **User Interface > UI Pages**
3. Configure:
   - **Name**: babelphish_login
   - **Category**: general

4. Copy and paste the code from `ui_page_babelphish_login.html`
5. Click **Submit**

### Step 5: Create the Main UI Page

1. In Studio, click **Create Application File**
2. Select **User Interface > UI Pages**
3. Configure:
   - **Name**: babelphish_main
   - **Category**: general

4. Copy and paste the code from `ui_page_babelphish_main.html`
5. Click **Submit**

### Step 6: Configure Access Control Rules (ACLs)

1. Navigate to **System Security > Access Control (ACL)**
2. Create ACLs for the conversation table:

#### Read ACL
- **Type**: record
- **Operation**: read
- **Name**: x_babelphish_conversation
- **Requires role**: user
- **Script**:
```javascript
// Users can only read their own conversations
answer = current.user == gs.getUserID() || gs.hasRole('admin');
```

#### Create ACL
- **Type**: record
- **Operation**: create
- **Name**: x_babelphish_conversation
- **Requires role**: user

#### Write ACL
- **Type**: record
- **Operation**: write
- **Name**: x_babelphish_conversation
- **Requires role**: user
- **Script**:
```javascript
// Users can only update their own conversations
answer = current.user == gs.getUserID() || gs.hasRole('admin');
```

#### Delete ACL
- **Type**: record
- **Operation**: delete
- **Name**: x_babelphish_conversation
- **Requires role**: admin

### Step 7: Create Application Menu

1. In Studio, click **Create Application File**
2. Select **User Interface > Application Menu**
3. Configure:
   - **Title**: BabelPhish
   - **Hint**: AI-powered ServiceNow assistant
   - **Order**: 100

4. Click **Submit**

### Step 8: Create Module

1. In Studio, click **Create Application File**
2. Select **User Interface > Module**
3. Configure:
   - **Title**: BabelPhish Home
   - **Application Menu**: BabelPhish (created in Step 7)
   - **Link Type**: URL (from arguments)
   - **Arguments**: babelphish_main.do
   - **Order**: 100

4. Click **Submit**

### Step 9: Configure Authentication

By default, BabelPhish uses ServiceNow's built-in authentication. The UI Pages check for active sessions and redirect unauthenticated users to the login page.

No additional configuration is needed unless you want to customize the authentication flow.

### Step 10: Test the Installation

1. Navigate to **BabelPhish > BabelPhish Home** in the application navigator
2. You should see the BabelPhish landing page
3. Click **Login** to access the main interface
4. Test the AI assistant by asking questions like:
   - "Show me my incidents"
   - "What change requests do I have?"
   - "Help me with password reset"

## Configuration Options

### Customize AI Responses

Edit the `BabelPhishAjax` Script Include to customize how the AI responds to different queries. The main methods to modify are:

- `_detectIntent()`: Customize intent detection logic
- `_generateResponse()`: Modify response generation
- `_handleIncidentQuery()`: Customize incident-related responses
- `_handleChangeQuery()`: Customize change request responses
- `_handleKnowledgeQuery()`: Customize knowledge base responses

### Add Custom Intents

To add new intents:

1. Update `_detectIntent()` method to recognize new keywords
2. Create a new handler method (e.g., `_handleCustomQuery()`)
3. Add a case in `_generateResponse()` to call your new handler

### Integrate with External AI Services

To integrate with external AI services (OpenAI, Azure AI, etc.):

1. Create a REST Message to the AI service endpoint
2. Update the `processMessage()` method to call the external service
3. Store API credentials in System Properties (encrypted)

Example:
```javascript
var request = new sn_ws.RESTMessageV2();
request.setEndpoint('https://api.openai.com/v1/chat/completions');
request.setHttpMethod('POST');
request.setRequestHeader('Authorization', 'Bearer ' + gs.getProperty('babelphish.openai.api_key'));
// ... configure and send request
```

### Customize the UI

To customize colors, fonts, or layout:

1. Edit the `<style>` section in the UI Pages
2. Modify CSS variables in `:root` selector
3. Adjust component styles as needed

## Security Considerations

1. **Authentication**: All UI pages enforce authentication. Users must be logged in to access BabelPhish.

2. **Data Access**: ACLs ensure users can only access their own conversation history.

3. **Input Validation**: The Script Include validates all user inputs before processing.

4. **API Keys**: If integrating with external AI services, store API keys in System Properties with encryption enabled.

5. **Roles**: Consider creating custom roles:
   - `babelphish_user`: Basic access to BabelPhish
   - `babelphish_admin`: Administrative access for configuration

## Troubleshooting

### Login page not loading
- Check that the UI page `babelphish_login` is created and active
- Verify URL: `https://YOUR_INSTANCE.service-now.com/babelphish_login.do`

### AI responses not working
- Check browser console for JavaScript errors
- Verify the Script Include `BabelPhishAjax` is Client Callable
- Check ServiceNow logs for server-side errors

### Conversation history not saving
- Verify the table `x_babelphish_conversation` exists
- Check ACLs allow create operations
- Review Script Include logs for errors

### Authentication errors
- Ensure user has required roles
- Check session timeout settings
- Verify ACLs are correctly configured

## Maintenance

### Backup
Regularly export your application:
1. Navigate to **System Applications > Applications**
2. Find BabelPhish application
3. Related Links > **Export to XML**

### Updates
When updating BabelPhish:
1. Export current version (backup)
2. Test changes in a sub-production instance
3. Document all customizations
4. Apply updates to production

### Monitoring
Monitor BabelPhish usage:
1. Create reports on `x_babelphish_conversation` table
2. Track most common intents
3. Review feedback ratings
4. Monitor response times

## Support

For issues or questions:
1. Check ServiceNow System Logs for errors
2. Review browser console for client-side issues
3. Verify configuration against this guide

## Advanced Features (Optional)

### Analytics Dashboard

Create a dashboard to track:
- Total conversations
- Most common intents
- Average confidence scores
- User satisfaction ratings

### Scheduled Jobs

Create scheduled jobs to:
- Clean up old conversations
- Generate usage reports
- Train AI models with conversation data

### Integration Points

BabelPhish can be extended to integrate with:
- ServiceNow Virtual Agent
- Microsoft Teams
- Slack
- Email notifications
- Custom APIs

## Version History

- **1.0.0** - Initial release
  - Basic AI conversation interface
  - Intent detection for incidents, changes, knowledge
  - Conversation history storage
  - Authentication and access controls

## License

This application is provided as-is for use within your ServiceNow instance.

---

**Installation Complete!**

Your BabelPhish application should now be fully functional. Navigate to the BabelPhish menu to start using your intelligent AI assistant.
