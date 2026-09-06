function actualizarDatoLocal(clave, propiedad, nuevoValor) {
    const objeto = JSON.parse(localStorage.getItem(clave));
    
    if (objeto) {
        objeto[propiedad] = nuevoValor;
        localStorage.setItem(clave, JSON.stringify(objeto));
    }
}

function actualizarBaseDatosUsuarios(correoUsuario, propiedad, nuevoValor) {
    let listaUsuarios = JSON.parse(localStorage.getItem('baseDatosOlimpo')) || [];
    
    listaUsuarios = listaUsuarios.map(function(user) {
        if (user.correo === correoUsuario) {
            user[propiedad] = nuevoValor;
        }
        return user;
    });

    localStorage.setItem('baseDatosOlimpo', JSON.stringify(listaUsuarios));
}

function apretarBoton(tipoPlan, event){
    event.preventDefault();

    if(!localStorage.getItem('sesionOlimpo')){
        window.location.href = 'login.html';
    } else {
        const datosUsuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado'));

        const catalogoPrecios = {
            "plan-diario": 5000,
            "plan-mensual": 29900,
            "plan-trimestral": 75000,
            "plan-semestral": 138000,
            "plan-anual": 240000,
        };

        const posibleCompra = {
            nombrePlan: tipoPlan,
            beneficiario: datosUsuarioLogueado.nombre,
            precio: catalogoPrecios[tipoPlan],
        };

        localStorage.setItem('posibleCompra', JSON.stringify(posibleCompra));
        window.location.href = 'procesarPago.html';
    }
}

const botonesPlanes = document.querySelectorAll('.boton-verde');

botonesPlanes.forEach(function(boton){
    boton.addEventListener('click', function(event){
        const planElegido = boton.getAttribute('data-plan');
        apretarBoton(planElegido, event);
    });
});

const datosPosibleCompra = JSON.parse(localStorage.getItem('posibleCompra'));

if(document.getElementById("nombre-beneficiario")){
    const beneficiario_texto = document.getElementById("nombre-beneficiario");
    const tipo_plan_texto = document.getElementById("tipo-plan");
    const precio_texto = document.getElementById("precio-plan");

    const beneficiario = datosPosibleCompra.beneficiario;
    const tipo_plan = datosPosibleCompra.nombrePlan;
    const precio = datosPosibleCompra.precio;

    beneficiario_texto.textContent = beneficiario;
    tipo_plan_texto.textContent = tipo_plan.replace('-', ' ');
    precio_texto.textContent = "$" + precio;
}

const btn_confirmar = document.getElementById("btn-confirmar"); 
if (btn_confirmar) {
    btn_confirmar.addEventListener("click", function (event){
        btn_confirmar.textContent = "PROCESANDO PAGO...";

        Swal.fire({
            title: '¡Pago Exitoso!',
            text: 'Ya puedes disfrutar de tu membresía.',
            icon: 'success',
            confirmButtonText: 'Ir a mi perfil',
            background: '#1e1e1e',
            color: '#ffffff',
            confirmButtonColor: '#ffcc00'
        }).then((result) => {
            if (result.isConfirmed) {
                const planFormateado = datosPosibleCompra.nombrePlan.replace("-"," ");
                
                actualizarDatoLocal('usuarioLogueado', 'plan', planFormateado);

                const usuarioActual = JSON.parse(localStorage.getItem('usuarioLogueado'));
                
                if (usuarioActual && usuarioActual.correo) {
                    actualizarBaseDatosUsuarios(usuarioActual.correo, 'plan', planFormateado);
                }

                window.location.href = 'perfil.html';
            }
        });
    });
}