/**
 * SignTrust Landing Page - JavaScript
 * Scroll animations, interactions, and effects
 */

document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    initNavbar();

    // Scroll animations
    initScrollAnimations();

    // Mobile menu
    initMobileMenu();

    // Smooth scroll for anchor links
    initSmoothScroll();

    // Counter animation for stats
    initCounters();

    // Language switcher
    initLanguageSwitcher();

    // Pricing Toggle
    initPricingToggle();

    // Benefits slider
    initBenefitsSlider();

    // Contact modal
    initContactModal();

    // Back to Top button
    initBackToTop();
});

/**
 * Benefits Slider - Toggle between 3 benefit slides
 */
function initBenefitsSlider() {
    const track = document.querySelector('.benefits-track');
    const slides = document.querySelectorAll('.benefit-slide');
    const dots = document.querySelectorAll('.slider-dot');

    if (!track || slides.length === 0 || dots.length === 0) return;

    let currentSlide = 0;

    function goToSlide(index) {
        currentSlide = index;

        // Update track position
        track.style.transform = `translateX(-${index * 100}%)`;

        // Update active classes
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    // Add click events to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });

    // Auto-play
    let autoPlayInterval = setInterval(() => {
        let next = (currentSlide + 1) % slides.length;
        goToSlide(next);
    }, 5000);

    // Pause auto-play on interaction
    const container = document.querySelector('.benefits-slider-container');
    if (container) {
        container.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
        container.addEventListener('mouseleave', () => {
            autoPlayInterval = setInterval(() => {
                let next = (currentSlide + 1) % slides.length;
                goToSlide(next);
            }, 5000);
        });
    }
}

/**
 * Contact Form Modal - Open, close and submit logic
 */
function initContactModal() {
    const modal = document.getElementById('contactModal');
    const openBtns = document.querySelectorAll('[data-i18n="nav.freeTrial"], [data-i18n="hero.ctaPrimary"], [data-i18n="pricing.trialCta"], [data-i18n="finalCta.ctaPrimary"], [data-i18n="pricing.buyNow"], [data-i18n="highlightedFeatures.feature1.cta"], [data-i18n="highlightedFeatures.feature2.cta"], [data-i18n="finalCta.ctaSecondary"]');
    const closeBtn = document.getElementById('closeModal');
    const contactForm = document.getElementById('contactForm');
    const requestTypeSelect = document.getElementById('requestType');

    // Open modal on CTA click
    openBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Check if button is actually a phone link (shouldn't be in openBtns but safe to check)
            if (btn.tagName === 'A' && btn.getAttribute('href').startsWith('tel:')) return;

            e.preventDefault();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scroll

            // Pre-select request type based on button text
            const btnKey = btn.dataset.i18n;
            if (btnKey.includes('freeTrial') || btnKey.includes('trialCta') || btnKey.includes('ctaPrimary')) {
                requestTypeSelect.value = 'trial';
            } else if (btnKey.includes('buyNow')) {
                requestTypeSelect.value = 'pricing';
            } else if (btnKey.includes('ctaSecondary') || btnKey.includes('feature') || btnKey.includes('demo')) {
                requestTypeSelect.value = 'demo';
            }
        });
    });


    // Close modal function
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scroll
    };

    // Close on button click
    closeBtn.addEventListener('click', closeModal);

    // Close on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            console.log('Form submitted:', data);

            // Show success message (using translated string)
            const currentLang = localStorage.getItem('language') || 'vi';
            const successMsg = translations[currentLang].contactModal.success;

            // Temporary feedback (can be improved with a nice toast/notification)
            alert(successMsg);

            // Reset and close
            contactForm.reset();
            closeModal();
        });
    }
}


/**
 * Navbar scroll effect - adds shadow on scroll
 */
function initNavbar() {
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/**
 * Scroll-triggered animations using Intersection Observer
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Staggered animation delay
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));
}

/**
 * Mobile menu toggle
 */
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navLinks = document.getElementById('navLinks');
                if (navLinks) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });
}

/**
 * Animated counter for statistics
 */
function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');

    const observerOptions = {
        threshold: 0.5
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => counterObserver.observe(counter));
}

/**
 * Animate a single counter element
 */
