<?php
	//permitimos el acceso externo
	header("Access-Control-Allow-Origin: * ");
	header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
	header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
	//iniciamos las sesiones
	session_start();
	//incluimos el fichero que continen las funciones referentes a los comentarios y los usuarios
	include 'clasesphp/FuncionesMensajes.php';
	include 'clasesphp/FuncionesComentarios.php';
	include 'clasesphp/FuncionesFotosVideos.php';
	include 'clasesphp/FuncionesAmigos.php';
	include 'clasesphp/FuncionesUsuarios.php';
	//instanciamos la clase que contiene todas las funciones de los comentarios y los usuario
	$funcionesComentarios = new FuncionesComentarios;
	$funcionesMensajes = new FuncionesMensajes;
	$funcionesAmigos = new FuncionesAmigos;
	$funcionesFotosVideos = new FuncionesFotosVideos;
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

		//obtenemos el usuario
		$usuario = $funcionesUsuarios::getUsuarioById($idusuario);
		//obtenemos el archivo
		$archivo = $funcionesFotosVideos::getArchivosById($idelemento);
		//obtenemos el usuario que ha subido la pulicacion
		$autor = $funcionesUsuarios::getUsuarioById($archivo[0]->getIdusuario());

		//comprobamos si el usuario ha tagueado a un amigo
		//obtenemos los amigos del usuario
		$amigos = $funcionesAmigos::getAmigosUsuario($idusuario);
		$aux = array();
		for ($i=0; $i < count($amigos); $i++) {
			//obtenemos los datos del amigo por su id
			$friend = $funcionesUsuarios::getUsuarioById($amigos[$i]);
			//lo añadimos a un array
			$amigo = array(
				"id" => $friend[0]->getId(),
				"nombre" => $friend[0]->getNombre(),
				"apellido" => $friend[0]->getApellido(),
				"apodo" => $friend[0]->getApodo(),
				"email" => $friend[0]->getPassword(),
				"bio" => $friend[0]->getBio(),
				"avatar" => $friend[0]->getAvatar(),
				"conectado" => $friend[0]->getConectado()
			);
			//lo añadimos a un array auxiliar
			array_push($aux, $amigo);
		}
		//recorremos el array auxiliar
		for($i = 0; $i < count($aux) ;$i++){
			//preguntamos si el apodo del amigo se encontro en el mensaje
			if(strrpos($comentario." ", $aux[$i]["apodo"]." ") !== false){
				//creamos el mensaje de aviso
				//$mensaje = $usuario[0]->getNombre()." ".$usuario[0]->getApellido()." te ha mencionado en su <a href='/usuario?apodo=@juan' >comentario</a> en la publicación ".$archivo[0]->getNombre()." subida por ".$autor[0]->getNombre()." ".$autor[0]->getApellido().".";

				//preguntamos si el autor de la publicacion es el mismo que el que va a recibir el mensaje
				if($autor[0]->getId() == $aux[$i]["id"]){
					$mensaje = "<a href='/usuario?apodo=".$usuario[0]->getApodo()."'>".$usuario[0]->getNombre()." ".$usuario[0]->getApellido()."</a> te ha mencionado en su último <a href='/?ref=".$archivo[0]->getId()."'>comentario</a>";
				}else{
					//de lo contrario enviamos el siguiente mensaje
					$mensaje = "<a href='/usuario?apodo=".$usuario[0]->getApodo()."'>".$usuario[0]->getNombre()." ".$usuario[0]->getApellido()."</a> te ha mencionado en su último <a href='/usuario?apodo=".$autor[0]->getApodo()."&ref=".$archivo[0]->getId()."'>comentario</a>";

				}

				//enviamos un mensaje al usuario del apado informandolo de que ha sido tagueado
				$funcionesMensajes::crearMensaje(0,$aux[$i]["id"],$mensaje);
			}
		}


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
	}else if($accion == "borrarcomentario"){
		//recogemos las demas variables
		@$idcomentario = $array->idcomentario;
		//borramos el comentario
		$comentarios = $funcionesComentarios::borrarComentario($idcomentario);
	}else if($accion == "borrarcomentarios"){
		//recogemos las demas variables
		@$idelemento = $array->idelemento;
		//borramos el comentario
		$comentarios = $funcionesComentarios::borrarComentarios($idelemento);
	}
	
	

	//devolvemos la respuesta en formato jason
	echo json_encode($respuesta);
?>
