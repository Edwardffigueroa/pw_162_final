/**
 * Created by andre on 11/28/2016.
 */

var app = angular.module("myApp", []);

app.controller("loginCtrl", function ($window, $scope, $http) {

    $scope.startlogin = function () {
        console.log("se llama el metodo startLogin");
        var data = {
            codigo: $scope.user,
            contrasena: $scope.pass
        };

        $http.post('/servicios/usuarios/login', JSON.stringify(data)).then(function (response) {
            if (response.data) {
                console.log(response.data[0]);
                if (response.data[0]) {
                    $window.location.href = '/inicioAng.html';
                } else {
                    $scope.msg = "usuario o contraseña incorrecta";
                }
            }
        }, function (response) {
        });
    };
});
app.controller("registroCtrl", function ($window, $scope, $http) {


    $scope.startRegister = function () {
        console.log("se llama el metodo registerLogin");
        var data = {
            nombres: $scope.nombres,
            apellidos: $scope.apellidos,
            contrasena: $scope.contrasena,
            carrera: $scope.carrera,
            codigo: $scope.codigo
        };

        $http.post('servicios/usuarios/', JSON.stringify(data)).then(function (response) {
            if (response.data) {
                console.log(response.data);
                if (response.data) {
                    //   if(response.data.warningCount===0){
                    $window.location.href = '/index.html';
                    //     }
                }
            }
        }, function (response) {

        });
    };


});


app.controller("inicioCtrl", function ($window, $scope, $http) {
    $http.get("/servicios/publicaciones/").then(function (response) {
        $scope.publicaciones = response.data;
    });
    $scope.seleccionarItem = function (itemSeleccionado) {
        $scope.seleccionado =   itemSeleccionado;
        console.log( $scope.seleccionado.titulo);
      $scope.  actualizarMensajes();
    };
    $scope.actualizarMensajes = function () {
        $http.get("/servicios/mensajes/"+  $scope.seleccionado.id_publicacion).then(function (response) {
            console.log("se trajo los mensajes pibe!"+$scope.seleccionado.id_publicacion);
            $scope.mensajes = response.data;
            console.log($scope.mensajes);
        });
    };
    $scope.mensaje="";
    $scope.subirComentario= function (id_publicacion, id_usuario, contenido) {
        $scope.mensaje="";
        var data = {
            id_publicacion: id_publicacion,
            id_usuario: id_usuario,
            contenido: contenido
        };
        $http.post('servicios/mensajes/', JSON.stringify(data)).then(function (response) {
            if (response.data) {
                console.log(response.data);
                if (response.data) {
                    $scope.  actualizarMensajes();
                }
            }
        }, function (response) {
        });
    }


    $scope.verfavoritos= function (id_usuario) {
        $http.get("/servicios/favoritos/"+id_usuario).then(function (response) {
            console.log("se trajo los favoritos");
            $scope.favoritos = response.data;
        });
    }

});

app.controller("formularioCtrl", function ($scope, $http, $window) {


    console.log("encargado de llenar el formulario");


});

