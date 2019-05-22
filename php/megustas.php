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
		//si es para obtener el numero de megustas de un elemento
		//recogemos las demas variables
		@$idelemento = $array->idelemento;
		//llamamos a la funcion del estado
		$numMegustas = $funcionesMegustaArchivos::getNumMegustasArchivo($idelemento);
		
		// añadimos el numero al array con su id de elemento
		$respuesta = array(
			"nummegustas" => $numMegustas,
			"idelemento" => $array->idelemento
		);
	}else if($accion == "darmegusta"){
		//si es para dar megusta
		//recogemos las demas variables
		@$idelemento = $array->idelemento;
		@$idusuario = $array->idusuario;

		//preguntamos si es un estado o no
		$borrar = 0;
		
		//llamamos a la funcion para dar megusta a los archivos
		$darMegusta = $funcionesMegustaArchivos::nuevoMegusta($idusuario,$idelemento);
		if($darMegusta == 0){
			$borrar = $funcionesMegustaArchivos::borrarMegusta($idusuario,$idelemento);
		}

		// añadimos el estado que ha devulto la consulta al array
		$respuesta = array(
			"dar" => $darMegusta,
			"quitar" => $borrar
		);
	}else if($accion == "comprobarmegusta"){
		//si es para dar megusta
		//recogemos las demas variables
		@$idelemento = $array->idelemento;
		@$idusuario = $array->idusuario;

		//si es un estado llamamos a la funcion del estado
		$comprobar = $funcionesMegustaArchivos::comprobarMegusta($idusuario,$idelemento);
		
		// añadimos el estado que ha devulto la consulta al array
		$respuesta = array(
			"comprobar" => $comprobar
		);
	}
	

	//devolvemos la respuesta en formato jason
	echo json_encode($respuesta);
?>
