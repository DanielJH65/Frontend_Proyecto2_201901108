function agregarUsuario() {

    let xhr = new XMLHttpRequest();
    var ruta = "http://localhost:5000/crearUsuario";
    var contra = document.getElementById("contra").value;
    var confirmcontra = document.getElementById("confirmcontra").value;
    if (contra == confirmcontra) {
        let datos = JSON.stringify({
            nombre: document.getElementById("nombre").value,
            apellido: document.getElementById("apellido").value,
            usuario: document.getElementById("usuario").value,
            contra: document.getElementById("contra").value,
            rol: "usuario",
        });

        xhr.open("POST", ruta, true);
        xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");

        xhr.onreadystatechange = function () {

            if (this.readyState === XMLHttpRequest.DONE && this.status == 200) {
                document.getElementById("nombre").value = "";
                document.getElementById("apellido").value = "";
                document.getElementById("usuario").value = "";
                document.getElementById("contra").value = "";
                document.getElementById("confirmcontra").value = "";
                alerta.completo("Usuario Creado");
            } else if (this.status == 400) {
                document.getElementById("nombre").value = "";
                document.getElementById("apellido").value = "";
                document.getElementById("usuario").value = "";
                document.getElementById("contra").value = "";
                document.getElementById("confirmcontra").value = "";
                alerta.error("Error al crear el usuario");
            }
        };

        xhr.send(datos);

    } else {
        document.getElementById("confirmcontra").value = "";
        alerta.error("Las contraseñas no coinciden");

    }
}
alerta = function(){};
alerta.completo = function (mensage) {
    $("#alerta").html(
        '<div class="alert alert-dismissible alert-success"><a class="close" data-dismiss="alert">&times;</a><h4 class="alert-heading">' +
        mensage +
        "</h4></div>"
    );
};
alerta.error = function (mensage) {
    $("#alerta").html(
        '<div class="alert alert-dismissible alert-warning"><a class="close" data-dismiss="alert">&times;</a><h4 class="alert-heading">' +
        mensage +
        "</h4></div>"
    );
};


