// ─── TABS DE SERVICIOS ───────────────────────────────────────────────
document.querySelectorAll('.srv-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const idx = tab.dataset.tab;
    document.querySelectorAll('.srv-tab').forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected','false'); });
    document.querySelectorAll('.srv-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    tab.setAttribute('aria-selected','true');
    document.getElementById('panel' + idx).classList.add('active');
  });
});

// ─── NAVBAR SCROLL ───────────────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ─── HAMBURGER MENU ──────────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ─── HERO BG PARALLAX ────────────────────────────────────────────────
const heroBg = document.querySelector('.hero-bg');
window.addEventListener('scroll', () => {
  if (heroBg) heroBg.style.transform = `scale(1.05) translateY(${window.scrollY * 0.2}px)`;
});

// ─── SCROLL REVEAL ───────────────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ─── PORTFOLIO DATA ──────────────────────────────────────────────────
const portfolioData = [
  // ── COCINAS (9) ──
  { src: 'assets/images/portafolio/cocinas/cocina.jpg',       category: 'cocinas', label: 'Cocina Integral' },
  { src: 'assets/images/portafolio/cocinas/cocina1.jpg',      category: 'cocinas', label: 'Cocina a Medida' },
  { src: 'assets/images/portafolio/cocinas/cocina2.jpg',      category: 'cocinas', label: 'Cocina con Isla' },
  { src: 'assets/images/portafolio/cocinas/cocina3.jpg',      category: 'cocinas', label: 'Cocina Moderna' },
  { src: 'assets/images/portafolio/cocinas/cocina4.jpg',      category: 'cocinas', label: 'Cocina Alto Brillo' },
  { src: 'assets/images/portafolio/cocinas/cocina5.jpg',      category: 'cocinas', label: 'Cocina Completa' },
  { src: 'assets/images/portafolio/cocinas/cocina.leds.jpg',  category: 'cocinas', label: 'Cocina con Iluminación LED' },
  { src: 'assets/images/portafolio/cocinas/8.jpg',            category: 'cocinas', label: 'Cocina Premium' },
  { src: 'assets/images/portafolio/cocinas/10.jpg',           category: 'cocinas', label: 'Cocina Residencial' },
  // ── CLÓSETS (6) ──
  { src: 'assets/images/portafolio/closets/1.jpg',  category: 'closets', label: 'Clóset a Medida' },
  { src: 'assets/images/portafolio/closets/2.jpg',  category: 'closets', label: 'Vestidor Premium' },
  { src: 'assets/images/portafolio/closets/3.jpg',  category: 'closets', label: 'Clóset Empotrado' },
  { src: 'assets/images/portafolio/closets/4.jpg',  category: 'closets', label: 'Clóset con LED' },
  { src: 'assets/images/portafolio/closets/6.jpg',  category: 'closets', label: 'Vestidor Moderno' },
  { src: 'assets/images/portafolio/closets/9.jpg',  category: 'closets', label: 'Clóset Completo' },
  // ── MUEBLES (5) ──
  { src: 'assets/images/portafolio/muebles/5.jpg',            category: 'muebles', label: 'Mueble a Medida' },
  { src: 'assets/images/portafolio/muebles/7.jpg',            category: 'muebles', label: 'Centro de TV' },
  { src: 'assets/images/portafolio/muebles/12.jpg',           category: 'muebles', label: 'Mueble Flotante' },
  { src: 'assets/images/portafolio/muebles/13.jpg',           category: 'muebles', label: 'Tocador con Espejo' },
  { src: 'assets/images/portafolio/muebles/vista.pared.jpg',  category: 'muebles', label: 'Vista de Mueble Empotrado' },
];

// ─── CAROUSEL STATE ──────────────────────────────────────────────────
let filtered = [...portfolioData];
let current  = 0;
let autoTimer = null;

// DOM refs
const carouselImg      = document.getElementById('carouselImg');
const carouselLabel    = document.getElementById('carouselLabel');
const carouselCounter  = document.getElementById('carouselCounter');
const carouselProgress = document.getElementById('carouselProgress');
const carouselThumbs   = document.getElementById('carouselThumbs');
const carouselPrev     = document.getElementById('carouselPrev');
const carouselNext     = document.getElementById('carouselNext');

// ─── RENDER THUMBNAILS ───────────────────────────────────────────────
function renderThumbs() {
  carouselThumbs.innerHTML = '';
  filtered.forEach((item, idx) => {
    const div = document.createElement('div');
    div.className = 'carousel-thumb' + (idx === current ? ' active' : '');
    div.setAttribute('role', 'listitem');
    div.innerHTML = `<img src="${item.src}" alt="${item.label}" loading="lazy">`;
    div.addEventListener('click', () => goTo(idx));
    carouselThumbs.appendChild(div);
  });
}

