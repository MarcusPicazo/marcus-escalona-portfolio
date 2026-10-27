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
    techCat1: "Frontend & Core", techCat2: "AI / LLM & Voice", techCat3: "Integrations & APIs", techCat4: "Cloud & Backend", techCat5: "3D & Performance", techCat6: "Tools & Workflow", expTitle: "Experience", eduTitle: "Education & Certifications",
    contextText: "SELECTED WORK<br>Full-Stack · AI & Voice<br>Real-time 3D · Interactive Products",
    aboutText: "I am a British-Mexican Product & Forward Deployed Engineer with 6+ years across product, systems and infrastructure engineering, and I have taken several products from zero to production. I own problems end to end: scoping with non-technical stakeholders, designing the architecture, building in React, TypeScript, Node.js and Python, integrating third-party APIs and shipping. My background in physics and music shapes how I work: I approach data and systems with scientific rigor, and interfaces with creativity and fluidity.<br><br>I lead engineering for a platform suite used by 200+ students and staff — from real-time multiplayer games to in-browser 3D learning environments — and I build independent products: Tezontle 3D, a real-time 3D sales platform for real-estate developers; Socio, a bilingual AI receptionist built on LLMs, speech-to-text and telephony/WhatsApp APIs; and Taylor, a safe-mobility platform for women that I co-founded. I am also developing Bodega Abierta, an open-source warehouse system for Mexican food banks.<br><br>I work AI-native, directing agentic tools like Claude Code to ship fast without trading off quality. I am open to hybrid (CDMX) or remote roles. This is the ecosystem I work with:",
    closeBtn: "CLOSE", explore: "EXPLORE", visitLink: "Visit Application", visitWebsite: "Visit Website", download: "Download", sourceCode: "GitHub Repo", backToCatalog: "BACK TO CATALOG", email: "Email", linkedin: "LinkedIn", github: "GitHub", resume: "Resume", resumeEs: "Resume (ES)",
    skills: { en: { name: "English", lvl: "Native" }, es: { name: "Spanish", lvl: "Native" }, it: { name: "Italian", lvl: "B2" }, ca: { name: "Catalan", lvl: "B2" } },
  },
  es: {
    role: "PRODUCT ENGINEER", aboutBtn: "Sobre Mí", aboutTitle: "Sobre Mí", techTitle: "Tecnologías", langTitle: "Idiomas y Comunicación",
    techCat1: "Frontend y Core", techCat2: "IA / LLM y Voz", techCat3: "Integraciones y APIs", techCat4: "Nube y Backend", techCat5: "3D y Rendimiento", techCat6: "Herramientas y Flujo de trabajo", expTitle: "Experiencia", eduTitle: "Formación y Certificaciones",
    contextText: "TRABAJO DESTACADO<br>Full-Stack · IA y Voz<br>3D en Tiempo Real · Productos Interactivos",
    aboutText: "Soy un Product & Forward Deployed Engineer británico-mexicano con más de 6 años en ingeniería de producto, sistemas e infraestructura, y he llevado varios productos de cero a producción. Me hago cargo de los problemas de punta a punta: defino el alcance con personas no técnicas, diseño la arquitectura, desarrollo en React, TypeScript, Node.js y Python, integro APIs de terceros y lo pongo en producción. Mi formación en física y música marca mi forma de trabajar: abordo los datos y los sistemas con rigor científico, y las interfaces con creatividad y fluidez.<br><br>Dirijo la ingeniería de una suite de plataformas con más de 200 usuarios —desde juegos multijugador en tiempo real hasta entornos de aprendizaje 3D en el navegador— y construyo productos independientes: Tezontle 3D, una plataforma 3D en tiempo real para vender preventas inmobiliarias; Socio, una recepcionista bilingüe con IA construida sobre LLMs, voz a texto y APIs de telefonía y WhatsApp; y Taylor, una plataforma de movilidad segura para mujeres que cofundé. También desarrollo Bodega Abierta, un sistema de almacén de código abierto para bancos de alimentos en México.<br><br>Trabajo de forma AI-native, dirigiendo herramientas agénticas como Claude Code para entregar rápido sin sacrificar calidad. Estoy disponible para roles híbridos (CDMX) o remotos. Este es el ecosistema con el que trabajo:",
    closeBtn: "CERRAR", explore: "EXPLORAR", visitLink: "Visitar Aplicación", visitWebsite: "Visitar Sitio Web", download: "Descarga", sourceCode: "Repositorio GitHub", backToCatalog: "VOLVER AL CATÁLOGO", email: "Email", linkedin: "LinkedIn", github: "GitHub", resume: "Currículum", resumeEs: "Currículum (ES)",
    skills: { en: { name: "Inglés", lvl: "Nativo" }, es: { name: "Español", lvl: "Nativo" }, it: { name: "Italiano", lvl: "B2" }, ca: { name: "Catalán", lvl: "B2" } },
  },
  it: {
    role: "PRODUCT ENGINEER", aboutBtn: "Su di Me", aboutTitle: "Su di Me", techTitle: "Tecnologie", langTitle: "Lingue e Comunicazione",
    techCat1: "Frontend e Core", techCat2: "IA / LLM e Voce", techCat3: "Integrazioni e API", techCat4: "Cloud e Backend", techCat5: "3D e Prestazioni", techCat6: "Strumenti e Flusso di lavoro", expTitle: "Esperienza", eduTitle: "Formazione e Certificazioni",
    contextText: "LAVORI IN EVIDENZA<br>Full-Stack · IA e Voce<br>3D in Tempo Reale · Prodotti Interattivi",
    aboutText: "Sono un Product & Forward Deployed Engineer britannico-messicano con oltre 6 anni di esperienza in ingegneria di prodotto, sistemi e infrastruttura, e ho portato diversi prodotti da zero alla produzione. Mi occupo dei problemi dall'inizio alla fine: definisco l'ambito con persone non tecniche, progetto l'architettura, sviluppo in React, TypeScript, Node.js e Python, integro API di terze parti e rilascio. La mia formazione in fisica e musica definisce il mio modo di lavorare: affronto dati e sistemi con rigore scientifico, e le interfacce con creatività e fluidità.<br><br>Guido l'ingegneria di una suite di piattaforme usata da oltre 200 persone — dai giochi multiplayer in tempo reale agli ambienti di apprendimento 3D nel browser — e costruisco prodotti indipendenti: Tezontle 3D, una piattaforma 3D in tempo reale per vendere immobili in prevendita; Socio, una receptionist bilingue con IA basata su LLM, riconoscimento vocale e API di telefonia e WhatsApp; e Taylor, una piattaforma di mobilità sicura per le donne che ho cofondato. Sto inoltre sviluppando Bodega Abierta, un sistema di magazzino open source per i banchi alimentari messicani.<br><br>Lavoro in modo AI-native, dirigendo strumenti agentici come Claude Code per consegnare in fretta senza sacrificare la qualità. Sono disponibile per ruoli ibridi (CDMX) o da remoto. Questo è l'ecosistema con cui lavoro:",
    closeBtn: "CHIUDI", explore: "ESPLORA", visitLink: "Visita l'App", visitWebsite: "Visita il Sito", download: "Scarica", sourceCode: "Repo GitHub", backToCatalog: "TORNA AL CATALOGO", email: "Email", linkedin: "LinkedIn", github: "GitHub", resume: "Curriculum", resumeEs: "Curriculum (ES)",
    skills: { en: { name: "Inglese", lvl: "Madrelingua" }, es: { name: "Spagnolo", lvl: "Madrelingua" }, it: { name: "Italiano", lvl: "B2" }, ca: { name: "Catalano", lvl: "B2" } },
  },
  ca: {
    role: "PRODUCT ENGINEER", aboutBtn: "Sobre Mi", aboutTitle: "Sobre Mi", techTitle: "Tecnologies", langTitle: "Idiomes i Comunicació",
    techCat1: "Frontend i Core", techCat2: "IA / LLM i Veu", techCat3: "Integracions i APIs", techCat4: "Núvol i Backend", techCat5: "3D i Rendiment", techCat6: "Eines i Flux de treball", expTitle: "Experiència", eduTitle: "Formació i Certificacions",
    contextText: "TREBALL DESTACAT<br>Full-Stack · IA i Veu<br>3D en Temps Real · Productes Interactius",
    aboutText: "Sóc un Product & Forward Deployed Engineer britànic-mexicà amb més de 6 anys en enginyeria de producte, sistemes i infraestructura, i he portat diversos productes de zero a producció. M'encarrego dels problemes de punta a punta: defineixo l'abast amb persones no tècniques, dissenyo l'arquitectura, desenvolupo en React, TypeScript, Node.js i Python, integro APIs de tercers i ho poso en producció. La meva formació en física i música marca la meva manera de treballar: abordo les dades i els sistemes amb rigor científic, i les interfícies amb creativitat i fluïdesa.<br><br>Dirigeixo l'enginyeria d'una suite de plataformes amb més de 200 usuaris —des de jocs multijugador en temps real fins a entorns d'aprenentatge 3D al navegador— i construeixo productes independents: Tezontle 3D, una plataforma 3D en temps real per vendre immobles en preventa; Socio, una recepcionista bilingüe amb IA construïda sobre LLMs, veu a text i APIs de telefonia i WhatsApp; i Taylor, una plataforma de mobilitat segura per a dones que vaig cofundar. També desenvolupo Bodega Abierta, un sistema de magatzem de codi obert per a bancs d'aliments a Mèxic.<br><br>Treballo de manera AI-native, dirigint eines agèntiques com Claude Code per lliurar ràpid sense sacrificar la qualitat. Estic disponible per a rols híbrids (CDMX) o en remot. Aquest és l'ecosistema amb què treballo:",
    closeBtn: "TANCAR", explore: "EXPLORAR", visitLink: "Visitar Aplicació", visitWebsite: "Visitar Lloc Web", download: "Descarrega", sourceCode: "Repositori GitHub", backToCatalog: "TORNAR AL CATÀLEG", email: "Correu", linkedin: "LinkedIn", github: "GitHub", resume: "Currículum", resumeEs: "Currículum (ES)",
    skills: { en: { name: "Anglès", lvl: "Natiu" }, es: { name: "Espanyol", lvl: "Natiu" }, it: { name: "Italià", lvl: "B2" }, ca: { name: "Català", lvl: "B2" } },
  },
};


