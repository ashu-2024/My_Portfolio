document.addEventListener('DOMContentLoaded', function() {
            // Mobile Navigation
            const hamburger = document.querySelector('.hamburger');
            const navLinks = document.querySelector('.nav-links');
            const navItems = document.querySelectorAll('.nav-links li');

            hamburger.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                hamburger.classList.toggle('active');
                document.body.classList.toggle('no-scroll');
            });

            navItems.forEach(item => {
                item.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                });
            });

            // Smooth Scrolling
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                if (anchor.classList.contains('resume-btn')) return;
                
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 70,
                            behavior: 'smooth'
                        });
                    }
                });
            });

            // Sticky Navbar
            const navbar = document.querySelector('.navbar');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });

            // Form Submission
            const contactForm = document.querySelector('.contact-form');
            if (contactForm) {
                contactForm.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    
                    const formData = {
                        name: contactForm.querySelector('input[type="text"]').value,
                        email: contactForm.querySelector('input[type="email"]').value,
                        message: contactForm.querySelector('textarea').value
                    };
                    
                    if (!formData.name || !formData.email || !formData.message) {
                        showAlert('Please fill in all fields', 'error');
                        return;
                    }

                    if (!validateEmail(formData.email)) {
                        showAlert('Please enter a valid email address', 'error');
                        return;
                    }

                    try {
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

            // Current Year in Footer
            const currentYear = new Date().getFullYear();
            document.getElementById('current-year').textContent = currentYear;

            // Helper Functions
            function validateEmail(email) {
                const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return re.test(email);
            }

            function showAlert(message, type) {
                const existingAlert = document.querySelector('.custom-alert');
                if (existingAlert) existingAlert.remove();

                const alert = document.createElement('div');
                alert.className = `custom-alert ${type}`;
                alert.textContent = message;
                document.body.appendChild(alert);

                setTimeout(() => {
                    alert.classList.add('show');
                }, 10);

                setTimeout(() => {
                    alert.classList.remove('show');
                    setTimeout(() => {
                        alert.remove();
                    }, 300);
                }, 5000);
            }

            function simulateFormSubmission(formData) {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        console.log('Form submitted:', formData);
                        resolve({ success: true });
                    }, 1000);
                });
            }
        });