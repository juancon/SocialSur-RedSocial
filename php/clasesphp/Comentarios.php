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

	function getId(){
		return $this->id;
	}
	function getIdusuario(){
		return $this->idusuario;
	}
	function getIdelemento(){
		return $this->idelemento;
	}
	function getComentario(){
		return $this->comentario;
	}
	function getFecha(){
		return $this->fecha;
	}
}