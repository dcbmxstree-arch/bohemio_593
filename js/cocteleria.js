/* BOHEMIO 593 — Coctelería y consumo responsable (Fase 6) */

(function cocteleria() {
  const root = document.getElementById('recetas');
  if (!root) return;

  const recetas = [
    {
      nombre: 'Whisky Highball',
      base: 'Whisky — Old Times Red',
      graduacion: '~9% ABV',
      ingredientes: [
        '2 oz de Old Times Red (40% vol.)',
        '4 oz de agua con gas / soda',
        'Hielo al gusto',
        '1 twist de limón',
      ],
      pasos: [
        'Llena un vaso alto con hielo.',
        'Vierte el Old Times Red y completa con la soda.',
        'Remueve suavemente y decora con el twist de limón.',
      ],
    },
    {
      nombre: 'Cuba Libre',
      base: 'Ron — Bacardí Carta Blanca',
      graduacion: '~11% ABV',
      ingredientes: [
        '2 oz de Bacardí Carta Blanca (37.5% vol.)',
        '4 oz de Coca-Cola',
        '½ oz de jugo de limón',
        'Hielo al gusto',
      ],
      pasos: [
        'En un vaso alto con hielo, vierte el ron y el jugo de limón.',
        'Completa con la Coca-Cola.',
        'Remueve una vez y sirve.',
      ],
    },
    {
      nombre: 'Vodka Tonic',
      base: 'Vodka — Skyy',
      graduacion: '~10% ABV',
      ingredientes: [
        '2 oz de Skyy Vodka (40% vol.)',
        '4 oz de agua tónica',
        '1 rodaja de limón o pepino',
        'Hielo al gusto',
      ],
      pasos: [
        'Llena un vaso alto con hielo.',
        'Añade el Skyy y completa con la tónica.',
        'Remueve y decora con limón o pepino.',
      ],
    },
    {
      nombre: 'Margarita Sencilla',
      base: 'Tequila — Azteca',
      graduacion: '~22–27% ABV',
      ingredientes: [
        '2 oz de Tequila Azteca (40% vol.)',
        '1 oz de jugo de limón',
        '1 oz de triple seco o jarabe',
        'Sal para escarchar el borde',
        'Hielo al gusto',
      ],
      pasos: [
        'Escarcha el borde de una copa con sal.',
        'En una coctelera con hielo, agita el tequila, el limón y el triple seco.',
        'Cuela en la copa y sirve.',
      ],
    },
    {
      nombre: 'Digestivo con Hierbas y Tónica',
      base: 'Digestivo — Jägermeister',
      graduacion: '~12–14% ABV',
      ingredientes: [
        '1½ oz de Jägermeister (35% vol.)',
        '3 oz de agua tónica',
        '1 rodaja de naranja',
        'Hielo al gusto',
      ],
      pasos: [
        'En un vaso con hielo, vierte el Jägermeister.',
        'Completa con la tónica.',
        'Decora con la rodaja de naranja y sirve.',
      ],
    },
  ];

  root.innerHTML = recetas.map(r => `
    <article class="receta-card">
      <p class="receta-card__base">${r.base}</p>
      <h3>${r.nombre}</h3>
      <p class="receta-card__graduacion">Graduación del cóctel: <strong>${r.graduacion}</strong></p>
      <h4>Ingredientes</h4>
      <ul>${r.ingredientes.map(i => `<li>${i}</li>`).join('')}</ul>
      <h4>Preparación</h4>
      <ol>${r.pasos.map(p => `<li>${p}</li>`).join('')}</ol>
    </article>
  `).join('');
})();
