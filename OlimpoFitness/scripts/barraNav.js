const navbarHTML = `
    <nav class="barra-navegacion">
        <nav class="contenedor-botones">
            <img src="Imagenes/logo-blanco.png" alt="Logo gimnasio" class="logo">

            <a href="index.html" class="boton-texto"> INICIO </a>
            <a href="planes.html" class="boton-texto"> PLANES </a>
            <a href="nosotros.html" class="boton-texto"> SOBRE NOSOTROS </a>
            <a href="faq.html" class="boton-texto"> PREGUNTAS FRECUENTES </a>
            
            <a href="login.html" class="boton-texto" id="link-login"> INICIAR SESIÓN </a>
            <a href="perfil.html" class="boton-texto" id="link-perfil" style="display: none;"> MI PERFIL </a>
            <a href="#" class="boton-texto" id="link-logout" style="display: none; color: #ff4d4d;"> CERRAR SESIÓN </a>
        </nav>
    </nav>
`
document.getElementById('barra-navegacion').innerHTML = navbarHTML;