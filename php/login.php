<?php
	//permitimos el acceso externo
	header("Access-Control-Allow-Origin: * ");
	header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
	header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
	//iniciamos las sesiones
	session_start();
	//incluimos el fichero que continen las funciones referentes a los usuarios
	include 'clasesphp/FuncionesUsuarios.php';

	//convertimos a Jason los datos enviados por angular con la funcion http.post
	$json = file_get_contents('php://input');
	//convertimos ese json a objeto
	$array = json_decode($json);
	//recogemos las variables de ese objeto
	@$email = $array->email;
	@$password = $array->pass;

	//instanciamos la calse que contiene todas las funciones de usuario
	$funciones = new FuncionesUsuarios;
	//llamamos a la funcion que devulve un usuario por nombre y contraseña
	$usuario = $funciones::getUsuarioByEmailPassword($email,$password);


	//comprobamos que hayamos tenido respuesta con esos datos
	if($usuario != null){
		//creamos un array con los datos que devuelve la funcion
		$respuesta = array(
			"id" => $usuario[0]->getId(),
			"nombre" => $usuario[0]->getNombre(),
			"apellido" => $usuario[0]->getApellido(),
			"password" => $usuario[0]->getPassword(),
			"email" => $usuario[0]->getEmail(),
			"bio" => $usuario[0]->getBio(),
			"avatar" => $usuario[0]->getAvatar(),
			"conectado" => $usuario[0]->getConectado(),
			"activado" => $usuario[0]->getActivado(),
			"admin" => $usuario[0]->getAdmin()
		);
		$_SESSION["usuario"] = serialize($respuesta);
	}else{
		//creamos un array con error
		$respuesta = array('error' => "error");
	}

	//devolvemos la respuesta en formato jason
	echo json_encode($respuesta)

?>