// Experiencia y formación del About (del CV). Los textos van por idioma; empresas y fechas numéricas no cambian.
const experienceData = [
  {
    "org": "Escuela Berta Von Glümer",
    "role": {
      "en": "Lead Product Engineer",
      "es": "Lead Product Engineer",
      "it": "Lead Product Engineer",
      "ca": "Lead Product Engineer"
    },
    "dates": {
      "en": "Oct 2023 – Present",
      "es": "Oct 2023 – Actual",
      "it": "Ott 2023 – Oggi",
      "ca": "Oct 2023 – Actualitat"
    },
    "desc": {
      "en": "Architected and shipped a suite of five React and TypeScript apps for 200+ students and staff, plus three interactive 3D learning environments in Three.js and WebGL. Led EBVG-Hoot, a real-time multiplayer platform, and built CIT-Sync, replacing manual spreadsheet workflows across departments.",
      "es": "Diseñé y lancé una suite de cinco apps en React y TypeScript para más de 200 alumnos y personal, además de tres entornos de aprendizaje 3D interactivos en Three.js y WebGL. Lideré EBVG-Hoot, una plataforma multijugador en tiempo real, y creé CIT-Sync, que reemplazó flujos manuales en hojas de cálculo entre departamentos.",
      "it": "Ho progettato e rilasciato una suite di cinque app in React e TypeScript per oltre 200 studenti e membri del personale, più tre ambienti di apprendimento 3D interattivi in Three.js e WebGL. Ho guidato EBVG-Hoot, una piattaforma multiplayer in tempo reale, e creato CIT-Sync, che ha sostituito i flussi manuali su fogli di calcolo tra i reparti.",
      "ca": "Vaig dissenyar i llançar una suite de cinc apps en React i TypeScript per a més de 200 alumnes i personal, a més de tres entorns d'aprenentatge 3D interactius en Three.js i WebGL. Vaig liderar EBVG-Hoot, una plataforma multijugador en temps real, i vaig crear CIT-Sync, que va substituir fluxos manuals en fulls de càlcul entre departaments."
    }
  },
  {
    "org": "Getting Out",
    "role": {
      "en": "Systems Engineer",
      "es": "Ingeniero de Sistemas",
      "it": "Ingegnere di Sistemi",
      "ca": "Enginyer de Sistemes"
    },
    "dates": {
      "en": "2022 – 2023",
      "es": "2022 – 2023",
      "it": "2022 – 2023",
      "ca": "2022 – 2023"
    },
    "desc": {
      "en": "Built Python automation services, REST APIs and microservices for internal data processing, and designed SQL data models and a service-oriented architecture for operational reporting.",
      "es": "Desarrollé servicios de automatización en Python, APIs REST y microservicios para el procesamiento interno de datos, y diseñé modelos de datos SQL y una arquitectura orientada a servicios para los reportes operativos.",
      "it": "Ho sviluppato servizi di automazione in Python, API REST e microservizi per l'elaborazione interna dei dati, e progettato modelli di dati SQL e un'architettura orientata ai servizi per i report operativi.",
      "ca": "Vaig desenvolupar serveis d'automatització en Python, APIs REST i microserveis per al processament intern de dades, i vaig dissenyar models de dades SQL i una arquitectura orientada a serveis per als informes operatius."
    }
  },
  {
    "org": "Black Fox Productions",
    "role": {
      "en": "Audio Engineer (Remote)",
      "es": "Ingeniero de Audio (Remoto)",
      "it": "Ingegnere Audio (Remoto)",
      "ca": "Enginyer d'Àudio (Remot)"
    },
    "dates": {
      "en": "2019 – 2025",
      "es": "2019 – 2025",
      "it": "2019 – 2025",
      "ca": "2019 – 2025"
    },
    "desc": {
      "en": "Broadcast-ready audio post-production for international cinema chains, with asynchronous review cycles and signal routing across Pro Tools, Ableton Live, iZotope RX and Dante.",
      "es": "Postproducción de audio lista para transmisión para cadenas de cine internacionales, con ciclos de revisión asíncronos y ruteo de señal en Pro Tools, Ableton Live, iZotope RX y Dante.",
      "it": "Post-produzione audio pronta per la trasmissione per catene cinematografiche internazionali, con cicli di revisione asincroni e routing del segnale in Pro Tools, Ableton Live, iZotope RX e Dante.",
      "ca": "Postproducció d'àudio llesta per a emissió per a cadenes de cinema internacionals, amb cicles de revisió asíncrons i encaminament de senyal a Pro Tools, Ableton Live, iZotope RX i Dante."
    }
  },
  {
    "org": "Cedros College",
    "role": {
      "en": "IT Systems Engineer",
      "es": "Ingeniero de Sistemas TI",
      "it": "Ingegnere di Sistemi IT",
      "ca": "Enginyer de Sistemes TI"
    },
    "dates": {
      "en": "2021 – 2022",
      "es": "2021 – 2022",
      "it": "2021 – 2022",
      "ca": "2021 – 2022"
    },
    "desc": {
      "en": "Network security and infrastructure administration across the corporate network: Active Directory, Fortinet, Windows Server and Group Policy.",
      "es": "Seguridad de red y administración de infraestructura en la red corporativa: Active Directory, Fortinet, Windows Server y Group Policy.",
      "it": "Sicurezza di rete e amministrazione dell'infrastruttura della rete aziendale: Active Directory, Fortinet, Windows Server e Group Policy.",
      "ca": "Seguretat de xarxa i administració d'infraestructura a la xarxa corporativa: Active Directory, Fortinet, Windows Server i Group Policy."
    }
  },
  {
    "org": "CONACULTA / Secretaría de Cultura",
    "role": {
      "en": "Systems Engineer",
      "es": "Ingeniero de Sistemas",
      "it": "Ingegnere di Sistemi",
      "ca": "Enginyer de Sistemes"
    },
    "dates": {
      "en": "2016 – 2017",
      "es": "2016 – 2017",
      "it": "2016 – 2017",
      "ca": "2016 – 2017"
    },
    "desc": {
      "en": "Technical architecture support, QA testing and debugging of custom government software: Linux, SQL and Bash.",
      "es": "Soporte de arquitectura técnica, pruebas de QA y depuración de software gubernamental a la medida: Linux, SQL y Bash.",
      "it": "Supporto all'architettura tecnica, test di QA e debug di software governativo personalizzato: Linux, SQL e Bash.",
      "ca": "Suport d'arquitectura tècnica, proves de QA i depuració de programari governamental a mida: Linux, SQL i Bash."
    }
  }
];
const educationData = {
  "en": [
    [
      "Completed",
      "B.Eng. Computer Systems, Universidad Europea de Madrid · B.Sc. Music & Innovation, Universidad Panamericana"
    ],
    [
      "Coursework",
      "B.Sc. Physics, Universidad Autónoma Metropolitana (through final year) · M.Sc. Astrophysics"
    ],
    [
      "Certifications",
      "IBM Full Stack Developer · IBM Machine Learning & Python · Google Digital Marketing · EF SET C2 English"
    ]
  ],
  "es": [
    [
      "Concluidos",
      "Ingeniería en Sistemas Computacionales, Universidad Europea de Madrid · Licenciatura en Música e Innovación, Universidad Panamericana"
    ],
    [
      "Estudios",
      "Licenciatura en Física, Universidad Autónoma Metropolitana (hasta último año) · Maestría en Astrofísica"
    ],
    [
      "Certificaciones",
      "IBM Full Stack Developer · IBM Machine Learning & Python · Google Digital Marketing · EF SET C2 English"
    ]
  ],
  "it": [
    [
      "Completati",
      "Ingegneria dei Sistemi Informatici, Universidad Europea de Madrid · Laurea in Musica e Innovazione, Universidad Panamericana"
    ],
    [
      "Studi",
      "Laurea in Fisica, Universidad Autónoma Metropolitana (fino all'ultimo anno) · Master in Astrofisica"
    ],
    [
      "Certificazioni",
      "IBM Full Stack Developer · IBM Machine Learning & Python · Google Digital Marketing · EF SET C2 English"
    ]
  ],
  "ca": [
    [
      "Completats",
      "Enginyeria de Sistemes Computacionals, Universidad Europea de Madrid · Grau en Música i Innovació, Universidad Panamericana"
    ],
    [
      "Estudis",
      "Grau en Física, Universidad Autónoma Metropolitana (fins a l'últim curs) · Màster en Astrofísica"
    ],
    [
      "Certificacions",
      "IBM Full Stack Developer · IBM Machine Learning & Python · Google Digital Marketing · EF SET C2 English"
    ]
  ]
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
    detailImgs: ["assets/solar-system/solar-ebvg.mp4", "assets/solar-system/S1.jpg", "assets/solar-system/S2.jpg"]
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
    previewImg: "assets/previews/citsync.jpg",
    detailImgs: ["assets/CITSYNC/CitSyncVideo.mp4", "assets/CITSYNC/CS1.jpg", "assets/CITSYNC/CS2.jpg", "assets/CITSYNC/CS3.jpg", "assets/CITSYNC/CS4.jpg"]
  },
  {
    id: "atlas",
    title: { en: "ATLAS", es: "ATLAS", it: "ATLAS", ca: "ATLAS" },
    color: "#1d4ed8", category: { en: "Science / Geography", es: "Ciencias / Geografía", it: "Scienza / Geografia", ca: "Ciències / Geografia" },
    desc: {
      en: "An interactive 3D web application developed to help students explore the world through Earth's continents and countries. Built with a focus on modern UI/UX, real-time data visualization, and seamless bilingual support.<br><br><strong>Key Features:</strong><br>• Dual Exploration Modes: Toggle between a macro 'Continents' view and a detailed 'Countries' view.<br>• Interactive Data Visualization: Custom hover effects, dynamic tooltips, procedural Canvas textures for transcontinental regions, and smooth altitude transitions.<br>• Dynamic Information Panel: Population, area, historical context, and key facts loaded asynchronously per region.<br>• Bilingual Support: Seamless English/Spanish switching without reloading.<br><br><strong>Technologies:</strong><br>HTML5, Vanilla JavaScript, Three.js &amp; Globe.gl, Tailwind CSS, Natural Earth GeoJSON.",
      es: "Una aplicación web 3D interactiva desarrollada para ayudar a los estudiantes a explorar el mundo a través de los continentes y países de la Tierra. Construida con un enfoque en UI/UX moderno, visualización de datos en tiempo real y soporte bilingüe fluido.<br><br><strong>Características Clave:</strong><br>• Modos de Exploración Dual: Alterna entre una vista macro de Continentes y una vista detallada de Países.<br>• Visualización de Datos Interactiva: Efectos hover personalizados, tooltips dinámicos, texturas procedurales (Canvas API) para regiones transcontinentales y transiciones suaves de altitud.<br>• Panel de Información Dinámico: Población, área, contexto histórico y datos clave cargados de forma asíncrona por región.<br>• Soporte Bilingüe: Cambio fluido entre inglés y español sin recargar la página.<br><br><strong>Tecnologías:</strong><br>HTML5, JavaScript Vanilla, Three.js y Globe.gl, Tailwind CSS, Natural Earth GeoJSON.",
      it: "Applicazione web 3D interattiva per esplorare il mondo attraverso continenti e paesi, con Three.js e Globe.gl.", ca: "Aplicació web 3D interactiva per explorar el món a través de continents i països, amb Three.js i Globe.gl."
    },
    link: "https://marcuspicazo.github.io/3d-world-explorer-ebvg/", repo: "https://github.com/MarcusPicazo/atlas-ebvg",
    mainImg: "assets/atlas/atlas-video.mp4",
    previewImg: "assets/atlas/atlas-1.jpg",
    detailImgs: ["assets/atlas/atlas-video.mp4", "assets/atlas/atlas-1.jpg", "assets/atlas/atlas-2.jpg", "assets/atlas/atlas-3.jpg"]
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
    detailImgs: ["assets/LAVA/lava-questions.mp4", "assets/LAVA/LAVA1.jpg", "assets/LAVA/LAVA2.jpg", "assets/LAVA/LAVA3.jpg", "assets/LAVA/Lava-no-questions.mp4"]
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
    detailImgs: ["assets/ARTSTUDIO/EBVGARTSTUDIO.mp4", "assets/ARTSTUDIO/A1.jpg", "assets/ARTSTUDIO/K2.jpg", "assets/ARTSTUDIO/K3.jpg"]
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
    detailImgs: ["assets/RENACIMIENTO/GALLERYVIDEO.mp4", "assets/RENACIMIENTO/GALLERY1.jpg", "assets/RENACIMIENTO/GALLERY2.jpg", "assets/RENACIMIENTO/GALLERY3.jpg"]
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
    previewImg: "assets/previews/dna.jpg",
    detailImgs: ["assets/DNA/DNAVIDEO.mp4", "assets/DNA/DNA1.jpg", "assets/DNA/DNA2.jpg"]
  },
  {
    id: "arcade",
    title: { en: "STUDENT ARCADE", es: "STUDENT ARCADE", it: "STUDENT ARCADE", ca: "STUDENT ARCADE" },
    color: "#a21caf", category: { en: "Games / Gallery", es: "Juegos / Galería", it: "Giochi / Galleria", ca: "Jocs / Galeria" },
    desc: {
      en: "An interactive 3D virtual exhibition hall designed to showcase the amazing technical projects created by my elementary and middle school computer science students. As their teacher, I taught them how to build their games and websites from scratch. We then collaboratively built this 3D gallery together, with me leading the development, to highlight our favorite projects. Step inside and explore the creativity of the next generation of developers!<br><br><strong>Features:</strong><br>• First-Person 3D Navigation: Explore using WASD and mouse controls.<br>• Three Interactive Rooms: Dedicated spaces for Arcade Games, Web Development, and UX Design.<br>• Figma-Style UX Canvas: Infinite canvas with drag-to-scroll to explore full-scale app mockups.<br>• Bilingual UI: Real-time toggling between English and Spanish.<br><br><strong>Technologies Used:</strong><br>HTML5, CSS3, JavaScript (ES6+), Three.js (WebGL), Tailwind CSS, Panzoom.",
      es: "Una sala de exposición virtual en 3D diseñada para mostrar los increíbles proyectos técnicos creados por mis estudiantes de primaria y secundaria. Como su profesor, les enseñé a desarrollar sus juegos y sitios web desde cero, y luego construimos colaborativamente esta galería 3D, bajo mi liderazgo técnico, para destacar nuestros proyectos favoritos. ¡Entra y explora la creatividad de la próxima generación de desarrolladores!<br><br><strong>Características:</strong><br>• Navegación 3D en Primera Persona: Controles WASD y ratón.<br>• Tres Salas Interactivas: Espacios para Juegos Arcade, Desarrollo Web y Diseño UX.<br>• Canvas UX estilo Figma: Lienzo infinito interactivo para explorar mockups a escala real.<br>• UI Bilingüe: Alternancia en tiempo real entre Inglés y Español.<br><br><strong>Tecnologías:</strong><br>HTML5, CSS3, JavaScript (ES6+), Three.js (WebGL), Tailwind CSS, Panzoom.",
      it: "Galleria 3D interattiva costruita in collaborazione con i miei studenti.", ca: "Galeria 3D interactiva construïda en col·laboració amb els meus estudiants."
    },
    link: "https://marcuspicazo.github.io/3d-student-portfolio/", repo: "https://github.com/MarcusPicazo/3d-student-portfolio",
    mainImg: "assets/ARCADE/ARCADEVIDEO.mp4",
    previewImg: "assets/previews/arcade.jpg",
    detailImgs: ["assets/ARCADE/ARCADEVIDEO.mp4", "assets/ARCADE/ARC1.jpg", "assets/ARCADE/ARC2.jpg", "assets/ARCADE/ARC3.jpg"]
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
    previewImg: "assets/taylor/taylor-1.jpg",
    detailImgs: ["assets/taylor/taylor-1.jpg", "assets/taylor/taylor-video.mp4", "assets/taylor/taylor-2.jpg", "assets/taylor/taylor-3.jpg", "assets/taylor/taylor-4.jpg"]
  },
  {
    id: "taylor-app",
    title: { en: "TAYLOR APP", es: "TAYLOR APP", it: "TAYLOR APP", ca: "TAYLOR APP" },
    color: "#FF3E81", category: { en: "Startup / Mobile App", es: "Startup / App Móvil", it: "Startup / App Mobile", ca: "Startup / App Mòbil" },
    desc: {
      en: "Taylor's mobile app (Flutter, iOS &amp; Android) is the product I lead as CTO &amp; CPO - a single app with three modes: Passenger, Driver, and Business. The tone is protective but modern: the product communicates protection, never fear.<br><br><strong>Key Features:</strong><br>• Passenger: live map, real address search, three ride tiers (Go / Pro / Max), live driver tracking, and a Safety tab (SOS, live location sharing, emergency contacts).<br>• Driver: online status, ride requests with an acceptance countdown, slide-to-confirm trip lifecycle, transparent earnings breakdown.<br>• Business (B2B): recurring night-shift scheduling and a live \"Tonight\" board, so companies know everyone got home safely.<br><br><strong>Technologies:</strong><br>Flutter &amp; Dart, Riverpod, go_router, Google Maps SDK &amp; Places API, geolocator, Firebase Cloud Firestore, Lottie &amp; custom CustomPainter animations. Identity verification (face + document recognition) is designed into onboarding and planned on the AI roadmap.<br><br><div class=\"demo-note\"><strong>Android only, direct APK install (not on Google Play yet):</strong><br>1. Tap Install APK and wait for the download.<br>2. Open the downloaded file from your notification bar or Downloads folder.<br>3. Allow \"install from this source\" when prompted - normal for apps outside the store.<br>4. Tap Install, then Open.<br>If you see a \"not verified by Play Protect\" warning, choose Install anyway - happens with any app installed outside the store.</div>",
      es: "La app móvil de Taylor (Flutter, iOS y Android) es el producto que lidero como CTO y CPO - una sola app con tres modos: Pasajera, Conductora y Empresas. El tono es protector pero moderno: el producto comunica protección, nunca miedo.<br><br><strong>Características Clave:</strong><br>• Pasajera: mapa en vivo, búsqueda real de direcciones, tres niveles de viaje (Go / Pro / Max), seguimiento en vivo del conductor y una pestaña de Seguridad (SOS, compartir ubicación en vivo, contactos de emergencia).<br>• Conductora: estado en línea, solicitudes de viaje con cuenta regresiva de aceptación, ciclo de vida del viaje por deslizamiento, desglose transparente de ganancias.<br>• Empresas (B2B): programación recurrente de turnos nocturnos y un tablero \"Esta Noche\" en vivo, para que las empresas sepan que todo su equipo llegó bien a casa.<br><br><strong>Tecnologías:</strong><br>Flutter y Dart, Riverpod, go_router, Google Maps SDK y Places API, geolocator, Firebase Cloud Firestore, Lottie y animaciones personalizadas con CustomPainter. La verificación de identidad (reconocimiento facial y de documentos) está diseñada en el onboarding y planeada en el roadmap de IA.<br><br><div class=\"demo-note\"><strong>Solo Android, instalación directa por APK (aún no está en Google Play):</strong><br>1. Toca Install APK y espera a que descargue.<br>2. Abre el archivo descargado desde tu barra de notificaciones o la carpeta de Descargas.<br>3. Permite \"instalar desde esta fuente\" cuando te lo pida - es normal en apps que aún no están en la tienda.<br>4. Toca Instalar y luego Abrir.<br>Si aparece una advertencia de \"no verificada por Play Protect\", elige Instalar de todas formas - pasa con cualquier app instalada fuera de la tienda.</div>",
      it: "L'app mobile di Taylor (Flutter, iOS e Android) con tre modalità: Passeggera, Conducente e Aziende, progettata per la sicurezza delle donne.<br><br><div class=\"demo-note\"><strong>Solo Android, installazione diretta tramite APK (non ancora su Google Play).</strong></div>", ca: "L'app mòbil de Taylor (Flutter, iOS i Android) amb tres modes: Passatgera, Conductora i Empreses, dissenyada per a la seguretat de les dones.<br><br><div class=\"demo-note\"><strong>Només Android, instal·lació directa per APK (encara no a Google Play).</strong></div>"
    },
    link: "https://apptaylor.com/app/taylor-v0.1.0.apk", repo: "https://github.com/MarcusPicazo/Taylor-App",
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
    mainImg: "assets/nimio/nimio-1.jpg",
    previewImg: "assets/nimio/nimio-1.jpg",
    detailImgs: ["assets/nimio/nimio-2.jpg"]
  },
  {
    id: "aura-3d",
    title: { en: "AURA 3D", es: "AURA 3D", it: "AURA 3D", ca: "AURA 3D" },
    color: "#4d7c0f", category: { en: "Real Estate / 3D Selector", es: "Inmobiliario / Selector 3D", it: "Immobiliare / Selettore 3D", ca: "Immobiliari / Selector 3D" },
    desc: {
      en: "Aura 3D is an interactive 3D unit selector for real-estate developers, built under Tezontle 3D, my studio for 3D sales tools. Buyers explore a masterplan and a tower in the browser, filter units by real-time availability, check sunlight at any hour, step inside a unit, and request a quote - all on a reusable engine where a new client means a config file and a database, not new code.<br><br><strong>Key Features:</strong><br>• Real-time inventory: units are colored by status (available / reserved / sold) and update live through Supabase Realtime.<br>• Sunlight simulation: the real sun position by latitude, date and hour, highlighting the units that get afternoon sun.<br>• View from the unit: 360° photos or a procedurally furnished interior, with free look.<br>• Compare up to 3 units, share favorites by link, and generate a PDF quote with the payment scheme.<br>• Guided presentation tour and a touch-screen showroom mode that resets itself.<br>• Installable PWA that works offline, bilingual ES/EN, plus an admin panel and a sales CRM (private).<br><br><strong>Technologies:</strong><br>React, TypeScript (strict), React Three Fiber &amp; three.js, Zustand, Tailwind CSS, Supabase (Postgres, Auth, Realtime, RLS), Vite, Vercel.<br><br><div class=\"demo-note\"><strong>Note:</strong> Commercial demo with sample data for a fictional development (Torre Aura Del Valle). The source code is private and proprietary.</div>",
      es: "Aura 3D es un selector 3D interactivo de unidades para desarrolladoras inmobiliarias, construido bajo Tezontle 3D, mi estudio de herramientas de venta en 3D. El comprador explora el masterplan y una torre en el navegador, filtra por disponibilidad en tiempo real, revisa el asoleamiento a cualquier hora, entra a una unidad y pide su cotización, todo sobre un motor reutilizable: un cliente nuevo se resuelve con un archivo de configuración y una base de datos, no con código nuevo.<br><br><strong>Características Clave:</strong><br>• Inventario en tiempo real: las unidades se colorean por estado (disponible / apartada / vendida) y se actualizan en vivo con Supabase Realtime.<br>• Simulación de asoleamiento: la posición real del sol según latitud, fecha y hora, resaltando las unidades que reciben sol de tarde.<br>• Vista desde la unidad: fotos 360° o un interior amueblado generado por código, con giro libre.<br>• Comparador de hasta 3 unidades, favoritos que se comparten por liga y cotización en PDF con el esquema de pagos.<br>• Recorrido de presentación guiado y modo showroom para pantalla táctil que se reinicia solo.<br>• PWA instalable que funciona sin conexión, bilingüe ES/EN, más un panel de administración y un CRM de ventas (privados).<br><br><strong>Tecnologías:</strong><br>React, TypeScript (modo estricto), React Three Fiber y three.js, Zustand, Tailwind CSS, Supabase (Postgres, Auth, Realtime, RLS), Vite, Vercel.<br><br><div class=\"demo-note\"><strong>Nota:</strong> Demo comercial con datos de ejemplo de un desarrollo ficticio (Torre Aura Del Valle). El código fuente es privado y propietario.</div>",
      it: "Selettore 3D interattivo di unità per sviluppatori immobiliari, con disponibilità in tempo reale, simulazione solare e preventivo in PDF.", ca: "Selector 3D interactiu d'unitats per a promotors immobiliaris, amb disponibilitat en temps real, simulació solar i pressupost en PDF."
    },
    link: "https://aura-demo-kappa.vercel.app/aura",
    mainImg: "assets/aura-3d/aura-3d-video.mp4",
    previewImg: "assets/aura-3d/aura-3d-1.jpg",
    detailImgs: ["assets/aura-3d/aura-3d-video.mp4", "assets/aura-3d/aura-3d-1.jpg", "assets/aura-3d/aura-3d-2.jpg", "assets/aura-3d/aura-3d-3.jpg"]
  },
  {
    id: "aura-landing",
    title: { en: "AURA LANDING", es: "AURA LANDING", it: "AURA LANDING", ca: "AURA LANDING" },
    color: "#a16207", category: { en: "Real Estate / Landing Page", es: "Inmobiliario / Landing Page", it: "Immobiliare / Landing Page", ca: "Immobiliari / Landing Page" },
    desc: {
      en: "A cinematic landing page for a real-estate pre-sale, built as a scroll-driven journey: as you scroll, the page glides from an aerial view to the facade, the lobby, the pool, the penthouse and the roof garden through video clips scrubbed frame by frame. It is the landing piece of the Tezontle 3D package, next to the 3D selector.<br><br><strong>Key Features:</strong><br>• Scroll-scrubbed video journey across six stops, with a progress rail and copy for each stop.<br>• Sections for typologies (five, from 62 to 180 m²), eight amenities, location, payment scheme, advisor, and FAQ.<br>• Floating WhatsApp button and prefilled messages for booking a visit.<br>• Static and fast: no backend, optimized images (WebP and JPEG) and a privacy notice page.<br><br><strong>Technologies:</strong><br>Astro, Tailwind CSS, GSAP, Lenis, TypeScript, Netlify.<br><br><div class=\"demo-note\"><strong>Note:</strong> Demo with sample content for a fictional development (Torre Aura Del Valle).</div>",
      es: "Una landing page cinematográfica para la preventa de un desarrollo inmobiliario, construida como un recorrido guiado por el scroll: al bajar, la página avanza de una vista aérea a la fachada, el lobby, la alberca, el penthouse y el roof garden mediante clips de video controlados cuadro por cuadro. Es la pieza de landing del paquete de Tezontle 3D, junto al selector 3D.<br><br><strong>Características Clave:</strong><br>• Recorrido en video controlado por el scroll a través de seis paradas, con riel de progreso y texto para cada parada.<br>• Secciones de tipologías (cinco, de 62 a 180 m²), ocho amenidades, ubicación, esquema de pagos, asesora y preguntas frecuentes.<br>• Botón flotante de WhatsApp y mensajes prellenados para agendar una visita.<br>• Estática y rápida: sin backend, imágenes optimizadas (WebP y JPEG) y página de aviso de privacidad.<br><br><strong>Tecnologías:</strong><br>Astro, Tailwind CSS, GSAP, Lenis, TypeScript, Netlify.<br><br><div class=\"demo-note\"><strong>Nota:</strong> Demo con contenido de ejemplo de un desarrollo ficticio (Torre Aura Del Valle).</div>",
      it: "Landing page cinematografica per la prevendita di uno sviluppo immobiliare, con video controllato dallo scroll.", ca: "Landing page cinematogràfica per a la preventa d'un desenvolupament immobiliari, amb vídeo controlat per l'scroll."
    },
    link: "https://demoauradelvalle.netlify.app", repo: "https://github.com/MarcusPicazo/aura-landing",
    mainImg: "assets/aura-landing/aura-landing-video.mp4",
    previewImg: "assets/aura-landing/aura-landing-1.jpg",
    detailImgs: ["assets/aura-landing/aura-landing-video.mp4", "assets/aura-landing/aura-landing-1.jpg", "assets/aura-landing/aura-landing-2.jpg", "assets/aura-landing/aura-landing-3.jpg", "assets/aura-landing/aura-landing-4.jpg", "assets/aura-landing/aura-landing-5.jpg", "assets/aura-landing/aura-landing-6.jpg", "assets/aura-landing/aura-landing-7.jpg"]
  },
  {
    id: "socio",
    title: { en: "SOCIO", es: "SOCIO", it: "SOCIO", ca: "SOCIO" },
    color: "#ea580c", category: { en: "AI / Voice Receptionist", es: "IA / Recepcionista de Voz", it: "IA / Receptionist Vocale", ca: "IA / Recepcionista de Veu" },
    desc: {
      en: "Socio is a bilingual AI back office for Latino-owned service businesses in the US (roofing, landscaping, cleaning, plumbing, HVAC, painting). The owner runs everything from WhatsApp in Spanish, while customers receive everything in English, professionally.<br><br><strong>Key Features:</strong><br>• Never miss a call: a Vapi voice agent on a Twilio number answers in English, Claude Haiku summarises and classifies the call, and within a minute the owner gets a Spanish summary on WhatsApp with buttons to confirm or call back.<br>• Quote with a voice note: a Spanish voice note is transcribed, Claude Sonnet turns it into an itemised English quote, it is rendered to PDF and emailed with a public accept link, and the owner approves it before anything reaches the customer.<br>• Automatic follow-up: a reminder when the customer does not reply and an alert as soon as the quote is accepted.<br>• Multi-tenant backend with verified webhooks, atomic claim-before-process handling against duplicate events and 111 automated tests.<br>• Guided onboarding: a 15-minute setup with call forwarding per carrier and a test call.<br><br><strong>Technologies:</strong><br>React, TypeScript (strict), Tailwind CSS, Vite, Supabase (Postgres, RLS, Edge Functions, pg_cron), Twilio, Vapi, WhatsApp Cloud API, Claude API, Deepgram, Resend, Stripe, Vercel.<br><br><div class=\"demo-note\"><strong>Note:</strong> MVP. The live app is an operator panel behind a login, so there is no public demo; the full source is in the repository.</div>",
      es: "Socio es una oficina bilingüe con IA para negocios latinos de servicios en EE. UU. (techadores, jardinería, limpieza, plomería, aire acondicionado, pintura). El dueño maneja todo por WhatsApp, en español, mientras sus clientes reciben todo en inglés, de forma profesional.<br><br><strong>Características Clave:</strong><br>• Nunca más una llamada perdida: un agente de voz de Vapi sobre un número de Twilio contesta en inglés, Claude Haiku resume y clasifica la llamada y en menos de un minuto el dueño recibe por WhatsApp un resumen en español con botones para confirmar o devolver la llamada.<br>• Cotiza con una nota de voz: la nota de voz en español se transcribe, Claude Sonnet la convierte en una cotización desglosada en inglés, se genera en PDF y se envía por correo con un enlace público para aceptarla, y el dueño la aprueba antes de que algo llegue al cliente.<br>• Seguimiento automático: recordatorio si el cliente no responde y aviso en cuanto acepta la cotización.<br>• Backend multi-cliente con webhooks verificados, control atómico contra eventos duplicados y 111 pruebas automatizadas.<br>• Onboarding guiado: configuración de 15 minutos con desvío de llamadas por compañía y llamada de prueba.<br><br><strong>Tecnologías:</strong><br>React, TypeScript (modo estricto), Tailwind CSS, Vite, Supabase (Postgres, RLS, Edge Functions, pg_cron), Twilio, Vapi, WhatsApp Cloud API, Claude API, Deepgram, Resend, Stripe, Vercel.<br><br><div class=\"demo-note\"><strong>Nota:</strong> MVP. La aplicación en línea es un panel de operador con inicio de sesión, por lo que no hay demo pública; el código completo está en el repositorio.</div>",
      it: "Receptionist bilingue con IA per attività di servizi di proprietà di latini negli USA: risponde alle chiamate, riassume su WhatsApp in spagnolo e genera preventivi in inglese a partire da una nota vocale.", ca: "Recepcionista bilingüe amb IA per a negocis de serveis de propietaris llatins als EUA: respon les trucades, fa resums per WhatsApp en espanyol i genera pressupostos en anglès a partir d'una nota de veu."
    },
    repo: "https://github.com/MarcusPicazo/SPEC-Socio",
    mainImg: "assets/socio/socio-placeholder.svg",
    previewImg: "assets/socio/socio-placeholder.svg",
    detailImgs: ["assets/socio/socio-placeholder.svg"]
  },
  {
    id: "bodega-abierta",
    title: { en: "BODEGA ABIERTA", es: "BODEGA ABIERTA", it: "BODEGA ABIERTA", ca: "BODEGA ABIERTA" },
    color: "#78716c", category: { en: "Nonprofit / Warehouse Management", es: "Sin Fines de Lucro / Gestión de Almacén", it: "Non Profit / Gestione del Magazzino", ca: "Sense Ànim de Lucre / Gestió de Magatzem" },
    desc: {
      en: "Bodega Abierta is an open-source warehouse management system for Mexican food banks (RapiJazz A.C.). It is a multi-tenant, offline-first PWA, so a food bank keeps working even without a connection.<br><br><strong>Key Features:</strong><br>• Donation intake with OCR and barcode scanning (Tesseract.js, jsQR).<br>• FEFO expiry alerts: the products closest to expiring go out first.<br>• Distribution tracking and a donor impact portal.<br>• Sustainability reporting: kg rescued, waste percentage and CO₂e.<br>• I wrote the product specification and the UX for about 35 screens.<br><br><strong>Technologies:</strong><br>Next.js, TypeScript, PostgreSQL, Prisma, offline-first PWA, Tesseract.js, jsQR. Apache-2.0 license.<br><br><div class=\"demo-note\"><strong>Note:</strong> Currently in development; there is no public demo yet.</div>",
      es: "Bodega Abierta es un sistema de gestión de almacén de código abierto para bancos de alimentos en México (RapiJazz A.C.). Es una PWA multi-cliente y offline-first, de modo que un banco de alimentos sigue trabajando aunque no tenga conexión.<br><br><strong>Características Clave:</strong><br>• Recepción de donativos con OCR y lectura de códigos de barras (Tesseract.js, jsQR).<br>• Alertas de caducidad FEFO: los productos más próximos a caducar salen primero.<br>• Control de entregas y portal de impacto para donantes.<br>• Reportes de sostenibilidad: kg rescatados, porcentaje de merma y CO₂e.<br>• Escribí la especificación de producto y la UX de unas 35 pantallas.<br><br><strong>Tecnologías:</strong><br>Next.js, TypeScript, PostgreSQL, Prisma, PWA offline-first, Tesseract.js, jsQR. Licencia Apache-2.0.<br><br><div class=\"demo-note\"><strong>Nota:</strong> Actualmente en desarrollo; todavía no hay demo pública.</div>",
      it: "Sistema di gestione del magazzino open source per i banchi alimentari messicani (RapiJazz A.C.): PWA multi-cliente e offline-first con OCR, codici a barre e avvisi di scadenza FEFO. In sviluppo.", ca: "Sistema de gestió de magatzem de codi obert per als bancs d'aliments de Mèxic (RapiJazz A.C.): PWA multiclient i offline-first amb OCR, codis de barres i alertes de caducitat FEFO. En desenvolupament."
    },
    repo: "https://github.com/MarcusPicazo/bodega-abierta",
    mainImg: "assets/bodega-abierta/bodega-placeholder.svg",
    previewImg: "assets/bodega-abierta/bodega-placeholder.svg",
    detailImgs: ["assets/bodega-abierta/bodega-placeholder.svg"]
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

function renderAboutLists() {
  const expList = document.getElementById("exp-list"), eduList = document.getElementById("edu-list");
  if (expList) expList.innerHTML = experienceData.map((e) => `<div class="exp-item"><div class="exp-head"><span class="exp-role">${e.role[currentLang]}</span><span class="exp-date">${e.dates[currentLang]}</span></div><div class="exp-org">${e.org}</div><p class="exp-desc">${e.desc[currentLang]}</p></div>`).join("");
  if (eduList) eduList.innerHTML = educationData[currentLang].map(([label, text]) => `<div class="edu-item"><span class="edu-label">${label}</span><span class="edu-text">${text}</span></div>`).join("");
}

function updateUI_Language() {
  const t = translations[currentLang];
  const setEl = (id, val) => { const el = document.getElementById(id); if(el) el.innerHTML = val; };
  setEl("pl-role", t.role); setEl("open-about-btn", t.aboutBtn); setEl("about-title", t.aboutTitle);
  setEl("tech-cat-1", t.techCat1); setEl("tech-cat-2", t.techCat2); setEl("tech-cat-3", t.techCat3);
  setEl("tech-cat-4", t.techCat4); setEl("tech-cat-5", t.techCat5); setEl("tech-cat-6", t.techCat6);
  setEl("about-title-exp", t.expTitle); setEl("about-title-edu", t.eduTitle); renderAboutLists();
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
    updateDetLinkVariant(data);
  }
}

