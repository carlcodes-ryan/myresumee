// ==========================================================================
// MARKRYAN KIMATHI — ARCHITECTURAL MOTION & INTERACTIVE LOGIC
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  // 1. Frank Adwar Style Vertical Progress Tracking Line
  const scrollLineFill = document.getElementById('scroll-line-fill');
  function updateScrollProgress() {
    if (!scrollLineFill) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollLineFill.style.height = `${Math.min(100, Math.max(0, progress))}%`;
  }
  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();

  // 2. Mobile Navigation Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      mobileToggle.textContent = isOpen ? '✕' : '☰';
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    navLinks.querySelectorAll('.nav-item-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileToggle.textContent = '☰';
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. Active Section Scrollspy
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-item-link');

  function updateActiveSection() {
    const scrollPos = window.scrollY + 200;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${id}`) {
            item.classList.add('active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', updateActiveSection, { passive: true });
  updateActiveSection();

  // 4. Staggered Scroll Reveal (Frank Adwar Style Motion)
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 5. Interactive View Toggle (EAPH POS: Client UI vs System Architecture)
  const btnUiView = document.getElementById('btn-ui-view');
  const btnArchView = document.getElementById('btn-arch-view');
  const panelUiView = document.getElementById('panel-ui-view');
  const panelArchView = document.getElementById('panel-arch-view');

  if (btnUiView && btnArchView && panelUiView && panelArchView) {
    btnUiView.addEventListener('click', () => {
      btnUiView.classList.add('active');
      btnUiView.setAttribute('aria-selected', 'true');
      btnArchView.classList.remove('active');
      btnArchView.setAttribute('aria-selected', 'false');
      panelUiView.classList.add('active');
      panelArchView.classList.remove('active');
    });

    btnArchView.addEventListener('click', () => {
      btnArchView.classList.add('active');
      btnArchView.setAttribute('aria-selected', 'true');
      btnUiView.classList.remove('active');
      btnUiView.setAttribute('aria-selected', 'false');
      panelArchView.classList.add('active');
      panelUiView.classList.remove('active');
    });
  }

  // 6. Interactive Radio Label Styling on Intake Form
  const radioLabels = document.querySelectorAll('.radio-custom-label');
  radioLabels.forEach(label => {
    const radio = label.querySelector('input[type="radio"]');
    if (radio) {
      radio.addEventListener('change', () => {
        radioLabels.forEach(l => l.classList.remove('selected'));
        if (radio.checked) {
          label.classList.add('selected');
        }
      });
    }
  });

  // 7. Interactive Intake Form Submission Handler
  const inquiryForm = document.getElementById('inquiry-form');
  const formFeedback = document.getElementById('form-feedback');

  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('client-name').value.trim();
      const context = document.getElementById('project-context').value.trim();
      const objectiveRadio = inquiryForm.querySelector('input[name="objective"]:checked');
      const objective = objectiveRadio ? objectiveRadio.value : 'General Architecture';

      if (!name || !context) {
        if (formFeedback) {
          formFeedback.style.display = 'block';
          formFeedback.style.background = 'rgba(239, 68, 68, 0.15)';
          formFeedback.style.border = '1px solid #EF4444';
          formFeedback.style.color = '#FCA5A5';
          formFeedback.textContent = 'Please fill out your name, organisation, and project goals.';
        }
        return;
      }

      // Pre-compose WhatsApp message
      const text = encodeURIComponent(
        `Greetings MarkRyan,\n\nI am submitting an inquiry for Ryan's Creative:\n• Name / Org: ${name}\n• Primary Objective: ${objective}\n• Context & Goals: ${context}`
      );
      const whatsappUrl = `https://wa.me/254798707487?text=${text}`;

      if (formFeedback) {
        formFeedback.style.display = 'block';
        formFeedback.style.background = 'rgba(16, 185, 129, 0.15)';
        formFeedback.style.border = '1px solid #10B981';
        formFeedback.style.color = '#6EE7B7';
        formFeedback.innerHTML = `
          <strong>Inquiry logged successfully.</strong><br>
          <a href="${whatsappUrl}" target="_blank" rel="noopener" style="color: #FFFFFF; text-decoration: underline; display: inline-block; margin-top: 0.5rem; font-weight: 600;">
            Click here to transmit directly via WhatsApp ➔
          </a>
        `;
      }

      // Open WhatsApp dispatch in new tab after 600ms
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, 700);
    });
  }

  // 8. Legal Modals (Webcheck Compliance)
  const openPrivacyBtn = document.getElementById('open-privacy-btn');
  const closePrivacyBtn = document.getElementById('close-privacy-btn');
  const modalPrivacy = document.getElementById('modal-privacy');

  const openTermsBtn = document.getElementById('open-terms-btn');
  const closeTermsBtn = document.getElementById('close-terms-btn');
  const modalTerms = document.getElementById('modal-terms');

  function setupModal(openBtn, closeBtn, modal) {
    if (openBtn && modal) {
      openBtn.addEventListener('click', () => modal.classList.add('active'));
    }
    if (closeBtn && modal) {
      closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    }
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
      });
    }
  }

  setupModal(openPrivacyBtn, closePrivacyBtn, modalPrivacy);
  setupModal(openTermsBtn, closeTermsBtn, modalTerms);

  // 9. Cookie Consent Banner (Webcheck Compliance)
  const cookieBanner = document.getElementById('cookie-banner');
  const cookieAcceptBtn = document.getElementById('cookie-accept-btn');
  const cookieDeclineBtn = document.getElementById('cookie-decline-btn');

  if (cookieBanner) {
    if (localStorage.getItem('cookie_consent_decided')) {
      cookieBanner.style.display = 'none';
    }
    if (cookieAcceptBtn) {
      cookieAcceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookie_consent_decided', 'accepted');
        cookieBanner.style.display = 'none';
      });
    }
    if (cookieDeclineBtn) {
      cookieDeclineBtn.addEventListener('click', () => {
        localStorage.setItem('cookie_consent_decided', 'declined');
        cookieBanner.style.display = 'none';
      });
    }
  }

});
