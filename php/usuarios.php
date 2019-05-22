<?php
	//permitimos el acceso externo
	header("Access-Control-Allow-Origin: * ");
	header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
	header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
	//iniciamos las sesiones
	session_start();
	//incluimos el fichero que continen las funciones referentes a los usuarios
	include 'clasesphp/FuncionesUsuarios.php';
	//instanciamos la clase que contiene todas las funciones de los usuarios
	$funcionesUsuarios = new FuncionesUsuarios;

	//convertimos a Jason los datos enviados por angular con la funcion http.post
	$json = file_get_contents('php://input');
	//convertimos ese json a objeto
	$array = json_decode($json);
	//recogemos las variable basicas necearias
	@$accion = $array->accion;
	
	$respuesta = array();

	if($accion == "obtenernombreusuario"){
		//recogemos las variables necesarias par realizar la accion
		@$idusuario = $array->idusuario;

		//realizamos la consulta
		$usuario = $funcionesUsuarios::getUsuarioById($idusuario);

		$respuesta = array(
			"nombre" => $usuario[0]->getNombre(),
			"apellido" => $usuario[0]->getApellido()
		);

	}
	
	

	//devolvemos la respuesta en formato jason
	echo json_encode($respuesta);
?>
