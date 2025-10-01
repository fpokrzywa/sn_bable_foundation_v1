# BabelPhish for ServiceNow

> The Intelligent Experience - AI-Powered ServiceNow Assistant

BabelPhish is a conversational AI interface for ServiceNow that helps users interact naturally with their ServiceNow instance. Ask questions, get answers, and streamline your workflow with an intuitive chat-based experience.

## Features

- **Conversational Interface**: Natural language interaction with ServiceNow
- **Intent Detection**: Automatically understands user requests for incidents, changes, knowledge articles, and more
- **Beautiful UI**: Modern, clean interface with responsive design
- **Secure Authentication**: Built on ServiceNow's native authentication
- **Conversation History**: Tracks and stores all interactions
- **Extensible**: Easy to customize and extend with new features

## What's Included

### UI Components
- **Login Page**: Beautiful landing page with modal authentication (`ui_page_babelphish_login.html`)
- **Main Interface**: Sidebar navigation with AI chat interface (`ui_page_babelphish_main.html`)
- **Styles**: External CSS file for centralized theme management (`babelphish_styles.css`)
- **Responsive Design**: Works on desktop and mobile devices

### Backend Components
- **Script Include**: Server-side AI processing and intent detection (`script_include_babelphish_ajax.js`)
- **Database Table**: Conversation history storage (`table_schema_conversation.xml`)
- **AJAX Handlers**: Client-server communication

### Styling & Theme
- **CSS File**: `babelphish_styles.css` (31KB) - All application styles in one external file
- **Theme Variables**: Documented color palette, fonts, and design tokens
- **See**: `CSS_README.md` for CSS management instructions

### Navigation Features
- AI Tools (AI Store, Prompt Catalog)
- Workspace (Main Workspace, My Changes, Incidents, Bable)
- User Profile & Settings
- Find Answers (IT Support, HR Policies, Guides)
- Administration (User, Role, Company Management)

## Quick Start

1. **Read**: Start with `QUICK_START.md` for rapid deployment
2. **Install**: Follow the 7 steps to deploy in 5 minutes
3. **Configure**: Customize colors, responses, and features
4. **Use**: Access via BabelPhish menu in ServiceNow

## Documentation

- **QUICK_START.md** - Get up and running in 5 minutes
- **INSTALLATION_GUIDE.md** - Comprehensive installation and configuration guide

## Files Overview

```
servicenow/
├── ui_page_babelphish_main.html        # Main application interface
├── ui_page_babelphish_login.html       # Login page with authentication
├── script_include_babelphish_ajax.js   # Server-side AI logic
├── table_schema_conversation.xml       # Database schema
├── INSTALLATION_GUIDE.md               # Detailed installation guide
├── QUICK_START.md                      # Quick installation guide
└── README.md                           # This file
```

## Screenshots

### Login Page
- Clean landing page with BabelPhish branding
- Modal-based authentication
- Smooth animations and transitions

### Main Interface
- Sidebar with expandable navigation
- Welcome screen with quick actions
- AI chat input at the bottom
- User info and logout in footer

## Technology Stack

- **ServiceNow**: Platform (UI Pages, Script Includes, Tables)
- **JavaScript**: Client-side interactivity
- **Jelly**: ServiceNow templating
- **CSS3**: Modern styling with animations
- **SVG**: Icons and graphics

## Use Cases

### IT Support
- "Show me my open incidents"
- "Create a new ticket for password reset"
- "What's the status of incident INC0010001?"

### Change Management
- "List my pending change requests"
- "When is the next maintenance window?"
- "Create a standard change for software update"

### Knowledge Base
- "How do I reset my password?"
- "Help me with VPN access"
- "Show me guides for new employees"

### User Management
- "Update my profile information"
- "What roles do I have?"
- "Who is my manager?"

## Customization

### Change Branding
Edit CSS variables in UI pages:
```css
:root {
  --color-primary: #0ea5e9;
  --color-sidebar-bg: #f8fafc;
  --color-text-primary: #1e293b;
}
```

### Add Custom Intents
Edit `BabelPhishAjax` Script Include:
1. Update `_detectIntent()` method
2. Create handler method (e.g., `_handleCustomQuery()`)
3. Add case in `_generateResponse()`

### Integrate External AI
Add REST Message calls in Script Include:
```javascript
var request = new sn_ws.RESTMessageV2();
request.setEndpoint('https://api.openai.com/v1/chat/completions');
// Configure and send request
```

## Security

- **Authentication**: Required for all pages
- **Access Controls**: Users can only access their own data
- **Input Validation**: All inputs are validated server-side
- **Role-Based**: Supports ServiceNow role-based security

## Requirements

- ServiceNow instance (San Diego or later)
- Administrator access for installation
- Basic JavaScript/CSS knowledge for customization

## Installation

### Prerequisites
- ServiceNow instance URL
- Admin credentials
- 5-10 minutes of time

### Steps
1. Create scoped application in Studio
2. Create database table for conversations
3. Add Script Include for AI logic
4. Create UI Pages for interface
5. Configure menu and modules
6. Test the installation

See **QUICK_START.md** for detailed steps.

## Support

### Troubleshooting
Check these resources:
- Browser console (F12) for client errors
- ServiceNow System Logs for server errors
- ACLs for permission issues
- UI Page names for routing issues

### Common Issues
- **Page not found**: Check UI page names are correct
- **Access denied**: Verify user has required roles
- **AI not responding**: Check Script Include is Client Callable
- **Login fails**: Verify authentication configuration

## Roadmap

Future enhancements:
- Integration with ServiceNow Virtual Agent
- Machine learning for better intent detection
- Multi-language support
- Voice input/output
- Advanced analytics dashboard
- Mobile app integration

## Contributing

To extend BabelPhish:
1. Create custom intents in Script Include
2. Add new UI components in UI Pages
3. Extend database schema as needed
4. Document your changes
5. Test thoroughly

## License

This application is provided for use within your ServiceNow instance. Customize and extend as needed for your organization.

## Version

**Current Version**: 1.0.0

### Changelog
- **1.0.0** - Initial release
  - Core AI conversation interface
  - Intent detection (incidents, changes, knowledge, user)
  - Beautiful login page
  - Sidebar navigation
  - Conversation history
  - Authentication and security

## Credits

Created for ServiceNow users who want a modern, conversational interface for their daily tasks.

---

## Getting Started Now

1. **Start Here**: Open `QUICK_START.md`
2. **Follow Steps**: Complete the 5-minute installation
3. **Customize**: Make it yours with custom colors and features
4. **Deploy**: Share with your team

**Need Help?** Check the INSTALLATION_GUIDE.md for detailed instructions and troubleshooting.

---

**BabelPhish** - Making ServiceNow More Human
