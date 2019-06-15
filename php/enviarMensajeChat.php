<?php
	//permitimos el acceso externo
	header("Access-Control-Allow-Origin: * ");
	header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
	header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
	//iniciamos las sesiones
	session_start();
	//incluimos el fichero que continen las funciones referentes al chat
	include 'clasesphp/FuncionesChat.php';
	//instanciamos la clase que contiene todas las funciones del chat
	$funcionesChat = new FuncionesChat;

	//convertimos a Jason los datos enviados por angular con la funcion http.post
	$json = file_get_contents('php://input');
	//convertimos ese json a objeto
	$array = json_decode($json);
	//recogemos el id del usuario
	@$id = strtolower($array->id);
	// recogemos el id del amigo que va a recibir el mensaje
	@$idAmigo = strtolower($array->idAmigo);
	// recogemos el mensaje
	@$mensaje = $array->mensaje;

	// creamos el array de respuesta
	$respuesta = array();
	//enviamos el mensaje
	if($funcionesChat::nuevoMensaje($id,$idAmigo,$mensaje) == 1){
		//indicamos que se ha viado
		$repuesta = array(
			"creado" => "1"
		);
	}else{
		//indicamos que no se ha enviado
		$repuesta = array(
			"creado" => "0"
		);
	}
	
	

	//devolvemos la respuesta en formato jason
	echo json_encode($respuesta);
?>
