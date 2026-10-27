# Marcus Escalona - Product Engineer Portfolio

🔗 Live site: [marcusescalona.art](https://marcusescalona.art)
📄 License: [MIT](LICENSE)

Welcome to my interactive portfolio! I am a Product & Forward Deployed Engineer working across full-stack, AI/LLM & voice AI, and real-time 3D. 

This repository houses the source code for my digital portfolio, an immersive web experience designed to showcase my projects in real-time 3D, AI and voice products, and interactive web systems.

## 🚀 Technical Highlight
This portfolio is built to reflect my development philosophy: reducing cognitive friction through immersive design while maintaining rigorous engineering standards.

### Core Technologies:
* **HTML5 & CSS3**: Custom layouts, CSS variables, native animations, and responsive grids.
* **Vanilla JavaScript (ES6+)**: All application logic lives in a single `main.js` file - there's no build step or module system. Internally it's organized by feature (i18n/translations, gallery rendering, modal/detail view, particle systems, language switching).
* **GSAP & ScrollTrigger**: Complex timeline animations, cinematic transitions, and dynamic SVG morphing. Loaded via CDN in `index.html`, not an npm dependency.
* **Lenis**: Hardware-accelerated smooth scrolling for premium UX. Also loaded via CDN, not an npm dependency.
* **Canvas API**: Procedural background particle systems.

## 📁 File Structure
```
marcus-escalona-portfolio/
├── index.html                  # Single-page markup, all sections
├── main.js                     # All application logic (i18n, gallery, modals, particles)
├── styles.css                  # All styles
├── scripts/
│   └── generate-jsonld.js      # Regenerates the JSON-LD/noscript blocks in index.html from projectsData in main.js
├── assets/                     # Images, videos, CVs, favicons
├── package.json
└── LICENSE
```

## 🛠 Setup & Local Development
To run this project locally and avoid CORS issues when interacting with local assets:
1. Clone the repository.
2. Run `npm install` - this only installs [`serve`](https://www.npmjs.com/package/serve), the local static file server. GSAP, ScrollTrigger, and Lenis are loaded from a CDN in `index.html`, not from npm.
3. Run `npm start`.

---

# Marcus Escalona - Portafolio de Product Engineer

🔗 Sitio en vivo: [marcusescalona.art](https://marcusescalona.art)
📄 Licencia: [MIT](LICENSE)

¡Bienvenido a mi portafolio interactivo! Soy un Product & Forward Deployed Engineer que trabaja en full-stack, IA/LLM y voz con IA, y 3D en tiempo real.

Este repositorio contiene el código fuente de mi portafolio digital, una experiencia web inmersiva diseñada para mostrar mis proyectos en 3D en tiempo real, productos de IA y voz, y sistemas web interactivos.

## 🚀 Aspectos Técnicos Destacados
Este portafolio está construido para reflejar mi filosofía de desarrollo: reducir la fricción cognitiva a través del diseño inmersivo manteniendo rigurosos estándares de ingeniería.

### Tecnologías Principales:
* **HTML5 & CSS3**: Layouts personalizados, variables CSS, animaciones nativas y grids responsivos.
* **Vanilla JavaScript (ES6+)**: Toda la lógica de la aplicación vive en un único archivo `main.js` - no hay paso de build ni sistema de módulos. Internamente está organizado por funcionalidad (i18n/traducciones, renderizado de la galería, vista modal/detalle, sistemas de partículas, cambio de idioma).
* **GSAP & ScrollTrigger**: Animaciones de línea de tiempo complejas, transiciones cinemáticas y transformaciones dinámicas. Se cargan vía CDN en `index.html`, no son una dependencia de npm.
* **Lenis**: Desplazamiento suave (smooth scrolling) acelerado por hardware para una experiencia de usuario (UX) premium. También se carga vía CDN, no es una dependencia de npm.
* **Canvas API**: Sistemas de partículas de fondo generados de manera procedimental.

## 📁 Estructura de Archivos
```
marcus-escalona-portfolio/
├── index.html                  # Marcado de página única, todas las secciones
├── main.js                     # Toda la lógica de la aplicación (i18n, galería, modales, partículas)
├── styles.css                  # Todos los estilos
├── scripts/
│   └── generate-jsonld.js      # Regenera los bloques JSON-LD/noscript en index.html a partir de projectsData en main.js
├── assets/                     # Imágenes, videos, CVs, favicons
├── package.json
└── LICENSE
```

## 🛠 Instalación y Desarrollo Local
Para ejecutar este proyecto localmente y evitar problemas de CORS:
1. Clona el repositorio.
2. Ejecuta `npm install` - esto solo instala [`serve`](https://www.npmjs.com/package/serve), el servidor local de archivos estáticos. GSAP, ScrollTrigger y Lenis se cargan desde un CDN en `index.html`, no desde npm.
3. Ejecuta `npm start`.
