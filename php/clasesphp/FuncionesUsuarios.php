<?php
	require_once 'DB.php';
	require_once 'Usuarios.php';

	class FuncionesUsuarios
	{
		public static function crearUsuario($usuario)
		{
			$conexion = DB::connectDB();

			$busqueda = "SELECT *
						 FROM usuarios
						 WHERE email = '".$usuario->getPassword()."'";

			$consulta = $conexion->query($busqueda);
			$CountReg = $consulta -> fetchAll();
			$TRegistros = count($CountReg);

			if($TRegistros == 0){
				$codigo = md5($usuario->getApodo());
	    		$insercion = "INSERT INTO usuarios (nombre, apellido,apodo, email, password,codigo) VALUES 
	    						(\"".$usuario->getNombre()."\", \"".$usuario->getApellido()."\", \"".$usuario->getApodo()."\", \"".$usuario->getPassword()."\", \"".md5($usuario->getEmail())."\",'$codigo')";
	    		if($conexion->exec($insercion) == 1){
	    			return 1;
	    		}else{
	    			return 0;
	    		}

			}

			return -1;
		}

		public static function crearAdmin($correo,$password)
		{
			$conexion = DB::connectDB();

    		$insercion = "INSERT INTO usuarios (nombre, apellido,apodo, email, password,admin) VALUES 
    						('admin','admin', '', '$correo', \"".md5($password)."\", 1)";
    		if($conexion->exec($insercion) == 1){
    			return 1;
    		}else{
    			return 0;
    		}

			return -1;
		}

		public static function buscarUsuarioByEmail($email)
		{
			$conexion = DB::connectDB();

			$busqueda = "SELECT *
						 FROM usuarios
						 WHERE email = '".$email."'";

			$consulta = $conexion->query($busqueda);
			$CountReg = $consulta -> fetchAll();
			$TRegistros = count($CountReg);

			return $TRegistros;
		}

		public static function buscarUsuarioByApodo($apodo)
		{
			$conexion = DB::connectDB();

			$busqueda = "SELECT *
						 FROM usuarios
						 WHERE apodo = '".$apodo."'";

			$consulta = $conexion->query($busqueda);
			$CountReg = $consulta -> fetchAll();
			$TRegistros = count($CountReg);

			return $TRegistros;
		}

		public static function getUsuarios()
		{
			$conexion = DB::connectDB();
			$seleccion = "	SELECT * 
							FROM usuarios
							WHERE admin != 1";
			$consulta = $conexion->query($seleccion);
			$usuarios = [];
			while ($registro = $consulta->fetchObject()) {
				$usuarios[] = new Usuario($registro->id,$registro->nombre,$registro->apellido,$registro->apodo,$registro->email,$registro->password,$registro->bio,$registro->avatar,$registro->conectado,$registro->activado,$registro->admin);
			}
			return $usuarios;
		}

		public static function getAdmins()
		{
			$conexion = DB::connectDB();
			$seleccion = "	SELECT * 
							FROM usuarios
							WHERE admin != 0";
			$consulta = $conexion->query($seleccion);
			$usuarios = [];
			while ($registro = $consulta->fetchObject()) {
				$usuarios[] = new Usuario($registro->id,$registro->nombre,$registro->apellido,$registro->apodo,$registro->email,$registro->password,$registro->bio,$registro->avatar,$registro->conectado,$registro->activado,$registro->admin);
			}
			return $usuarios;
		}

		public static function getUsuarioByEmailPassword($email,$password)
		{

			$conexion = DB::connectDB();
			$seleccion = "	SELECT * 
							FROM usuarios
							WHERE email = '$email' AND password = '".md5($password)."'";
			$consulta = $conexion->query($seleccion);
			$usuarios = [];
			while ($registro = $consulta->fetchObject()) {
				$usuarios[] = new Usuario($registro->id,$registro->nombre,$registro->apellido,$registro->apodo,$registro->email,$registro->password,$registro->bio,$registro->avatar,$registro->conectado,$registro->activado,$registro->admin);
			}
			return $usuarios;
		}

		public static function getUsuarioById($id)
		{

			$conexion = DB::connectDB();
			$seleccion = "	SELECT * 
							FROM usuarios
							WHERE id = '$id' AND admin != 1";
			$consulta = $conexion->query($seleccion);
			$usuarios = [];
			while ($registro = $consulta->fetchObject()) {
				$usuarios[] = new Usuario($registro->id,$registro->nombre,$registro->apellido,$registro->apodo,$registro->email,$registro->password,$registro->bio,$registro->avatar,$registro->conectado,$registro->activado,$registro->admin);
			}
			return $usuarios;
		}

		public static function getUsuariosByCadenaBusqueda($cadena)
		{
			$conexion = DB::connectDB();
			$seleccion = "	SELECT *
							FROM usuarios
							WHERE lower(CONCAT(nombre, ' ', apellido)) like '%".strtolower($cadena)."%' AND admin != 1 AND id != 0";
			$consulta = $conexion->query($seleccion);
			$usuarios = [];
			while ($registro = $consulta->fetchObject()) {
				$usuarios[] = new Usuario($registro->id,$registro->nombre,$registro->apellido,$registro->apodo,$registro->email,$registro->password,$registro->bio,$registro->avatar,$registro->conectado,$registro->activado,$registro->admin);
			}

			return $usuarios;
		}

		public static function getUsuariosByApodo($apodo)
		{
			$conexion = DB::connectDB();
			$seleccion = "	SELECT *
							FROM usuarios
							WHERE apodo = '".$apodo."' AND admin != 1 AND id != 0";
			$consulta = $conexion->query($seleccion);
			$usuarios = [];
			while ($registro = $consulta->fetchObject()) {
				$usuarios[] = new Usuario($registro->id,$registro->nombre,$registro->apellido,$registro->apodo,$registro->email,$registro->password,$registro->bio,$registro->avatar,$registro->conectado,$registro->activado,$registro->admin);
			}

			return $usuarios;
		}

		public static function getUsuariosByEmail($email)
		{
			$conexion = DB::connectDB();
			$seleccion = "	SELECT *
							FROM usuarios
							WHERE email = '$email'";
			$consulta = $conexion->query($seleccion);
			$usuarios = [];
			while ($registro = $consulta->fetchObject()) {
				$usuarios[] = new Usuario($registro->id,$registro->nombre,$registro->apellido,$registro->apodo,$registro->email,$registro->password,$registro->bio,$registro->avatar,$registro->conectado,$registro->activado,$registro->admin);
			}

			return $usuarios;
		}

		public static function borrarUsuario($id)
		{
			$conexion = DB::connectDB();

    		$borrar = "DELETE FROM usuarios
    						WHERE id = $id;";
    		if($conexion->exec($borrar) == 1){
    			return 1;
    		}else{
    			return 0;
    		}
		}

		public static function modificarActivadoUsuario($codigo)
		{
			$conexion = DB::connectDB();

    		$modificar = "UPDATE usuarios
    						SET activado = 1
    						WHERE codigo = '$codigo';";
    		if($conexion->exec($modificar) == 1){
    			return 1;
    		}else{
    			return 0;
    		}
		}

		public static function modificarNombreApellidoUsuario($id,$nombre,$apellido)
		{
			$conexion = DB::connectDB();

    		$modificar = "UPDATE usuarios
    						SET nombre = \"$nombre\", apellido = \"$apellido\" 
    						WHERE id = $id;";
    		if($conexion->exec($modificar) == 1){
    			return 1;
    		}else{
    			return 0;
    		}
		}

		public static function modificarPasswordUsuario($id,$password)
		{
			$conexion = DB::connectDB();

    		$modificar = "UPDATE usuarios
    						SET password = \"".md5($password)."\"
    						WHERE id = $id;";
    		if($conexion->exec($modificar) == 1){
    			return 1;
    		}else{
    			return 0;
    		}
		}

		public static function modificarBioUsuario($id,$bio)
		{
			$conexion = DB::connectDB();

    		$modificar = "UPDATE usuarios
    						SET bio = \"$bio\"
    						WHERE id = $id;";
    		if($conexion->exec($modificar) == 1){
    			return 1;
    		}else{
    			return 0;
    		}
		}

		public static function modificarAvatarUsuario($id,$avatar)
		{
			$conexion = DB::connectDB();

    		$modificar = "UPDATE usuarios
    						SET avatar = \"$avatar\"
    						WHERE id = $id;";
    		if($conexion->exec($modificar) == 1){
    			return 1;
    		}else{
    			return 0;
    		}
		}

		public static function conectarUsuario($id)
		{
			$conexion = DB::connectDB();

    		$modificar = "UPDATE usuarios
    						SET conectado = \"1\"
    						WHERE id = $id;";
    		if($conexion->exec($modificar) == 1){
    			return 1;
    		}else{
    			return 0;
    		}
		}

		public static function desconectarUsuario($id)
		{
			$conexion = DB::connectDB();

    		$modificar = "UPDATE usuarios
    						SET conectado = 0
    						WHERE id = $id;";
    		$conexion->exec($modificar);
		}

		public static function desconectarUsuarios()
		{
			$conexion = DB::connectDB();

    		$modificar = "UPDATE usuarios
    						SET conectado = 0
    						WHERE conectado = 1;";
    		$conexion->exec($modificar);
		}
						
	}
?>