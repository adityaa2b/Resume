/* ========================================
   ADITYA BHUTADA — Portfolio Interactions
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ========== TYPING EFFECT ==========
    const typingEl = document.getElementById('typingText');
    const phrases = [
        'Data Engineer',
        'Associate Manager @ EY',
        'Solution Architect',
        'Agile Leader & Scrum Master',
        'ETL & Data Pipeline Expert',
        'Financial Services Specialist'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentText = '';

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            currentText = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            currentText = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        typingEl.innerHTML = currentText + '<span class="cursor"></span>';

        let speed = isDeleting ? 30 : 60;

        if (!isDeleting && charIndex === currentPhrase.length) {
            speed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            speed = 400;
        }

        setTimeout(typeEffect, speed);
    }

    typeEffect();


    // ========== NAVBAR SCROLL EFFECT ==========
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    function handleNavbarScroll() {
        const scrollY = window.scrollY;
        if (scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = scrollY;
    }

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });


    // ========== ACTIVE NAV LINK ==========
    const sections = document.querySelectorAll('.section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    function updateActiveNav() {
        const scrollY = window.scrollY + 150;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollY >= top && scrollY < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();


    // ========== HAMBURGER MENU ==========
    const hamburger = document.getElementById('hamburger');
    const navLinksContainer = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinksContainer.classList.toggle('open');
    });

    // Close menu on link click
    navLinksContainer.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinksContainer.classList.remove('open');
        });
    });


    // ========== SCROLL REVEAL ANIMATIONS ==========
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));


    // ========== ANIMATED COUNTERS ==========
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.count);
                animateCounter(el, target);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));

    function animateCounter(el, target) {
        const duration = 1500;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);

            el.textContent = current + '+';

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }


    // ========== SMOOTH SCROLL ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                targetEl.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });


    // ========== CONTACT FORM (mailto) ==========
    window.sendEmail = function () {
        const name = document.getElementById('name').value.trim();
        const subject = document.getElementById('subject').value.trim() || 'Inquiry from Portfolio';
        const message = document.getElementById('message').value.trim();
        const formStatus = document.getElementById('formStatus');

        if (!name || !message) {
            formStatus.textContent = 'Please fill in your name and message.';
            formStatus.className = 'form-status show error';
            setTimeout(() => formStatus.classList.remove('show'), 4000);
            return;
        }

        const body = `Hi Aditya,\n\nMy name is ${name}.\n\n${message}\n\nBest regards,\n${name}`;
        const mailtoLink = `mailto:aditya.bhutada94@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        window.location.href = mailtoLink;

        formStatus.textContent = '✅ Opening your email client...';
        formStatus.className = 'form-status show success';
        setTimeout(() => formStatus.classList.remove('show'), 5000);
    };


    // ========== SKILL TAG HOVER EFFECT ==========
    document.querySelectorAll('.skill-tag').forEach(tag => {
        tag.addEventListener('mouseenter', function () {
            this.style.boxShadow = '0 4px 16px rgba(184, 134, 11, 0.15)';
        });
        tag.addEventListener('mouseleave', function () {
            this.style.boxShadow = 'none';
        });
    });


    // ========== PARALLAX ON HERO ==========
    const heroContent = document.querySelector('.hero-content');
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (scrollY < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrollY * 0.08}px)`;
        }
    }, { passive: true });


    // ========== BACK TO TOP BUTTON ==========
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }, { passive: true });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

});
