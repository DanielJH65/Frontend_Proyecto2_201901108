
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
    var peliculas = JSON.parse(xhr.responseText);

    codigoTabla+='<tbody>'
    for(var i = 0; i<peliculas.length;i++){
        codigoTabla+='<tr>'
        codigoTabla+='<td>' + peliculas[i].titulo + '</td>'
        codigoTabla+='<td><img width="150px" height="200px" src="'+ peliculas[i].url_imagen +'"></td>'
        codigoTabla+='<td>' + peliculas[i].puntuacion + '</td>'
        codigoTabla+='<td>' + peliculas[i].duracion + '</td>'
        codigoTabla+='<td>' + peliculas[i].sinopsis + '</td>'
        codigoTabla+='<td><a class="btn btn-primary" onclick="">Modificar</a></td>'
        codigoTabla+='<td><a class="btn btn-warning" onclick="">Eliminar</a></td>'
        codigoTabla+='<tr>'
    }
    codigoTabla+='</tbody></table>'
    tabla(codigoTabla);
}

tabla = function(codigo){
    $("#tabla").html(codigo);
}