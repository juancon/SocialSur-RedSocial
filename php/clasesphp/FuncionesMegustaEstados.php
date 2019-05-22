<?php
	require_once 'DB.php';

	class FuncionesMegustaEstados
	{
		public static function nuevoMegusta($idusuario,$idelemento)
		{
			$conexion = DB::connectDB();
			if(self::comprobarMegusta($idusuario,$idelemento) == 0){
	    		$insercion = "INSERT INTO megustaestados (idusuario, idelemento) VALUES 
	    						(".$idusuario.",".$idelemento.")";
	    		if($conexion->exec($insercion) == 1){
	    			return 1;
	    		}
			}

			return 0;
		}

		public static function getNumMegustasEstado($idelemento)
		{

			$conexion = DB::connectDB();
			$seleccion = "	SELECT count(*) as megustas
							FROM megustaestados
							WHERE idelemento = $idelemento";
			$consulta = $conexion->query($seleccion);
			$registro = $consulta->fetchObject();
			return $registro->megustas;
		}

		public static function getUsuarioHanDadoMegustaEstado($idelemento)
		{

			$conexion = DB::connectDB();
			$seleccion = "	SELECT *
							FROM megustaestados
							WHERE idelemento = $idelemento";
			$consulta = $conexion->query($seleccion);
			$megustas = [];
			while ($registro = $consulta->fetchObject()) {
				$megustas[] = [$registro->idusuario,$registro->idelemento];
			}
			return $megustas;
		}

		public static function getMegustasUsuarioHaDado($idusuario)
		{

			$conexion = DB::connectDB();
			$seleccion = "	SELECT *
							FROM megustaestados
							WHERE idusuario = $idusuario";
			$consulta = $conexion->query($seleccion);
			$megustas = [];
			while ($registro = $consulta->fetchObject()) {
				$megustas[] = [$registro->idusuario,$registro->idelemento];
			}
			return $megustas;
		}

		public static function comprobarMegusta($idusuario,$idelemento)
		{

			$conexion = DB::connectDB();
			$seleccion = "	SELECT * 
							FROM megustaestados
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

		public static function borrarMegusta($idusuario,$idelemento)
		{
			$conexion = DB::connectDB();
			if(self::comprobarMegusta($idusuario,$idelemento) == 1){
	    		$insercion = "DELETE FROM megustaestados
	    						WHERE idusuario = $idusuario AND idelemento = $idelemento;";
	    		if($conexion->exec($insercion) == 1){
	    			return 1;
	    		}
			}

			return 0;
		}		
	}
?>