// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSkillCircles();
    initBurgerMenu();
    initSmoothScrolling();
    initScrollAnimations();
});

// Skill Circles Animation
function initSkillCircles() {
    const circles = document.querySelectorAll('.circle');

    // Create intersection observer to trigger animation when circles come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const circle = entry.target;
                const percent = circle.getAttribute('data-percent');
                const color = circle.getAttribute('data-color');

                animateCircle(circle, percent, color);
                observer.unobserve(circle); // Only animate once
            }
        });
    }, { threshold: 0.5 });

    // Observe all circles
    circles.forEach(circle => {
        observer.observe(circle);
    });
}

function animateCircle(circle, percent, color) {
    const svgCircle = circle.querySelector('svg circle:nth-child(2)');
    const number = circle.querySelector('.number h3');
    const circumference = 440; // 2 * π * 70 (radius)
    const offset = circumference - (percent / 100) * circumference;

    // Animate the circle
    svgCircle.style.stroke = color;
    svgCircle.style.strokeDashoffset = offset;

    // Animate the number
    let currentPercent = 0;
    const increment = percent / 100; // Increment per frame
    const timer = setInterval(() => {
        currentPercent += increment;
        if (currentPercent >= percent) {
            currentPercent = percent;
            clearInterval(timer);
        }
        number.textContent = Math.floor(currentPercent) + '%';
    }, 20);
}

// Burger Menu Toggle
function initBurgerMenu() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle navigation
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');

        // Animate nav links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');

            // Reset animations
            navLinks.forEach(link => {
                link.style.animation = '';
            });
        });
    });
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerHeight = document.querySelector('.glass-header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll-based Animations
function initScrollAnimations() {
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Add scroll event for header background change
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.glass-header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Add some additional interactive features
function addInteractiveFeatures() {
    // Add hover effects for skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const glowRing = card.querySelector('.glow-ring');
            if (glowRing) {
                glowRing.style.animation = 'pulse 1s ease-in-out infinite';
            }
        });

        card.addEventListener('mouseleave', () => {
            const glowRing = card.querySelector('.glow-ring');
            if (glowRing) {
                glowRing.style.animation = 'pulse 2s ease-in-out infinite';
            }
        });
    });

    // Add click effects for social buttons
    const socialButtons = document.querySelectorAll('.btn-glow');
    socialButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
            ripple.style.top = e.clientY - rect.top - size / 2 + 'px';

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Initialize additional features after a short delay
setTimeout(addInteractiveFeatures, 1000);
