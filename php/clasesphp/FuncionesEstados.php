<?php
	require_once 'DB.php';
	require_once 'Estados.php';

	class FuncionesEstados
	{
		public static function crearEstado($idusuario,$mensaje)
		{
			$conexion = DB::connectDB();
    		$insercion = "INSERT INTO estado (idusuario, mensaje) VALUES 
    						(".$idusuario.", \"".$mensaje."\")";
    		if($conexion->exec($insercion) == 1){
    			return 1;
    		}else{
    			return 0;
    		}
		}

		public static function getEstados()
		{

			$conexion = DB::connectDB();
			$seleccion = "	SELECT * 
							FROM estado
							ORDER BY fecha;";
			$consulta = $conexion->query($seleccion);
			$estados = [];
			while ($registro = $consulta->fetchObject()) {
				$estados[] = new Estado($registro->id,$registro->idusuario,$registro->mensaje,$registro->fecha);
			}
			return $estados;
		}

		public static function getEstadosbyIdusuario($idusuario)
		{
			$conexion = DB::connectDB();
			$seleccion = "	SELECT * 
							FROM estado
							WHERE idusuario = $idusuario
							ORDER BY fecha desc;
							";
			$consulta = $conexion->query($seleccion);
			$estados = [];
			while ($registro = $consulta->fetchObject()) {
				$estados[] = new Estado($registro->id,$registro->idusuario,$registro->mensaje,$registro->fecha);
			}
			return $estados;
		}

		public static function getEstadobyId($id)
		{
			$conexion = DB::connectDB();
			$seleccion = "	SELECT * 
							FROM estado
							WHERE id = $id
							ORDER BY fecha;
							";
			$consulta = $conexion->query($seleccion);
			$estados = [];
			while ($registro = $consulta->fetchObject()) {
				$estados[] = new Estado($registro->id,$registro->idusuario,$registro->mensaje,$registro->fecha);
			}
			return $estados;
		}

		public static function borrarEstado($id)
		{
			$conexion = DB::connectDB();
    		$insercion = "DELETE FROM estado
    						WHERE id = $id;";
    		if($conexion->exec($insercion) == 1){
    			return 1;
    		}else{
    			return 0;
    		}
		}				
	}
?>