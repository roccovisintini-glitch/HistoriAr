const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose'); // Usamos Mongoose para conectarnos a la nube
const path = require('path');

const app = express();
const port = 3000;
const SECRET_KEY = 'historiar_secreto_2026';
const hitos = require('./hitos');

// ─── CONEXIÓN A MONGODB ATLAS (CON TU LINK REAL) ──────────────────────────────
const MONGO_URI = 'mongodb+srv://HistoriArApis:WGiSNvPGr72CONsj@historiar.gdrzfm8.mongodb.net/HistoriAr?appName=HistoriAr';

mongoose.connect(MONGO_URI)
    .then(() => console.log('☁️  Conectado a MongoDB Atlas con éxito'))
    .catch(err => console.error('❌ Error conectando a MongoDB:', err));

// ─── MODELOS DE DATOS (SCHEMAS NOSQL - CLASE 6) ───────────────────────────────
const usuarioSchema = new mongoose.Schema({
    usuario: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const Usuario = mongoose.model('Usuario', usuarioSchema);

const favoritoSchema = new mongoose.Schema({
    id_usuario: { type: String, required: true },
    id_hito: { type: String, required: true },
    fecha: { type: Date, default: Date.now }
});
const Favorito = mongoose.model('Favorito', favoritoSchema);

app.use(express.static(path.join(__dirname, '../frontend')));
app.use(express.json());

// ─── AUTH & MIDDLEWARE CON JWT ────────────────────────────────────────────────

function verificarToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(403).json({ error: "Acceso denegado. No hay token." });

    const token = authHeader.split(' ')[1];

    jwt.verify(token, SECRET_KEY, (err, decodificado) => {
        if (err) return res.status(401).json({ error: "Token inválido o expirado." });
        req.usuarioAuth = decodificado.usuario;
        next();
    });
}

app.post('/registro', async (req, res) => {
    const { usuario, password } = req.body;
    if (!usuario || !password) return res.status(400).json({ error: "Completá todos los campos." });
    if (password.length < 4) return res.status(400).json({ error: "La contraseña debe tener al menos 4 caracteres." });

    try {
        const existe = await Usuario.findOne({ usuario: usuario.trim() });
        if (existe) return res.status(409).json({ error: "Ese nombre de usuario ya existe." });

        await Usuario.create({ usuario: usuario.trim(), password });
        const token = jwt.sign({ usuario: usuario.trim() }, SECRET_KEY, { expiresIn: '2h' });
        res.json({ ok: true, usuario: usuario.trim(), token });
    } catch (err) {
        res.status(500).json({ error: "Error interno del servidor al registrarse." });
    }
});

app.post('/login', async (req, res) => {
    const { usuario, password } = req.body;
    if (!usuario || !password) return res.status(400).json({ error: "Completá todos los campos." });

    try {
        const user = await Usuario.findOne({ usuario: usuario.trim(), password });
        if (!user) return res.status(401).json({ error: "Usuario o contraseña incorrectos." });

        const token = jwt.sign({ usuario: user.usuario }, SECRET_KEY, { expiresIn: '2h' });
        res.json({ ok: true, usuario: user.usuario, token });
    } catch (err) {
        res.status(500).json({ error: "Error interno del servidor al iniciar sesión." });
    }
});

// ─── RUTAS DEL MAPA ───────────────────────────────────────────────────────────

app.get('/api/hitos', (req, res) => {
    const { tipo } = req.query;
    const resultado = tipo ? hitos.filter(h => h.tipo === tipo) : hitos;
    res.json({ status: "success", total: resultado.length, data: resultado });
});

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
                wiki_url: wikiData.content_urls ? wikiData.content_urls.desktop.page : `https://es.wikipedia.org/wiki/${titulo}`
            });
        } else {
            res.status(404).json({ exito: false, error: "Información no encontrada en Wikipedia" });
        }
    } catch (error) {
        res.status(500).json({ exito: false, error: "Error en el servidor al consultar API externa" });
    }
});

// ─── FAVORITOS (PROTEGIDOS CON JWT Y PERSISTIDOS EN MONGO) ────────────────────

app.post('/guardar-favorito', verificarToken, async (req, res) => {
    const { id_hito } = req.body;
    const id_usuario = req.usuarioAuth;
    if (!id_hito) return res.status(400).json({ error: "Falta el hito." });

    try {
        const existe = await Favorito.findOne({ id_usuario, id_hito });
        if (existe) return res.json({ mensaje: "Ya está en tus favoritos.", yaExistia: true });

        await Favorito.create({ id_usuario, id_hito });
        res.json({ mensaje: "¡Guardado en favoritos!", nuevo: true });
    } catch (err) {
        res.status(500).json({ error: "Error guardando favorito." });
    }
});

app.get('/favoritos/:usuario', async (req, res) => {
    try {
        // 1. Buscamos ignorando mayúsculas y minúsculas (para evitar errores si el usuario se guarda distinto en el navegador)
        const usuarioRegex = new RegExp('^' + req.params.usuario.trim() + '$', 'i');
        const favs = await Favorito.find({ id_usuario: usuarioRegex });

        // 2. Filtramos los hitos
        const ids = favs.map(f => f.id_hito);
        const lugaresFavoritos = hitos.filter(h => ids.includes(h.id));

        // 3. Enviamos el Array puro directo al frontend en lugar de un objeto.
        res.json(lugaresFavoritos);
    } catch (err) {
        res.status(500).json({ error: "Error obteniendo favoritos." });
    }
});

app.delete('/favoritos', verificarToken, async (req, res) => {
    const { id_hito } = req.body;
    const id_usuario = req.usuarioAuth;

    try {
        await Favorito.deleteOne({ id_usuario, id_hito });
        res.json({ mensaje: "Eliminado de favoritos." });
    } catch (err) {
        res.status(500).json({ error: "Error eliminando favorito." });
    }
});

app.listen(port, () => console.log(`✅  HistoriAr en http://localhost:${port}`));