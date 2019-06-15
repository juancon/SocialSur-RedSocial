<?php
	//permitimos el aaceso al fichero
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, X-Requested-With');
	header('Access-Control-Allow-Methods: POST, GET, PATCH, PUT, DELETE, OPTIONS');
	//iniciamos las sesiones
	session_start();
	//incluimos el fichero que continen las funciones referentes a los archivos
	include 'clasesphp/FuncionesFotosVideos.php';
	include 'clasesphp/FuncionesMensajes.php';
	include 'clasesphp/FuncionesAmigos.php';
	include 'clasesphp/FuncionesUsuarios.php';
	//instanciamos la calse que contiene todas las funciones de archivos
	$funcionesFotosVideos = new FuncionesFotosVideos;
	$funcionesMensajes = new FuncionesMensajes;
	$funcionesAmigos = new FuncionesAmigos;
	$funcionesUsuarios = new FuncionesUsuarios;


	// recogemos el usuario que ha subido el archivo
	$idusuario = $_POST['idusuario'];
	//el nombre de la publicacion
	$nombre = $_POST['nombre'];
	// el tipo
	$tipo = $_POST['tipo'];


	//ruta donde se va a subir el fichero en funcion si es un video o una foto
	if($tipo == "foto"){
		$ruta = '../assets/fotos/';
	}else{
		$ruta = '../assets/videos/';

	}
	//recogemos la extencion
	$ext = '.'.$_POST['extension'];
	//generamos un numero aleatorio entre 1 y 999999
	$aleatorio =rand(1,999999);
	$url = $ruta.md5($idusuario."-".$nombre."-".$aleatorio).$ext;

	$respuesta = array('resultado' => 0 );
	//preguntamos si el fichero se ha recibido con exito
	if (isset($_FILES['file'])) {
		//movemos el fichero a la carpeta designada
		if (move_uploaded_file($_FILES["file"]["tmp_name"], $url)) {
			//si se ha movido lo subimos
			if($funcionesFotosVideos::subirArchivo($url,$nombre,$idusuario,$tipo) == 1){
				//recogemos las menciones de la publicación si las hay
				if($_POST['menciones'] != ""){
					//recogemos las menciones
					$menciones  = $_POST['menciones'];
					
					//obtenemos la publicacion que acabamos de subir
					$publicacion = $funcionesFotosVideos::getArchivosByRuta($url);
					//obtenemos el usuario
					$usuario = $funcionesUsuarios::getUsuarioById($idusuario);
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
						if(strrpos($menciones, $aux[$i]["apodo"]) !== false){
							$mensaje = "<a href='/usuario?apodo=".$usuario[0]->getApodo()."'>".$usuario[0]->getNombre()." ".$usuario[0]->getApellido()."</a> te ha etiquetado en su última <a href='/usuario?apodo=".$usuario[0]->getApodo()."&ref=".$publicacion[0]->getId()."'>publicación</a>";

							//enviamos un mensaje al usuario del apado informandolo de que ha sido tagueado
							$funcionesMensajes::crearMensaje(0,$aux[$i]["id"],$mensaje);
						}
					}
				}

				$respuesta = array('resultado' => 1 );

			}
		}
	}
	

	echo json_encode($respuesta);

?>