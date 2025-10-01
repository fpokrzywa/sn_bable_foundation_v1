/**
 * BabelPhish Utility Functions
 * Shared utility functions used across the application
 */
var BabelPhishUtils = {

    /**
     * Show loading overlay
     */
    showLoading: function() {
        var overlay = document.getElementById('loading-overlay');
        if (overlay) {
            overlay.style.display = 'flex';
        }
    },

    /**
     * Hide loading overlay
     */
    hideLoading: function() {
        var overlay = document.getElementById('loading-overlay');
        if (overlay) {
            overlay.style.display = 'none';
        }
    },

    /**
     * Show error message
     * @param {string} message - Error message to display
     */
    showError: function(message) {
        alert('Error: ' + message);
    },

    /**
     * Show success message
     * @param {string} message - Success message to display
     */
    showSuccess: function(message) {
        console.log('Success: ' + message);
    },

    /**
     * Debounce function execution
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in milliseconds
     * @returns {Function} Debounced function
     */
    debounce: function(func, wait) {
        var timeout;
        return function executedFunction() {
            var context = this;
            var args = arguments;
            var later = function() {
                timeout = null;
                func.apply(context, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Escape HTML entities
     * @param {string} text - Text to escape
     * @returns {string} Escaped text
     */
    escapeHtml: function(text) {
        var map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, function(m) { return map[m]; });
    },

    /**
     * Generate UUID v4
     * @returns {string} UUID
     */
    generateUUID: function() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0;
            var v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },

    /**
     * Format date
     * @param {Date|string} date - Date to format
     * @returns {string} Formatted date string
     */
    formatDate: function(date) {
        if (typeof date === 'string') {
            date = new Date(date);
        }
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    },

    /**
     * Get element by ID safely
     * @param {string} id - Element ID
     * @returns {HTMLElement|null} Element or null
     */
    getElement: function(id) {
        return document.getElementById(id);
    },

    /**
     * Add event listener safely
     * @param {string} elementId - Element ID
     * @param {string} event - Event name
     * @param {Function} handler - Event handler
     */
    addEvent: function(elementId, event, handler) {
        var element = this.getElement(elementId);
        if (element) {
            element.addEventListener(event, handler);
        }
    },

    /**
     * Remove all child nodes
     * @param {HTMLElement} element - Parent element
     */
    clearChildren: function(element) {
        while (element && element.firstChild) {
            element.removeChild(element.firstChild);
        }
    },

    /**
     * Check if element has class
     * @param {HTMLElement} element - Element to check
     * @param {string} className - Class name
     * @returns {boolean} True if has class
     */
    hasClass: function(element, className) {
        return element && element.classList.contains(className);
    },

    /**
     * Add class to element
     * @param {HTMLElement} element - Element
     * @param {string} className - Class name
     */
    addClass: function(element, className) {
        if (element && !this.hasClass(element, className)) {
            element.classList.add(className);
        }
    },

    /**
     * Remove class from element
     * @param {HTMLElement} element - Element
     * @param {string} className - Class name
     */
    removeClass: function(element, className) {
        if (element && this.hasClass(element, className)) {
            element.classList.remove(className);
        }
    },

    /**
     * Toggle class on element
     * @param {HTMLElement} element - Element
     * @param {string} className - Class name
     */
    toggleClass: function(element, className) {
        if (element) {
            element.classList.toggle(className);
        }
    },

    /**
     * Query selector all wrapper
     * @param {string} selector - CSS selector
     * @param {HTMLElement} context - Context element (optional)
     * @returns {NodeList} List of matching elements
     */
    queryAll: function(selector, context) {
        context = context || document;
        return context.querySelectorAll(selector);
    },

    /**
     * Query selector wrapper
     * @param {string} selector - CSS selector
     * @param {HTMLElement} context - Context element (optional)
     * @returns {HTMLElement|null} First matching element
     */
    query: function(selector, context) {
        context = context || document;
        return context.querySelector(selector);
    }
};
