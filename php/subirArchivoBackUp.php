<?php
	//permitimos el aaceso al fichero
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Headers: X-Requested-With');
	header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
	//ruta donde se va a subir el fichero
	$ruta = './img/';

	if (isset($_FILES['file'])) {
	    //recogemos el fichero
	    $nombre = $_FILES['file']['name'];
	    //recogemos la extencion
	    $ext = '.'.pathinfo($nombre, PATHINFO_EXTENSION);
	    //
	    $nombre = md5($_FILES['file']['tmp_name']).$ext;
	    $rutacompleta = $ruta.$nombre;
	    //preguntamos si podemos escribir n la ruta
	    if (!is_writable($ruta)) {
	        echo json_encode(array(
	            'status' => false,
	            'msg'    => 'Destination directory not writable.'
	        ));
	        exit;
	    }
	    //movemos el fichero
	    if (move_uploaded_file($_FILES['file']['tmp_name'], $rutacompleta)) {
	        //si funciona
	            echo json_encode(array(
	                'status' => true,
	                'generatedName' => $nombre
	            ));
	            
	    }else{
	        //si no
	            echo json_encode(array(
	                'status' => false,
	                'generatedName' => $nombre
	            ));

	        }
	        
	}else{
	    echo json_encode(
	        array('status' => false, 'msg' => 'No file uploaded.')
	    );
	    exit;
	}
?>