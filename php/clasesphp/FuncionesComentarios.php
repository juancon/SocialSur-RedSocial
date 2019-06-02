<?php
	require_once 'DB.php';
	require_once 'Comentarios.php';

	class FuncionesComentarios
	{
		public static function crearComentario($idusuario,$idelemento,$comentario)
		{
			$conexion = DB::connectDB();
    		$insercion = "INSERT INTO comentarios (idusuario, idelemento, comentario) VALUES 
    						(".$idusuario.", ".$idelemento.", \"".$comentario."\")";
    		if($conexion->exec($insercion) == 1){
    			return 1;
    		}else{
    			return 0;
    		}
		}

		public static function getComentariosArchivo($idelemento)
		{
			$conexion = DB::connectDB();
			$seleccion = "	SELECT * 
							FROM comentarios
							WHERE idelemento = $idelemento
							ORDER BY fecha;
							";
			$consulta = $conexion->query($seleccion);
			$comentarios = [];
			while ($registro = $consulta->fetchObject()) {
				$comentarios[] = new Comentario($registro->id,$registro->idusuario,$registro->idelemento,$registro->comentario,$registro->fecha);
			}
			return $comentarios;
		}

		public static function getComentarios()
		{

			$conexion = DB::connectDB();
			$seleccion = "	SELECT * 
							FROM comentarios";
			$consulta = $conexion->query($seleccion);
			$comentarios = [];
			while ($registro = $consulta->fetchObject()) {
				$comentarios[] = new Comentario($registro->id,$registro->idusuario,$registro->idelemento,$registro->comentario,$registro->fecha);
			}
			return $comentarios;
		}

		public static function getComentariosByIdusuario($idusuario)
		{
			$conexion = DB::connectDB();
			$seleccion = "	SELECT * 
							FROM comentarios
							WHERE idusuario = $idusuario
							ORDER BY fecha;
							";
			$consulta = $conexion->query($seleccion);
			$comentarios = [];
			while ($registro = $consulta->fetchObject()) {
				$comentarios[] = new Comentario($registro->id,$registro->idusuario,$registro->idelemento,$registro->comentario,$registro->fecha);
			}
			return $comentarios;
		}

		public static function getComentarioById($id)
		{
			$conexion = DB::connectDB();
			$seleccion = "	SELECT * 
							FROM comentarios
							WHERE id = $id
							ORDER BY fecha;
							";
			$consulta = $conexion->query($seleccion);
			$comentarios = [];
			while ($registro = $consulta->fetchObject()) {
				$comentarios[] = new Comentario($registro->id,$registro->idusuario,$registro->idelemento,$registro->comentario,$registro->fecha);
			}
			return $comentarios;
		}

		public static function borrarComentario($id)
		{
			$conexion = DB::connectDB();
    		$insercion = "DELETE FROM comentarios
    						WHERE id = $id";
    		if($conexion->exec($insercion) == 1){
    			return 1;
    		}else{
    			return 0;
    		}
		}	

		public static function borrarComentarios($idelemento)
		{
			$conexion = DB::connectDB();
    		$insercion = "DELETE FROM comentarios
    						WHERE idelemento = $idelemento";
    		if($conexion->exec($insercion) == 1){
    			return 1;
    		}else{
    			return 0;
    		}
		}					
	}
?>