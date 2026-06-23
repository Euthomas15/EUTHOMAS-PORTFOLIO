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
