/**
 * ========================================================
 * @project Marcus Escalona Portfolio
 * @author Marcus Escalona (github.com/MarcusPicazo)
 * @description Core logic, 3D animations, and GSAP transitions.
 * @copyright 2026 Marco Escalona
 * ========================================================
 */

gsap.registerPlugin(ScrollTrigger);

// ACTIVACIÓN DE ACELERACIÓN POR HARDWARE GLOBAL (GPU)
gsap.defaults({ force3D: true });

let currentLang = "en";
let currentOpenProjectIndex = null;
let savedScrollPosition = 0;

const allLangsConfig = [
  { id: "en", short: "EN", long: "GLISH" },
  { id: "es", short: "ES", long: "PAÑOL" },
  { id: "it", short: "IT", long: "ALIANO" },
  { id: "ca", short: "CA", long: "TALÀ" },
];

const translations = {
  en: {
    role: "PRODUCT ENGINEER", aboutBtn: "About Me", aboutTitle: "About Me", techTitle: "Tech Stack", langTitle: "Languages & Communication",
    techCat1: "Data & Logic (The Physics side)", techCat2: "Interactive Interfaces (The Music and Creativity side)", techCat3: "Real-Time Architecture (The Engineering side)",
    contextText: "SELECTED WORK<br>EdTech · Real-time Systems<br>Interactive Web Products",
    aboutText: "I am a British-Mexican Product Engineer specializing in the intersection of EdTech and interactive web systems. My background in physics and music defines my approach to software development: I tackle data architectures with scientific rigor and precision, while designing immersive interfaces with creativity and fluidity.<br><br>Through my experience teaching computer science, I have learned to reduce cognitive friction in digital environments. I am dedicated to building complete ecosystems—from real-time gamified platforms to in-browser 3D environments—transforming technical complexity into intuitive, stable, and high-impact learning tools.<br><br>To bring these platforms to life and analyze their performance, I work with the following technological ecosystem:",
    closeBtn: "CLOSE", explore: "EXPLORE", visitLink: "Visit Application", sourceCode: "GitHub Repo", backToCatalog: "BACK TO CATALOG", email: "Email", linkedin: "LinkedIn", github: "GitHub", resume: "Resume", resumeEs: "Resume (ES)",
    skills: { en: { name: "English", lvl: "Native" }, es: { name: "Spanish", lvl: "Native" }, it: { name: "Italian", lvl: "B2" }, ca: { name: "Catalan", lvl: "B2" } },
  },
  es: {
    role: "PRODUCT ENGINEER", aboutBtn: "Sobre Mí", aboutTitle: "Sobre Mí", techTitle: "Tecnologías", langTitle: "Idiomas y Comunicación",
    techCat1: "Data & Logic (El lado de la Física)", techCat2: "Interactive Interfaces (El lado de la Música y la Creatividad)", techCat3: "Real-Time Architecture (El lado de la Ingeniería)",
    contextText: "TRABAJO DESTACADO<br>EdTech · Sistemas en Tiempo Real<br>Productos Web Interactivos",
    aboutText: "Soy un Product Engineer británico-mexicano especializado en la intersección entre EdTech y sistemas web interactivos. Mi formación academica en física, música e ingenieria en sistemas define mi enfoque hacia el desarrollo de software: abordo las arquitecturas de datos con rigor científico y precisión, mientras diseño interfaces inmersivas con creatividad y fluidez.<br><br>A través de mi experiencia enseñando ciencias de la computación, he aprendido a reducir la fricción cognitiva en entornos digitales. Me dedico a construir ecosistemas completos —desde plataformas gamificadas en tiempo real hasta entornos 3D en el navegador— transformando la complejidad técnica en herramientas de aprendizaje intuitivas, estables y de alto impacto.<br><br>Para dar vida a estas plataformas y analizar su rendimiento, trabajo con el siguiente ecosistema tecnológico:",
    closeBtn: "CERRAR", explore: "EXPLORAR", visitLink: "Visitar Aplicación", sourceCode: "Repositorio GitHub", backToCatalog: "VOLVER AL CATÁLOGO", email: "Email", linkedin: "LinkedIn", github: "GitHub", resume: "Currículum", resumeEs: "Currículum (ES)",
    skills: { en: { name: "Inglés", lvl: "Nativo" }, es: { name: "Español", lvl: "Nativo" }, it: { name: "Italiano", lvl: "B2" }, ca: { name: "Catalán", lvl: "B2" } },
  },
  it: {
    role: "PRODUCT ENGINEER", aboutBtn: "Su di Me", aboutTitle: "Su di Me", techTitle: "Tecnologie", langTitle: "Lingue e Comunicazione",
    techCat1: "Data & Logic (Il lato della Fisica)", techCat2: "Interactive Interfaces (Il lato della Musica e della Creatività)", techCat3: "Real-Time Architecture (Il lato dell'Ingegneria)",
    contextText: "LAVORI IN EVIDENZA<br>EdTech · Sistemi in Tempo Reale<br>Prodotti Web Interattivi",
    aboutText: "Sono un Product Engineer britannico-messicano specializzato nell'intersezione tra EdTech e sistemi web interattivi. La mia formazione in fisica e musica definisce il mio approccio allo sviluppo di software: affronto le architetture dei dati con rigore e precisione scientifica, mentre progetto interfacce immersive con creatività e fluidità.<br><br>Attraverso la mia esperienza nell'insegnamento dell'informatica, ho imparato a ridurre l'attrito cognitivo negli ambienti digitali. Mi dedico alla costruzione di ecosistemi completi — dalle piattaforme gamificate in tempo reale agli ambienti 3D nel browser — trasformando la complessità tecnica in strumenti di apprendimento intuitivi, stabili e di grande impatto.<br><br>Per dare vita a queste piattaforme e analizzare le loro prestazioni, lavoro con il seguente ecosistema tecnologico:",
    closeBtn: "CHIUDI", explore: "ESPLORA", visitLink: "Visita l'App", sourceCode: "Repo GitHub", backToCatalog: "TORNA AL CATALOGO", email: "Email", linkedin: "LinkedIn", github: "GitHub", resume: "Curriculum", resumeEs: "Curriculum (ES)",
    skills: { en: { name: "Inglese", lvl: "Madrelingua" }, es: { name: "Spagnolo", lvl: "Madrelingua" }, it: { name: "Italiano", lvl: "B2" }, ca: { name: "Catalano", lvl: "B2" } },
  },
  ca: {
    role: "PRODUCT ENGINEER", aboutBtn: "Sobre Mi", aboutTitle: "Sobre Mi", techTitle: "Tecnologies", langTitle: "Idiomes i Comunicació",
    techCat1: "Data & Logic (El costat de la Física)", techCat2: "Interactive Interfaces (El costat de la Música i la Creativitat)", techCat3: "Real-Time Architecture (El costat de l'Enginyeria)",
    contextText: "TREBALL DESTACAT<br>EdTech · Sistemes en Temps Real<br>Productes Web Interactius",
    aboutText: "Sóc un Product Engineer britànic-mexicà especialitzat en la intersecció entre EdTech i sistemes web interactius. La meva formació en física i música defineix el meu enfocament cap al desenvolupament de programari: abordo les arquitectures de dades amb rigor i precisió científica, mentre dissenyo interfícies immersives amb creativitat i fluïdesa.<br><br>A través de la meva experiència ensenyant ciències de la computació, he après a reduir la fricció cognitiva en entorns digitals. Em dedico a construir ecosistemi complets —des de plataformes gamificades en temps real fins a entorns 3D al navegador— transformant la complexitat tècnica en eines d'aprenentatge intuïtives, estables i d'alt impacte.<br><br>Per donar vida a aquestes plataformes i analitzar el seu rendiment, treballo amb el següent ecosistema tecnològic:",
    closeBtn: "TANCAR", explore: "EXPLORAR", visitLink: "Visitar Aplicació", sourceCode: "Repositori GitHub", backToCatalog: "TORNAR AL CATÀLEG", email: "Correu", linkedin: "LinkedIn", github: "GitHub", resume: "Currículum", resumeEs: "Currículum (ES)",
    skills: { en: { name: "Anglès", lvl: "Natiu" }, es: { name: "Espanyol", lvl: "Natiu" }, it: { name: "Italià", lvl: "B2" }, ca: { name: "Català", lvl: "B2" } },
  },
};

