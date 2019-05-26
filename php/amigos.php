<?php
	//permitimos el acceso externo
	header("Access-Control-Allow-Origin: * ");
	header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
	header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
	//iniciamos las sesiones
	session_start();
	//incluimos el fichero que continen las funciones referentes a los mensajes y las petciones de amistas
	include 'clasesphp/FuncionesAmigos.php';
	include 'clasesphp/FuncionesUsuarios.php';
	//instanciamos la clase que contiene todas las funciones de los mensajes y las peticiones de amistad
	$funcionesAmigos = new FuncionesAmigos;
	$funcionesUsuario = new FuncionesUsuarios;

	//convertimos a Jason los datos enviados por angular con la funcion http.post
	$json = file_get_contents('php://input');
	//convertimos ese json a objeto
	$array = json_decode($json);
	//recogemos las variable que nos indica el tipo de modificacion
	@$accion = strtolower($array->accion);


	$respuesta = array();
	if($accion == "obteneramigos"){
		@$id = strtolower($array->id);
		
		//obtenemos los amigos del usuario
		$amigos = $funcionesAmigos::getAmigosUsuario($id);
		//recogemos el array
		for ($i=0; $i < count($amigos); $i++) {
			//obtenemos los datos del amigo por su id
			$usuario = $funcionesUsuario::getUsuarioById($amigos[$i]);
			//lo añadimos a un array
			$amigo = array(
				"id" => $usuario[0]->getId(),
				"nombre" => $usuario[0]->getNombre(),
				"apellido" => $usuario[0]->getApellido(),
				"apodo" => $usuario[0]->getApodo(),
				"email" => $usuario[0]->getPassword(),
				"bio" => $usuario[0]->getBio(),
				"avatar" => $usuario[0]->getAvatar(),
				"conectado" => $usuario[0]->getConectado()
			);
			//lo añadimos al array de respuesta
			array_push($respuesta, $amigo);
		}
	}else if($accion == "borraramigo"){
		@$idusuario = strtolower($array->idusuario);
		@$idamigo = strtolower($array->idamigo);

		$usuario = $funcionesAmigos::borrarAmigo($idusuario,$idamigo);

		$respuesta = array(
			"borrado" => 1
		);
	}
	
	

	//devolvemos la respuesta en formato jason
	echo json_encode($respuesta);
?>
