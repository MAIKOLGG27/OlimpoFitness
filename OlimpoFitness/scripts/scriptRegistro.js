// ==========================================
// 1. LÓGICA DE REGISTRO
// ==========================================

function registrarCuenta(event) {
    event.preventDefault(); 

    const correo = document.getElementById('reg-correo').value;
    const nombre = document.getElementById('reg-nombre').value;
    const clave1 = document.getElementById('reg-clave1').value;
    const clave2 = document.getElementById('reg-clave2').value;
    const mensajeError = document.getElementById('mensaje-error');

    
    if (clave1 !== clave2) {
        mensajeError.textContent = "Las contraseñas no coinciden.";
        return; 
    }

    
    if (clave1.length < 6) {
        mensajeError.textContent = "La contraseña debe tener al menos 6 caracteres.";
        return;
    }

    
    let usuariosGuardados = JSON.parse(localStorage.getItem('baseDatosOlimpo')) || [];

    
    const existeCorreo = usuariosGuardados.find(user => user.correo === correo);
    if (existeCorreo) {
        mensajeError.textContent = "Este correo ya está registrado. Intenta iniciar sesión.";
        return;
    }

    
    const nuevoUsuario = {
        nombre: nombre,
        correo: correo,
        clave: clave1, 
        plan: "Sin Plan Activo" 
    };

    
    usuariosGuardados.push(nuevoUsuario);
    localStorage.setItem('baseDatosOlimpo', JSON.stringify(usuariosGuardados));

    
    mensajeError.style.color = "#129b3a"; 
    mensajeError.textContent = "¡Cuenta creada con éxito! Redirigiendo...";
    
   
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1500);
}


// ==========================================
// 2. LÓGICA DE LOGIN REAL Y ADMIN
// ==========================================
function iniciarSesion(event) {
    event.preventDefault();

    const correoIngresado = document.getElementById('correo-login').value;
    const claveIngresada = document.getElementById('clave-login').value;

    
    if (correoIngresado === 'admin@olimpo.cl' && claveIngresada === 'admin123') {
        localStorage.setItem('sesionOlimpo', 'true');
        
        
        localStorage.setItem('usuarioLogueado', JSON.stringify({ 
            nombre: 'Administrador Principal', 
            correo: correoIngresado, 
            rol: 'admin',
            plan: 'Dueño del Gimnasio'
        }));

        window.location.href = 'admin.html'; 
        return; 
    }

    // --- LÓGICA DE USUARIO NORMAL ---
    
    let usuariosGuardados = JSON.parse(localStorage.getItem('baseDatosOlimpo')) || [];

    
    const usuarioValido = usuariosGuardados.find(user => user.correo === correoIngresado && user.clave === claveIngresada);

    if (usuarioValido) {
        
        localStorage.setItem('sesionOlimpo', 'true');
        
        
        localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioValido));

        window.location.href = 'perfil.html';
    } else {
        
        alert("Correo o contraseña incorrectos. Inténtalo de nuevo.");
    }
}


// ==========================================
// 3. MANTENER SESIÓN, CERRAR SESIÓN E INICIALIZAR
// ==========================================
function revisarSesion() {
    const linkLogin = document.getElementById('link-login');
    const linkPerfil = document.getElementById('link-perfil');
    const linkAdmin = document.getElementById('link-admin');
    const linkLogout = document.getElementById('link-logout');

    const sesionActiva = localStorage.getItem('sesionOlimpo');
    const usuarioActual = JSON.parse(localStorage.getItem('usuarioLogueado'));

    if (sesionActiva === 'true' && linkLogin) {
        linkLogin.style.display = 'none'; 
        if (linkLogout) linkLogout.style.display = ''; 
        
        
        if (usuarioActual && usuarioActual.rol === 'admin') {
            if (linkAdmin) linkAdmin.style.display = ''; 
        } else {
            if (linkPerfil) linkPerfil.style.display = '';   
        }
    }
}

function cerrarSesion() {
    
    localStorage.removeItem('sesionOlimpo');
    localStorage.removeItem('usuarioLogueado');
    window.location.href = 'index.html';
}


document.addEventListener('DOMContentLoaded', () => {
    revisarSesion();

    const btnLogout = document.getElementById('link-logout');
    if (btnLogout) {
        btnLogout.addEventListener('click', cerrarSesion);
    }

   
    if (localStorage.getItem('sesionOlimpo') === 'true') {
        rellenarTarjeta();
    }
});


// ==========================================
// 4. RELLENAR DATOS DE LA TARJETA DEL PERFIL
// ==========================================
function rellenarTarjeta(){
    const datosUsuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado'));
    
    
    if(!datosUsuarioLogueado) return; 

    const nombre = datosUsuarioLogueado.nombre;
    const correo = datosUsuarioLogueado.correo;
    const plan = datosUsuarioLogueado.plan || "Sin Plan Activo";

    if(document.getElementById('texto-nombre')){
        document.getElementById('texto-nombre').textContent = nombre;
        document.getElementById('texto-correo').textContent = correo;
        
        if (document.getElementById('texto-plan')) {
            document.getElementById('texto-plan').textContent = plan.toUpperCase();
        }

        if(plan === "Sin Plan Activo"){
            document.getElementById('badgeEstado').textContent = 'Socio Inactivo';
            document.getElementById('badgeEstado').style.background = "#e800004b";
            document.getElementById('badgeEstado').style.border = "1px solid #E80000";
            document.getElementById('badgeEstado').style.color = "#E80000";
            
            document.getElementById('texto-vencimiento').style.visibility = 'hidden';
            document.getElementById('texto-estado').style.color = "#E80000";
            document.getElementById('texto-estado').textContent = 'INACTIVO';

        } else {
            document.getElementById('badgeEstado').textContent = 'Socio Activo';
            document.getElementById('badgeEstado').style.background = "#129b3a33";
            document.getElementById('badgeEstado').style.border = "1px solid #129b3a";
            document.getElementById('badgeEstado').style.color = "#129b3a";
        }

        // ==========================================
        // SECCIÓN DE INYECCIÓN DE RESERVAS
        // ==========================================
        const contenedorReservas = document.getElementById('lista-reservas');
        
        if (contenedorReservas) {
            
            let historialReservas = JSON.parse(localStorage.getItem('reservasOlimpo')) || [];
            
            
            let misReservas = historialReservas.filter(reserva => reserva.correo === correo);
            
           
            contenedorReservas.innerHTML = '';
            
            
            if (misReservas.length === 0) {
                contenedorReservas.innerHTML = '<span class="etiqueta-dato">No tienes clases reservadas aún.</span>';
            } else {
                misReservas.forEach(reserva => {
                    contenedorReservas.innerHTML += `
                        <div class="fila-dato" style="border-left: 3px solid #129b3a; padding-left: 10px; margin-bottom: 10px; display: flex; flex-direction: column;">
                            <span class="valor-dato" style="color: #e9c009;">${reserva.clase}</span>
                            <span class="etiqueta-dato" style="font-size: 12px;">Generada el: ${reserva.fechaReserva}</span>
                        </div>
                    `;
                });
            }
        }
    }
}