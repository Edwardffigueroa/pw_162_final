var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var usuarios = require('../models/model_usuarios');
var route_usuarios = express.Router();//


module.exports = function () {
    route_usuarios.use(bodyParser.json());

    route_usuarios.route('/login').post(function (req, res) {
        console.log("ruta de login");
        console.log(req.body.codigo);
        console.log(req.body.contrasena);

        usuarios.login(req.body.codigo, req.body.contrasena, function (err, rows) {
            if (!err) {
                res.json(rows);
            } else {
                res.json(err);
            }
        });
    });

//trae esta información a traves del BODY!!!!
    route_usuarios.route('/').post(function (req, res) {
        console.log("ruta de user");
        usuarios.newUser(req.body.nombres, req.body.apellidos, req.body.contrasena, req.body.carrera, parseInt(req.body.codigo), function (err, rows) {
            if (!err) {
                res.json(rows);
            } else {
                res.json(err);
            }
        });
    });

    return route_usuarios;
}();
