<?php
	//permitimos el acceso externo
	header("Access-Control-Allow-Origin: * ");
	header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
	header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
	//iniciamos las sesiones
	session_start();
	//incluimos los ficheros que continen las funciones referentes a los estados
	include 'clasesphp/FuncionesEstados.php';

	//instanciamos las clases que contiene todas las funciones de los estados
	$funcionesEstados = new FuncionesEstados;
	

	//convertimos a Jason los datos enviados por angular con la funcion http.post
	$json = file_get_contents('php://input');
	//convertimos ese json a objeto
	$array = json_decode($json);
	//recogemos el id de usuario y el mensaje
	@$idusuario = $array->idusuario;
	@$mensaje = $array->mensaje;

	$respuesta = array();
	//creamos el estado
	if($funcionesEstados::crearEstado($idusuario,$mensaje) == 1){
		//si se crea devolvemos resultado 1
		$respuesta = array("resultado" => 1,);

	}else{
		//si no se crea devolvemoes resultado = 0
		$respuesta = array( "resultado" => 0);
	}
	

	//devolvemos la respuesta en formato jason
	echo json_encode($respuesta);
?>
