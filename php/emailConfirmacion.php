<?php
	//permitimos el acceso externo
	header("Access-Control-Allow-Origin: * ");
	header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
	header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
	
	$correo = $_POST['correo'];
	$nombre = $_POST['nombre'];
	$apodo = $_POST['apodo'];
	$codigo = md5($apodo);


	$para = $correo;
	$titulo    = 'SocialSur';

	$mensaje = "<html><body>";
	$mensaje .= "<p>Hola $nombre, ¡bienvenido a SocialSur!</p>";
	$mensaje .="<p>Porfavor <a href='http://ec2-3-85-15-40.compute-1.amazonaws.com/php/confirmacion.php?cod=$codigo'>pulsa en este enlace</a> para confirmar tu cuenta</p>";
	$mensaje .= "</body></html>";

	$headers = 'From: SocialSur@no-reply.com' . "\r\n";
	$headers .= 'Reply-To: SocialSur@no-reply.com' . "\r\n";
	$headers .= "MIME-Version: 1.0\r\n";
	$headers .= "Content-Type: text/html; charset=utf-8\r\n";


	if(mail($para, $titulo, $mensaje, $headers)){
		$respuesta = array('creado' => "creado" );
		echo json_encode($respuesta);
	} else {
		$respuesta = array('error' => "error" );
		echo json_encode($respuesta);
	}

?>