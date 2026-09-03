// ==========================================
// 1. LÓGICA DE REGISTRO
// ==========================================
function registrarCuenta(event) {
    event.preventDefault(); // Evita que la página se recargue

    // Capturamos los datos ingresados
    const correo = document.getElementById('reg-correo').value;
    const nombre = document.getElementById('reg-nombre').value;
    const clave1 = document.getElementById('reg-clave1').value;
    const clave2 = document.getElementById('reg-clave2').value;
    const mensajeError = document.getElementById('mensaje-error');

    // Validación 1: Contraseñas coinciden
    if (clave1 !== clave2) {
        mensajeError.textContent = "Las contraseñas no coinciden.";
        return; // Cortamos la función aquí
    }

    // Validación 2: Contraseña segura (mínimo 6 caracteres)
    if (clave1.length < 6) {
        mensajeError.textContent = "La contraseña debe tener al menos 6 caracteres.";
        return;
    }

    // Traemos los usuarios que ya existan en la memoria (o creamos un arreglo vacío si es el primero)
    let usuariosGuardados = JSON.parse(localStorage.getItem('baseDatosOlimpo')) || [];

    // Validación 3: Que el correo no exista ya
    const existeCorreo = usuariosGuardados.find(user => user.correo === correo);
    if (existeCorreo) {
        mensajeError.textContent = "Este correo ya está registrado. Intenta iniciar sesión.";
        return;
    }

    // Si pasamos todas las validaciones, creamos al usuario
    const nuevoUsuario = {
        nombre: nombre,
        correo: correo,
        clave: clave1, // En un sistema real esto iría encriptado, pero por ahora sirve
        plan: "Sin Plan Activo" // Dato extra para mostrar en el perfil después
    };

    // Lo metemos a nuestra "base de datos" y guardamos
    usuariosGuardados.push(nuevoUsuario);
    localStorage.setItem('baseDatosOlimpo', JSON.stringify(usuariosGuardados));

    // Mensaje de éxito y limpieza
    mensajeError.style.color = "#129b3a"; // Cambiamos el texto a verde
    mensajeError.textContent = "¡Cuenta creada con éxito! Redirigiendo...";
    
    // Lo mandamos al login después de 1 segundo y medio
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1500);
}


// ==========================================
// 2. LÓGICA DE LOGIN REAL
// ==========================================
function iniciarSesion(event) {
    event.preventDefault();

    const correoIngresado = document.getElementById('correo-login').value;
    const claveIngresada = document.getElementById('clave-login').value;

    // Traemos la base de datos simulada
    let usuariosGuardados = JSON.parse(localStorage.getItem('baseDatosOlimpo')) || [];

    // Buscamos si hay un usuario que tenga ESE correo y ESA clave
    const usuarioValido = usuariosGuardados.find(user => user.correo === correoIngresado && user.clave === claveIngresada);

    if (usuarioValido) {
        // ¡El usuario existe! Iniciamos sesión
        localStorage.setItem('sesionOlimpo', 'true');
        
        // GUARDAMOS QUIÉN ENTRÓ (para mostrar su nombre en el perfil después)
        localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioValido));

        window.location.href = 'perfil.html';
    } else {
        // Tiramos una alerta simple si se equivoca
        alert("Correo o contraseña incorrectos. Inténtalo de nuevo.");
    }
}


// ==========================================
// 3. MANTENER SESIÓN Y CERRAR SESIÓN
// ==========================================
function revisarSesion() {
    const linkLogin = document.getElementById('link-login');
    const linkPerfil = document.getElementById('link-perfil');
    const linkLogout = document.getElementById('link-logout');

    const sesionActiva = localStorage.getItem('sesionOlimpo');

    if (sesionActiva === 'true' && linkLogin && linkPerfil && linkLogout) {
        linkLogin.style.display = 'none';      
        linkPerfil.style.display = '';   
        linkLogout.style.display = '';   
    }
}

function cerrarSesion() {
    // Borramos la sesión y los datos del usuario logueado
    localStorage.removeItem('sesionOlimpo');
    localStorage.removeItem('usuarioLogueado');
    window.location.href = 'index.html';
}

// Inicializador
document.addEventListener('DOMContentLoaded', () => {
    revisarSesion();

    const btnLogout = document.getElementById('link-logout');
    if (btnLogout) {
        btnLogout.addEventListener('click', cerrarSesion);
    }
});