const projectsData = [
  {
    id: "solar",
    title: { en: "SOLAR SYSTEM", es: "SISTEMA SOLAR", it: "SISTEMA SOLARE", ca: "SISTEMA SOLAR" },
    color: "#1e1b4b", category: { en: "Science / Physics", es: "Ciencias / Física", it: "Scienza / Fisica", ca: "Ciències / Física" },
    desc: {
      en: 'An interactive 3D web experience developed to explore our stellar neighborhood. This educational project allows users to navigate through the solar system, learn fun facts about planets, and visualize procedurally generated textures in the browser.<br><br><strong>Key Features:</strong><br>• Interactive 3D Environment: Real-time rendering using Three.js.<br>• Procedural Textures: Planets and stars are generated using the Canvas 2D API, eliminating the need to load heavy image assets.<br>• Bilingual Support: Dynamic interface in English and Spanish.<br><br><strong>Technologies:</strong><br>HTML5, CSS3, Vanilla JavaScript, Three.js',
      es: 'Una experiencia web 3D interactiva desarrollada para explorar nuestro vecindario estelar. Este proyecto educativo permite a los usuarios navegar por el sistema solar, aprender datos curiosos sobre los planetas y visualizar texturas generadas procedimentalmente en el navegador.<br><br><strong>Características Clave:</strong><br>• Entorno 3D Interactivo: Renderizado en tiempo real usando Three.js.<br>• Texturas Procedimentales: Planetas y estrellas generados con la API Canvas 2D, eliminando la necesidad de cargar imágenes pesadas.<br>• Soporte Bilingüe: Interfaz dinámica en inglés y español.<br><br><strong>Tecnologías:</strong><br>HTML5, CSS3, Vanilla JavaScript, Three.js',
      it: 'Un\'esperienza web 3D interattiva sviluppata per esplorare il nostro vicinato stellare.', ca: 'Una experiència web 3D interactiva desenvolupada per explorar el nostre veïnatge estel·lar.'
    },
    link: "https://marcuspicazo.github.io/solar-system-ebvg/", repo: "https://github.com/MarcusPicazo/solar-system-ebvg",
    mainImg: "assets/solar-system/solar-ebvg.mp4",
    previewImg: "assets/previews/solar-system.jpg",
    detailImgs: ["assets/solar-system/solar-ebvg.mp4", "assets/solar-system/S1.png", "assets/solar-system/S2.png"]
  },
  {
    id: "ebvghoot",
    title: { en: "EBVG HOOT", es: "EBVG HOOT", it: "EBVG HOOT", ca: "EBVG HOOT" },
    color: "#3b0764", category: { en: "Tools / Education", es: "Herramientas / Educación", it: "Strumenti / Educazione", ca: "Eines / Educació" },
    desc: {
      en: "ebvg-hoot is a real-time interactive learning platform (Kahoot clone), developed exclusively to transform computer science education at the Berta von Glümer School.<br><br><strong>Architecture and Refactoring:</strong><br>The project was migrated from a monolithic prototype to a professional, scalable modular structure using Vite:<br>• Separation of Concerns (SoC): UI, business logic, and backend services are strictly separated.<br>• Custom Hooks: Complex Firebase logic (WebSockets, Auth, Storage) extracted into reusable hooks.<br>• Modular Components: UI broken down into clean presentational components.<br>• Asset Optimization: Implementation of Three.js via NPM for high-performance background animations.<br><br><strong>Tech Stack:</strong><br>Frontend: React.js, Tailwind CSS, Three.js, Lucide React.<br>Backend as a Service: Firebase (Anonymous Auth, Firestore, Cloud Storage).<br>Build Tool: Vite.",
      es: "ebvg-hoot es una plataforma de aprendizaje interactivo en tiempo real (clon de Kahoot), desarrollada exclusivamente para transformar la educación informática en la Escuela Berta von Glümer.<br><br><strong>Arquitectura y Refactorización:</strong><br>El proyecto migró de un prototipo monolítico a una estructura modular profesional usando Vite:<br>• Separación de Responsabilidades (SoC): UI, lógica de negocio y backend están estrictamente separados.<br>• Custom Hooks: Lógica compleja de Firebase extraída en hooks reutilizables.<br>• Componentes Modulares: UI dividida en componentes presentacionales limpios.<br>• Optimización de Assets: Implementación de Three.js para animaciones de alto rendimiento.<br><br><strong>Tecnologías:</strong><br>Frontend: React.js, Tailwind CSS, Three.js, Lucide React.<br>Backend: Firebase (Auth Anónimo, Firestore, Cloud Storage).<br>Build Tool: Vite.",
      it: "Piattaforma di apprendimento interattivo in tempo reale (clone di Kahoot).", ca: "Plataforma d'aprenentatge interactiu en temps real (clon de Kahoot)."
    },
    link: "https://marcuspicazo.github.io/ebvg-hoot/", repo: "https://github.com/MarcusPicazo/ebvg-hoot",
    mainImg: "assets/EBVGKAHOOT/EBVGHOOTPRODUCTVIDEO.mp4",
    previewImg: "assets/previews/ebvg-hoot.jpg",
    detailImgs: ["assets/EBVGKAHOOT/EBVGHOOTPRODUCTVIDEO.mp4", "assets/EBVGKAHOOT/K1.jpg", "assets/EBVGKAHOOT/K2.jpg", "assets/EBVGKAHOOT/K3.jpg", "assets/EBVGKAHOOT/K4.jpg", "assets/EBVGKAHOOT/K5.jpg", "assets/EBVGKAHOOT/ebvg-kahoot-demo.mp4"]
  },
{
    id: "citsync",
    title: { en: "CIT SYNC", es: "CIT SYNC", it: "CIT SYNC", ca: "CIT SYNC" },
    color: "#0f766e", category: { en: "Tools", es: "Herramientas", it: "Strumenti", ca: "Eines" },
    desc: {
      en: "A Serverless Single Page Application (SPA) designed to manage resources, laboratories, and software requests at the Berta von Glümer IT Center. The platform operates with minimal latency, providing a robust and secure ecosystem for educational administration.<br><br><strong>Key Features:</strong><br>• Lab Management: Reservation system with availability validation.<br>• App Factory: Module for educational software requests using strict data validation.<br>• Equipment Loans: Real-time hardware inventory control.<br>• Admin Dashboard: Centralized interface with role-based access.<br><br><strong>Tech Stack:</strong><br>React, Tailwind CSS, Vite, Firebase (Auth & Firestore).<br><br><div class=\"demo-note\"><strong>Demo Access:</strong> Use password <em>1234</em> for all users.<br>Please sign in with password only (do not use Google Sign-In).<br>This is a public demo version for portfolio viewing.<br>Isolated sandbox instance with mock data — not connected to any production system.</div>",
      es: "Una Single Page Application (SPA) Serverless diseñada para gestionar recursos, laboratorios y solicitudes de software en el Centro de Informática Berta von Glümer. La plataforma opera con latencia mínima, ofreciendo un ecosistema robusto y seguro para la administración educativa.<br><br><strong>Características Clave:</strong><br>• Gestión de Laboratorios: Sistema de reservas con validación de disponibilidad.<br>• Fábrica de Apps: Módulo de solicitudes de software con validación estricta de datos.<br>• Préstamos de Equipo: Control de inventario de hardware en tiempo real.<br>• Dashboard de Administración: Interfaz centralizada con separación de roles.<br><br><strong>Tecnologías:</strong><br>React, Tailwind CSS, Vite, Firebase (Auth & Firestore).<br><br><div class=\"demo-note\"><strong>Acceso Demo:</strong> Usa la contraseña <em>1234</em> para todos los usuarios.<br>Por favor inicia sesión solo con contraseña (no uses Google Sign-In).<br>Esta es una versión demo pública para visualización del portafolio.<br>Instancia sandbox aislada con datos ficticios — sin conexión a ningún sistema en producción.</div>",
      it: "Una Single Page Application (SPA) Serverless progettata per gestire risorse.<br><br><div class=\"demo-note\"><strong>Accesso Demo:</strong> Usa la password <em>1234</em> per tutti gli utenti.<br>Accedi solo con password (non usare Google Sign-In).<br>Questa è una versione demo pubblica per la visualizzazione del portfolio.<br>Istanza sandbox isolata con dati fittizi — non collegata ad alcun sistema di produzione.</div>",
      ca: "Una Single Page Application (SPA) Serverless dissenyada per gestionar recursos.<br><br><div class=\"demo-note\"><strong>Accés Demo:</strong> Utilitza la contrasenya <em>1234</em> per a tots els usuaris.<br>Si us plau, inicia sessió només amb contrasenya (no utilitzis Google Sign-In).<br>Aquesta és una versió de demostració pública per a la visualització del portafoli.<br>Instància sandbox aïllada amb dades fictícies — sense connexió a cap sistema de producció.</div>"
    },
    note: {
      en: "<strong>Developer Note:</strong> All interactive web apps, the digital whiteboard, and other tools integrated into this platform were developed entirely by me (Marcus Escalona) as part of my role creating academic solutions for the institution's classes.",
      es: "<strong>Nota del Desarrollador:</strong> Todas las aplicaciones web interactivas, la pizarra digital y demás herramientas integradas en esta plataforma fueron desarrolladas íntegramente por mí (Marcus Escalona), como parte de mi labor creando soluciones académicas para las clases de la institución.",
      it: "<strong>Nota dello Sviluppatore:</strong> Tutte le web app interattive, la lavagna digitale e altri strumenti integrati in questa piattaforma sono stati sviluppati interamente da me (Marcus Escalona) come parte del mio ruolo nella creazione di soluzioni accademiche per l'istituto.",
      ca: "<strong>Nota del Desenvolupador:</strong> Totes les aplicacions web interactives, la pissarra digital i altres eines integrades en aquesta plataforma van ser desenvolupades íntegrament per mi (Marcus Escalona) com a part de la meva tasca creant solucions acadèmiques per a la institució."
    },
    link: "https://marcuspicazo.github.io/cit-sync/", repo: "https://github.com/MarcusPicazo/cit-sync",
    mainImg: "assets/CITSYNC/CitSyncVideo.mp4", 
    previewImg: "assets/previews/CITSYNCPREVIEW.png",
    detailImgs: ["assets/CITSYNC/CitSyncVideo.mp4", "assets/CITSYNC/CS1.png", "assets/CITSYNC/CS2.png", "assets/CITSYNC/CS3.png", "assets/CITSYNC/CS4.png"]
  },
  {
    id: "lavaebvg",
    title: { en: "LAVA EBVG", es: "LAVA EBVG", it: "LAVA EBVG", ca: "LAVA EBVG" },
    color: "#6b1307", category: { en: "Games / Education", es: "Juegos / Educación", it: "Giochi / Educazione", ca: "Jocs / Educació" },
    desc: {
      en: "An interactive 3D parkour web minigame, developed entirely with native web technologies and Three.js. Created as a gamified educational experience for the Berta von Glümer School (2025), it allows students to learn and answer questions about sci-fi and dystopian books while jumping between platforms. This project reflects the intersection between systems engineering and educational innovation.<br><br><strong>Technologies & Skills:</strong><br>• JavaScript (ES6+): Event-driven logic, custom physics, raycasting collision detection, and real-time i18n.<br>• Three.js / WebGL: Custom meshes, procedurally generated canvas textures, and animated lava shaders.<br>• HTML5 & CSS3: Modular architecture, UI overlays, and native CSS animations.<br>• Game Design: Advanced mechanics like Coyote Time, momentum multipliers, and dynamic death zones.",
      es: "Un minijuego web interactivo en 3D estilo Parkour, desarrollado íntegramente con tecnologías nativas web y Three.js. Creado como una experiencia gamificada para la escuela Berta von Glümer (2025), permite a los estudiantes responder preguntas sobre libros de ciencia ficción mientras saltan entre plataformas. Refleja la intersección entre ingeniería de sistemas e innovación educativa.<br><br><strong>Tecnologías y Habilidades:</strong><br>• JavaScript (ES6+): Lógica orientada a eventos, físicas personalizadas, colisiones por Raycasting e i18n en tiempo real.<br>• Three.js / WebGL: Mallas personalizadas, texturas procedurales (Canvas API) y shaders de lava animada.<br>• HTML5 & CSS3: Arquitectura modular, UI superpuesta y animaciones nativas.<br>• Game Design: Mecánicas avanzadas como Coyote Time, multiplicador de impulso y zonas de muerte dinámicas.",
      it: "Un minigioco web 3D interattivo in stile Parkour.", ca: "Un minijoc web 3D interactiu d'estil Parkour."
    },
    link: "https://marcuspicazo.github.io/lava-parkour-game-EBVG/", repo: "https://github.com/MarcusPicazo/lava-parkour-game-EBVG",
    mainImg: "assets/LAVA/Lava-no-questions.mp4", 
    previewImg: "assets/previews/lava.jpg",
    detailImgs: ["assets/LAVA/lava-questions.mp4", "assets/LAVA/LAVA1.png", "assets/LAVA/LAVA2.png", "assets/LAVA/LAVA3.png", "assets/LAVA/Lava-no-questions.mp4"]
  },
  {
    id: "artstudio",
    title: { en: "ART STUDIO", es: "ESTUDIO DE ARTE", it: "STUDIO D'ARTE", ca: "ESTUDI D'ART" },
    color: "#831843", category: { en: "Art", es: "Arte", it: "Arte", ca: "Art" },
    desc: {
      en: 'An interactive 3D web experience built to help elementary school students learn how to mix colors and draw creatively. Developed entirely as a browser-native application, it combines a dynamic UI with 3D rendering to create an engaging, gamified learning environment.<br><br><strong>Features:</strong><br>• 3D Interactive Environment: Built with Three.js to render a stylized nature scene with an interactive easel and an animated 3D owl character.<br>• Dynamic Raycasting Canvas: Raycaster-based interactions allow users to paint directly onto a 3D mesh.<br>• Color Mixing Logic: Logically combine different base colors to generate new ones on the fly.<br>• Bilingual Support & Guided Tutorial.<br><br><strong>Technologies Used:</strong><br>HTML5 & CSS3, JavaScript (ES6 Modules), Three.js / WebGL, HTML Canvas API.',
      es: 'Una experiencia web 3D interactiva construida para ayudar a estudiantes de primaria a aprender a mezclar colores y dibujar creativamente. Combina una UI dinámica con renderizado 3D para crear un entorno gamificado.<br><br><strong>Características:</strong><br>• Entorno 3D Interactivo: Construido con Three.js, incluye un caballete interactivo y un búho 3D animado.<br>• Canvas con Raycasting: Pinta directamente sobre un mesh 3D usando el ratón o toques.<br>• Lógica de Mezcla de Colores: Modo de mezcla incorporado para combinar colores base.<br>• Soporte Bilingüe y Tutorial Guiado.<br><br><strong>Tecnologías Utilizadas:</strong><br>HTML5 & CSS3, JavaScript (ES6 Modules), Three.js / WebGL, HTML Canvas API.',
      it: "Un'esperienza web 3D interattiva creata per aiutare gli studenti.", ca: "Una experiència web 3D interactiva construïda per ajudar els estudiants."
    },
    link: "https://marcuspicazo.github.io/art-studio-ebvg/", repo: "https://github.com/MarcusPicazo/art-studio-ebvg",
    mainImg: "assets/ARTSTUDIO/EBVGARTSTUDIO.mp4", 
    previewImg: "assets/previews/art-studio.jpg",
    detailImgs: ["assets/ARTSTUDIO/EBVGARTSTUDIO.mp4", "assets/ARTSTUDIO/A1.png", "assets/ARTSTUDIO/K2.png", "assets/ARTSTUDIO/K3.png"]
  },
  {
    id: "renaissance",
    title: { en: "RENAISSANCE", es: "RENACIMIENTO", it: "RINASCIMENTO", ca: "RENAIXEMENT" },
    color: "#166534", 
    category: { en: "Art / History", es: "Arte / Historia", it: "Arte / Storia", ca: "Art / Història" },
    desc: {
      en: 'An immersive, interactive 3D web application developed for the art students of the Berta von Glümer School (EBVG). This educational project allows users to navigate through a virtual museum featuring iconic Renaissance masterpieces, learning about history and art techniques through an interactive owl guide.<br><br><strong>Technologies & Technical Skills:</strong><br>• Core: HTML5, CSS3, JavaScript (ES6+)<br>• 3D Library: Three.js (WebGL rendering, Lighting, Raycasting, Physics/Collisions)<br>• Controls: PointerLockControls for first-person navigation (Desktop & Mobile touch support)<br>• Architecture: Modular component-based logic, clean separation of concerns.',
      es: 'Una aplicación web 3D inmersiva e interactiva desarrollada para estudiantes de arte de la Escuela Berta von Glümer (EBVG). Este proyecto educativo permite navegar por un museo virtual con obras maestras del Renacimiento, aprendiendo técnicas de historia y arte a través de un búho guía interactivo.<br><br><strong>Tecnologías y Habilidades:</strong><br>• Core: HTML5, CSS3, JavaScript (ES6+)<br>• Librería 3D: Three.js (Renderizado WebGL, Iluminación, Raycasting, Físicas/Colisiones)<br>• Controles: PointerLockControls para navegación en primera persona.<br>• Arquitectura: Lógica basada en componentes modulares.',
      it: "Museo virtuale 3D interattivo con capolavori.", ca: "Museu virtual 3D interactiu amb obres mestres."
    },
    link: "https://marcuspicazo.github.io/ebvg-renaissance-gallery/", repo: "https://github.com/MarcusPicazo/ebvg-renaissance-gallery",
    mainImg: "assets/RENACIMIENTO/GALLERYVIDEO.mp4", 
    previewImg: "assets/previews/renaissance.jpg",
    detailImgs: ["assets/RENACIMIENTO/GALLERYVIDEO.mp4", "assets/RENACIMIENTO/GALLERY1.png", "assets/RENACIMIENTO/GALLERY2.png", "assets/RENACIMIENTO/GALLERY3.png"]
  },
  {
    id: "dna",
    title: { en: "DNA STRUCTURE", es: "EL ADN", it: "STRUTTURA DEL DNA", ca: "L'ADN" },
    color: "#7f1d1d", 
    category: { en: "Science / Biology", es: "Ciencias / Biología", it: "Scienza / Biologia", ca: "Ciències / Biologia" },
    desc: {
      en: 'DNA Journey is an interactive 3D web application designed to explore the molecular architecture of human DNA. Developed as a high-fidelity digital documentation tool, it allows users to navigate through a meticulously constructed 3D double helix, inspecting key biological components.<br><br><strong>Technical Highlights:</strong><br>• 3D Rendering: Implementation of Three.js for complex geometry generation, dynamic lighting, and particle environments.<br>• Cinematic Animations: Utilization of GSAP to manage precise camera movements and UI interactions tied to scroll events.<br>• Modern UI: Styled with Tailwind CSS to achieve a sci-fi, scientific, and immersive interface.<br>• Modular Architecture: Clean separation of concerns (HTML, CSS, JS).',
      es: 'DNA Journey es una aplicación web 3D interactiva diseñada para explorar la arquitectura molecular del ADN humano. Permite a los usuarios navegar a través de una doble hélice 3D construida meticulosamente para inspeccionar componentes biológicos clave.<br><br><strong>Aspectos Técnicos:</strong><br>• Renderizado 3D: Implementación de Three.js para generación de geometría compleja, iluminación dinámica y partículas.<br>• Animaciones Cinemáticas: Uso de GSAP para gestionar movimientos precisos de cámara ligados a eventos de scroll.<br>• UI Moderna: Estilizado con Tailwind CSS para lograr una interfaz de ciencia ficción inmersiva.<br>• Arquitectura Modular: Separación limpia de código (HTML, CSS, JS).',
      it: "Applicazione web 3D interattiva progettata per esplorare il DNA.", ca: "Aplicació web 3D interactiva dissenyada per explorar l'ADN."
    },
    link: "https://marcuspicazo.github.io/dna-journey-ebvg/", repo: "https://github.com/MarcusPicazo/dna-journey-ebvg",
    mainImg: "assets/DNA/DNAVIDEO.mp4", 
    previewImg: "assets/previews/dna.png",
    detailImgs: ["assets/DNA/DNAVIDEO.mp4", "assets/DNA/DNA1.png", "assets/DNA/DNA2.png"]
  },
  {
    id: "arcade",
    title: { en: "STUDENT ARCADE", es: "STUDENT ARCADE", it: "STUDENT ARCADE", ca: "STUDENT ARCADE" },
    color: "#4c1d95", category: { en: "Games / Gallery", es: "Juegos / Galería", it: "Giochi / Galleria", ca: "Jocs / Galeria" },
    desc: {
      en: "An interactive 3D virtual exhibition hall designed to showcase the amazing technical projects created by my elementary and middle school computer science students. As their teacher, I taught them how to build their games and websites from scratch. We then collaboratively built this 3D gallery together, with me leading the development, to highlight our favorite projects. Step inside and explore the creativity of the next generation of developers!<br><br><strong>Features:</strong><br>• First-Person 3D Navigation: Explore using WASD and mouse controls.<br>• Three Interactive Rooms: Dedicated spaces for Arcade Games, Web Development, and UX Design.<br>• Figma-Style UX Canvas: Infinite canvas with drag-to-scroll to explore full-scale app mockups.<br>• Bilingual UI: Real-time toggling between English and Spanish.<br><br><strong>Technologies Used:</strong><br>HTML5, CSS3, JavaScript (ES6+), Three.js (WebGL), Tailwind CSS, Panzoom.",
      es: "Una sala de exposición virtual en 3D diseñada para mostrar los increíbles proyectos técnicos creados por mis estudiantes de primaria y secundaria. Como su profesor, les enseñé a desarrollar sus juegos y sitios web desde cero, y luego construimos colaborativamente esta galería 3D, bajo mi liderazgo técnico, para destacar nuestros proyectos favoritos. ¡Entra y explora la creatividad de la próxima generación de desarrolladores!<br><br><strong>Características:</strong><br>• Navegación 3D en Primera Persona: Controles WASD y ratón.<br>• Tres Salas Interactivas: Espacios para Juegos Arcade, Desarrollo Web y Diseño UX.<br>• Canvas UX estilo Figma: Lienzo infinito interactivo para explorar mockups a escala real.<br>• UI Bilingüe: Alternancia en tiempo real entre Inglés y Español.<br><br><strong>Tecnologías:</strong><br>HTML5, CSS3, JavaScript (ES6+), Three.js (WebGL), Tailwind CSS, Panzoom.",
      it: "Galleria 3D interattiva costruita in collaborazione con i miei studenti.", ca: "Galeria 3D interactiva construïda en col·laboració amb els meus estudiants."
    },
    link: "https://marcuspicazo.github.io/3d-student-portfolio/", repo: "https://github.com/MarcusPicazo/3d-student-portfolio",
    mainImg: "assets/ARCADE/ARCADEVIDEO.mp4",
    previewImg: "assets/previews/arcade.jpg",
    detailImgs: ["assets/ARCADE/ARCADEVIDEO.mp4", "assets/ARCADE/ARC1.png", "assets/ARCADE/ARC2.png", "assets/ARCADE/ARC3.png"]
  },
  {
    id: "taylor",
    title: { en: "TAYLOR", es: "TAYLOR", it: "TAYLOR", ca: "TAYLOR" },
    color: "#9d174d", category: { en: "Startup / Safe Mobility", es: "Startup / Movilidad Segura", it: "Startup / Mobilità Sicura", ca: "Startup / Mobilitat Segura" },
    desc: {
      en: "Taylor is a safety-first mobility platform for LATAM, built around real-time identity verification, encrypted trip monitoring, and trusted-contact safety tools - with dedicated experiences for riders, drivers, and institutional partners like schools and businesses. I co-founded Taylor and built the marketing site's core architecture and scroll-driven experience.<br><br><strong>Key Features:</strong><br>• Universal Verification: Real-time biometric facial matching linked to official IDs before every trip.<br>• Total Traceability: Encrypted GPS monitoring with consented, active audio assistance.<br>• 911 Integration: Direct connection with authorities on route anomalies.<br>• Social Impact: A share of every trip funds education programs for women in LATAM.<br><br><strong>Technologies:</strong><br>Tailwind CSS, Three.js (WebGL backgrounds), GSAP &amp; ScrollTrigger, Lenis, Chart.js.",
      es: "Taylor es una plataforma de movilidad enfocada en seguridad para LATAM, construida sobre verificación de identidad en tiempo real, monitoreo cifrado de viajes y herramientas de contactos de confianza - con experiencias dedicadas para pasajeros, conductores y socios institucionales como escuelas y empresas. Cofundé Taylor y construí la arquitectura central y la experiencia scroll-driven del sitio.<br><br><strong>Características Clave:</strong><br>• Verificación Universal: Coincidencia biométrica facial en tiempo real vinculada a identificaciones oficiales antes de cada viaje.<br>• Trazabilidad Total: Monitoreo GPS cifrado con asistencia de audio activa y consentida.<br>• Integración con el 911: Conexión directa con autoridades ante anomalías de ruta.<br>• Impacto Social: Parte de cada viaje financia programas educativos para mujeres en LATAM.<br><br><strong>Tecnologías:</strong><br>Tailwind CSS, Three.js (fondos WebGL), GSAP y ScrollTrigger, Lenis, Chart.js.",
      it: "Piattaforma di mobilità sicura per l'America Latina, cofondata e sviluppata con verifica dell'identità e monitoraggio dei viaggi in tempo reale.", ca: "Plataforma de mobilitat segura per a Llatinoamèrica, cofundada i desenvolupada amb verificació d'identitat i seguiment de viatges en temps real."
    },
    link: "https://apptaylor.com/", repo: "https://github.com/MarcusPicazo/Taylor-Website",
    mainImg: "assets/taylor/taylor-video.mp4",
    previewImg: "assets/taylor/taylor-placeholder.svg",
    detailImgs: ["assets/taylor/taylor-placeholder.svg", "assets/taylor/taylor-video.mp4"]
  },
  {
    id: "taylor-app",
    title: { en: "TAYLOR APP", es: "TAYLOR APP", it: "TAYLOR APP", ca: "TAYLOR APP" },
    color: "#FF3E81", category: { en: "Startup / Mobile App", es: "Startup / App Móvil", it: "Startup / App Mobile", ca: "Startup / App Mòbil" },
    desc: {
      en: "Taylor's mobile app (Flutter, iOS &amp; Android) is the product I lead as CTO &amp; CPO - a single app with three modes: Passenger, Driver, and Business. The tone is protective but modern: the product communicates protection, never fear.<br><br><strong>Key Features:</strong><br>• Passenger: live map, real address search, three ride tiers (Go / Pro / Max), live driver tracking, and a Safety tab (SOS, live location sharing, emergency contacts).<br>• Driver: online status, ride requests with an acceptance countdown, slide-to-confirm trip lifecycle, transparent earnings breakdown.<br>• Business (B2B): recurring night-shift scheduling and a live \"Tonight\" board, so companies know everyone got home safely.<br><br><strong>Technologies:</strong><br>Flutter &amp; Dart, Riverpod, go_router, Google Maps SDK &amp; Places API, geolocator, Firebase Cloud Firestore, Lottie &amp; custom CustomPainter animations. Identity verification (face + document recognition) is designed into onboarding and planned on the AI roadmap.",
      es: "La app móvil de Taylor (Flutter, iOS y Android) es el producto que lidero como CTO y CPO - una sola app con tres modos: Pasajera, Conductora y Empresas. El tono es protector pero moderno: el producto comunica protección, nunca miedo.<br><br><strong>Características Clave:</strong><br>• Pasajera: mapa en vivo, búsqueda real de direcciones, tres niveles de viaje (Go / Pro / Max), seguimiento en vivo del conductor y una pestaña de Seguridad (SOS, compartir ubicación en vivo, contactos de emergencia).<br>• Conductora: estado en línea, solicitudes de viaje con cuenta regresiva de aceptación, ciclo de vida del viaje por deslizamiento, desglose transparente de ganancias.<br>• Empresas (B2B): programación recurrente de turnos nocturnos y un tablero \"Esta Noche\" en vivo, para que las empresas sepan que todo su equipo llegó bien a casa.<br><br><strong>Tecnologías:</strong><br>Flutter y Dart, Riverpod, go_router, Google Maps SDK y Places API, geolocator, Firebase Cloud Firestore, Lottie y animaciones personalizadas con CustomPainter. La verificación de identidad (reconocimiento facial y de documentos) está diseñada en el onboarding y planeada en el roadmap de IA.",
      it: "L'app mobile di Taylor (Flutter, iOS e Android) con tre modalità: Passeggera, Conducente e Aziende, progettata per la sicurezza delle donne.", ca: "L'app mòbil de Taylor (Flutter, iOS i Android) amb tres modes: Passatgera, Conductora i Empreses, dissenyada per a la seguretat de les dones."
    },
    repo: "https://github.com/MarcusPicazo/Taylor-App",
    mainImg: "assets/taylor-app/taylor-app-1.jpg",
    previewImg: "assets/taylor-app/taylor-app-1.jpg",
    detailImgs: ["assets/taylor-app/taylor-app-1.jpg"]
  },
  {
    id: "taylor-desktop",
    title: { en: "TAYLOR DESKTOP", es: "TAYLOR DESKTOP", it: "TAYLOR DESKTOP", ca: "TAYLOR DESKTOP" },
    color: "#1A1A1A", category: { en: "Startup / Desktop Tool", es: "Startup / Herramienta de Escritorio", it: "Startup / Strumento Desktop", ca: "Startup / Eina d'Escriptori" },
    desc: {
      en: "Taylor Business Desktop is a Windows/macOS panel for the companies and schools that use Taylor, letting the account owner track their team's rides live, schedule recurring routes, manage staff, and review history and billing from one place.<br><br><strong>Key Features:</strong><br>• Tonight: live tracking of the night's rides as a list, kanban board, or real-time map, with no-show alerts.<br>• Schedule: recurring ride series by day/time/route, list or monthly calendar view.<br>• Team: add or deactivate employees/students, search, profile photos.<br>• Account: company details, Taylor Credits wallet, payment methods, dark/light theme, Spanish and English.<br><br><strong>Technologies:</strong><br>Flutter (Windows &amp; macOS desktop), Google Maps via WebView2.<br><br><div class=\"demo-note\"><strong>Note:</strong> Runs on simulated data (no live backend yet) - a fully working, end-to-end panel built for product demos and usability testing, not production use.</div>",
      es: "Taylor Business Desktop es un panel para Windows/macOS pensado para las empresas y escuelas que usan Taylor, permitiendo a la persona responsable de la cuenta rastrear los viajes de su equipo en vivo, programar rutas recurrentes, gestionar personal y revisar historial y facturación desde un solo lugar.<br><br><strong>Características Clave:</strong><br>• Esta Noche: seguimiento en vivo de los viajes de la noche como lista, tablero kanban o mapa en tiempo real, con alertas de inasistencia.<br>• Programación: series de viajes recurrentes por día/hora/ruta, vista de lista o calendario mensual.<br>• Equipo: agregar o desactivar empleados/estudiantes, búsqueda, fotos de perfil.<br>• Cuenta: datos de la empresa, monedero de Taylor Credits, métodos de pago, tema claro/oscuro, español e inglés.<br><br><strong>Tecnologías:</strong><br>Flutter (escritorio Windows y macOS), Google Maps vía WebView2.<br><br><div class=\"demo-note\"><strong>Nota:</strong> Funciona con datos simulados (aún sin backend en vivo) - un panel completamente funcional de principio a fin, construido para demos de producto y pruebas de usabilidad, no para producción.</div>",
      it: "Pannello Windows/macOS per aziende e scuole che usano Taylor, per tracciare le corse del team, programmare turni e gestire il personale.", ca: "Panell Windows/macOS per a empreses i escoles que usen Taylor, per fer seguiment dels trajectes de l'equip, programar torns i gestionar el personal."
    },
    link: "https://apptaylor.com/app/taylor-business-desktop-demo.zip", repo: "https://github.com/MarcusPicazo/Taylor-Desktop",
    mainImg: "assets/taylor-desktop/taylor-desktop-1.jpg",
    previewImg: "assets/taylor-desktop/taylor-desktop-1.jpg",
    detailImgs: ["assets/taylor-desktop/taylor-desktop-dashboard.jpg", "assets/taylor-desktop/taylor-desktop-agenda.jpg"]
  },
  {
    id: "nimio",
    title: { en: "NIMIO LEVELS", es: "NIMIO LEVELS", it: "NIMIO LEVELS", ca: "NIMIO LEVELS" },
    color: "#155e75", category: { en: "Tools / Internal Platform", es: "Herramientas / Plataforma Interna", it: "Strumenti / Piattaforma Interna", ca: "Eines / Plataforma Interna" },
    desc: {
      en: "Nimio Levels is a private, full-stack internal platform I built to manage team motivation: point tracking, level progression, custom avatars, and reward redemptions. Sensitive operations and approvals are handled server-side through signed HTTP-only cookies and Postgres row-level security.<br><br><strong>Key Features:</strong><br>• Role-Based Access: Separate flows for Admins (email/password) and Members (hashed personal access codes, never stored in plain text).<br>• Point &amp; Reward Ecosystem: Members submit point requests with private evidence; Admins approve, adjust, or reject them.<br>• Dynamic Progression: Member levels are calculated from historical points, unlocking custom avatars and GIFs without losing progress when points are spent.<br>• Admin Dashboard: User, reward, and point-ledger management with CSV report exports.<br><br><strong>Technologies:</strong><br>Next.js (App Router &amp; Server Actions), TypeScript, Tailwind CSS, Supabase (Postgres, RLS, pgcrypto, Storage).<br><br><div class=\"demo-note\"><strong>Note:</strong> Nimio Levels is a private, internal tool - the live link requires a personal access code and isn't publicly browsable. See the GitHub repo for the full write-up.</div>",
      es: "Nimio Levels es una plataforma interna privada y full-stack que construí para gestionar la motivación del equipo: seguimiento de puntos, progresión de niveles, avatares personalizados y canje de recompensas. Las operaciones sensibles se manejan del lado del servidor mediante cookies HTTP-only firmadas y row-level security en Postgres.<br><br><strong>Características Clave:</strong><br>• Acceso por Roles: Flujos separados para Administradores (correo/contraseña) y Miembros (códigos de acceso personales hasheados, nunca en texto plano).<br>• Ecosistema de Puntos y Recompensas: Los miembros solicitan puntos con evidencia privada; los administradores aprueban, ajustan o rechazan.<br>• Progresión Dinámica: Los niveles se calculan según el historial de puntos, desbloqueando avatares y GIFs sin perder progreso al gastar puntos.<br>• Dashboard de Administración: Gestión de usuarios, recompensas y libro de puntos, con exportación de reportes CSV.<br><br><strong>Tecnologías:</strong><br>Next.js (App Router y Server Actions), TypeScript, Tailwind CSS, Supabase (Postgres, RLS, pgcrypto, Storage).<br><br><div class=\"demo-note\"><strong>Nota:</strong> Nimio Levels es una herramienta interna y privada - el enlace en vivo requiere un código de acceso personal y no es navegable públicamente. Consulta el repositorio de GitHub para el detalle completo.</div>",
      it: "Piattaforma interna privata per gestire punti, livelli, avatar e ricompense del team, con accesso tramite codici hashati.", ca: "Plataforma interna privada per gestionar punts, nivells, avatars i recompenses de l'equip, amb accés mitjançant codis hashejats."
    },
    link: "https://nimio-levels.netlify.app/login", repo: "https://github.com/MarcusPicazo/NIO-INTERNAL",
    mainImg: "assets/nimio/nimio-placeholder.svg",
    previewImg: "assets/nimio/nimio-placeholder.svg",
    detailImgs: ["assets/nimio/nimio-placeholder.svg"]
  }
];

