// ============ NAV scroll state ============
const nav = document.getElementById('nav');
const heroPhoto = document.querySelector('.hero__photo');
const onScroll = () => {
  const y = window.scrollY;
  if (nav) {
    if (y > 20) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  }
  // Shrink hero photo as user scrolls (1.0 -> 0.5 over 800px)
  if (heroPhoto) {
    const t = Math.min(y / 800, 1);
    const scale = 1 - t * 0.5;
    heroPhoto.style.transform = `translateY(-50%) scale(${scale})`;
  }
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ============ Mobile burger ============
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav__links');
if (burger && navLinks) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('is-open');
    navLinks.classList.toggle('is-open');
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      burger.classList.remove('is-open');
      navLinks.classList.remove('is-open');
    });
  });
}

// ============ Reveal on scroll ============
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal, .reveal-photo').forEach(el => revealObserver.observe(el));

// ============ Animated stat counters ============
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const duration = 1800;
      const start = performance.now();
      const animate = (now) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.floor(eased * target);
        if (t < 1) requestAnimationFrame(animate);
        else el.textContent = target;
      };
      requestAnimationFrame(animate);
      statObserver.unobserve(el);
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll('.stat__num').forEach(el => statObserver.observe(el));

// ============ Drag-to-scroll for project track ============
const track = document.getElementById('track');
if (track) {
  let isDown = false, startX, scrollLeft;
  track.addEventListener('mousedown', (e) => {
    isDown = true;
    track.classList.add('is-dragging');
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });
  ['mouseleave','mouseup'].forEach(ev => track.addEventListener(ev, () => {
    isDown = false; track.classList.remove('is-dragging');
  }));
  track.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    track.scrollLeft = scrollLeft - (x - startX) * 1.5;
  });
}

// ============ Project filter ============
const filterBtns = document.querySelectorAll('.filter-btn');
const projectRows = document.querySelectorAll('.project-row');
if (filterBtns.length && projectRows.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const cat = btn.dataset.filter;
      projectRows.forEach(row => {
        if (cat === 'all' || row.dataset.cat === cat) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
  });
}

// ============ Contact form (demo) ============
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const orig = btn.textContent;
    btn.textContent = 'Poslano ✓';
    btn.style.background = 'var(--accent)';
    setTimeout(() => { btn.textContent = orig; btn.style.background = ''; form.reset(); }, 2500);
  });
}
