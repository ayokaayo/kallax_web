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
        setupRandomHeroVideo();
        setupForm();
        setupSmoothScroll();
        setupPhoneAnimations();
        setupIconAnimations();
        setupFAQ();
        setupPrivacyModal();
        setupTestimonials();
    }

    /**
     * Setup random hero video selection
     */
    function setupRandomHeroVideo() {
        const heroVideo = document.querySelector('.hero-video');
        if (!heroVideo) return;

        // Array of available hero videos
        const heroVideos = [
            'images/hero/dig.mp4',
            'images/hero/record1.mp4',
            'images/hero/record2.mp4',
            'images/hero/record3.mp4'
        ];

        // Select random video
        const randomVideo = heroVideos[Math.floor(Math.random() * heroVideos.length)];

        // Set the video source
        const source = heroVideo.querySelector('source');
        if (source) {
            source.src = randomVideo;
            heroVideo.load(); // Reload the video with new source
        }
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
                    console.error('Formspree error:', data);
                    // Show more specific error message
                    if (data.error) {
                        showFormMessage(form, 'error', `Error: ${data.error}. Please check your Formspree setup.`);
                    } else if (data.errors) {
                        showFormMessage(form, 'error', 'There was an error. Please try again or email us directly.');
                    } else {
                        showFormMessage(form, 'error', 'Something went wrong. Please try again.');
                    }
                }).catch(() => {
                    showFormMessage(form, 'error', 'There was an error. Please check your Formspree form is confirmed and try again.');
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
     * Setup scroll-based phone mockup animations
     */
    function setupPhoneAnimations() {
        const phoneItems = document.querySelectorAll('.phone-item');
        if (!phoneItems.length) return;

        // Options for the Intersection Observer
        const observerOptions = {
            root: null, // Use viewport as root
            rootMargin: '0px 0px -100px 0px', // Trigger slightly before element enters viewport
            threshold: 0.2 // Trigger when 20% of element is visible
        };

        // Callback function when intersection changes
        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Element is entering viewport - add visible class
                    entry.target.classList.add('phone-item-visible');
                } else {
                    // Element is leaving viewport - remove visible class for re-animation
                    entry.target.classList.remove('phone-item-visible');
                }
            });
        };

        // Create the observer
        const observer = new IntersectionObserver(observerCallback, observerOptions);

        // Observe each phone item
        phoneItems.forEach(item => {
            observer.observe(item);
        });
    }

    /**
     * Setup scroll-based icon feature animations
     */
    function setupIconAnimations() {
        const iconItems = document.querySelectorAll('.icon-item');
        if (!iconItems.length) return;

        // Options for the Intersection Observer
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -80px 0px',
            threshold: 0.1
        };

        // Callback function when intersection changes
        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Element is entering viewport - add visible class
                    entry.target.classList.add('icon-item-visible');
                } else {
                    // Element is leaving viewport - remove visible class for re-animation
                    entry.target.classList.remove('icon-item-visible');
                }
            });
        };

        // Create the observer
        const observer = new IntersectionObserver(observerCallback, observerOptions);

        // Observe each icon item
        iconItems.forEach(item => {
            observer.observe(item);
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

    /**
     * Set video playback rate to half speed for all phone showcase videos
     */
    function setupVideoPlaybackRate() {
        const phoneVideos = document.querySelectorAll('.phone-showcase video');
        phoneVideos.forEach(video => {
            // Set playback rate once video metadata is loaded
            if (video.readyState >= 2) {
                video.playbackRate = 0.5; // Half speed
            } else {
                video.addEventListener('loadedmetadata', function() {
                    this.playbackRate = 0.5; // Half speed
                });
            }
        });
    }

    // Set video playback rate
    setupVideoPlaybackRate();

    /**
     * Setup FAQ collapsible functionality
     */
    function setupFAQ() {
        const faqToggle = document.getElementById('faqToggle');
        const faqToggleBottom = document.getElementById('faqToggleBottom');
        const faqGrid = document.getElementById('faqGrid');

        if (!faqToggle || !faqGrid || !faqToggleBottom) return;

        function expandFAQ() {
            faqGrid.classList.add('faq-expanded');
            faqToggle.setAttribute('aria-expanded', 'true');
            faqToggle.style.display = 'none';

            // Show bottom button with delay for smooth transition
            setTimeout(() => {
                faqToggleBottom.style.display = 'inline-flex';
                setTimeout(() => {
                    faqToggleBottom.classList.add('visible');
                }, 10);
            }, 300);
        }

        function collapseFAQ() {
            faqGrid.classList.remove('faq-expanded');
            faqToggle.setAttribute('aria-expanded', 'false');
            faqToggleBottom.classList.remove('visible');

            // Hide bottom button and show top button after collapse animation
            setTimeout(() => {
                faqToggleBottom.style.display = 'none';
                faqToggle.style.display = 'inline-flex';
            }, 400);
        }

        faqToggle.addEventListener('click', expandFAQ);
        faqToggleBottom.addEventListener('click', collapseFAQ);
    }

    /**
     * Setup privacy policy modal
     */
    function setupPrivacyModal() {
        const privacyLink = document.getElementById('privacyLink');
        const privacyModal = document.getElementById('privacyModal');
        const closeButton = document.getElementById('privacyModalClose');

        if (!privacyLink || !privacyModal || !closeButton) return;

        // Open modal
        privacyLink.addEventListener('click', function(e) {
            e.preventDefault();
            privacyModal.classList.add('modal-open');
            document.body.style.overflow = 'hidden'; // Prevent background scroll

            // Focus the close button for accessibility
            setTimeout(() => {
                closeButton.focus();
            }, 100);
        });

        // Close modal function
        function closeModal() {
            privacyModal.classList.remove('modal-open');
            document.body.style.overflow = ''; // Restore scroll
            privacyLink.focus(); // Return focus to trigger element
        }

        // Close on button click
        closeButton.addEventListener('click', closeModal);

        // Close on overlay click
        privacyModal.addEventListener('click', function(e) {
            if (e.target === privacyModal) {
                closeModal();
            }
        });

        // Close on ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && privacyModal.classList.contains('modal-open')) {
                closeModal();
            }
        });
    }

    /**
     * Setup testimonials carousel with navigation
     */
    function setupTestimonials() {
        const prevButton = document.querySelector('.testimonial-nav-prev');
        const nextButton = document.querySelector('.testimonial-nav-next');
        const cards = document.querySelectorAll('.testimonial-card');

        if (!prevButton || !nextButton || !cards.length) return;

        let currentIndex = 0;

        // Initialize and update carousel based on viewport
        function updateCarousel() {
            const width = window.innerWidth;

            if (width <= 767) {
                // Mobile: show 1 card at a time
                cards.forEach((card, index) => {
                    if (index === currentIndex) {
                        card.classList.add('active');
                    } else {
                        card.classList.remove('active');
                    }
                });
            } else if (width >= 768 && width <= 1023) {
                // Tablet: show 2 cards at a time
                cards.forEach((card, index) => {
                    // Show current card and the next one
                    if (index === currentIndex || index === (currentIndex + 1) % cards.length) {
                        card.classList.add('active');
                    } else {
                        card.classList.remove('active');
                    }
                });
            } else {
                // Desktop: show all 3 cards
                cards.forEach(card => {
                    card.classList.add('active');
                });
            }
        }

        // Navigate to previous testimonial
        function goToPrev() {
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
            updateCarousel();
        }

        // Navigate to next testimonial
        function goToNext() {
            currentIndex = (currentIndex + 1) % cards.length;
            updateCarousel();
        }

        // Event listeners
        prevButton.addEventListener('click', goToPrev);
        nextButton.addEventListener('click', goToNext);

        // Handle window resize
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(updateCarousel, 100);
        });

        // Initialize carousel
        updateCarousel();
    }

})();

