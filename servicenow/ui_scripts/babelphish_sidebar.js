/**
 * BabelPhish Sidebar Controller
 * Manages sidebar state, toggle behavior, and collapsed menu interactions
 */
var BabelPhishSidebar = {

    isCollapsed: false,
    collapsedMenus: {
        workspace: false,
        findanswers: false
    },

    /**
     * Initialize sidebar
     */
    initialize: function() {
        this.bindEvents();
        this.initializeState();
    },

    /**
     * Bind event handlers
     */
    bindEvents: function() {
        var self = this;

        var toggleBtn = BabelPhishUtils.getElement('sidebar-toggle-btn');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', function() {
                self.toggle();
            });
        }

        this.bindExpandedNavigation();
        this.bindCollapsedNavigation();
    },

    /**
     * Bind expanded navigation events
     */
    bindExpandedNavigation: function() {
        var self = this;

        BabelPhishUtils.queryAll('[data-section]').forEach(function(item) {
            item.addEventListener('click', function(e) {
                if (self.isCollapsed) return;

                var section = this.getAttribute('data-section');
                self.toggleSection(section);
            });
        });
    },

    /**
     * Bind collapsed navigation events
     */
    bindCollapsedNavigation: function() {
        var self = this;

        var workspaceBtn = BabelPhishUtils.query('#collapsed-nav [data-menu="workspace"]');
        if (workspaceBtn) {
            workspaceBtn.addEventListener('click', function() {
                self.toggleCollapsedMenu('workspace');
            });
        }

        var findAnswersBtn = BabelPhishUtils.query('#collapsed-nav [data-menu="findanswers"]');
        if (findAnswersBtn) {
            findAnswersBtn.addEventListener('click', function() {
                self.toggleCollapsedMenu('findanswers');
            });
        }
    },

    /**
     * Initialize sidebar state
     */
    initializeState: function() {
        var savedState = localStorage.getItem('babelphish_sidebar_collapsed');
        if (savedState === 'true') {
            this.collapse();
        }
    },

    /**
     * Toggle sidebar collapsed/expanded
     */
    toggle: function() {
        if (this.isCollapsed) {
            this.expand();
        } else {
            this.collapse();
        }
    },

    /**
     * Collapse sidebar
     */
    collapse: function() {
        this.isCollapsed = true;

        var sidebar = BabelPhishUtils.getElement('sidebar');
        var appContainer = BabelPhishUtils.getElement('app-container');
        var toggleIcon = BabelPhishUtils.getElement('toggle-icon');
        var expandedNav = BabelPhishUtils.getElement('expanded-nav');
        var collapsedNav = BabelPhishUtils.getElement('collapsed-nav');
        var toggleButton = BabelPhishUtils.getElement('sidebar-toggle-btn');

        BabelPhishUtils.addClass(sidebar, 'collapsed');
        BabelPhishUtils.addClass(appContainer, 'sidebar-collapsed');

        if (expandedNav) expandedNav.style.display = 'none';
        if (collapsedNav) collapsedNav.style.display = 'block';

        if (toggleIcon) {
            toggleIcon.innerHTML = '<path d="M3 3h18v18H3z"/><path d="M15 3v18"/>';
        }

        if (toggleButton) {
            toggleButton.setAttribute('title', 'Expand');
        }

        this.hideAllCollapsedMenus();

        localStorage.setItem('babelphish_sidebar_collapsed', 'true');
    },

    /**
     * Expand sidebar
     */
    expand: function() {
        this.isCollapsed = false;

        var sidebar = BabelPhishUtils.getElement('sidebar');
        var appContainer = BabelPhishUtils.getElement('app-container');
        var toggleIcon = BabelPhishUtils.getElement('toggle-icon');
        var expandedNav = BabelPhishUtils.getElement('expanded-nav');
        var collapsedNav = BabelPhishUtils.getElement('collapsed-nav');
        var toggleButton = BabelPhishUtils.getElement('sidebar-toggle-btn');

        BabelPhishUtils.removeClass(sidebar, 'collapsed');
        BabelPhishUtils.removeClass(appContainer, 'sidebar-collapsed');

        if (expandedNav) expandedNav.style.display = 'block';
        if (collapsedNav) collapsedNav.style.display = 'none';

        if (toggleIcon) {
            toggleIcon.innerHTML = '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/>';
        }

        if (toggleButton) {
            toggleButton.setAttribute('title', 'Collapse');
        }

        this.hideAllCollapsedMenus();

        localStorage.setItem('babelphish_sidebar_collapsed', 'false');
    },

    /**
     * Toggle section in expanded navigation
     * @param {string} sectionName - Section name
     */
    toggleSection: function(sectionName) {
        var subitems = BabelPhishUtils.getElement(sectionName + '-subitems');
        var chevron = BabelPhishUtils.getElement('chevron-' + sectionName);

        if (!subitems) return;

        var isOpen = BabelPhishUtils.hasClass(subitems, 'open');

        BabelPhishUtils.queryAll('.nav-subitems').forEach(function(otherSubitems) {
            if (otherSubitems !== subitems) {
                BabelPhishUtils.removeClass(otherSubitems, 'open');
            }
        });

        BabelPhishUtils.queryAll('.chevron').forEach(function(otherChevron) {
            if (otherChevron !== chevron) {
                otherChevron.style.transform = 'rotate(0deg)';
            }
        });

        if (isOpen) {
            BabelPhishUtils.removeClass(subitems, 'open');
            if (chevron) chevron.style.transform = 'rotate(0deg)';
        } else {
            BabelPhishUtils.addClass(subitems, 'open');
            if (chevron) chevron.style.transform = 'rotate(90deg)';
        }
    },

    /**
     * Toggle collapsed menu flyout
     * @param {string} menuName - Menu name
     */
    toggleCollapsedMenu: function(menuName) {
        var menu = BabelPhishUtils.getElement('collapsed-' + menuName + '-menu');
        if (!menu) return;

        for (var key in this.collapsedMenus) {
            if (key !== menuName && this.collapsedMenus[key]) {
                this.hideCollapsedMenu(key);
            }
        }

        this.collapsedMenus[menuName] = !this.collapsedMenus[menuName];
        menu.style.display = this.collapsedMenus[menuName] ? 'block' : 'none';
    },

    /**
     * Hide specific collapsed menu
     * @param {string} menuName - Menu name
     */
    hideCollapsedMenu: function(menuName) {
        var menu = BabelPhishUtils.getElement('collapsed-' + menuName + '-menu');
        if (menu) {
            menu.style.display = 'none';
            this.collapsedMenus[menuName] = false;
        }
    },

    /**
     * Hide all collapsed menus
     */
    hideAllCollapsedMenus: function() {
        for (var key in this.collapsedMenus) {
            this.hideCollapsedMenu(key);
        }
    },

    /**
     * Set active navigation item
     * @param {string} itemName - Item name
     */
    setActiveItem: function(itemName) {
        BabelPhishUtils.queryAll('.nav-item').forEach(function(item) {
            BabelPhishUtils.removeClass(item, 'active');
        });

        var activeItem = BabelPhishUtils.query('[data-item="' + itemName + '"]');
        if (activeItem) {
            BabelPhishUtils.addClass(activeItem, 'active');
        }
    }
};
