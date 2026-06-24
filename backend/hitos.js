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
    }
];
module.exports = hitos;