function renderLangOptions() {
  const container = document.getElementById("lang-options-container");
  if(!container) return;
  container.innerHTML = "";
  allLangsConfig.forEach((lang) => {
    if (lang.id !== currentLang) container.innerHTML += `<button type="button" class="lang-opt animated-underline" data-lang="${lang.id}">${lang.short}${lang.long}</button>`;
  });
  document.querySelectorAll(".lang-opt").forEach((btn) => {
    btn.addEventListener("click", (e) => { e.preventDefault(); const selectedLang = btn.getAttribute("data-lang"); if (selectedLang === currentLang) return; triggerLanguageWipe(selectedLang); });
    btn.addEventListener("mouseover", () => { if(cursor) cursor.classList.add("hovered"); });
    btn.addEventListener("mouseout", () => { if(cursor) cursor.classList.remove("hovered"); });
  });
}

function updateUI_Language() {
  const t = translations[currentLang];
  const setEl = (id, val) => { const el = document.getElementById(id); if(el) el.innerHTML = val; };
  setEl("pl-role", t.role); setEl("open-about-btn", t.aboutBtn); setEl("about-title", t.aboutTitle);
  setEl("tech-cat-1", t.techCat1); setEl("tech-cat-2", t.techCat2); setEl("tech-cat-3", t.techCat3);
  setEl("about-title-lang", t.langTitle); setEl("about-text-container", t.aboutText); setEl("context-text", t.contextText);
  setEl("skill-1-name", t.skills.en.name); setEl("skill-1-lvl", t.skills.en.lvl); setEl("skill-2-name", t.skills.es.name); setEl("skill-2-lvl", t.skills.es.lvl);
  setEl("skill-3-name", t.skills.it.name); setEl("skill-3-lvl", t.skills.it.lvl); setEl("skill-4-name", t.skills.ca.name); setEl("skill-4-lvl", t.skills.ca.lvl);

  document.querySelectorAll(".about-btn-text").forEach((el) => el.innerText = t.closeBtn);
  document.querySelectorAll(".btn-text").forEach((el) => el.innerText = t.backToCatalog);
  document.querySelectorAll(".det-link-text-node").forEach(el => el.innerText = t.visitLink);
  document.querySelectorAll(".det-repo-text-node").forEach(el => el.innerText = t.sourceCode);
  setEl("footer-email", t.email); setEl("footer-linkedin", t.linkedin); setEl("footer-github", t.github); setEl("footer-resume", t.resume); setEl("footer-resume-es", t.resumeEs);

  const activeLangConfig = allLangsConfig.find((l) => l.id === currentLang);
  if(activeLangConfig) { setEl("lang-short", activeLangConfig.short); setEl("lang-long", activeLangConfig.long); }

  document.querySelectorAll(".gallery-item").forEach((item, index) => {
    const data = projectsData[index];
    if(!data) return;
    const cat = item.querySelector(".item-category"); if(cat) cat.innerText = data.category[currentLang];
    const tit = item.querySelector(".item-title"); if(tit) tit.innerText = data.title[currentLang];
    const exp = item.querySelector(".explore-text"); if(exp) exp.innerText = t.explore;
  });

  if (currentOpenProjectIndex !== null) {
    const data = projectsData[currentOpenProjectIndex];
    setEl("det-title", data.title[currentLang]); 
    setEl("det-desc", data.desc[currentLang]);
    const noteEl = document.getElementById("det-note");
    if (noteEl && data.note) { noteEl.innerHTML = data.note[currentLang]; }
  }
}

