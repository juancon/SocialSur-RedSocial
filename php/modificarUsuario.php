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
	//recogemos las variable que nos indica el tipo de modificacion
	@$tipo = strtolower($array->tipo);

	//preguntamos cual va a ser la modificacion
	if($tipo == "bio"){
		//recogemos el id del usuario y la nueva bio
		@$id = $array->id;
		@$bio = $array->bio;
		//realizamos la modificacion y devolvemos la respuesta
		if($funciones::modificarBioUsuario($id,$bio) == 1){
			$respuesta = array('actualizacion' => "1" );
		}else{
			$respuesta = array('actualizacion' => "0" );
		}
	}

	//devolvemos la respuesta en formato jason
	echo json_encode($respuesta)

?>
