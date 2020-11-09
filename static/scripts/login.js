function iniciarSesion() {
    let xhr = new XMLHttpRequest();
    ruta = 'https://backend-proyecto2-ipc1-danielj.herokuapp.com/iniciarSesion';

    let datos = JSON.stringify({
        usuario: document.getElementById("usuario").value.toUpperCase(),
        contra: document.getElementById("contra").value
    });

    xhr.open('POST', ruta, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");

    xhr.onreadystatechange = function() {

        if (this.status == 200) {
            var respuesta = xhr.responseText.split(":");
            var rol = respuesta[2].split('"');
            var nombre = respuesta[3].split('"');
            console.log(nombre)
            if(rol[1] == 'Administrador'){
                location.href="/templates/admin.html?usuario="+nombre[1];
            }else{
                location.href="/templates/usuario.html?usuario="+nombre[1];
            }            
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
        '<div class="alert my-3 mx-5 alert-dismissible alert-warning"><a class="close" data-dismiss="alert">&times;</a><h4 class="alert-heading">' +
        mensaje + "</h4></div>"
    );
};