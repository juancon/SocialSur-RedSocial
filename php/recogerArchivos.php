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
	//recogemos el id del usuario
	@$id = strtolower($array->id);
	//obtenemos los archivos del usuario
	$archivos = $funcionesFotosVideos::getArchivosByIdusuario($id);

	$respuesta = array();
	//recogemos el array de archivos
	for ($i=0; $i < count($archivos); $i++) {
		//lo añadimos a un array
		$archivo = array(
			"id" => $archivos[$i]->getId(),
			"url" => $archivos[$i]->getUrl(),
			"nombre" => $archivos[$i]->getNombre(),
			"idusuario" => $archivos[$i]->getIdusuario(),
			"tipo" => $archivos[$i]->getTipo(),
			"fecha" => $archivos[$i]->getFecha()
		);
		
		//lo añadimos al array de respuesta
		array_push($respuesta, $archivo);
	}
	//devolvemos la respuesta en formato jason
	echo json_encode($respuesta);
?>