function triggerLanguageWipe(newLang) {
  const targets = document.querySelectorAll(".lang-wipe-target");
  gsap.fromTo(targets, 
    { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", webkitClipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" },
    { clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)", webkitClipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)", duration: 0.4, ease: "power3.inOut",
    onComplete: () => {
      currentLang = newLang; document.documentElement.lang = newLang; updateUI_Language(); renderLangOptions();
      gsap.fromTo(targets, 
        { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)", webkitClipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }, 
        { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", webkitClipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", duration: 0.4, ease: "power3.inOut" }
      );
    },
  });
}

const cursor = document.getElementById("custom-cursor");
let cursorVisible = false, mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2, cursorX = mouseX, cursorY = mouseY;
window.addEventListener("mousemove", (e) => {
  if (cursor && !cursorVisible) { gsap.to(cursor, { opacity: 1, duration: 0.3 }); cursorVisible = true; }
  mouseX = e.clientX; mouseY = e.clientY;
});
gsap.ticker.add(() => {
  if(!cursor) return;
  cursorX += (mouseX - cursorX) * 0.6; cursorY += (mouseY - cursorY) * 0.6;
  cursor.style.transform = `translate(calc(${cursorX}px - 50%), calc(${cursorY}px - 50%))`;
});
document.addEventListener("mouseover", (e) => {
  if (cursor && e.target.closest("a, button, .gallery-item, .thumb-item, .nav-info, .close-btn, .close-about-btn, .visit-link, .lang-opt, .tech-tag")) { cursor.classList.add("hovered"); } else if (cursor) { cursor.classList.remove("hovered"); }
});
const pCanvas = document.getElementById("project-particles"); const pCtx = pCanvas ? pCanvas.getContext("2d") : null;
const aCanvas = document.getElementById("about-particles"); const aCtx = aCanvas ? aCanvas.getContext("2d") : null;
let pWidth, pHeight, projParticles = [], aWidth, aHeight, aboutParticles = [];

