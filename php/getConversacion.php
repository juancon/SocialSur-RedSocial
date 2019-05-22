<?php
	//permitimos el acceso externo
	header("Access-Control-Allow-Origin: * ");
	header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
	header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
	//iniciamos las sesiones
	session_start();
	//incluimos el fichero que continen las funciones referentes al chat
	include 'clasesphp/FuncionesChat.php';
	//instanciamos la clase que contiene todas las funciones del chat
	$funcionesChat = new FuncionesChat;

	//convertimos a Jason los datos enviados por angular con la funcion http.post
	$json = file_get_contents('php://input');
	//convertimos ese json a objeto
	$array = json_decode($json);
	//recogemos las variable que nos indica el tipo de modificacion
	@$id = strtolower($array->id);
	@$accion = $array->accion;
	$respuesta = array();

	//preguntamos la accion
	if($accion =="getconversaciones"){
		//obetnemos todas las conversacion que van el usuario
		$conversaciones = $funcionesChat::getChatUserSinLeer($id);
		//preguntamos si hay conversaciones
		if(count($conversaciones) == 0){
			//indicamos que no hay mensajes
			$repuesta = array(
				"vacio" => "No hay mensajes"
			);
		}else{
			//recogemos el array
			for ($i=0; $i < count($conversaciones); $i++) {
				//obtenemos los datos de la conversacion
				$aux = $conversaciones[$i];
				//lo añadimos a un array
				$amigo = array(
					"iduserfrom" => $aux["iduserfrom"],
					"iduserto" => $aux["iduserto"],
					"mensaje" => $aux["mensaje"],
					"leido" => $aux['leido'],
					"fecha" => $aux["fecha"]
				);
				//lo añadimos al array de respuesta
				array_push($respuesta, $amigo);
			}
		}

	}else if($accion == "getconversacion"){
		//recogemos las demas variables
		@$idAmigo = strtolower($array->idAmigo);
		
		//obtenemos las conversaciones de esas ids
		$conversaciones = $funcionesChat::getConversacion($id,$idAmigo);
		//preguntamos si hay conversaciones
		if(count($conversaciones) == 0){
			//indicamos que no hay mensajes
			$repuesta = array(
				"vacio" => "No hay mensajes"
			);
		}else{
			//recogemos el array
			for ($i=0; $i < count($conversaciones); $i++) {
				//obtenemos los datos de la conversacion
				$aux = $conversaciones[$i];
				//lo añadimos a un array
				$amigo = array(
					"iduserfrom" => $aux["iduserfrom"],
					"iduserto" => $aux["iduserto"],
					"mensaje" => $aux["mensaje"],
					"fecha" => $aux["fecha"]
				);
				//lo añadimos al array de respuesta
				array_push($respuesta, $amigo);
			}
		}
	}else if($accion == "marcarleido"){
		//recogemos las demas variables
		@$idAmigo = strtolower($array->idAmigo);
		//marcamos las conversaciones como leidas
		$conversaciones = $funcionesChat::marcarLeido($idAmigo,$id);

	}
	
	

	//devolvemos la respuesta en formato jason
	echo json_encode($respuesta);
?>
