/**
 * Doctor Apa - Mobile App Download Website
 * Main JavaScript File
 * ==============================================
 */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initPreloader();
    initNavigation();
    initSmoothScroll();
    initAnimatedCounters();
    initModeSwitcher();
    initFAQ();
    initBackToTop();
    initScrollAnimations();
    initTypingAnimation();
    initHealthHub();
    initTestimonialCarousel();
    initNewsletterForm();
    initStepAnimations();
});

/**
 * PRELOADER
 * Handles the loading screen animation
 */
function initPreloader() {
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('hidden');
            
            // Remove preloader from DOM after animation
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 500);
        }, 2000); // Show preloader for 2 seconds
    });
}

/**
 * NAVIGATION
 * Handles sticky navbar and mobile menu
 */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const links = navLinks.querySelectorAll('a');
    
    // Sticky navbar on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when link is clicked
    links.forEach(function(link) {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Update active link on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section[id], header[id]');
        
        sections.forEach(function(section) {
            const sectionTop = section.offsetTop - 150;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        links.forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

/**
 * SMOOTH SCROLL
 * Handles smooth scrolling for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * ANIMATED COUNTERS
 * Animates stat numbers on scroll
 */
function initAnimatedCounters() {
    const counters = document.querySelectorAll('.stat-number');
    let hasAnimated = false;
    
    function animateCounters() {
        if (hasAnimated) return;
        
        const heroStats = document.querySelector('.hero-stats');
        if (!heroStats) return;
        
        const rect = heroStats.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        
        if (isVisible) {
            hasAnimated = true;
            counters.forEach(function(counter) {
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16);
                let current = 0;
                
                function updateCounter() {
                    current += increment;
                    if (current < target) {
                        counter.textContent = formatNumber(Math.floor(current));
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = formatNumber(target);
                    }
                }
                
                updateCounter();
            });
        }
    }
    
    window.addEventListener('scroll', animateCounters);
    animateCounters(); // Check on load
}

/**
 * Format number with commas
 */
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * MODE SWITCHER
 * Handles Teen/Parent mode switching in adolescent section
 */
function initModeSwitcher() {
    const modeTabs = document.querySelectorAll('.mode-tab');
    const teenMode = document.getElementById('teenMode');
    const parentMode = document.getElementById('parentMode');
    
    if (!modeTabs.length || !teenMode || !parentMode) return;
    
    modeTabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            const mode = this.getAttribute('data-mode');
            
            // Update active tab
            modeTabs.forEach(function(t) {
                t.classList.remove('active');
            });
            this.classList.add('active');
            
            // Show corresponding content
            if (mode === 'teen') {
                teenMode.classList.add('active');
                parentMode.classList.remove('active');
            } else {
                teenMode.classList.remove('active');
                parentMode.classList.add('active');
            }
            
            // Re-trigger AOS animations for new content
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        });
    });
}

/**
 * FAQ ACCORDION
 * Handles FAQ expand/collapse
 */
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(function(item) {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(function(otherItem) {
                otherItem.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

/**
 * BACK TO TOP BUTTON
 * Shows/hides back to top button based on scroll
 */
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    if (!backToTop) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * SCROLL ANIMATIONS (AOS)
 * Initialize AOS library
 */
function initScrollAnimations() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100,
            disable: 'mobile'
        });
    }
}

/**
 * TYPING ANIMATION
 * Creates typing effect in chat mockup
 */
function initTypingAnimation() {
    const typingIndicator = document.querySelector('.message.typing');
    
    if (!typingIndicator) return;
    
    // Simulate typing response after delay
    setTimeout(function() {
        const newMessage = document.createElement('div');
        newMessage.className = 'message bot';
        newMessage.innerHTML = '<p>I understand you\'re experiencing headaches. Here are some questions to help me understand better: How long have you had these headaches? Is the pain on one side or both sides?</p>';
        
        typingIndicator.replaceWith(newMessage);
    }, 5000);
}

/**
 * PARALLAX EFFECTS
 * Subtle parallax on floating shapes
 */
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.floating-shapes .shape');
    
    shapes.forEach(function(shape, index) {
        const speed = 0.05 * (index + 1);
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

/**
 * DOWNLOAD BUTTON HANDLERS
 * Track download clicks and show alerts
 */
document.addEventListener('DOMContentLoaded', function() {
    const downloadBtns = document.querySelectorAll('.download-btn, .btn-primary');
    
    downloadBtns.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            // Check if it's a download button
            if (this.classList.contains('android') || this.classList.contains('playstore')) {
                e.preventDefault();
                
                // You can replace this with actual download logic
                showNotification('Thank you for your interest! The app download will begin shortly.', 'success');
                
                // Track download event (if analytics is set up)
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'download_click', {
                        'event_category': 'engagement',
                        'event_label': this.classList.contains('playstore') ? 'play_store' : 'direct_apk'
                    });
                }
            }
        });
    });
});

/**
 * NOTIFICATION SYSTEM
 * Shows toast notifications
 */
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification-toast');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification-toast ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 15px;
        z-index: 9999;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;
    
    // Add animation keyframes
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .notification-close {
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                padding: 5px;
                opacity: 0.8;
            }
            .notification-close:hover {
                opacity: 1;
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(function() {
        notification.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(function() {
            notification.remove();
        }, 300);
    }, 5000);
}

