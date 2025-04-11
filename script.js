      
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
                entry.target.classList.add('visible');
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.25 });

    
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
            block.addEventListener('mouseenter', function() {
                this.style.transition = 'all 0.2s ease';
            });
            
            block.addEventListener('click', function(e) {
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
            });
        });

        
        window.addEventListener('resize', function() {
            // maybe add some dynamic responsive behavior here in the future
        });

         
    document.body.classList.add('loading');

   
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.body.classList.remove('loading');
            document.body.classList.add('loaded');
        }, 1500); 
    });

   
    setTimeout(() => {
        document.body.classList.remove('loading');
        document.body.classList.add('loaded');
    }, 4000);


    