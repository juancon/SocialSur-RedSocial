<?php
	//permitimos el acceso externo
	header("Access-Control-Allow-Origin: * ");
	header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
	header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
	//iniciamos las sesiones
	session_start();
	//incluimos el fichero que continen las funciones referentes a los comentarios y los usuarios
	include 'clasesphp/FuncionesComentarios.php';
	include 'clasesphp/FuncionesUsuarios.php';
	//instanciamos la clase que contiene todas las funciones de los comentarios y los usuario
	$funcionesComentarios = new FuncionesComentarios;
	$funcionesUsuarios = new FuncionesUsuarios;

	//convertimos a Jason los datos enviados por angular con la funcion http.post
	$json = file_get_contents('php://input');
	//convertimos ese json a objeto
	$array = json_decode($json);
	//recogemos las variable basicas necearias
	@$accion = $array->accion;

	
	$respuesta = array();

	if($accion == "nuevocomentario"){
		//recogemos las variables necesarias par realizar la accion
		$idusuario = $array->idusuario;
		$idelemento = $array->idelemento;
		$comentario = $array->comentario;

		//enviamos el mensaje
		$funcionesComentarios::crearComentario($idusuario,$idelemento,$comentario);


	}else if($accion == "obtenercomentarios"){
		//recogemos las demas variables
		@$idelemento = $array->idelemento;
		//obtenemos los comentarios del archivo
		$comentarios = $funcionesComentarios::getComentariosArchivo($idelemento);
		//recorremos el array
		for ($i=0; $i < count($comentarios); $i++) {
			//buscamos el nombre del usuario que ha realizado el comentario
			$nombre = $funcionesUsuarios::getUsuarioById($comentarios[$i]->getIdusuario());

			//lo añadimos a un array
			$comentario = array(
				"id" => $comentarios[$i]->getId(),
				"idusuario" => $comentarios[$i]->getIdusuario(),
				"idelemento" => $comentarios[$i]->getIdelemento(),
				"comentario" => $comentarios[$i]->getComentario(),
				"fecha" => $comentarios[$i]->getFecha(),
				"nombre" => $nombre[0]->getNombre()." ".$nombre[0]->getApellido()
			);
			//lo añadimos al array de respuesta
			array_push($respuesta, $comentario);
		}	
	}
	
	

	//devolvemos la respuesta en formato jason
	echo json_encode($respuesta);
?>
