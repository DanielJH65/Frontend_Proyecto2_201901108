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
            if (nombre == ""){
                for (var i = 0; i < peliculas.length; i++) {
                    if (contador == 4) {
                        html += '</div>'
                        html += '<div class="row mx-5">'
                        contador = 0
                    } else {
                        contador++
                    }
                    html += '<div class="col-sm-3">'
                    html += '<div class="card text-white bg-secondary mb-3" style="max-width: 20rem;height:100%">'
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
            }else{
                cambio = nombre.toLowerCase()
                for (var i = 0; i < peliculas.length; i++) {
                    var similar = peliculas[i].titulo.toLowerCase().match(cambio)
                    resultado('<center><h1 id="resultado" class="display-5 my-4">Busqueda relacionada a: <b>'+cambio+'</b></h1></center>')
                    if(similar != null){
                        if (contador == 4) {
                            html += '</div>'
                            html += '<div class="row mx-5">'
                            contador = 0
                        } else {
                            contador++
                        }
                        html += '<div class="col-sm-3">'
                        html += '<div class="card text-white bg-secondary mb-3" style="max-width: 20rem;height:100%">'
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
                }
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
                            html += '<h6 class="card-text">' + peliculas[i].resenas[j].texto + '</h6>'
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

function obtenerUnUsuario() {
    let xhr = new XMLHttpRequest();
    var ruta = 'http://localhost:5000/obtenerUsuarios';
    xhr.open('GET', ruta);
    xhr.send();

    xhr.onreadystatechange = (e) => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status == 200) {
            var usuarios = JSON.parse(xhr.responseText);
            for (var i = 0; i < usuarios.length; i++) {
                if (usuarios[i].usuario == usuario) {
                    document.getElementById("nombre").value = usuarios[i].nombre
                    document.getElementById("apellido").value = usuarios[i].apellido
                    document.getElementById("usuario").value = usuarios[i].usuario
                    document.getElementById("contra").value = usuarios[i].contra
                }
            }
        }
    }
}

function modificarUsuario() {
    let xhr = new XMLHttpRequest();
    var ruta = "http://localhost:5000/modificarUsuario";
    var contra = document.getElementById("contra").value;
    var confirmcontra = document.getElementById("confirmcontra").value;

    if (contra == confirmcontra) {
        let datos = JSON.stringify({
            usuario_actual: usuario.toUpperCase(),
            nombre: document.getElementById("nombre").value,
            apellido: document.getElementById("apellido").value,
            usuario: document.getElementById("usuario").value.toUpperCase(),
            contra: document.getElementById("contra").value,
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
                alerta.completo("Usuario Modificado");
            } else if (this.status == 400) {
                alerta.precaucion("No se modifico el usuario, el usuario nuevo ya existe");
            }
        };

        xhr.send(datos);

    } else {
        document.getElementById("confirmcontra").value = "";
        alerta.error("Las contraseñas no coinciden");

    }
}

function obtenerFunciones() {
    let req = new XMLHttpRequest();
    var ruta = "http://localhost:5000/obtenerFunciones";
    req.open('GET', ruta);
    req.send();

    req.onreadystatechange = (e) => {
        if (req.readyState === XMLHttpRequest.DONE && req.status == 200) {
            var funciones = JSON.parse(req.responseText);
            var html = ""
            for (var i = 0; i < funciones.length; i++) {
                html += '<div class="row mx-5">'
                if (funciones[i].disponible == "Llena") {
                    html += '<div class="card text-white bg-warning mb-3" style="height:100%;width:100%">'
                    html += '<h3 class="card-header"><b>' + funciones[i].pelicula + '</b></h3>'
                    html += '<div class="card-body">'
                    html += '<div class="row mx-5">'
                    html += '<div class="col-sm-3">'
                    html += '<h4 class="card-title"><b>Sala:</b> ' + funciones[i].sala + '</h4>'
                    html += '</div>'
                    html += '<div class="col-sm-3">'
                    html += '<h4 class="card-title"><b>Hora:</b> ' + funciones[i].hora + '</h4>'
                    html += '</div>'
                    html += '<div class="col-sm-5">'
                    html += '<h4 class="card-title"><b>Función Llena</b></h4>'
                    html += '</div>'
                    html += '</div>'
                } else if (funciones[i].disponible == "No Disponible") {
                    html += '<div class="card text-white bg-secondary mb-3" style="height:100%;width:100%">'
                    html += '<h3 class="card-header"><b>' + funciones[i].pelicula + '</b></h3>'
                    html += '<div class="card-body">'
                    html += '<div class="row mx-5">'
                    html += '<div class="col-sm-3">'
                    html += '<h4 class="card-title"><b>Sala:</b> ' + funciones[i].sala + '</h4>'
                    html += '</div>'
                    html += '<div class="col-sm-3">'
                    html += '<h4 class="card-title"><b>Hora:</b> ' + funciones[i].hora + '</h4>'
                    html += '</div>'
                    html += '<div class="col-sm-5">'
                    html += '<h4 class="card-title"><b>Función no disponible por la hora</b></h4>'
                    html += '</div>'
                    html += '</div>'
                } else {
                    var estado = false
                    for (var j = 0; j < funciones[i].asientos.length; j++) {
                        if (funciones[i].asientos[j].usuario == usuario) {
                            estado = true
                        }
                    }
                    if (estado) {
                        html += '<div class="card text-white bg-info mb-3" style="height:100%;width:100%">'
                        html += '<h3 class="card-header"><b>' + funciones[i].pelicula + '</b></h3>'
                        html += '<div class="card-body">'
                        html += '<div class="row mx-5">'
                        html += '<div class="col-sm-3">'
                        html += '<h4 class="card-title"><b>Sala:</b> ' + funciones[i].sala + '</h4>'
                        html += '</div>'
                        html += '<div class="col-sm-3">'
                        html += '<h4 class="card-title"><b>Hora:</b> ' + funciones[i].hora + '</h4>'
                        html += '</div>'
                        html += '<div class="col-sm-4">'
                        html += '<h4 class="card-title"><b>Ya aparto un lugar</b></h4>'
                        html += '</div>'
                        html += '</div>'
                    } else {
                        html += '<div class="card text-white bg-info mb-3" style="height:100%;width:100%">'
                        html += '<h3 class="card-header"><b>' + funciones[i].pelicula + '</b></h3>'
                        html += '<div class="card-body">'
                        html += '<div class="row mx-5">'
                        html += '<div class="col-sm-3">'
                        html += '<h4 class="card-title"><b>Sala:</b> ' + funciones[i].sala + '</h4>'
                        html += '</div>'
                        html += '<div class="col-sm-3">'
                        html += '<h4 class="card-title"><b>Hora:</b> ' + funciones[i].hora + '</h4>'
                        html += '</div>'
                        html += '<div class="col-sm-4">'
                        html += '<a class="btn btn-primary btn-block" onclick="apartarFuncion(' + "'" + funciones[i].id + "'" + ')">Asistir</a>'
                        html += '</div>'
                        html += '</div>'
                    }

                }
                html += '</div>'
                html += '</div>'
                html += '</div>'
            }
            funciones2(html)
        }
    }
}

function obtenerUnaFuncion() {
    let xhr = new XMLHttpRequest();
    var ruta = 'http://localhost:5000/obtenerUnaFuncion?id=' + id;
    xhr.open('GET', ruta);
    xhr.send();
    xhr.onreadystatechange = (e) => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status == 200) {
            var funciones = JSON.parse(xhr.responseText);
            console.log(funciones)
            var html = `<center><h1 class="display-5 my-4">${funciones.pelicula}</h1></center>`
            var contador = 0
            var fila = 1
            html += '<div class="row mx-5 my-4">'
            html += `<a class="btn btn-light disabled btn-block" >Pantalla</a>`
            html += '</div>'
            html += '<div class="row mx-5 my-4">'
            html += '<div class="col-sm-1">'
            html += `<h1></h1>`
            html += '</div>'
            html += '<div class="col-sm-3">'
            html += `<center><h1>A</h1></center>`
            html += '</div>'
            html += '<div class="col-sm-3">'
            html += `<center><h1>B</h1></center>`
            html += '</div>'
            html += '<div class="col-sm-3">'
            html += `<center><h1>C</h1></center>`
            html += '</div>'
            for (var i = 0; i < funciones.asientos.length; i++) {
                if (contador == 0) {
                    html += '</div>'
                    html += '<div class="row mx-5 my-4">'
                    html += '<div class="col-sm-1">'
                    html += `<h1 id="fila">${fila}</h1>`
                    html += '</div>'
                    fila++
                    contador++
                } else if (contador == 2) {
                    contador = 0
                } else {
                    contador++
                }
                if (funciones.asientos[i].disponible) {
                    html += '<div class="col-sm-3">'
                    html += `<a class="btn btn-info btn-block" onclick="apartar(${funciones.asientos[i].identificador})">Apartar</a>`
                    html += '</div>'
                } else {
                    html += '<div class="col-sm-3">'
                    html += `<a class="btn btn-secondary disabled btn-block">Apartado</a>`
                    html += '</div>'
                }
            }
            html += '</div>'
            unaFuncion(html)
        }
    }
}

