const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

// Conectamos a la base de datos (se crea el archivo si no existe)
const db = new sqlite3.Database('./historiar.db');

// Creamos la tabla de favoritos si no existe
db.run(`CREATE TABLE IF NOT EXISTS favoritos (
    id_usuario TEXT,
    id_hito TEXT
)`);

app.use(express.static('public'));
app.use(express.json()); // Para que el servidor entienda datos en formato JSON

// Endpoint para ver los hitos
app.get('/hitos', (req, res) => {
    const hitosArgentinos = [
        { id: 1, titulo: "Cabildo de Buenos Aires", lat: -34.6085, lng: -58.3735, desc: "Revolución de Mayo." },
        { id: 2, titulo: "Casa de Tucumán", lat: -26.8328, lng: -65.2031, desc: "Independencia 1816." },
        { id: 3, titulo: "Monumento a la Bandera", lat: -32.9475, lng: -60.6305, desc: "Creación de la bandera." }
    ];
    res.json(hitosArgentinos);
});

// Endpoint para GUARDAR un favorito
app.post('/guardar-favorito', (req, res) => {
    const { id_hito } = req.body;
    const id_usuario = "Rocco"; // Por ahora usamos tu nombre como ID fijo

    db.run(`INSERT INTO favoritos (id_usuario, id_hito) VALUES (?, ?)`, [id_usuario, id_hito], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        console.log(`Hito ${id_hito} guardado por ${id_usuario}`);
        res.json({ mensaje: "¡Guardado con éxito!" });
    });
});

app.listen(port, () => {
    console.log(`Servidor en http://localhost:${port}`);
});
app.get('/hitos', (req, res) => {
    const hitosArgentinos = [
        {
            id: 1,
            titulo: "Cabildo de Buenos Aires",
            lat: -34.6085, lng: -58.3735,
            desc: "El Cabildo fue el epicentro de la Revolución de Mayo de 1810, donde se gestó el primer gobierno patrio. Originalmente era una institución colonial que cumplía funciones judiciales y administrativas, siendo el lugar donde el pueblo se reunió para exigir la renuncia del virrey Cisneros.\n\nHoy funciona como Museo Nacional, conservando reliquias de la época colonial y revolucionaria. Aunque su estructura original fue modificada para abrir las avenidas de Mayo y Julio A. Roca, sigue siendo el símbolo máximo de la libertad argentina y un punto de referencia histórica ineludible en la Plaza de Mayo.",
            imagen: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/95/9d/28/el-cabildo.jpg?w=1200&h=-1&s=1"
        },
        {
            id: 2,
            titulo: "Casa Histórica de Tucumán",
            lat: -26.8328, lng: -65.2031,
            desc: "Conocida como la 'Casa de Tucumán', este edificio fue la sede del Congreso que declaró la Independencia de las Provincias Unidas del Río de la Plata el 9 de julio de 1816. La famosa 'Sala de la Jura' es el único ambiente original que se conserva de la estructura de finales del siglo XVIII.\n\nEl edificio fue reconstruido en la década de 1940 basándose en planos y fotografías antiguas para devolverle su aspecto original. Cada año, miles de estudiantes y turistas la visitan para conocer el salón donde los congresales firmaron el acta que rompió definitivamente los lazos con la corona española.",
            imagen: "https://www.tucumanturismo.gob.ar/uploads/image/f852be907865f9733cc856c9d747a08b.jpg"
        },
        {
            id: 3,
            titulo: "Monumento Nacional a la Bandera",
            lat: -32.9475, lng: -60.6305,
            desc: "Ubicado en Rosario, a orillas del río Paraná, este monumento marca el sitio exacto donde el General Manuel Belgrano izó por primera vez la bandera argentina el 27 de febrero de 1812. Es un complejo arquitectónico imponente que simboliza la nave de la patria surcando las aguas.\n\nBajo la torre principal se encuentra la Cripta de Belgrano, y el conjunto incluye el Patio Cívico y el Propileo Triunfal de la Patria. Es el escenario principal de los actos del 20 de junio y representa el orgullo de la identidad nacional y el sacrificio de los próceres por la unidad del país.",
            imagen: "https://eldiariodesalud.com/wp-content/uploads/2021/01/monumento-a-la-bandera-rosario.jpg"
        }
    ];
    res.json(hitosArgentinos);
});