function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    const duration = 3500; // Animation duration in ms
    const startTime = Date.now();

    stats.forEach(stat => {
        const target = parseInt(stat.textContent.replace(/\D/g, ''));
        const suffix = stat.textContent.replace(/\d/g, '');
        let start = 0;

        const updateCounter = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(progress * target);

            stat.textContent = formatNumber(current) + suffix;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = formatNumber(target) + suffix;
            }
        };

        requestAnimationFrame(updateCounter);
    });
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');

            // Start stats animation when stats container is visible
            if (entry.target.classList.contains('stats-container')) {
                animateStats();
            }
        }
    });
}, {
    threshold: 0.25,
    rootMargin: '0px 0px -50px 0px'
});

// Observe all animatable elements
document.querySelectorAll('.hero, .stats-container, .project-block, .feature-card, .footer')
    .forEach(el => observer.observe(el));

document.querySelectorAll('.animate-on-scroll').forEach(section => {
    observer.observe(section);
});

const heroSection = document.querySelector('.hero');
observer.observe(heroSection);

document.querySelectorAll('.project-block').forEach((block, index) => {
    block.style.animationDelay = `${index * 0.1}s`;
});

window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
});

document.querySelectorAll('.project-block').forEach(block => {
    block.addEventListener('mouseenter', function () {
        this.style.transition = 'all 0.2s ease';
    });

    block.addEventListener('click', function (e) {
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    });
});

window.addEventListener('resize', function () {
    // maybe add some dynamic responsive behavior here in the future
});

//document.body.classList.add('loading');

window.addEventListener('load', () => {
    setTimeout(() => {
        //document.body.classList.remove('loading');
        document.body.classList.add('loaded');

        // Also try to animate stats when page loads (as a fallback)
        setTimeout(() => {
            if (!document.querySelector('.stats-container.animate')) {
                animateStats();
            }
        }, 500);
    }, 1500);
});

setTimeout(() => {
    //document.body.classList.remove('loading');
    document.body.classList.add('loaded');
}, 4000);

function initFeatureCards() {
    const features = document.querySelectorAll('.feature-card');

    features.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.transform = `
                perspective(1000px)
                rotateX(${(y - rect.height / 2) / 8}deg)
                rotateY(${-(x - rect.width / 2) / 8}deg)
            `;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
}

// Call in load event
window.addEventListener('load', () => {
    initFeatureCards();
});

//scroll
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        
        if (targetSection) {
            const targetPosition = targetSection.offsetTop - navbarHeight - 20; // 20px extra spacing
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            // Toggle between bars and X icon
            const icon = menuToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close mobile menu when clicking on a link
        const mobileLinks = document.querySelectorAll('.mobile-menu-item');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
});

//scripts for game modal here
let currentGameFrame = null;

        function openGame(title, gameUrl) {
            // Set game title
            document.getElementById('gameTitle').textContent = title;
            
            // Show modal
            document.getElementById('gameModal').style.display = 'block';
            
            // Show loading indicator
            document.getElementById('loadingIndicator').style.display = 'flex';
            document.getElementById('gameFrame').style.display = 'none';
            
            // Get iframe element
            currentGameFrame = document.getElementById('gameFrame');
            
            // Set up load event listener
            currentGameFrame.onload = function() {
                // Hide loading indicator and show game
                document.getElementById('loadingIndicator').style.display = 'none';
                currentGameFrame.style.display = 'block';
            };
            
            // Load the game
            currentGameFrame.src = gameUrl;
            
            // Prevent body scrolling when modal is open
            document.body.style.overflow = 'hidden';
        }

        function closeGame() {
            // Hide modal
            document.getElementById('gameModal').style.display = 'none';
            
            // Clear iframe source to stop the game
            if (currentGameFrame) {
                currentGameFrame.src = '';
            }
            
            // Restore body scrolling
            document.body.style.overflow = 'auto';
        }

        // Close modal when clicking outside of it
        window.onclick = function(event) {
            const modal = document.getElementById('gameModal');
            if (event.target === modal) {
                closeGame();
            }
        }

        // Close modal with Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                closeGame();
            }
        });

        // Handle iframe communication (optional)
        window.addEventListener('message', function(event) {
            // Handle messages from games if needed
            console.log('Message from game:', event.data);
            
            // Example: Close modal if game sends 'close' message
            if (event.data === 'close') {
                closeGame();
            }
        });

        
// Authentication Modal Functions
let isLoginMode = true;

