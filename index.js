const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

const db = new sqlite3.Database('./historiar.db');

db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario  TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
)`);

db.run(`CREATE TABLE IF NOT EXISTS favoritos (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    id_usuario TEXT NOT NULL,
    id_hito    TEXT NOT NULL,
    fecha      TEXT DEFAULT (datetime('now'))
)`);

app.use(express.static('public'));
app.use(express.json());

const hitos = [
    {
        id: "h1", tipo: "historico", titulo: "Cabildo de Buenos Aires",
        lat: -34.6085, lng: -58.3735, provincia: "Buenos Aires", categoria: "Historia",
        desc: "El Cabildo fue el epicentro de la Revolución de Mayo de 1810, donde se gestó el primer gobierno patrio. Era una institución colonial con funciones judiciales y administrativas, y fue el lugar donde el pueblo se reunió para exigir la renuncia del virrey Cisneros.\n\nHoy funciona como Museo Nacional con reliquias coloniales y revolucionarias. Aunque su estructura fue modificada para abrir las avenidas de Mayo y Julio A. Roca, sigue siendo el símbolo máximo de la libertad argentina.",
        dato_clave: "El 25 de Mayo de 1810 el pueblo se reunió frente al Cabildo bajo la lluvia para exigir un nuevo gobierno.",
        para_chicos: "¡Acá fue donde los argentinos decidieron gobernarse solos por primera vez! Fue como el nacimiento de nuestra patria.",
        imagen: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/95/9d/28/el-cabildo.jpg?w=1200&h=-1&s=1"
    },
    {
        id: "h2", tipo: "historico", titulo: "Casa Histórica de Tucumán",
        lat: -26.8328, lng: -65.2031, provincia: "Tucumán", categoria: "Historia",
        desc: "Conocida como la 'Casa de Tucumán', este edificio fue la sede del Congreso que declaró la Independencia el 9 de julio de 1816. La 'Sala de la Jura' es el único ambiente original conservado de la estructura del siglo XVIII.\n\nEl edificio fue reconstruido en los años 40 basándose en planos históricos. Cada año miles de estudiantes visitan el salón donde los congresales firmaron el acta que rompió definitivamente los lazos con la corona española.",
        dato_clave: "La firma fue el 9 de julio de 1816, en pleno invierno, con el ejército realista muy cercano.",
        para_chicos: "¡Acá Argentina dijo 'ya no obedecemos al rey de España' y se convirtió en un país libre e independiente!",
        imagen: "https://www.tucumanturismo.gob.ar/uploads/image/f852be907865f9733cc856c9d747a08b.jpg"
    },
    {
        id: "h3", tipo: "historico", titulo: "Monumento a la Bandera",
        lat: -32.9475, lng: -60.6305, provincia: "Santa Fe", categoria: "Historia",
        desc: "Ubicado en Rosario a orillas del Paraná, este monumento marca el sitio exacto donde Manuel Belgrano izó por primera vez la bandera argentina el 27 de febrero de 1812. El complejo simboliza la nave de la patria surcando las aguas.\n\nBajo la torre principal está la Cripta de Belgrano. Es el escenario central de los actos del 20 de junio, Día de la Bandera.",
        dato_clave: "La bandera celeste y blanca fue creada por Belgrano en 1812 con los colores del cielo y de la Virgen.",
        para_chicos: "En este lugar a orillas del río, Belgrano levantó por primera vez nuestra bandera celeste y blanca. ¡Un momento histórico!",
        imagen: "https://eldiariodesalud.com/wp-content/uploads/2021/01/monumento-a-la-bandera-rosario.jpg"
    },
    {
        id: "t1", tipo: "turistico", titulo: "Cataratas del Iguazú",
        lat: -25.6953, lng: -54.4367, provincia: "Misiones", categoria: "Naturaleza",
        desc: "Las Cataratas del Iguazú son un espectáculo sin igual: casi 275 saltos de agua rodeados de selva subtropical. El 80% de los saltos están del lado argentino, incluyendo la Garganta del Diablo de 80 metros de altura.\n\nDeclaradas Patrimonio de la Humanidad por la UNESCO, el Parque Nacional alberga una biodiversidad extraordinaria: tapires, yaguaretés, tucanes y miles de mariposas habitan este ecosistema único.",
        dato_clave: "Casi el 80% de los saltos están del lado argentino. La Garganta del Diablo tiene 80 metros de altura.",
        para_chicos: "¡Un bosque gigante con cataratas enormes y ruidosas! Ahí viven tucanes, mariposas de colores y el yaguareté, el felino más grande de América.",
        imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Iguazufalls.jpg/1280px-Iguazufalls.jpg"
    },
    {
        id: "t2", tipo: "turistico", titulo: "Glaciar Perito Moreno",
        lat: -50.4968, lng: -73.0397, provincia: "Santa Cruz", categoria: "Naturaleza",
        desc: "El Perito Moreno es uno de los pocos glaciares del mundo que no retrocede sino que avanza. Con 5 km de ancho y 60 metros sobre el agua, es uno de los espectáculos más imponentes del planeta.\n\nUbicado en el Parque Nacional Los Glaciares (Patrimonio de la Humanidad), se pueden ver bloques de hielo desprenderse y caer al lago Argentino con un estruendo impresionante.",
        dato_clave: "Es uno de los pocos glaciares del mundo que avanza en lugar de achicarse. Tiene 5 km de ancho.",
        para_chicos: "¡Una montaña de hielo celeste gigante que flota en el agua! A veces se rompe con ruidos como truenos. ¡Un espectáculo único!",
        imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Punta_Bandera_-_Perito_Moreno_Glacier.JPG/1280px-Punta_Bandera_-_Perito_Moreno_Glacier.JPG"
    },
    {
        id: "t3", tipo: "turistico", titulo: "Ciudad de Buenos Aires",
        lat: -34.6037, lng: -58.3816, provincia: "CABA", categoria: "Cultura Urbana",
        desc: "Buenos Aires combina arquitectura europea con cultura latinoamericana. Tiene más teatros que ninguna ciudad del hemisferio sur y es la cuna del tango, Patrimonio Inmaterial de la Humanidad.\n\nDesde el colorido barrio de La Boca hasta la elegante Recoleta, cada rincón tiene su personalidad. Famosa por su gastronomía, vida nocturna y sus históricos Cafés Notables.",
        dato_clave: "Es la ciudad con más teatros del mundo después de Nueva York y Londres. Cuna del Tango.",
        para_chicos: "La capital de Argentina: el Obelisco para los festejos, el tango en La Boca y las mejores pizzas de molde del mundo.",
        imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Obelisco_buenos_aires.jpg/800px-Obelisco_buenos_aires.jpg"
    },
    {
        id: "t4", tipo: "turistico", titulo: "Quebrada de Humahuaca",
        lat: -23.2069, lng: -65.3469, provincia: "Jujuy", categoria: "Historia y Cultura",
        desc: "La Quebrada de Humahuaca es un corredor cultural de 155 km en el noroeste argentino, declarado Patrimonio Mundial por la UNESCO en 2003. Montañas teñidas de rojo, naranja, verde y amarillo por sus minerales.\n\nEl Cerro de los Siete Colores en Purmamarca es uno de los paisajes más fotografiados del país.",
        dato_clave: "Patrimonio de la Humanidad desde 2003. Destaca el Cerro de los Siete Colores de Purmamarca.",
        para_chicos: "¡Montañas que parecen pintadas con pincel! Tienen tantos minerales distintos que se ven de todos los colores del arcoíris.",
        imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Cerro_de_los_siete_colores_Purmamarca.jpg/1280px-Cerro_de_los_siete_colores_Purmamarca.jpg"
    },
    {
        id: "t5", tipo: "turistico", titulo: "San Carlos de Bariloche",
        lat: -41.1335, lng: -71.3103, provincia: "Río Negro", categoria: "Turismo y Aventura",
        desc: "Bariloche es una ciudad de cuento rodeada de lagos cristalinos y montañas nevadas, con arquitectura alpina única. Es el principal destino de invierno del país y la puerta a la Ruta de los Siete Lagos.\n\nFamosa por sus chocolates artesanales, también es referente del trekking y el kayak en el Parque Nacional Nahuel Huapi.",
        dato_clave: "Capital Nacional del Chocolate y punto de inicio de la Ruta de los Siete Lagos.",
        para_chicos: "¡Un lugar mágico con lagos transparentes y montañas para esquiar! Además tiene los chocolates más ricos que probaste en tu vida.",
        imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Bariloche_Cathedral_mountain.jpg/1280px-Bariloche_Cathedral_mountain.jpg"
    },
    {
        id: "t6", tipo: "turistico", titulo: "Mendoza y los Andes",
        lat: -32.8908, lng: -68.8272, provincia: "Mendoza", categoria: "Cultura y Aventura",
        desc: "Mendoza es un oasis de cultura y aventura al pie de los Andes. Capital mundial del vino Malbec, sus bodegas reciben visitantes de todo el planeta.\n\nDesde aquí se accede al Cerro Aconcagua (6.962 m), la cima más alta de América. La gastronomía, las rutas del vino y el rafting completan una experiencia única.",
        dato_clave: "Custodia al Aconcagua (6.962 m), la cumbre más alta de América. Capital Mundial del Malbec.",
        para_chicos: "Ciudad rodeada de viñedos al lado de las montañas más altas de América. ¡Ahí está el Aconcagua que los escaladores sueñan con subir!",
        imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Aconcagua-Argentina.jpg/1280px-Aconcagua-Argentina.jpg"
    },
    {
        id: "t7", tipo: "turistico", titulo: "Ushuaia",
        lat: -54.8019, lng: -68.3030, provincia: "Tierra del Fuego", categoria: "Historia y Geografía",
        desc: "Ushuaia es la ciudad más austral del mundo y la puerta principal al continente antártico. Rodeada por el Canal Beagle y el Parque Nacional Tierra del Fuego, ofrece paisajes de una belleza extrema.\n\nEl Tren del Fin del Mundo, que transportaba presos para cortar leña, es hoy una atracción histórica. Desde el puerto parten los cruceros hacia la Antártida.",
        dato_clave: "La ciudad más austral del mundo y puerta de entrada principal a la Antártida.",
        para_chicos: "¡La ciudad del fin del mundo! Hay pingüinos, montañas con nieve y un tren histórico que usaban para llevar presos a cortar leña.",
        imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Ushuaia_from_the_Beagle_Channel.jpg/1280px-Ushuaia_from_the_Beagle_Channel.jpg"
    }
];

// ─── AUTH ─────────────────────────────────────────────────────────────────────

app.post('/registro', (req, res) => {
    const { usuario, password } = req.body;
    if (!usuario || !password) return res.status(400).json({ error: "Completá todos los campos." });
    if (password.length < 4) return res.status(400).json({ error: "La contraseña debe tener al menos 4 caracteres." });

    db.run(
        `INSERT INTO usuarios (usuario, password) VALUES (?, ?)`,
        [usuario.trim(), password],
        (err) => {
            if (err) return res.status(409).json({ error: "Ese nombre de usuario ya existe." });
            res.json({ ok: true, usuario: usuario.trim() });
        }
    );
});

app.post('/login', (req, res) => {
    const { usuario, password } = req.body;
    if (!usuario || !password) return res.status(400).json({ error: "Completá todos los campos." });

    db.get(
        `SELECT * FROM usuarios WHERE usuario = ? AND password = ?`,
        [usuario.trim(), password],
        (err, row) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!row) return res.status(401).json({ error: "Usuario o contraseña incorrectos." });
            res.json({ ok: true, usuario: row.usuario });
        }
    );
});

// ─── HITOS ────────────────────────────────────────────────────────────────────

app.get('/hitos', (req, res) => res.json(hitos));

app.get('/api/hitos', (req, res) => {
    const { tipo } = req.query;
    const resultado = tipo ? hitos.filter(h => h.tipo === tipo) : hitos;
    res.json({ status: "success", total: resultado.length, data: resultado });
});

// ─── FAVORITOS ────────────────────────────────────────────────────────────────

app.post('/guardar-favorito', (req, res) => {
    const { id_hito, id_usuario } = req.body;
    if (!id_hito || !id_usuario) return res.status(400).json({ error: "Faltan datos." });

    db.get(
        `SELECT id FROM favoritos WHERE id_usuario = ? AND id_hito = ?`,
        [id_usuario, id_hito],
        (err, row) => {
            if (err) return res.status(500).json({ error: err.message });
            if (row) return res.json({ mensaje: "Ya está en tus favoritos.", yaExistia: true });

            db.run(
                `INSERT INTO favoritos (id_usuario, id_hito) VALUES (?, ?)`,
                [id_usuario, id_hito],
                (err) => {
                    if (err) return res.status(500).json({ error: err.message });
                    res.json({ mensaje: "¡Guardado en favoritos!", nuevo: true });
                }
            );
        }
    );
});

app.get('/favoritos/:usuario', (req, res) => {
    db.all(
        `SELECT id_hito FROM favoritos WHERE id_usuario = ?`,
        [req.params.usuario],
        (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            const ids = rows.map(r => r.id_hito);
            res.json({ status: "success", data: hitos.filter(h => ids.includes(h.id)) });
        }
    );
});

app.delete('/favoritos', (req, res) => {
    const { id_hito, id_usuario } = req.body;
    db.run(
        `DELETE FROM favoritos WHERE id_usuario = ? AND id_hito = ?`,
        [id_usuario, id_hito],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ mensaje: "Eliminado de favoritos." });
        }
    );
});

app.listen(port, () => console.log(`✅  HistoriAr en http://localhost:${port}`));