const DET_LINK_ICON_DEFAULT = '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line>';
const DET_LINK_ICON_DOWNLOAD = '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line>';
function updateDetLinkVariant(data) {
  const link = document.getElementById("det-link");
  if (!link || !data) return;
  const t = translations[currentLang];
  const isDownload = data.id === "taylor-desktop" || data.id === "taylor-app";
  const label = isDownload ? t.download : (data.id === "taylor" || data.id === "aura-landing" ? t.visitWebsite : t.visitLink);
  link.querySelectorAll(".det-link-text-node").forEach((el) => { el.innerText = label; });
  link.querySelectorAll("svg").forEach((el) => { el.innerHTML = isDownload ? DET_LINK_ICON_DOWNLOAD : DET_LINK_ICON_DEFAULT; });
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
  if(!cursor || isTouchLayout()) return;
  cursorX += (mouseX - cursorX) * 0.6; cursorY += (mouseY - cursorY) * 0.6;
  cursor.style.transform = `translate(calc(${cursorX}px - 50%), calc(${cursorY}px - 50%))`;
});
document.addEventListener("mouseover", (e) => {
  if (cursor && e.target.closest("a, button, .gallery-item, .thumb-item, .nav-info, .close-btn, .close-about-btn, .visit-link, .lang-opt, .tech-tag")) { cursor.classList.add("hovered"); } else if (cursor) { cursor.classList.remove("hovered"); }
});
const pCanvas = document.getElementById("project-particles"); const pCtx = pCanvas ? pCanvas.getContext("2d") : null;
const aCanvas = document.getElementById("about-particles"); const aCtx = aCanvas ? aCanvas.getContext("2d") : null;
let pWidth, pHeight, projParticles = [], aWidth, aHeight, aboutParticles = [];
// Cada lienzo de partículas solo se dibuja mientras su vista está visible (detalle de proyecto / modal About), no a 60 fps todo el tiempo.
let projParticlesActive = false, aboutParticlesActive = false;

