/**
 * Nodo encargado de administrar las rutas de favoritos
 */
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var favoritos = require('../models/model_favoritos.js');
var route_cursos = express.Router();// exporto la ruta

module.exports = function () {
    route_cursos.use(bodyParser.json());

    route_cursos.route('/:id_publiacacion').get(function (req, res) {
        console.log('se llamó el metodo get de favoritos');

        favoritos.traerFavoritos(req.params.id_usuario, function (error, names) {
            if (!error) {
                res.json(names);
            } else {
                res.json(error);
            }
        });
    });


    route_cursos.route('/').delete(function (req, res) {
        console.log('se llamó el metodo DELETE! de cursos en especifico');
        favoritos.eliminarFavorito(req.body.id_publicacion, req.body.id_usuario,function (error, curso) {
            if (!error) {
                res.json(curso);
                if (curso.length == 0) {
                    res.send('Ese tal Curso no existe', 404);
                }
            } else {
                res.json(error);
            }
        });
    });

    route_cursos.route('/').post(function (req, res) {
        console.log('se llamó el metodo POST! de cursos en especifico');
        favoritos.agregarFavorito(req.body.id_publicacion, req.body.id_usuario,function (error, curso) {
            if (!error) {
                res.json(curso);
                if (curso.length == 0) {
                    res.send('Ese tal Curso no existe', 404);
                }
            } else {
                res.json(error);
            }
        });
    });
    return route_cursos;
}();
