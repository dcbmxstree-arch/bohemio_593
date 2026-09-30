/* BOHEMIO 593 — lógica base (Fase 1) */

// --- Age Gate ---
(function ageGate() {
  const gate = document.getElementById('age-gate');
  const confirmBtn = document.getElementById('age-confirm');
  const exitBtn = document.getElementById('age-exit');
  const STORAGE_KEY = 'bohemio593_age_verified';

  if (sessionStorage.getItem(STORAGE_KEY) === 'true') {
    gate.hidden = true;
  }

  confirmBtn.addEventListener('click', () => {
    sessionStorage.setItem(STORAGE_KEY, 'true');
    gate.hidden = true;
  });

  exitBtn.addEventListener('click', () => {
    window.location.href = 'https://www.google.com';
  });
})();

// --- Navegación móvil ---
(function mobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('site-nav');
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
})();

// --- Botón flotante de WhatsApp: usa el número centralizado en config.js ---
(function setWhatsappLink() {
  const btn = document.getElementById('whatsapp-btn');
  if (!btn || typeof STORE_CONFIG === 'undefined') return;
  const mensaje = encodeURIComponent('Hola BOHEMIO 593, quisiera realizar una consulta / pedido sobre...');
  btn.href = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${mensaje}`;
})();

// --- Año dinámico en footer ---
document.getElementById('year').textContent = new Date().getFullYear();

// --- Home: Recomendaciones y Más Vendidos, desde el catálogo real ---
function renderCards(list, container) {
  if (!container) return;
  container.innerHTML = list.map((p) => `
    <a class="product-card product-card--link" href="producto.html?id=${p.id}">
      <div class="product-card__img"><img src="${p.imagen}" alt="${p.titulo}" loading="lazy"></div>
      <p class="product-card__tag">${p.categoria}${p.presentacion ? ' · ' + p.presentacion : ''}</p>
      <h3 class="product-card__name">${p.titulo}</h3>
      <p class="product-card__price">${p.proximamente ? 'Próximamente' : '$' + p.precio.toFixed(2)}</p>
    </a>
  `).join('');
}

(async function homeSections() {
  const recTrack = document.getElementById('rec-track');
  const bestsellersGrid = document.getElementById('bestsellers-grid');
  if (!recTrack && !bestsellersGrid) return;

  try {
    const res = await fetch('data/productos.json');
    const productos = await res.json();
    const disponibles = productos.filter(p => !p.proximamente);
    const fijos = disponibles.filter(p => p.destacado);
    const resto = disponibles.filter(p => !p.destacado).sort(() => Math.random() - 0.5);
    const recomendados = [...fijos, ...resto].slice(0, 6);
    renderCards(recomendados, recTrack);
    renderCards(productos.filter(p => p.masVendido), bestsellersGrid);
  } catch (e) {
    if (recTrack) recTrack.innerHTML = '<p class="catalog__error">No se pudo cargar el catálogo.</p>';
  }

  // --- Carrusel de Recomendaciones ---
  const prev = document.getElementById('rec-prev');
  const next = document.getElementById('rec-next');
  if (recTrack && prev && next) {
    const scrollAmount = 240;
    prev.addEventListener('click', () => recTrack.scrollBy({ left: -scrollAmount, behavior: 'smooth' }));
    next.addEventListener('click', () => recTrack.scrollBy({ left: scrollAmount, behavior: 'smooth' }));
  }
})();
