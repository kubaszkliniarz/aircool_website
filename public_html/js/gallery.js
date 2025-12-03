// Lightweight gallery with lazy loading & lightbox (< 2kb minified)
(function() {
  'use strict';

  // Lazy loading polyfill for older browsers
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    }, { rootMargin: '50px' });

    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
      imageObserver.observe(img);
    });
  }

  // Vanilla JS Lightbox
  function setupLightbox() {
    document.querySelectorAll('.gallery-item').forEach(link => {
      link.addEventListener('click', openLightbox);
      link.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox.call(link);
        }
      });
    });
  }

  function openLightbox(e) {
    e.preventDefault();
    const href = this.getAttribute('href');
    const title = this.dataset.title || '';
    const img = this.querySelector('img');
    const alt = img.alt;

    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Powiększony obraz');

    overlay.innerHTML = `
      <div class="lightbox-content" tabindex="0">
        <img src="${escapeHtml(href)}" alt="${escapeHtml(alt)}">
        ${title ? `<p>${escapeHtml(title)}</p>` : ''}
        <button class="lightbox-close" aria-label="Zamknij (Escape)">×</button>
      </div>
    `;

    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    const closeBtn = overlay.querySelector('.lightbox-close');
    const content = overlay.querySelector('.lightbox-content');

    closeBtn.focus();

    function close() {
      overlay.remove();
      document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', e => {
      if (e.target === overlay) close();
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        close();
        document.removeEventListener('keydown', arguments.callee);
      }
    });
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupLightbox);
  } else {
    setupLightbox();
  }
})();
