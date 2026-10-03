/* BOHEMIO 593 — Catálogo y filtros (simplificado) */

(async function catalogo() {
  const grid = document.getElementById('catalog-grid');
  if (!grid) return;

  const countEl = document.getElementById('catalog-count');
  const catBox = document.getElementById('filter-categoria');
  const origenBox = document.getElementById('filter-origen');
  const precioMin = document.getElementById('precio-min');
  const precioMax = document.getElementById('precio-max');
  const searchInput = document.getElementById('search-nombre');
  const suggestBox = document.getElementById('search-suggest');
  const resetBtn = document.getElementById('filters-reset');

  let productos = [];
  try {
    const res = await fetch('data/productos.json');
    productos = await res.json();
  } catch (e) {
    grid.innerHTML = '<p class="catalog__error">No se pudo cargar el catálogo. Verifica que data/productos.json exista.</p>';
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const categorias = [...new Set(productos.map(p => p.categoria))].sort();
  const origenes = [...new Set(productos.map(p => p.origen))].sort();

  function normalizar(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }

  function coincide(p, query) {
    const texto = normalizar(`${p.titulo} ${p.categoria} ${p.descripcion || ''}`);
    return texto.includes(query);
  }

  function buildCheckboxGroup(container, values, name, preselect) {
    container.innerHTML = values.map(v => `
      <label class="filters__option">
        <input type="checkbox" name="${name}" value="${v}" ${preselect === v ? 'checked' : ''}>
        <span>${v}</span>
      </label>
    `).join('');
  }

  buildCheckboxGroup(catBox, categorias, 'categoria', params.get('cat'));
  buildCheckboxGroup(origenBox, origenes, 'origen', params.get('origen'));

  function getChecked(container) {
    return [...container.querySelectorAll('input:checked')].map(i => i.value);
  }

  function productCard(p) {
    const precioHtml = p.proximamente
      ? '<p class="product-card__proximamente">Próximamente</p>'
      : `<p class="product-card__price">$${p.precio.toFixed(2)}</p>`;
    return `
      <a class="product-card product-card--link" href="producto.html?id=${p.id}">
        <div class="product-card__img"><img src="${p.imagen}" alt="${p.titulo}" loading="lazy"></div>
        <p class="product-card__tag">${p.categoria}${p.presentacion ? ' · ' + p.presentacion : ''}${p.gradoAlcoholico ? ' · ' + p.gradoAlcoholico + '%' : ''}</p>
        <h3 class="product-card__name">${p.titulo}</h3>
        ${precioHtml}
      </a>
    `;
  }

  function applyFilters() {
    const cats = getChecked(catBox);
    const origs = getChecked(origenBox);
    const min = parseFloat(precioMin.value) || 0;
    const max = parseFloat(precioMax.value) || Infinity;
    const query = normalizar(searchInput.value.trim());

    const filtrados = productos.filter(p => {
      if (cats.length && !cats.includes(p.categoria)) return false;
      if (origs.length && !origs.includes(p.origen)) return false;
      if (!p.proximamente && (p.precio < min || p.precio > max)) return false;
      if (query && !coincide(p, query)) return false;
      return true;
    });

    countEl.textContent = `${filtrados.length} producto${filtrados.length === 1 ? '' : 's'}`;

    if (!filtrados.length) {
      const mensaje = encodeURIComponent(`Hola BOHEMIO 593, busco "${query || 'un producto'}" y no lo encontré en el catálogo. ¿Lo tienen en stock?`);
      grid.innerHTML = `
        <div class="catalog__empty">
          <p>No encontramos ese producto en el catálogo.</p>
          <a class="btn btn--gold" href="https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${mensaje}" target="_blank" rel="noopener">Preguntar por WhatsApp</a>
        </div>`;
      return;
    }

    grid.innerHTML = filtrados.map(productCard).join('');
  }

  [catBox, origenBox].forEach(box => box.addEventListener('change', applyFilters));
  precioMin.addEventListener('input', applyFilters);
  precioMax.addEventListener('input', applyFilters);
  searchInput.addEventListener('input', () => { applyFilters(); updateSuggestions(); });
  searchInput.addEventListener('blur', () => setTimeout(() => { suggestBox.hidden = true; }, 150));
  searchInput.addEventListener('focus', updateSuggestions);
  resetBtn.addEventListener('click', () => {
    grid.closest('.catalog__layout').querySelectorAll('input[type="checkbox"]').forEach(i => i.checked = false);
    precioMin.value = '';
    precioMax.value = '';
    searchInput.value = '';
    suggestBox.hidden = true;
    applyFilters();
  });

  function updateSuggestions() {
    const query = normalizar(searchInput.value.trim());
    if (!query) { suggestBox.hidden = true; return; }
    const matches = productos.filter(p => coincide(p, query)).slice(0, 5);
    if (!matches.length) { suggestBox.hidden = true; return; }
    suggestBox.innerHTML = matches.map(p => `
      <a href="producto.html?id=${p.id}" class="search-suggest__item">
        <img src="${p.imagen}" alt="">
        <span>
          <strong>${p.titulo}</strong>
          <small>${p.categoria}${p.proximamente ? ' · Próximamente' : ' · $' + p.precio.toFixed(2)}</small>
        </span>
      </a>
    `).join('');
    suggestBox.hidden = false;
  }

  if (params.get('q')) searchInput.value = params.get('q');
  applyFilters();
})();

