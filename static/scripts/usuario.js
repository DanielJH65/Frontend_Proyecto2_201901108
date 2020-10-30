var user = location.search.substring(1, location.search.length);
var users = user.split("&");
for (i = 0; i < users.length; i++) {
    variableActual = users[i].split("=");
    if (isNaN(parseFloat(variableActual[1])))
        eval(variableActual[0] + "='" + unescape(variableActual[1]) + "';");
    else
        eval(variableActual[0] + "=" + variableActual[1] + ";");
}
function obtenerCartelera() {

    let xhr = new XMLHttpRequest();
    var ruta = 'http://localhost:5000/obtenerPeliculas';
    xhr.open('GET', ruta);
    xhr.send();

    xhr.onreadystatechange = (e) => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status == 200) {
            var peliculas = JSON.parse(xhr.responseText);
            var contador = 0
            var html = '<div class="row mx-5">'
            for (var i = 0; i < peliculas.length; i++) {
                if (contador == 4) {
                    html += '</div>'
                    html += '<div class="row mx-5">'
                    contador = 0
                } else {
                    contador++
                }
                html += '<div class="col-sm-3">'
                html += '<div class="card text-white bg-secondary mb-3" style="max-width: 20rem;">'
                html += '<h3 class="card-header">' + peliculas[i].titulo + '</h3>'
                html += '<div class="card-body">'
                html += '<h4 class="card-title">Puntuación: ' + peliculas[i].puntuacion + '</h4>'
                var puntuacion = peliculas[i].puntuacion.split("/");
                var progreso = puntuacion[0] * 10
                html += '<div class="progress">'
                html += '<div class="progress-bar bg-warning" role="progressbar" style="width: ' + progreso + '%;" aria-valuenow="' + progreso + '" aria-valuemin="0" aria-valuemax="100"></div>'
                html += '</div>'
                html += '</div>'
                html += '<a onclick="resenas(' + "'" + peliculas[i].titulo + "'" + ')"><img width="100%" height="350px" src="' + peliculas[i].url_imagen + '"></img></a>'
                html += '</div>'
                html += '</div>'
            }
            html += '</div>'
            carteleras(html)
        }
    }
}

function obtenerPelicula() {
    let xhr = new XMLHttpRequest();
    var ruta = 'http://localhost:5000/obtenerPeliculas';
    xhr.open('GET', ruta);
    xhr.send();

    xhr.onreadystatechange = (e) => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status == 200) {
            var peliculas = JSON.parse(xhr.responseText);
            var html = ''
            if (tituloA == "") {
                html += '<div class="row mx-5 my-5">'
                html += '<div class="form-group" style="width:100%">'
                html += '<select class="custom-select" id="selectPelicula" onchange="seleccion()">'
                html += '<option selected="">Seleccione una Pelicula...</option>'
                for (var i = 0; i < peliculas.length; i++) {
                    html += '<option value="' + peliculas[i].titulo + '">' + peliculas[i].titulo + '</option>'
                }
                html += '</select>'
                html += '</div>'
            } else {
                for (var i = 0; i < peliculas.length; i++) {
                    if (peliculas[i].titulo == tituloA) {
                        html += '<div class="jumbotron my-5 mx-5">'
                        html += '<center><h1 class="display-3 my-4">' + peliculas[i].titulo + '</h1></center>'
                        html += '<div class="row my-5 mx-5">'
                        html += '<div class="col-sm-4">'
                        html += '<img width="100%" height="450px" src="' + peliculas[i].url_imagen + '"></img>'
                        html += '</div>'
                        html += '<div class="col-sm-6">'
                        html += '<h3 class="display-6" style="text-align:justify">' + peliculas[i].sinopsis + '</h3>'
                        html += '</div>'
                        html += '</div>'
                        html += '<hr class="my-4">'
                        html += '<center><h3 class="display-3 my-4">Reseñas</h3></center>'
                        html += '<div class="row mx-5">'                  
                        var contador = 0
                        for (var j = 0; j < peliculas[i].resenas.length; j++) {
                            if (contador == 2) {
                                html += '</div>'
                                html += '<div class="row mx-5">'
                                contador = 0
                            } else {
                                contador++
                            }
                            html += '<div class="col-sm-6">'
                            html += '<div class="card text-white bg-secondary mb-3" style="max-width: 30rem;">'
                            html += '<h3 class="card-header">' + peliculas[i].resenas[j].usuario + '</h3>'
                            html += '<div class="card-body">'
                            html += '<h6 class="card-text">'+peliculas[i].resenas[j].texto+'</h6>'
                            html += '</div>'
                            html += '</div>'
                            html += '</div>'
                        }
                        html += '</div>'
                        html += '<hr class="my-4">'
                        html += '<form>'
                        html += '<fieldset>'
                        html += '<div class="form-group">'
                        html += '<h2 for="texto">Crear Reseña</h2>'
                        html += '<textarea class="form-control" id="texto" rows="5"></textarea>'
                        html += '</div>'
                        html += '<a class="btn btn-success  btn-lg" onclick="agregarResena(' + "'" + tituloA + "', " + "'" + usuario + "'," + ')">Agregar Reseña</a><br><br>'
                        html += '</fieldset>'
                        html += '</form>'
                        html += '</div>'
                    }
                }
            }
            resenas2(html)
        }
    }
}

function seleccion() {
    var pelicula = document.getElementById("selectPelicula").value;
    resenas(pelicula)
}

function agregarResena(tituloB, usuarioB) {
    let req = new XMLHttpRequest()
    let datos = JSON.stringify({
        "titulo": tituloB,
        "usuario": usuarioB,
        "texto": document.getElementById("texto").value
    })
    req.open('POST', 'http://localhost:5000/agregarResena', true);
    req.setRequestHeader("Content-type", "application/json; charset=utf-8");
    req.onreadystatechange = function () {

        if (this.readyState === XMLHttpRequest.DONE && this.status == 200) {
            alerta.completo("Reseña agregada correctamente")
        }
    };

    req.send(datos);
    document.getElementById("texto").value = ""
}

carteleras = function (codigo) {
    $("#cartelera").html(codigo);
}
resenas2 = function (codigo) {
    $("#resenas").html(codigo);
}
alerta = function () { };
alerta.completo = function (mensaje) {
    $("#alerta").html(
        '<div class="alert my-3 mx-5 alert-dismissible alert-success"><a class="close" data-dismiss="alert">&times;</a><h4 class="alert-heading">' +
        mensaje +
        "</h4></div>"
    );
};