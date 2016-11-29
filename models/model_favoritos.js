/**
 * esta clase se encarga de traer la información de la base de datos relacionada con los matriculas
 */

var database = require('../database');

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


    exports.traerFavoritos = function (id_usuario, done) {
//retorna los mensajes favoritos de cada usuario, es mas facil que solo traer las
        var nFavorito = {
            id_publicacion: id_publicacion,
            id_usuario: id_usuario
        };

        database.get().query('SELECT m.* FROM pwfinal_mensajes m, pwfinal_favoritos f WHERE f.id_favoritos = ? AND m.id_publicacion= f.id_publicacion', nFavorito, function (err, rows) {
            if (err)
            done(err, rows);
        });
    };


};









