<?php
	//permitimos el acceso externo
	header("Access-Control-Allow-Origin: * ");
	header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
	header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
	//iniciamos las sesiones
	session_start();
	//incluimos el fichero que continen las funciones referentes a los mensajes y los usuarios
	include 'clasesphp/FuncionesPeticionAmistad.php';
	include 'clasesphp/FuncionesUsuarios.php';
	//instanciamos la clase que contiene todas las funciones de los mensajes
	$funcionesPeticionAmistad = new FuncionesPeticionAmistad;
	$funcionesUsuarios = new FuncionesUsuarios;
	$funcionesAmigos = new FuncionesAmigos;

	//convertimos a Jason los datos enviados por angular con la funcion http.post
	$json = file_get_contents('php://input');
	//convertimos ese json a objeto
	$array = json_decode($json);
	//recogemos las variable basicas necearias
	@$accion = $array->accion;
	
	$respuesta = array();

	if($accion == "obtenerpeticiones"){
		@$idusuario = $array->idusuario;

		//obtenetenemos las peticiones
		$peticiones = $funcionesPeticionAmistad::getPeticionesUsuarioTo($idusuario);

		for ($i=0; $i < count($peticiones); $i++) { 
			//obtenemos el usuario que envia la peticion
			$otroUsuario = $funcionesUsuarios::getUsuarioById($peticiones[$i]->getUsuariofrom());
			
			//creamos un array con los datos de la peticion y el usuario que la envia
			$peticion = array(
							"usuariofrom" => $peticiones[$i]->getUsuariofrom(),
							"usuarioto" => $peticiones[$i]->getusuarioto(),
							"mensaje" => $peticiones[$i]->getMensaje(),
							"otroUsuario" => array(
												"id" => $otroUsuario[0]->getId(),
												"nombre" => $otroUsuario[0]->getNombre(),
												"apellido" => $otroUsuario[0]->getApellido(),
												"email" => $otroUsuario[0]->getPassword(),
												"bio" => $otroUsuario[0]->getBio(),
												"avatar" => $otroUsuario[0]->getAvatar(),
												"conectado" => $otroUsuario[0]->getConectado()
											),
							"aceptado" => $peticiones[$i]->getAceptado(),
							"fecha" => $peticiones[$i]->getFecha()
			);
			//la añadimos al array
			array_push($respuesta, $peticion);
		}


	}elseif($accion = "responderpeticion"){
		@$idusuariofrom = $array->idusuariofrom;
		@$idusuarioto = $array->idusuarioto;
		@$respuestaUsuario = $array->respuesta;

		//preguntamos si el usuario ha aceptado o rechazado la solicitud
		if($respuestaUsuario == "aceptar"){
			//si el usuario ha aceptado la peticion añadimos la nueva amistad
			$amigoNuevo = $funcionesAmigos::nuevoAmigo($idusuariofrom,$idusuarioto);

			//borramos la peticion
			$borrar = $funcionesPeticionAmistad::borrarPeticion($idusuariofrom,$idusuarioto);


			$respuesta = array(
				"aceptar" => $amigoNuevo
			);



		}else{
			//borramos la peticion
			$borrar = $funcionesPeticionAmistad::borrarPeticion($idusuariofrom,$idusuarioto);


			$respuesta = array(
				"rechazar" => $borrar
			);
		}
	}

	
	

	//devolvemos la respuesta en formato jason
	echo json_encode($respuesta);
?>
