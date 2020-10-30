var user = location.search.substring(1, location.search.length);
var users = user.split("&");
for (i = 0; i < users.length; i++) {
    variableActual = users[i].split("=");
    if (isNaN(parseFloat(variableActual[1])))
        eval(variableActual[0] + "='" + unescape(variableActual[1]) + "';");
    else
        eval(variableActual[0] + "=" + variableActual[1] + ";");
}

function iniciar() {
    inicio(usuario);
}

function refrescar() {
    location.href = "/templates/admin.html?usuario=" + usuario;
}
function peliculas() {
    location.href = "/templates/peliculas.html?usuario=" + usuario;
}
function modificarPeliculas(titulos) {
    location.href = "/templates/modificarPelicula.html?usuario=" + usuario + "&tituloA=" + titulos;
}
function funciones(){
    location.href = "/templates/funcionesAdmin.html?usuario=" + usuario;
}
function creaFuncion(){
    location.href = "/templates/crearFuncion.html?usuario=" + usuario;
}
function usuarios(){
    location.href = "/templates/usuarios.html?usuario=" + usuario;
}
function crearUsuarioAdmin(){
    location.href = "/templates/crearUsuarioAdmin.html?usuario=" + usuario;
}
function cartelera(){
    location.href = "/templates/cartelera.html?usuario=" + usuario;
}
function refrescarUsuario() {
    location.href = "/templates/usuario.html?usuario=" + usuario;
}
function resenas(titulos) {
    location.href = "/templates/resenasUsuario.html?usuario=" + usuario+ "&tituloA=" + titulos;
}
function resenasAdmin(titulos) {
    location.href = "/templates/resenasAdmin.html?usuario=" + usuario+ "&tituloA=" + titulos;
}

inicio = function (usuario1) {
    $("#perfil").html(
        '<a class="nav-link mb-0 h4" id="perfil" href="#">' +
        '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-person-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">' +
        '<path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z" />' +
        '<path fill-rule="evenodd" d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />' +
        '<path fill-rule="evenodd" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z" />' +
        '</svg> &nbsp;' +
        usuario1 +
        '</a>'
    );
};