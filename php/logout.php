<?php
	//permitimos el acceso externo
	header("Access-Control-Allow-Origin: * ");
	header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
	header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

	
	//creamos la variable respuesta
	$respuesta;
	//destruimos las sesiones
	if(session_destroy()){
		//si se destruye con exito devolvemos 1
		$respuesta = array("logout" => "1");
	}else
	{
		//si no devolvemos 0
		$respuesta = array("logout" => "0");
	}

	//devolvemos el array de respuesta en formato jason
	echo json_encode($respuesta);
	

?>
