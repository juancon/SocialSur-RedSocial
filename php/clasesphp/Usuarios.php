<?php
class Usuario{
	private $id;
	private $nombre;
	private $apellido;
	private $email;
	private $password;
	private $bio;
	private $avatar;
	private $conectado;
	private $activado;
	private $admin;
  
	function __construct($id, $nombre,$apellido, $password, $email,$bio,$avatar,$conectado,$activado, $admin) {
		$this->id = $id;
		$this->nombre = $nombre;
		$this->apellido = $apellido;
		$this->password = $password;
		$this->email = $email;
		$this->bio = $bio;
		$this->avatar = $avatar;
		$this->conectado = $conectado;
		$this->activado = $activado;
		$this->admin = $admin;
	}

	function setpassword($password) {
		$this->password = $password;
	}

	function setBio($bio) {
		$this->bio = $bio;
	}

	function setActivado($activado) {
		$this->activado = $activado;
	}
	function setAvatar($avatar) {
		$this->avatar = $avatar;
	}
	function setConectado($avatar) {
		$this->conectado = $conectado;
	}

	function getId(){
		return $this->id;
	}
	function getNombre(){
		return $this->nombre;
	}
	function getApellido(){
		return $this->apellido;
	}
	function getEmail(){
		return $this->email;
	}
	function getPassword(){
		return $this->password;
	}
	function getBio(){
		return $this->bio;
	}
	function getAvatar(){
		return $this->avatar;
	}
	function getConectado(){
		return $this->conectado;
	}
	function getActivado(){
		return $this->activado;
	}
	function getAdmin(){
		return $this->admin;
	}
}