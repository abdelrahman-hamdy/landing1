// ==========================================================================
// MAIN JAVASCRIPT - DesignMind AI Landing Page
// ==========================================================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initRotatingText();
    initFeaturesTabs();
    initFAQ();
    initPricingToggle();
    initMobileMenu();
    initParticles();
    initInteractiveDemo();
    initSmoothScroll();
});

// ==========================================================================
// GSAP SCROLL ANIMATIONS
// ==========================================================================

function initScrollAnimations() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Fade in elements on scroll
    gsap.utils.toArray('.fade-in').forEach((element, index) => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 60,
            opacity: 0,
            duration: 0.8,
            delay: index % 3 * 0.2 // Stagger effect for grouped elements
        });
    });

    // Animate problem cards with stagger
    gsap.from('.problem-card', {
        scrollTrigger: {
            trigger: '.problem-grid',
            start: 'top 70%'
        },
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2
    });

    // Animate solution steps
    gsap.utils.toArray('.solution-step').forEach((step, index) => {
        gsap.from(step, {
            scrollTrigger: {
                trigger: step,
                start: 'top 75%'
            },
            x: index % 2 === 0 ? -100 : 100,
            opacity: 0,
            duration: 1,
            ease: 'power2.out'
        });
    });

    // Animate pricing cards
    gsap.from('.pricing-card', {
        scrollTrigger: {
            trigger: '.pricing-cards',
            start: 'top 70%'
        },
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15
    });

    // Animate integration cards
    gsap.from('.integration-card', {
        scrollTrigger: {
            trigger: '.integrations-grid',
            start: 'top 70%'
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1
    });

    // Parallax effect for floating shapes
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

            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// ==========================================================================
// PRICING TOGGLE (Monthly/Annual)
// ==========================================================================

function initPricingToggle() {
    const toggle = document.getElementById('pricing-toggle');
    const monthlyPrices = document.querySelectorAll('.monthly-price');
    const annualPrices = document.querySelectorAll('.annual-price');

    if (!toggle) return;

    toggle.addEventListener('change', () => {
        if (toggle.checked) {
            // Show annual prices
            monthlyPrices.forEach(price => price.style.display = 'none');
            annualPrices.forEach(price => price.style.display = 'inline');
        } else {
            // Show monthly prices
            monthlyPrices.forEach(price => price.style.display = 'inline');
            annualPrices.forEach(price => price.style.display = 'none');
        }
    });
}

// ==========================================================================
// MOBILE MENU
// ==========================================================================

function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (!menuBtn) return;

    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuBtn.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuBtn.classList.remove('active');
        });
    });
}

// ==========================================================================
// PARTICLE ANIMATION (Canvas)
// ==========================================================================

function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    // Set canvas size
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Wrap around screen
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = `rgba(108, 92, 231, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Create particles
    function createParticles() {
        particles = [];
        const particleCount = Math.min(Math.floor(canvas.width / 10), 100);
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    createParticles();
    window.addEventListener('resize', createParticles);

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Draw connections
        particles.forEach((particleA, indexA) => {
            particles.slice(indexA + 1).forEach(particleB => {
                const dx = particleA.x - particleB.x;
                const dy = particleA.y - particleB.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    ctx.strokeStyle = `rgba(108, 92, 231, ${0.2 * (1 - distance / 100)})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particleA.x, particleA.y);
                    ctx.lineTo(particleB.x, particleB.y);
                    ctx.stroke();
                }
            });
        });

        animationId = requestAnimationFrame(animate);
    }
    animate();

    // Clean up on page unload
    window.addEventListener('beforeunload', () => {
        cancelAnimationFrame(animationId);
    });
}

// ==========================================================================
// INTERACTIVE DEMO
// ==========================================================================

