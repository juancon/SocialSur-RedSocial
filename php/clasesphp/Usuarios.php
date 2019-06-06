<?php
class Usuario{
	private $id;
	private $nombre;
	private $apellido;
	private $apodo;
	private $email;
	private $password;
	private $bio;
	private $avatar;
	private $conectado;
	private $activado;
	private $admin;
  
	function __construct($id, $nombre,$apellido,$apodo,$password, $email,$bio,$avatar,$conectado,$activado, $admin) {
		$this->id = $id;
		$this->nombre = $nombre;
		$this->apellido = $apellido;
		$this->apodo = $apodo;
		$this->password = $password;
		$this->email = $email;
		$this->bio = $bio;
		$this->avatar = $avatar;
		$this->conectado = $conectado;
		$this->activado = $activado;
		$this->admin = $admin;
	}

	/**
	 * devuelve el id del usuario
	 * @return int
	*/
	function getId(){
		return $this->id;
	}

	/**
	 * devuelve el nombre del usuario
	 * @return string
	*/
	function getNombre(){
		return $this->nombre;
	}

	/**
	 * devuelve el apellido del usuario
	 * @return string
	*/
	function getApellido(){
		return $this->apellido;
	}

	/**
	 * devuelve el apodo del usuario
	 * @return string
	*/
	function getApodo(){
		return $this->apodo;
	}

	/**
	 * devuelve el email del usuario
	 * @return string
	*/
	function getEmail(){
		return $this->email;
	}

	/**
	 * devuelve la contraseña encriptada en md5 del usuario
	 * @return string
	*/
	function getPassword(){
		return $this->password;
	}

	/**
	 * devuelve la bio del usuario
	 * @return string
	*/
	function getBio(){
		return $this->bio;
	}

	/**
	 * devuelve ruta del avatar del usuario
	 * @return string
	*/
	function getAvatar(){
		return $this->avatar;
	}

	/**
	 * devuelve el estado del chat del usuario
	 * @return int
	*/
	function getConectado(){
		return $this->conectado;
	}

	/**
	 * devuelve el estado de la cuenta del usuario
	 * @return int
	*/
	function getActivado(){
		return $this->activado;
	}

	/**
	 * devuelve si el usuario es un adminitrador
	 * @return int
	*/
	function getAdmin(){
		return $this->admin;
	}
}