function initParticlesSystems() {
  if(pCanvas) { pWidth = pCanvas.width = window.innerWidth; pHeight = pCanvas.height = window.innerHeight; projParticles = []; for (let i = 0; i < 90; i++) projParticles.push({ x: Math.random() * pWidth, y: Math.random() * pHeight, r: Math.random() * 1.5 + 0.5, vx: (Math.random() - 0.5) * 0.3, vy: -0.2 - Math.random() * 0.4, baseAlpha: Math.random() * 0.4 + 0.2 }); }
  if(aCanvas) { aWidth = aCanvas.width = window.innerWidth; aHeight = aCanvas.height = window.innerHeight; aboutParticles = []; for (let i = 0; i < 80; i++) aboutParticles.push({ x: Math.random() * aWidth, y: Math.random() * aHeight, r: Math.random() * 1.5 + 0.5, vx: (Math.random() - 0.5) * 0.3, vy: -0.1 - Math.random() * 0.3, baseAlpha: Math.random() * 0.4 + 0.1 }); }
}
function drawParticles() {
  if(pCtx) { pCtx.clearRect(0, 0, pWidth, pHeight); projParticles.forEach((p) => { p.x += p.vx; p.y += p.vy; if (p.x < 0) p.x = pWidth; if (p.x > pWidth) p.x = 0; if (p.y < 0) p.y = pHeight; if (p.y > pHeight) p.y = 0; pCtx.beginPath(); pCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2); pCtx.fillStyle = `rgba(255, 255, 255, ${p.baseAlpha * Math.pow(1 - p.y / pHeight, 1.5)})`; pCtx.fill(); }); }
  if(aCtx) { aCtx.clearRect(0, 0, aWidth, aHeight); aboutParticles.forEach((p) => { p.x += p.vx; p.y += p.vy; if (p.x < 0) p.x = aWidth; if (p.x > aWidth) p.x = 0; if (p.y < 0) p.y = aHeight; if (p.y > aHeight) p.y = 0; aCtx.beginPath(); aCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2); aCtx.fillStyle = `rgba(255, 255, 255, ${p.baseAlpha})`; aCtx.fill(); }); }
  requestAnimationFrame(drawParticles);
}
initParticlesSystems(); drawParticles(); window.addEventListener("resize", initParticlesSystems);

