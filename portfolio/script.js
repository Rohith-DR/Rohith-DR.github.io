/* ==========================================
   ROHITH DR — Portfolio Interactivity
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initNavigation();
  initScrollReveal();
  initProjectFilters();
  initTypewriter();
  initStatCounters();
  initParticles();
});

/* ---------- Theme Toggle ---------- */
function initThemeToggle() {
  const toggle = document.getElementById('theme-toggle');
  const icon = document.getElementById('theme-icon');
  const html = document.documentElement;

  // Load saved theme
  const savedTheme = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme, icon);

  toggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon(next, icon);
  });
}

function updateThemeIcon(theme, icon) {
  icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
}

/* ---------- Navigation ---------- */
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('nav-hamburger');
  const menu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section, .hero');

  // Scroll effect on navbar
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    updateActiveNav(sections, navLinks);
  });

  // Hamburger toggle
  hamburger.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    hamburger.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

function updateActiveNav(sections, navLinks) {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}

/* ---------- Scroll Reveal ---------- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger the animations slightly
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 80);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* ---------- Project Filters ---------- */
function initProjectFilters() {
  const btns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update active button
      btns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      // Filter cards with animation
      cards.forEach(card => {
        const category = card.dataset.category;
        const show = filter === 'all' || category === filter;

        if (show) {
          card.classList.remove('hidden');
          card.classList.remove('fade-out');
          requestAnimationFrame(() => {
            card.classList.add('fade-in');
          });
        } else {
          card.classList.add('fade-out');
          setTimeout(() => {
            card.classList.add('hidden');
            card.classList.remove('fade-out');
          }, 300);
        }
      });
    });
  });
}

/* ---------- Typewriter Effect ---------- */
function initTypewriter() {
  const el = document.getElementById('typewriter');
  const words = ['Embedded Systems', 'VLSI Design', 'IoT Solutions', 'PCB Design', 'RISC-V Architecture'];
  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;
  let pauseEnd = 0;

  function type() {
    const word = words[wordIndex];
    const now = Date.now();

    if (now < pauseEnd) {
      requestAnimationFrame(type);
      return;
    }

    if (deleting) {
      charIndex--;
      el.textContent = word.substring(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        pauseEnd = now + 300;
      }
    } else {
      charIndex++;
      el.textContent = word.substring(0, charIndex);
      if (charIndex === word.length) {
        deleting = true;
        pauseEnd = now + 2000;
      }
    }

    const speed = deleting ? 40 : 80;
    setTimeout(() => requestAnimationFrame(type), speed);
  }

  type();
}

/* ---------- Stat Counter Animation ---------- */
function initStatCounters() {
  const stats = document.querySelectorAll('.stat-number');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(stat => observer.observe(stat));
}

function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const isDecimal = target % 1 !== 0;
  const duration = 1500;
  const startTime = Date.now();

  function update() {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = eased * target;

    if (isDecimal) {
      el.textContent = current.toFixed(2);
    } else {
      el.textContent = Math.round(current);
    }

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = isDecimal ? target.toFixed(2) : target;
    }
  }

  update();
}

/* ---------- Floating Particles ---------- */
function initParticles() {
  const container = document.getElementById('hero-particles');
  if (!container) return;

  const count = 30;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    const size = Math.random() * 4 + 1;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const delay = Math.random() * 5;
    const duration = Math.random() * 8 + 6;

    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: ${Math.random() > 0.5 ? 'var(--accent-1)' : 'var(--accent-2)'};
      border-radius: 50%;
      left: ${x}%;
      top: ${y}%;
      opacity: ${Math.random() * 0.4 + 0.1};
      animation: float ${duration}s ease-in-out ${delay}s infinite alternate;
      pointer-events: none;
    `;

    container.appendChild(particle);
  }

  // Add floating animation (inject once)
  if (!document.getElementById('particle-keyframes')) {
    const style = document.createElement('style');
    style.id = 'particle-keyframes';
    style.textContent = `
      @keyframes float {
        0% { transform: translateY(0) translateX(0); }
        100% { transform: translateY(-40px) translateX(20px); }
      }
    `;
    document.head.appendChild(style);
  }
}
