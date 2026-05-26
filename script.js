/* ============================================
   RONDE ET JOLIE — Interactions
   ============================================ */

(function () {
    'use strict';

    /* --- Burger menu mobile + drawer --- */
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav');
    let overlay = document.querySelector('.nav-overlay');

    if (burger && nav) {
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'nav-overlay';
            overlay.setAttribute('aria-hidden', 'true');
            document.body.appendChild(overlay);
        }

        const closeMenu = () => {
            nav.classList.remove('is-open');
            burger.classList.remove('is-active');
            burger.setAttribute('aria-expanded', 'false');
            overlay.classList.remove('is-visible');
            document.body.classList.remove('no-scroll');
        };
        const openMenu = () => {
            nav.classList.add('is-open');
            burger.classList.add('is-active');
            burger.setAttribute('aria-expanded', 'true');
            overlay.classList.add('is-visible');
            document.body.classList.add('no-scroll');
        };

        burger.addEventListener('click', () => {
            nav.classList.contains('is-open') ? closeMenu() : openMenu();
        });
        overlay.addEventListener('click', closeMenu);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && nav.classList.contains('is-open')) closeMenu();
        });
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (nav.classList.contains('is-open')) closeMenu();
            });
        });
    }

    /* --- Parallax léger sur la composition visuelle au mouvement souris --- */
    const visual = document.querySelector('.hero-visual');

    if (visual && window.matchMedia('(min-width: 1100px)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const photos = visual.querySelectorAll('.photo, .visual-logo');

        let rafId = null;
        let targetX = 0, targetY = 0;
        let currentX = 0, currentY = 0;

        visual.addEventListener('mousemove', (e) => {
            const rect = visual.getBoundingClientRect();
            targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
            targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

            if (!rafId) animate();
        });

        visual.addEventListener('mouseleave', () => {
            targetX = 0;
            targetY = 0;
        });

        function animate() {
            currentX += (targetX - currentX) * 0.08;
            currentY += (targetY - currentY) * 0.08;

            photos.forEach((el, i) => {
                const depth = [4, 8, 12, 6][i] || 5;
                const baseTransform = el.dataset.baseTransform || '';
                el.style.transform = `${baseTransform} translate(${currentX * depth}px, ${currentY * depth}px)`;
            });

            if (Math.abs(targetX - currentX) > 0.001 || Math.abs(targetY - currentY) > 0.001) {
                rafId = requestAnimationFrame(animate);
            } else {
                rafId = null;
            }
        }
    }

    /* --- Smooth scroll pour les ancres internes --- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* --- Effet hover boutons : ripple doux --- */
    document.querySelectorAll('.btn-primary').forEach(btn => {
        btn.addEventListener('mouseenter', function () {
            this.style.setProperty('--shimmer', '1');
        });
    });

})();
