<?php
	//permitimos el acceso externo
	header("Access-Control-Allow-Origin: * ");
	header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
	header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
	//iniciamos las sesiones
	session_start();
	//incluimos los ficheros que continen las funciones
	include 'clasesphp/FuncionesFotosVideos.php';
	include 'clasesphp/FuncionesComentarios.php';
	include 'clasesphp/FuncionesAmigos.php';
	include 'clasesphp/FuncionesUsuarios.php';
	//instanciamos las clases
	$funcionesComentarios = new FuncionesComentarios;
	$funcionesAmigos = new FuncionesAmigos;
	$funcionesFotosVideos = new FuncionesFotosVideos;
	$funcionesUsuarios = new FuncionesUsuarios;

	//convertimos a Jason los datos enviados por angular con la funcion http.post
	$json = file_get_contents('php://input');
	//convertimos ese json a objeto
	$array = json_decode($json);
	//recogemos las variable que nos indica el tipo de modificacion
	@$accion = strtolower($array->accion);

	$respuesta = array();
	if($accion == "borrararchivo"){
		@$idelemento = $array->idelemento;

		$funcionesFotosVideos::borrarArchivo($idelemento);
	}else if($accion == "getpublicacionesamigos"){
		@$idusuario = $array->idusuario;
		//obtenemos los amigos del usuairo
		$amigos = $funcionesAmigos::getAmigosUsuario($idusuario);

		for ($i=0; $i < count($amigos); $i++) {
			//obtenemos los archivos de ese amigo
			$archivos = $funcionesFotosVideos::getArchivosByIdusuario($amigos[$i]);
			//obetnemos el amigo
			$amigo = $funcionesUsuarios::getUsuarioById($amigos[$i]);

			for ($j = 0; $j < count($archivos) && $j < 10; $j++){
				$archivo = array(
					"id" => $archivos[$j]->getId(),
					"url" => $archivos[$j]->getUrl(),
					"nombre" => $archivos[$j]->getNombre(),
					"idusuario" => $archivos[$j]->getIdusuario(),
					"tipo" => $archivos[$j]->getTipo(),
					"fecha" => $archivos[$j]->getFecha(),
					"autor" =>  $amigo[0]->getNombre()." ".$amigo[0]->getApellido(),
					"apodo" =>  $amigo[0]->getApodo()
				);
				array_push($respuesta, $archivo);
			}
		}
	}
	
	

	//devolvemos la respuesta en formato jason
	echo json_encode($respuesta);
?>