function initParticlesSystems() {
  if(pCanvas) { pWidth = pCanvas.width = window.innerWidth; pHeight = pCanvas.height = window.innerHeight; projParticles = []; for (let i = 0; i < 90; i++) projParticles.push({ x: Math.random() * pWidth, y: Math.random() * pHeight, r: Math.random() * 1.5 + 0.5, vx: (Math.random() - 0.5) * 0.3, vy: -0.2 - Math.random() * 0.4, baseAlpha: Math.random() * 0.4 + 0.2 }); }
  if(aCanvas) { aWidth = aCanvas.width = window.innerWidth; aHeight = aCanvas.height = window.innerHeight; aboutParticles = []; for (let i = 0; i < 80; i++) aboutParticles.push({ x: Math.random() * aWidth, y: Math.random() * aHeight, r: Math.random() * 1.5 + 0.5, vx: (Math.random() - 0.5) * 0.3, vy: -0.1 - Math.random() * 0.3, baseAlpha: Math.random() * 0.4 + 0.1 }); }
}
function drawParticles() {
  if(pCtx && projParticlesActive) { pCtx.clearRect(0, 0, pWidth, pHeight); projParticles.forEach((p) => { p.x += p.vx; p.y += p.vy; if (p.x < 0) p.x = pWidth; if (p.x > pWidth) p.x = 0; if (p.y < 0) p.y = pHeight; if (p.y > pHeight) p.y = 0; pCtx.beginPath(); pCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2); pCtx.fillStyle = `rgba(255, 255, 255, ${p.baseAlpha * Math.pow(1 - p.y / pHeight, 1.5)})`; pCtx.fill(); }); }
  if(aCtx && aboutParticlesActive) { aCtx.clearRect(0, 0, aWidth, aHeight); aboutParticles.forEach((p) => { p.x += p.vx; p.y += p.vy; if (p.x < 0) p.x = aWidth; if (p.x > aWidth) p.x = 0; if (p.y < 0) p.y = aHeight; if (p.y > aHeight) p.y = 0; aCtx.beginPath(); aCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2); aCtx.fillStyle = `rgba(255, 255, 255, ${p.baseAlpha})`; aCtx.fill(); }); }
  requestAnimationFrame(drawParticles);
}
initParticlesSystems(); drawParticles(); window.addEventListener("resize", initParticlesSystems);

