<?php
	//permitimos el aaceso al fichero
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, X-Requested-With');
	header('Access-Control-Allow-Methods: POST, GET, PATCH, PUT, DELETE, OPTIONS');
	//iniciamos las sesiones
	session_start();
	//incluimos el fichero que continen las funciones referentes a los archivos
	include 'clasesphp/FuncionesFotosVideos.php';
	//instanciamos la calse que contiene todas las funciones de archivos
	$funcionesFotosVideos = new FuncionesFotosVideos;


	$idusuario = $_POST['idusuario'];
	$nombre = $_POST['nombre'];
	$tipo = $_POST['tipo'];

	//ruta donde se va a subir el fichero en funcion si es un video o una foto
	if($tipo == "foto"){
		$ruta = './assets/fotos/';
	}else{
		$ruta = './assets/videos/';

	}
	$nombreFichero = $_FILES['file']['name'];
	//recogemos la extencion
	$ext = '.'.$_POST['extension'];
	$url = $ruta.md5($idusuario.$nombre).$ext;

	$respuesta = array('resultado' => 0 );
	//preguntamos si el fichero se ha recibido con exito
	if (isset($_FILES['file'])) {
		//movemos el fichero a la carpeta designada
		if (move_uploaded_file($_FILES["file"]["tmp_name"], $url)) {
			//si se ha movido lo subimos
			if($funcionesFotosVideos::subirArchivo($url,$nombre,$idusuario,$tipo) == 1){
				$respuesta = array('resultado' => 1 );
			}
		}
	}
	

	echo json_encode($respuesta);

?>