function openAuthModal(mode = 'login') {
    // Normalize the mode parameter to handle different variations
    isLoginMode = mode === 'login' || mode === 'signin';
    updateAuthModal();
    document.getElementById('authModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeAuthModal() {
    document.getElementById('authModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    document.getElementById('authForm').reset();
    document.getElementById('successMessage').style.display = 'none';
    
    // Reset form display in case it was hidden after registration
    document.getElementById('authForm').style.display = 'flex';
}

function updateAuthModal() {
    const title = document.getElementById('authModalTitle');
    const submitBtn = document.getElementById('authSubmitBtn');
    const switchText = document.getElementById('authSwitchText');
    const switchLink = document.getElementById('authSwitchLink');
    const confirmPasswordGroup = document.getElementById('confirmPasswordGroup');
    const nameGroup = document.getElementById('nameGroup');
    
    if (isLoginMode) {
        title.textContent = 'Welcome Back';
        submitBtn.textContent = 'Sign In';
        switchText.textContent = "Don't have an account?";
        switchLink.textContent = 'Create one';
        confirmPasswordGroup.style.display = 'none';
        nameGroup.style.display = 'none';
        document.getElementById('confirmPassword').required = false;
        document.getElementById('fullName').required = false;
    } else {
        title.textContent = 'Join Us Today';
        submitBtn.textContent = 'Create Account';
        switchText.textContent = 'Already have an account?';
        switchLink.textContent = 'Sign in';
        confirmPasswordGroup.style.display = 'flex';
        nameGroup.style.display = 'flex';
        document.getElementById('confirmPassword').required = true;
        document.getElementById('fullName').required = true;
    }
}

function toggleAuthMode() {
    isLoginMode = !isLoginMode;
    updateAuthModal();
    document.getElementById('authForm').reset();
    document.getElementById('successMessage').style.display = 'none';
    // Reset form display in case it was hidden
    document.getElementById('authForm').style.display = 'flex';
}

// Track user authentication state
let isUserSignedIn = false;
let currentUser = null;

// Function to handle successful sign in
function handleSignInSuccess(userData) {
    isUserSignedIn = true;
    currentUser = userData;
    
    // Update UI to show user profile
    showUserProfile(userData);
    
    // Close auth modal
    closeAuthModal();
    
    console.log('User signed in successfully:', userData);
}

// Function to show user profile in navigation
function showUserProfile(userData) {
    // Hide guest buttons
    const guestButtons = document.getElementById('guestButtons');
    const guestMobileButtons = document.getElementById('guestMobileButtons');
    
    if (guestButtons) guestButtons.style.display = 'none';
    if (guestMobileButtons) guestMobileButtons.style.display = 'none';
    
    // Show user profile
    const userProfile = document.getElementById('userProfile');
    const userMobileProfile = document.getElementById('userMobileProfile');
    
    if (userProfile) userProfile.style.display = 'flex';
    if (userMobileProfile) userMobileProfile.style.display = 'flex';
    
    // Set user avatar initials
    const initials = getInitials(userData.name || userData.email);
    const userAvatar = document.getElementById('userAvatar');
    const userMobileAvatar = document.getElementById('userMobileAvatar');
    
    if (userAvatar) userAvatar.textContent = initials;
    if (userMobileAvatar) userMobileAvatar.textContent = initials;
    
    // Set mobile name
    const userMobileName = document.getElementById('userMobileName');
    if (userMobileName) userMobileName.textContent = userData.name || userData.email;
}

// Function to get user initials
function getInitials(name) {
    if (!name) return 'U';
    
    const names = name.split(' ');
    if (names.length >= 2) {
        return (names[0][0] + names[1][0]).toUpperCase();
    }
    return name.charAt(0).toUpperCase();
}

// Function to handle sign out
function signOut() {
    isUserSignedIn = false;
    currentUser = null;
    
    // Show guest buttons
    const guestButtons = document.getElementById('guestButtons');
    const guestMobileButtons = document.getElementById('guestMobileButtons');
    
    if (guestButtons) guestButtons.style.display = 'flex';
    if (guestMobileButtons) guestMobileButtons.style.display = 'flex';
    
    // Hide user profile
    const userProfile = document.getElementById('userProfile');
    const userMobileProfile = document.getElementById('userMobileProfile');
    
    if (userProfile) userProfile.style.display = 'none';
    if (userMobileProfile) userMobileProfile.style.display = 'none';
    
    console.log('User signed out successfully');
}

// Enhanced form submission handler
function handleAuthFormSubmission(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const fullName = document.getElementById('fullName').value.trim();
    
    // Basic validation
    if (!email || !password) {
        alert('Please fill in all required fields!');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address!');
        return;
    }
    
    // Registration mode validations
    if (!isLoginMode) {
        if (!fullName) {
            alert('Please enter your full name!');
            return;
        }
        
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        if (password.length < 6) {
            alert('Password must be at least 6 characters long!');
            return;
        }
    }
    
    // Show loading state
    const submitBtn = document.getElementById('authSubmitBtn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Loading...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button state
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        if (isLoginMode) {
            // Simulate login success
            const userData = {
                email: email,
                name: fullName || email.split('@')[0], // Use email prefix if no name
                id: Date.now() // Simple ID for demo
            };
            
            handleSignInSuccess(userData);
            //alert(`Welcome back! Signed in as ${email}`);
        } else {
            // Simulate registration success
            document.getElementById('successMessage').style.display = 'block';
            document.getElementById('authForm').style.display = 'none';
            
            // Auto close and sign in user after 2.5 seconds
            setTimeout(() => {
                const userData = {
                    email: email,
                    name: fullName,
                    id: Date.now()
                };
                
                handleSignInSuccess(userData);
                //alert(`Account created successfully! Welcome, ${fullName}!`);
            }, 3000);
        }
    }, 1000); // Simulate network delay
}

// Enhanced button listener setup
function updateAuthButtonListeners() {
    // Remove existing listeners to prevent duplicates
    const existingButtons = document.querySelectorAll('[data-auth-listener]');
    existingButtons.forEach(btn => btn.removeAttribute('data-auth-listener'));
    
    // Update Sign In buttons
    document.querySelectorAll('.login-button').forEach(button => {
        if (!button.hasAttribute('data-auth-listener')) {
            button.setAttribute('data-auth-listener', 'true');
            button.addEventListener('click', function(e) {
                e.preventDefault();
                openAuthModal('login');
            });
        }
    });
    
    // Update Get Started buttons (excluding game/project navigation buttons)
    document.querySelectorAll('.cta-button:not([href="#games"]):not([href="#projects"])').forEach(button => {
        if (!button.hasAttribute('data-auth-listener')) {
            button.setAttribute('data-auth-listener', 'true');
            button.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                // Only prevent default for non-navigation buttons
                if (!href || href === '#' || href === '') {
                    e.preventDefault();
                    openAuthModal('register');
                }
            });
        }
    });
    
    // Handle nav-cta specifically
    document.querySelectorAll('.nav-cta').forEach(button => {
        if (!button.hasAttribute('data-auth-listener')) {
            button.setAttribute('data-auth-listener', 'true');
            button.addEventListener('click', function(e) {
                e.preventDefault();
                openAuthModal('register');
            });
        }
    });
}

