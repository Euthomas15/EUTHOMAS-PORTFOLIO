/* ============================================================
   EUTHOMAS — FRONTEND DEVELOPER PORTFOLIO
   script.js
   ============================================================ */

/* --- Mobile menu toggle --- */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});


document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// // Mouse Move Event 
// Cursor-follow glow effect to simulate dynamic lighting
// and enhance depth + interactivity across the UI
document.addEventListener("mousemove", e => {
  const glow = document.querySelector(".cursor-glow");
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

/* --- Scroll reveal (fade-up) + skill bar trigger --- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
      entry.target.classList.toggle('visible', entry.isIntersecting);
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-up').forEach(el => revealObserver.observe(el));

const skillsSection = document.getElementById('skills');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    document.querySelectorAll('.skill-row').forEach(row => { row.classList.toggle('animate', entry.isIntersecting);
  });
})
},  { threshold: 0.25 });

if (skillsSection) skillObserver.observe(skillsSection);

/* --- Contact form submission (Formspree) --- */
const form = document.getElementById('contact-form');
const success = document.getElementById('form-success');
const submitBtn = document.getElementById('submit-btn');

if (form) {
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;

    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' }
      });

      if (response.ok) {
        form.style.display = 'none';
        success.style.display = 'block';
      } else {
        submitBtn.textContent = 'Something went wrong — try again';
        submitBtn.disabled = false;
      }
    } catch (err) {
      submitBtn.textContent = 'Network error — try again';
      submitBtn.disabled = false;
    }
  });
}

/* ============================================================
   PAGE LOADER
   ============================================================ */
const pageLoader = document.getElementById('pageLoader');

window.addEventListener('load', () => {
  setTimeout(() => {
    pageLoader.classList.add('hidden');
  }, 1500);
});

/* ============================================================
   DARK / LIGHT MODE TOGGLE
   ============================================================ */
const themeToggle = document.getElementById('themeToggle');

// Remember user preference
if (localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light-mode');
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  const isLight = document.body.classList.contains('light-mode');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

/* ============================================================
   FALLING RAIN EFFECT (Canvas)
   ============================================================ */
const canvas = document.getElementById('rainCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initDrops();
});

const COLS = Math.floor(window.innerWidth / 20);
const drops = [];

function initDrops() {
  const cols = Math.floor(canvas.width / 20);
  drops.length = 0;
  for (let i = 0; i < cols; i++) {
    drops[i] = Math.random() * -canvas.height;
  }
}

initDrops();

// Characters to fall — mix of code symbols and numbers
const chars = '01{}[]<>/=+*#@!;:'.split('');

function drawRain() {
  // Fade trail effect
  ctx.fillStyle = 'rgba(11, 14, 20, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = '14px JetBrains Mono, monospace';

  for (let i = 0; i < drops.length; i++) {
    const char = chars[Math.floor(Math.random() * chars.length)];
    const x = i * 20;
    const y = drops[i];

    // Alternate blue and orange for top character
    if (Math.random() > 0.5) {
      ctx.fillStyle = '#5B8DEF'; // blue
    } else {
      ctx.fillStyle = '#E8602C'; // orange
    }

    ctx.fillText(char, x, y);

    // Reset drop when it reaches bottom
    if (y > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i] += 20;
  }
}

setInterval(drawRain, 60);
