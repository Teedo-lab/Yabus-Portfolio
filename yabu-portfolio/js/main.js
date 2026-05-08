/* ============================================================
   YABU GENEMO — MAIN JS
   Scroll animations, parallax, hover effects, cursor
   ============================================================ */

'use strict';

// ─── Custom Cursor ────────────────────────────────────────────

const setCursorPos = (e) => {
  document.documentElement.style.setProperty('--cx', e.clientX + 'px');
  document.documentElement.style.setProperty('--cy', e.clientY + 'px');
};

document.addEventListener('mousemove', setCursorPos);

// Scale cursor on hoverable elements
const hoverables = 'a, button, .bento-card, .nav-link, .hero-cta, .view-all-btn';

document.querySelectorAll(hoverables).forEach(el => {
  el.addEventListener('mouseenter', () => {
    document.body.style.setProperty('--cursor-scale', '1.8');
  });
  el.addEventListener('mouseleave', () => {
    document.body.style.setProperty('--cursor-scale', '1');
  });
});


// ─── Nav Scroll Behaviour ─────────────────────────────────────

const nav = document.getElementById('mainNav');

const updateNav = () => {
  if (window.scrollY > 40) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
};

window.addEventListener('scroll', updateNav, { passive: true });


// ─── Parallax on Scroll ───────────────────────────────────────

const parallaxEls = document.querySelectorAll('[data-parallax]');

const handleParallax = () => {
  const scrollY = window.scrollY;

  parallaxEls.forEach(el => {
    const factor = parseFloat(el.dataset.parallax) || 0.2;
    const rect = el.getBoundingClientRect();
    const centerY = rect.top + rect.height / 2;
    const viewCenter = window.innerHeight / 2;
    const diff = centerY - viewCenter;

    el.style.transform = `translateY(${diff * factor * -1}px)`;
  });
};

window.addEventListener('scroll', handleParallax, { passive: true });


// ─── Intersection Observer — Reveal on Scroll ─────────────────

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger sibling reveals
      const parent = entry.target.parentElement;
      const siblings = [...parent.querySelectorAll('.reveal-up, .reveal-card, .about-label, .about-heading, .about-body, .about-stats')];
      const idx = siblings.indexOf(entry.target);

      setTimeout(() => {
        entry.target.classList.add('visible');
      }, idx * 60);

      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

// Observe all reveal targets — exclude hero elements that animate via CSS keyframes
const revealTargets = [...document.querySelectorAll(
  '.reveal-up, .reveal-card, .about-label, .about-heading, .about-body, .about-stats'
)].filter(el => !el.closest('.hero'));
revealTargets.forEach(el => revealObserver.observe(el));


// ─── Bento Card Tilt Effect ───────────────────────────────────

const bentoCards = document.querySelectorAll('.bento-card');

bentoCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;

    card.style.transform = `
      translateY(-6px)
      scale(1.02)
      rotateX(${y * -6}deg)
      rotateY(${x * 6}deg)
    `;
    card.style.transition = 'transform 0.1s ease, box-shadow 0.4s ease';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease';
  });
});


// ─── Smooth Scroll for Nav Links ─────────────────────────────

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href === '#') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});


// ─── Marquee hover pause ─────────────────────────────────────

const marqueeTrack = document.querySelector('.marquee-track');
if (marqueeTrack) {
  marqueeTrack.addEventListener('mouseenter', () => {
    marqueeTrack.style.animationPlayState = 'paused';
  });
  marqueeTrack.addEventListener('mouseleave', () => {
    marqueeTrack.style.animationPlayState = 'running';
  });
}


// ─── Hero CTA Arrow micro-animation ─────────────────────────

const heroCta = document.querySelector('.hero-cta');
if (heroCta) {
  heroCta.addEventListener('mouseenter', () => {
    const arrow = heroCta.querySelector('span');
    if (arrow) {
      arrow.style.transform = 'translate(4px, -4px)';
      arrow.style.transition = 'transform 0.3s ease';
    }
  });
  heroCta.addEventListener('mouseleave', () => {
    const arrow = heroCta.querySelector('span');
    if (arrow) {
      arrow.style.transform = 'translate(0, 0)';
    }
  });
}


// ─── Section background swap on scroll (subtle) ──────────────

const sections = document.querySelectorAll('section');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
    }
  });
}, { threshold: 0.05 });

sections.forEach(s => sectionObserver.observe(s));


// ─── Scroll-triggered text counter for stats ─────────────────

const countElements = document.querySelectorAll('.stat-num');

const animateCount = (el) => {
  const target = parseInt(el.textContent.replace(/\D/g, ''), 10);
  const suffix = el.textContent.replace(/[0-9]/g, '');
  let current = 0;
  const duration = 1200;
  const step = duration / target;

  const interval = setInterval(() => {
    current += Math.ceil(target / (duration / 16));
    if (current >= target) {
      current = target;
      clearInterval(interval);
    }
    el.textContent = current + suffix;
  }, 16);
};

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      countElements.forEach(el => animateCount(el));
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) statsObserver.observe(statsSection);


// ─── Page scroll progress indicator ─────────────────────────

const progressBar = document.createElement('div');
progressBar.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: var(--red, #c0392b);
  z-index: 10001;
  transition: width 0.1s ease;
  pointer-events: none;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  progressBar.style.width = Math.min(progress, 100) + '%';
}, { passive: true });


// ─── Enter overlay cleanup after animation ────────────────────

const enterOverlay = document.getElementById('enterOverlay');
if (enterOverlay) {
  // Block clicks as soon as the slide-up animation finishes (2.2s delay + 0.7s duration)
  setTimeout(() => {
    enterOverlay.style.pointerEvents = 'none';
  }, 2900);
  setTimeout(() => {
    enterOverlay.style.display = 'none';
  }, 3100);
}


// ─── Dynamic copyright year ───────────────────────────────────

const copyrightEl = document.getElementById('footerCopy');
if (copyrightEl) {
  copyrightEl.textContent = `© ${new Date().getFullYear()} YABU GENEMO`;
}


// ─── Keyboard accessibility ───────────────────────────────────

document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-nav');
  }
});

document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-nav');
});
