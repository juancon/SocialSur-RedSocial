<?php
	//permitimos el acceso externo
	header("Access-Control-Allow-Origin: * ");
	header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
	header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
	//iniciamos las sesiones
	session_start();
	
	//creamos la variable respuesta que sera la que devolvamos
	$respuesta;	
	//preguntamos si la sesion de usuario esta iniciada
	if(isset($_SESSION['usuario']))
	{
		$respuesta = array("existe" => "1");
	}else
	{
		$respuesta = array("existe" => "0");
	}

	//devolvemos el array de respuesta en formato jason
	echo json_encode($respuesta);
?>
