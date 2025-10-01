/**
 * BabelPhishAjax
 * Script Include for handling AJAX requests from BabelPhish UI
 *
 * Type: Client Callable
 * Accessible from: All application scopes
 */

var BabelPhishAjax = Class.create();
BabelPhishAjax.prototype = Object.extendsObject(AbstractAjaxProcessor, {

    /**
     * Process AI message from user
     * @returns {String} AI response
     */
    processMessage: function() {
        var message = this.getParameter('sysparm_message');

        if (!message) {
            return this._buildResponse('error', 'No message provided');
        }

        // Log the request
        gs.info('BabelPhish - Processing message: ' + message);

        // Get current user context
        var userID = gs.getUserID();
        var userName = gs.getUserName();
        var userEmail = gs.getUser().getEmail();

        // Check user permissions
        if (!this._hasAccess()) {
            return this._buildResponse('error', 'Access denied');
        }

        // Process the message based on intent
        var intent = this._detectIntent(message);
        var response = this._generateResponse(intent, message);

        // Store conversation history
        this._storeConversation(userID, message, response);

        return this._buildResponse('success', response);
    },

    /**
     * Get user's recent conversations
     * @returns {String} JSON array of conversations
     */
    getConversationHistory: function() {
        var userID = gs.getUserID();
        var limit = this.getParameter('sysparm_limit') || 10;

        var conversations = [];
        var gr = new GlideRecord('x_babelphish_conversation');
        gr.addQuery('user', userID);
        gr.orderByDesc('sys_created_on');
        gr.setLimit(limit);
        gr.query();

        while (gr.next()) {
            conversations.push({
                message: gr.getValue('message'),
                response: gr.getValue('response'),
                timestamp: gr.getValue('sys_created_on')
            });
        }

        return JSON.stringify(conversations);
    },

    /**
     * Search knowledge base
     * @returns {String} JSON array of articles
     */
    searchKnowledge: function() {
        var query = this.getParameter('sysparm_query');

        if (!query) {
            return JSON.stringify([]);
        }

        var articles = [];
        var gr = new GlideRecord('kb_knowledge');
        gr.addQuery('workflow_state', 'published');
        gr.addQuery('short_description', 'CONTAINS', query)
            .addOrCondition('text', 'CONTAINS', query);
        gr.setLimit(5);
        gr.query();

        while (gr.next()) {
            articles.push({
                sys_id: gr.getValue('sys_id'),
                number: gr.getValue('number'),
                short_description: gr.getValue('short_description'),
                text: gr.getValue('text').substring(0, 200) + '...'
            });
        }

        return JSON.stringify(articles);
    },

    /**
     * Get user's incidents
     * @returns {String} JSON array of incidents
     */
    getMyIncidents: function() {
        var userID = gs.getUserID();
        var incidents = [];

        var gr = new GlideRecord('incident');
        gr.addQuery('caller_id', userID);
        gr.addQuery('active', true);
        gr.orderByDesc('sys_created_on');
        gr.setLimit(10);
        gr.query();

        while (gr.next()) {
            incidents.push({
                sys_id: gr.getValue('sys_id'),
                number: gr.getValue('number'),
                short_description: gr.getValue('short_description'),
                state: gr.getDisplayValue('state'),
                priority: gr.getDisplayValue('priority'),
                created_on: gr.getValue('sys_created_on')
            });
        }

        return JSON.stringify(incidents);
    },

    /**
     * Get user's change requests
     * @returns {String} JSON array of changes
     */
    getMyChanges: function() {
        var userID = gs.getUserID();
        var changes = [];

        var gr = new GlideRecord('change_request');
        gr.addQuery('requested_by', userID);
        gr.addQuery('active', true);
        gr.orderByDesc('sys_created_on');
        gr.setLimit(10);
        gr.query();

        while (gr.next()) {
            changes.push({
                sys_id: gr.getValue('sys_id'),
                number: gr.getValue('number'),
                short_description: gr.getValue('short_description'),
                state: gr.getDisplayValue('state'),
                priority: gr.getDisplayValue('priority'),
                created_on: gr.getValue('sys_created_on')
            });
        }

        return JSON.stringify(changes);
    },

    /**
     * Detect intent from user message
     * @private
     */
    _detectIntent: function(message) {
        message = message.toLowerCase();

        if (message.indexOf('incident') >= 0 || message.indexOf('ticket') >= 0) {
            return 'incidents';
        }

        if (message.indexOf('change') >= 0 || message.indexOf('cr') >= 0) {
            return 'changes';
        }

        if (message.indexOf('how to') >= 0 || message.indexOf('help') >= 0) {
            return 'knowledge';
        }

        if (message.indexOf('user') >= 0 || message.indexOf('profile') >= 0) {
            return 'user';
        }

        return 'general';
    },

    /**
     * Generate response based on intent
     * @private
     */
    _generateResponse: function(intent, message) {
        var response = '';

        switch (intent) {
            case 'incidents':
                response = this._handleIncidentQuery(message);
                break;
            case 'changes':
                response = this._handleChangeQuery(message);
                break;
            case 'knowledge':
                response = this._handleKnowledgeQuery(message);
                break;
            case 'user':
                response = this._handleUserQuery(message);
                break;
            default:
                response = 'I understand you\'re asking about "' + message + '". ' +
                          'I can help you with incidents, changes, knowledge articles, and user information. ' +
                          'What would you like to know more about?';
        }

        return response;
    },

    /**
     * Handle incident related queries
     * @private
     */
    _handleIncidentQuery: function(message) {
        var userID = gs.getUserID();
        var gr = new GlideRecord('incident');
        gr.addQuery('caller_id', userID);
        gr.addQuery('active', true);
        gr.query();

        var count = gr.getRowCount();

        if (count === 0) {
            return 'You currently have no open incidents.';
        }

        return 'You have ' + count + ' open incident' + (count > 1 ? 's' : '') + '. ' +
               'Would you like me to show you the details?';
    },

    /**
     * Handle change request queries
     * @private
     */
    _handleChangeQuery: function(message) {
        var userID = gs.getUserID();
        var gr = new GlideRecord('change_request');
        gr.addQuery('requested_by', userID);
        gr.addQuery('active', true);
        gr.query();

        var count = gr.getRowCount();

        if (count === 0) {
            return 'You currently have no active change requests.';
        }

        return 'You have ' + count + ' active change request' + (count > 1 ? 's' : '') + '. ' +
               'Would you like me to show you the details?';
    },

    /**
     * Handle knowledge base queries
     * @private
     */
    _handleKnowledgeQuery: function(message) {
        // Extract keywords from message
        var keywords = message.replace(/how to|help|with|me|please/gi, '').trim();

        if (!keywords) {
            return 'I can help you find information. What topic are you interested in?';
        }

        var gr = new GlideRecord('kb_knowledge');
        gr.addQuery('workflow_state', 'published');
        gr.addQuery('short_description', 'CONTAINS', keywords);
        gr.setLimit(1);
        gr.query();

        if (gr.next()) {
            return 'I found a knowledge article that might help: "' +
                   gr.getValue('short_description') + '". ' +
                   'Would you like me to open it?';
        }

        return 'I couldn\'t find any knowledge articles matching "' + keywords + '". ' +
               'Would you like to submit a request for more information?';
    },

    /**
     * Handle user profile queries
     * @private
     */
    _handleUserQuery: function(message) {
        var user = gs.getUser();
        var name = user.getFullName();
        var email = user.getEmail();
        var department = user.getDepartment();

        return 'Your profile: ' + name + ' (' + email + ')' +
               (department ? ', Department: ' + department : '') + '. ' +
               'What would you like to update?';
    },

    /**
     * Store conversation in database
     * @private
     */
    _storeConversation: function(userID, message, response) {
        try {
            var gr = new GlideRecord('x_babelphish_conversation');
            gr.initialize();
            gr.setValue('user', userID);
            gr.setValue('message', message);
            gr.setValue('response', response);
            gr.insert();
        } catch (e) {
            gs.error('BabelPhish - Failed to store conversation: ' + e.message);
        }
    },

    /**
     * Check if user has access to BabelPhish
     * @private
     */
    _hasAccess: function() {
        // Check if user is authenticated
        if (!gs.getUser().getID()) {
            return false;
        }

        // Add additional role checks if needed
        // Example: return gs.hasRole('babelphish_user');

        return true;
    },

    /**
     * Build standardized response
     * @private
     */
    _buildResponse: function(status, data) {
        var response = {
            status: status,
            data: data,
            timestamp: new GlideDateTime().getValue()
        };

        return JSON.stringify(response);
    },

    type: 'BabelPhishAjax'
});
