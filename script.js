/* ============================================
   RONDE ET JOLIE — Interactions
   ============================================ */

(function () {
    'use strict';

    /* --- Burger menu mobile --- */
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            const isOpen = nav.classList.toggle('is-open');
            burger.setAttribute('aria-expanded', isOpen);
            burger.classList.toggle('is-active', isOpen);
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
