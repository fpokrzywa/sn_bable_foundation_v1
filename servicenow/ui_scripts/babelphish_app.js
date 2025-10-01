/**
 * BabelPhish Application Controller
 * Main application initialization and coordination
 */
var BabelPhishApp = {

    isInitialized: false,

    /**
     * Initialize the application
     */
    initialize: function() {
        if (this.isInitialized) {
            console.log('BabelPhish already initialized');
            return;
        }

        console.log('Initializing BabelPhish application...');

        this.initSidebar();
        this.initNavigation();
        this.initPages();
        this.bindGlobalEvents();

        this.isInitialized = true;
        console.log('BabelPhish initialization complete');
    },

    /**
     * Initialize sidebar
     */
    initSidebar: function() {
        if (typeof BabelPhishSidebar !== 'undefined') {
            BabelPhishSidebar.initialize();
        }
    },

    /**
     * Initialize navigation
     */
    initNavigation: function() {
        if (typeof BabelPhishNavigation !== 'undefined') {
            BabelPhishNavigation.initialize();
        }
    },

    /**
     * Initialize all pages
     */
    initPages: function() {
        if (typeof BabelPhishStore !== 'undefined') {
            BabelPhishStore.initialize();
        }

        if (typeof BabelPhishCatalog !== 'undefined') {
            BabelPhishCatalog.initialize();
        }

        if (typeof BabelPhishFindAnswers !== 'undefined') {
            BabelPhishFindAnswers.initialize();
        }
    },

    /**
     * Bind global event handlers
     */
    bindGlobalEvents: function() {
        var messageInput = BabelPhishUtils.getElement('messageInput');
        if (messageInput) {
            messageInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    BabelPhishApp.sendMessage();
                }
            });
        }

        window.addEventListener('resize', BabelPhishUtils.debounce(function() {
            console.log('Window resized');
        }, 250));
    },

    /**
     * Send message from main input
     */
    sendMessage: function() {
        var input = BabelPhishUtils.getElement('messageInput');
        if (!input) return;

        var message = input.value.trim();
        if (message) {
            console.log('Sending message: ' + message);
            input.value = '';

            BabelPhishUtils.showLoading();

            var ga = new GlideAjax('BabelPhishAjax');
            ga.addParam('sysparm_name', 'processMessage');
            ga.addParam('sysparm_message', message);
            ga.getXML(function(response) {
                BabelPhishUtils.hideLoading();
                BabelPhishApp.handleMessageResponse(response);
            });
        }
    },

    /**
     * Handle message response
     * @param {Object} response - AJAX response
     */
    handleMessageResponse: function(response) {
        var answer = response.responseXML.documentElement.getAttribute('answer');
        console.log('AI Response: ' + answer);
        alert('BabelPhish says: ' + answer);
    },

    /**
     * Logout user
     */
    logout: function() {
        if (confirm('Are you sure you want to logout?')) {
            window.location.href = '/logout.do';
        }
    }
};
