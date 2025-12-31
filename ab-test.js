/**
 * Simple A/B Testing Framework for Kallax Landing Page
 * No external dependencies, works with Plausible Analytics
 */

(function() {
    'use strict';

    /**
     * ABTest class - handles variant assignment and execution
     */
    class ABTest {
        constructor(testName, variants) {
            this.testName = testName;
            this.variants = variants;
            this.variant = this.getVariant();
        }

        /**
         * Get or assign variant for this user
         */
        getVariant() {
            const stored = localStorage.getItem(`ab_${this.testName}`);

            // Return stored variant if valid
            if (stored && this.variants.includes(stored)) {
                return stored;
            }

            // Assign random variant
            const variant = this.variants[Math.floor(Math.random() * this.variants.length)];
            localStorage.setItem(`ab_${this.testName}`, variant);

            // Track variant assignment
            if (window.plausible) {
                window.plausible('AB Test Assigned', {
                    props: {
                        test: this.testName,
                        variant: variant
                    }
                });
            }

            return variant;
        }

        /**
         * Run the test with callback functions for each variant
         */
        run(callbacks) {
            if (callbacks[this.variant]) {
                callbacks[this.variant]();
            }
        }

        /**
         * Get current variant (useful for tracking conversions)
         */
        getCurrentVariant() {
            return this.variant;
        }
    }

    /**
     * Initialize tests when DOM is ready
     */
    document.addEventListener('DOMContentLoaded', function() {

        // Test 1: Hero CTA Text
        const heroCtaTest = new ABTest('hero_cta_text', ['control', 'variant_a', 'variant_b']);
        heroCtaTest.run({
            control: () => {
                // "Join the Waitlist" (current default)
            },
            variant_a: () => {
                const heroCta = document.querySelector('.hero .cta-button');
                if (heroCta) {
                    heroCta.textContent = 'Get Beta Access';
                }
            },
            variant_b: () => {
                const heroCta = document.querySelector('.hero .cta-button');
                if (heroCta) {
                    heroCta.textContent = 'Secure Your Spot';
                }
            }
        });

        // Test 2: Hero Headline
        const heroHeadlineTest = new ABTest('hero_headline', ['control', 'variant_a']);
        heroHeadlineTest.run({
            control: () => {
                // "All your records, from shelf to spin" (current)
            },
            variant_a: () => {
                const heroTitle = document.querySelector('.hero-title');
                if (heroTitle) {
                    heroTitle.innerHTML = 'Your entire collection,<br> always in your <span class="hero-highlight">pocket</span>';
                }
            }
        });

        // Test 3: FAQ Default State - DISABLED (always collapsed)
        // Uncomment to test expanded vs collapsed FAQ
        /*
        const faqTest = new ABTest('faq_default', ['collapsed', 'expanded']);
        faqTest.run({
            collapsed: () => {
                // Default behavior (FAQ starts collapsed)
            },
            expanded: () => {
                // Auto-expand FAQ on load
                const faqGrid = document.getElementById('faqGrid');
                const faqToggle = document.getElementById('faqToggle');
                const faqToggleBottom = document.getElementById('faqToggleBottom');

                if (faqGrid && faqToggle && faqToggleBottom) {
                    setTimeout(() => {
                        faqGrid.classList.add('faq-expanded');
                        faqToggle.style.display = 'none';
                        faqToggleBottom.style.display = 'inline-flex';
                        setTimeout(() => {
                            faqToggleBottom.classList.add('visible');
                        }, 10);
                    }, 500); // Small delay to ensure smooth animation
                }
            }
        });
        */

        // Test 4: Testimonial Count (3 vs 6)
        // Disabled by default - uncomment to test
        /*
        const testimonialTest = new ABTest('testimonial_count', ['3_testimonials', '6_testimonials']);
        testimonialTest.run({
            '3_testimonials': () => {
                // Hide testimonials 4-6
                const hiddenTestimonials = document.querySelectorAll('.testimonial-card[data-index="3"], .testimonial-card[data-index="4"], .testimonial-card[data-index="5"]');
                hiddenTestimonials.forEach(card => {
                    card.style.display = 'none';
                });
            },
            '6_testimonials': () => {
                // Show all testimonials (default)
            }
        });
        */

    });

    /**
     * Helper function to track conversions with variant info
     * Call this when user completes a goal action
     */
    window.trackABConversion = function(goalName) {
        const tests = ['hero_cta_text', 'hero_headline', 'faq_default'];
        const variants = {};

        tests.forEach(testName => {
            const stored = localStorage.getItem(`ab_${testName}`);
            if (stored) {
                variants[testName] = stored;
            }
        });

        if (window.plausible && Object.keys(variants).length > 0) {
            window.plausible('AB Conversion', {
                props: {
                    goal: goalName,
                    ...variants
                }
            });
        }
    };

    /**
     * Track conversion when form is successfully submitted
     * This integrates with the existing form handling
     */
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
        return originalFetch.apply(this, args).then(response => {
            // Track AB conversion on successful form submit
            if (args[0] && args[0].includes('formspree.io') && response.ok) {
                window.trackABConversion('waitlist_signup');
            }
            return response;
        });
    };

})();
