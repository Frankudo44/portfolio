/* ==========================================
   FRANKLIN UDO — PORTFOLIO
   JavaScript: Interactivity & Animations
   ========================================== */

(function () {
    'use strict';

    // ---------- DOM REFERENCES ----------
    const html = document.documentElement;
    const navbar = document.getElementById('navbar');
    const navMenu = document.getElementById('nav-menu');
    const hamburger = document.getElementById('hamburger');
    const themeToggle = document.getElementById('theme-toggle');
    const navLinks = document.querySelectorAll('.nav-link');
    const fadeElements = document.querySelectorAll('.fade-up');
    const statNumbers = document.querySelectorAll('.stat-number');

    const contactForm = document.getElementById('contact-form');

    // ---------- SUPABASE ----------
    const supabaseUrl = 'https://paymxhpvqsivhsyklhjy.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBheW14aHB2cXNpdmhzeWtsaGp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg1MjI2ODQsImV4cCI6MjEwNDA5ODY4NH0.J6d9JVO-XahD2IBz8Hyz-pDbV1fmGGFOVQnRaXvKMVE';
    const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

    // ---------- INTERSECTION OBSERVER: FADE-UP ----------
    const fadeObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    fadeObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px',
        }
    );

    // ---------- LOAD PORTFOLIO DATA FROM ADMIN ----------
    function loadPortfolioData() {
        function getData(key, def) {
            try { var d = localStorage.getItem('portfolio_' + key); return d ? JSON.parse(d) : def; } catch(e) { return def; }
        }

        // Profile
        var profile = getData('profile', null);
        if (profile) {
            if (profile.name) {
                var nameEl = document.querySelector('.hero-name');
                if (nameEl) nameEl.innerHTML = profile.name.replace(/(\S+)$/, '<span class="accent">$1</span>');
            }
            if (profile.title) {
                var titleEl = document.querySelector('.hero-title');
                if (titleEl) titleEl.innerHTML = profile.title.replace(/&/g, '<span class="separator">&</span>');
            }
            if (profile.desc) {
                var descEl = document.querySelector('.hero-description');
                if (descEl) descEl.textContent = profile.desc;
            }
            if (profile.photo) {
                var card = document.querySelector('.hero-image-card');
                if (card) card.innerHTML = '<img src="' + profile.photo + '" alt="' + (profile.name || 'Franklin') + '" style="width:100%;height:100%;object-fit:cover;border-radius:inherit">';
            }
        }

        // About
        var about = getData('about', null);
        if (about) {
            var introEl = document.querySelector('.about-intro');
            var aboutPs = document.querySelectorAll('.about-content p:not(.about-intro)');
            if (about.intro && introEl) introEl.textContent = about.intro;
            if (about.p2 && aboutPs[0]) aboutPs[0].textContent = about.p2;
            if (about.p3 && aboutPs[1]) aboutPs[1].textContent = about.p3;
        }

        // Stats
        var stats = getData('stats', null);
        if (stats) {
            var statCards = document.querySelectorAll('.stat-card');
            stats.forEach(function(s, i) {
                if (statCards[i]) {
                    var num = statCards[i].querySelector('.stat-number');
                    var label = statCards[i].querySelector('.stat-label');
                    if (num) num.setAttribute('data-target', s.target);
                    if (label) label.textContent = s.label;
                }
            });
        }

        // Skills
        var skills = getData('skills', null);
        if (skills) {
            var grid = document.querySelector('.skills-grid');
            if (grid) {
                grid.innerHTML = '';
                skills.forEach(function(s, i) {
                    var card = document.createElement('div');
                    card.className = 'skill-card fade-up';
                    card.innerHTML = '<h3 class="skill-name">' + s.name + '</h3><p class="skill-desc">' + s.desc + '</p>';
                    grid.appendChild(card);
                });
                grid.querySelectorAll('.fade-up').forEach(function(el) { fadeObserver.observe(el); });
            }
        }

        // Projects
        var projects = getData('projects', null);
        if (projects) {
            var pGrid = document.querySelector('.projects-grid');
            if (pGrid) {
                pGrid.innerHTML = '';
                projects.forEach(function(p) {
                    var techHtml = p.tech.split(',').map(function(t) { return '<span>' + t.trim() + '</span>'; }).join('');
                    var card = document.createElement('article');
                    card.className = 'project-card fade-up';
                    var initial = p.name ? p.name.trim().charAt(0).toUpperCase() : '';
                    card.innerHTML = '<div class="project-image"><div class="project-image-placeholder"><span class="project-thumb">' + initial + '</span></div></div><div class="project-info"><h3 class="project-name">' + p.name + '</h3><p class="project-desc">' + p.desc + '</p><div class="project-tech">' + techHtml + '</div></div>';
                    pGrid.appendChild(card);
                });
                pGrid.querySelectorAll('.fade-up').forEach(function(el) { fadeObserver.observe(el); });
            }
        }

        // Services
        var services = getData('services', null);
        if (services) {
            var sGrid = document.querySelector('.services-grid');
            if (sGrid) {
                sGrid.innerHTML = '';
                services.forEach(function(s) {
                    var card = document.createElement('div');
                    card.className = 'service-card fade-up';
                    card.innerHTML = '<div class="service-icon"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg></div><h3 class="service-name">' + s.name + '</h3><p class="service-desc">' + s.desc + '</p>';
                    sGrid.appendChild(card);
                });
                sGrid.querySelectorAll('.fade-up').forEach(function(el) { fadeObserver.observe(el); });
            }
        }

        // Contact
        var contact = getData('contact', null);
        if (contact) {
            var emailLink = document.querySelector('.contact-detail a[href^="mailto:"]');
            if (emailLink && contact.email) { emailLink.href = 'mailto:' + contact.email; emailLink.textContent = contact.email; }
            var phoneLinks = document.querySelectorAll('.contact-detail a[href^="tel:"]');
            function formatPhone(num) {
                var digits = num.replace(/\D/g, '');
                if (digits.startsWith('234') && digits.length >= 13) {
                    return '+234 ' + digits.slice(3, 6) + ' ' + digits.slice(6, 9) + ' ' + digits.slice(9, 13);
                }
                return num;
            }
            if (phoneLinks[0] && contact.phone1) { phoneLinks[0].href = 'tel:' + contact.phone1; phoneLinks[0].textContent = formatPhone(contact.phone1); }
            if (phoneLinks[1] && contact.phone2) { phoneLinks[1].href = 'tel:' + contact.phone2; phoneLinks[1].textContent = formatPhone(contact.phone2); }
            var detailValueByLabel = function(labelText) {
                var labels = document.querySelectorAll('.contact-detail .detail-label');
                for (var i = 0; i < labels.length; i++) {
                    if (labels[i].textContent.trim() === labelText) {
                        return labels[i].parentElement.querySelector('.detail-value');
                    }
                }
                return null;
            };
            if (contact.location) {
                var locValue = detailValueByLabel('Location');
                if (locValue) locValue.textContent = contact.location;
            }
            if (contact.availability) {
                var availValue = detailValueByLabel('Availability');
                if (availValue) availValue.textContent = contact.availability;
            }
            var socialLinks = document.querySelectorAll('.social-links .social-link, .footer-social-links a');
            socialLinks.forEach(function(a) {
                var label = a.getAttribute('aria-label');
                if (label === 'GitHub' && contact.github) a.href = contact.github;
                if (label === 'LinkedIn' && contact.linkedin) a.href = contact.linkedin;
                if (label === 'Twitter' && contact.twitter) a.href = contact.twitter;
                if (label === 'Email' && contact.email) a.href = 'mailto:' + contact.email;
                if (label === 'Phone' && contact.phone1) a.href = 'tel:' + contact.phone1;
                if (label === 'Instagram' && contact.instagram) a.href = contact.instagram;
            });
        }

        // Journey
        var journey = getData('journey', null);
        if (journey) {
            var timeline = document.querySelector('.timeline');
            if (timeline) {
                var line = timeline.querySelector('.timeline-line');
                timeline.innerHTML = '';
                if (line) timeline.appendChild(line);
                journey.forEach(function(item) {
                    var el = document.createElement('div');
                    el.className = 'timeline-item fade-up';
                    el.innerHTML = '<div class="timeline-dot"></div><div class="timeline-content"><span class="timeline-date">' + item.date + '</span><h3 class="timeline-title">' + item.title + '</h3><p class="timeline-desc">' + item.desc + '</p></div>';
                    timeline.appendChild(el);
                });
                timeline.querySelectorAll('.fade-up').forEach(function(el) { fadeObserver.observe(el); });
            }
        }

        // Testimonials
        var testimonials = getData('testimonials', null);
        if (testimonials) {
            var tGrid = document.querySelector('.testimonials-grid');
            if (tGrid) {
                tGrid.innerHTML = '';
                testimonials.forEach(function(t) {
                    var card = document.createElement('div');
                    card.className = 'testimonial-card fade-up';
                    card.innerHTML = '<p class="testimonial-text">' + t.text + '</p><div class="testimonial-author"><div><h4 class="author-name">' + t.name + '</h4><p class="author-role">' + t.role + '</p></div></div>';
                    tGrid.appendChild(card);
                });
                tGrid.querySelectorAll('.fade-up').forEach(function(el) { fadeObserver.observe(el); });
            }
        }
    }

    loadPortfolioData();

    fadeElements.forEach(function (el) {
        fadeObserver.observe(el);
    });

    // ---------- THEME TOGGLE ----------
    function getPreferredTheme() {
        const stored = localStorage.getItem('theme');
        if (stored) return stored;
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }

    function setTheme(theme) {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }

    setTheme(getPreferredTheme());

    themeToggle.addEventListener('click', function () {
        const current = html.getAttribute('data-theme');
        setTheme(current === 'dark' ? 'light' : 'dark');
    });

    // ---------- STICKY NAVBAR ----------
    const scrollThreshold = 50;

    function handleScroll() {
        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // ---------- HAMBURGER MENU ----------
    let overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    function toggleMenu() {
        const isActive = navMenu.classList.contains('active');
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        overlay.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', !isActive);
        document.body.style.overflow = isActive ? '' : 'hidden';
    }

    function closeMenu() {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        overlay.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', closeMenu);

    navLinks.forEach(function (link) {
        link.addEventListener('click', closeMenu);
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeMenu();
    });

    // ---------- ACTIVE NAV LINK ON SCROLL ----------
    const sections = document.querySelectorAll('section[id]');

    function updateActiveLink() {
        const scrollY = window.scrollY + 120;

        sections.forEach(function (section) {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollY >= top && scrollY < top + height) {
                navLinks.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink, { passive: true });

    // ---------- ANIMATED STAT COUNTERS ----------
    let statsAnimated = false;

    function animateStats() {
        if (statsAnimated) return;

        statNumbers.forEach(function (stat) {
            const target = parseInt(stat.getAttribute('data-target'), 10);
            const duration = 2000;
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.round(eased * target);
                stat.textContent = current;

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            }

            requestAnimationFrame(updateCounter);
        });

        statsAnimated = true;
    }

    const statsSection = document.getElementById('about');
    if (statsSection) {
        const statsObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        animateStats();
                        statsObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.3 }
        );
        statsObserver.observe(statsSection);
    }

    // ---------- CONTACT FORM ----------
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');

            if (!name || !email || !subject || !message) {
                return;
            }

            const btn = contactForm.querySelector('button[type="submit"]');
            const originalHTML = btn.innerHTML;

            btn.innerHTML = '<span>Sending...</span>';
            btn.disabled = true;

            supabase
                .from('messages')
                .insert([{ name: name, email: email, subject: subject, message: message }])
                .then(function (result) {
                    if (result.error) {
                        btn.innerHTML = '<span>Failed - try again</span>';
                        setTimeout(function () {
                            btn.innerHTML = originalHTML;
                            btn.disabled = false;
                        }, 2500);
                        return;
                    }
                    btn.innerHTML = '<span>Message sent!</span>';
                    setTimeout(function () {
                        btn.innerHTML = originalHTML;
                        btn.disabled = false;
                    }, 2500);
                    contactForm.reset();
                })
                .catch(function () {
                    btn.innerHTML = '<span>Failed - try again</span>';
                    setTimeout(function () {
                        btn.innerHTML = originalHTML;
                        btn.disabled = false;
                    }, 2500);
                });
        });
    }

    // ---------- SMOOTH SCROLL FOR SAFARI ----------
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                const offset = 80;
                const top = targetEl.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
        });
    });

})();
