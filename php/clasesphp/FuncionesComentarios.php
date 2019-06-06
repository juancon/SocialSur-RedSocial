<?php
	require_once 'DB.php';
	require_once 'Comentarios.php';

	class FuncionesComentarios
	{
		/**
		 * crea un nuevo comentario
		 * @param int $idusuario
		 * @param int $idelemento
		 * @param string $comentario
		 * @return int
		*/
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

		/**
		 * obtiene todos los comentarios que posee un elemento
		 * @param int $idelemento
		 * @return array
		*/
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

		/**
		 * borra un comentario por su id
		 * @param int $id
		 * @return int
		*/
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

		/**
		 * borra todos los comentarios de un elemento
		 * @param int $idelemento
		 * @return int
		*/
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