var user = location.search.substring(1, location.search.length);
var users = user.split("&");
for (i = 0; i < users.length; i++) {
    variableActual = users[i].split("=");
    if (isNaN(parseFloat(variableActual[1])))
        eval(variableActual[0] + "='" + unescape(variableActual[1]) + "';");
    else
        eval(variableActual[0] + "=" + variableActual[1] + ";");
}

function obtenerPeliculas() {
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
                codigoTabla += ')">Modificar</a></td>'
                codigoTabla += '<td><a class="btn btn-warning" onclick="eliminar('
                codigoTabla += "'"
                codigoTabla += peliculas[i].titulo
                codigoTabla += "'"
                codigoTabla += ')">Eliminar</a></td>'
                codigoTabla += '</tr>'
            }
            codigoTabla += '</tbody></table>'
            tabla.peliculas(codigoTabla);
        }
    }
}

function eliminar(titulos) {
    let req = new XMLHttpRequest();
    let datos = JSON.stringify({
        titulo: titulos
    })
    req.open('POST', 'http://localhost:5000/eliminarPelicula', true);
    req.setRequestHeader("Content-type", "application/json; charset=utf-8");
    req.onreadystatechange = function () {

        if (this.readyState === XMLHttpRequest.DONE && this.status == 200) {
            peliculas();
        }
    };

    req.send(datos);
}

function modificarPelicula() {
    let req = new XMLHttpRequest();
    let datos = JSON.stringify({
        titulo_actual: tituloA,
        titulo: document.getElementById("titulo").value,
        url_imagen: document.getElementById("url_imagen").value,
        puntuacion: document.getElementById("puntuacion").value,
        duracion: document.getElementById("duracion").value,
        sinopsis: document.getElementById("sinopsis").value,
    })
    req.open('POST', 'http://localhost:5000/modificarPelicula', true);
    req.setRequestHeader("Content-type", "application/json; charset=utf-8");
    req.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status == 200) {
            document.getElementById("titulo").value = ""
            document.getElementById("url_imagen").value = ""
            document.getElementById("puntuacion").value = ""
            document.getElementById("duracion").value = ""
            document.getElementById("sinopsis").value = ""
            alerta.completo("Pelicula Modificada Correctamente")
        } else {
            alerta.error("Error, La Pelicula ya existe")
        }
    };
    req.send(datos);
}

function obtenerFunciones() {
    var codigoTabla = '<table class="table table-hover">' +
        '<thead>' +
        '<tr class="table-light">' +
        '<th scope="col">Id</th>' +
        '<th scope="col">Pelicula</th>' +
        '<th scope="col">Sala</th>' +
        '<th scope="col">Hora</th>' +
        '<th scope="col">Estado</th>' +
        '<th scope="col">Espacios Libres</th>' +
        '<th scope="col">Espacios Ocupados</th>' +
        '<th scope="col"></th>' +
        '</tr>' +
        '</thead>';
    let xhr = new XMLHttpRequest();
    var ruta = 'http://localhost:5000/obtenerFunciones';
    xhr.open('GET', ruta);
    xhr.send();

    xhr.onreadystatechange = (e) => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status == 200) {
            var funciones = JSON.parse(xhr.responseText);

            codigoTabla += '<tbody>'
            for (var i = 0; i < funciones.length; i++) {
                codigoTabla += '<tr>'
                codigoTabla += '<td>' + funciones[i].id + '</td>'
                codigoTabla += '<td>' + funciones[i].pelicula + '</td>'
                codigoTabla += '<td>' + funciones[i].sala + '</td>'
                codigoTabla += '<td>' + funciones[i].hora + '</td>'
                codigoTabla += '<td>' + funciones[i].disponible + '</td>'
                var disponible = 0
                var ocupado = 0
                for(var j=0; j< funciones[i].asientos.length;j++){
                    if(funciones[i].asientos[j].disponible == true){
                        disponible++;
                    }else{
                        ocupado++;
                    }
                }
                codigoTabla += '<td>' +disponible + '</td>'
                codigoTabla += '<td>' + ocupado+ '</td>'
                codigoTabla += '<td><a class="btn btn-warning" onclick="eliminarFuncion('
                codigoTabla += "'"
                codigoTabla += funciones[i].id
                codigoTabla += "'"
                codigoTabla += ')">Eliminar</a></td>'
                codigoTabla += '</tr>'
            }
            codigoTabla += '</tbody></table>'
            tabla.funciones(codigoTabla);
        }
    }
}

function agregarFuncion() {
    let req = new XMLHttpRequest();
    let datos = JSON.stringify({
        pelicula: document.getElementById("pelicula").value,
        sala: document.getElementById("sala").value,
        hora: document.getElementById("hora").value,
    })
    req.open('POST', 'http://localhost:5000/agregarFuncion', true);
    req.setRequestHeader("Content-type", "application/json; charset=utf-8");
    req.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status == 200) {
            document.getElementById("pelicula").value = ""
            document.getElementById("sala").value = ""
            document.getElementById("hora").value = ""
            alerta.completo("Función creada Correctamente")
        } else {
            alerta.error("Error, no se creo la función existe")
        }
    };
    req.send(datos);
}

function eliminarFuncion(id) {
    let req = new XMLHttpRequest();
    let datos = JSON.stringify({
        'id': id
    })
    req.open('POST', 'http://localhost:5000/eliminarFuncion', true);
    req.setRequestHeader("Content-type", "application/json; charset=utf-8");
    req.onreadystatechange = function () {

        if (this.readyState === XMLHttpRequest.DONE && this.status == 200) {
            funciones();
        }else if(this.readyState === XMLHttpRequest.DONE && this.status == 400) {
            alerta.error("Error, no se elimino la función")
        }
    };

    req.send(datos);
}

