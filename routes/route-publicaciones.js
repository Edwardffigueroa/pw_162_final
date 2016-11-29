/**
 * New node file
 */
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var publicaciones = require('../models/model_publicaciones');
var route_publiciones = express.Router();// exporto la ruta


// /publicaciones

module.exports = function () {

    route_publiciones.use(bodyParser.json());

    route_publiciones.route('/').get(function (req, res) {
        console.log('se llamó el metodo get de publicaciones');
        publicaciones.traerPublicaciones(function (err, rows) {
            if (!err) {
                res.json(rows);
            } else {
                res.json(err);
            }
        });

    });

    route_publiciones.route('/').post(function (req, res) {
        console.log('se llamó el metodo post de publicaciones');

        var targetPath = './public/images/publicaciones/' + req.file.filename;
        fs.rename(req.file.path, targetPath, function(err) {
            if (err)
                throw err;
            /*
             * Borrar el archivo temporal, para que el servidor no se
             * llene
             */
            fs.unlink(req.file.path, function(err) {
                if (err)
                    console.log(err);
            });

            console.log(req.body.numero_contacto);
            // Hacer el registro en base de datos
            publicaciones.crearPublicaion(req.body.titulo, req.body.contenido, req.body.id_usuario, 'images/publicaciones/' + req.file.filename,req.body.numero_contacto,req.body.tag, function (err, rows) {
                if (!err) {
                    res.redirect('/inicio.html');
                } else {
                    res.json(err);
                }
            });
        });
    });


    // .post(function(req, res, next) {

    //
    //     // Guardar el archivo en la ubicacion final
    //     var targetPath = './public/images/' + req.file.filename;
    //     fs.rename(req.file.path, targetPath, function(err) {
    //         if (err)
    //             throw err;
    //         /*
    //          * Borrar el archivo temporal, para que el servidor no se
    //          * llene
    //          */
    //         fs.unlink(req.file.path, function(err) {
    //             if (err)
    //                 console.log(err);
    //         });

    //         // Hacer el registro en base de datos
    //         photosController.create(req.body.author, req.body.place,
    //             'images/' + req.file.filename,
    //             function(err, result) {
    //                 if (err)
    //                     throw err;
    //                 res.json(result);
    //             });
    //     });
    // });


    return route_publiciones;
}();



