<?php
	//permitimos el acceso externo
	header("Access-Control-Allow-Origin: * ");
	header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
	header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
	//iniciamos las sesiones
	session_start();
	//incluimos el fichero que continen las funciones referentes a los usuarios
	include 'clasesphp/FuncionesUsuarios.php';
	//instanciamos la calse que contiene todas las funciones de usuario
	$funciones = new FuncionesUsuarios;
	//convertimos a Jason los datos enviados por angular con la funcion http.post
	$json = file_get_contents('php://input');
	//convertimos ese json a objeto
	$array = json_decode($json);
	//recogemos las variable accion
	@$accion = $array->accion;

	if($accion =="comprobarcorreo"){
		@$email = $array->email;

		//buscamos un usuario con ese correo
		if($funciones::buscarUsuarioByEmail($email) == 1){
			//si existe devolvemos 1
			$respuesta = array('existe' => "1" );
		}else{
			//si no existe devolvemos 0
			$respuesta = array('existe' => "0" );
		}

	}else if($accion == "comprobarapodo"){
		@$apodo = "@".$array->apodo;
		//buscamos un usuario con ese apodo
		if($funciones::buscarUsuarioByApodo($apodo) == 1){
			//si existe devolvemos 1
			$respuesta = array('existe' => "1" );
		}else{
			//si no existe devolvemos 0
			$respuesta = array('existe' => "0" );
		}
	}


	//devolvemos el array de respuesta en formato jason
	echo json_encode($respuesta);
?>
