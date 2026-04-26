(function () {
  'use strict';

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav-list');
  if (toggle && navList) {
    toggle.addEventListener('click', () => {
      const open = navList.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    navList.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        navList.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('in'));
  }

  // Lightbox for gallery
  const gallery = document.querySelector('.gallery');
  if (gallery) {
    const lb = document.createElement('div');
    lb.className = 'lb';
    lb.innerHTML = '<button class="lb-close" aria-label="Zamknij">&times;</button><img alt="">';
    document.body.appendChild(lb);
    const lbImg = lb.querySelector('img');
    const close = () => lb.classList.remove('open');
    lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
    lb.querySelector('.lb-close').addEventListener('click', close);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
    gallery.addEventListener('click', (e) => {
      const a = e.target.closest('a');
      if (!a) return;
      e.preventDefault();
      lbImg.src = a.getAttribute('href');
      lbImg.alt = a.querySelector('img')?.alt || '';
      lb.classList.add('open');
    });
  }

  // Year in footer
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();
})();
