/* ==========================================================================
   SEBITAS TOYS - DATA DE PRODUCTOS
   Catálogo Oficial: Figuras Anime, Juegos de Mesa, Accesorios & Preventas
   ========================================================================== */

const PRODUCTS_DATA = [
  // ===================== FIGURAS ANIME =====================
  {
    id: "ani-001",
    name: "Monkey D. Luffy - Gear 5 (Tamashii Nations / Bandai)",
    category: "anime",
    subcategory: "One Piece",
    price: 850,
    oldPrice: 940,
    image: "img/products/figure-luffy-gear5.jpg",
    gallery: [
      "img/products/figure-luffy-gear5.jpg",
      "img/hero-banner.jpg"
    ],
    stock: 2,
    badge: "Más Vendido",
    franchise: "One Piece",
    manufacturer: "Bandai Spirits / Tamashii Nations",
    specs: {
      scale: "24 cm de altura",
      material: "PVC / ABS de alta densidad",
      edition: "Figura Estática con Base Diorama y Efectos de Nubes",
      language: "Japón (Importación Oficial)"
    },
    description: "Impresionante figura de Monkey D. Luffy en su forma definitiva 'Gear 5', representando al legendario Guerrero de la Liberación / Nika. Esculpida con dinamismo insuperable, humo de transformación translúcido nacarado, rayos celestes y pedestal transparente de exhibición conmemorativo.",
    isNew: true,
    isFeatured: true
  },
  {
    id: "ani-002",
    name: "Satoru Gojo - Expansión de Dominio: Vacío Inconmensurable",
    category: "anime",
    subcategory: "Jujutsu Kaisen",
    price: 980,
    oldPrice: 1100,
    image: "img/products/figure-gojo.jpg",
    gallery: [
      "img/products/figure-gojo.jpg",
      "img/hero-banner.jpg"
    ],
    stock: 1,
    badge: "Edición Limitada",
    franchise: "Jujutsu Kaisen",
    manufacturer: "FuRyu / F:NEX 1/7 Scale",
    specs: {
      scale: "Escala 1/7 (28 cm de altura)",
      material: "PVC translúcido con efecto de brillo astral",
      edition: "Base hexagonal con grabado japonés y vórtice de energía maldita",
      language: "Japón (Certificado Toei / MAPPA)"
    },
    description: "Espectacular figura de Satoru Gojo realizando su letal técnica 'Muryōkūsho' (Vacío Inconmensurable). Cuenta con antifaz removible revelando sus ojos de los Seis Ojos (Rikugan) pintados a mano, vórtice cósmico azul eléctrico y acabado satinado en su uniforme.",
    isNew: true,
    isFeatured: true
  },
  {
    id: "ani-003",
    name: "Son Goku - Ultra Instinct / Migatte no Gokui",
    category: "anime",
    subcategory: "Dragon Ball",
    price: 480,
    oldPrice: 530,
    image: "img/products/figure-goku.jpg",
    gallery: [
      "img/products/figure-goku.jpg"
    ],
    stock: 3,
    badge: "Original Japón",
    franchise: "Dragon Ball Super",
    manufacturer: "Banpresto / Grandista Masterlise",
    specs: {
      scale: "28 cm de altura",
      material: "PVC / Resina reforzada",
      edition: "Base rocosa destruida con estelas de ki plateado",
      language: "Toei Animation Holograma Auténtico"
    },
    description: "Son Goku en el estado del Ultrainstinto Completo. Cada fibra muscular y desgarro de su vestimenta del Torneo de la Fuerza ha sido fielmente recreado. El cabello plateado cuenta con sombreado aperlado y una base de escombros de combate que resalta en cualquier vitrina.",
    isNew: false,
    isFeatured: true
  },
  {
    id: "ani-004",
    name: "Tanjiro Kamado - Hinokami Kagura (Danza del Dios del Fuego)",
    category: "anime",
    subcategory: "Demon Slayer",
    price: 1150,
    oldPrice: 1280,
    image: "img/products/figure-tanjiro.jpg",
    gallery: [
      "img/products/figure-tanjiro.jpg"
    ],
    stock: 1,
    badge: "Premium Master",
    franchise: "Demon Slayer: Kimetsu no Yaiba",
    manufacturer: "Aniplex+ / Kotobukiya",
    specs: {
      scale: "Escala 1/8 (26 cm con dragón de llamas)",
      material: "PVC / ABS con resina flameante transparente",
      edition: "Doble efecto agua (Respiración de Agua) + dragón de fuego ardiente",
      language: "Japón (Ufotable Oficial)"
    },
    description: "Una obra maestra de coleccionismo. Muestra a Tanjiro Kamado combinando la técnica de la Respiración del Agua con la Danza del Dios del Fuego (Hinokami Kagura). El dragón ígneo translúcido se arremolina alrededor de su katana Nichirin negra sobre una base con textura de rocas incandescentes.",
    isNew: true,
    isFeatured: true
  },
  {
    id: "ani-005",
    name: "Anya Forger - Nendoroid #1956 (Smug Face Edition)",
    category: "anime",
    subcategory: "Spy x Family",
    price: 390,
    oldPrice: 420,
    image: "img/products/figure-anya-nendoroid.jpg",
    gallery: [
      "img/products/figure-anya-nendoroid.jpg"
    ],
    stock: 4,
    badge: "Chibi & Nendoroid",
    franchise: "Spy x Family",
    manufacturer: "Good Smile Company",
    specs: {
      scale: "10 cm de altura (Totalmente articulada)",
      material: "PVC / ABS con acabados mate",
      edition: "Incluye 3 rostros intercambiables (Smug 'Heh', Sorprendida y Llanto cómico) + peluche Quimera",
      language: "Original Good Smile Japón"
    },
    description: "¡La tierna y traviesa telépata de Spy x Family en su versión Nendoroid oficial #1956! Viene con sus características expresiones faciales icónicas (incluyendo su legendaria cara burlona 'Heh'), su peluche del Señor Quimera, base magnética transparente y brazos articulados para recrear cualquier escena divertida.",
    isNew: true,
    isFeatured: false
  },
  {
    id: "ani-006",
    name: "Roronoa Zoro - Asura Demon Kyutoryu (Estilo 9 Espadas)",
    category: "anime",
    subcategory: "One Piece",
    price: 1200,
    oldPrice: 1350,
    image: "img/products/figure-luffy-gear5.jpg",
    gallery: ["img/products/figure-luffy-gear5.jpg"],
    stock: 2,
    badge: "Preventa Especial",
    franchise: "One Piece",
    manufacturer: "Megahouse / Portrait of Pirates (P.O.P)",
    specs: {
      scale: "32 cm de envergadura",
      material: "Resina polystone & PVC",
      edition: "Aura demoníaca púrpura con katanas Enma, Wado Ichimonji y Sandai Kitetsu",
      language: "Toei Animation Gold Sticker"
    },
    description: "La técnica definitiva del Cazador de Piratas. Zoro manifestando el espíritu del dios Asura con tres cabezas y nueve espadas cortando el aire con energía demoníaca púrpura. Escultura de grado museo.",
    isNew: false,
    isFeatured: false
  },
  {
    id: "ani-007",
    name: "Nezuko Kamado - Forma Demoniaca Avanzada (ARTFX J)",
    category: "anime",
    subcategory: "Demon Slayer",
    price: 890,
    oldPrice: 960,
    image: "img/products/figure-tanjiro.jpg",
    gallery: ["img/products/figure-tanjiro.jpg"],
    stock: 2,
    badge: "Original Japón",
    franchise: "Demon Slayer: Kimetsu no Yaiba",
    manufacturer: "Kotobukiya",
    specs: {
      scale: "Escala 1/8 (22 cm)",
      material: "PVC / ABS de alto detalle",
      edition: "Patrón de hojas en la piel, cuerno demoníaco y efectos de Sangre Carmesí",
      language: "Ufotable Original"
    },
    description: "Nezuko en su forma berserk durante la batalla del Distrito del Entretenimiento. Incluye cuerno en la frente, marcas de vid carmesí en su cuerpo y pose de ataque feroz que contrasta con su ternura habitual.",
    isNew: true,
    isFeatured: false
  },

  // ===================== JUEGOS DE MESA =====================
  {
    id: "jue-001",
    name: "Catan: El Juego Base (Edición en Español)",
    category: "juegos",
    subcategory: "Estrategia",
    price: 650,
    oldPrice: 700,
    image: "img/hero-banner.jpg",
    gallery: ["img/hero-banner.jpg"],
    stock: 5,
    badge: "Top Ventas Mundial",
    franchise: "Catan Studio",
    manufacturer: "Devir / Klaus Teuber",
    specs: {
      players: "3 a 4 Jugadores",
      duration: "60 - 90 minutos",
      age: "10+ años",
      language: "Totalmente en Español"
    },
    description: "El fenómeno de mesa que revolucionó el mundo. En Catan, los colonos compiten por construir asentamientos, ciudades y carreteras comerciando estratégicamente trigo, madera, arcilla, ovejas y minerales. ¡El juego imprescindible en cualquier ludoteca!",
    isNew: false,
    isFeatured: true
  },
  {
    id: "jue-002",
    name: "Carcassonne: Nueva Edición (Incluye Expansiones)",
    category: "juegos",
    subcategory: "Familiar",
    price: 460,
    oldPrice: 500,
    image: "img/hero-banner.jpg",
    gallery: ["img/hero-banner.jpg"],
    stock: 3,
    badge: "Clásico Familiar",
    franchise: "Carcassonne",
    manufacturer: "Devir / Hans im Glück",
    specs: {
      players: "2 a 5 Jugadores",
      duration: "35 - 45 minutos",
      age: "7+ años",
      language: "Totalmente en Español"
    },
    description: "Coloca losetas para construir la famosa ciudad medieval amurallada del sur de Francia, sus caminos y monasterios. Despliega estratégicamente a tus seguidores (meeples) como caballeros, monjes, ladrones o campesinos.",
    isNew: false,
    isFeatured: true
  },
  {
    id: "jue-003",
    name: "Dixit: Nueva Edición (84 Cartas Ilustradas de Ensueño)",
    category: "juegos",
    subcategory: "Party Game",
    price: 440,
    oldPrice: 480,
    image: "img/hero-banner.jpg",
    gallery: ["img/hero-banner.jpg"],
    stock: 4,
    badge: "Creatividad Pura",
    franchise: "Dixit",
    manufacturer: "Libellud / Asmodee",
    specs: {
      players: "3 a 8 Jugadores",
      duration: "30 minutos",
      age: "8+ años",
      language: "Español (Independiente del idioma)"
    },
    description: "Un juego poético y emocionante de deducción visual. Cada ronda el cuentacuentos elige una carta y da una pista enigmática. Los demás jugadores deben elegir la carta de su mano que mejor encaje con la frase. ¡Ganador del prestigioso Spiel des Jahres!",
    isNew: false,
    isFeatured: true
  },
  {
    id: "jue-004",
    name: "7 Wonders Duel (El Mejor Juego Exclusivo para 2 Jugadores)",
    category: "juegos",
    subcategory: "Parejas",
    price: 390,
    oldPrice: 420,
    image: "img/hero-banner.jpg",
    gallery: ["img/hero-banner.jpg"],
    stock: 2,
    badge: "Premio #1 Parejas",
    franchise: "7 Wonders",
    manufacturer: "Repos Production / Asmodee",
    specs: {
      players: "2 Jugadores",
      duration: "30 minutos",
      age: "10+ años",
      language: "Español"
    },
    description: "Diseñado por Antoine Bauza y Bruno Cathala. Lidera una de las dos grandes civilizaciones del mundo antiguo a lo largo de 3 Eras. Consigue la victoria mediante supremacía militar, supremacía científica o victoria por puntos civiles.",
    isNew: false,
    isFeatured: true
  },
  {
    id: "jue-005",
    name: "Azul: Edición Clásica de Mosaicos Reales",
    category: "juegos",
    subcategory: "Estrategia",
    price: 590,
    oldPrice: 640,
    image: "img/hero-banner.jpg",
    gallery: ["img/hero-banner.jpg"],
    stock: 2,
    badge: "Calidad Premium",
    franchise: "Azul Series",
    manufacturer: "Plan B Games / Asmodee",
    specs: {
      players: "2 a 4 Jugadores",
      duration: "30 - 45 minutos",
      age: "8+ años",
      language: "Español"
    },
    description: "Inspirado en los hermosos azulejos moriscos del Palacio Real de Évora en Portugal. Elige los azulejos de las fábricas con astucia, optimiza los patrones en tu muro y evita desperdiciar piezas que resten puntos.",
    isNew: false,
    isFeatured: false
  },
  {
    id: "jue-006",
    name: "Coffee Rush (Cafetería Barista Frenética)",
    category: "juegos",
    subcategory: "Familiar",
    price: 450,
    oldPrice: 490,
    image: "img/hero-banner.jpg",
    gallery: ["img/hero-banner.jpg"],
    stock: 2,
    badge: "Sensación Viral",
    franchise: "Coffee Rush",
    manufacturer: "Korea Boardgames / Asmodee",
    specs: {
      players: "2 a 4 Jugadores",
      duration: "30 minutos",
      age: "8+ años",
      language: "Español"
    },
    description: "¡Conviértete en el mejor barista! Gestiona ingredientes físicos hermosos (granos de café, hielo, gotas de leche, vapor, chocolate) en tu taza para despachar los pedidos de tus clientes antes de que dejen malas reseñas.",
    isNew: true,
    isFeatured: false
  },
  {
    id: "jue-007",
    name: "Bang! El Juego de Cartas del Salvaje Oeste",
    category: "juegos",
    subcategory: "Roles Ocultos",
    price: 320,
    oldPrice: 350,
    image: "img/hero-banner.jpg",
    gallery: ["img/hero-banner.jpg"],
    stock: 3,
    badge: "Diversión Grupal",
    franchise: "Bang!",
    manufacturer: "DV Giochi",
    specs: {
      players: "4 a 7 Jugadores",
      duration: "20 - 40 minutos",
      age: "8+ años",
      language: "Español"
    },
    description: "¿Quién es el Sheriff? ¿Quiénes son los Forajidos y quién es el Renegado? Un juego legendario de faroleo, disparos, dinamitas y duelos al mediodía donde nadie sabe a ciencia cierta quién está en su equipo.",
    isNew: false,
    isFeatured: false
  },
  {
    id: "jue-008",
    name: "Coup X: Edición Aniversario (Roles Secretos & Farol)",
    category: "juegos",
    subcategory: "Roles Ocultos",
    price: 260,
    oldPrice: 290,
    image: "img/hero-banner.jpg",
    gallery: ["img/hero-banner.jpg"],
    stock: 3,
    badge: "Party Game Rápido",
    franchise: "Coup Dystopian",
    manufacturer: "Indie Boards & Cards",
    specs: {
      players: "2 a 10 Jugadores",
      duration: "15 minutos",
      age: "10+ años",
      language: "Español"
    },
    description: "En una ciudad futurista corrupta dirigida por oligarcas, manipula, miente y elimina la influencia de tus rivales para quedar como el único sobreviviente con poder supremo. ¡Rondas hiperdinámicas!",
    isNew: false,
    isFeatured: false
  },

  // ===================== ACCESORIOS & TCG =====================
  {
    id: "acc-001",
    name: "Protectores Dragon Shield Standard Matte (100 Unidades)",
    category: "accesorios",
    subcategory: "Protectores",
    price: 110,
    oldPrice: 125,
    image: "img/products/figure-luffy-gear5.jpg",
    gallery: ["img/products/figure-luffy-gear5.jpg"],
    stock: 12,
    badge: "Protección Top",
    franchise: "Dragon Shield",
    manufacturer: "Arcane Tinmen",
    specs: {
      scale: "Tamaño Standard (63x88mm)",
      material: "Polipropileno libre de ácido / Archival Safe",
      edition: "Caja para 75+ cartas con doble textura antideslizante",
      language: "Dinamarca"
    },
    description: "Los protectores de cartas más resistentes del mundo para juegos como Magic, Pokémon, One Piece TCG, Yu-Gi-Oh y juegos de mesa. Acabado mate para un barajeo suave sin reflejos.",
    isNew: false,
    isFeatured: false
  },
  {
    id: "acc-002",
    name: "Playmat Tapete Anime One Piece Gear 5 Nika (60x35cm)",
    category: "accesorios",
    subcategory: "Tapetes",
    price: 140,
    oldPrice: 160,
    image: "img/products/figure-luffy-gear5.jpg",
    gallery: ["img/products/figure-luffy-gear5.jpg"],
    stock: 5,
    badge: "Bordes Cosidos",
    franchise: "One Piece",
    manufacturer: "Sebitas Toys Custom Gear",
    specs: {
      scale: "60 cm x 35 cm (Grosor 3mm)",
      material: "Goma de neopreno natural antideslizante con tela microfibra HD",
      edition: "Bordes con costura reforzada anti-desgaste",
      language: "Universal"
    },
    description: "Tapete de juego profesional de alta resolución para jugar cartas coleccionables o usar como mousepad XXL de escritorio gamer. Superficie ultrasuave con base de goma adherente.",
    isNew: true,
    isFeatured: false
  },
  {
    id: "acc-003",
    name: "Set de 7 Dados Poliédricos RPG Galaxia Resina con Bolsa",
    category: "accesorios",
    subcategory: "Dados RPG",
    price: 85,
    oldPrice: 95,
    image: "img/hero-banner.jpg",
    gallery: ["img/hero-banner.jpg"],
    stock: 8,
    badge: "D&D y Rol",
    franchise: "Dungeons & Dragons",
    manufacturer: "Q-Workshop / Chessex Style",
    specs: {
      scale: "Set de 7 dados (D4, D6, D8, D10, D%, D12, D20)",
      material: "Resina acrílica brillante con purpurina cósmica",
      edition: "Incluye bolsa de terciopelo negro con cordón",
      language: "Números grabados en dorado nítido"
    },
    description: "Hermoso juego de dados para juegos de rol como Calabozos y Dragones, Pathfinder o Call of Cthulhu. Balance de peso equilibrado y números dorados legibles.",
    isNew: false,
    isFeatured: false
  },

  // ===================== PREVENTAS EXCLUSIVAS =====================
  {
    id: "prev-001",
    name: "PREVENTA: Chainsaw Man - Denji & Pochita S.H.Figuarts",
    category: "preventas",
    subcategory: "Chainsaw Man",
    price: 580,
    oldPrice: 650,
    image: "img/products/figure-gojo.jpg",
    gallery: ["img/products/figure-gojo.jpg"],
    stock: 4,
    badge: "Reserva con Bs. 100",
    franchise: "Chainsaw Man",
    manufacturer: "Bandai Spirits / S.H.Figuarts",
    specs: {
      scale: "15 cm (Articulación de última generación)",
      material: "PVC / ABS con motosierras articuladas",
      edition: "Incluye mini figura de Pochita y partes intercambiables",
      language: "Llegada Estimada: Próximo Mes"
    },
    description: "Asegura tu preventa exclusiva reservando con solo Bs. 100 y cancela el saldo a la llegada del lote desde Japón. S.H.Figuarts de máxima posabilidad con detalles sangrientos y cuchillas afiladas.",
    isNew: true,
    isFeatured: true
  }
];

// Constante de contacto de la tienda Sebitas Toys
const STORE_CONFIG = {
  name: "Sebitas Toys",
  slogan: "Tu tienda de Figuras Anime & Juegos de Mesa en Bolivia",
  phone: "+591 78776168", // Teléfono / WhatsApp oficial
  phoneRaw: "59178776168",
  email: "contacto@sebitastoys.com.bo",
  location: "La Paz, Bolivia",
  deliveryInfo: "Entregas en La Paz y El Alto | Envíos diarios a Santa Cruz, Cochabamba, Oruro, Sucre, Tarija, Potosí, Beni y Pando",
  currency: "Bs.",
  logoUrl: "img/logo.png",
  socials: {
    facebook: "https://facebook.com/sebitastoys",
    tiktok: "https://tiktok.com/@sebitastoys",
    instagram: "https://instagram.com/sebitastoys"
  }
};
