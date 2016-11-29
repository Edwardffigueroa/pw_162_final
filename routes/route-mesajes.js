/**
 * New node file
 */
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var mensajes = require('../models/model_mensajes.js');
var route_mensajes = express.Router();// exporto la ruta

module.exports = function () {
    route_mensajes.use(bodyParser.json());

    route_mensajes.route('/:id_publicacion').get(function (req, res) {
        console.log('se llamó el metodo get de mesajes');
        console.log(req.params.id_publicacion);

        mensajes.getMensajes(req.params.id_publicacion, function (err, rows) {
            if (!err) {
                res.json(rows);
            } else {
                res.json(err);
            }
        });
    });

    route_mensajes.route('/').post(function (req, res) {
        console.log('se llamó el metodo post de mesajes');
        //id_remitente, id_publiacion, contenido
        mensajes.crearMensaje(req.body.id_usuario, req.body.id_publicacion, req.body.contenido, function (err, rows) {
            if (!err) {
                res.json(rows);
            } else {
                res.json(err);
            }
        });

    });

    return route_mensajes;
}();