/**
 * INTERSECTION OBSERVER
 * For lazy loading and scroll-triggered animations
 */
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements that need lazy loading
document.addEventListener('DOMContentLoaded', function() {
    const lazyElements = document.querySelectorAll('.lazy-load');
    lazyElements.forEach(function(element) {
        observer.observe(element);
    });
});

/**
 * FORM VALIDATION (if contact form is added)
 */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * MOBILE DETECTION
 */
function isMobile() {
    return window.innerWidth <= 768;
}

/**
 * RESIZE HANDLER
 * Handles responsive adjustments on resize
 */
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Close mobile menu on resize to desktop
        if (!isMobile()) {
            const navToggle = document.getElementById('navToggle');
            const navLinks = document.getElementById('navLinks');
            
            if (navToggle && navLinks) {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
        
        // Refresh AOS on resize
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }, 250);
});

/**
 * KEYBOARD NAVIGATION
 * Accessibility improvements
 */
document.addEventListener('keydown', function(e) {
    // Close mobile menu on Escape
    if (e.key === 'Escape') {
        const navToggle = document.getElementById('navToggle');
        const navLinks = document.getElementById('navLinks');
        
        if (navLinks && navLinks.classList.contains('active')) {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        // Close any open FAQ items
        const activeFAQ = document.querySelector('.faq-item.active');
        if (activeFAQ) {
            activeFAQ.classList.remove('active');
        }
    }
});

/**
 * HEALTH HUB TABS
 * Handles tab switching for Health Hub Showcase section
 */
function initHealthHub() {
    var hubTabs = document.querySelectorAll('.hub-tab');
    var hubPanels = document.querySelectorAll('.hub-panel');

    if (!hubTabs.length) return;

    hubTabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            var target = this.getAttribute('data-hub');

            hubTabs.forEach(function(t) { t.classList.remove('active'); });
            this.classList.add('active');

            hubPanels.forEach(function(panel) { panel.classList.remove('active'); });
            var targetPanel = document.getElementById('hub-' + target);
            if (targetPanel) targetPanel.classList.add('active');

            if (typeof AOS !== 'undefined') AOS.refresh();
        });
    });
}

/**
 * TESTIMONIAL CAROUSEL
 * Auto-sliding carousel with manual controls
 */
function initTestimonialCarousel() {
    var carousel = document.querySelector('.testimonials-carousel');
    if (!carousel) return;

    var track = carousel.querySelector('.carousel-track');
    var cards = carousel.querySelectorAll('.testimonial-card');
    var prevBtn = carousel.querySelector('.carousel-prev');
    var nextBtn = carousel.querySelector('.carousel-next');
    var dotsContainer = carousel.querySelector('.carousel-dots');
    var currentIndex = 0;
    var totalSlides = cards.length;
    var autoSlideInterval;

    // Create dots
    for (var i = 0; i < totalSlides; i++) {
        var dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
        dot.setAttribute('data-index', i);
        dot.addEventListener('click', function() {
            goToSlide(parseInt(this.getAttribute('data-index')));
        });
        dotsContainer.appendChild(dot);
    }

    var dots = dotsContainer.querySelectorAll('.carousel-dot');

    function goToSlide(index) {
        currentIndex = index;
        if (currentIndex >= totalSlides) currentIndex = 0;
        if (currentIndex < 0) currentIndex = totalSlides - 1;

        track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';

        dots.forEach(function(d) { d.classList.remove('active'); });
        dots[currentIndex].classList.add('active');
    }

    function nextSlide() { goToSlide(currentIndex + 1); }
    function prevSlide() { goToSlide(currentIndex - 1); }

    nextBtn.addEventListener('click', function() {
        nextSlide();
        resetAutoSlide();
    });

    prevBtn.addEventListener('click', function() {
        prevSlide();
        resetAutoSlide();
    });

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    startAutoSlide();
}

/**
 * NEWSLETTER FORM
 * Handles newsletter subscription (cosmetic)
 */
function initNewsletterForm() {
    var form = document.getElementById('newsletterForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        var input = form.querySelector('.newsletter-input');
        if (input && validateEmail(input.value)) {
            showNotification('Thank you for subscribing! We\'ll keep you updated.', 'success');
            input.value = '';
        } else {
            showNotification('Please enter a valid email address.', 'error');
        }
    });
}

/**
 * STEP NUMBER ANIMATIONS
 * Animates step numbers when scrolled into view
 */
function initStepAnimations() {
    var stepNumbers = document.querySelectorAll('.step-number');
    if (!stepNumbers.length) return;

    var stepObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                var step = entry.target;
                var delay = (parseInt(step.getAttribute('data-step')) - 1) * 300;
                setTimeout(function() {
                    step.classList.add('animated');
                }, delay);
                stepObserver.unobserve(step);
            }
        });
    }, { threshold: 0.5 });

    stepNumbers.forEach(function(num) {
        stepObserver.observe(num);
    });
}

/**
 * CONSOLE WELCOME MESSAGE
 */
console.log('%c🏥 Doctor Apa', 'font-size: 24px; font-weight: bold; color: #C89FA3;');
console.log('%cYour Complete Healthcare Companion', 'font-size: 14px; color: #666;');
console.log('%c© 2026 Doctor Apa. All rights reserved.', 'font-size: 12px; color: #999;');
