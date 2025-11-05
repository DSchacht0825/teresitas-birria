// Teresita's Birria - Interactive Restaurant Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('¡Bienvenidos a Teresita\'s Birria! 🌮');

    // Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (navbar) {
            // Keep navbar transparent always
            navbar.style.background = 'transparent';
            navbar.style.backdropFilter = 'none';
            navbar.style.boxShadow = 'none';
        }
        
        lastScrollY = currentScrollY;
    });

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact Form Handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Basic form validation
            const requiredFields = ['name', 'email', 'subject', 'message'];
            let isValid = true;
            let errorMessage = '';
            
            requiredFields.forEach(field => {
                if (!data[field] || data[field].trim() === '') {
                    isValid = false;
                    errorMessage += `${field.charAt(0).toUpperCase() + field.slice(1)} is required.\\n`;
                }
            });
            
            // Email validation
            const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
            if (data.email && !emailRegex.test(data.email)) {
                isValid = false;
                errorMessage += 'Please enter a valid email address.\\n';
            }
            
            if (!isValid) {
                alert('Por favor, corrige los siguientes errores:\\n\\n' + errorMessage);
                return;
            }
            
            // Create email content
            const subject = `Teresita's Birria - ${data.subject}: ${data.name}`;
            const body = `Nueva consulta desde el sitio web de Teresita's Birria

Información del Cliente:
• Nombre: ${data.name}
• Email: ${data.email}
• Teléfono: ${data.phone || 'No proporcionado'}
• Asunto: ${data.subject}

Mensaje:
${data.message}

---
Este mensaje fue enviado desde el formulario de contacto de www.teresitasbirria.com`;
            
            // Create mailto link
            const mailtoLink = `mailto:teresitas.birria@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            
            // Try to open email client
            try {
                window.location.href = mailtoLink;
                
                // Show success message
                setTimeout(() => {
                    alert('¡Gracias por tu mensaje! Tu cliente de correo debería abrirse con el mensaje listo para enviar. Te responderemos pronto! 🌮');
                    this.reset();
                }, 500);
                
            } catch (error) {
                // Fallback: show the information to copy
                alert(`¡Gracias por tu interés! Por favor envíanos un email a teresitas.birria@gmail.com con la siguiente información:

Nombre: ${data.name}
Email: ${data.email}
Teléfono: ${data.phone || 'No proporcionado'}
Asunto: ${data.subject}

