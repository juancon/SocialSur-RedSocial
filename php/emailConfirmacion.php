<?php
	//permitimos el acceso externo
	header("Access-Control-Allow-Origin: * ");
	header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
	header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
	
	//recogemos el correo del usuario
	$correo = $_POST['correo'];
	//su nombre y su apellido
	$nombre = $_POST['nombre'];
	$apodo = $_POST['apodo'];
	//ademas del apodo encriptado en md5
	$codigo = md5($apodo);

	//asiciomos lo elementos del mensaje
	//correo al que se mando
	$para = $correo;
	// asunto del mensaje
	$titulo    = 'SocialSur';
	//cuerpo del mensaje en html5
	$mensaje = "<html><body>";
	$mensaje .= "<p>Hola $nombre, ¡bienvenido a SocialSur!</p>";
	$mensaje .="<p>Porfavor <a href='http://ec2-3-219-24-92.compute-1.amazonaws.com/php/confirmacion.php?cod=$codigo'>pulsa en este enlace</a> para confirmar tu cuenta</p>";
	$mensaje .= "</body></html>";
	// cabecera y metadatos del mensaje
	$headers = 'From: SocialSur@no-reply.com' . "\r\n";
	$headers .= 'Reply-To: SocialSur@no-reply.com' . "\r\n";
	$headers .= "MIME-Version: 1.0\r\n";
	$headers .= "Content-Type: text/html; charset=utf-8\r\n";

	// informamos si se ha enviado o no
	if(mail($para, $titulo, $mensaje, $headers)){
		$respuesta = array('creado' => "creado" );
		echo json_encode($respuesta);
	} else {
		$respuesta = array('error' => "error" );
		echo json_encode($respuesta);
	}

?>