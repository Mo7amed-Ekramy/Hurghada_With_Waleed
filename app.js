document.addEventListener('DOMContentLoaded', () => {
    const langBtns = document.querySelectorAll('.lang-btn');
    const langContents = document.querySelectorAll('.lang-content');

    const langToggle = document.getElementById('langToggle');
    const langMenu = document.getElementById('langMenu');
    const currentLangText = document.getElementById('currentLang');

    if (langToggle && langMenu) {
        langToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            langMenu.classList.toggle('show');
        });

        document.addEventListener('click', () => {
            langMenu.classList.remove('show');
        });
    }

    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            langBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const targetLang = btn.getAttribute('data-target');
            const shortText = btn.getAttribute('data-short');

            if (currentLangText && shortText) {
                currentLangText.textContent = shortText;
            }

            // Hide all language contents
            langContents.forEach(content => {
                content.classList.remove('active');
            });

            // Show target language content in each tour card
            const targetContents = document.querySelectorAll(`.lang-content[data-lang="${targetLang}"]`);
            targetContents.forEach(content => {
                content.classList.add('active');
            });
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Simple fade-in animation on scroll and image lazy loading
    const observerOptions = {
        root: null,
        rootMargin: '50px', // start loading slightly before they enter the viewport
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                
                // Lazy-load background image if available
                const lazyBg = entry.target.querySelector('.lazy-bg');
                if (lazyBg) {
                    const bgUrl = lazyBg.getAttribute('data-bg');
                    if (bgUrl) {
                        lazyBg.style.backgroundImage = `url('${bgUrl}')`;
                        lazyBg.classList.remove('lazy-bg');
                    }
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.tour-card, .feature-card').forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