function obtenerUsuarios() {
    var codigoTabla = '<table class="table table-hover">' +
        '<thead>' +
        '<tr class="table-light">' +
        '<th scope="col">Nombre</th>' +
        '<th scope="col">Apellido</th>' +
        '<th scope="col">Usuario</th>' +
        '<th scope="col">Rol</th>' +
        '</tr>' +
        '</thead>';
    let xhr = new XMLHttpRequest();
    var ruta = 'http://localhost:5000/obtenerUsuarios';
    xhr.open('GET', ruta);
    xhr.send();

    xhr.onreadystatechange = (e) => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status == 200) {
            var usuarios = JSON.parse(xhr.responseText);

            codigoTabla += '<tbody>'
            for (var i = 0; i < usuarios.length; i++) {
                codigoTabla += '<tr>'
                codigoTabla += '<td>' + usuarios[i].nombre + '</td>'
                codigoTabla += '<td>' + usuarios[i].apellido + '</td>'
                codigoTabla += '<td>' + usuarios[i].usuario + '</td>'
                codigoTabla += '<td>' + usuarios[i].rol + '</td>'
                codigoTabla += '</tr>'
            }
            codigoTabla += '</tbody></table>'
            tabla.usuarios(codigoTabla);
        }
    }
}

function obtenerResena() {
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
                html += '<div class="row mx-5 my-5">'
                html += '<div class="form-group" style="width:100%">'
                html += '<select class="custom-select" id="selectPelicula" onchange="seleccion()">'
                html += '<option selected="">Seleccione una Pelicula...</option>'
                for (var i = 0; i < peliculas.length; i++) {
                    html += '<option value="' + peliculas[i].titulo + '">' + peliculas[i].titulo + '</option>'
                }
                html += '</select>'
                html += '</div>'
                html += '<center><p class="display-4 my-3" id="titulo">' + tituloA + '</p></center>'
                html += '<table class="table table-hover">' +
                    '<thead>' +
                    '<tr class="table-light">' +
                    '<th scope="col">Usuario</th>' +
                    '<th scope="col">Reseña</th>' +
                    '</tr>' +
                    '</thead>' +
                    '<tbody>';

                for (var i = 0; i < peliculas.length; i++) {
                    if (peliculas[i].titulo == tituloA) {
                        for (var j = 0; j < peliculas[i].resenas.length; j++) {
                            html += '<tr>'
                            html += '<td>' + peliculas[i].resenas[j].usuario + '</td>'
                            html += '<td>' + peliculas[i].resenas[j].texto + '</td>'
                            html += '</tr>'
                        }
                    }
                }
                html += '</tbody></table>'
            }
            resenas3(html)
        }
    }
}

var cargarArchivo = function (event) {
    var archivo = event.target;
    var reader = new FileReader();
    reader.onload = function () {
        var datos = reader.result;
        console.log(datos)
        let req = new XMLHttpRequest();
        let datos2 = JSON.stringify({
            contenido: datos,
        })
        req.open('POST', 'http://localhost:5000/cargaMasiva', true);
        req.setRequestHeader("Content-type", "application/json; charset=utf-8");
        req.onreadystatechange = function () {
            if (this.readyState === XMLHttpRequest.DONE && this.status == 200) {
                alerta.completo("Carga creada Correctamente")
            } else {
                alerta.error("Error, no se creo")
            }
        };
        req.send(datos2);
    };
    reader.readAsText(archivo.files[0])
};

function obtenerUnUsuario(){
    let xhr = new XMLHttpRequest();
    var ruta = 'http://localhost:5000/obtenerUsuarios';
    xhr.open('GET', ruta);
    xhr.send();

    xhr.onreadystatechange = (e) => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status == 200) {
            var usuarios = JSON.parse(xhr.responseText);
            for (var i = 0; i < usuarios.length; i++) {
                if(usuarios[i].usuario == usuario){
                    document.getElementById("nombre").value = usuarios[i].nombre
                    document.getElementById("apellido").value = usuarios[i].apellido
                    document.getElementById("usuario").value = usuarios[i].usuario
                    document.getElementById("contra").value = usuarios[i].contra
                }
            }
        }
    }
}

function modificarUsuario(){
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

function pdfUsuarios(){
    html2canvas(document.getElementById("tablaU")).then(function(canvas) {
        var img = canvas.toDataURL('image/png');
        var doc = new jsPDF({
            orientation: "landscape"
        });
        doc.addImage(img, 'JPEG', 0, 0);
        doc.save('Reporte de Usuarios.pdf');
    });
}

function pdfPeliculas(){
    html2canvas(document.getElementById("tablaP")).then(function(canvas) {
        var img = canvas.toDataURL('image/png');
        var doc = new jsPDF({
            orientation: "landscape"
        });
        doc.addImage(img, 'JPEG', 0, 0);
        doc.save('Reporte de Peliculas.pdf');
    });
}

function seleccion() {
    var pelicula = document.getElementById("selectPelicula").value;
    resenasAdmin(pelicula)
}

function modificar(titulos) {
    modificarPeliculas(titulos);
}

tabla = function () { }
tabla.peliculas = function (codigo) {
    $("#tablaP").html(codigo);
}
tabla.funciones = function (codigo) {
    $("#tablaF").html(codigo);
}
tabla.usuarios = function (codigo) {
    $("#tablaU").html(codigo);
}
resenas3 = function (codigo) {
    $("#tablaR").html(codigo);
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
alerta.precaucion = function (mensaje) {
    $("#alerta").html(
        '<div class="alert my-3 mx-5 alert-dismissible alert-primary"><a class="close" data-dismiss="alert">&times;</a><h4 class="alert-heading">' +
        mensaje +
        "</h4></div>"
    );
};  