const track = document.querySelector(".gallery-track");
const bgLayer = document.querySelector(".bg-layer");
const titleContainer = document.getElementById("dynamic-title");

// Modo táctil / celular: pantallas angostas o sin hover (teléfonos y tablets). Ahí no hay cursor, así que las tarjetas
// quedan abiertas (CSS), se abren con un toque y el fondo toma el color de la tarjeta centrada. El escritorio con mouse no entra aquí.
const touchLayoutQuery = window.matchMedia("(max-width: 820px), (hover: none)");
const isTouchLayout = () => touchLayoutQuery.matches;

if (track) {
  // Se arma todo el HTML y se asigna una sola vez (con `+=` el navegador re-parseaba y recreaba las tarjetas anteriores en cada vuelta).
  track.innerHTML = projectsData.map((proj, index) => {
    const isVideo = proj.mainImg.match(/\.(mp4|webm)$/i);
    const posterImg = proj.previewImg;

    let mediaContent = `<img src="${posterImg}" alt="${proj.title.en}" class="gallery-poster" decoding="async">`;
    if (isVideo) {
        mediaContent += `<video src="${proj.mainImg}" loop muted playsinline preload="metadata" class="gallery-video"></video>`;
    }

    return `<div class="gallery-item" data-index="${index}" data-id="${proj.id}"><div class="img-wrapper">${mediaContent}</div><div class="explore-indicator lang-wipe-target"><div class="explore-bg"></div><span class="explore-text">EXPLORE</span></div><div class="item-info"><span class="item-category lang-wipe-target">${proj.category.en}</span><h2 class="item-title lang-wipe-target">${proj.title.en}</h2></div></div>`;
  }).join("");
}

