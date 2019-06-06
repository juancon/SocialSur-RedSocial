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

	/**
	 * devuelve el id del estado
	 * @return int
	*/
	function getId(){
		return $this->id;
	}

	/**
	 * devuelve el id del usuario que ha realizado el estado
	 * @return int
	*/
	function getIdusuario(){
		return $this->idusuario;
	}

	/**
	 * devuelve el estado
	 * @return string
	*/
	function getMensaje(){
		return $this->mensaje;
	}

	/**
	 * devuelve la fecha del estado
	 * @return string
	*/
	function getFecha(){
		return $this->fecha;
	}
}