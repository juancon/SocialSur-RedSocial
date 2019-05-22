<?php
class Estado{
	private $id;
	private $idusuario;
	private $mensaje;
	private $fecha;
  
	function __construct($id, $idusuario,$mensaje, $fecha) {
		$this->id = $id;
		$this->idusuario = $idusuario;
		$this->mensaje = $mensaje;
		$this->fecha = $fecha;
	}

	function getId(){
		return $this->id;
	}
	function getIdusuario(){
		return $this->idusuario;
	}
	function getMensaje(){
		return $this->mensaje;
	}
	function getFecha(){
		return $this->fecha;
	}
}