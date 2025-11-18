// ============================================================================
// PREMIUM MINIMAL INTERACTIONS
// ============================================================================

(function() {
    'use strict';

    // Initialize all components when DOM is ready
    document.addEventListener('DOMContentLoaded', init);

    function init() {
        initScrollAnimations();
        initSmoothScroll();
        initMobileMenu();
        initNavScroll();
    }

    // ========================================================================
    // SCROLL ANIMATIONS
    // ========================================================================

    function initScrollAnimations() {
        // Check if GSAP is available
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
            console.log('GSAP not loaded, using fallback animations');
            useFallbackAnimations();
            return;
        }

        gsap.registerPlugin(ScrollTrigger);

        // Fade in elements on scroll
        const fadeElements = gsap.utils.toArray('.hero-content > *, .section-header, .feature-card, .testimonial, .pricing-card');

        fadeElements.forEach((element, index) => {
            gsap.from(element, {
                scrollTrigger: {
                    trigger: element,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out',
                delay: (index % 3) * 0.1
            });
        });

        // Hero stats counter animation
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            const text = stat.textContent;
            const hasPlus = text.includes('+');
            const hasPercent = text.includes('%');
            const number = parseInt(text.replace(/[^0-9]/g, ''));

            gsap.from(stat, {
                scrollTrigger: {
                    trigger: stat,
                    start: 'top 90%',
                    toggleActions: 'play none none none'
                },
                textContent: 0,
                duration: 2,
                ease: 'power1.out',
                snap: { textContent: 1 },
                onUpdate: function() {
                    const value = Math.ceil(this.targets()[0].textContent);
                    let formatted = value.toLocaleString();
                    if (hasPlus) formatted += '+';
                    if (hasPercent) formatted += '%';
                    stat.textContent = formatted;
                }
            });
        });

        // Grid items subtle animation
        gsap.from('.grid-item', {
            scrollTrigger: {
                trigger: '.visual-grid',
                start: 'top 80%'
            },
            scale: 0.95,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out'
        });
    }

    // Fallback for browsers without GSAP
    function useFallbackAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
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
