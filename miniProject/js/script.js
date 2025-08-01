// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', function () {

    // --- Smooth Animations on Scroll ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('section, .group').forEach(el => {
        observer.observe(el);
    });

    // --- Enhanced Welcome Message with Better UX ---
    const guestNameElement = document.getElementById('guest-name');
    if (guestNameElement) {
        // Check if user name is already stored
        const storedName = localStorage.getItem('zenith-user-name');
        
        if (storedName) {
            guestNameElement.textContent = storedName;
        } else {
            // Create a more elegant modal-like prompt
            setTimeout(() => {
                const name = prompt("Welcome to Zenith Laptops! 🎉\n\nWhat should we call you?", "");
                if (name && name.trim()) {
                    const trimmedName = name.trim();
                    guestNameElement.textContent = trimmedName;
                    localStorage.setItem('zenith-user-name', trimmedName);
                    
                    // Add a nice animation effect
                    guestNameElement.style.transform = 'scale(1.1)';
                    setTimeout(() => {
                        guestNameElement.style.transform = 'scale(1)';
                    }, 300);
                }
            }, 1000);
        }
    }

    // --- Enhanced Form Validation and Submission ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        // Add real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearErrors);
        });

        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const fullName = document.getElementById('full-name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');

            // Clear previous errors
            clearAllErrors();

            let isValid = true;

            // Enhanced validation
            if (!fullName.value.trim()) {
                showError(fullName, 'Please enter your full name');
                isValid = false;
            } else if (fullName.value.trim().length < 2) {
                showError(fullName, 'Name must be at least 2 characters long');
                isValid = false;
            }

            if (!email.value.trim()) {
                showError(email, 'Please enter your email address');
                isValid = false;
            } else if (!isValidEmail(email.value.trim())) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            }

            if (!message.value.trim()) {
                showError(message, 'Please enter your message');
                isValid = false;
            } else if (message.value.trim().length < 10) {
                showError(message, 'Message must be at least 10 characters long');
                isValid = false;
            }

            if (!isValid) {
                // Shake the form to indicate errors
                contactForm.style.animation = 'shake 0.5s ease-in-out';
                setTimeout(() => {
                    contactForm.style.animation = '';
                }, 500);
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = `
                <svg class="inline w-5 h-5 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
                Sending...
            `;
            submitBtn.disabled = true;

            // Simulate form submission delay
            setTimeout(() => {
                const outputDiv = document.getElementById('form-output');
                
                const submissionTime = new Date().toLocaleString('en-US', {
                    dateStyle: 'full',
                    timeStyle: 'medium'
                });

                outputDiv.innerHTML = `
                    <div class="text-center">
                        <div class="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <h3 class="text-2xl font-bold text-green-800 mb-3">Message Sent Successfully! 🎉</h3>
                        <div class="text-left bg-white p-6 rounded-xl border border-green-200 mt-6">
                            <h4 class="font-semibold text-gray-800 mb-3">Your Message Details:</h4>
                            <p class="text-gray-600 mb-2"><strong>Name:</strong> ${fullName.value}</p>
                            <p class="text-gray-600 mb-2"><strong>Email:</strong> ${email.value}</p>
                            <p class="text-gray-600 mb-4"><strong>Message:</strong> ${message.value}</p>
                            <p class="text-gray-500 text-sm"><em>Submitted on: ${submissionTime}</em></p>
                        </div>
                        <p class="text-green-700 mt-4">We'll get back to you within 24 hours!</p>
                    </div>
                `;
                
                outputDiv.style.display = 'block';
                outputDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Reset form and button
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Add celebration effect
                createConfetti();
            }, 1500);
        });
    }

    // --- Mobile Menu Toggle with Animation ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Animate hamburger icon
            const icon = mobileMenuButton.querySelector('svg');
            icon.style.transform = mobileMenu.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(90deg)';
        });

        // Close mobile menu when clicking on links
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.querySelector('svg').style.transform = 'rotate(0deg)';
            });
        });
    }

    // --- Smooth Scrolling for Navigation Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- Product Card Interactions ---
    document.querySelectorAll('.group button').forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.closest('.group').querySelector('h3').textContent;
            alert(`🛒 Thanks for your interest in ${productName}!\n\nThis would normally redirect to a product details page or add the item to your cart.`);
        });
    });

    // --- Dynamic Year in Footer ---
    const yearSpan = document.getElementById('current-year');
    if(yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Scroll to Top Button ---
    createScrollToTopButton();

    // --- Helper Functions ---
    function validateField(e) {
        const field = e.target;
        clearErrors(e);
        
        if (field.id === 'email' && field.value && !isValidEmail(field.value)) {
            showError(field, 'Please enter a valid email address');
        }
    }

    function clearErrors(e) {
        const field = e.target;
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
        field.classList.remove('border-red-500');
    }

    function clearAllErrors() {
        document.querySelectorAll('.error-message').forEach(error => error.remove());
        document.querySelectorAll('input, textarea').forEach(field => {
            field.classList.remove('border-red-500');
        });
    }

    function showError(field, message) {
        field.classList.add('border-red-500');
        const errorElement = document.createElement('p');
        errorElement.className = 'error-message text-red-500 text-sm mt-1';
        errorElement.textContent = message;
        field.parentNode.appendChild(errorElement);
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function createConfetti() {
        // Simple confetti effect
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.innerHTML = ['🎉', '🎊', '✨', '🌟'][Math.floor(Math.random() * 4)];
                confetti.style.position = 'fixed';
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.top = '-10px';
                confetti.style.fontSize = '20px';
                confetti.style.zIndex = '9999';
                confetti.style.pointerEvents = 'none';
                confetti.style.animation = 'fall 3s linear forwards';
                document.body.appendChild(confetti);
                
                setTimeout(() => confetti.remove(), 3000);
            }, i * 100);
        }
    }

    function createScrollToTopButton() {
        const scrollBtn = document.createElement('button');
        scrollBtn.innerHTML = '↑';
        scrollBtn.className = 'fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-50 opacity-0 pointer-events-none';
        scrollBtn.style.transition = 'opacity 0.3s ease-in-out';
        document.body.appendChild(scrollBtn);

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollBtn.style.opacity = '1';
                scrollBtn.style.pointerEvents = 'auto';
            } else {
                scrollBtn.style.opacity = '0';
                scrollBtn.style.pointerEvents = 'none';
            }
        });

        scrollBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});