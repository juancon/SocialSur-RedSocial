<?php
	require_once 'DB.php';
	require_once 'Mensajes.php';

	class FuncionesMensajes
	{
		/**
		 * crea un nuevo mensaje
		 * @param int $idusuariofrom
		 * @param int $idusuarioto
		 * @param string $mensaje
		 * @return int
		*/
		public static function crearMensaje($idusuariofrom,$idusuarioto,$mensaje)
		{
			$conexion = DB::connectDB();
    		$insercion = "INSERT INTO mensajes (idusuariofrom, idusuarioto, mensaje) VALUES 
    						(".$idusuariofrom.",".$idusuarioto.", \"".$mensaje."\")";
    		if($conexion->exec($insercion) == 1){
    			return 1;
    		}else{
    			return 0;
    		}
		}

		/**
		 * obtiene los mensajes que ha recibido y enviado un usuario por su id
		 * @param int $idusuario
		 * @return array
		*/
		public static function getMensajesEnviadosRecibidos($idusuario)
		{
			$conexion = DB::connectDB();
			$seleccion = "	SELECT * 
							FROM mensajes
							WHERE idusuariofrom = $idusuario OR idusuarioto = $idusuario
							ORDER BY fecha DESC;
							";
			$consulta = $conexion->query($seleccion);
			$mensajes = [];
			while ($registro = $consulta->fetchObject()) {
				$mensajes[] = new Mensaje($registro->id,$registro->idusuariofrom,$registro->idusuarioto,$registro->mensaje,$registro->leido,$registro->borradofrom,$registro->borradoto,$registro->fecha);
			}
			return $mensajes;
		}
		
		/**
		 * obtiene los un mensaje por id
		 * @param int $id
		 * @return array
		*/
		public static function getMensajesbyId($id)
		{
			$conexion = DB::connectDB();
			$seleccion = "	SELECT * 
							FROM mensajes
							WHERE id = $id
							ORDER BY fecha;
							";
			$consulta = $conexion->query($seleccion);
			$mensajes = [];
			while ($registro = $consulta->fetchObject()) {
				$mensajes[] = new Mensaje($registro->id,$registro->idusuariofrom,$registro->idusuarioto,$registro->mensaje,$registro->leido,$registro->borradofrom,$registro->borradoto,$registro->fecha);
			}
			return $mensajes;
		}

		/**
		 * obtiene los mensajes no leidos de un usuario por id
		 * @param int $idusuarioto
		 * @return array
		*/
		public static function getMensajesNoLeidosbyUsuarioTo($idusuarioto)
		{
			$conexion = DB::connectDB();
			$seleccion = "	SELECT * 
							FROM mensajes
							WHERE idusuarioto = $idusuarioto AND leido = 0
							ORDER BY fecha;
							";
			$consulta = $conexion->query($seleccion);
			$mensajes = [];
			while ($registro = $consulta->fetchObject()) {
				$mensajes[] = new Mensaje($registro->id,$registro->idusuariofrom,$registro->idusuarioto,$registro->mensaje,$registro->leido,$registro->borradofrom,$registro->borradoto,$registro->fecha);
			}
			return $mensajes;
		}

		/**
		 * modifica el estado de leido del mensaje por su id id
		 * @param int $id
		 * @return int
		*/
		public static function modificarLeidoMensaje($id)
		{
			$conexion = DB::connectDB();
    		$insercion = "UPDATE mensajes
    						SET leido = 1
    						WHERE id = $id";
    		if($conexion->exec($insercion) == 1){
    			return 1;
    		}else{
    			return 0;
    		}
		}

		/**
		 * modifica el estado de borrado para el usuario que ha enviado el mensaje a traves de la id del usuario
		 * @param int $id
		 * @return int
		*/
		public static function modificarBorradofromMensaje($id)
		{
			$conexion = DB::connectDB();
    		$insercion = "UPDATE mensajes
    						SET borradofrom = 1
    						WHERE id = $id";
    		if($conexion->exec($insercion) == 1){
    			return 1;
    		}else{
    			return 0;
    		}
				
		}

		/**
		 * modifica el estado de borrado para el usuario que ha recibido el mensaje a traves de la id del usuario
		 * @param int $id
		 * @return int
		*/
		public static function modificarBorradotoMensaje($id)
		{
			$conexion = DB::connectDB();
    		$insercion = "UPDATE mensajes
    						SET borradoto= 1
    						WHERE id = $id";
    		if($conexion->exec($insercion) == 1){
    			return 1;
    		}else{
    			return 0;
    		}
				
		}
	}
?>