// ─── DATOS ESTÁTICOS DE HITOS ─────────────────────────────────────────────────
const hitos = [
    {
        id: "h1", tipo: "historico", titulo: "Cabildo de Buenos Aires",
        lat: -34.6085, lng: -58.3735, provincia: "Buenos Aires", categoria: "Historia",
        dato_clave: "El 25 de Mayo de 1810 el pueblo se reunió frente al Cabildo bajo la lluvia para exigir un nuevo gobierno.",
        para_chicos: "¡Acá fue donde los argentinos decidieron gobernarse solos por primera vez! Fue como el nacimiento de nuestra patria.",
        wiki_titulo: "Cabildo_de_Buenos_Aires"
    },
    {
        id: "h2", tipo: "historico", titulo: "Casa Histórica de Tucumán",
        lat: -26.8328, lng: -65.2031, provincia: "Tucumán", categoria: "Historia",
        dato_clave: "La firma fue el 9 de julio de 1816, en pleno invierno, con el ejército realista muy cercano.",
        para_chicos: "¡Acá Argentina dijo 'ya no obedecemos al rey de España' y se convirtió en un país libre e independiente!",
        wiki_titulo: "Casa_Histórica_de_la_Independencia"
    },
    {
        id: "h3", tipo: "historico", titulo: "Monumento a la Bandera",
        lat: -32.9475, lng: -60.6305, provincia: "Santa Fe", categoria: "Historia",
        dato_clave: "La bandera celeste y blanca fue creada por Belgrano en 1812 con los colores del cielo y de la Virgen.",
        para_chicos: "En este lugar a orillas del río, Belgrano levantó por primera vez nuestra bandera celeste y blanca. ¡Un momento histórico!",
        wiki_titulo: "Monumento_histórico_nacional_a_la_Bandera"
    },
    {
        id: "t1", tipo: "turistico", titulo: "Cataratas del Iguazú",
        lat: -25.6953, lng: -54.4367, provincia: "Misiones", categoria: "Naturaleza",
        dato_clave: "Casi el 80% de los saltos están del lado argentino. La Garganta del Diablo tiene 80 metros de altura.",
        para_chicos: "¡Un bosque gigante con cataratas enormes y ruidosas! Ahí viven tucanes, mariposas de colores y el yaguareté, el felino más grande de América.",
        wiki_titulo: "Cataratas_del_Iguazú"
    },
    {
        id: "t2", tipo: "turistico", titulo: "Glaciar Perito Moreno",
        lat: -50.4968, lng: -73.0397, provincia: "Santa Cruz", categoria: "Naturaleza",
        dato_clave: "Es uno de los pocos glaciares del mundo que avanza en lugar de achicarse. Tiene 5 km de ancho.",
        para_chicos: "¡Una montaña de hielo celeste gigante que flota en el agua! A veces se rompe con ruidos como truenos. ¡Un espectáculo único!",
        wiki_titulo: "Glaciar_Perito_Moreno"
    },
    {
        id: "t3", tipo: "turistico", titulo: "Ciudad de Buenos Aires",
        lat: -34.6037, lng: -58.3816, provincia: "CABA", categoria: "Cultura Urbana",
        dato_clave: "Es la ciudad con más teatros del mundo después de Nueva York y Londres. Cuna del Tango.",
        para_chicos: "La capital de Argentina: el Obelisco para los festejos, el tango en La Boca y las mejores pizzas de molde del mundo.",
        wiki_titulo: "Buenos_Aires"
    },
    {
        id: "t4", tipo: "turistico", titulo: "Quebrada de Humahuaca",
        lat: -23.2069, lng: -65.3469, provincia: "Jujuy", categoria: "Historia y Cultura",
        dato_clave: "Patrimonio de la Humanidad desde 2003. Destaca el Cerro de los Siete Colores de Purmamarca.",
        para_chicos: "¡Montañas que parecen pintadas con pincel! Tienen tantos minerales distintos que se ven de todos los colores del arcoíris.",
        wiki_titulo: "Quebrada_de_Humahuaca"
    },
    {
        id: "t5", tipo: "turistico", titulo: "San Carlos de Bariloche",
        lat: -41.1335, lng: -71.3103, provincia: "Río Negro", categoria: "Turismo y Aventura",
        dato_clave: "Capital Nacional del Chocolate y punto de inicio de la Ruta de los Siete Lagos.",
        para_chicos: "¡Un lugar mágico con lagos transparentes y montañas para esquiar! Además tiene los chocolates más ricos que probaste en tu vida.",
        wiki_titulo: "San_Carlos_de_Bariloche"
    },
    {
        id: "t6", tipo: "turistico", titulo: "Mendoza y los Andes",
        lat: -32.8908, lng: -68.8272, provincia: "Mendoza", categoria: "Cultura y Aventura",
        dato_clave: "Custodia al Aconcagua (6.962 m), la cumbre más alta de América. Capital Mundial del Malbec.",
        para_chicos: "Ciudad rodeada de viñedos al lado de las montañas más altas de América. ¡Ahí está el Aconcagua que los escaladores sueñan con subir!",
        wiki_titulo: "Provincia_de_Mendoza"
    },
    {
        id: "t7", tipo: "turistico", titulo: "Ushuaia",
        lat: -54.8019, lng: -68.3030, provincia: "Tierra del Fuego", categoria: "Historia y Geografía",
        dato_clave: "La ciudad más austral del mundo y puerta de entrada principal a la Antártida.",
        para_chicos: "¡La ciudad del fin del mundo! Hay pingüinos, montañas con nieve y un tren histórico que usaban para llevar presos a cortar leña.",
        wiki_titulo: "Ushuaia"
    },
    {
        id: "h4",
        tipo: "historico",
        titulo: "Cruce de los Andes",
        lat: -32.8858,
        lng: -69.8558,
        provincia: "Mendoza",
        categoria: "Historia Militar",
        dato_clave: "En 1817 José de San Martín cruzó los Andes con más de 5.000 soldados para liberar Chile.",
        para_chicos: "¡Imaginate cruzar montañas gigantes con caballos, cañones y soldados! San Martín hizo eso para ayudar a liberar América.",
        wiki_titulo: "Cruce_de_los_Andes"
    },
    {
        id: "h5",
        tipo: "historico",
        titulo: "Combate de San Lorenzo",
        lat: -32.7445,
        lng: -60.7323,
        provincia: "Santa Fe",
        categoria: "Historia Militar",
        dato_clave: "Fue la única batalla librada por San Martín en territorio argentino.",
        para_chicos: "Aquí San Martín y sus granaderos pelearon por primera vez para defender el país.",
        wiki_titulo: "Combate_de_San_Lorenzo"
    },
    {
        id: "h6",
        tipo: "historico",
        titulo: "Cueva de las Manos",
        lat: -47.1550,
        lng: -70.6560,
        provincia: "Santa Cruz",
        categoria: "Arqueología",
        dato_clave: "Contiene pinturas rupestres de más de 9.000 años de antigüedad.",
        para_chicos: "Hace miles de años las personas dejaron las huellas de sus manos pintadas sobre las rocas.",
        wiki_titulo: "Cueva_de_las_Manos"
    },
    {
        id: "h7",
        tipo: "historico",
        titulo: "Manzana Jesuítica",
        lat: -31.4201,
        lng: -64.1888,
        provincia: "Córdoba",
        categoria: "Patrimonio Histórico",
        dato_clave: "Es Patrimonio Mundial de la UNESCO desde el año 2000.",
        para_chicos: "Fue uno de los centros educativos más importantes de Sudamérica durante la época colonial.",
        wiki_titulo: "Manzana_Jesuítica"
    },
    {
        id: "t8",
        tipo: "turistico",
        titulo: "Parque Nacional Talampaya",
        lat: -29.7990,
        lng: -67.8460,
        provincia: "La Rioja",
        categoria: "Naturaleza",
        dato_clave: "Sus cañones rojizos alcanzan más de 150 metros de altura.",
        para_chicos: "Parece un planeta de color rojo lleno de paredes gigantes de piedra.",
        wiki_titulo: "Parque_nacional_Talampaya"
    },
    {
        id: "t9",
        tipo: "turistico",
        titulo: "Península Valdés",
        lat: -42.5000,
        lng: -63.9000,
        provincia: "Chubut",
        categoria: "Fauna Marina",
        dato_clave: "Es uno de los mejores lugares del mundo para observar ballenas francas australes.",
        para_chicos: "Podés ver ballenas gigantes saltando cerca de la costa.",
        wiki_titulo: "Península_Valdés"
    },
    {
        id: "t10",
        tipo: "turistico",
        titulo: "Parque Nacional Los Alerces",
        lat: -42.8000,
        lng: -71.8667,
        provincia: "Chubut",
        categoria: "Naturaleza",
        dato_clave: "Protege algunos de los árboles más antiguos de Sudamérica, con más de 2.500 años.",
        para_chicos: "Hay árboles tan viejos que nacieron mucho antes que existiera Argentina.",
        wiki_titulo: "Parque_nacional_Los_Alerces"
    },
    {
        id: "h8",
        tipo: "historico",
        titulo: "Congreso de la Nación Argentina",
        lat: -34.6098,
        lng: -58.3926,
        provincia: "CABA",
        categoria: "Política",
        dato_clave: "Es la sede del Poder Legislativo argentino desde 1906.",
        para_chicos: "Aquí se debaten y aprueban muchas de las leyes que rigen el país.",
        wiki_titulo: "Palacio_del_Congreso_de_la_Nación_Argentina"
    },
    {
        id: "h9",
        tipo: "historico",
        titulo: "Plaza de Mayo",
        lat: -34.6081,
        lng: -58.3702,
        provincia: "CABA",
        categoria: "Historia",
        dato_clave: "Fue escenario de algunos de los acontecimientos políticos más importantes de Argentina.",
        para_chicos: "Es la plaza más famosa del país y donde ocurrieron muchos momentos históricos.",
        wiki_titulo: "Plaza_de_Mayo"
    },
    {
        id: "h10",
        tipo: "historico",
        titulo: "Fuerte de Carmen de Patagones",
        lat: -40.7990,
        lng: -62.9830,
        provincia: "Buenos Aires",
        categoria: "Historia Militar",
        dato_clave: "Fue clave en la defensa argentina durante la guerra con Brasil.",
        para_chicos: "Ayudó a proteger el territorio argentino hace más de 180 años.",
        wiki_titulo: "Carmen_de_Patagones"
    },
    {
        id: "h11",
        tipo: "historico",
        titulo: "Ruinas de San Ignacio",
        lat: -27.2550,
        lng: -55.5330,
        provincia: "Misiones",
        categoria: "Patrimonio Histórico",
        dato_clave: "Son las ruinas jesuíticas mejor conservadas de Argentina.",
        para_chicos: "Parece una ciudad antigua perdida en la selva.",
        wiki_titulo: "San_Ignacio_Miní"
    },
    {
        id: "h12",
        tipo: "historico",
        titulo: "Parque Histórico Vuelta de Obligado",
        lat: -33.5865,
        lng: -59.8050,
        provincia: "Buenos Aires",
        categoria: "Historia Militar",
        dato_clave: "Allí ocurrió la batalla de la Vuelta de Obligado en 1845.",
        para_chicos: "Fue una gran defensa argentina contra barcos extranjeros.",
        wiki_titulo: "Batalla_de_la_Vuelta_de_Obligado"
    },
    {
        id: "t12",
        tipo: "turistico",
        titulo: "Aconcagua",
        lat: -32.6532,
        lng: -70.0109,
        provincia: "Mendoza",
        categoria: "Montañismo",
        dato_clave: "Es la montaña más alta de América con 6.961 metros.",
        para_chicos: "Es la montaña gigante que todos los escaladores sueñan con subir.",
        wiki_titulo: "Aconcagua"
    },
    {
        id: "t13",
        tipo: "turistico",
        titulo: "Mar del Plata",
        lat: -38.0055,
        lng: -57.5426,
        provincia: "Buenos Aires",
        categoria: "Playas",
        dato_clave: "Es el principal destino turístico de verano del país.",
        para_chicos: "Tiene playas enormes, lobos marinos y mucho helado.",
        wiki_titulo: "Mar_del_Plata"
    },
    {
        id: "t14",
        tipo: "turistico",
        titulo: "El Chaltén",
        lat: -49.3315,
        lng: -72.8863,
        provincia: "Santa Cruz",
        categoria: "Aventura",
        dato_clave: "Es considerada la capital nacional del trekking.",
        para_chicos: "Tiene senderos increíbles y montañas que parecen salidas de una película.",
        wiki_titulo: "El_Chaltén"
    },
    {
        id: "t15",
        tipo: "turistico",
        titulo: "Villa La Angostura",
        lat: -40.7612,
        lng: -71.6463,
        provincia: "Neuquén",
        categoria: "Naturaleza",
        dato_clave: "Está rodeada por bosques y lagos de origen glaciar.",
        para_chicos: "Parece un pueblo de cuentos rodeado de montañas.",
        wiki_titulo: "Villa_La_Angostura"
    },
    {
        id: "t16",
        tipo: "turistico",
        titulo: "Ruta de los Siete Lagos",
        lat: -40.1617,
        lng: -71.3531,
        provincia: "Neuquén",
        categoria: "Paisajes",
        dato_clave: "Une San Martín de los Andes con Villa La Angostura.",
        para_chicos: "Es un camino lleno de lagos transparentes y bosques gigantes.",
        wiki_titulo: "Ruta_de_los_Siete_Lagos"
    },
    {
        id: "t17",
        tipo: "turistico",
        titulo: "Parque Nacional Nahuel Huapi",
        lat: -41.1335,
        lng: -71.3103,
        provincia: "Río Negro",
        categoria: "Naturaleza",
        dato_clave: "Fue el primer parque nacional de Argentina.",
        para_chicos: "Tiene lagos, montañas y muchísimos animales.",
        wiki_titulo: "Parque_nacional_Nahuel_Huapi"
    },
    {
        id: "t18",
        tipo: "turistico",
        titulo: "Valle de la Luna",
        lat: -30.1800,
        lng: -67.8200,
        provincia: "San Juan",
        categoria: "Geología",
        dato_clave: "Su paisaje parece de otro planeta.",
        para_chicos: "Parece que caminás por la Luna sin salir de Argentina.",
        wiki_titulo: "Parque_Provincial_Ischigualasto"
    },
    {
        id: "t19",
        tipo: "turistico",
        titulo: "Termas de Río Hondo",
        lat: -27.4930,
        lng: -64.8590,
        provincia: "Santiago del Estero",
        categoria: "Bienestar",
        dato_clave: "Es uno de los complejos termales más importantes de América.",
        para_chicos: "Tiene aguas calientes que salen naturalmente de la tierra.",
        wiki_titulo: "Termas_de_Río_Hondo"
    },
    {
        id: "t20",
        tipo: "turistico",
        titulo: "Parque Nacional Iberá",
        lat: -28.5330,
        lng: -57.1830,
        provincia: "Corrientes",
        categoria: "Fauna",
        dato_clave: "Es uno de los humedales más grandes del mundo.",
        para_chicos: "Podés ver carpinchos, yacarés y muchísimas aves.",
        wiki_titulo: "Esteros_del_Iberá"
    },
    {
        id: "t21",
        tipo: "turistico",
        titulo: "Tren a las Nubes",
        lat: -24.1800,
        lng: -65.4100,
        provincia: "Salta",
        categoria: "Aventura",
        dato_clave: "Alcanza más de 4.000 metros sobre el nivel del mar.",
        para_chicos: "Es un tren que sube tan alto que parece tocar las nubes.",
        wiki_titulo: "Tren_a_las_Nubes"
    }
];
module.exports = hitos;