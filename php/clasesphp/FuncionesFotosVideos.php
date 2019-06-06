<?php
	require_once 'DB.php';
	require_once 'FotosVideos.php';

	class FuncionesFotosVideos
	{
		/**
		 * añade un fichero a la base de datos
		 * @param string $url
		 * @param string $nombre
		 * @param int $idusuario
		 * @param string $tipo
		 * @return int
		*/
		public static function subirArchivo($url,$nombre,$idusuario,$tipo)
		{
			$conexion = DB::connectDB();
    		$insercion = "INSERT INTO fotosvideos (url, nombre, idusuario,tipo) VALUES 
    						(\"".$url."\",\"".$nombre."\", ".$idusuario.",\"".$tipo."\")";
    		if($conexion->exec($insercion) == 1){
    			return 1;
    		}else{
    			return 0;
    		}
		}

		/**
		 * obtiene los archivos que ha publicado un usuario
		 * @param int $idusuario
		 * @return array
		*/
		public static function getArchivosByIdusuario($idusuario)
		{
			$conexion = DB::connectDB();
			$seleccion = "	SELECT * 
							FROM fotosvideos
							WHERE idusuario = $idusuario
							ORDER BY fecha desc;
							";
			$consulta = $conexion->query($seleccion);
			$archivos = [];
			while ($registro = $consulta->fetchObject()) {
				$archivos[] = new Archivo($registro->id,$registro->url,$registro->nombre,$registro->idusuario,$registro->tipo,$registro->fecha);
			}
			return $archivos;
		}

		/**
		 * obtiene un archivo por su id
		 * @param int $id
		 * @return array
		*/
		public static function getArchivosById($id)
		{
			$conexion = DB::connectDB();
			$seleccion = "	SELECT * 
							FROM fotosvideos
							WHERE id = $id
							ORDER BY fecha desc;
							";
			$consulta = $conexion->query($seleccion);
			$archivos = [];
			while ($registro = $consulta->fetchObject()) {
				$archivos[] = new Archivo($registro->id,$registro->url,$registro->nombre,$registro->idusuario,$registro->tipo,$registro->fecha);
			}
			return $archivos;
		}

		/**
		 * borra un archivo de la base de datos por su id
		 * @param int $id
		 * @return ints
		*/
		public static function borrarArchivo($id)
		{
			$conexion = DB::connectDB();
    		$insercion = "DELETE FROM fotosvideos
    						WHERE id = $id;";
    		if($conexion->exec($insercion) == 1){
    			return 1;
    		}else{
    			return 0;
    		}
		}
	}
?>