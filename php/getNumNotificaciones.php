<?php
	//permitimos el acceso externo
	header("Access-Control-Allow-Origin: * ");
	header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
	header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
	//iniciamos las sesiones
	session_start();
	//incluimos el fichero que continen las funciones referentes a los mensajes y las petciones de amistas
	include 'clasesphp/FuncionesMensajes.php';
	include 'clasesphp/FuncionesPeticionAmistad.php';
	//instanciamos la clase que contiene todas las funciones de los mensajes y las peticiones de amistad
	$funcionesMensajes = new FuncionesMensajes;
	$funcionesPeticiones = new FuncionesPeticionAmistad;

	//convertimos a Jason los datos enviados por angular con la funcion http.post
	$json = file_get_contents('php://input');
	//convertimos ese json a objeto
	$array = json_decode($json);
	// recogemos el id del usaurio
	@$id = strtolower($array->id);
	// recogemos la variable que indica si queremos recoger las peticones o los mensajes
	@$tipo = $array->tipo;

	//dependiendo de si se quiere lapeticiones o los mensajes devolvemos una u otra
	if($tipo == "mensajes"){
		//obtenemos los mensajes no leios
		$mensajes = $funcionesMensajes::getMensajesNoLeidosbyUsuarioTo($id);
		$respuesta = array(
			"total" => count($mensajes)
		);
	}else{
		//obtenemos las peticiones no aceptas o rechazadas
		$peticiones = $funcionesPeticiones::getPeticionesUsuarioToNoAceptadas($id);
		$respuesta = array(
			"total" => count($peticiones)
		);

	}
	

	//devolvemos la respuesta en formato jason
	echo json_encode($respuesta)

?>
