<?php
	//permitimos el acceso externo
	header("Access-Control-Allow-Origin: * ");
	header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
	header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
	//iniciamos las sesiones
	session_start();
	//incluimos el fichero que continen las funciones referentes a los usuarios y a los amigos
	include 'clasesphp/FuncionesPeticionAmistad.php';
	include 'clasesphp/FuncionesUsuarios.php';
	//instanciamos la clase que contiene todas las funciones de los usuarios y a los amigos
	$funcionesPeticionAmistad = new FuncionesPeticionAmistad;
	$funcionesAmigos = new FuncionesAmigos;
	$funcionesUsuarios = new FuncionesUsuarios;

	//convertimos a Jason los datos enviados por angular con la funcion http.post
	$json = file_get_contents('php://input');
	//convertimos ese json a objeto
	$array = json_decode($json);
	//recogemos las variable basicas necearias
	@$accion = $array->accion;
	
	$respuesta = array();

	if($accion == "obtenernombreusuario"){
		//recogemos el id del usuario
		@$idusuario = $array->idusuario;

		//realizamos la consulta
		$usuario = $funcionesUsuarios::getUsuarioById($idusuario);
		//añadimos el resultado al id de respuesta
		$respuesta = array(
			"nombre" => $usuario[0]->getNombre(),
			"apellido" => $usuario[0]->getApellido()
		);

	}else if($accion == "buscarusuario"){
		// recogemos el id del usaurio
		@$idusuario = $array->idusuario;
		// recogemos la cadena que se ha buscado
		@$cadena = $array->cadena;

		//realizamos la consulta
		$usuarios = $funcionesUsuarios::getUsuariosByCadenaBusqueda($cadena);
		// recorremos los usuarios
		for( $i = 0; $i < count($usuarios); $i++){
			//evitamos devolver el usuario que ha realizado la busqueda o adminstradaores del sistema
			if ($idusuario == $usuarios[$i]->getId() || $usuarios[$i]->getId() == 0 || $usuarios[$i]->getAdmin() == 1) {
				continue;
			}
			//comprobamos si son amigos
			$amistad = $funcionesAmigos::comprobarAmistad($idusuario,$usuarios[$i]->getId());

			//si no son amigos comprobamos que no se hala realizado ninguna peticion de amistad
			if($amistad == 0){
				$peticion = $funcionesPeticionAmistad::comprobarPeticion($idusuario,$usuarios[$i]->getId());
				if($peticion == 1){
					$amistad = 2;
				}
			}
			// añadimos la informacion a un array
			$usuario = array(
					"id" => $usuarios[$i]->getId(),
					"nombre" => $usuarios[$i]->getNombre(),
					"apellido" => $usuarios[$i]->getApellido(),
					"apodo" => $usuarios[$i]->getApodo(),
					"email" => $usuarios[$i]->getPassword(),
					"bio" => $usuarios[$i]->getBio(),
					"avatar" => $usuarios[$i]->getAvatar(),
					"conectado" => $usuarios[$i]->getConectado(),
					"amistad" => $amistad
			);
			// añadimos el array al array de respuesta
			array_push($respuesta, $usuario);
		}
	}else if($accion == "buscarapodo"){
		//recogemos el id del usuario
		@$idusuario = $array->idusuario;
		//recogemos el apodo
		@$apodo = $array->apodo;

		//realizamos la consulta
		$usuarios = $funcionesUsuarios::getUsuariosByApodo($apodo);

		//comprobamos si son amigos
		$amistad = $funcionesAmigos::comprobarAmistad($idusuario,$usuarios[0]->getId());

		//si no son amigos comprobamos que no se hala realizado ninguna peticion de amistad
		if($amistad == 0){
			$peticion = $funcionesPeticionAmistad::comprobarPeticion($idusuario,$usuarios[0]->getId());
			if($peticion == 1){
				$amistad = 2;
			}
		}
		// añadimos la información a un array
		$usuario = array(
				"id" => $usuarios[0]->getId(),
				"nombre" => $usuarios[0]->getNombre(),
				"apellido" => $usuarios[0]->getApellido(),
				"apodo" => $usuarios[0]->getApodo(),
				"email" => $usuarios[0]->getPassword(),
				"bio" => $usuarios[0]->getBio(),
				"avatar" => $usuarios[0]->getAvatar(),
				"conectado" => $usuarios[0]->getConectado(),
				"amistad" => $amistad
		);
		// añadimos el array al array de respuesta
		array_push($respuesta, $usuario);
	}else if($accion == "obteneradmins"){
		// recogemos el id del usuario
		@$idusuario = $array->idusuario;

		//realizamos la consulta
		$admins = $funcionesUsuarios::getAdmins();
		//recorremos el array
		for( $i = 0; $i < count($admins); $i++){
			//evitamos devolver el usuario que ha realizado la busqueda
			if ($idusuario == $admins[$i]->getId()) {
				continue;
			}
			
			//añadimos los datos a un array
			$admin = array(
					"id" => $admins[$i]->getId(),
					"nombre" => $admins[$i]->getNombre(),
					"apellido" => $admins[$i]->getApellido(),
					"apodo" => $admins[$i]->getApodo(),
					"email" => $admins[$i]->getPassword(),
					"bio" => $admins[$i]->getBio(),
					"avatar" => $admins[$i]->getAvatar(),
					"conectado" => $admins[$i]->getConectado()
			);
			// añadimo el array al array de respuesta
			array_push($respuesta, $admin);
		}
	}else if($accion == "borrarusuario"){
		// recogemos le id del usuario
		@$idusuario = $array->idusuario;

		//borramos el usuario
		$borrar = $funcionesUsuarios::borrarUsuario($idusuario);
	}else if($accion == "cambiarpassword"){
		// recogemos el id del usuario
		@$idusuario = $array->idusuario;
		// recogemos la nueva contraseña
		@$password = $array->password;

		//cambiamos la contraseña del usuario
		$borrar = $funcionesUsuarios::cambiarPass($idusuario,$password);

	}else if($accion == "obtenerusuarios"){

		//realizamos la consulta
		$usuarios = $funcionesUsuarios::getUsuarios();
		// recorremos el array de usuarios
		for( $i = 0; $i < count($usuarios); $i++){
			//evitamos devolver el usuario que ha realizado la busqueda
			if ($usuarios[$i]->getId() == 0) {
				continue;
			}
			
			// añadimos la unformacion del usuario a un array
			$usuario = array(
					"id" => $usuarios[$i]->getId(),
					"nombre" => $usuarios[$i]->getNombre(),
					"apellido" => $usuarios[$i]->getApellido(),
					"apodo" => $usuarios[$i]->getApodo(),
					"email" => $usuarios[$i]->getPassword(),
					"bio" => $usuarios[$i]->getBio(),
					"avatar" => $usuarios[$i]->getAvatar(),
					"conectado" => $usuarios[$i]->getConectado()
			);
			// lo añadimos al array de respuesta
			array_push($respuesta, $usuario);
		}
	}
	
	

	//devolvemos la respuesta en formato jason
	echo json_encode($respuesta);
?>
