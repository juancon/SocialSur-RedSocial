<?php
	//permitimos el acceso externo
	header("Access-Control-Allow-Origin: * ");
	header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
	header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
	//iniciamos las sesiones
	session_start();
	//incluimos el fichero que continen las funciones referentes a los archivos
	include 'clasesphp/FuncionesFotosVideos.php';
	//instanciamos la clase que contiene todas las funciones de los archivos
	$funcionesFotosVideos = new FuncionesFotosVideos;

	//convertimos a Jason los datos enviados por angular con la funcion http.post
	$json = file_get_contents('php://input');
	//convertimos ese json a objeto
	$array = json_decode($json);
	//recogemos las variable que nos indica el tipo de modificacion
	@$accion = strtolower($array->accion);


	$respuesta = array();
	if($accion == "borrararchivo"){
		@$idelemento = $array->idelemento;

		$funcionesFotosVideos::borrarArchivo($idelemento);
	}
	
	

	//devolvemos la respuesta en formato jason
	echo json_encode($respuesta);
?>
