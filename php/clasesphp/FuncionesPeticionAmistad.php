<?php
	require_once 'DB.php';
	require_once 'FuncionesAmigos.php';
	require_once 'Peticiones.php';

	class FuncionesPeticionAmistad
	{
		public static function nuevaPeticion($usuariofrom,$usuarioto,$mensaje)
		{
			if(FuncionesAmigos::comprobarAmistad($usuariofrom,$usuarioto) == 0){
				if(self::comprobarPeticion($usuariofrom,$usuarioto) == 0){
					$conexion = DB::connectDB();
		    		$insercion = "INSERT INTO solicitudesamistad (usuariofrom, usuarioto,mensaje) VALUES 
		    						(".$usuariofrom.",".$usuarioto.",\"".$mensaje."\")";
		    		if($conexion->exec($insercion) == 1){
		    			return 1;
		    		}
				}
				return 0;
			}

			return -1;
		}

		public static function getPeticionesUsuarioFrom($idusuario)
		{

			$conexion = DB::connectDB();
			$seleccion = "	SELECT * 
							FROM solicitudesamistad
							WHERE usuariofrom = $idusuario;";
			$consulta = $conexion->query($seleccion);
			$peticiones = [];
			while ($registro = $consulta->fetchObject()) {
				$peticiones[] = new Peticion($registro->usuariofrom,$registro->usuarioto,$registro->mensaje,$registro->aceptado,$registro->fecha);
			}
			return $peticiones;
		}

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

		public static function borrarPeticion($usuariofrom,$usuarioto)
		{
			if(self::comprobarPeticion($usuariofrom,$usuarioto) == 1){
				$conexion = DB::connectDB();
	    		$insercion = "DELETE FROM solicitudesamistad
	    						WHERE (usuariofrom = $usuariofrom AND usuarioto = $usuarioto)
	    							OR (usuariofrom = $usuarioto AND usuarioto = $usuariofrom)";
	    		if($conexion->exec($insercion) == 1){
	    			return 1;
	    		}
			}
			return 0;
		}
		/**/
		public static function modificarPeticion($usuariofrom,$usuarioto)
		{
			if(self::comprobarPeticion($usuariofrom,$usuarioto) == 1){
				$conexion = DB::connectDB();
	    		$insercion = "UPDATE solicitudesamistad
	    						SET aceptado = 1
	    						WHERE (usuariofrom = $usuariofrom AND usuarioto = $usuarioto)
	    							OR (usuariofrom = $usuarioto AND usuarioto = $usuariofrom)";
	    		if($conexion->exec($insercion) > 0){
	    			return 1;
	    		}
			}
			return 0;
		}		
	}
?>