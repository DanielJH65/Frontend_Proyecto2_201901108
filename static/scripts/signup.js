function agregarUsuario() {

    let xhr = new XMLHttpRequest();
    var ruta = "http://localhost:5000/crearUsuario";
    var contra = document.getElementById("contra").value;
    var confirmcontra = document.getElementById("confirmcontra").value;

    if (contra == confirmcontra) {
        let datos = JSON.stringify({
            nombre: document.getElementById("nombre").value,
            apellido: document.getElementById("apellido").value,
            usuario: document.getElementById("usuario").value.toUpperCase(),
            contra: document.getElementById("contra").value,
            rol: "cliente",
        });

        xhr.open("POST", ruta, true);
        xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");

        xhr.onreadystatechange = function () {
            document.getElementById("nombre").value = "";
            document.getElementById("apellido").value = "";
            document.getElementById("usuario").value = "";
            document.getElementById("contra").value = "";
            document.getElementById("confirmcontra").value = "";
            if (this.readyState === XMLHttpRequest.DONE && this.status == 200) {
                alerta.completo("Usuario Creado");
            } else if (this.status == 400) {
                alerta.precaucion("No se creo el usuario, el usuario ya existe");
            }
        };

        xhr.send(datos);

    } else {
        document.getElementById("confirmcontra").value = "";
        alerta.error("Las contraseñas no coinciden");

    }
}
alerta = function () { };
alerta.completo = function (mensaje) {
    $("#alerta").html(
        '<div class="alert my-3 mx-5 alert-dismissible alert-success"><a class="close" data-dismiss="alert">&times;</a><h4 class="alert-heading">' +
        mensaje +
        "</h4></div>"
    );
};
alerta.error = function (mensaje) {
    $("#alerta").html(
        '<div class="alert my-3 mx-5 alert-dismissible alert-warning"><a class="close" data-dismiss="alert">&times;</a><h4 class="alert-heading">' +
        mensaje +
        "</h4></div>"
    );
};
alerta.precaucion = function (mensaje) {
    $("#alerta").html(
        '<div class="alert my-3 mx-5 alert-dismissible alert-primary"><a class="close" data-dismiss="alert">&times;</a><h4 class="alert-heading">' +
        mensaje +
        "</h4></div>"
    );
};


