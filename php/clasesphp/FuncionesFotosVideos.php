<?php
	require_once 'DB.php';
	require_once 'FotosVideos.php';

	class FuncionesFotosVideos
	{
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

		public static function getArchivos()
		{

			$conexion = DB::connectDB();
			$seleccion = "	SELECT * 
							FROM fotosvideos
							ORDER BY fecha desc;";
			$consulta = $conexion->query($seleccion);
			$archivos = [];
			while ($registro = $consulta->fetchObject()) {
				$archivos[] = new Archivo($registro->id,$registro->url,$registro->nombre,$registro->idusuario,$registro->tipo,$registro->fecha);
			}
			return $archivos;
		}

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

		public static function getArchivosByIdusuarioTipo($idusuario,$tipo)
		{
			$conexion = DB::connectDB();
			$seleccion = "	SELECT * 
							FROM fotosvideos
							WHERE idusuario = $idusuario AND tipo = '$tipo'
							ORDER BY fecha desc;
							";
			$consulta = $conexion->query($seleccion);
			$archivos = [];
			while ($registro = $consulta->fetchObject()) {
				$archivos[] = new Archivo($registro->id,$registro->url,$registro->nombre,$registro->idusuario,$registro->tipo,$registro->fecha);
			}
			return $archivos;
		}
		
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

		public static function getArchivosByIdusuarioNombre($idusuario,$nombre)
		{
			$conexion = DB::connectDB();
			$seleccion = "	SELECT * 
							FROM fotosvideos
							WHERE idusuario = $idusuario AND lower(nombre) like '%".strtolower($nombre)."%'
							ORDER BY fecha desc;";
			$consulta = $conexion->query($seleccion);
			$archivos = [];
			while ($registro = $consulta->fetchObject()) {
				$archivos[] = new Archivo($registro->id,$registro->url,$registro->nombre,$registro->idusuario,$registro->tipo,$registro->fecha);
			}
			return $archivos;
		}

		public static function getArchivosByIdusuarioNombreTipo($idusuario,$nombre,$tipo)
		{
			$conexion = DB::connectDB();
			$seleccion = "	SELECT * 
							FROM fotosvideos
							WHERE idusuario = $idusuario AND lower(nombre) like '%".strtolower($nombre)."%' AND tipo = '$tipo'
							ORDER BY fecha desc;";
			$consulta = $conexion->query($seleccion);
			$archivos = [];
			while ($registro = $consulta->fetchObject()) {
				$archivos[] = new Archivo($registro->id,$registro->url,$registro->nombre,$registro->idusuario,$registro->tipo,$registro->fecha);
			}
			return $archivos;
		}

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

		public static function modificarNombreArchivo($id,$nombre)
		{
			$conexion = DB::connectDB();
    		$insercion = "UPDATE fotosvideos
    						SET nombre = \"$nombre\"
    						WHERE id = $id;";
    		if($conexion->exec($insercion) == 1){
    			return 1;
    		}else{
    			return 0;
    		}
		}
	}
?>