// TypeScript interfaces
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

interface ParticleStyle {
    width: string;
    height: string;
    left: string;
    bottom: string;
    opacity: number;
    animationDuration: string;
    animationDelay: string;
}

// DOM Elements with proper typing
const header = document.querySelector('header') as HTMLElement;
const menuToggle = document.querySelector('.menu-toggle') as HTMLElement;
const navLinks = document.querySelector('.nav-links') as HTMLElement;
const faqItems = document.querySelectorAll('.faq-item') as NodeListOf<HTMLElement>;
const contactForm = document.querySelector('.contact-form') as HTMLFormElement;
const particlesContainer = document.getElementById('particles') as HTMLElement;

// Create animated particles
function createParticles(): void {
    const particleCount: number = 20;
    
    // Clear existing particles
    if (particlesContainer) {
        particlesContainer.innerHTML = '';
        
        // Create new particles
        for (let i: number = 0; i < particleCount; i++) {
            const particle: HTMLElement = document.createElement('div');
            particle.classList.add('particle');
            
            // Random size between 5px and 20px
            const size: number = Math.random() * 15 + 5;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random position
            const posX: number = Math.random() * 100;
            const posY: number = Math.random() * 100;
            particle.style.left = `${posX}%`;
            particle.style.bottom = `${posY}%`;
            
            // Random opacity
            particle.style.opacity = (Math.random() * 0.5 + 0.1).toString();
            
            // Random animation duration
            const duration: number = Math.random() * 10 + 10;
            particle.style.animationDuration = `${duration}s`;
            
            // Random animation delay
            const delay: number = Math.random() * 5;
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
window.addEventListener('scroll', (): void => {
    if (window.scrollY > 50) {
        header.style.padding = '10px 0';
        header.style.backgroundColor = 'rgba(18, 18, 18, 0.95)';
    } else {
        header.style.padding = '15px 0';
        header.style.backgroundColor = 'rgba(18, 18, 18, 0.9)';
    }
});

// Mobile menu toggle
menuToggle.addEventListener('click', (): void => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach((link: Element): void => {
    link.addEventListener('click', (): void => {
        navLinks.classList.remove('active');
    });
});

// FAQ accordion functionality
faqItems.forEach((item: HTMLElement): void => {
    const question = item.querySelector('.faq-question') as HTMLElement;
    
    question.addEventListener('click', (): void => {
        // Close all other items
        faqItems.forEach((otherItem: HTMLElement): void => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// Form submission with type safety
if (contactForm) {
    contactForm.addEventListener('submit', (e: Event): void => {
        e.preventDefault();
        
        // Get form data with proper typing
        const nameInput = document.getElementById('name') as HTMLInputElement;
        const emailInput = document.getElementById('email') as HTMLInputElement;
        const messageInput = document.getElementById('message') as HTMLTextAreaElement;
        
        const formData: ContactFormData = {
            name: nameInput.value,
            email: emailInput.value,
            message: messageInput.value
        };
        
        // Simple validation
        if (!formData.name || !formData.email || !formData.message) {
            alert('Пожалуйста, заполните все поля формы.');
            return;
        }
        
        // Here you would typically send the data to a server
        submitContactForm(formData)
            .then(() => {
                alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
                contactForm.reset();
            })
            .catch((error: Error) => {
                alert(`Ошибка при отправке формы: ${error.message}`);
            });
    });
}

// Function to submit contact form data
async function submitContactForm(formData: ContactFormData): Promise<boolean> {
    // This is a mock implementation
    return new Promise((resolve, reject) => {
        // Simulate API call
        setTimeout(() => {
            if (formData.name && formData.email && formData.message) {
                resolve(true);
            } else {
                reject(new Error('Invalid form data'));
            }
        }, 1000);
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor: Element): void => {
    anchor.addEventListener('click', function(e: Event): void {
        e.preventDefault();
        
        const targetId = (this as HTMLAnchorElement).getAttribute('href') as string;
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId) as HTMLElement;
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Offset for header
                behavior: 'smooth'
            });
        }
    });
});

// Animated elements on scroll
const animateOnScroll = (): void => {
    const elements = document.querySelectorAll('.feature-card, .download-btn, .faq-item') as NodeListOf<HTMLElement>;
    
    elements.forEach((element: HTMLElement): void => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Animate glowing elements
const animateGlowElements = (): void => {
    const glowElements = document.querySelectorAll('.glow') as NodeListOf<HTMLElement>;
    
    glowElements.forEach((glow: HTMLElement, index: number): void => {
        // Set random positions for glow elements
        const randomX: number = Math.random() * 100;
        const randomY: number = Math.random() * 100;
        
        glow.style.left = `${randomX}%`;
        glow.style.top = `${randomY}%`;
        
        // Set random animation delay
        glow.style.animationDelay = `${index * 2}s`;
    });
};

// Initialize animations
window.addEventListener('load', (): void => {
    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.feature-card, .download-btn, .faq-item') as NodeListOf<HTMLElement>;
    
    animatedElements.forEach((element: HTMLElement): void => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Initialize glow elements
    animateGlowElements();
    
    // Trigger animations
    animateOnScroll();
});

window.addEventListener('scroll', animateOnScroll);

// Define Ayugram features for the website
const ayugramFeatures: AyugramFeature[] = [
    {
        name: 'Просмотр удаленных сообщений',
        description: 'Видите сообщения даже после того, как отправитель их удалил.',
        icon: 'fas fa-eye-slash'
    },
    {
        name: 'Локальный Telegram Premium',
        description: 'Получите доступ к премиум-функциям без дополнительной платы.',
        icon: 'fas fa-crown'
    },
    {
        name: 'Режим призрака',
        description: 'Читайте сообщения и просматривайте истории незаметно для отправителя.',
        icon: 'fas fa-ghost'
    },
    {
        name: 'Визуальные настройки AyuExtra',
        description: 'Настройте внешний вид приложения под свои предпочтения.',
        icon: 'fas fa-palette'
    }
];

// Function to dynamically populate features (if needed)
function populateFeatures(features: AyugramFeature[]): void {
    const featuresContainer = document.querySelector('.features-container');
    
    if (!featuresContainer) return;
    
    features.forEach((feature: AyugramFeature): void => {
        const featureCard = document.createElement('div');
        featureCard.className = 'feature-card';
        
        featureCard.innerHTML = `
            <div class="feature-icon">
                <i class="${feature.icon}"></i>
            </div>
            <h3>${feature.name}</h3>
            <p>${feature.description}</p>
        `;
        
        featuresContainer.appendChild(featureCard);
    });
}