function initInteractiveDemo() {
    const demoSteps = document.querySelectorAll('.demo-step');
    if (demoSteps.length === 0) return;

    let currentStep = 0;

    function showStep(stepIndex) {
        demoSteps.forEach((step, index) => {
            if (index === stepIndex) {
                step.classList.add('active');
                gsap.from(step, {
                    opacity: 0,
                    scale: 0.95,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            } else {
                step.classList.remove('active');
            }
        });
    }

    function nextStep() {
        currentStep = (currentStep + 1) % demoSteps.length;
        showStep(currentStep);
    }

    // Auto-advance demo steps
    setInterval(nextStep, 4000);
}

// ==========================================================================
// SMOOTH SCROLL
// ==========================================================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==========================================================================
// BUTTON RIPPLE EFFECT
// ==========================================================================

function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    button.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple effect to all buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', createRipple);
});

// ==========================================================================
// NAVBAR SCROLL EFFECT
// ==========================================================================

let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow when scrolled
    if (currentScroll > 10) {
        navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
});

// ==========================================================================
// FORM VALIDATION (if forms are added)
// ==========================================================================

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ==========================================================================
// INTERSECTION OBSERVER FOR ANIMATIONS (Fallback)
// ==========================================================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements as fallback
document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});

// ==========================================================================
// CURSOR FOLLOWER (Optional Enhancement)
// ==========================================================================

function initCursorFollower() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        const delay = 0.1;
        cursorX += (mouseX - cursorX) * delay;
        cursorY += (mouseY - cursorY) * delay;

        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Grow cursor on hover
    document.querySelectorAll('a, button').forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
        });
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
}

// Uncomment to enable custom cursor
// initCursorFollower();

// ==========================================================================
// PERFORMANCE OPTIMIZATION
// ==========================================================================

// Debounce function for resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ==========================================================================
// CONSOLE EASTER EGG
// ==========================================================================

console.log('%c👋 Welcome to DesignMind AI!', 'color: #6C5CE7; font-size: 20px; font-weight: bold;');
console.log('%cInterested in how we built this? We\'re hiring! Check out careers on our site.', 'color: #00D4FF; font-size: 14px;');

// ==========================================================================
// ANALYTICS TRACKING (Placeholder)
// ==========================================================================

function trackEvent(eventName, eventData = {}) {
    // Placeholder for analytics tracking
    // Replace with your analytics solution (Google Analytics, Mixpanel, etc.)
    console.log('Track Event:', eventName, eventData);
}

// Track button clicks
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', () => {
        trackEvent('CTA_Click', {
            buttonText: button.textContent.trim(),
            location: button.closest('section')?.id || 'unknown'
        });
    });
});

// Track section views
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            trackEvent('Section_View', {
                section: entry.target.id || 'unknown'
            });
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('section[id]').forEach(section => {
    sectionObserver.observe(section);
});

// ==========================================================================
// UTILITY FUNCTIONS
// ==========================================================================

// Format numbers with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Animate counter
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const value = Math.floor(progress * target);

        element.textContent = formatNumber(value);

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = formatNumber(target);
        }
    }

    requestAnimationFrame(update);
}

// ==========================================================================
// ERROR HANDLING
// ==========================================================================

window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    // You can send errors to your error tracking service here
});

// ==========================================================================
// PAGE LOAD PERFORMANCE
// ==========================================================================

window.addEventListener('load', () => {
    // Hide loading spinner if you have one
    const loadTime = performance.now();
    console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);

    // Track page load performance
    trackEvent('Page_Load', {
        loadTime: loadTime.toFixed(2),
        userAgent: navigator.userAgent
    });
});

// ==========================================================================
// ACCESSIBILITY ENHANCEMENTS
// ==========================================================================

// Keyboard navigation for tabs
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// Skip to content link
const skipLink = document.createElement('a');
skipLink.href = '#hero';
skipLink.className = 'skip-link';
skipLink.textContent = 'Skip to content';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: #6C5CE7;
    color: white;
    padding: 8px;
    text-decoration: none;
    z-index: 10000;
`;
skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
});
skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
});
document.body.insertBefore(skipLink, document.body.firstChild);
