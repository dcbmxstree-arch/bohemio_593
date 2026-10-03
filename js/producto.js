/* BOHEMIO 593 — Ficha de producto y adicionales */

(async function producto() {
  const root = document.getElementById('producto-content');
  if (!root) return;

  const ADICIONALES = [
    { id: 'hielo', nombre: 'Bolsa de hielo', precio: 1.50 },
    { id: 'vasos', nombre: 'Vasos desechables (x10)', precio: 2.00 },
    { id: 'tonica', nombre: 'Mezclador: Tónica', precio: 2.50 },
    { id: 'soda', nombre: 'Mezclador: Agua con gas', precio: 1.80 },
    { id: 'energizante', nombre: 'Mezclador: Energizante', precio: 3.00 },
  ];

  const id = new URLSearchParams(window.location.search).get('id');
  let productos = [];
  try {
    const res = await fetch('data/productos.json');
    productos = await res.json();
  } catch (e) {
    root.innerHTML = '<p class="producto__loading">No se pudo cargar el catálogo.</p>';
    return;
  }

  const p = productos.find(x => x.id === id) || productos[0];
  if (!p) {
    root.innerHTML = '<p class="producto__loading">Producto no encontrado. <a href="catalogo.html">Volver al catálogo</a></p>';
    return;
  }
  document.title = `${p.titulo} — BOHEMIO 593`;

  if (p.proximamente) {
    const mensaje = encodeURIComponent(`Hola BOHEMIO 593, quisiera consultar disponibilidad de: ${p.titulo}`);
    root.innerHTML = `
      <a class="producto__back" href="catalogo.html">← Volver al catálogo</a>
      <div class="producto__layout">
        <div class="producto__gallery"><img src="${p.imagen}" alt="${p.titulo}"></div>
        <div class="producto__info">
          <p class="producto__tag">${p.categoria}${p.presentacion ? ' · ' + p.presentacion : ''}${p.gradoAlcoholico ? ' · ' + p.gradoAlcoholico + '% vol.' : ''}</p>
          <h1>${p.titulo}</h1>
          <p class="product-card__proximamente producto__proximamente">Próximamente</p>
          <p class="producto__desc">${p.descripcion || 'Estamos por confirmar el ingreso de este producto a nuestro stock.'}</p>
          <a class="btn btn--gold producto__cta" href="https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${mensaje}" target="_blank" rel="noopener">Consultar disponibilidad</a>
        </div>
      </div>
    `;
    return;
  }

  root.innerHTML = `
    <a class="producto__back" href="catalogo.html">← Volver al catálogo</a>
    <div class="producto__layout">
      <div class="producto__gallery"><img src="${p.imagen}" alt="${p.titulo}"></div>
      <div class="producto__info">
        <p class="producto__tag">${p.categoria}${p.presentacion ? ' · ' + p.presentacion : ''} · ${p.origen}${p.gradoAlcoholico ? ' · ' + p.gradoAlcoholico + '% vol.' : ''}</p>
        <h1>${p.titulo}</h1>
        <p class="producto__precio" id="precio-total">$${p.precio.toFixed(2)}</p>
        ${p.descripcion ? `<p class="producto__desc">${p.descripcion}</p>` : ''}

        <div class="producto__qty">
          <label for="cantidad">Cantidad</label>
          <input type="number" id="cantidad" value="1" min="1">
        </div>

        <div class="producto__adicionales">
          <h3>Adicionales</h3>
          ${ADICIONALES.map(a => `
            <label class="adicional">
              <span>
                <input type="checkbox" class="adicional__check" data-precio="${a.precio}">
                ${a.nombre}
              </span>
              <span>+ $${a.precio.toFixed(2)}</span>
            </label>
          `).join('')}
        </div>

        <button class="btn btn--gold producto__cta" id="agregar-btn">Agregar al pedido</button>
        <p class="producto__confirm" id="agregar-confirm" hidden>Agregado al carrito. <a href="carrito.html">Ver carrito →</a></p>
        <p class="producto__nota">El pago se coordina en el checkout: efectivo contra entrega o por WhatsApp.</p>
      </div>
    </div>
  `;

  const precioEl = document.getElementById('precio-total');
  const checks = root.querySelectorAll('.adicional__check');
  function recalcular() {
    let total = p.precio;
    checks.forEach(c => { if (c.checked) total += parseFloat(c.dataset.precio); });
    precioEl.textContent = `$${total.toFixed(2)}`;
  }
  checks.forEach(c => c.addEventListener('change', recalcular));

  document.getElementById('agregar-btn').addEventListener('click', () => {
    const seleccionados = [...checks]
      .filter(c => c.checked)
      .map(c => ({ nombre: c.closest('.adicional').querySelector('span').textContent.trim(), precio: parseFloat(c.dataset.precio) }));
    const cantidad = Math.max(1, parseInt(document.getElementById('cantidad').value) || 1);

    addToCart({
      lineId: `${p.id}-${Date.now()}`,
      productId: p.id,
      titulo: p.titulo,
      precioBase: p.precio,
      adicionales: seleccionados,
      cantidad,
    });

    document.getElementById('agregar-confirm').hidden = false;
  });
})();

