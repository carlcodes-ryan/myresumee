// =====================
// NAVBAR: scroll effect & mobile toggle
// =====================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNav();
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close mobile menu when a nav link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// =====================
// ACTIVE NAV LINK on scroll
// =====================
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.scrollY + 120;
  sections.forEach(sec => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}

// =====================
// INTERSECTION OBSERVER: reveal on scroll
// =====================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.section-header, .about-grid, .timeline-item, .project-card, .edu-card, .contact-grid, .skills-wrapper, .stat-card').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

document.querySelectorAll('.about-image-wrap').forEach(el => {
  el.classList.add('reveal-left');
  revealObserver.observe(el);
});

// =====================
// SKILL BAR ANIMATION on scroll
// =====================
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.classList.add('animated');
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const skillsSection = document.getElementById('skills');
if (skillsSection) skillObserver.observe(skillsSection);

// =====================
// STAGGERED CARD ANIMATION
// =====================
function staggerReveal(selector, delay = 120) {
  const els = document.querySelectorAll(selector);
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = [...els].indexOf(entry.target);
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, idx * delay);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  els.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    obs.observe(el);
  });
}

staggerReveal('.project-card');
staggerReveal('.edu-card');
staggerReveal('.timeline-item');

// =====================
// WHATSAPP BUTTON PULSE
// =====================
// The WhatsApp button uses CSS animations (waPulse, floatIn) defined in style.css.
// No additional JS needed — the wa.me link handles the chat directly.

// =====================
// SMOOTH PARALLAX on hero (subtle)
// =====================
const heroBg = document.querySelector('.hero-bg-img');
if (heroBg) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
  }, { passive: true });
}

// =====================
// TYPED TEXT EFFECT on hero subtitle
// =====================
const titles = [
  'Python Developer',
  'Data Analyst',
  'Software Developer',
  'Security Enthusiast',
  'Backend Developer'
];

const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
  let titleIdx = 0;
  let charIdx = 0;
  let deleting = false;
  let typingSpeed = 80;

  function typeWriter() {
    const current = titles[titleIdx];
    if (deleting) {
      heroSubtitle.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 40;
    } else {
      heroSubtitle.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 80;
    }

    if (!deleting && charIdx === current.length) {
      typingSpeed = 1800;
      deleting = true;
    } else if (deleting && charIdx === 0) {
      deleting = false;
      titleIdx = (titleIdx + 1) % titles.length;
      typingSpeed = 300;
    }

    setTimeout(typeWriter, typingSpeed);
  }

  // Start after a short delay
  setTimeout(typeWriter, 1200);
}

// =====================
// CURSOR GLOW EFFECT (desktop only)
// =====================
if (window.matchMedia('(pointer: fine)').matches) {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed; pointer-events: none; z-index: 9999;
    width: 300px; height: 300px; border-radius: 50%;
    background: radial-gradient(circle, rgba(2,245,161,0.07) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease;
    top: 0; left: 0;
  `;
  document.body.appendChild(glow);

  window.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  }, { passive: true });
}

// Init on load
document.addEventListener('DOMContentLoaded', () => {
  updateActiveNav();
});
