// Intersection Observer for Skill Anmiations
const skillSection = document.querySelector('.skills-section');
const options = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillCards = document.querySelectorAll('.skill-card');
            
            skillCards.forEach((card, index) => {
                const circle = card.querySelector('.circle');
                const progressCircle = card.querySelector('svg circle:nth-child(2)');
                const percent = circle.getAttribute('data-percent');
                const color = circle.getAttribute('data-color');
                
                // Set color dynamically
                progressCircle.style.stroke = color;
                progressCircle.style.filter = `drop-shadow(0 0 10px ${color})`;
                
                // Calculate offset
                const circumference = 440; 
                const offset = circumference - (percent / 100) * circumference;
                
                // Animate
                setTimeout(() => {
                   progressCircle.style.strokeDashoffset = offset;
                }, index * 200); // Staggered animation
            });
            
            observer.unobserve(skillSection); 
        }
    });
}, options);

if (skillSection) {
    observer.observe(skillSection);
}

// Parallax/Hover Effect for Hero Image
const heroImage = document.querySelector('.img-container');
document.addEventListener('mousemove', (e) => {
    if(window.innerWidth > 991) {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        
        if (heroImage) {
            heroImage.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        }
    }
});

// Reset transform on mouse leave
document.addEventListener('mouseleave', () => {
     if (heroImage) {
        heroImage.style.transform = `rotateY(0deg) rotateX(0deg)`;
        heroImage.style.transition = 'all 0.5s ease';
     }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        
        // Close nav on mobile click
        const nav = document.querySelector('.nav-links');
        const burger = document.querySelector('.burger');
        if(nav.classList.contains('nav-active')){
             nav.classList.remove('nav-active');
             burger.classList.remove('toggle');
             nav.querySelectorAll('li').forEach((link) => {
                link.style.animation = '';
             });
        }
    });
});

// Mobile Nav Toggle
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if(burger) {
        burger.addEventListener('click', () => {
            // Toggle Nav
            nav.classList.toggle('nav-active');

            // Animate Links
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });

            // Burger Animation
            burger.classList.toggle('toggle');
        });
    }
}

navSlide();
