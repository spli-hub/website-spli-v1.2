// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  // Close on link click
  mobileMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });
}

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.4)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, idx) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('revealed');
      }, idx * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('[data-reveal]').forEach(el => {
  revealObserver.observe(el);
});

// ===== STAGGERED CARD REVEAL =====
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const cards = entry.target.querySelectorAll('.service-card, .stat-card, .sector-card, .service-main-card');
      cards.forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        setTimeout(() => {
          card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, i * 120);
      });
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.services-grid, .about-stats, .sector-grid, .service-main-grid').forEach(el => {
  cardObserver.observe(el);
});

// ===== COUNTER ANIMATION =====
function animateCounter(el) {
  const text = el.textContent;
  const match = text.match(/(\d+)/);
  if (!match) return;
  const end = parseInt(match[1]);
  const suffix = text.replace(/[\d]/g, '');
  let start = 0;
  const duration = 1500;
  const step = Math.ceil(end / (duration / 16));
  const timer = setInterval(() => {
    start = Math.min(start + step, end);
    el.textContent = start + suffix.trim();
    if (start >= end) clearInterval(timer);
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-num').forEach(animateCounter);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) counterObserver.observe(statsSection);

// ===== SMOOTH ACTIVE NAV =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links .nav-link:not(.nav-portal)');

if (sections.length && navLinks.length) {
  const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.5 });
  sections.forEach(s => activeObserver.observe(s));
}
