<?php
	require_once 'DB.php';

	class FuncionesAmigos
	{
		/**
		 * crea una nueva amistad
		 * @param int $usuario1
		 * @param int $usuario2
		 * @return int
		*/
		public static function nuevoAmigo($usuario1,$usuario2)
		{
			$conexion = DB::connectDB();
			if(self::comprobarAmistad($usuario1,$usuario2) == 0){
	    		$insercion = "INSERT INTO amigos (usuario1, usuario2) VALUES 
	    						(".$usuario1.",".$usuario2.")";
	    		if($conexion->exec($insercion) == 1){
	    			return 1;
	    		}
			}

			return 0;
		}

		/**
		 * obtiene los amigos de un usuario
		 * @param int $usuario
		 * @return array
		*/
		public static function getAmigosUsuario($idusuario)
		{

			$conexion = DB::connectDB();
			$seleccion = "	SELECT * 
							FROM amigos
							WHERE usuario1 = $idusuario OR usuario2 = $idusuario;";
			$consulta = $conexion->query($seleccion);
			$amigos = [];
			while ($registro = $consulta->fetchObject()) {
				if($registro->usuario1 == $idusuario){
					$amigos[] = $registro->usuario2;
				}else{
					$amigos[] = $registro->usuario1;
				}
			}
			return $amigos;
		}

		/**
		 * comprueba la amistad entre dos usuarios
		 * @param int $usuario1
		 * @param int $usuario2
		 * @return int
		*/
		public static function comprobarAmistad($idusuario1,$idusuario2)
		{

			$conexion = DB::connectDB();
			$seleccion = "	SELECT * 
							FROM amigos
							WHERE (usuario1 = $idusuario1 AND usuario2 = $idusuario2)
								OR (usuario1 = $idusuario2 AND usuario2 = $idusuario1) ;";
			$consulta = $conexion->query($seleccion);
			$CountReg = $consulta -> fetchAll();
			$TRegistros = count($CountReg);
			if( $TRegistros == 1){
				return 1;
			}
			return 0;
		}

		/**
		 * borra la amistad entre dos usuarios
		 * @param int $usuario1
		 * @param int $usuario2
		 * @return int
		*/
		public static function borrarAmigo($idusuario1,$idusuario2)
		{
			$conexion = DB::connectDB();
			if(self::comprobarAmistad($idusuario1,$idusuario2) == 1){
	    		$borrar = "DELETE FROM amigos
	    						WHERE  (usuario1 = $idusuario1 AND usuario2 = $idusuario2)
								OR (usuario1 = $idusuario2 AND usuario2 = $idusuario1);";
	    		if($conexion->exec($borrar) == 1){
	    			return 1;
	    		}
			}

			return 0;
		}		
	}
?>