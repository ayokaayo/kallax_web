/**
 * Kallax Landing Page - Form Handling & Interactions
 */

(function() {
    'use strict';

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        setupForm();
        setupSmoothScroll();
    }

    /**
     * Setup form submission handling
     */
    function setupForm() {
        const form = document.getElementById('waitlistForm');
        if (!form) return;

        form.addEventListener('submit', handleFormSubmit);
    }

    /**
     * Handle form submission
     */
    function handleFormSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        
        // Disable button and show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Submitting...';
        
        // Remove any existing messages
        removeFormMessages(form);
        
        // Get form data
        const formData = new FormData(form);
        
        // Submit to Formspree
        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                showFormMessage(form, 'success', 'Thanks! We\'ll be in touch soon.');
                form.reset();
            } else {
                return response.json().then(data => {
                    if (data.errors) {
                        showFormMessage(form, 'error', 'There was an error. Please try again or email us directly.');
                    } else {
                        showFormMessage(form, 'error', 'Something went wrong. Please try again.');
                    }
                });
            }
        })
        .catch(error => {
            console.error('Form submission error:', error);
            showFormMessage(form, 'error', 'Network error. Please check your connection and try again.');
        })
        .finally(() => {
            // Re-enable button
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        });
    }

    /**
     * Show form message
     */
    function showFormMessage(form, type, message) {
        // Remove existing messages
        removeFormMessages(form);
        
        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `form-message ${type}`;
        messageEl.textContent = message;
        messageEl.setAttribute('role', type === 'error' ? 'alert' : 'status');
        
        // Insert before submit button
        const submitButton = form.querySelector('button[type="submit"]');
        form.insertBefore(messageEl, submitButton);
        
        // Scroll to message
        messageEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Auto-remove success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                messageEl.remove();
            }, 5000);
        }
    }

    /**
     * Remove existing form messages
     */
    function removeFormMessages(form) {
        const messages = form.querySelectorAll('.form-message');
        messages.forEach(msg => msg.remove());
    }

    /**
     * Setup smooth scroll for anchor links
     */
    function setupSmoothScroll() {
        // Handle anchor links with smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    /**
     * Optional: Add video loading fallback
     */
    function setupVideoFallback() {
        const video = document.querySelector('.hero-video');
        if (!video) return;
        
        video.addEventListener('error', function() {
            // If video fails to load, hide video wrapper and show background
            const wrapper = this.closest('.hero-video-wrapper');
            if (wrapper) {
                wrapper.style.display = 'none';
            }
        });
    }

    // Initialize video fallback
    setupVideoFallback();

})();

