<?php
	require_once 'DB.php';
	require_once 'Usuarios.php';

	class FuncionesUsuarios
	{	

		/**
		 * crea un nuevo usuario no administrador
		 * @param Usuario $usuario
		 * @return int
		*/
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

		/**
		 * crea un nuevo usuario administrador
		 * @param string $correo
		 * @param string $password
		 * @return int
		*/
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

		/**
		 * comprueba si existe un usuario con ese correo y devuelve 0 o 1
		 * @param string $email
		 * @return int
		*/
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

		/**
		 * comprueba si existe un usuario con ese apodo y devuelve 0 o 1
		 * @param string $apodo
		 * @return int
		*/
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

		/**
		 * obtiene todos los usuarios menos los administradores
		 * @return array
		*/
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

		/**
		 * obtiene todos los usuarios administradores
		 * @return array
		*/
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

		/**
		 * obtiene un usuario a travez de la contraseña y el email
		 * @param string $email
		 * @param string $password
		 * @return array
		*/
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

		/**
		 * obtiene un usuario a travez de su id
		 * @param int $id
		 * @return array
		*/
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


		/**
		 * obtiene los usuarios cullo nombre y apellido o apodo se parescan a la cadena solicitada
		 * @param string $cadena
		 * @return array
		*/
		public static function getUsuariosByCadenaBusqueda($cadena)
		{
			$conexion = DB::connectDB();
			$seleccion = "	SELECT *
							FROM usuarios
							WHERE lower(CONCAT(nombre, ' ', apellido)) like '%".strtolower($cadena)."%' OR lower(apodo) like '%".strtolower($cadena)."%' AND admin != 1 AND id != 0";
			$consulta = $conexion->query($seleccion);
			$usuarios = [];
			while ($registro = $consulta->fetchObject()) {
				$usuarios[] = new Usuario($registro->id,$registro->nombre,$registro->apellido,$registro->apodo,$registro->email,$registro->password,$registro->bio,$registro->avatar,$registro->conectado,$registro->activado,$registro->admin);
			}

			return $usuarios;
		}

		/**
		 * obtiene un usuario a travez de su apodo
		 * @param string $apodo
		 * @return array
		*/
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

		/**
		 * obtiene un usuario a travez de su email
		 * @param string $email
		 * @return array
		*/
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

		/**
		 * borra un usuario por su id
		 * @param int $id
		 * @return int
		*/
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

		/**
		 * modifica la contraseña de un usuario
		 * @param int $id
		 * @param string $password
		 * @return int
		*/
		public static function cambiarPass($id,$password)
		{
			$conexion = DB::connectDB();

    		$modificar = "UPDATE usuarios
    						SET password = '$password'
    						WHERE id = '$id';";
    		if($conexion->exec($modificar) == 1){
    			return 1;
    		}else{
    			return 0;
    		}
		}

		/**
		 * modifica el estado activado de la cuenta de un usuario a travez de su codigo
		 * @param string $codigo
		 * @return int
		*/
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

		/**
		 * modifica la bio de un usuario a travez de su id
		 * @param int $id
		 * @param string $bio
		 * @return int
		*/
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

		/**
		 * modifica el avatar de un usuario a travez de su id
		 * @param int $id
		 * @param string $avatar
		 * @return int
		*/
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

		/**
		 * modifica el estado un usuario a conectado a travez de su id
		 * @param int $id
		 * @return int
		*/
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

		/**
		 * modifica el estado un usuario a desconectado a travez de su id
		 * @param int $id
		 * @return int
		*/
		public static function desconectarUsuario($id)
		{
			$conexion = DB::connectDB();

    		$modificar = "UPDATE usuarios
    						SET conectado = 0
    						WHERE id = $id;";
    		$conexion->exec($modificar);
		}

		/**
		 * modifica el estado de todos los usuarios a desconectado a travez de su id
		 * @return int
		*/
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