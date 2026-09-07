// ==========================================
// SISTEMA DE RESERVAS 
// ==========================================

function reservarClase(nombreClase) {
    
    const sesionActiva = localStorage.getItem('sesionOlimpo');
    const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado'));

    if (sesionActiva !== 'true' || !usuarioLogueado) {
        alert("¡Debes iniciar sesión para reservar una clase!");
        window.location.href = 'login.html';
        return;
    }

    
    if (usuarioLogueado.rol === 'admin') {
        alert("Eres el administrador, no necesitas reservar cupo.");
        return;
    }

    
    let historialReservas = JSON.parse(localStorage.getItem('reservasOlimpo')) || [];

    
    const yaReservada = historialReservas.find(reserva => reserva.correo === usuarioLogueado.correo && reserva.clase === nombreClase);
    
    if (yaReservada) {
        alert("Ya tienes una reserva activa para: " + nombreClase);
        return;
    }

    
    const nuevaReserva = {
        correo: usuarioLogueado.correo,
        nombre: usuarioLogueado.nombre,
        clase: nombreClase,
        fechaReserva: new Date().toLocaleDateString()
    };

    historialReservas.push(nuevaReserva);
    localStorage.setItem('reservasOlimpo', JSON.stringify(historialReservas));

    alert("¡Éxito! Tu cupo para " + nombreClase + " ha sido reservado.");
}