console.log("Script loaded successfully!");

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    welcomeMessage();
    initializeNavigation();
    initializeAnimations();
    initializeMobileMenu();
});

function validateForm() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const resultDiv = document.getElementById("result-form");

    // Clear previous results
    resultDiv.innerHTML = "";
    resultDiv.className = "mt-4 p-4 rounded-lg";

    // Validation
    if (!name || !email || !message) {
        showFormResult("Please fill out all required fields.", "error");
        return false;
    }

    if (!isValidEmail(email)) {
        showFormResult("Please enter a valid email address.", "error");
        return false;
    }

    if (message.length < 10) {
        showFormResult("Please enter a message with at least 10 characters.", "error");
        return false;
    }

    // Success message with BMW branding
    showFormResult(`Thank you, ${name}! Your inquiry has been sent to BMW Indonesia. Our team will contact you within 24 hours to discuss your BMW experience. We look forward to helping you find your ultimate driving machine!`, "success");
    
    // Clear form
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";
    
    // Clear phone and model selection if they exist
    const phoneField = document.getElementById("phone");
    const modelField = document.getElementById("interested-model");
    if (phoneField) phoneField.value = "";
    if (modelField) modelField.value = "";
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormResult(message, type) {
    const resultDiv = document.getElementById("result-form");
    resultDiv.innerHTML = message;
    
    if (type === "success") {
        resultDiv.className = "mt-4 p-4 rounded-lg bg-green-100 text-green-800 border border-green-300";
    } else {
        resultDiv.className = "mt-4 p-4 rounded-lg bg-red-100 text-red-800 border border-red-300";
    }
}

function welcomeMessage() {
    // BMW-themed welcome message
    setTimeout(() => {
        const userName = prompt("Welcome to BMW Indonesia! What's your name?");
        if (userName && userName.trim()) {
            const welcomeText = document.querySelector('h1');
            if (welcomeText) {
                welcomeText.innerHTML = `The Ultimate Driving Machine<br><span class="text-3xl md:text-4xl text-blue-200">Welcome, ${userName.trim()}!</span>`;
                welcomeText.classList.add('animate-pulse');
                setTimeout(() => {
                    welcomeText.classList.remove('animate-pulse');
                }, 3000);
            }
            
            // Show BMW welcome notification
            showBMWNotification(`Hello ${userName.trim()}! Ready to experience BMW?`);
        }
    }, 1500);
}

function showBMWNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
    notification.innerHTML = `
        <div class="flex items-center">
            <div class="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
                <span class="text-blue-600 font-bold text-sm">BMW</span>
            </div>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Slide in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Slide out after 4 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

function initializeNavigation() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });
}

function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
    }
}

function initializeAnimations() {
    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Add BMW-specific interactions
document.addEventListener('DOMContentLoaded', function() {
    const carCards = document.querySelectorAll('.car-showcase');
    carCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add BMW model interest tracking
    const modelButtons = document.querySelectorAll('.car-showcase button');
    modelButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modelName = this.closest('.car-showcase').querySelector('h3').textContent;
            showBMWNotification(`Interested in ${modelName}? Contact us for a test drive!`);
        });
    });
});

// BMW-specific features
function scheduleBMWTestDrive(model) {
    alert(`Test drive scheduled for ${model}! Our BMW specialist will contact you within 24 hours.`);
}

function findBMWDealer() {
    alert('BMW Dealer Locator: Visit bmw.co.id/dealer-locator to find the nearest BMW showroom.');
}