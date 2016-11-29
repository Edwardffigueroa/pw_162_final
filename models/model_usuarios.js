/**LIJTO!
 * esta clase se encarga de traer la información de la base de datos relacionada con los usuarios
 */
var database = require('../database');

//trae todos los usuarios de la base de datos
exports.traerUsuarios = function (done) {
    database.get().query('SELECT * FROM pwfinal_usuarios', function (err, rows) {
        if (err)
            return done(err);
        done(null, rows);
    });
};

//REVISAR!!!
//valida si se ha hecho login correctamente
exports.login = function (codigo, contrasena, done) {
    database.get().query('SELECT * FROM pwfinal_usuarios WHERE codigo = ? AND contrasena= ?', [codigo,contrasena], function (err, rows) {
        done(err, rows);
    });
};

//crea un nuevo usuario
exports.newUser = function (nombres,apellidos, contrasena,carrera, codigo, done) {

    var nusuario = {
        nombres: nombres,
        apellidos: apellidos,
        contrasena: contrasena,
        carrera: carrera,
        codigo: codigo
    };

    database.get().query('INSERT INTO pwfinal_usuarios SET ? ', nusuario, function (err, rows) {
        if (err)
            return done(err);
        done(null, rows);
    });

};