const items = document.querySelectorAll(".gallery-item");

if (titleContainer) gsap.to(titleContainer, { y: "-=15", duration: 5.5, repeat: -1, yoyo: true, ease: "sine.inOut" });

let floatTweens = [];

function startFloating() {
  floatTweens.forEach(t => t.kill());
  floatTweens = [];
  if (isTouchLayout()) return;
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

// Velocidad real de la pista (px/s, suavizada). El scroll de Lenis + el scrub de GSAP dejan la pista deslizándose
// más de un segundo después de soltar la rueda, pero a velocidades bajas ya no cambia de tarjeta bajo el cursor:
// se considera "en movimiento" solo por encima de GALLERY_SETTLE_SPEED, así el hover abre en cuanto desacelera.
const GALLERY_SETTLE_SPEED = 260;
let trackLastX = 0, trackLastT = performance.now(), trackSpeed = 0;
gsap.ticker.add(() => {
  if (!track) return;
  const now = performance.now(), x = gsap.getProperty(track, "x"), dt = now - trackLastT;
  if (dt > 0) trackSpeed += (Math.abs(x - trackLastX) / dt * 1000 - trackSpeed) * 0.4;
  trackLastX = x; trackLastT = now;
  if (isTouchLayout()) syncTouchColor();
});
const galleryIsMoving = () => trackSpeed > GALLERY_SETTLE_SPEED;

// En modo táctil el fondo toma el color de la tarjeta que está más cerca del centro de la pantalla.
let lastTouchIdx = -1;
function syncTouchColor() {
  if (!bgLayer || !track || currentOpenProjectIndex !== null || items.length < 2) return;
  const step = items[1].offsetLeft - items[0].offsetLeft;
  if (step <= 0) return;
  const x = gsap.getProperty(track, "x");
  const idx = Math.max(0, Math.min(items.length - 1, Math.round((window.innerWidth / 2 - x - items[0].offsetLeft - items[0].offsetWidth / 2) / step)));
  if (idx === lastTouchIdx) return;
  lastTouchIdx = idx;
  bgLayer.style.backgroundColor = projectsData[idx].color;
}

function initGalleryScroll() {
  const itemsContainer = document.querySelector(".horizontal-section");
  const spectrumContainer = document.getElementById("spectrum");
  if(!itemsContainer || !spectrumContainer || !track) return;
  const totalBars = 40;
  for (let i = 0; i < totalBars; i++) {
    const bar = document.createElement("div"); bar.className = "spectrum-bar"; bar.style.height = `${6 + Math.random() * 12}px`; spectrumContainer.appendChild(bar);
  }
  const spectrumBars = document.querySelectorAll(".spectrum-bar");
  let lastActiveBars = -1;
  const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);
  gsap.to(track, { x: getScrollAmount, ease: "none", scrollTrigger: { trigger: itemsContainer, pin: true, scrub: isTouchLayout() ? 0.5 : 1, end: () => `+=${Math.abs(getScrollAmount()) * (isTouchLayout() ? 0.9 : 2.5)}`, invalidateOnRefresh: true, id: "galleryScroll", onUpdate: (self) => { const activeCount = Math.floor(self.progress * totalBars); if (activeCount === lastActiveBars) return; lastActiveBars = activeCount; spectrumBars.forEach((bar, index) => { if (index <= activeCount) bar.classList.add("active"); else bar.classList.remove("active"); }); } } });
}
initGalleryScroll();