// Enhanced DOMContentLoaded handler
document.addEventListener('DOMContentLoaded', function() {
    const authForm = document.getElementById('authForm');
    
    if (authForm) {
        authForm.addEventListener('submit', handleAuthFormSubmission);
    }
    
    // Set up button listeners
    updateAuthButtonListeners();
    
    // Handle mobile menu auth buttons
    document.querySelectorAll('.mobile-menu .login-button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            openAuthModal('login');
        });
    });
    
    document.querySelectorAll('.mobile-menu .cta-button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            openAuthModal('register');
        });
    });
});

// Enhanced modal close handlers
window.addEventListener('click', function(event) {
    const authModal = document.getElementById('authModal');
    const gameModal = document.getElementById('gameModal');
    
    if (event.target === authModal) {
        closeAuthModal();
    } else if (event.target === gameModal) {
        closeGame();
    }
});

// Enhanced keyboard handlers
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const authModal = document.getElementById('authModal');
        const gameModal = document.getElementById('gameModal');
        
        if (authModal && authModal.style.display === 'block') {
            closeAuthModal();
        } else if (gameModal && gameModal.style.display === 'block') {
            closeGame();
        }
    }
});

// Newsletter form handler (bonus feature)
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                // Simulate subscription
                const button = this.querySelector('button');
                const originalText = button.innerHTML;
                button.innerHTML = 'Subscribing...';
                button.disabled = true;
                
                setTimeout(() => {
                    button.innerHTML = 'Subscribed! ✓';
                    setTimeout(() => {
                        button.innerHTML = originalText;
                        button.disabled = false;
                        this.reset();
                    }, 2000);
                }, 1000);
            }
        });
    }
});