# BOHEMIO 593 — Sitio web

Licorería y cava digital en Quito, Ecuador. Sitio completo (Fases 0 a 7): Home, catálogo con filtros y búsqueda, ficha de producto, carrito y checkout, y la sección de coctelería.

## Estructura

```
/
├── index.html             # Home: hero, manifiesto, recomendaciones, más vendidos
├── catalogo.html          # Catálogo con filtros y búsqueda por nombre
├── producto.html          # Ficha de producto + adicionales
├── carrito.html           # Carrito y checkout (efectivo / WhatsApp)
├── cocteleria.html        # Recetas y consumo responsable
├── css/styles.css         # Sistema de diseño y todos los componentes
├── js/
│   ├── config.js           # Número de WhatsApp de la tienda (único lugar a editar)
│   ├── cart.js              # Estado del carrito (localStorage), compartido
│   ├── main.js               # Age gate, navegación móvil, footer, botón WhatsApp
│   ├── catalogo.js            # Filtros y búsqueda del catálogo
│   ├── producto.js             # Ficha de producto y adicionales
│   ├── carrito.js               # Checkout y mensaje de WhatsApp
│   └── cocteleria.js             # Recetas de coctelería
├── data/productos.json     # Catálogo de ejemplo (8 productos)
└── assets/                  # Imágenes (vacío por ahora)
```

## Publicar en GitHub Pages (para pruebas)

1. Crear un repositorio nuevo, por ejemplo `bohemio593-web`.
2. Subir todo el contenido de esta carpeta a la rama `main`:
   ```
   git init
   git add .
   git commit -m "Fase 0 y Fase 1: andamiaje, age gate, header/footer y sistema de diseño"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/bohemio593-web.git
   git push -u origin main
   ```
3. En GitHub: **Settings → Pages → Source → rama `main` / carpeta raíz** → Guardar.
4. El sitio quedará publicado en `https://TU-USUARIO.github.io/bohemio593-web/` en unos minutos.

## Antes de publicar en producción

- Cambia el número de WhatsApp real en `js/config.js` (una sola línea, se aplica a todo el sitio).
- Reemplaza las fotos placeholder (ícono de copa) por fotografías reales en `assets/` y actualiza `data/productos.json`.
- Revisa los textos de ejemplo del catálogo (8 productos) y cárgalos con el inventario real.

## Cómo añadir un producto nuevo (sin tocar código)

Todo el catálogo vive en `data/productos.json`. Para agregar un producto, copia este bloque dentro del arreglo (entre los corchetes `[ ]`, separado por una coma del anterior) y llena los datos:

```json
{
  "id": "identificador-unico-sin-espacios",
  "titulo": "Nombre del producto",
  "categoria": "Whisky",
  "presentacion": "750 ml",
  "precio": 15.99,
  "origen": "Nacional",
  "imagen": "assets/nombre-del-archivo.jpg",
  "descripcion": "Una línea corta describiendo el producto.",
  "destacado": false,
  "masVendido": false,
  "proximamente": false
}
```

- **`categoria`**: si escribes una categoría nueva (ej. "Ginebra"), aparece sola en el filtro del catálogo — no hay que tocar nada más.
- **`imagen`**: sube la foto a la carpeta `assets/` y escribe la ruta exacta aquí.
- **`destacado: true`**: el producto aparece siempre en "Recomendaciones del día" del Home (el resto de esa sección se elige al azar en cada visita).
- **`masVendido: true`**: aparece en "Los más vendidos" del Home.
- **`proximamente: true`**: se muestra en el catálogo sin precio ni botón de compra, con un botón "Consultar disponibilidad" que abre WhatsApp directo.
- Para quitar un producto, borra su bloque completo (o ponle `"proximamente": true` si solo se agotó temporalmente).

No hace falta editar `catalogo.html`, `producto.html` ni ningún archivo `.js` — todos leen este JSON automáticamente.

## Qué revisar en esta entrega

- El modal +18 aparece al entrar y bloquea el contenido hasta confirmar.
- El header es sticky y el menú se colapsa correctamente en móvil (probar en una pantalla angosta).
- Los colores, tipografía (Fraunces + Work Sans) y el botón de WhatsApp reflejan la identidad "bohemia nocturna" descrita en el brief.
- El pie de página muestra el aviso legal de +18.

## Siguiente fase

El sitio (Fases 0–7) está completo según el alcance original. Módulos futuros sugeridos: pasarela de pago en línea, membresías, calculadora de fiestas, panel de administración para editar `productos.json` sin tocar código.
