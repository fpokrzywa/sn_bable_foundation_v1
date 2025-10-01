/**
 * BabelPhish Navigation Controller
 * Manages page navigation and routing
 */
var BabelPhishNavigation = {

    currentPage: 'welcome',

    /**
     * Initialize navigation
     */
    initialize: function() {
        this.bindNavigationEvents();
        this.showPage('welcome');
    },

    /**
     * Bind navigation event handlers
     */
    bindNavigationEvents: function() {
        var self = this;

        BabelPhishUtils.queryAll('[data-item]').forEach(function(item) {
            item.addEventListener('click', function(e) {
                e.stopPropagation();

                var itemName = this.getAttribute('data-item');
                self.navigateTo(itemName);
            });
        });
    },

    /**
     * Navigate to a destination
     * @param {string} destination - Destination identifier
     */
    navigateTo: function(destination) {
        console.log('Navigating to: ' + destination);

        BabelPhishSidebar.hideAllCollapsedMenus();

        BabelPhishUtils.queryAll('.nav-item').forEach(function(item) {
            BabelPhishUtils.removeClass(item, 'active');
        });

        var activeItem = BabelPhishUtils.query('[data-item="' + destination + '"]');
        if (activeItem) {
            BabelPhishUtils.addClass(activeItem, 'active');
        }

        if (destination === 'aistore') {
            this.showPage('aistore');
        } else if (destination === 'promptcatalog') {
            this.showPage('promptcatalog');
        } else if (destination.indexOf('findanswers-') === 0) {
            var category = destination.replace('findanswers-', '');
            this.showFindAnswersPage(category);
        } else if (destination === 'incidents') {
            window.location.href = 'incident_list.do';
        } else if (destination === 'mychanges') {
            window.location.href = 'change_request_list.do';
        } else if (destination === 'profile') {
            this.showPage('profile');
        } else if (destination === 'usermanagement') {
            this.showPage('usermanagement');
        } else if (destination === 'rolemanagement') {
            this.showPage('rolemanagement');
        } else if (destination === 'companymanagement') {
            this.showPage('companymanagement');
        } else {
            this.showPage('welcome');
        }
    },

    /**
     * Show a specific page
     * @param {string} pageId - Page identifier
     */
    showPage: function(pageId) {
        BabelPhishUtils.queryAll('.page-container').forEach(function(page) {
            BabelPhishUtils.removeClass(page, 'active');
        });

        var page = BabelPhishUtils.getElement(pageId + '-page');
        if (page) {
            BabelPhishUtils.addClass(page, 'active');
            this.currentPage = pageId;
        } else {
            var welcomePage = BabelPhishUtils.getElement('welcome-page');
            if (welcomePage) {
                BabelPhishUtils.addClass(welcomePage, 'active');
                this.currentPage = 'welcome';
            }
        }
    },

    /**
     * Show Find Answers page with specific category
     * @param {string} category - Category identifier
     */
    showFindAnswersPage: function(category) {
        if (typeof BabelPhishFindAnswers !== 'undefined') {
            BabelPhishFindAnswers.showCategory(category);
        }
        this.showPage('findanswers');
    },

    /**
     * Get current page
     * @returns {string} Current page identifier
     */
    getCurrentPage: function() {
        return this.currentPage;
    },

    /**
     * Go back to previous page
     */
    goBack: function() {
        window.history.back();
    }
};