const track = document.querySelector(".gallery-track");
const bgLayer = document.querySelector(".bg-layer");
const titleContainer = document.getElementById("dynamic-title");

if (track) {
  projectsData.forEach((proj, index) => {
    const isVideo = proj.mainImg.match(/\.(mp4|webm)$/i);
    const posterImg = proj.previewImg; 
    
    let mediaContent = `<img src="${posterImg}" alt="project img" class="gallery-poster">`;
    if (isVideo) {
        mediaContent += `<video src="${proj.mainImg}" loop muted playsinline preload="metadata" class="gallery-video"></video>`;
    }

    track.innerHTML += `<div class="gallery-item" data-index="${index}" data-id="${proj.id}"><div class="img-wrapper">${mediaContent}</div><div class="explore-indicator lang-wipe-target"><div class="explore-bg"></div><span class="explore-text">EXPLORE</span></div><div class="item-info"><span class="item-category lang-wipe-target">${proj.category.en}</span><h2 class="item-title lang-wipe-target">${proj.title.en}</h2></div></div>`;
  });
}

const items = document.querySelectorAll(".gallery-item");

if (titleContainer) gsap.to(titleContainer, { y: "-=15", duration: 5.5, repeat: -1, yoyo: true, ease: "sine.inOut" });

let floatTweens = [];

