/**
 * BabelPhish AI Store Controller
 * Manages the AI Store page functionality
 */
var BabelPhishStore = {

    assistants: [],
    favorites: [],
    currentFilter: 'All',
    searchQuery: '',

    /**
     * Initialize AI Store
     */
    initialize: function() {
        this.loadAssistants();
        this.bindEvents();
    },

    /**
     * Bind event handlers
     */
    bindEvents: function() {
        var self = this;

        var filterSelect = BabelPhishUtils.getElement('store-filter');
        if (filterSelect) {
            filterSelect.addEventListener('change', function() {
                self.currentFilter = this.value;
                self.render();
            });
        }

        var searchInput = BabelPhishUtils.getElement('store-search');
        if (searchInput) {
            searchInput.addEventListener('input', BabelPhishUtils.debounce(function() {
                self.searchQuery = this.value.toLowerCase();
                self.render();
            }, 300));
        }

        var refreshBtn = BabelPhishUtils.query('.ai-store-page .refresh-btn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', function() {
                self.refresh();
            });
        }
    },

    /**
     * Load assistants from server
     */
    loadAssistants: function() {
        this.assistants = [
            {
                id: '1',
                name: 'ODIN (Sample)',
                description: 'You are a helpful assistant named ODIN, you are a meta-agent.... (This is sample data)',
                model: 'gpt-4.1',
                icon: 'shopping-bag',
                iconColor: '#ec4899'
            },
            {
                id: '2',
                name: 'Prompt Architect (Sample)',
                description: 'You are a Prompt Architect AI. Your job is to write optimized system prompts....',
                model: 'gpt-4.1',
                icon: 'zap',
                iconColor: '#10b981'
            },
            {
                id: '3',
                name: 'Code Review Assistant',
                description: 'An AI assistant specialized in reviewing code for best practices, security issues, and optimization opportunities.',
                model: 'gpt-4.1',
                icon: 'shopping-bag',
                iconColor: '#3b82f6'
            },
            {
                id: '4',
                name: 'Content Writer',
                description: 'A creative writing assistant that helps you craft engaging content, blog posts, and marketing copy.',
                model: 'gpt-4.1',
                icon: 'zap',
                iconColor: '#f59e0b'
            }
        ];

        this.render();
    },

    /**
     * Filter and render assistants
     */
    render: function() {
        var filtered = this.assistants.filter(function(assistant) {
            var matchesSearch = assistant.name.toLowerCase().indexOf(this.searchQuery) !== -1;

            if (this.currentFilter === 'Favorites') {
                return matchesSearch && this.favorites.indexOf(assistant.id) !== -1;
            }

            return matchesSearch;
        }.bind(this));

        if (this.currentFilter === 'Name A-Z') {
            filtered.sort(function(a, b) { return a.name.localeCompare(b.name); });
        } else if (this.currentFilter === 'Name Z-A') {
            filtered.sort(function(a, b) { return b.name.localeCompare(a.name); });
        }

        this.renderGrid(filtered);
        this.updateCount(filtered.length);
    },

    /**
     * Render assistants grid
     * @param {Array} assistants - Filtered assistants
     */
    renderGrid: function(assistants) {
        var grid = BabelPhishUtils.getElement('assistants-grid');
        if (!grid) return;

        BabelPhishUtils.clearChildren(grid);

        assistants.forEach(function(assistant) {
            var card = this.createAssistantCard(assistant);
            grid.appendChild(card);
        }.bind(this));
    },

    /**
     * Create assistant card element
     * @param {Object} assistant - Assistant data
     * @returns {HTMLElement} Card element
     */
    createAssistantCard: function(assistant) {
        var isFavorite = this.favorites.indexOf(assistant.id) !== -1;

        var iconSvg = assistant.icon === 'shopping-bag'
            ? '<path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7"/>'
            : '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>';

        var card = document.createElement('div');
        card.className = 'assistant-card';
        card.innerHTML =
            '<div class="assistant-card-header">' +
                '<div class="assistant-icon-wrapper">' +
                    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="' + assistant.iconColor + '" stroke-width="2">' +
                        iconSvg +
                    '</svg>' +
                '</div>' +
                '<div class="assistant-title-section">' +
                    '<h3 class="assistant-name">' + BabelPhishUtils.escapeHtml(assistant.name) + '</h3>' +
                '</div>' +
                '<button class="favorite-btn ' + (isFavorite ? 'active' : '') + '" data-assistant-id="' + assistant.id + '">' +
                    '<svg width="20" height="20" viewBox="0 0 24 24" fill="' + (isFavorite ? 'currentColor' : 'none') + '" stroke="currentColor" stroke-width="2">' +
                        '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>' +
                    '</svg>' +
                '</button>' +
            '</div>' +
            '<p class="assistant-description">' + BabelPhishUtils.escapeHtml(assistant.description) + '</p>' +
            '<div class="assistant-model">' +
                '<span class="model-badge">' + BabelPhishUtils.escapeHtml(assistant.model) + '</span>' +
            '</div>';

        var favoriteBtn = card.querySelector('.favorite-btn');
        favoriteBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            this.toggleFavorite(assistant.id);
        }.bind(this));

        return card;
    },

    /**
     * Toggle favorite status
     * @param {string} id - Assistant ID
     */
    toggleFavorite: function(id) {
        var index = this.favorites.indexOf(id);
        if (index > -1) {
            this.favorites.splice(index, 1);
        } else {
            this.favorites.push(id);
        }
        this.render();
    },

    /**
     * Update assistant count display
     * @param {number} count - Number of assistants
     */
    updateCount: function(count) {
        var countElement = BabelPhishUtils.getElement('assistant-count');
        if (countElement) {
            countElement.textContent = count + ' assistant' + (count !== 1 ? 's' : '');
        }
    },

    /**
     * Refresh store
     */
    refresh: function() {
        this.currentFilter = 'All';
        this.searchQuery = '';

        var filterSelect = BabelPhishUtils.getElement('store-filter');
        if (filterSelect) filterSelect.value = 'All';

        var searchInput = BabelPhishUtils.getElement('store-search');
        if (searchInput) searchInput.value = '';

        this.loadAssistants();
    }
};
