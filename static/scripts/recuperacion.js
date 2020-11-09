function recuperar() {
    let xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    ruta = 'https://backend-proyecto2-ipc1-danielj.herokuapp.com/recuperarContra';

    let datos = JSON.stringify({
        "usuario": document.getElementById("usuario").value.toUpperCase(),
    });

    xhr.open("POST", ruta);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
        
        document.getElementById("usuario").value = "";
        if (this.status == 200) {
            var respuesta = xhr.responseText.split(":");
            var pass = respuesta[1].split('"')
            alerta.precaucion("La contraseña es: "+ pass[1]);
        }else{
            alerta.error("El Usuario no existe");
        }
    };
    xhr.send(datos);
}

alerta = function () { };
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