function startFloating() {
  floatTweens.forEach(t => t.kill());
  floatTweens = [];
  document.querySelectorAll(".img-wrapper").forEach((wrapper, index) => {
    const tween = gsap.to(wrapper, { y: -10, rotationZ: index % 2 === 0 ? 0.15 : -0.15, duration: 3.5 + (index % 2), repeat: -1, yoyo: true, ease: "sine.inOut", delay: index * 0.3 });
    floatTweens.push(tween);
  });
}

function stopFloatingAndAlign() {
  floatTweens.forEach(t => t.kill());
  floatTweens = [];
  gsap.to(".img-wrapper", { y: 0, rotationZ: 0, duration: 0.6, ease: "power2.out" });
}

startFloating();

const lenis = new Lenis({ duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smooth: true });
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0, 0);

function initGalleryScroll() {
  const itemsContainer = document.querySelector(".horizontal-section");
  const spectrumContainer = document.getElementById("spectrum");
  if(!itemsContainer || !spectrumContainer || !track) return;
  const totalBars = 40;
  for (let i = 0; i < totalBars; i++) {
    const bar = document.createElement("div"); bar.className = "spectrum-bar"; bar.style.height = `${6 + Math.random() * 12}px`; spectrumContainer.appendChild(bar);
  }
  const spectrumBars = document.querySelectorAll(".spectrum-bar");
  const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);
  gsap.to(track, { x: getScrollAmount, ease: "none", scrollTrigger: { trigger: itemsContainer, pin: true, scrub: 1, end: () => `+=${Math.abs(getScrollAmount()) * 2.5}`, invalidateOnRefresh: true, id: "galleryScroll", onUpdate: (self) => { const activeCount = Math.floor(self.progress * totalBars); spectrumBars.forEach((bar, index) => { if (index <= activeCount) bar.classList.add("active"); else bar.classList.remove("active"); }); } } });
}
initGalleryScroll();

let hoverIntentTimer;
items.forEach((item, index) => {
  const data = projectsData[index];
  const exploreBtn = item.querySelector(".explore-indicator");

  item.addEventListener("mouseenter", () => {
    clearTimeout(hoverIntentTimer);

    hoverIntentTimer = setTimeout(() => {
      if (currentOpenProjectIndex !== null) return;
      
      stopFloatingAndAlign();
      
      const vid = item.querySelector(".gallery-video");
      const poster = item.querySelector(".gallery-poster");
      if (vid) {
        vid.currentTime = 0;
        vid.play().then(() => { vid.style.opacity = 1; if (poster) poster.style.opacity = 0; }).catch(e => console.log("Autoplay mitigado"));
      }

      if(bgLayer) bgLayer.style.backgroundColor = data.color;
      if(titleContainer) {
        titleContainer.innerText = data.title[currentLang]; titleContainer.style.transform = "scale(1)"; titleContainer.style.fontSize = "100px";
        titleContainer.style.fontSize = `${100 * ((window.innerWidth * 0.99) / titleContainer.getBoundingClientRect().width)}px`;
        gsap.fromTo(titleContainer, { clipPath: "inset(0 50% 0 50%)", webkitClipPath: "inset(0 50% 0 50%)", opacity: 0 }, { clipPath: "inset(0 0% 0 0%)", webkitClipPath: "inset(0 0% 0 0%)", opacity: 1, duration: 0.8, ease: "power4.out", overwrite: "auto" });
      }

      gsap.to(items, { width: (i, el) => (el === item ? "36vw" : "7.2vw"), filter: (i, el) => el === item ? "grayscale(0%) brightness(1)" : "grayscale(100%) brightness(0.3)", duration: 0.8, ease: "power4.out", overwrite: "auto" });

      items.forEach((other) => {
        const imgWrap = other.querySelector(".img-wrapper");
        const info = other.querySelector(".item-info");
        const explore = other.querySelector(".explore-indicator");
        
        if (other === item) {
          if(imgWrap) gsap.to(imgWrap, { scale: 1, duration: 0.8, ease: "power4.out", overwrite: "auto" });
          if(info) gsap.to(info, { opacity: 1, y: 0, duration: 0.5, delay: 0.1, ease: "power4.out", overwrite: "auto" });
          if(explore) gsap.to(explore, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.5)", overwrite: "auto" });
        } else {
          if(imgWrap) gsap.to(imgWrap, { scale: 1, duration: 0.8, ease: "power4.out", overwrite: "auto" });
          if(info) gsap.to(info, { opacity: 0, y: 20, duration: 0.4, ease: "power4.out", overwrite: "auto" });
          if(explore) gsap.to(explore, { opacity: 0, scale: 0.5, duration: 0.4, ease: "power4.out", overwrite: "auto" });
        }
      });
    }, 75);
  });

  item.addEventListener("mouseleave", () => {
    clearTimeout(hoverIntentTimer); 
    const vid = item.querySelector(".gallery-video");
    const poster = item.querySelector(".gallery-poster");
    if (vid) { vid.pause(); vid.currentTime = 0; vid.style.opacity = 0; }
    if (poster) poster.style.opacity = 1;
  });

  item.addEventListener("click", () => {
    currentOpenProjectIndex = index; history.pushState({ detail: true, projectId: data.id }, "", "#" + data.id); openDetailView(data);
  });
});

if(track) {
  track.addEventListener("mouseleave", () => {
    clearTimeout(hoverIntentTimer); if (currentOpenProjectIndex !== null) return;
    
    startFloating();

    if(bgLayer) bgLayer.style.backgroundColor = "#141414";
    if(titleContainer) gsap.to(titleContainer, { clipPath: "inset(0 50% 0 50%)", webkitClipPath: "inset(0 50% 0 50%)", opacity: 0, duration: 0.4, ease: "power2.in", overwrite: "auto" });
    gsap.to(items, { width: "12vw", filter: "grayscale(100%) brightness(0.6)", duration: 0.8, ease: "power4.out", overwrite: "auto" });
    
    items.forEach((other) => {
      const imgWrap = other.querySelector(".img-wrapper");
      const info = other.querySelector(".item-info"), exp = other.querySelector(".explore-indicator");
      const vid = other.querySelector(".gallery-video"); const poster = other.querySelector(".gallery-poster");
      if(vid) { vid.pause(); vid.currentTime = 0; vid.style.opacity = 0; }
      if(poster) poster.style.opacity = 1;
      
      if(imgWrap) gsap.to(imgWrap, { scale: 1, duration: 0.8, ease: "power4.out", overwrite: "auto" });
      if(info) gsap.to(info, { opacity: 0, y: 20, duration: 0.4, ease: "power4.out", overwrite: "auto" });
      if(exp) gsap.to(exp, { opacity: 0, scale: 0.5, duration: 0.4, ease: "power4.out", overwrite: "auto" });
    });
  });
}

const galleryView = document.getElementById("gallery-view"), detailView = document.getElementById("detail-view"), giantLayer = document.getElementById("giant-layer"), closeBtnWrapper = document.getElementById("close-btn-wrapper"), mainHeader = document.getElementById("main-header"), contextText = document.getElementById("context-text"), footerLinks = document.getElementById("footer-links");
let detailScrollTriggers = [];

