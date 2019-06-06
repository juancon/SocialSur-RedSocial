<?php
	require_once 'DB.php';

	class FuncionesMegustaArchivos
	{
		/**
		 * crea un nuevo megusta
		 * @param int $idusuario
		 * @param int $idelemento
		 * @return int
		*/
		public static function nuevoMegusta($idusuario,$idelemento)
		{
			$conexion = DB::connectDB();
			if(self::comprobarMegusta($idusuario,$idelemento) == 0){
	    		$insercion = "INSERT INTO megustafotosvideos (idusuario, idelemento) VALUES 
	    						(".$idusuario.",".$idelemento.")";
	    		if($conexion->exec($insercion) == 1){
	    			return 1;
	    		}
			}

			return 0;
		}

		/**
		 * obtiene los megusta de un archivo a traves de su id
		 * @param int $idelemento
		 * @return int
		*/
		public static function getNumMegustasArchivo($idelemento)
		{
			$numMegusta = 0;

			$conexion = DB::connectDB();
			$seleccion = "	SELECT count(*) as megustas
							FROM megustafotosvideos
							WHERE idelemento = $idelemento";
			$consulta = $conexion->query($seleccion);
			if($consulta != null){
				$registro = $consulta->fetchObject();
				$numMegusta = $registro->megustas;
			}
			return $numMegusta;	
		}

		/**
		 * comprueba si un usuario ha dado megusta a un archivo a traves de sus ids
		 * @param int $idusuario
		 * @param int $idelemento
		 * @return int
		*/
		public static function comprobarMegusta($idusuario,$idelemento)
		{

			$conexion = DB::connectDB();
			$seleccion = "	SELECT * 
							FROM megustafotosvideos
							WHERE idusuario = $idusuario AND idelemento = $idelemento;";
			$consulta = $conexion->query($seleccion);
			if($consulta != null){
				$CountReg = $consulta -> fetchAll();
				$TRegistros = count($CountReg);
				if( $TRegistros == 1){
					return 1;
				}
			}
			return 0;
		}

		/**
		 * Borra un megusta
		 * @param int $idusuario
		 * @param int $idelemento
		 * @return int
		*/
		public static function borrarMegusta($idusuario,$idelemento)
		{
			$conexion = DB::connectDB();
			if(self::comprobarMegusta($idusuario,$idelemento) == 1){
	    		$insercion = "DELETE FROM megustafotosvideos
	    						WHERE idusuario = $idusuario AND idelemento = $idelemento;";
	    		if($conexion->exec($insercion) == 1){
	    			return 1;
	    		}
			}

			return 0;
		}		
	}
?>