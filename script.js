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