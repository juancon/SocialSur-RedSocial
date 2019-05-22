<?php
	//permitimos el aaceso al fichero
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, X-Requested-With');
	header('Access-Control-Allow-Methods: POST, GET, PATCH, PUT, DELETE, OPTIONS');
	//iniciamos las sesiones
	session_start();
	//importamos la clase que contiene las funciones de los usuarios
	include 'clasesphp/FuncionesUsuarios.php';
	//instanciamos la calse que contiene todas las funciones de los usuarios
	$funcionesUsuarios = new FuncionesUsuarios;
	//convertimos a Jason los datos enviados por angular con la funcion http.post
	$json = file_get_contents('php://input');
	//convertimos ese json a objeto
	$array = json_decode($json);
	//recogemos las variable que nos indica el tipo de modificacion
	@$id = strtolower($array->id);
	@$accion = strtolower($array->accion);

	$respuesta = array();
	if($accion == "conectar"){
		//conectamos al usuario
		$funcionesUsuarios::conectarUsuario($id);
		$respuesta = array("conectado" => 1);

	}else if($accion == "desconectar"){
		//desconectamos al usuario
		$funcionesUsuarios::desconectarUsuario($id);
		$respuesta = array("desconectado" => 1);
	}
	//llamamos a la funcion que desconecta a los usuarios conectado
	echo json_encode($respuesta);

?>