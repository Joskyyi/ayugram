// DOM Elements
const header = document.querySelector('header');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const faqItems = document.querySelectorAll('.faq-item');
const contactForm = document.querySelector('.contact-form');
const particlesContainer = document.getElementById('particles');
const featureCards = document.querySelectorAll('.feature-card');
const downloadSection = document.querySelector('.download');
const heroImage = document.querySelector('.hero-image img');

// Create animated particles
function createParticles() {
    const particleCount = 20;
    
    // Clear existing particles
    if (particlesContainer) {
        particlesContainer.innerHTML = '';
        
        // Create new particles
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random size between 5px and 20px
            const size = Math.random() * 15 + 5;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random position
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            particle.style.left = `${posX}%`;
            particle.style.bottom = `${posY}%`;
            
            // Random opacity
            particle.style.opacity = Math.random() * 0.5 + 0.1;
            
            // Random animation duration
            const duration = Math.random() * 10 + 10;
            particle.style.animationDuration = `${duration}s`;
            
            // Random animation delay
            const delay = Math.random() * 5;
            particle.style.animationDelay = `${delay}s`;
            
            particlesContainer.appendChild(particle);
        }
    }
}

// Initialize particles on load
window.addEventListener('load', createParticles);

// Recreate particles on window resize
window.addEventListener('resize', createParticles);

// Add scroll event for header
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.padding = '10px 0';
        header.style.backgroundColor = 'rgba(18, 18, 18, 0.95)';
    } else {
        header.style.padding = '15px 0';
        header.style.backgroundColor = 'rgba(18, 18, 18, 0.9)';
    }
});

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// FAQ accordion functionality
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close all other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// Form submission
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Пожалуйста, заполните все поля формы.');
            return;
        }
        
        // Here you would typically send the data to a server
        alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
        contactForm.reset();
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Offset for header
                behavior: 'smooth'
            });
        }
    });
});

// Animate glowing elements
const animateGlowElements = () => {
    const glowElements = document.querySelectorAll('.glow');
    
    glowElements.forEach((glow, index) => {
        // Set random positions for glow elements
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        
        glow.style.left = `${randomX}%`;
        glow.style.top = `${randomY}%`;
        
        // Set random animation delay
        glow.style.animationDelay = `${index * 2}s`;
    });
};

// Animate elements when they come into view
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature-card, .download-btn, .faq-item');
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementPosition < windowHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
};

// 3D perspective effect for hero image
const applyPerspectiveEffect = (e) => {
    const heroSection = document.querySelector('.hero');
    if (!heroSection || !heroImage) return;
    
    // Get mouse position relative to hero section
    const rect = heroSection.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Calculate rotation based on mouse position
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateY = ((mouseX - centerX) / centerX) * 10; // Max 10 degrees
    const rotateX = ((centerY - mouseY) / centerY) * 5; // Max 5 degrees
    
    // Apply transform with perspective
    heroImage.style.transform = `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateZ(50px)`;
};

// Reset perspective when mouse leaves
const resetPerspective = () => {
    if (heroImage) {
        heroImage.style.transform = 'perspective(1000px) rotateY(-15deg) rotateX(5deg) translateZ(0)';
    }
};

// Parallax effect for background elements
const parallaxEffect = () => {
    const scrollPosition = window.scrollY;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        element.style.transform = `translateY(${scrollPosition * speed}px)`;
    });
};

// Initialize animations
window.addEventListener('load', () => {
    // Initialize glow elements
    animateGlowElements();
    
    // Check for elements in view on initial load
    animateOnScroll();
    
    // Apply initial perspective to hero image
    resetPerspective();
    
    // Add mousemove event for hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.addEventListener('mousemove', applyPerspectiveEffect);
        heroSection.addEventListener('mouseleave', resetPerspective);
    }
    
    // Add parallax class to background elements
    const backgroundElements = document.querySelectorAll('.glow');
    backgroundElements.forEach((element, index) => {
        element.classList.add('parallax');
        element.dataset.speed = (index % 3 + 1) * 0.05; // Varying speeds
    });
});

// Add scroll event listeners
window.addEventListener('scroll', () => {
    animateOnScroll();
    parallaxEffect();
});

// Intersection Observer for animated elements
const observeElements = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    // Observe feature cards
    featureCards.forEach(card => {
        observer.observe(card);
    });
    
    // Observe FAQ items
    faqItems.forEach(item => {
        observer.observe(item);
    });
    
    // Observe download section
    if (downloadSection) {
        observer.observe(downloadSection);
    }
};

// Initialize Intersection Observer
if ('IntersectionObserver' in window) {
    window.addEventListener('load', observeElements);
}

// TypeScript interface definitions (for documentation purposes)
/**
 * @typedef {Object} ContactFormData
 * @property {string} name - User's name
 * @property {string} email - User's email
 * @property {string} message - User's message
 */

/**
 * @typedef {Object} AyugramFeature
 * @property {string} name - Feature name
 * @property {string} description - Feature description
 * @property {string} icon - Feature icon class
 */

// Example of how TypeScript would be used if this was a .ts file:
/*
interface ContactFormData {
    name: string;
    email: string;
    message: string;
}

interface AyugramFeature {
    name: string;
    description: string;
    icon: string;
}

// Example function with TypeScript
function submitContactForm(formData: ContactFormData): Promise<boolean> {
    return new Promise((resolve, reject) => {
        // Implementation would go here
        if (formData.name && formData.email && formData.message) {
            // Success case
            resolve(true);
        } else {
            // Error case
            reject(new Error('Invalid form data'));
        }
    });
}
*/
