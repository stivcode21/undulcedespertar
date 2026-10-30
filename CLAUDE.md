# Un Dulce Despertar — Contexto del Proyecto

## Descripción
Migración del sitio WordPress/WooCommerce de **undulcedespertar.co** a Astro 5.
Empresa colombiana de desayunos sorpresa, anchetas y regalos. Bogotá, desde 2007.

## Stack Tecnológico
| Capa | Tecnología |
|---|---|
| Framework | Astro 5 |
| Estilos | Tailwind CSS v4 |
| Componentes interactivos | React (Astro Islands con `client:load`) |
| Slider | Swiper.js (componente React) |
| Estado del carrito | Zustand + `persist` en localStorage (clave `udd-carrito`) |
| Iconos | **lucide-astro** en archivos `.astro` / **lucide-react** en archivos `.tsx` |
| SEO | astro-seo |
| Sitemap | @astrojs/sitemap |
| Animaciones | motion (a futuro) |

## Sistema de Diseño

### Paleta de Colores
```css
--color-primary: #F0356B        /* Rosa vibrante principal */
--color-primary-dark: #C9174E   /* Hover de botones */
--color-primary-light: #FFF0F5  /* Fondos suaves, hover items */
--color-dark: #1C1C2E           /* Footer, textos oscuros */
```

### Tipografía
- **Fuente:** Poppins (400, 500, 600, 700, 800) — Google Fonts
- `font-sans` y `font-display` ambas apuntan a Poppins

### Componentes UI
- Botones: `rounded-full` siempre — nunca esquinas cuadradas
- Cards de producto: `rounded-2xl`, sombra suave, hover eleva `-translate-y-1`
- Dropdowns navbar: `rounded-2xl` con `shadow-xl`
- Badges/tags: `rounded-full`
- CTA WhatsApp: siempre verde (`bg-green-500`), nunca rosa

### Iconos
- **SIEMPRE usar lucide-astro** en archivos `.astro`
- **SIEMPRE usar lucide-react** en archivos `.tsx`/`.jsx`
- **NUNCA usar emojis** como iconos de UI — los emojis del JSON son solo datos
- Mapping de categorías → iconos:
  ```
  anchetas     → ShoppingBasket
  corporativos → Building2
  desayunos    → Coffee
  flores       → Flower2
  frutas       → Apple
  onces        → Cookie
  regalos      → Gift
  ```

## Arquitectura de Rutas
```
/                          → Home (slider + hero + categorías + destacados)
/categorias/[categoria]    → Grid con sidebar filtros (precio, ocasión)
/ocasion/[ocasion]         → Productos filtrados por ocasión
/temporada/[temporada]     → Productos filtrados por temporada
/producto/[slug]           → Detalle producto + relacionados + Schema.org
/nosotros                  → (pendiente)
/blog                      → (pendiente)
/blog/[slug]               → (pendiente)
```

## Estructura de Datos
```
src/data/
  categorias/
    desayunos.json    (23 productos)
    anchetas.json     (20 productos)
    flores.json       (10 productos)
    frutas.json       (8 productos)
    onces.json        (12 productos)
    corporativos.json (6 productos)
    regalos.json      (21 productos)
  todos-productos.ts  → exporta todosLosProductos[] y porCategoria{}
  categorias.json     → meta de categorías, ocasiones y temporadas
```

### Tipo Producto
```typescript
interface Producto {
  slug: string;
  nombre: string;
  precio: number;          // En COP, sin puntos ni símbolo
  imagen: string;          // Ruta relativa: /assets/images/NOMBRE.jpg
  descripcion: string;
  ocasiones: string[];     // slugs de ocasiones
  temporadas: string[];    // slugs de temporadas
  destacado: boolean;
  categoria?: string;      // agregado por todos-productos.ts
}
```

## SEO
- Cada página tiene `<title>` único con template `%s | Un Dulce Despertar`
- Meta description única por página (máx 155 chars)
- Schema.org `LocalBusiness` en Home
- Schema.org `Product` con precio COP en cada página de producto
- Open Graph configurado en BaseLayout
- Sitemap automático via `@astrojs/sitemap`
- `site: 'https://undulcedespertar.co'` en `astro.config.mjs`
- Imágenes con `alt` descriptivo siempre
- Breadcrumbs en páginas interiores

## Patrones de Diseño a Seguir
1. **Mobile-first** — diseñar primero para móvil, luego md/lg
2. **Carrito** — `src/store/carrito.ts` (zustand). Las cards y la página de producto usan `AgregarAlCarrito` (React island); el drawer `CarritoDrawer` vive en BaseLayout con `client:only`. Los botones "Pagar en línea" y "Pagar por WhatsApp" del drawer aún no tienen acción
3. **Datos estáticos en JSON** — no hay backend, todo se genera en build time
4. **getStaticPaths()** para todas las rutas dinámicas
5. **Productos relacionados** = misma categoría, excluye el actual, máximo 4
6. **Precio siempre en COP** con `Intl.NumberFormat('es-CO')`

## Assets
- **180 imágenes** scrapeadas del sitio WordPress original en `/public/assets/images/`
- Nombres en MAYÚSCULAS (ej: `ANCHETA-PREMIUM.jpg`)
- Logo: `/public/assets/images/cropped-logo-e1726550977726.png`
- Banners slider: `BANNER-navidad-web-2026.jpg`, `BANNER-HALLOWEEN-2026-WEB-.jpg`, `bannerqs.png`, `bannertemporada-e1727744180230.png`

## Fases del Proyecto
- **Fase 1 (actual):** Frontend estático + CTA WhatsApp
- **Fase 2:** Agente de ventas por WhatsApp
- **Fase 3:** Carrito como React Island + integración Wompi (pagos Colombia)

## Contacto / Negocio
- WhatsApp Bogotá: `573053693139`
- Teléfono Miami: `+1 954 7620304`
- wa.me link: `https://wa.me/573053693139`
