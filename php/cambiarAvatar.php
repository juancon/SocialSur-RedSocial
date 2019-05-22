<?php
	//permitimos el aaceso al fichero
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, X-Requested-With');
	header('Access-Control-Allow-Methods: POST, GET, PATCH, PUT, DELETE, OPTIONS');
	//iniciamos las sesiones
	session_start();
	//incluimos el fichero que continen las funciones referentes a los usuarios
	include 'clasesphp/FuncionesUsuarios.php';
	//instanciamos la calse que contiene todas las funciones de usuario
	$funciones = new FuncionesUsuarios;

	

	$respuesta = array('error' => "error" );;
	$id = $_POST['id'];
	$tipo = $_POST['tipo'];
	if($tipo == "avatar"){
		//ruta donde se va a subir el fichero
		$ruta = './assets/img/avatar/';
		$nombre = $_FILES['file']['name'];
		//recogemos la extencion
		$ext = '.'.pathinfo($nombre, PATHINFO_EXTENSION);
		$nombre = $id.$ext;
		$rutaCompleta = $ruta.$nombre;
		//preguntamos si podemos escribir n la ruta
		if (isset($_FILES['file'])) {
			if (move_uploaded_file($_FILES['file']['tmp_name'], $rutaCompleta)) {
				if($funciones::modificarAvatarUsuario($id,$rutaCompleta) == 1){
					$respuesta = array('avatar' => $rutaCompleta );
				}

			}
		}
	}
	

	echo json_encode($respuesta);

?>