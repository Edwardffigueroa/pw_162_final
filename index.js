/**
 * Archivo inicial del Proyecto
 */
/*se instalan todos lo modulos externos que se utilizarán en el proyecto*/
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var multer = require('multer');

//importo archivos locales
var database = require("./database");

var route_usuarios = require("./routes/route-usuarios");
var route_publicaciones = require("./routes/route-publicaciones");
var route_mensajes = require("./routes/route-mesajes");
var route_favoritos = require("./routes/route-favoritos");

/**configuraciones iniciales de los módulos*/
//inicializo express
var app = express();
//configuro express para utilizar morgan.
app.use(morgan('dev'));

//configuro express para utilizarlo junto con bodyParser
//permirte aceptar solicitudes Json
app.use(bodyParser.json());

// Aceptar solicitudes en formato application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended : false
}));
//configuracion de ruta de los archivos del Front
app.use(express.static(__dirname + '/public'));

app.use(multer({
    dest : './uploads/'
}).single('photo'));


//para conectar con las rutas

app.use('/servicios/usuarios', route_usuarios);
app.use('/servicios/publicaciones', route_publicaciones);
app.use('/servicios/mensajes', route_mensajes);
app.use('/servicios/favoritos', route_favoritos);

app.get('*', function (req, res, next) {
    res.status(404).send('Error 404 esa tal página no existe');
    next();
});


//Configurar la conexión a la base de datos
database.connect(function (err) {
    if (err) {
        // Si hubo errores cerrar la aplicación
        console.log('Unable to connect to MySQL.');
        process.exit(1)
    } else {
        // Si no hubo errores encender el servidor y comenzar a escuchar
        // solicitudes
        var hostname = 'localhost';
        var port = 3000;

        app.listen(port, hostname, function () {
            console.log('Servidor corriendo en http://' + hostname + ':' + port
                + '/');
        });
    }
});

