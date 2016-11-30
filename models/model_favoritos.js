/**
 * esta clase se encarga de traer la información de la base de datos relacionada con los matriculas
 */

var database = require('../database');

exports.traerFavoritos = function (id_usuario, done) {
//retorna los mensajes favoritos de cada usuario, es mas facil que solo traer las


    database.get().query('SELECT p.* FROM pwfinal_favoritos f, pwfinal_publicaciones p WHERE f.id_usuario = ? AND p.id_publicacion=f.id_publicacion', id_usuario, function (err, rows) {
            done(err, rows);
    });
};

exports.agregarFavorito = function (id_publicacion, id_usuario, done) {

    var nFavorito = {
        id_publicacion: id_publicacion,
        id_usuario: id_usuario
    };

    database.get().query('INSERT INTO pwfinal_favoritos SET ?', nFavorito, function (err, rows) {
        if (err)
            return done(err);
        done(null, rows);
    });
};

exports.eliminarFavorito = function (id_publicacion, id_usuario, done) {
    database.get().query('DELETE from pwfinal_favoritos where id_usuario= ? AND id_publicacion =?', [id_usuario, id_publicacion], function (err, rows) {
        if (err)
            return done(err);
        done(null, rows);
    });




};
