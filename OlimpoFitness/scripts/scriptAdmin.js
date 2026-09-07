function cargarUsuariosAdmin() {
    const tabla = document.getElementById('tabla-usuarios');
    
    
    if (!tabla) return; 

    
    const usuariosGuardados = JSON.parse(localStorage.getItem('baseDatosOlimpo')) || [];

    tabla.innerHTML = '';

    if (usuariosGuardados.length === 0) {
        tabla.innerHTML = '<tr><td colspan="5" style="text-align: center;">No hay usuarios registrados aún.</td></tr>';
        return;
    }

    
    usuariosGuardados.forEach(user => {
        let estadoClase = user.plan === "Sin Plan Activo" ? "estado-inactivo" : "estado-activo";
        let estadoTexto = user.plan === "Sin Plan Activo" ? "Inactivo" : "Al día";

        const filaNueva = `
            <tr>
                <td>${user.nombre}</td>
                <td>${user.correo}</td>
                <td>${user.plan || "Sin Plan Activo"}</td>
                <td class="${estadoClase}">${estadoTexto}</td>
                <td><button class="btn-editar">Editar Plan</button></td>
            </tr>
        `;
        tabla.innerHTML += filaNueva;
    });
}
cargarUsuariosAdmin(); 
document.addEventListener('DOMContentLoaded', () => {
    const usuarios = JSON.parse(localStorage.getItem('baseDatosOlimpo')) || [];
    
    const usuariosActivos = usuarios.filter(user => user.plan && user.plan !== "Sin Plan Activo");
    
    const contador = document.getElementById('contador-usuarios');
    if (contador) {
        contador.textContent = usuariosActivos.length;
    }
});