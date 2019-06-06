<?php
class Comentario{
	private $id;
	private $idusuario;
	private $idelemento;
	private $comentario;
	private $fecha;
  
	function __construct($id, $idusuario, $idelemento,$comentario, $fecha) {
		$this->id = $id;
		$this->idusuario = $idusuario;
		$this->idelemento = $idelemento;
		$this->comentario = $comentario;
		$this->fecha = $fecha;
	}


	/**
	 * devuelve el id del comentario
	 * @return int
	*/
	function getId(){
		return $this->id;
	}

	/**
	 * devuelve el id del usuario que ha realizado el comentario
	 * @return int
	*/
	function getIdusuario(){
		return $this->idusuario;
	}

	/**
	 * devuelve el id del elemento sobre el que se ha realizado el comentario
	 * @return int
	*/
	function getIdelemento(){
		return $this->idelemento;
	}

	/**
	 * devuelve el comentario
	 * @return string
	*/
	function getComentario(){
		return $this->comentario;
	}

	/**
	 * devuelve la fecha a la que se ha realizado el comentario
	 * @return string
	*/
	function getFecha(){
		return $this->fecha;
	}
}