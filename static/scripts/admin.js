var user = location.search.substring(1, location.search.length);
var users = user.split("&");
for (i = 0; i < users.length; i++) {
    variableActual = users[i].split("=");
    if (isNaN(parseFloat(variableActual[1])))
        eval(variableActual[0] + "='" + unescape(variableActual[1]) + "';");
    else
        eval(variableActual[0] + "=" + variableActual[1] + ";");
}
var codigoTabla = '<table class="table table-hover">' +
    '<thead>' +
    '<tr class="table-light">' +
    '<th scope="col">Titulo</th>' +
    '<th scope="col">Imagen</th>' +
    '<th scope="col">Puntuación</th>' +
    '<th scope="col">Duración</th>' +
    '<th scope="col">Sinopsis</th>' +
    '<th scope="col"></th>' +
    '<th scope="col"></th>' +
    '</tr>' +
    '</thead>';
let xhr = new XMLHttpRequest();
var ruta = 'http://localhost:5000/obtenerPeliculas';
xhr.open('GET', ruta);
xhr.send();

xhr.onreadystatechange = (e) => {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status == 200) {
        var peliculas = JSON.parse(xhr.responseText);

        codigoTabla += '<tbody>'
        for (var i = 0; i < peliculas.length; i++) {
            codigoTabla += '<tr>'
            codigoTabla += '<td>' + peliculas[i].titulo + '</td>'
            codigoTabla += '<td><img width="150px" height="200px" src="' + peliculas[i].url_imagen + '"></td>'
            codigoTabla += '<td>' + peliculas[i].puntuacion + '</td>'
            codigoTabla += '<td>' + peliculas[i].duracion + '</td>'
            codigoTabla += '<td>' + peliculas[i].sinopsis + '</td>'
            codigoTabla += '<td><a class="btn btn-primary" onclick="modificar('
            codigoTabla += "'"
            codigoTabla += peliculas[i].titulo
            codigoTabla += "'"
            codigoTabla +=')">Modificar</a></td>'
            codigoTabla += '<td><a class="btn btn-warning" onclick="eliminar('
            codigoTabla += "'"
            codigoTabla += peliculas[i].titulo
            codigoTabla += "'"
            codigoTabla +=')">Eliminar</a></td>'
            codigoTabla += '<tr>'
        }
        codigoTabla += '</tbody></table>'
        tabla(codigoTabla);
    }
}

function eliminar(titulos){
    let req = new XMLHttpRequest();
    let datos = JSON.stringify({
        titulo : titulos
    })
    req.open('POST', 'http://localhost:5000/eliminarPelicula',true);
    req.setRequestHeader("Content-type", "application/json; charset=utf-8");
    req.onreadystatechange = function() {

        if (this.readyState === XMLHttpRequest.DONE && this.status == 200) {
            peliculas();
        }
    };

    req.send(datos);
}

function modificarPelicula(){
    let req = new XMLHttpRequest();
    let datos = JSON.stringify({
        titulo_actual : tituloA,
        titulo : document.getElementById("titulo").value,
        url_imagen : document.getElementById("url_imagen").value,
        puntuacion : document.getElementById("puntuacion").value,
        duracion : document.getElementById("duracion").value,
        sinopsis : document.getElementById("sinopsis").value,
    })
    req.open('POST', 'http://localhost:5000/modificarPelicula',true);
    req.setRequestHeader("Content-type", "application/json; charset=utf-8");
    req.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status == 200) {
            document.getElementById("titulo").value = ""
            document.getElementById("url_imagen").value = ""
            document.getElementById("puntuacion").value = ""
            document.getElementById("duracion").value = ""
            document.getElementById("sinopsis").value = ""
            alerta.completo("Pelicula Modificada Correctamente")
        }else{
            alerta.error("Error, La Pelicula ya existe")
        }
    };
    req.send(datos);
}

function modificar(titulos){
    modificarPeliculas(titulos);
}

tabla = function (codigo) {
    $("#tabla").html(codigo);
}

alerta = function () { };
alerta.completo = function (mensaje) {
    $("#alerta").html(
        '<div class="alert my-3 mx-5 alert-dismissible alert-info"><a class="close" data-dismiss="alert">&times;</a><h4 class="alert-heading">' +
        mensaje + "</h4></div>"
    );
};
alerta.error = function (mensaje) {
    $("#alerta").html(
        '<div class="alert my-3 mx-5 alert-dismissible alert-warning"><a class="close" data-dismiss="alert">&times;</a><h4 class="alert-heading">' +
        mensaje + "</h4></div>"
    );
};