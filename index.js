const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const jwt = require('jsonwebtoken'); // NUEVO: Importamos la librería JWT

const app = express();
const port = 3000;
const SECRET_KEY = 'historiar_secreto_2026'; // NUEVO: Clave secreta para firmar los tokens

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

// ─── AUTH & MIDDLEWARE ────────────────────────────────────────────────────────

// Middleware "Patovica": Verifica que la petición tenga un Token válido
function verificarToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(403).json({ error: "Acceso denegado. No hay token." });

    // El formato esperado es "Bearer <token>"
    const token = authHeader.split(' ')[1];

    jwt.verify(token, SECRET_KEY, (err, decodificado) => {
        if (err) return res.status(401).json({ error: "Token inválido o expirado." });
        req.usuarioAuth = decodificado.usuario; // Guardamos el usuario real desencriptado
        next(); // Lo dejamos pasar
    });
}

app.post('/registro', (req, res) => {
    const { usuario, password } = req.body;
    if (!usuario || !password) return res.status(400).json({ error: "Completá todos los campos." });
    if (password.length < 4) return res.status(400).json({ error: "La contraseña debe tener al menos 4 caracteres." });

    db.run(
        `INSERT INTO usuarios (usuario, password) VALUES (?, ?)`,
        [usuario.trim(), password],
        (err) => {
            if (err) return res.status(409).json({ error: "Ese nombre de usuario ya existe." });
            // Generamos el token seguro
            const token = jwt.sign({ usuario: usuario.trim() }, SECRET_KEY, { expiresIn: '2h' });
            res.json({ ok: true, usuario: usuario.trim(), token });
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
            // Generamos el token seguro
            const token = jwt.sign({ usuario: row.usuario }, SECRET_KEY, { expiresIn: '2h' });
            res.json({ ok: true, usuario: row.usuario, token });
        }
    );
});

// ─── HITOS ────────────────────────────────────────────────────────────────────

// Única ruta principal para pedir los hitos, preparada para filtrar
app.get('/api/hitos', (req, res) => {
    const { tipo } = req.query;

    // Si viene un tipo en la URL (ej: /api/hitos?tipo=historico), filtramos. Si no, mandamos todos.
    const resultado = tipo ? hitos.filter(h => h.tipo === tipo) : hitos;

    // Devolvemos la respuesta estructurada
    res.json({
        status: "success",
        total: resultado.length,
        data: resultado
    });
});

// ─── INTEGRACIÓN API EXTERNA (WIKIPEDIA) ──────────────────────────────────
app.get('/api/detalle/:wiki_titulo', async (req, res) => {
    const titulo = req.params.wiki_titulo;

    try {
        const wikiResponse = await fetch(`https://es.wikipedia.org/api/rest_v1/page/summary/${titulo}`);
        const wikiData = await wikiResponse.json();

        if (wikiResponse.ok) {
            const imagenHD = wikiData.originalimage ? wikiData.originalimage.source : (wikiData.thumbnail ? wikiData.thumbnail.source : null);

            res.json({
                exito: true,
                descripcion: wikiData.extract,
                imagen: imagenHD,
                wiki_url: wikiData.content_urls ? wikiData.content_urls.desktop.page : `https://es.wikipedia.org/wiki/${titulo}` // <-- URL CLAVE
            });
        } else {
            res.status(404).json({ exito: false, error: "Información no encontrada en Wikipedia" });
        }
    } catch (error) {
        console.error("Error al consultar Wikipedia:", error);
        res.status(500).json({ exito: false, error: "Error en el servidor al consultar API externa" });
    }
});

// ─── FAVORITOS (PROTEGIDOS CON JWT) ───────────────────────────────────────────

app.post('/guardar-favorito', verificarToken, (req, res) => {
    const { id_hito } = req.body;
    const id_usuario = req.usuarioAuth; // ¡Lo sacamos del token seguro!
    if (!id_hito) return res.status(400).json({ error: "Falta el hito." });

    db.get(`SELECT id FROM favoritos WHERE id_usuario = ? AND id_hito = ?`, [id_usuario, id_hito], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (row) return res.json({ mensaje: "Ya está en tus favoritos.", yaExistia: true });

        db.run(`INSERT INTO favoritos (id_usuario, id_hito) VALUES (?, ?)`, [id_usuario, id_hito], (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ mensaje: "¡Guardado en favoritos!", nuevo: true });
        });
    });
});

app.delete('/favoritos', verificarToken, (req, res) => {
    const { id_hito } = req.body;
    const id_usuario = req.usuarioAuth; // ¡Lo sacamos del token seguro!
    db.run(`DELETE FROM favoritos WHERE id_usuario = ? AND id_hito = ?`, [id_usuario, id_hito], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: "Eliminado de favoritos." });
    });
});

app.listen(port, () => console.log(`✅  HistoriAr en http://localhost:${port}`));