<?php
	require_once 'DB.php';

	class FuncionesDenuncias
	{
		public static function nuevaDenuncia($idusuario,$idelemento,$idautor)
		{
			$conexion = DB::connectDB();

    		$insercion = "INSERT INTO denuncias (idusuario, idelemento,idautor) VALUES 
    						(".$idusuario.",".$idelemento.",".$idautor.")";
    		if($conexion->exec($insercion) == 1){
    			return 1;
    		}

			return 0;
		}

		public static function getDenuncias()
		{
			$denuncias = [];

			$conexion = DB::connectDB();
			$seleccion = "	SELECT *
							FROM denuncias
							ORDER BY fecha";
			$consulta = $conexion->query($seleccion);
			while ($registro = $consulta->fetchObject()) {
				$denuncias[] = array(
					"idusuario" => $registro->idusuario,
					"idelemento" => $registro->idelemento,
					"idautor" => $registro->idautor,
					"fecha" => $registro->fecha
				);
			}
			return $denuncias;	
		}

		public static function getNumDenunciasElemento($idelemento)
		{

			$conexion = DB::connectDB();
			$seleccion = "	SELECT count(*) as numdenuncias
							FROM denuncias
							WHERE idelemento = $idelemento";
			$consulta = $conexion->query($seleccion);
			$numDenuncias = [];
			while ($registro = $consulta->fetchObject()) {
				$numDenuncias[] = array(
					"numdenuncias" => $registro->numdenuncias
				);
			}
			return $numDenuncias;
		}

		public static function getNumDenunciasUsuario($idusuario)
		{

			$conexion = DB::connectDB();
			$seleccion = "	SELECT count(*) as numDenuncias
							FROM denuncias
							WHERE idusuario = $idusuario";
			$consulta = $conexion->query($seleccion);
			$numDenuncias = [];
			while ($registro = $consulta->fetchObject()) {
				$numDenuncias[] = array(
					"numdenuncias" => $registro->numdenuncias
				);
			}
			return $numDenuncias;
		}

		public static function borrarDenuncias($idelemento)
		{
			$conexion = DB::connectDB();
    		$insercion = "DELETE FROM denuncias
    						WHERE idelemento = $idelemento";
    		if($conexion->exec($insercion) == 1){
    			return 1;
    		}
			return 0;
		}
	}
?>