let hoverIntentTimer;
let pendingHoverItem = null, hoveredItem = null;
const hoverStarters = new Map();
const prefetchedProjects = new Set();

// Mientras el cursor está sobre una tarjeta se precargan las imágenes del detalle, para que al abrir el proyecto ya estén en caché.
function prefetchProject(data) {
  if (prefetchedProjects.has(data.id)) return;
  prefetchedProjects.add(data.id);
  data.detailImgs.forEach((src) => { if (!/\.(mp4|webm)$/i.test(src)) { const img = new Image(); img.decoding = "async"; img.src = src; } });
}

// Las tarjetas nunca cambian de lugar: cada una ocupa siempre su espacio fijo (12vw + 2vw de separación) y la tarjeta abierta se
// ensancha sobre su vecindad con márgenes negativos. Su huella en la fila no cambia, así que no se recorren las demás tarjetas
// ni la pista; solo se abre y se cierra. Si está cerca del borde de la pantalla se ensancha hacia el lado que tiene lugar.
const CARD_SLOT_VW = 12, CARD_OPEN_VW = 36, CARD_GAP_VW = 2;
let hoverZ = 5;
function openCardBox(item) {
  const vw = window.innerWidth / 100;
  const slotW = CARD_SLOT_VW * vw, extra = (CARD_OPEN_VW - CARD_SLOT_VW) * vw, edge = CARD_GAP_VW * vw;
  const slotLeft = item.getBoundingClientRect().left - (parseFloat(gsap.getProperty(item, "marginLeft")) || 0);
  let left = Math.min(extra / 2, Math.max(0, slotLeft - edge));
  let right = extra - left;
  const over = slotLeft + slotW + right - (window.innerWidth - edge);
  if (over > 0) { right = Math.max(0, right - over); left = extra - right; }
  return { left, right, width: slotW + extra, gap: edge };
}

function activateHover(item, data) {
  if (isTouchLayout()) return;
  hoveredItem = item;
  stopFloatingAndAlign();
  prefetchProject(data);

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

  const box = openCardBox(item);
  item.style.zIndex = String(++hoverZ);
  gsap.to(items, { width: (i, el) => (el === item ? `${box.width}px` : "12vw"), marginLeft: (i, el) => (el === item ? `${-box.left}px` : "0px"), marginRight: (i, el) => (el === item ? `${box.gap - box.right}px` : "2vw"), filter: (i, el) => el === item ? "grayscale(0%) brightness(1)" : "grayscale(100%) brightness(0.3)", duration: 0.8, ease: "power4.out", overwrite: "auto" });

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
}

// Pone en cola el hover de una tarjeta. Si la pista aún se desliza rápido (scroll o cola del scrub) se espera y se reintenta
// en lugar de descartarlo: la tarjeta que quede bajo el cursor se abre en cuanto la galería desacelera.
function queueHover(item, data) {
  if (isTouchLayout()) return;
  clearTimeout(hoverIntentTimer);
  pendingHoverItem = item;
  const tryActivate = () => {
    if (pendingHoverItem !== item || currentOpenProjectIndex !== null) return;
    if (galleryIsMoving()) { hoverIntentTimer = setTimeout(tryActivate, 40); return; }
    pendingHoverItem = null;
    activateHover(item, data);
  };
  hoverIntentTimer = setTimeout(tryActivate, 40);
}

items.forEach((item, index) => {
  const data = projectsData[index];
  hoverStarters.set(item, () => queueHover(item, data));

  item.addEventListener("mouseenter", () => queueHover(item, data));

  item.addEventListener("mouseleave", () => {
    clearTimeout(hoverIntentTimer);
    if (pendingHoverItem === item) pendingHoverItem = null;
    if (hoveredItem === item) hoveredItem = null;
    const vid = item.querySelector(".gallery-video");
    const poster = item.querySelector(".gallery-poster");
    if (vid) { vid.pause(); vid.currentTime = 0; vid.style.opacity = 0; }
    if (poster) poster.style.opacity = 1;
  });

  item.addEventListener("click", () => {
    currentOpenProjectIndex = index; history.pushState({ detail: true, projectId: data.id }, "", "#" + data.id); openDetailView(data);
  });
});

// Respaldo: el navegador no siempre lanza mouseenter cuando la pista se desliza bajo un cursor quieto o se detiene justo debajo de él.
// Con la galería en reposo se consulta qué tarjeta hay realmente bajo el último punto del cursor y, si no está abierta, se abre.
let lastPointer = null, resolveHoverAt = 0;
window.addEventListener("pointermove", (e) => { if (e.pointerType === "mouse") lastPointer = { x: e.clientX, y: e.clientY }; }, { passive: true });
document.documentElement.addEventListener("mouseleave", () => { lastPointer = null; });
gsap.ticker.add(() => {
  const now = performance.now();
  if (now < resolveHoverAt) return;
  resolveHoverAt = now + 100;
  if (!lastPointer || currentOpenProjectIndex !== null || isTouchLayout() || galleryIsMoving()) return;
  const el = document.elementFromPoint(lastPointer.x, lastPointer.y);
  const item = el ? el.closest(".gallery-item") : null;
  if (item && item !== hoveredItem && item !== pendingHoverItem) hoverStarters.get(item)();
});

