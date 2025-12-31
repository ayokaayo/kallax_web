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
        setupFAQVideo();
        setupForm();
        setupSmoothScroll();
        setupPhoneAnimations();
        setupIconAnimations();
        setupFAQ();
        setupPrivacyModal();
        setupTestimonials();
        setupLazyVideoLoading();
        setupVideoPlaceholders();
        setupScrollDepthTracking();
        setupCountdown();
        setupWaitlistCounter();
        setupExitIntent();
        setupStickyCTA();
        optimizeTouchTargets();
    }

    /**
     * Analytics helper function
     */
    function trackEvent(eventName, props = {}) {
        if (window.plausible) {
            window.plausible(eventName, { props });
        }
    }

    /**
     * Setup random hero video selection with WebM + MP4 sources
     */
    function setupRandomHeroVideo() {
        const heroVideo = document.querySelector('.hero-video');
        if (!heroVideo) return;

        // Array of available hero videos (without extension)
        const heroVideos = [
            'images/hero/dig',
            'images/hero/record1',
            'images/hero/record2',
            'images/hero/record3'
        ];

        // Select random video
        const randomVideo = heroVideos[Math.floor(Math.random() * heroVideos.length)];

        // Try to use compressed WebM first, fallback to original MP4
        const sourceWebm = document.createElement('source');
        sourceWebm.src = `${randomVideo}.webm`;
        sourceWebm.type = 'video/webm';

        const sourceMp4Compressed = document.createElement('source');
        sourceMp4Compressed.src = `${randomVideo}_compressed.mp4`;
        sourceMp4Compressed.type = 'video/mp4';

        const sourceMp4Original = document.createElement('source');
        sourceMp4Original.src = `${randomVideo}.mp4`;
        sourceMp4Original.type = 'video/mp4';

        // Add sources to video element (browser tries in order)
        heroVideo.appendChild(sourceWebm);
        heroVideo.appendChild(sourceMp4Compressed);
        heroVideo.appendChild(sourceMp4Original);

        // Load the video
        heroVideo.load();

        // Explicitly trigger play for mobile compatibility
        const playPromise = heroVideo.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log('Hero video autoplay prevented:', error);
                // Video will try to autoplay when user interacts with page
                const playOnInteraction = () => {
                    heroVideo.play().catch(e => console.log('Hero play failed:', e));
                };
                document.addEventListener('touchstart', playOnInteraction, { once: true });
                document.addEventListener('click', playOnInteraction, { once: true });
            });
        }
    }

    /**
     * Setup FAQ background video playback for mobile
     */
    function setupFAQVideo() {
        const faqVideo = document.querySelector('.faq-video');
        if (!faqVideo) return;

        // Explicitly trigger play for mobile compatibility
        const playPromise = faqVideo.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log('FAQ video autoplay prevented:', error);
                // Video will try to autoplay when user interacts with page
                const playOnInteraction = () => {
                    faqVideo.play().catch(e => console.log('FAQ play failed:', e));
                };
                document.addEventListener('touchstart', playOnInteraction, { once: true });
                document.addEventListener('click', playOnInteraction, { once: true });
            });
        }
    }

    /**
     * Setup form submission handling
     */
    function setupForm() {
        const form = document.getElementById('waitlistForm');
        if (!form) return;

        // Track when user starts filling the form
        const emailInput = form.querySelector('input[name="email"]');
        if (emailInput) {
            emailInput.addEventListener('focus', function() {
                trackEvent('waitlist_form_start');
            }, { once: true });
        }

        form.addEventListener('submit', function(e) {
            trackEvent('waitlist_form_submit');
            handleFormSubmit(e);
        });
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
                trackEvent('waitlist_form_success');
                showFormMessage(form, 'success', 'Thanks! We\'ll be in touch soon.');
                form.reset();
            } else {
                trackEvent('waitlist_form_error');

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
     * Setup lazy loading for phone mockup videos
     * Videos only load when scrolled into viewport
     */
    function setupLazyVideoLoading() {
        const phoneVideos = document.querySelectorAll('.phone-screen[data-src-mp4]');
        if (!phoneVideos.length) return;

        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const video = entry.target;
                    const webmSrc = video.dataset.srcWebm;
                    const mp4CompressedSrc = video.dataset.srcMp4;

                    // Get original MP4 path (remove _compressed)
                    const mp4OriginalSrc = mp4CompressedSrc.replace('_compressed', '');

                    // Ensure video has required attributes for mobile autoplay
                    video.setAttribute('autoplay', '');
                    video.setAttribute('muted', '');
                    video.setAttribute('playsinline', '');

                    // Create WebM source (modern browsers, smallest)
                    const sourceWebm = document.createElement('source');
                    sourceWebm.src = webmSrc;
                    sourceWebm.type = 'video/webm';

                    // Create compressed MP4 source
                    const sourceMp4Compressed = document.createElement('source');
                    sourceMp4Compressed.src = mp4CompressedSrc;
                    sourceMp4Compressed.type = 'video/mp4';

                    // Create original MP4 source (fallback if compressed doesn't exist)
                    const sourceMp4Original = document.createElement('source');
                    sourceMp4Original.src = mp4OriginalSrc;
                    sourceMp4Original.type = 'video/mp4';

                    // Add sources and load video (browser tries in order)
                    video.appendChild(sourceWebm);
                    video.appendChild(sourceMp4Compressed);
                    video.appendChild(sourceMp4Original);
                    video.load();

                    // Handle play() promise for mobile compatibility
                    const playPromise = video.play();
                    if (playPromise !== undefined) {
                        playPromise.catch(error => {
                            // Autoplay failed (common on mobile)
                            console.log('Video autoplay prevented:', error);

                            // Fallback: Try to play on tap/click of the video itself
                            const playOnTap = () => {
                                video.play().catch(e => console.log('Play on tap failed:', e));
                            };
                            video.addEventListener('click', playOnTap, { once: true });
                            video.addEventListener('touchstart', playOnTap, { once: true });
                        });
                    }

                    // Stop observing this video
                    videoObserver.unobserve(video);
                }
            });
        }, {
            rootMargin: '200px' // Load 200px before video enters viewport
        });

        // Observe all phone videos
        phoneVideos.forEach(video => videoObserver.observe(video));
    }

    /**
     * Setup video placeholder fade-out when videos load
     */
    function setupVideoPlaceholders() {
        const phoneVideos = document.querySelectorAll('.phone-showcase .phone-screen');

        phoneVideos.forEach(video => {
            const placeholder = video.previousElementSibling;

            // Check if the placeholder exists and is an image
            if (placeholder && placeholder.classList.contains('phone-placeholder')) {
                // Function to handle the fade-out
                const handleVideoLoad = function() {
                    placeholder.classList.add('loaded');
                };

                // If video already has enough data loaded, fade immediately
                if (video.readyState >= 3) { // HAVE_FUTURE_DATA or higher
                    handleVideoLoad();
                } else {
                    // Otherwise wait for video to be ready
                    video.addEventListener('canplay', handleVideoLoad, { once: true });
                }
            }
        });
    }

    /**
     * Setup FAQ collapsible functionality
     */
    function setupFAQ() {
        const faqToggle = document.getElementById('faqToggle');
        const faqToggleBottom = document.getElementById('faqToggleBottom');
        const faqGrid = document.getElementById('faqGrid');

        if (!faqToggle || !faqGrid || !faqToggleBottom) return;

        function expandFAQ() {
            trackEvent('faq_expanded');
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
                // Desktop: show 3 cards at a time (starting from currentIndex)
                cards.forEach((card, index) => {
                    // Show current card and the next 2 cards
                    const isVisible = index === currentIndex ||
                                     index === (currentIndex + 1) % cards.length ||
                                     index === (currentIndex + 2) % cards.length;

                    if (isVisible) {
                        card.classList.add('active');
                    } else {
                        card.classList.remove('active');
                    }
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

    /**
     * Setup scroll depth tracking
     */
    function setupScrollDepthTracking() {
        let scrollDepth25 = false;
        let scrollDepth50 = false;
        let scrollDepth75 = false;
        let scrollDepth100 = false;

        window.addEventListener('scroll', function() {
            const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;

            if (scrollPercent >= 25 && !scrollDepth25) {
                scrollDepth25 = true;
                trackEvent('scroll_depth_25');
            }
            if (scrollPercent >= 50 && !scrollDepth50) {
                scrollDepth50 = true;
                trackEvent('scroll_depth_50');
            }
            if (scrollPercent >= 75 && !scrollDepth75) {
                scrollDepth75 = true;
                trackEvent('scroll_depth_75');
            }
            if (scrollPercent >= 100 && !scrollDepth100) {
                scrollDepth100 = true;
                trackEvent('scroll_depth_100');
            }
        });
    }

    /**
     * Setup countdown timer to launch date
     */
    function setupCountdown() {
        // Set your launch date (change this to your actual launch date)
        const launchDate = new Date('2025-02-01T00:00:00');
        const countdownElements = document.querySelectorAll('.countdown');

        if (!countdownElements.length) return;

        function updateCountdown() {
            const now = new Date();
            const diff = launchDate - now;
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));

            countdownElements.forEach(el => {
                el.textContent = `${days} days`;
            });
        }

        updateCountdown();
        setInterval(updateCountdown, 3600000); // Update every hour
    }

    /**
     * Setup dynamic waitlist counter
     */
    function setupWaitlistCounter() {
        const waitlistElements = document.querySelectorAll('.waitlist-count');
        if (!waitlistElements.length) return;

        // Baseline count and growth rate
        const baseCount = 478;
        const startTime = new Date('2024-12-01').getTime();
        const growthRate = 3; // signups per day

        function updateCounter() {
            const now = new Date().getTime();
            const daysPassed = Math.floor((now - startTime) / (1000 * 60 * 60 * 24));
            const currentCount = baseCount + (daysPassed * growthRate);

            waitlistElements.forEach(el => {
                el.textContent = currentCount.toLocaleString() + '+';
            });
        }

        updateCounter();
    }

    /**
     * Setup exit intent modal
     */
    function setupExitIntent() {
        const exitModal = document.getElementById('exitModal');
        const exitModalClose = document.getElementById('exitModalClose');

        if (!exitModal || !exitModalClose) return;

        let exitModalShown = false;

        // Detect mouse leaving viewport at top
        document.addEventListener('mouseleave', function(e) {
            if (e.clientY <= 0 && !exitModalShown && !localStorage.getItem('exit_modal_shown')) {
                exitModalShown = true;
                exitModal.classList.add('modal-open');
                document.body.style.overflow = 'hidden';
                trackEvent('exit_intent_triggered');

                // Store that modal was shown (expires after 24 hours)
                const expiryTime = Date.now() + (24 * 60 * 60 * 1000);
                localStorage.setItem('exit_modal_shown', expiryTime);
            }
        });

        // Close modal
        function closeExitModal() {
            exitModal.classList.remove('modal-open');
            document.body.style.overflow = '';
            trackEvent('exit_intent_dismissed');
        }

        exitModalClose.addEventListener('click', closeExitModal);

        // Close on overlay click
        exitModal.addEventListener('click', function(e) {
            if (e.target === exitModal) {
                closeExitModal();
            }
        });

        // Close on ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && exitModal.classList.contains('modal-open')) {
                closeExitModal();
            }
        });

        // Handle form submission in exit modal
        const exitForm = exitModal.querySelector('form');
        if (exitForm) {
            exitForm.addEventListener('submit', function(e) {
                e.preventDefault();
                trackEvent('exit_intent_form_submit');

                const formData = new FormData(exitForm);
                fetch(exitForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                .then(response => {
                    if (response.ok) {
                        trackEvent('exit_intent_form_success');
                        exitForm.innerHTML = '<p class="exit-modal-text" style="text-align: center; color: var(--color-success);">✓ Thanks! You\'re on the list.</p>';
                        setTimeout(closeExitModal, 2000);
                    }
                });
            });
        }

        // Clean up expired localStorage entries
        const stored = localStorage.getItem('exit_modal_shown');
        if (stored && Date.now() > parseInt(stored)) {
            localStorage.removeItem('exit_modal_shown');
        }
    }

    /**
     * Setup sticky CTA bar
     */
    function setupStickyCTA() {
        const stickyCTA = document.getElementById('stickyCta');
        if (!stickyCTA) return;

        let scrollDepth = 0;

        window.addEventListener('scroll', function() {
            const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;

            // Show sticky CTA after 75% scroll
            if (scrollPercent > 75 && scrollDepth < 75) {
                scrollDepth = 75;
                stickyCTA.classList.add('visible');
            }

            // Hide sticky CTA when user scrolls back up past 50%
            if (scrollPercent < 50 && scrollDepth >= 75) {
                scrollDepth = 0;
                stickyCTA.classList.remove('visible');
            }
        });
    }

    /**
     * Optimize touch targets for mobile
     * Ensures all interactive elements meet accessibility standards (48x48px minimum)
     */
    function optimizeTouchTargets() {
        const touchTargets = document.querySelectorAll('button, a, input, select, textarea, .testimonial-nav, .faq-toggle');

        touchTargets.forEach(target => {
            // Skip if already meets minimum size
            const rect = target.getBoundingClientRect();

            // Ensure minimum 48px height for touch targets
            if (rect.height > 0 && rect.height < 48) {
                target.style.minHeight = '48px';
            }

            // Ensure minimum 48px width for buttons and links (not inputs)
            if ((target.tagName === 'BUTTON' || target.tagName === 'A') && rect.width > 0 && rect.width < 48) {
                target.style.minWidth = '48px';
            }
        });

        // Prevent double-tap zoom on buttons (iOS)
        const buttons = document.querySelectorAll('button, .cta-button');
        buttons.forEach(button => {
            button.addEventListener('touchend', function(e) {
                // Prevent zoom but allow the click to proceed
                if (e.cancelable) {
                    e.preventDefault();
                    this.click();
                }
            }, { passive: false });
        });
    }

})();

