<?php
	//permitimos el acceso externo
	header("Access-Control-Allow-Origin: * ");
	header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
	header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
	//iniciamos las sesiones
	session_start();
	//incluimos los ficheros que continen las funciones referentes a los megustas de los archivos
	include 'clasesphp/FuncionesMegustaArchivos.php';

	//instanciamos las clases que contiene todas las funciones de los megusta
	$funcionesMegustaArchivos = new FuncionesMegustaArchivos;
	

	//convertimos a Jason los datos enviados por angular con la funcion http.post
	$json = file_get_contents('php://input');
	//convertimos ese json a objeto
	$array = json_decode($json);
	//recogemos la accion a realizar
	@$accion = $array->accion;

	$respuesta = array();
	if($accion == "obtenermegustas"){
		//recogemos el id del elemento
		@$idelemento = $array->idelemento;
		//llamamos a la funcion para obtener los me gustas
		$numMegustas = $funcionesMegustaArchivos::getNumMegustasArchivo($idelemento);

		// añadimos el numero al array con su id de elemento
		$respuesta = array(
			"nummegustas" => $numMegustas,
			"idelemento" => $array->idelemento
		);
	}else if($accion == "darmegusta"){
		//recogemos la id la publicacion y del usuario
		@$idelemento = $array->idelemento;
		@$idusuario = $array->idusuario;

		//creamos una variable para indicar si se ha borrado
		$borrar = 0;

		//llamamos a la funcion para dar megusta a los archivos
		$darMegusta = $funcionesMegustaArchivos::nuevoMegusta($idusuario,$idelemento);
		if($darMegusta == 0){
			// si el megusta existe lo borramos
			$borrar = $funcionesMegustaArchivos::borrarMegusta($idusuario,$idelemento);
		}

		// añadimos el estado que ha devulto la consulta al array
		$respuesta = array(
			"dar" => $darMegusta,
			"quitar" => $borrar
		);
	}else if($accion == "comprobarmegusta"){
		//recogemos el id del elemento y del usuario
		@$idelemento = $array->idelemento;
		@$idusuario = $array->idusuario;

		//comprobamos si se ha dado megusta
		$comprobar = $funcionesMegustaArchivos::comprobarMegusta($idusuario,$idelemento);

		// añadimos el estado que ha devulto la consulta al array
		$respuesta = array(
			"comprobar" => $comprobar
		);
	}
	

	//devolvemos la respuesta en formato jason
	echo json_encode($respuesta);
?>
