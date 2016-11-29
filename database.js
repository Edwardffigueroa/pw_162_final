/**
 * Clase encargada de la base de datos
 */
/* se instalan todos lo modulos externos que se utilizarán en el proyecto */
var mysql = require('mysql');

var state = {
	pool : null
};

exports.connect = function(done) {
	/*la base de datos a utilizar en el proyecto final será la de Andrés Gc*/
	state.pool = mysql.createPool({
				host : "programacion-web-test.cejfwltsp021.sa-east-1.rds.amazonaws.com",
				user : "14112026",
				password : "14112026",
				database : "14112026"
			});
	done();
};

exports.get = function() {
	return state.pool;
};
