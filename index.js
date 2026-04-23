const express = require('express');
const app = express();
const port = 3000;

// 1. Primero configuramos los archivos estáticos (Mapa)
app.use(express.static('public'));

// 2. Después definimos las rutas de datos
app.get('/hitos', (req, res) => {
    res.send('Acá pronto verás los hitos de la Historia Argentina 🇦🇷');
});

// 3. Finalmente iniciamos el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});