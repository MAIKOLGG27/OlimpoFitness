const navbarHTML = `
    <nav class="barra-navegacion">
        <nav class="contenedor-botones">
            <img src="Imagenes/logo-blanco.png" alt="Logo gimnasio" class="logo">

            <a href="index.html" class="boton-texto"> INICIO </a>
            <a href="planes.html" class="boton-texto"> PLANES </a>
            <a href="reservas.html" class="boton-texto"> RESERVAS </a>
            <a href="nosotros.html" class="boton-texto"> SOBRE NOSOTROS </a>
            <a href="faq.html" class="boton-texto"> PREGUNTAS FRECUENTES </a>
            
            <a href="login.html" class="boton-texto" id="link-login"> INICIAR SESIÓN </a>
            <a href="perfil.html" class="boton-texto" id="link-perfil" style="display: none;"> MI PERFIL </a>
            
            <!-- Botón del Administrador -->
            <a href="admin.html" class="boton-texto" id="link-admin" style="display: none; color: #e9c009;"> ZONA ADMIN </a>
            
            <a href="#" class="boton-texto" id="link-logout" style="display: none; color: #ff4d4d;"> CERRAR SESIÓN </a>
        </nav>
    </nav>
`;

document.getElementById('barra-navegacion').innerHTML = navbarHTML;

// ==========================================
// LÓGICA DE SESIÓN PARA LA BARRA
// ==========================================
function revisarSesionActual() {
    const linkLogin = document.getElementById('link-login');
    const linkPerfil = document.getElementById('link-perfil');
    const linkAdmin = document.getElementById('link-admin');
    const linkLogout = document.getElementById('link-logout');

    const sesionActiva = localStorage.getItem('sesionOlimpo');
    const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado'));

    if (sesionActiva === 'true') {
        if (linkLogin) linkLogin.style.display = 'none';
        if (linkLogout) linkLogout.style.display = '';

        // Si es el admin, mostramos la zona admin. Si es normal, mostramos el perfil.
        if (usuarioLogueado && usuarioLogueado.rol === 'admin') {
            if (linkAdmin) linkAdmin.style.display = '';
        } else {
            if (linkPerfil) linkPerfil.style.display = '';
        }
    }
}

// ==========================================
// FUNCIÓN PARA CERRAR SESIÓN
// ==========================================
function cerrarSesion() {
    localStorage.removeItem('sesionOlimpo');
    localStorage.removeItem('usuarioLogueado');
    window.location.href = 'index.html';
}

// Ejecutamos la revisión de la barra
revisarSesionActual();

// Activamos el click del botón cerrar sesión
const btnLogout = document.getElementById('link-logout');
if (btnLogout) {
    btnLogout.addEventListener('click', cerrarSesion);
}