function openDetailView(data) {
  savedScrollPosition = window.scrollY; lenis.stop();
  document.querySelectorAll(".gallery-item video").forEach(v => { v.pause(); v.currentTime = 0; });
  
  const setEl = (id, val) => { const el = document.getElementById(id); if(el) el.innerHTML = val; };
  setEl("det-title", data.title[currentLang]); setEl("det-desc", data.desc[currentLang]);
  const link = document.getElementById("det-link"); if(link) { if(data.link) { link.href = data.link; link.style.display = "inline-flex"; } else link.style.display = "none"; }
  const repoBtn = document.getElementById("det-repo"); if (repoBtn) { if(data.repo) { repoBtn.href = data.repo; repoBtn.style.display = "inline-flex"; } else repoBtn.style.display = "none"; }
  if(bgLayer) bgLayer.style.backgroundColor = "#141414";

  const noteEl = document.getElementById("det-note");
  if (noteEl) {
    if (data.note) {
      noteEl.innerHTML = data.note[currentLang];
      noteEl.style.display = "block";
      gsap.fromTo(noteEl, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 1.2, delay: 0.4, ease: "power4.out" });
    } else {
      noteEl.style.display = "none";
    }
  }

  const imgContainer = document.getElementById("det-images"), thumbsContainer = document.getElementById("det-thumbs");
  if(imgContainer && thumbsContainer) {
    imgContainer.innerHTML = ""; thumbsContainer.innerHTML = "";
    data.detailImgs.forEach((src, idx) => {
      const isVideo = src.match(/\.(mp4|webm)$/i);
      const mediaElement = isVideo ? `<video src="${src}" autoplay loop muted playsinline></video>` : `<img src="${src}" alt="Screenshot">`;
      const thumbElement = isVideo ? `<video src="${src}" muted></video>` : `<img src="${src}" alt="thumb">`;
      imgContainer.innerHTML += `<div class="detail-img-box" id="img-${idx}">${mediaElement}</div>`;
      thumbsContainer.innerHTML += `<div class="thumb-item ${idx === 0 ? "active" : ""}" data-target="img-${idx}">${thumbElement}</div>`;
    });
  }

  gsap.to(track, { filter: "blur(15px)", scale: 0.95, opacity: 0, duration: 1.2, ease: "power4.inOut" });
  if(giantLayer) gsap.to(giantLayer, { opacity: 0, scale: 0.9, duration: 1.2, ease: "power4.inOut" });
  gsap.to([mainHeader, contextText, footerLinks], { opacity: 0, duration: 0.6, pointerEvents: "none" });

  setTimeout(() => {
    const st = ScrollTrigger.getById("galleryScroll"); if(st) st.disable();
    if(galleryView) galleryView.style.display = "none";
    if(detailView) { detailView.style.display = "block"; window.scrollTo(0, 0); gsap.fromTo(detailView, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.2, ease: "power4.out" }); }
    if(closeBtnWrapper) { closeBtnWrapper.style.display = "flex"; closeBtnWrapper.style.opacity = "0"; gsap.to(closeBtnWrapper, { opacity: 1, duration: 1, delay: 0.4 }); }
    if(pCanvas) gsap.to(pCanvas, { opacity: 1, duration: 1.2, delay: 0.2 });

    gsap.fromTo(".detail-img-box", { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 1.2, ease: "power4.out", delay: 0.1, onComplete: () => gsap.to(".detail-img-box img, .detail-img-box video", { y: -8, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut", stagger: { each: 0.2, from: "start" } }) });
    lenis.start(); setupDetailScrollSpy(); ScrollTrigger.refresh();

    const dCenter = document.getElementById("det-images");
    if(dCenter) { const ro = new ResizeObserver(() => ScrollTrigger.refresh()); ro.observe(dCenter); }
  }, 800);
}

function closeDetailView() {
  lenis.stop(); currentOpenProjectIndex = null;
  detailScrollTriggers.forEach((st) => st.kill()); detailScrollTriggers = [];
  if(pCanvas) gsap.to(pCanvas, { opacity: 0, duration: 0.6 });
  if(bgLayer) gsap.to(bgLayer, { backgroundColor: "#141414", duration: 0.8, ease: "power4.inOut" });
  
  gsap.to([detailView, closeBtnWrapper], { opacity: 0, y: 30, duration: 0.8, ease: "power4.inOut", onComplete: () => {
      if(detailView) detailView.style.display = "none";
      if(closeBtnWrapper) closeBtnWrapper.style.display = "none";
      if(galleryView) galleryView.style.display = "block";
      window.scrollTo(0, savedScrollPosition);
      const st = ScrollTrigger.getById("galleryScroll"); if(st) st.enable();
      
      gsap.to(track, { scale: 1, filter: "blur(0px)", opacity: 1, duration: 1.2, ease: "power4.out" });
      
      gsap.to([giantLayer, mainHeader, contextText, footerLinks], { opacity: 1, duration: 1, ease: "power4.out", pointerEvents: "auto" });
      lenis.start(); ScrollTrigger.refresh();
    }
  });
}

const cb = document.getElementById("close-btn"); if(cb) cb.addEventListener("click", () => { history.replaceState(null, "", window.location.pathname); closeDetailView(); });
window.addEventListener("popstate", (event) => { if (!event.state || !event.state.detail) { if (detailView && detailView.style.display === "block") closeDetailView(); } });

function setupDetailScrollSpy() {
  const boxes = document.querySelectorAll(".detail-img-box"), thumbs = document.querySelectorAll(".thumb-item");
  boxes.forEach((box, index) => { detailScrollTriggers.push(ScrollTrigger.create({ trigger: box, start: "top center", end: "bottom center", onToggle: (self) => { if (self.isActive && thumbs[index]) { thumbs.forEach(t => t.classList.remove("active")); thumbs[index].classList.add("active"); } } })); });
  thumbs.forEach(thumb => { thumb.addEventListener("click", () => { const target = document.getElementById(thumb.dataset.target); if(target) lenis.scrollTo(target, { offset: -50, duration: 1.2 }); }); });
}

// === PRELOADER EXACTAMENTE COMO EL CÓDIGO FUENTE ORIGINAL ===
document.addEventListener("DOMContentLoaded", () => {
  const preloader = document.getElementById("preloader");
  const plName = document.getElementById("pl-name");
  const plRole = document.getElementById("pl-role");

  if(typeof lenis !== "undefined") lenis.stop();

  // 1. Reseteo forzado para que Ctrl+R funcione siempre y no parpadee
  gsap.set(preloader, { opacity: 1, display: "flex" });
  gsap.set(plName, { opacity: 0, y: 0 });
  gsap.set(plRole, { opacity: 0, y: 0 });

  // 2. Tu línea de tiempo (timeline) EXACTA del código fuente original
  const tl = gsap.timeline();

  tl.to(plName, {
    opacity: 1,
    y: -10,
    duration: 1.5,
    ease: "power2.out",
    delay: 0.3,
  })
  .to(plRole, {
    opacity: 1,
    y: -5,
    duration: 1.5,
    ease: "power2.out",
  }, "-=1")
  .to(preloader, {
    opacity: 0,
    duration: 1.2,
    ease: "power2.inOut",
    delay: 0.8,
    onComplete: () => {
      if (preloader) preloader.style.display = "none";
      if (typeof lenis !== "undefined") lenis.start();
    },
  });

  // 3. Cargamos la interfaz al instante para que no haya retrasos
  renderLangOptions();
  updateUI_Language();
});
// === FIN DEL BLOQUE ===

const btnAbout = document.getElementById("open-about-btn"), modalAbout = document.getElementById("about-modal");
let aboutScrollTriggers = [];

if(btnAbout && modalAbout) {
  btnAbout.addEventListener("click", (e) => {
    e.preventDefault(); lenis.stop(); modalAbout.style.display = "block";
    gsap.fromTo(modalAbout, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power4.out" });
    
    const aboutImg = modalAbout.querySelector(".about-img-box");
    const aboutElements = modalAbout.querySelectorAll(".about-title, .about-subtitle, .about-text, .tech-category-header");
    
    gsap.fromTo(aboutImg, { y: 40, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power4.out", delay: 0.1 });
    gsap.fromTo(aboutElements, { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05, duration: 1.2, ease: "power4.out", delay: 0.15 });
    
    aboutScrollTriggers.forEach((st) => st.kill()); aboutScrollTriggers = [];
    
    setTimeout(() => {
      const techTags = document.querySelectorAll(".tech-tag"); gsap.set(techTags, { opacity: 0, y: 15 });
      aboutScrollTriggers.push(ScrollTrigger.create({ trigger: ".tech-container", scroller: "#about-modal", start: "top 85%", onEnter: () => gsap.to(techTags, { opacity: 1, y: 0, duration: 1, stagger: 0.03, ease: "back.out(1.5)" }) }));
      
      document.querySelectorAll(".skill-fill").forEach((fill) => {
        const tWidth = fill.getAttribute("data-width"); 
        const scaleVal = parseInt(tWidth) / 100;
        gsap.set(fill, { scaleX: 0 });
        aboutScrollTriggers.push(ScrollTrigger.create({ trigger: fill.closest(".skill-item"), scroller: "#about-modal", start: "top 95%", onEnter: () => gsap.to(fill, { scaleX: scaleVal, duration: 2, ease: "power4.out" }) }));
      });
    }, 150);
  });
}

const cab = document.getElementById("close-about-btn");
if(cab && modalAbout) { cab.addEventListener("click", () => { gsap.to(modalAbout, { opacity: 0, duration: 0.5, ease: "power4.inOut", onComplete: () => { modalAbout.style.display = "none"; lenis.start(); } }); }); }