function apartar(identificador) {
    let req = new XMLHttpRequest()
    let datos = JSON.stringify({
        "identificador": identificador,
        "usuario": usuario,
        "id": id
    })
    req.open('POST', 'http://localhost:5000/apartar', true);
    req.setRequestHeader("Content-type", "application/json; charset=utf-8");
    req.onreadystatechange = function () {

        if (this.readyState === XMLHttpRequest.DONE && this.status == 200) {
            alerta.completo("Asiento Apartado")
        }
    };
    req.send(datos);
    setTimeout("funcionesUsuario()", 1000)

}
function busqueda() {
    texto = document.getElementById("buscar").value
    cartelera(texto);
}
carteleras = function (codigo) {
    $("#cartelera").html(codigo);
}
resenas2 = function (codigo) {
    $("#resenas").html(codigo);
}
funciones2 = function (codigo) {
    $("#funciones").html(codigo);
}
unaFuncion = function (codigo) {
    $("#unaFuncion").html(codigo);
}
resultado = function (codigo) {
    $("#resultado").html(codigo);
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
        mensaje + "</h4></div>"
    );
};
alerta.precaucion = function (mensaje) {
    $("#alerta").html(
        '<div class="alert my-3 mx-5 alert-dismissible alert-primary"><a class="close" data-dismiss="alert">&times;</a><h4 class="alert-heading">' +
        mensaje +
        "</h4></div>"
    );
};  