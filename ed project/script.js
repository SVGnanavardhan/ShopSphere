// ShopSphere Website JavaScript

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileMenu();
    initSmoothScrolling();
    initContactForm();
    initScrollAnimations();
    initNavbarScroll();
    initVideoPlaceholder();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a nav link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Contact Form Functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Validate form
            if (validateForm(formObject)) {
                // Show success message
                showFormMessage('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
                
                // Reset form
                contactForm.reset();
                
                // In a real application, you would send the data to a server
                console.log('Form submitted:', formObject);
            }
        });
    }
}

// Form Validation
function validateForm(data) {
    const errors = [];
    
    // Required fields validation
    if (!data.name || data.name.trim() === '') {
        errors.push('Name is required');
        highlightField('name');
    }
    
    if (!data.email || data.email.trim() === '') {
        errors.push('Email is required');
        highlightField('email');
    } else if (!isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
        highlightField('email');
    }
    
    if (!data.interest || data.interest === '') {
        errors.push('Please select what interests you most');
        highlightField('interest');
    }
    
    if (errors.length > 0) {
        showFormMessage(errors.join('<br>'), 'error');
        return false;
    }
    
    // Clear any existing field highlights
    clearFieldHighlights();
    return true;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Highlight invalid fields
function highlightField(fieldName) {
    const field = document.getElementById(fieldName);
    if (field) {
        field.style.borderColor = '#ef4444';
        field.addEventListener('input', function() {
            field.style.borderColor = '#e2e8f0';
        }, { once: true });
    }
}

// Clear field highlights
function clearFieldHighlights() {
    const fields = ['name', 'email', 'company', 'interest', 'message'];
    fields.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (field) {
            field.style.borderColor = '#e2e8f0';
        }
    });
}

// Show form messages
function showFormMessage(message, type) {
    // Remove existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message form-message-${type}`;
    messageDiv.innerHTML = message;
    
    // Add styles
    messageDiv.style.padding = '1rem';
    messageDiv.style.marginBottom = '1rem';
    messageDiv.style.borderRadius = '8px';
    messageDiv.style.fontSize = '0.9rem';
    
    if (type === 'success') {
        messageDiv.style.backgroundColor = '#dcfce7';
        messageDiv.style.color = '#166534';
        messageDiv.style.border = '1px solid #bbf7d0';
    } else if (type === 'error') {
        messageDiv.style.backgroundColor = '#fef2f2';
        messageDiv.style.color = '#dc2626';
        messageDiv.style.border = '1px solid #fecaca';
    }
    
    // Insert message at the top of the form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.insertBefore(messageDiv, contactForm.firstChild);
        
        // Auto-remove success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.remove();
                }
            }, 5000);
        }
    }
}

// Navbar Background Change on Scroll
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        });
    }
}

// Scroll Animations
function initScrollAnimations() {
    // Create intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Add animation class to elements
    const animateElements = document.querySelectorAll(
        '.feature-card, .testimonial-card, .step, .about-content > *, .section-header'
    );
    
    animateElements.forEach(element => {
        element.classList.add('animate-on-scroll');
        observer.observe(element);
    });
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-on-scroll.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .feature-card.animate-on-scroll {
            transition-delay: 0.1s;
        }
        
        .feature-card:nth-child(2).animate-on-scroll {
            transition-delay: 0.2s;
        }
        
        .feature-card:nth-child(3).animate-on-scroll {
            transition-delay: 0.3s;
        }
        
        .feature-card:nth-child(4).animate-on-scroll {
            transition-delay: 0.4s;
        }
    `;
    document.head.appendChild(style);
}

// Video Placeholder Click Handler
function initVideoPlaceholder() {
    const videoPlaceholder = document.querySelector('.video-placeholder');
    
    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', function() {
            // In a real application, you would load and play the actual video
            // For now, we'll show a modal or redirect to a video platform
            
            // Create a simple modal
            showVideoModal();
        });
    }
}

// Show Video Modal (placeholder functionality)
function showVideoModal() {
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
        cursor: pointer;
    `;
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 3rem;
        border-radius: 12px;
        text-align: center;
        max-width: 500px;
        margin: 20px;
        cursor: default;
    `;
    
    modalContent.innerHTML = `
        <h3 style="color: #1e293b; margin-bottom: 1rem;">Demo Video</h3>
        <p style="color: #64748b; margin-bottom: 2rem;">
            Our demo video is coming soon! In the meantime, 
            <a href="#contact" style="color: #2563eb;">contact us</a> 
            for a live demonstration.
        </p>
        <button id="closeModal" style="
            background: #2563eb;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 1rem;
        ">Close</button>
    `;
    
    // Prevent content click from closing modal
    modalContent.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // Close modal functionality
    const closeModal = () => {
        document.body.removeChild(modalOverlay);
    };
    
    modalOverlay.addEventListener('click', closeModal);
    
    modalContent.appendChild(modalContent);
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
    
    // Close button functionality
    setTimeout(() => {
        const closeButton = document.getElementById('closeModal');
        if (closeButton) {
            closeButton.addEventListener('click', closeModal);
        }
    }, 100);
}

// Statistics Counter Animation
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element, target) => {
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 20);
    };
    
    // Observe stats section
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const text = stat.textContent;
                    if (text.includes('k+')) {
                        const number = parseFloat(text) * 1000;
                        animateCounter(stat, number);
                    } else if (text.includes('M+')) {
                        const number = parseFloat(text) * 1000000;
                        animateCounter(stat, number);
                    } else if (text.includes('%')) {
                        const number = parseFloat(text);
                        animateCounter(stat, number);
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }
}

// Initialize stats counter
document.addEventListener('DOMContentLoaded', function() {
    initStatsCounter();
});

// Utility function to debounce scroll events
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

// Handle window resize
window.addEventListener('resize', debounce(function() {
    // Close mobile menu on resize if open
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
}, 250));

// Add loading state management
window.addEventListener('load', function() {
    // Add loaded class to body for any load-dependent animations
    document.body.classList.add('loaded');
    
    // Initialize any load-dependent functionality here
    console.log('ShopSphere website loaded successfully!');
});