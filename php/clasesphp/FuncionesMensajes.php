<?php
	require_once 'DB.php';
	require_once 'Mensajes.php';

	class FuncionesMensajes
	{
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

		public static function getMensajes()
		{

			$conexion = DB::connectDB();
			$seleccion = "	SELECT * 
							FROM mensajes
							ORDER BY fecha;";
			$consulta = $conexion->query($seleccion);
			$mensajes = [];
			while ($registro = $consulta->fetchObject()) {
				$mensajes[] = new Mensaje($registro->id,$registro->idusuariofrom,$registro->idusuarioto,$registro->mensaje,$registro->leido,$registro->borradofrom,$registro->borradoto,$registro->fecha);
			}
			return $mensajes;
		}

		public static function getMensajesbyIdusuarioFrom($idusuariofrom)
		{
			$conexion = DB::connectDB();
			$seleccion = "	SELECT * 
							FROM mensajes
							WHERE idusuariofrom = $idusuariofrom
							ORDER BY fecha;
							";
			$consulta = $conexion->query($seleccion);
			$mensajes = [];
			while ($registro = $consulta->fetchObject()) {
				$mensajes[] = new Mensaje($registro->id,$registro->idusuariofrom,$registro->idusuarioto,$registro->mensaje,$registro->leido,$registro->borradofrom,$registro->borradoto,$registro->fecha);
			}
			return $mensajes;
		}

		public static function getMensajesbyIdusuarioTo($idusuarioto)
		{
			$conexion = DB::connectDB();
			$seleccion = "	SELECT * 
							FROM mensajes
							WHERE idusuarioto = $idusuarioto
							ORDER BY fecha DESC;
							";
			$consulta = $conexion->query($seleccion);
			$mensajes = [];
			while ($registro = $consulta->fetchObject()) {
				$mensajes[] = new Mensaje($registro->id,$registro->idusuariofrom,$registro->idusuarioto,$registro->mensaje,$registro->leido,$registro->borradofrom,$registro->borradoto,$registro->fecha);
			}
			return $mensajes;
		}

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

		public static function borrarMensaje($id)
		{
			$conexion = DB::connectDB();
    		$insercion = "DELETE FROM mensajes
    						WHERE id = $id;";
    		if($conexion->exec($insercion) == 1){
    			return 1;
    		}else{
    			return 0;
    		}
		}

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