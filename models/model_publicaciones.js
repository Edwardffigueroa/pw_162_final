/**
 * esta clase se encarga de traer la información de la base de datos relacionada con los matriculas
 */
 var database = require('../database');
// COMO PARAMETROS DEBEN IR LOS CAMPOS QUE IRÁN A LA BASE DE DATOS
exports.crearPublicaion= function(titulo,contenido,id_usuario,dirfoto,numero_contacto, tag, done ){

 var nPublicacion = {
     titulo: titulo,
     id_usuario: 1,//se debe solucionar el id
     contenido: contenido,
     dir_foto_publicacion: dirfoto,
     numero_contacto: numero_contacto,
     tag: tag
 };

 database.get().query('INSERT INTO pwfinal_publicaciones SET ?', nPublicacion, function (err, rows) {
  if (err)
   return done(err);
  done(null, rows);
 });
};

//trae todos los usuarios de la base de datos
exports.traerPublicaciones = function (done) {
    database.get().query('SELECT p.*,  u.nombres, u.apellidos FROM pwfinal_publicaciones p,pwfinal_usuarios u WHERE p.id_usuario= u.id_usuario', function (err, rows) {
        if (err)
            return done(err);
        done(null, rows);
    });
};






