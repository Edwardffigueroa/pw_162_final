/**
 * esta clase se encarga de traer la información de la base de datos relacionada con los mensajes
 */
var database = require('../database');


exports.getMensajesRemitente = function (id_remitente, done) {
    database.get().query('SELECT * FROM pwfinal_mensajes WHERE id_remitente = ?', id_remitente, function (err, rows) {
        if (!err)
            done(null, rows);
    })
};


exports.getMensajes = function (id_publicacion, done) {
    database.get().query('SELECT m.contenido, u.nombres, u.apellidos FROM pwfinal_mensajes m, pwfinal_usuarios u WHERE m.id_publicacion = ? AND u.id_usuario = m.id_remitente', id_publicacion, function (err, rows) {
            done(err, rows);
    })
};


exports.crearMensaje = function (id_remitente, id_publicacion, contenido, done) {
    var nMensaje = {
        id_remitente: id_remitente,
        id_publicacion: id_publicacion,
        contenido: contenido
    };
console.log(nMensaje);
    database.get().query('INSERT INTO pwfinal_mensajes SET ? ', nMensaje, function (err, rows) {
        if (err)
            return done(err);
        done(null, rows);
    });

};

