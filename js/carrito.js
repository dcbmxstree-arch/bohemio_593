/* BOHEMIO 593 — Carrito y checkout (Fase 5) */

(function carritoPage() {
  const root = document.getElementById('carrito-content');
  if (!root) return;

  function render() {
    const cart = getCart();

    if (!cart.length) {
      root.innerHTML = `
        <p class="carrito__vacio">Tu carrito está vacío. <a href="catalogo.html">Ir al catálogo →</a></p>`;
      return;
    }

    const itemsHtml = cart.map(item => `
      <div class="carrito__item">
        <div class="carrito__item-info">
          <h3>${item.titulo}</h3>
          ${item.adicionales.length ? `<p class="carrito__adicionales">${item.adicionales.map(a => a.nombre).join(', ')}</p>` : ''}
          <div class="carrito__qty">
            <button class="qty-btn" data-action="menos" data-id="${item.lineId}">−</button>
            <span>${item.cantidad}</span>
            <button class="qty-btn" data-action="mas" data-id="${item.lineId}">+</button>
          </div>
        </div>
        <div class="carrito__item-right">
          <p class="carrito__item-precio">$${lineTotal(item).toFixed(2)}</p>
          <button class="carrito__remove" data-id="${item.lineId}">Quitar</button>
        </div>
      </div>
    `).join('');

    const total = cartTotal();

    root.innerHTML = `
      <div class="carrito__items">${itemsHtml}</div>
      <div class="carrito__total"><span>Total</span><span>$${total.toFixed(2)}</span></div>

      <div class="checkout">
        <h2>Checkout</h2>
        <div class="checkout__field">
          <label>Nombre</label>
          <input type="text" id="co-nombre" placeholder="Tu nombre">
        </div>
        <div class="checkout__field">
          <label>Teléfono</label>
          <input type="text" id="co-telefono" placeholder="09XXXXXXXX">
        </div>
        <p class="checkout__domicilio">¿Necesitas entrega a domicilio? Pregunta por nuestro servicio a domicilio con valor extra.</p>

        <div class="checkout__metodo">
          <label class="checkout__radio">
            <input type="radio" name="metodo" value="efectivo" checked> Efectivo / Contra entrega
          </label>
          <label class="checkout__radio">
            <input type="radio" name="metodo" value="whatsapp"> Coordinar por WhatsApp
          </label>
        </div>

        <div class="checkout__field" id="vuelto-field">
          <label>¿Con cuánto dinero cancelas? (para calcular el vuelto)</label>
          <input type="number" id="co-vuelto" placeholder="Ej. 50" min="${total}">
          <p class="checkout__vuelto-resultado" id="vuelto-resultado"></p>
        </div>

        <button class="btn btn--gold checkout__cta" id="checkout-btn">Confirmar pedido por WhatsApp</button>
        <p class="producto__nota">Al confirmar se abrirá WhatsApp con el detalle de tu pedido listo para enviar a la tienda.</p>
      </div>
    `;

    root.querySelectorAll('.qty-btn').forEach(btn => btn.addEventListener('click', () => {
      const item = cart.find(i => i.lineId === btn.dataset.id);
      const delta = btn.dataset.action === 'mas' ? 1 : -1;
      updateQty(btn.dataset.id, item.cantidad + delta);
      render();
    }));
    root.querySelectorAll('.carrito__remove').forEach(btn => btn.addEventListener('click', () => {
      removeFromCart(btn.dataset.id);
      render();
    }));

    const metodoRadios = root.querySelectorAll('input[name="metodo"]');
    const vueltoField = document.getElementById('vuelto-field');
    const vueltoInput = document.getElementById('co-vuelto');
    const vueltoResultado = document.getElementById('vuelto-resultado');

    function toggleVuelto() {
      const metodo = root.querySelector('input[name="metodo"]:checked').value;
      vueltoField.style.display = metodo === 'efectivo' ? 'block' : 'none';
    }
    metodoRadios.forEach(r => r.addEventListener('change', toggleVuelto));
    toggleVuelto();

    vueltoInput.addEventListener('input', () => {
      const cancela = parseFloat(vueltoInput.value) || 0;
      const vuelto = cancela - total;
      vueltoResultado.textContent = cancela ? (vuelto >= 0 ? `Vuelto: $${vuelto.toFixed(2)}` : 'El monto es menor al total del pedido.') : '';
    });

    document.getElementById('checkout-btn').addEventListener('click', () => {
      const nombre = document.getElementById('co-nombre').value || '(sin especificar)';
      const telefono = document.getElementById('co-telefono').value || '(sin especificar)';
      const metodo = root.querySelector('input[name="metodo"]:checked').value;

      let mensaje = `Hola BOHEMIO 593, quiero hacer este pedido:%0A%0A`;
      cart.forEach(item => {
        mensaje += `• ${item.cantidad}x ${item.titulo}`;
        if (item.adicionales.length) mensaje += ` (+ ${item.adicionales.map(a => a.nombre).join(', ')})`;
        mensaje += ` — $${lineTotal(item).toFixed(2)}%0A`;
      });
      mensaje += `%0ATotal: $${total.toFixed(2)}%0A%0A`;
      mensaje += `Nombre: ${nombre}%0ATeléfono: ${telefono}%0A`;

      if (metodo === 'efectivo') {
        const cancela = parseFloat(vueltoInput.value) || 0;
        mensaje += `Pago: Efectivo contra entrega`;
        if (cancela) mensaje += ` — cancela con $${cancela.toFixed(2)} (vuelto $${(cancela - total).toFixed(2)})`;
      } else {
        mensaje += `Pago: A coordinar por WhatsApp`;
      }

      window.open(`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${mensaje}`, '_blank');
    });
  }

  render();
})();
