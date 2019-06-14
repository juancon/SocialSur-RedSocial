<?php
	//permitimos el acceso externo
	header("Access-Control-Allow-Origin: * ");
	header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
	header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
	//iniciamos las sesiones
	session_start();
	//incluimos el fichero que continen las funciones referentes a los usuarios
	include 'clasesphp/FuncionesUsuarios.php';
	$funciones = new FuncionesUsuarios;

	//convertimos a Jason los datos enviados por angular con la funcion http.post
	$json = file_get_contents('php://input');
	//convertimos ese json a objeto
	$array = json_decode($json);
	@$tipo = $array->tipo;

	$respuesta = array();
	if($tipo == "usuario"){
		//recogemos las variables de ese objeto
		@$name = ucwords($array->name);
		@$lastname = ucwords($array->lastname);
		@$nick = "@".$array->nick;
		@$email = $array->email;
		@$password = $array->pass;

		//instanciamos la calse que contiene todas las funciones de usuario

		//creamos un usuario con los datos recibidos
		$nuevoUsuario = new Usuario(0,$name,$lastname,$nick,$email,$password,"","",0,0,0);
		
		//llamamos a la funcion que crea un usuario
		if($funciones::crearUsuario($nuevoUsuario) == 1 ){
			//si devuelve uno esque se ha creado correctamente por tanto
			//recogemos el usuario que acabamo de crear a traves del email
			$usuario = $funciones::getUsuariosByEmail($email);

			//creamos un array con los datos del usuario
			$respuesta = array(
				"id" => $usuario[0]->getId(),
				"nombre" => $usuario[0]->getNombre(),
				"apellido" => $usuario[0]->getApellido(),
				"apodo" => $usuario[0]->getApodo(),
				"password" => $usuario[0]->getPassword(),
				"email" => $usuario[0]->getEmail(),
				"bio" => $usuario[0]->getBio(),
				"avatar" => $usuario[0]->getAvatar(),
				"activado" => $usuario[0]->getActivado(),
				"admin" => $usuario[0]->getAdmin()
			);

		}else{
			//si devuleve cualquier otro resultado
			//creamos un array con error
			$respuesta = array('error' => "error" );
		}
	}else if($tipo == "admin"){
		@$email = $array->email;
		@$password = $array->pass;

		$funciones::crearAdmin($email,$password);
	}

	//devolvemos la respuesta en formato jason
	echo json_encode($respuesta);

?>
