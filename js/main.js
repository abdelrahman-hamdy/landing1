// ==========================================================================
// MAIN JAVASCRIPT - DesignMind AI Landing Page
// ==========================================================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DesignMind AI - JavaScript loaded successfully');

    // Add js-loaded class AFTER content is visible
    document.documentElement.classList.add('js-loaded');

    initScrollAnimations();
    initRotatingText();
    initFeaturesTabs();
    initFAQ();
    initPricingToggle();
    initMobileMenu();
    initParticles();
    initInteractiveDemo();
    initSmoothScroll();
    initScrollProgress();
});

// ==========================================================================
// GSAP SCROLL ANIMATIONS
// ==========================================================================

function initScrollAnimations() {
    // Use Intersection Observer - simpler and more reliable
    console.log('Initializing scroll animations with Intersection Observer');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-on-scroll');
                // Optional: unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll(
        '.fade-in, .problem-card, .solution-step, .pricing-card, .integration-card, .testimonial-card'
    );

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Optional: Try to use GSAP if available for enhanced animations
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        console.log('GSAP available - adding enhanced parallax effects');
        try {
            gsap.registerPlugin(ScrollTrigger);

            // Subtle parallax effect for floating shapes only
            gsap.utils.toArray('.floating-shape').forEach(shape => {
                gsap.to(shape, {
                    scrollTrigger: {
                        trigger: '.hero',
                        start: 'top top',
                        end: 'bottom top',
                        scrub: 1
                    },
                    y: 200,
                    rotation: 360,
                    ease: 'none'
                });
            });

            // Smooth scaling for hero visual
            gsap.to('.hero-visual', {
                scrollTrigger: {
                    trigger: '.hero',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1
                },
                scale: 0.9,
                opacity: 0.8,
                ease: 'none'
            });
        } catch (error) {
            console.warn('GSAP enhancement failed:', error);
        }
    }

    console.log('Scroll animations initialized successfully');
}

// ==========================================================================
// SCROLL PROGRESS INDICATOR
// ==========================================================================

function initScrollProgress() {
    // Create scroll progress bar
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #6C5CE7 0%, #00D4FF 100%);
        width: 0%;
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    // Update progress on scroll
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// ==========================================================================
// ROTATING TEXT IN HERO
// ==========================================================================

function initRotatingText() {
    const words = document.querySelectorAll('.rotating-text .word');
    if (words.length === 0) return;

    let currentIndex = 0;

    function rotateWords() {
        // Remove active class from current word
        words[currentIndex].classList.remove('active');

        // Move to next word
        currentIndex = (currentIndex + 1) % words.length;

        // Add active class to next word
        words[currentIndex].classList.add('active');
    }

    // Rotate every 3 seconds
    setInterval(rotateWords, 3000);
}

// ==========================================================================
// FEATURES TABS
// ==========================================================================

function initFeaturesTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const featurePanels = document.querySelectorAll('.feature-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');

            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            featurePanels.forEach(panel => panel.classList.remove('active'));

            // Add active class to clicked button and corresponding panel
            button.classList.add('active');
            const activePanel = document.querySelector(`[data-panel="${tabName}"]`);
            if (activePanel) {
                activePanel.classList.add('active');

                // Animate panel content
                gsap.from(activePanel, {
                    opacity: 0,
                    y: 30,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            }
        });
    });
}

// ==========================================================================
// FAQ ACCORDION
// ==========================================================================

function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        const elements = document.querySelectorAll('.hero-content > *, .section-header, .feature-card, .testimonial, .pricing-card');
        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(40px)';
            el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            observer.observe(el);
        });
    }

    // ========================================================================
    // SMOOTH SCROLL
    // ========================================================================

    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');

        links.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');

                // Ignore empty anchors
                if (href === '#') {
                    e.preventDefault();
                    return;
                }

                const target = document.querySelector(href);
                if (!target) return;

                e.preventDefault();

                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const nav = document.querySelector('.nav');
                nav.classList.remove('mobile-open');
            });
        });
    }

    // ========================================================================
    // MOBILE MENU
    // ========================================================================

    function initMobileMenu() {
        const toggle = document.querySelector('.mobile-toggle');
        const nav = document.querySelector('.nav');

        if (!toggle) return;

        toggle.addEventListener('click', () => {
            nav.classList.toggle('mobile-open');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && nav.classList.contains('mobile-open')) {
                nav.classList.remove('mobile-open');
            }
        });
    }

    // ========================================================================
    // NAVIGATION SCROLL EFFECT
    // ========================================================================

    function initNavScroll() {
        const nav = document.querySelector('.nav');
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            // Add shadow when scrolled
            if (currentScroll > 20) {
                nav.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
            } else {
                nav.style.boxShadow = 'none';
            }

            lastScroll = currentScroll;
        });
    }

    // ========================================================================
    // UTILITIES
    // ========================================================================

    // Debounce function for performance
    function debounce(func, wait = 20, immediate = true) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    // ========================================================================
    // ACCESSIBILITY
    // ========================================================================

    // Keyboard navigation indicator
    let isUsingKeyboard = false;

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            isUsingKeyboard = true;
            document.body.classList.add('using-keyboard');
        }
    });

    document.addEventListener('mousedown', () => {
        isUsingKeyboard = false;
        document.body.classList.remove('using-keyboard');
    });

    // ========================================================================
    // CONSOLE MESSAGE
    // ========================================================================

    console.log('%cDesignMind AI', 'font-size: 24px; font-weight: 700; color: #000;');
    console.log('%cPremium Design Platform', 'font-size: 14px; color: #525252;');

})();