// ─── GO TO SLIDE ─────────────────────────────────────────────────────
function goTo(idx) {
  current = (idx + filtered.length) % filtered.length;
  const item = filtered[current];

  // Fade out → swap → fade in
  carouselImg.classList.add('fade-out');
  setTimeout(() => {
    carouselImg.src = item.src;
    carouselImg.alt = item.label;
    carouselImg.classList.remove('fade-out');
  }, 350);

  carouselLabel.textContent   = item.label;
  carouselCounter.textContent = `${current + 1} / ${filtered.length}`;
  carouselProgress.style.width = `${((current + 1) / filtered.length) * 100}%`;

  // Update thumbs active state
  carouselThumbs.querySelectorAll('.carousel-thumb').forEach((t, i) => {
    t.classList.toggle('active', i === current);
  });

  // Scroll active thumb horizontally inside container only
  const activeThumb = carouselThumbs.children[current];
  if (activeThumb) {
    const containerWidth = carouselThumbs.clientWidth;
    const thumbOffset = activeThumb.offsetLeft;
    const thumbWidth = activeThumb.clientWidth;
    carouselThumbs.scrollTo({
      left: thumbOffset - (containerWidth / 2) + (thumbWidth / 2),
      behavior: 'smooth'
    });
  }

  resetAutoPlay();
}

// ─── NAV BUTTONS ─────────────────────────────────────────────────────
carouselPrev.addEventListener('click', () => goTo(current - 1));
carouselNext.addEventListener('click', () => goTo(current + 1));

// ─── KEYBOARD NAV ────────────────────────────────────────────────────
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft')  goTo(current - 1);
  if (e.key === 'ArrowRight') goTo(current + 1);
});

// ─── TOUCH SWIPE ─────────────────────────────────────────────────────
let touchStartX = 0;
const carouselMain = document.getElementById('carouselMain');
carouselMain.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
carouselMain.addEventListener('touchend',   e => {
  const diff = touchStartX - e.changedTouches[0].screenX;
  if (Math.abs(diff) > 40) diff > 0 ? goTo(current + 1) : goTo(current - 1);
});

// ─── AUTO PLAY ────────────────────────────────────────────────────────
function startAutoPlay() {
  autoTimer = setInterval(() => goTo(current + 1), 4000);
}
function resetAutoPlay() {
  clearInterval(autoTimer);
  startAutoPlay();
}

// ─── FILTER ───────────────────────────────────────────────────────────
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    filtered = f === 'all' ? [...portfolioData] : portfolioData.filter(i => i.category === f);
    current  = 0;
    renderThumbs();
    // Force first slide immediately (no animation)
    const first = filtered[0];
    carouselImg.src             = first.src;
    carouselImg.alt             = first.label;
    carouselLabel.textContent   = first.label;
    carouselCounter.textContent = `1 / ${filtered.length}`;
    carouselProgress.style.width = `${(1 / filtered.length) * 100}%`;
    resetAutoPlay();
  });
});

// ─── LIGHTBOX ────────────────────────────────────────────────────────
const lightbox = document.getElementById('lightbox');
const lbImg    = document.getElementById('lbImg');
const lbClose  = document.getElementById('lbClose');
const lbPrev   = document.getElementById('lbPrev');
const lbNext   = document.getElementById('lbNext');

function openLightbox() {
  lbImg.src = filtered[current].src;
  lbImg.alt = filtered[current].label;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function lbNavigate(dir) {
  goTo(current + dir);
  lbImg.src = filtered[current].src;
  lbImg.alt = filtered[current].label;
}

// Configurar cursor y clicks
carouselImg.style.cursor = 'zoom-in';
carouselImg.addEventListener('click', openLightbox);
lbClose.addEventListener('click', closeLightbox);
lbPrev.addEventListener('click', () => lbNavigate(-1));
lbNext.addEventListener('click', () => lbNavigate(1));
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowLeft')  lbNavigate(-1);
  if (e.key === 'ArrowRight') lbNavigate(1);
});

// ─── INIT ─────────────────────────────────────────────────────────────
function initCarousel() {
  renderThumbs();
  const first = filtered[0];
  carouselImg.src             = first.src;
  carouselImg.alt             = first.label;
  carouselLabel.textContent   = first.label;
  carouselCounter.textContent = `1 / ${filtered.length}`;
  carouselProgress.style.width = `${(1 / filtered.length) * 100}%`;
  startAutoPlay();
}

initCarousel();
