<?php
	require_once 'DB.php';

	class FuncionesChat
	{	
		/**
		 * crea un nuevo mensaje de chat
		 * @param int $idelemento
		 * @param int $iduserto
		 * @param string $mensaje
		 * @return int
		*/
		public static function nuevoMensaje($iduserfrom,$iduserto,$mensaje)
		{
			$conexion = DB::connectDB();
		
    		$insercion = "INSERT INTO chat (iduserfrom, iduserto, mensaje) VALUES 
    						($iduserfrom,$iduserto, \"".$mensaje."\")";
    		if($conexion->exec($insercion) == 1){
    			return 1;
    		}
			return 0;
		}

		/**
		 * obtiene los mensajes de chat entre dos usuario
		 * @param int $iduserfrom
		 * @param int $iduserto
		 * @return array
		*/
		public static function getConversacion($iduserfrom,$iduserto)
		{

			$conexion = DB::connectDB();
			$seleccion = "	SELECT * 
							FROM chat
							WHERE (iduserfrom = $iduserfrom AND iduserto = $iduserto)
									OR (iduserfrom = $iduserto AND iduserto = $iduserfrom)
							ORDER BY fecha;";
			$consulta = $conexion->query($seleccion);
			$conversacion = [];
			while ($registro = $consulta->fetchObject()) {
				$conversacion[] = array(
					"iduserfrom" => $registro->iduserfrom,
					"iduserto" => $registro->iduserto,
					"mensaje" => $registro->mensaje,
					"fecha" => $registro->fecha
				);
			}
			return $conversacion;
		}

		/**
		 * obtiene los mensajes sin leer de un usuario
		 * @param int $iduserto
		 * @return array
		*/
		public static function getChatUserSinLeer($iduserto)
		{

			$conexion = DB::connectDB();
			$seleccion = "	SELECT * 
							FROM chat
							WHERE (iduserto = $iduserto AND leido = 0)
							ORDER BY fecha;";
			$consulta = $conexion->query($seleccion);
			$conversacion = [];
			while ($registro = $consulta->fetchObject()) {
				$conversacion[] = array(
					"iduserfrom" => $registro->iduserfrom,
					"iduserto" => $registro->iduserto,
					"mensaje" => $registro->mensaje,
					"leido" => $registro->leido,
					"fecha" => $registro->fecha
				);
			}
			return $conversacion;
		}

		/**
		 * marca todos los mensajes entre dos usuario como leidos
		 * @param int $iduserfrom
		 * @param int $iduserto
		 * @return array
		*/
		public static function marcarLeido($iduserfrom,$iduserto)
		{

			$conexion = DB::connectDB();
			$seleccion = "	UPDATE chat
    						SET leido = 1
    						WHERE iduserfrom = $iduserfrom AND iduserto = $iduserto";
			$consulta = $conexion->query($seleccion);
			$conversacion = [];
			while ($registro = $consulta->fetchObject()) {
				$conversacion[] = array(
					"iduserfrom" => $registro->iduserfrom,
					"iduserto" => $registro->iduserto,
					"mensaje" => $registro->mensaje,
					"leido" => $registro->leido,
					"fecha" => $registro->fecha
				);
			}
			return $conversacion;
		}		
	}
?>