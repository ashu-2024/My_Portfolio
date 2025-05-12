document.addEventListener('DOMContentLoaded', function() {
    // ========== Mobile Navigation ==========
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    // Close mobile menu when clicking on a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // ========== Smooth Scrolling ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Skip if it's the resume download link
            if (this.classList.contains('resume-btn')) return;
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========== Sticky Navbar ==========
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ========== Form Submission ==========
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get form values
            const formData = {
                name: contactForm.querySelector('input[type="text"]').value,
                email: contactForm.querySelector('input[type="email"]').value,
                message: contactForm.querySelector('textarea').value
            };
            
            // Simple validation
            if (!formData.name || !formData.email || !formData.message) {
                showAlert('Please fill in all fields', 'error');
                return;
            }

            // Email validation
            if (!validateEmail(formData.email)) {
                showAlert('Please enter a valid email address', 'error');
                return;
            }

            try {
                // Here you would typically send the form data to a server
                // For demo purposes, we'll simulate an API call
                const response = await simulateFormSubmission(formData);
                
                if (response.success) {
                    showAlert('Thank you for your message! I will get back to you soon.', 'success');
                    contactForm.reset();
                } else {
                    showAlert('Something went wrong. Please try again later.', 'error');
                }
            } catch (error) {
                console.error('Form submission error:', error);
                showAlert('Failed to send message. Please try again later.', 'error');
            }
        });
    }

    // ========== GitHub Stats ==========
    async function loadGitHubStats() {
        const githubStats = document.querySelector('.github-stats');
        if (!githubStats) return;

        const username = 'ashu-2024'; // Your GitHub username
        
        try {
            // Clear existing content
            githubStats.innerHTML = '';
            
            // Create stats container
            const statsContainer = document.createElement('div');
            statsContainer.className = 'github-stats-container';
            
            // Create stats image
            const statsImg = document.createElement('img');
            statsImg.src = `https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=dark&hide_border=true`;
            statsImg.alt = 'GitHub Stats';
            statsImg.loading = 'lazy';
            
            // Create streak stats
            const streakImg = document.createElement('img');
            streakImg.src = `https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=dark&hide_border=true`;
            streakImg.alt = 'GitHub Streak';
            streakImg.loading = 'lazy';
            
            // Create contributions image
            const chartImg = document.createElement('img');
            chartImg.src = `https://ghchart.rshah.org/${username}`;
            chartImg.alt = 'GitHub Contributions';
            chartImg.loading = 'lazy';
            chartImg.className = 'github-chart';
            
            // Append images to container
            statsContainer.appendChild(statsImg);
            statsContainer.appendChild(streakImg);
            githubStats.appendChild(statsContainer);
            githubStats.appendChild(chartImg);
        } catch (error) {
            console.error('Error loading GitHub stats:', error);
            githubStats.innerHTML = '<p>GitHub stats could not be loaded at this time.</p>';
        }
    }

    // Load GitHub stats
    loadGitHubStats();

    // ========== Scroll Animations ==========
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.skill-item, .project-card, .education-item');
        const windowHeight = window.innerHeight;
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const animationPoint = windowHeight * 0.85;
            
            if (elementPosition < animationPoint) {
                element.classList.add('animated');
            }
        });
    };

    // Initial check on load
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);

    // ========== Home Section Animation ==========
    const homeSection = document.querySelector('.home-section');
    if (homeSection) {
        setTimeout(() => {
            homeSection.style.opacity = '1';
            homeSection.style.transform = 'translateY(0)';
        }, 100);
    }

    // ========== Helper Functions ==========
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showAlert(message, type) {
        // Remove any existing alerts
        const existingAlert = document.querySelector('.custom-alert');
        if (existingAlert) existingAlert.remove();

        // Create alert element
        const alert = document.createElement('div');
        alert.className = `custom-alert ${type}`;
        alert.textContent = message;
        document.body.appendChild(alert);

        // Show alert
        setTimeout(() => {
            alert.classList.add('show');
        }, 10);

        // Hide after 5 seconds
        setTimeout(() => {
            alert.classList.remove('show');
            setTimeout(() => {
                alert.remove();
            }, 300);
        }, 5000);
    }

    // Simulate form submission (replace with actual fetch to your backend)
    function simulateFormSubmission(formData) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Form submitted:', formData);
                resolve({ success: true });
            }, 1000);
        });
    }

    // ========== Current Year in Footer ==========
    const yearSpan = document.querySelector('footer p');
    if (yearSpan) {
        const currentYear = new Date().getFullYear();
        yearSpan.textContent = `© ${currentYear} Ashutosh Kumar Sah. All rights reserved.`;
    }
});