// Estado de reposo de la galería: fondo oscuro, tarjetas al 12vw en gris, título oculto y flotación activa.
function resetGalleryHover() {
  clearTimeout(hoverIntentTimer); pendingHoverItem = null; hoveredItem = null;
  if (isTouchLayout()) { lastTouchIdx = -1; syncTouchColor(); return; }
  startFloating();

  if(bgLayer) bgLayer.style.backgroundColor = "#141414";
  if(titleContainer) gsap.to(titleContainer, { clipPath: "inset(0 50% 0 50%)", webkitClipPath: "inset(0 50% 0 50%)", opacity: 0, duration: 0.4, ease: "power2.in", overwrite: "auto" });
  gsap.to(items, { width: "12vw", marginLeft: "0px", marginRight: "2vw", filter: "grayscale(100%) brightness(0.6)", duration: 0.8, ease: "power4.out", overwrite: "auto", onComplete: () => { items.forEach((el) => { el.style.zIndex = ""; }); hoverZ = 5; } });

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
}

if(track) {
  track.addEventListener("mouseleave", () => {
    clearTimeout(hoverIntentTimer); pendingHoverItem = null; hoveredItem = null;
    if (currentOpenProjectIndex !== null || isTouchLayout()) return;
    resetGalleryHover();
  });
}

// Al cruzar el umbral (girar el teléfono, cambiar el tamaño de la ventana) se limpian los estilos en línea que dejó el hover de escritorio.
touchLayoutQuery.addEventListener("change", () => {
  floatTweens.forEach(t => t.kill()); floatTweens = [];
  clearTimeout(hoverIntentTimer); pendingHoverItem = null; hoveredItem = null;
  gsap.set(items, { clearProps: "width,filter,marginLeft,marginRight,zIndex" });
  gsap.set(document.querySelectorAll(".img-wrapper, .item-info, .explore-indicator"), { clearProps: "all" });
  if (titleContainer) gsap.set(titleContainer, { opacity: 0 });
  lastTouchIdx = -1;
  if (currentOpenProjectIndex === null) resetGalleryHover();
  ScrollTrigger.refresh();
});

// Selector de idioma: un toque abre/cierra la lista (en táctil no existe :hover) y el enlace "#" ya no manda la página arriba.
const langBtn = document.getElementById("lang-display-btn");
const langWrapper = langBtn ? langBtn.closest(".lang-dropdown-wrapper") : null;
if (langBtn && langWrapper) {
  langBtn.addEventListener("click", (e) => { e.preventDefault(); langWrapper.classList.toggle("open"); });
  document.addEventListener("click", (e) => { if (!langWrapper.contains(e.target)) langWrapper.classList.remove("open"); });
  langWrapper.addEventListener("click", (e) => { if (e.target.closest(".lang-opt")) langWrapper.classList.remove("open"); });
}

const galleryView = document.getElementById("gallery-view"), detailView = document.getElementById("detail-view"), giantLayer = document.getElementById("giant-layer"), closeBtnWrapper = document.getElementById("close-btn-wrapper"), mainHeader = document.getElementById("main-header"), contextText = document.getElementById("context-text"), footerLinks = document.getElementById("footer-links");
let detailScrollTriggers = [];
let detailResizeObserver = null;

function openDetailView(data) {
  savedScrollPosition = window.scrollY; lenis.stop();
  document.querySelectorAll(".gallery-item video").forEach(v => { v.pause(); v.currentTime = 0; });
  
  const setEl = (id, val) => { const el = document.getElementById(id); if(el) el.innerHTML = val; };
  setEl("det-title", data.title[currentLang]); setEl("det-desc", data.desc[currentLang]);
  const link = document.getElementById("det-link"); if(link) { if(data.link) { link.href = data.link; link.style.display = "inline-flex"; } else link.style.display = "none"; }
  updateDetLinkVariant(data);
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
    let boxesHtml = "", thumbsHtml = "";
    data.detailImgs.forEach((src, idx) => {
      const isVideo = src.match(/\.(mp4|webm)$/i);
      const mediaElement = isVideo ? `<video src="${src}" autoplay loop muted playsinline></video>` : `<img src="${src}" alt="${data.title.en} - ${idx + 1}" decoding="async">`;
      const thumbElement = isVideo ? `<video src="${src}" muted preload="metadata"></video>` : `<img src="${src}" alt="" decoding="async">`;
      boxesHtml += `<div class="detail-img-box" id="img-${idx}">${mediaElement}</div>`;
      thumbsHtml += `<div class="thumb-item ${idx === 0 ? "active" : ""}" data-target="img-${idx}">${thumbElement}</div>`;
    });
    imgContainer.innerHTML = boxesHtml; thumbsContainer.innerHTML = thumbsHtml;
  }

  gsap.to(track, { filter: "blur(15px)", scale: 0.95, opacity: 0, duration: 1.2, ease: "power4.inOut" });
  if(giantLayer) gsap.to(giantLayer, { opacity: 0, scale: 0.9, duration: 1.2, ease: "power4.inOut" });
  gsap.to([mainHeader, contextText, footerLinks], { opacity: 0, duration: 0.6, pointerEvents: "none" });

  setTimeout(() => {
    const st = ScrollTrigger.getById("galleryScroll"); if(st) st.disable();
    if(galleryView) galleryView.style.display = "none";
    if(detailView) { detailView.style.display = "block"; window.scrollTo(0, 0); gsap.fromTo(detailView, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.2, ease: "power4.out" }); }
    if(closeBtnWrapper) { closeBtnWrapper.style.display = "flex"; closeBtnWrapper.style.opacity = "0"; gsap.to(closeBtnWrapper, { opacity: 1, duration: 1, delay: 0.4 }); }
    if(pCanvas) { projParticlesActive = true; gsap.to(pCanvas, { opacity: 1, duration: 1.2, delay: 0.2 }); }

    gsap.fromTo(".detail-img-box", { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 1.2, ease: "power4.out", delay: 0.1, onComplete: () => gsap.to(".detail-img-box img, .detail-img-box video", { y: -8, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut", stagger: { each: 0.2, from: "start" } }) });
    lenis.start(); setupDetailScrollSpy(); ScrollTrigger.refresh();

    const dCenter = document.getElementById("det-images");
    if(dCenter) { if(detailResizeObserver) detailResizeObserver.disconnect(); detailResizeObserver = new ResizeObserver(() => ScrollTrigger.refresh()); detailResizeObserver.observe(dCenter); }
  }, 800);
}

function closeDetailView() {
  lenis.stop(); currentOpenProjectIndex = null;
  detailScrollTriggers.forEach((st) => st.kill()); detailScrollTriggers = [];
  if(detailResizeObserver) { detailResizeObserver.disconnect(); detailResizeObserver = null; }
  if(pCanvas) gsap.to(pCanvas, { opacity: 0, duration: 0.6, onComplete: () => { projParticlesActive = false; } });
  if(bgLayer) gsap.to(bgLayer, { backgroundColor: "#141414", duration: 0.8, ease: "power4.inOut" });
  
  gsap.to([detailView, closeBtnWrapper], { opacity: 0, y: 30, duration: 0.8, ease: "power4.inOut", onComplete: () => {
      if(detailView) detailView.style.display = "none";
      if(closeBtnWrapper) closeBtnWrapper.style.display = "none";
      if(galleryView) galleryView.style.display = "block";
      resetGalleryHover();
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
    e.preventDefault(); lenis.stop(); modalAbout.style.display = "block"; aboutParticlesActive = true;
    gsap.fromTo(modalAbout, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power4.out" });
    
    const aboutImg = modalAbout.querySelector(".about-img-box");
    const aboutElements = modalAbout.querySelectorAll(".about-title, .about-subtitle, .about-text, .tech-category-header");
    
    gsap.fromTo(aboutImg, { y: 40, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power4.out", delay: 0.1 });
    gsap.fromTo(aboutElements, { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05, duration: 1.2, ease: "power4.out", delay: 0.15 });
    
    aboutScrollTriggers.forEach((st) => st.kill()); aboutScrollTriggers = [];
    
    setTimeout(() => {
      const techTags = document.querySelectorAll(".tech-tag"); gsap.set(techTags, { opacity: 0, y: 15 });
      aboutScrollTriggers.push(ScrollTrigger.create({ trigger: ".tech-container", scroller: "#about-modal", start: "top 85%", onEnter: () => gsap.to(techTags, { opacity: 1, y: 0, duration: 1, stagger: 0.03, ease: "back.out(1.5)" }) }));
      
      const listItems = document.querySelectorAll(".exp-item, .edu-item"); gsap.set(listItems, { opacity: 0, y: 20 });
      aboutScrollTriggers.push(...ScrollTrigger.batch(listItems, { scroller: "#about-modal", start: "top 92%", once: true, onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, stagger: 0.08, ease: "power3.out", overwrite: true }) }));

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
if(cab && modalAbout) { cab.addEventListener("click", () => { gsap.to(modalAbout, { opacity: 0, duration: 0.5, ease: "power4.inOut", onComplete: () => { modalAbout.style.display = "none"; aboutParticlesActive = false; lenis.start(); } }); }); }