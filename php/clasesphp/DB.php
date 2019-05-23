<?php
abstract class DB {
	/*Datos de la base de datos */
	private static $server = 'localhost';
	private static $db = 'socialsur';
    /*----------------casa----------------	
    private static $user = 'admin';
	private static $password = 'administrador';*/
	private static $user = 'root';
	private static $password = '';
    private static $port=3306;

	/*Funcion de conexion a la base de datos*/
	public static function connectDB() {
		try {
			$connection = new PDO("mysql:host=".self::$server.";dbname=".self::$db.";port=".self::$port.";charset=utf8mb4", self::$user, self::$password);
		} 
		catch (PDOException $e) {
			echo "No se ha podido establecer conexión con el servidor de bases de datos.<br>";
			die ("Error: " . $e->getMessage());
		}
		return $connection;
	}
}
