<?php
	//permitimos el acceso externo
	header("Access-Control-Allow-Origin: * ");
	header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
	header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
	//iniciamos las sesiones
	session_start();
	//incluimos el las clases necesarias y las instanciamos
	include 'clasesphp/FuncionesComentarios.php';
	include 'clasesphp/FuncionesFotosVideos.php';
	include 'clasesphp/FuncionesUsuarios.php';
	include 'clasesphp/FuncionesDenuncias.php';
	
	$funcionesComentarios = new FuncionesComentarios;
	$funcionesFotosVideos = new FuncionesFotosVideos;
	$funcionesUsuarios = new FuncionesUsuarios;
	$funcionesDenuncias = new FuncionesDenuncias;

	//convertimos a Jason los datos enviados por angular con la funcion http.post
	$json = file_get_contents('php://input');
	//convertimos ese json a objeto
	$array = json_decode($json);
	//recogemos las variable que nos indica el tipo de modificacion
	@$accion = strtolower($array->accion);


	$respuesta = array();
	if($accion == "nuevadenuncia"){
		@$idusuario = $array->idusuario;
		@$idelemento = $array->idelemento;
		@$idautor = $array->idautor;
		
		//creamos la denuncia
		$var = $funcionesDenuncias::nuevaDenuncia($idusuario,$idelemento,$idautor);

		array_push($respuesta, $var);
		
	}else if($accion == "borrardenuncia"){
		@$idelemento = $array->idelemento;

		//borramos la denuncia
		$funcionesDenuncias::borrarDenuncias($idelemento);
	}else if($accion == "obtenerdenuncias"){
		//obtenemos la lista de denuncias
		$denunciasRaw = $funcionesDenuncias::getDenuncias();

		//recorremos el array de denuncias
		for($i = 0; $i < count($denunciasRaw); $i++){
			//comprobamos si la denuncia se repite
			$repetido = false;
			for($j = count($denunciasRaw)-1 ; $j >  $i; $j--){
				if($denunciasRaw[$i]["idelemento"] == $denunciasRaw[$j]["idelemento"]){
					$repetido =true;
				}
			}

			if(!$repetido){
				//obtenemos los ids
				$idusuario = $denunciasRaw[$i]["idusuario"];
				$idelemento = $denunciasRaw[$i]["idelemento"];
				$idautor = $denunciasRaw[$i]["idautor"];
				//obtenemos el usuario que ha realizado la denuncia
				$usuario = $funcionesUsuarios::getUsuarioById($idusuario);
				//obtenemos el elemento sobre el que se ha realizado la denuncia
				$archivo = $funcionesFotosVideos::getArchivosById($idelemento);
				//obtenemos los comentarios del archivo
				$comentarios = $funcionesComentarios::getComentariosArchivo($idelemento);

				//creamos una variable en formato array de los comentarios
				$arrayComentraios = [];
				for ($j=0; $j < count($comentarios); $j++) {
					//buscamos el nombre del usuario que ha realizado el comentario
					$nombre = $funcionesUsuarios::getUsuarioById($comentarios[$j]->getIdusuario());

					//lo añadimos a un array
					$comentario = array(
						"id" => $comentarios[$j]->getId(),
						"idusuario" => $comentarios[$j]->getIdusuario(),
						"idelemento" => $comentarios[$j]->getIdelemento(),
						"comentario" => $comentarios[$j]->getComentario(),
						"fecha" => $comentarios[$j]->getFecha(),
						"nombre" => $nombre[0]->getNombre()." ".$nombre[0]->getApellido()
					);
					//lo añadimos al array de comentarios
					array_push($arrayComentraios, $comentario);
				}

				//obtenemos el usuario que ha publicado el elemento
				$autor = $funcionesUsuarios::getUsuarioById($idautor);

				//obtenemos el numero de denuncias que ha recibido el elemento
				$numDenuncias = $funcionesDenuncias::getNumDenunciasElemento($idelemento);
				//lo añadimos al array de respuesta
				$respuesta[] = array(
					"idusuario" => $idusuario,
					"usuario" => array(
						"id" => $usuario[0]->getId(),
						"nombre" => $usuario[0]->getNombre(),
						"apellido" => $usuario[0]->getApellido(),
						"apodo" => $usuario[0]->getApodo(),
						"email" => $usuario[0]->getPassword(),
						"bio" => $usuario[0]->getBio(),
						"avatar" => $usuario[0]->getAvatar()
					),
					"idelemento" => $idelemento,
					"elemento" => array(
						"id" => $archivo[0]->getId(),
						"url" => $archivo[0]->getUrl(),
						"nombre" => $archivo[0]->getNombre(),
						"idusuario" => $archivo[0]->getIdusuario(),
						"tipo" => $archivo[0]->getTipo(),
						"fecha" => $archivo[0]->getFecha()
					),
					"comentarios" => $arrayComentraios,
					"idautor" => $idautor,
					"autor" => array(
						"id" => $autor[0]->getId(),
						"nombre" => $autor[0]->getNombre(),
						"apellido" => $autor[0]->getApellido(),
						"apodo" => $autor[0]->getApodo(),
						"email" => $autor[0]->getPassword(),
						"bio" => $autor[0]->getBio(),
						"avatar" => $autor[0]->getAvatar()
					),
					"numdenuncias" => $numDenuncias,
					"fecha" => $denunciasRaw[$i]["fecha"]
				);

			}
		}

	}
	
	

	//devolvemos la respuesta en formato jason
	echo json_encode($respuesta);
?>
