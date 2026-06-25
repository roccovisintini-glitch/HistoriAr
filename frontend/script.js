    let usuarioActual = localStorage.getItem('historiar_usuario');
    let todosLosHitos = [];
    let hitoActual    = null;
    let marcadores    = [];
    let mapaIniciado  = false;
    let map;
    let favoritosLocales = new Set(JSON.parse(localStorage.getItem('historiar_favs') || '[]'));

    // ── TABS ──
    function mostrarTab(tab) {
    document.getElementById('form-login').style.display    = tab === 'login'    ? 'block' : 'none';
    document.getElementById('form-registro').style.display = tab === 'registro' ? 'block' : 'none';
    document.getElementById('tab-login').className    = 'auth-tab' + (tab === 'login'    ? ' activo' : '');
    document.getElementById('tab-registro').className = 'auth-tab' + (tab === 'registro' ? ' activo' : '');
    ocultarError();
}

    function mostrarError(msg) {
    const el = document.getElementById('auth-error');
    el.textContent = msg;
    el.style.display = 'block';
}

    function ocultarError() {
    document.getElementById('auth-error').style.display = 'none';
}

    // ── LOGIN / REGISTRO ──
    async function hacerLogin() {
    const usuario  = document.getElementById('login-usuario').value.trim();
    const password = document.getElementById('login-password').value;
    if (!usuario || !password) return mostrarError('Completá todos los campos.');
    const res  = await fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuario, password })
});
    const data = await res.json();
    if (!res.ok) return mostrarError(data.error);

    localStorage.setItem('historiar_token', data.token); // GUARDAMOS EL TOKEN
    iniciarSesion(data.usuario);
}

    async function hacerRegistro() {
    const usuario  = document.getElementById('reg-usuario').value.trim();
    const password = document.getElementById('reg-password').value;
    if (!usuario || !password) return mostrarError('Completá todos los campos.');
    const res  = await fetch('/registro', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuario, password })
});
    const data = await res.json();
    if (!res.ok) return mostrarError(data.error);

    localStorage.setItem('historiar_token', data.token); // GUARDAMOS EL TOKEN
    iniciarSesion(data.usuario);
}

    function cerrarSesion() {
    localStorage.removeItem('historiar_usuario');
    localStorage.removeItem('historiar_favs');
    localStorage.removeItem('historiar_token'); // BORRAMOS EL TOKEN AL SALIR
    location.reload();
}

    function iniciarSesion(usuario) {
    usuarioActual = usuario;
    localStorage.setItem('historiar_usuario', usuario);
    document.getElementById('pantalla-auth').style.display = 'none';
    document.getElementById('app').style.display = 'block';
    document.getElementById('nombre-usuario').textContent = usuario;
    inicializarMapa();
    cargarHitos();
}

    // Enter en inputs
    document.getElementById('login-password').addEventListener('keydown', e => { if (e.key === 'Enter') hacerLogin(); });
    document.getElementById('reg-password').addEventListener('keydown',   e => { if (e.key === 'Enter') hacerRegistro(); });

    // Auto-login si ya estaba logueado
    if (usuarioActual) iniciarSesion(usuarioActual);

    // ── MAPA ──
    function inicializarMapa() {
    if (mapaIniciado) return;
    mapaIniciado = true;
    map = L.map('map').setView([-38.5, -63.5], 4);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
    maxZoom: 18
}).addTo(map);
}

    function crearIcono(tipo) {
    const color = tipo === 'historico' ? '#74B9E0' : '#D4A017';
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="40" viewBox="0 0 32 40">
            <path d="M16 0C7.163 0 0 7.163 0 16c0 10 16 24 16 24S32 26 32 16C32 7.163 24.837 0 16 0z" fill="#1a1a2e"/>
            <circle cx="16" cy="16" r="8" fill="${color}"/>
        </svg>`;
    return L.divIcon({ html: svg, className: '', iconSize: [32,40], iconAnchor: [16,40] });
}

    async function cargarHitos() {
    try {
    // 1. Ahora apuntamos a la ruta correcta con "api"
    const res = await fetch('/api/hitos');
    const respuestaServidor = await res.json();

    // 2. Verificamos que el backend haya respondido con éxito
    if (respuestaServidor.status === "success") {
    // 3. Sacamos el array de hitos de la propiedad "data"
    todosLosHitos = respuestaServidor.data;
    renderizarMarcadores(todosLosHitos);
    actualizarFavoritos();
} else {
    mostrarToast('Error al procesar los datos del servidor.', 'info');
}
} catch (e) {
    mostrarToast('No se pudieron cargar los hitos.', 'info');
}
}

    function renderizarMarcadores(hitos) {
    marcadores.forEach(m => map.removeLayer(m));
    marcadores = [];
    hitos.forEach(hito => {
    const m = L.marker([hito.lat, hito.lng], { icon: crearIcono(hito.tipo) })
    .addTo(map)
    .bindTooltip(hito.titulo, { direction: 'top', offset: [0, -36] });
    m.on('click', () => abrirPanel(hito));
    marcadores.push(m);
});
}

    async function abrirPanel(hito) {
    hitoActual = hito;

    // 1. Mostrar la info básica que sí tenemos localmente
    document.getElementById('info-titulo').textContent = hito.titulo;
    document.getElementById('info-dato').textContent   = hito.dato_clave;
    document.getElementById('info-chicos').textContent = hito.para_chicos;

    // 2. Estados de carga mientras esperamos a Wikipedia
    document.getElementById('info-desc').textContent   = "Cargando reseña histórica desde Wikipedia...";
    document.getElementById('info-img').src            = "https://via.placeholder.com/600x340.png?text=Cargando+Imagen...";
    document.getElementById('btn-wiki-link').style.display = 'none'; // Ocultamos el botón temporalmente

    const badge = document.getElementById('info-badge');
    badge.textContent      = hito.tipo === 'historico' ? '🏛️ ' + hito.categoria : '🌄 ' + hito.categoria;
    badge.style.background = hito.tipo === 'historico' ? '#74B9E0' : '#D4A017';

    actualizarBtnFav();

    const panel = document.getElementById('info-panel');
    panel.style.display = 'block';
    setTimeout(() => panel.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);

    // 3. CONSULTA A WIKIPEDIA (A través de tu Backend)
    try {
    const res = await fetch(`/api/detalle/${hito.wiki_titulo}`);
    const data = await res.json();

    if (data.exito) {
    // Actualizar la descripción con el texto real
    document.getElementById('info-desc').textContent = data.descripcion;

    // Mostramos el botón y le asignamos la URL que vino del backend
    const btnWiki = document.getElementById('btn-wiki-link');
    btnWiki.href = data.wiki_url;
    btnWiki.style.display = 'inline-block';

    // Actualizar la foto si Wikipedia tiene una
    if (data.imagen) {
    document.getElementById('info-img').src = data.imagen;
} else {
    document.getElementById('info-img').src = "https://via.placeholder.com/600x340.png?text=Sin+imagen+disponible";
}
} else {
    document.getElementById('info-desc').textContent = "No se pudo obtener información ampliada de Wikipedia.";
}
} catch (error) {
    console.error("Error al buscar detalle:", error);
    document.getElementById('info-desc').textContent = "Error de conexión al cargar la historia.";
}
}

    function actualizarBtnFav() {
    if (!hitoActual) return;
    const btn = document.getElementById('btn-guardar');
    if (favoritosLocales.has(String(hitoActual.id))) {
    btn.textContent = '❌ Quitar de favoritos';
    btn.className   = 'btn-fav guardado';
} else {
    btn.textContent = '⭐ Guardar en favoritos';
    btn.className   = 'btn-fav';
}
}

    document.getElementById('btn-cerrar').addEventListener('click', () => {
    document.getElementById('info-panel').style.display = 'none';
    hitoActual = null;
});

    document.getElementById('btn-guardar').addEventListener('click', async () => {
    if (!hitoActual) return;

    const esFavorito = favoritosLocales.has(String(hitoActual.id));
    const token = localStorage.getItem('historiar_token'); // LEEMOS EL TOKEN

    // Cabeceras de seguridad con el Token
    const headersSeguros = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
};

    if (esFavorito) {
    // ─── ELIMINAR DE FAVORITOS ───
    try {
    const res = await fetch('/favoritos', {
    method: 'DELETE',
    headers: headersSeguros,
    body: JSON.stringify({ id_hito: hitoActual.id }) // Ya no mandamos el usuario, el backend lo sabe por el token!
});

    if (res.ok) {
    favoritosLocales.delete(String(hitoActual.id));
    localStorage.setItem('historiar_favs', JSON.stringify([...favoritosLocales]));
    mostrarToast('Eliminado de tus favoritos ❌', 'info');
    actualizarBtnFav();
    actualizarFavoritos();
} else {
    const errorData = await res.json();
    mostrarToast(errorData.error || 'Error de seguridad', 'info');
}
} catch (e) {
    mostrarToast('Error al conectar con el servidor.', 'info');
}
} else {
    // ─── GUARDAR EN FAVORITOS ───
    try {
    const res = await fetch('/guardar-favorito', {
    method: 'POST',
    headers: headersSeguros,
    body: JSON.stringify({ id_hito: hitoActual.id }) // Igual que arriba
});
    const data = await res.json();

    if (res.ok) {
    if (!data.yaExistia) {
    favoritosLocales.add(String(hitoActual.id));
    localStorage.setItem('historiar_favs', JSON.stringify([...favoritosLocales]));
    mostrarToast('¡Guardado! "' + hitoActual.titulo + '" en tus favoritos.', 'exito');
    actualizarBtnFav();
    actualizarFavoritos();
} else {
    mostrarToast('Ya está en tus favoritos.', 'info');
}
} else {
    mostrarToast(data.error || 'Sesión expirada. Volvé a ingresar.', 'info');
}
} catch (e) {
    mostrarToast('Error al conectar con el servidor.', 'info');
}
}
});

    document.querySelectorAll('.filtro-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('activo'));
        btn.classList.add('activo');
        const filtro    = btn.dataset.filtro;
        const filtrados = filtro === 'todos' ? todosLosHitos : todosLosHitos.filter(h => h.tipo === filtro);
        renderizarMarcadores(filtrados);
        if (hitoActual && filtro !== 'todos' && hitoActual.tipo !== filtro) {
            document.getElementById('info-panel').style.display = 'none';
            hitoActual = null;
        }
    });
});

    async function actualizarFavoritos() {
    const grid = document.getElementById('favoritos-grid');

    // 1. Pedimos los favoritos reales al servidor
    try {
    const res = await fetch(`/favoritos/${usuarioActual}`, {
    headers: { 'Authorization': `Bearer ${localStorage.getItem('historiar_token')}` }
});
    const favHitos = await res.json(); // Esta respuesta viene de tu nuevo backend

    if (favHitos.length === 0) {
    grid.innerHTML = '<p class="fav-vacio">Guardá lugares para verlos acá ⭐</p>';
    return;
}

    // 2. Dibujamos las tarjetas
    grid.innerHTML = favHitos.map(h => `
            <div class="fav-card" onclick='abrirPanel(${JSON.stringify(h)})'>
                <img id="fav-img-${h.id}" src="https://via.placeholder.com/300x150.png?text=Cargando..." alt="${h.titulo}">
                <div class="fav-card-body">
                    <div class="fav-card-titulo">${h.titulo}</div>
                    <div class="fav-card-provincia">📍 ${h.provincia}</div>
                </div>
            </div>
        `).join('');

    // 3. Cargamos las imágenes
    for (const h of favHitos) {
    const resImg = await fetch(`/api/detalle/${h.wiki_titulo}`);
    const dataImg = await resImg.json();
    const imgElement = document.getElementById(`fav-img-${h.id}`);
    if (dataImg.exito && dataImg.imagen) imgElement.src = dataImg.imagen;
}
} catch (err) {
    console.error("Error cargando favoritos del servidor:", err);
}
}

    let toastTimer;
    function mostrarToast(mensaje, tipo = 'exito') {
    const toast = document.getElementById('toast');
    toast.textContent = mensaje;
    toast.className   = 'visible ' + tipo;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toast.className = ''; }, 3500);
}
