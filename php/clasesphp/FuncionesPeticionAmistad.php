<?php
	require_once 'DB.php';
	require_once 'FuncionesAmigos.php';
	require_once 'Peticiones.php';

	class FuncionesPeticionAmistad
	{
		/**
		 * crea una nueva peticion de amistad
		 * @param int $usuariofrom
		 * @param int $usuarioto
		 * @param string $mensaje
		 * @return int
		*/
		public static function nuevaPeticion($usuariofrom,$usuarioto,$mensaje)
		{
				$conexion = DB::connectDB();
	    		$insercion = "INSERT INTO solicitudesamistad (usuariofrom, usuarioto,mensaje) VALUES 
	    						(".$usuariofrom.",".$usuarioto.",\"".$mensaje."\")";
	    		if($conexion->exec($insercion) == 1){
	    			return 1;
	    		}

				return 0;
		}

		/**
		 * obtiene las peticiones que ha recibido un usuario
		 * @param int $idusuario
		 * @return array
		*/
		public static function getPeticionesUsuarioTo($idusuario)
		{

			$conexion = DB::connectDB();
			$seleccion = "	SELECT * 
							FROM solicitudesamistad
							WHERE usuarioto = $idusuario;";
			$consulta = $conexion->query($seleccion);
			$peticiones = [];
			while ($registro = $consulta->fetchObject()) {
				$peticiones[] = new Peticion($registro->usuariofrom,$registro->usuarioto,$registro->mensaje,$registro->aceptado,$registro->fecha);
			}
			return $peticiones;
		}

		/**
		 * obtiene las peticiones no aceptadas que ha recibido un usuario
		 * @param int $idusuario
		 * @return array
		*/
		public static function getPeticionesUsuarioToNoAceptadas($idusuario)
		{

			$conexion = DB::connectDB();
			$seleccion = "	SELECT * 
							FROM solicitudesamistad
							WHERE usuarioto = $idusuario AND aceptado = 0 ;";
			$consulta = $conexion->query($seleccion);
			$peticiones = [];
			while ($registro = $consulta->fetchObject()) {
				$peticiones[] = new Peticion($registro->usuariofrom,$registro->usuarioto,$registro->mensaje,$registro->aceptado,$registro->fecha);
			}
			return $peticiones;
		}

		/**
		 * comprueba si hay una peticion de amistad entre dos usuarios
		 * @param int $idusuario1
		 * @param int $idusuario2
		 * @return int
		*/
		public static function comprobarPeticion($idusuario1,$idusuario2)
		{

			$conexion = DB::connectDB();
			$seleccion = "	SELECT * 
							FROM solicitudesamistad
							WHERE (usuariofrom = $idusuario1 AND usuarioto = $idusuario2)
								OR (usuariofrom = $idusuario2 AND usuarioto = $idusuario1) ;";
			$consulta = $conexion->query($seleccion);
			$CountReg = $consulta -> fetchAll();
			$TRegistros = count($CountReg);
			if( $TRegistros == 1){
				return 1;
			}
			return 0;
		}

		/**
		 * borra una peticion de amistad entre dos usuarios
		 * @param int $usuariofrom
		 * @param int $usuarioto
		 * @return int
		*/
		public static function borrarPeticion($usuariofrom,$usuarioto)
		{
			
			$conexion = DB::connectDB();
    		$insercion = "DELETE FROM solicitudesamistad
    						WHERE (usuariofrom = $usuariofrom AND usuarioto = $usuarioto)
    							OR (usuariofrom = $usuarioto AND usuarioto = $usuariofrom)";
    		if($conexion->exec($insercion) == 1){
    			return 1;
    		}
			return 0;
		}
	}
?>