Mensaje: ${data.message}`);
            }
        });
    }

    // Scroll Reveal Animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealCallback = function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(revealCallback, observerOptions);

    // Observe elements for scroll reveal
    document.querySelectorAll('.story-item, .menu-item, .testimonial-card, .info-card, .contact-card').forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });

    // Menu Item Hover Effects
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Testimonial Cards Animation
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) rotate(1deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg)';
        });
    });

    // Contact Cards Interaction
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.borderLeft = '4px solid var(--primary-color)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.borderLeft = 'none';
        });
    });

    // Hero Parallax Effect
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-bg-image');
        
        if (heroBackground && scrolled < window.innerHeight) {
            heroBackground.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });

    // Dynamic Menu Badge Animation
    const menuBadges = document.querySelectorAll('.menu-badge');
    menuBadges.forEach(badge => {
        setInterval(() => {
            badge.style.animation = 'none';
            setTimeout(() => {
                badge.style.animation = 'pulse 2s infinite';
            }, 10);
        }, 5000);
    });

    // Story Icons Animation on Scroll
    const storyIcons = document.querySelectorAll('.story-icon');
    const storyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'float 3s ease-in-out infinite';
                entry.target.style.animationDelay = Math.random() * 2 + 's';
            }
        });
    });

    storyIcons.forEach(icon => {
        storyObserver.observe(icon);
    });

    // Location Badge Interaction
    const locationBadge = document.querySelector('.location-badge');
    if (locationBadge) {
        setInterval(() => {
            locationBadge.style.transform = 'scale(1.05)';
            setTimeout(() => {
                locationBadge.style.transform = 'scale(1)';
            }, 200);
        }, 3000);
    }

    // Social Links Hover Effects
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) rotate(-2deg)';
            this.style.boxShadow = '0 8px 25px rgba(255, 107, 53, 0.4)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg)';
            this.style.boxShadow = 'none';
        });
    });

    // Form Field Focus Effects
    const formFields = document.querySelectorAll('input, select, textarea');
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
            this.style.borderColor = 'var(--primary-color)';
            this.style.boxShadow = '0 0 0 3px rgba(255, 107, 53, 0.1)';
        });
        
        field.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
            if (this.value === '') {
                this.style.borderColor = '#E0E0E0';
                this.style.boxShadow = 'none';
            }
        });
    });

    // Button Click Effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple animation to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .btn {
            overflow: hidden;
            position: relative;
        }
    `;
    document.head.appendChild(style);

    // Hero Badges Stagger Animation
    const heroBadges = document.querySelectorAll('.badge');
    heroBadges.forEach((badge, index) => {
        badge.style.animationDelay = `${0.4 + (index * 0.1)}s`;
        badge.classList.add('reveal');
        
        // Add floating animation
        setTimeout(() => {
            badge.style.animation = `fadeInUp 0.8s ease ${0.4 + (index * 0.1)}s both, float 4s ease-in-out infinite`;
            badge.style.animationDelay = `${2 + (index * 0.5)}s`;
        }, 2000);
    });

    // Menu Features Animation
    const menuFeatures = document.querySelectorAll('.feature');
    menuFeatures.forEach((feature, index) => {
        feature.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.background = 'var(--gradient-primary)';
            this.style.color = 'var(--text-light)';
        });
        
        feature.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.background = 'var(--bg-accent)';
            this.style.color = 'var(--text-primary)';
        });
    });

    // Testimonial Stars Animation
    const testimonialStars = document.querySelectorAll('.stars');
    testimonialStars.forEach(stars => {
        stars.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 0.5s ease';
            this.style.transform = 'scale(1.2)';
        });
        
        stars.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Info Cards Stagger Animation
    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(12px) scale(1.02)';
            this.style.boxShadow = '0 12px 40px rgba(255, 107, 53, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
            this.style.boxShadow = 'var(--shadow-md)';
        });
    });

    // Loading Animation for Page
    window.addEventListener('load', function() {
        // Add loaded class to body for any additional animations
        document.body.classList.add('loaded');
        
        // Animate hero elements on load
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroButtons = document.querySelector('.hero-buttons');
        
        if (heroTitle) {
            setTimeout(() => heroTitle.style.animation = 'fadeInUp 0.8s ease both', 200);
        }
        if (heroSubtitle) {
            setTimeout(() => heroSubtitle.style.animation = 'fadeInUp 0.8s ease both', 400);
        }
        if (heroButtons) {
            setTimeout(() => heroButtons.style.animation = 'fadeInUp 0.8s ease both', 600);
        }
    });

    // Easter Egg: Konami Code for Fun Animation
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.keyCode);
        
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.toString() === konamiSequence.toString()) {
            // Add special fiesta animation
            document.body.style.animation = 'rainbow 2s ease infinite';
            setTimeout(() => {
                document.body.style.animation = '';
                alert('¡Felicidades! ¡Encontraste el código secreto de Teresita! 🎉🌮');
            }, 2000);
            konamiCode = [];
        }
    });

    // Add rainbow animation
    const rainbowStyle = document.createElement('style');
    rainbowStyle.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            25% { filter: hue-rotate(90deg); }
            50% { filter: hue-rotate(180deg); }
            75% { filter: hue-rotate(270deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(rainbowStyle);

    // Performance Optimization: Throttle scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // Apply throttling to scroll events
    window.addEventListener('scroll', throttle(function() {
        // Your scroll-based animations here
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-bg-image');
        
        if (heroBackground && scrolled < window.innerHeight) {
            heroBackground.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    }, 16)); // ~60fps

    // Accessibility: Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // Disable animations for users who prefer reduced motion
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }

    // Testimonials Ticker - no JavaScript needed, pure CSS animation

    // Instagram embeds are now hardcoded in HTML - Instagram's embed.js will process them automatically
    // To add more posts: Go to Instagram post → Click "..." → "Embed" → Copy the entire <blockquote> code
    // Paste it into the HTML in the #instagramFeed container

    console.log('¡Teresita\'s Birria está lista para servir! 🌮✨');
});