function animateCounter(element) {
    const target = parseInt(element.dataset.count);
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
        current += increment;

        if (current >= target) {
            current = target;
            clearInterval(timer);
        }

        // Format number with appropriate suffix
        let displayValue = Math.floor(current);
        if (target >= 1000) {
            displayValue = displayValue.toLocaleString('vi-VN');
        }

        // Add suffix based on original text
        const originalText = element.textContent;
        if (originalText.includes('+')) {
            displayValue += '+';
        }
        if (originalText.includes('%')) {
            displayValue += '%';
        }

        element.textContent = displayValue;
    }, stepDuration);
}

/**
 * Add parallax effect to hero shapes (optional enhancement)
 */
function initParallax() {
    const shapes = document.querySelectorAll('.shape');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        shapes.forEach((shape, index) => {
            const speed = 0.1 + (index * 0.05);
            shape.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });
}

/**
 * Typing effect for hero title (optional)
 */
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

/**
 * Add ripple effect to buttons (optional enhancement)
 */
function initRippleEffect() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
}

/**
 * Language Switcher
 */
function initLanguageSwitcher() {
    const langBtn = document.getElementById('langBtn');
    const langDropdown = document.getElementById('langDropdown');
    const currentLangSpan = document.getElementById('currentLang');
    const langOptions = document.querySelectorAll('.lang-option');

    // Get saved language or default to Vietnamese
    let currentLang = localStorage.getItem('language') || 'vi';

    // Set initial language
    setLanguage(currentLang);

    // Toggle dropdown
    langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        langDropdown.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!langBtn.contains(e.target) && !langDropdown.contains(e.target)) {
            langDropdown.classList.remove('active');
        }
    });

    // Language option click handlers
    langOptions.forEach(option => {
        option.addEventListener('click', () => {
            const selectedLang = option.dataset.lang;
            setLanguage(selectedLang);
            langDropdown.classList.remove('active');
        });
    });

    /**
     * Set language and update all translatable elements
     */
    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('language', lang);

        // Update current language display
        currentLangSpan.textContent = lang.toUpperCase();

        // Update active state on options
        langOptions.forEach(opt => {
            if (opt.dataset.lang === lang) {
                opt.classList.add('active');
            } else {
                opt.classList.remove('active');
            }
        });

        // Update HTML lang attribute
        document.documentElement.lang = lang;

        // Update all translatable elements
        updateTranslations(lang);
    }

    /**
     * Update all elements with data-i18n attributes
     */
    function updateTranslations(lang) {
        const elements = document.querySelectorAll('[data-i18n]');

        elements.forEach(element => {
            const key = element.dataset.i18n;
            const translation = getNestedTranslation(translations[lang], key);

            if (translation) {
                // Check if element contains HTML (like gradient-text span)
                if (translation.includes('<')) {
                    element.innerHTML = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
    }

    /**
     * Get nested translation value from object using dot notation
     * Example: "nav.login" -> translations.nav.login
     */
    function getNestedTranslation(obj, path) {
        return path.split('.').reduce((current, key) => current?.[key], obj);
    }
}

// Initialize optional effects
// Uncomment to enable:
// initParallax();
// initRippleEffect();

/**
 * Pricing Toggle - Switch between Monthly and Yearly billing
 */
function initPricingToggle() {
    const toggle = document.getElementById('pricingToggle');
    const labelMonthly = document.getElementById('labelMonthly');
    const labelYearly = document.getElementById('labelYearly');

    if (!toggle || !labelMonthly || !labelYearly) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        labelMonthly.classList.toggle('active');
        labelYearly.classList.toggle('active');

        // Logic to update prices if we had different values for monthly/yearly
        // const isYearly = toggle.classList.contains('active');
        // updatePricingValues(isYearly);
    });

    labelMonthly.addEventListener('click', () => {
        toggle.classList.remove('active');
        labelMonthly.classList.add('active');
        labelYearly.classList.remove('active');
    });

    labelYearly.addEventListener('click', () => {
        toggle.classList.add('active');
        labelMonthly.classList.remove('active');
        labelYearly.classList.add('active');
    });
}

/**
 * Back to Top Button Logic
 * Shows button after scrolling down and scrolls back to top on click
 */
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');

    if (!backToTopBtn) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });

    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}


