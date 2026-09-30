/* BOHEMIO 593 — Carrito compartido (Fase 5) */

const CART_KEY = 'bohemio593_cart';

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(item) {
  const cart = getCart();
  cart.push(item);
  saveCart(cart);
}

function removeFromCart(lineId) {
  saveCart(getCart().filter(i => i.lineId !== lineId));
}

function updateQty(lineId, qty) {
  const cart = getCart().map(i => i.lineId === lineId ? { ...i, cantidad: Math.max(1, qty) } : i);
  saveCart(cart);
}

function cartCount() {
  return getCart().reduce((sum, i) => sum + i.cantidad, 0);
}

function lineTotal(item) {
  const adicionales = item.adicionales.reduce((s, a) => s + a.precio, 0);
  return (item.precioBase + adicionales) * item.cantidad;
}

function cartTotal() {
  return getCart().reduce((sum, i) => sum + lineTotal(i), 0);
}

function updateCartBadge() {
  const badge = document.getElementById('cart-badge');
  if (badge) badge.textContent = cartCount();
}

document.addEventListener('DOMContentLoaded', updateCartBadge);
