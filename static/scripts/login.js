function iniciarSesion() {
    let xhr = new XMLHttpRequest();
    ruta = 'http://localhost:5000/iniciarSesion';

    let datos = JSON.stringify({
        usuario: document.getElementById("usuario").value.toUpperCase(),
        contra: document.getElementById("contra").value
    });

    xhr.open('POST', ruta, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");

    xhr.onreadystatechange = function() {

        if (this.status == 200) {
            location.href="/templates/usuario.html";
        }else if (this.status == 400) {
            document.getElementById("usuario").value = "";
            document.getElementById("contra").value = "";
            alerta.error("Usuario o contraseña incorrectos");
        }
    };

    xhr.send(datos);
}

alerta = function () { };
alerta.error = function (mensaje) {
    $("#alerta").html(
        '<div class="alert alert-dismissible alert-warning"><a class="close" data-dismiss="alert">&times;</a><h4 class="alert-heading">' +
        mensaje + "</h4></div>"
    );
};