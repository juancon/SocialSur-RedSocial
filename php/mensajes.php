<?php
	//permitimos el acceso externo
	header("Access-Control-Allow-Origin: * ");
	header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
	header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
	//iniciamos las sesiones
	session_start();
	//incluimos el fichero que continen las funciones referentes a los mensajes y los usuarios
	include 'clasesphp/FuncionesMensajes.php';
	include 'clasesphp/FuncionesUsuarios.php';
	//instanciamos la clase que contiene todas las funciones de los mensajes
	$funcionesMensajes = new FuncionesMensajes;
	$funcionesUsuarios = new FuncionesUsuarios;

	//convertimos a Jason los datos enviados por angular con la funcion http.post
	$json = file_get_contents('php://input');
	//convertimos ese json a objeto
	$array = json_decode($json);
	//recogemos las variable basicas necearias
	@$accion = $array->accion;
	
	$respuesta = array();

	if($accion == "enviarmensaje"){
		//recogemos el id del remitente
		$idusuariofrom = $array->idusuariofrom;
		// recogemos el id del destinatario
		$idusuarioto = $array->idusuarioto;
		//recogemos el mensaje
		$mensaje = $array->mensaje;

		//enviamos el mensaje
		$funcionesMensajes::crearMensaje($idusuariofrom,$idusuarioto,$mensaje);
	}else if($accion == "obtenermensajes"){
		//recogemos el id del usuario
		@$idusuario = $array->idusuario;

		//opbtenemos los mensajes que ha enviado o recibido el usuario
		$mensajes = $funcionesMensajes::getMensajesEnviadosRecibidos($idusuario);
		//recorremos el array y lo añadimos al array de respuesta
		for ($i=0; $i < count($mensajes); $i++) {
			//comprobamos que el usuario no ha borrado el mensaje para no mostrarselo
			if($idusuario == $mensajes[$i]->getIdusuariofrom()){
				if($mensajes[$i]->getBorradofrom() == 0 ){
					//obtenemos el otro usuario
					$otroUsuario = $funcionesUsuarios::getUsuarioById($mensajes[$i]->getIdusuarioto());

					//lo añadimos a un array
					$mensaje = array(
						"id" => $mensajes[$i]->getId(),
						"idusuariofrom" => $mensajes[$i]->getIdusuariofrom(),
						"idusuarioto" => $mensajes[$i]->getIdusuarioto(),
						"otroUsuario" => array(
											"id" => $otroUsuario[0]->getId(),
											"nombre" => $otroUsuario[0]->getNombre(),
											"apellido" => $otroUsuario[0]->getApellido(),
											"apodo" => $otroUsuario[0]->getApodo(),
											"email" => $otroUsuario[0]->getPassword(),
											"bio" => $otroUsuario[0]->getBio(),
											"avatar" => $otroUsuario[0]->getAvatar(),
											"conectado" => $otroUsuario[0]->getConectado()
										),
						"mensaje" => $mensajes[$i]->getMensaje(),
						"leido" => $mensajes[$i]->getLeido(),
						"borradofrom" => $mensajes[$i]->getBorradofrom(),
						"borradoto" => $mensajes[$i]->getBorradoto(),
						"fecha" => $mensajes[$i]->getFecha()
					);
					//lo añadimos al array de respuesta
					array_push($respuesta, $mensaje);		
				}
			}else if($idusuario == $mensajes[$i]->getIdusuarioto()){
				if($mensajes[$i]->getBorradoto() == 0){
					//obtenemos el otro usuario
					$otroUsuario = $funcionesUsuarios::getUsuarioById($mensajes[$i]->getIdusuariofrom());

					//lo añadimos a un array
					$mensaje = array(
						"id" => $mensajes[$i]->getId(),
						"idusuariofrom" => $mensajes[$i]->getIdusuariofrom(),
						"idusuarioto" => $mensajes[$i]->getIdusuarioto(),
						"otroUsuario" => array(
											"id" => $otroUsuario[0]->getId(),
											"nombre" => $otroUsuario[0]->getNombre(),
											"apellido" => $otroUsuario[0]->getApellido(),
											"apodo" => $otroUsuario[0]->getApodo(),
											"email" => $otroUsuario[0]->getPassword(),
											"bio" => $otroUsuario[0]->getBio(),
											"avatar" => $otroUsuario[0]->getAvatar(),
											"conectado" => $otroUsuario[0]->getConectado()
										),
						"mensaje" => $mensajes[$i]->getMensaje(),
						"leido" => $mensajes[$i]->getLeido(),
						"borradofrom" => $mensajes[$i]->getBorradofrom(),
						"borradoto" => $mensajes[$i]->getBorradoto(),
						"fecha" => $mensajes[$i]->getFecha()
					);
					//lo añadimos al array de respuesta
					array_push($respuesta, $mensaje);
				}
			}
			
		}
	}else if($accion == "borrarmensaje"){
		// recogemos el id del mensaje y del usuario
		@$idmensaje = $array->idmensaje;
		@$idusuario = $array->idusuario;
		// obtenemos si ees un mensaje enviado o recibido
		@$tipomensaje = $array->tipomensaje;

		//obtenemos el mensaje
		$mensaje = $funcionesMensajes::getMensajesbyId($idmensaje);

		//preguntamos si es un mensaje recibido u enviado
		if($tipomensaje == "recibido"){
			//marcamos el mensaje como leido 
			$leido = $funcionesMensajes::modificarLeidoMensaje($idmensaje);
			//modificamos el borradoto
			$borrado = $funcionesMensajes::modificarBorradotoMensaje($idmensaje);
		}else{
			//modificamos el borradofrom
			$borrado = $funcionesMensajes::modificarBorradofromMensaje($idmensaje);
		}

		//devolvemos la respuesta
		$respuesta = array(
			"borrado" => $borrado
		);
	}else if($accion == "marcarleido"){
		//recogemos el id del mensaje
		@$idmensaje = $array->idmensaje;
		// marcamos el mensaje como leido
		$leido = $funcionesMensajes::modificarLeidoMensaje($idmensaje);
		// enviamos la respuesta
		$respuesta = array(
			"leido" => $leido
		);
	}
	
	

	//devolvemos la respuesta en formato jason
	echo json_encode($respuesta);
?>
