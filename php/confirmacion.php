<?php
	//permitimos el acceso externo
	header("Access-Control-Allow-Origin: * ");
	header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
	header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
	
	//importamos la clase que contiene las funciones de los usuarios
	include 'clasesphp/FuncionesUsuarios.php';
	//instanciamos la calse que contiene todas las funciones de los usuarios
	$funcionesUsuarios = new FuncionesUsuarios;

	//recogemos el codifo de confirmacion
	$codigo = $_GET['cod'];
	//modificamos el usuario que contenga ese codigo
	$modificacion = $funcionesUsuarios::modificarActivadoUsuario($codigo);
	if($modificacion == 1){
		echo "Usuario Confirmado. Redirigiendo...";
	}else if($modificacion == 0){
		echo "Código de confirmación no reconocido.";
	}

	header( "refresh:5;url=http://ec2-3-85-15-40.compute-1.amazonaws.com" );

?>