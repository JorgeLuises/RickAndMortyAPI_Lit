# RickAndMortyLit

Aplicación frontend que consume la API pública de Rick and Morty para mostrar personajes mediante Web Components construidos con Lit. Está diseñada como una pequeña SPA ligera para explorar, buscar y marcar personajes favoritos.

**Características**
- Listado paginado de personajes.
- Búsqueda por nombre.
- Modal con información detallada de cada personaje.
- Marcar/desmarcar favoritos (persistencia local en el navegador).

**Tecnologías y librerías**
- JavaScript (ES Modules)
- Lit (Web Components) — [lit](https://lit.dev) (dependencia del proyecto)
- Vite — herramienta de desarrollo y bundling (devDependency)
- HTML y CSS para estructura y estilos
- Rick and Morty API — https://rickandmortyapi.com/

**Estructura principal del proyecto**
- [index.html](index.html)
- [src/index.js](src/index.js) — punto de entrada
- [src/index.css](src/index.css) — estilos globales
- [src/pages/home-page.js](src/pages/home-page.js) — lógica de la página principal y consumo de la API
- [src/components/character-card.js](src/components/character-card.js) — tarjeta de personaje
- [src/components/character-modal.js](src/components/character-modal.js) — modal de detalle
- [src/components/favorite-toggle.js](src/components/favorite-toggle.js) — toggle de favorito
- [src/components/pagination-controller.js](src/components/pagination-controller.js) — control de paginación
- [src/components/search-bar.js](src/components/search-bar.js) — barra de búsqueda

> Nota: la aplicación utiliza componentes Web construidos con Lit para mantener cada pieza aislada y reutilizable.

**Instalación (local)**
1. Clona el repositorio:

	git clone https://github.com/tu-usuario/RickAndMortyLit.git
2. Entra al directorio del proyecto:

	cd RickAndMortyLit
3. Instala dependencias (requiere Node.js y npm):

	npm install
4. Ejecuta el servidor de desarrollo:

	npm run dev

Abre la URL que Vite muestra en la terminal (por defecto http://localhost:5173).

Requisitos recomendados
- Node.js v16+ (o la versión LTS más reciente)
- npm o yarn

Scripts disponibles (en `package.json`)
- `npm run dev` — inicia Vite en modo desarrollo
- `npm run build` — crea la build de producción con Vite
- `npm run preview` — sirve la build de producción localmente

**Cómo contribuir**
- Abre un issue para discutir cambios grandes.
- Crea ramas con nombres descriptivos (`feature/`, `fix/`).
- Envía pull requests con descripción clara de los cambios.

**Licencia**
Licencia libre — adaptar según prefieras (MIT por ejemplo).

---