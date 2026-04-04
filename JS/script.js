/* ============================================
   PORTFOLIO — SCRIPT.JS
   Navbar scroll, smooth scroll, reveal animasi,
   dark/light mode toggle, mobile menu
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ----- Elemen DOM ----- */
    const navbar      = document.getElementById('navbar');
    const navLinks    = document.querySelectorAll('.nav-link');
    const hamburger   = document.getElementById('hamburger');
    const navMenu     = document.getElementById('navMenu');
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon   = document.getElementById('themeIcon');
    const revealEls   = document.querySelectorAll('.reveal');
    const sections    = document.querySelectorAll('.section, .hero');

    /* ============================
       1. THEME TOGGLE (Dark/Light)
       ============================ */

    // Muat tema tersimpan dari localStorage
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }

    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('portfolio-theme', next);
        updateThemeIcon(next);
    });

    function updateThemeIcon(theme) {
        // Dark mode -> tampilkan ikon matahari (untuk switch ke light)
        // Light mode -> tampilkan ikon bulan (untuk switch ke dark)
        themeIcon.className = theme === 'dark'
            ? 'fa-solid fa-sun'
            : 'fa-solid fa-moon';
    }

    /* ============================
       2. NAVBAR SCROLL EFFECT
       ============================ */

    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    // Jalankan sekali saat load (jika halaman sudah di-scroll)
    handleNavbarScroll();

    /* ============================
       3. ACTIVE NAV LINK SAAT SCROLL
       ============================ */

    function updateActiveLink() {
        let currentSection = 'home';
        const scrollPos = window.scrollY + 150;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink, { passive: true });
    updateActiveLink();

    /* ============================
       4. SMOOTH SCROLL (klik menu)
       ============================ */

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetEl = document.querySelector(targetId);

            if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth' });
            }

            // Tutup menu mobile jika terbuka
            closeMobileMenu();
        });
    });

    // Smooth scroll juga untuk tombol CTA di hero
    document.querySelectorAll('.hero-cta a, .contact-email').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetEl = document.querySelector(href);
                if (targetEl) {
                    targetEl.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    /* ============================
       5. MOBILE MENU (Hamburger)
       ============================ */

    // Buat overlay element
    const overlay = document.createElement('div');
    overlay.classList.add('mobile-overlay');
    document.body.appendChild(overlay);

    function openMobileMenu() {
        hamburger.classList.add('active');
        navMenu.classList.add('mobile-open');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('mobile-open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', () => {
        if (navMenu.classList.contains('mobile-open')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    // Klik overlay untuk menutup menu
    overlay.addEventListener('click', closeMobileMenu);

    // Tutup menu dengan tombol Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMobileMenu();
    });

    /* ============================
       6. SCROLL REVEAL (Fade In)
       Menggunakan IntersectionObserver
       ============================ */

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Hentikan observasi setelah ter-reveal (hemat performa)
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    revealEls.forEach(el => {
        revealObserver.observe(el);
    });

    /* ============================
       7. STAGGER ANIMATION (delay bertingkat)
       Untuk elemen dalam satu grup
       ============================ */

    // Beri delay bertingkat pada project cards
    const projectCards = document.querySelectorAll('.project-card.reveal');
    projectCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.12}s`;
    });

    // Beri delay pada skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        tag.style.transitionDelay = `${index * 0.05}s`;
    });

});
