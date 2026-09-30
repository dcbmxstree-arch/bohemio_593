/* BOHEMIO 593 — Coctelería y consumo responsable (Fase 6) */

(function cocteleria() {
  const root = document.getElementById('recetas');
  if (!root) return;

  const recetas = [
    {
      nombre: 'Old Fashioned Bohemio',
      base: 'Whisky',
      ingredientes: ['60 ml de whisky (Buchanan\'s 12 Años)', '1 cucharadita de azúcar', '2 dashes de amargo de angostura', 'Una tira de cáscara de naranja', 'Hielo en cubo grande'],
      pasos: ['Disuelve el azúcar con el amargo y un chorrito de agua en el vaso.', 'Agrega el hielo y el whisky, remueve lento 20 segundos.', 'Exprime la cáscara de naranja sobre el trago y decora.'],
    },
    {
      nombre: 'Gin Tonic Andino',
      base: 'Ginebra',
      ingredientes: ['50 ml de ginebra (Bombay Sapphire)', '150 ml de agua tónica', 'Rodajas de pepino', 'Ramitas de hierba luisa', 'Hielo abundante'],
      pasos: ['Llena la copa con hielo hasta el borde.', 'Sirve la ginebra y completa con la tónica sin remover fuerte.', 'Decora con pepino y hierba luisa.'],
    },
    {
      nombre: 'Canelazo 593',
      base: 'Aguardiente',
      ingredientes: ['45 ml de aguardiente (Cristal Añejo)', '200 ml de agua de canela caliente', '1 cucharadita de panela o azúcar', 'Jugo de media naranjilla'],
      pasos: ['Calienta el agua con canela y panela hasta disolver.', 'Añade el jugo de naranjilla y el aguardiente.', 'Sirve caliente en taza de barro.'],
    },
  ];

  root.innerHTML = recetas.map(r => `
    <article class="receta-card">
      <p class="receta-card__base">${r.base}</p>
      <h3>${r.nombre}</h3>
      <h4>Ingredientes</h4>
      <ul>${r.ingredientes.map(i => `<li>${i}</li>`).join('')}</ul>
      <h4>Preparación</h4>
      <ol>${r.pasos.map(p => `<li>${p}</li>`).join('')}</ol>
    </article>
  `).join('');
})();
