<?php
class archivo{
	private $id;
	private $url;
	private $nombre;
	private $idusuario;
	private $tipo;
	private $fecha;
  
	function __construct($id, $url,$nombre,$idusuario,$tipo, $fecha) {
		$this->id = $id;
		$this->url = $url;
		$this->nombre = $nombre;
		$this->idusuario = $idusuario;
		$this->tipo = $tipo;
		$this->fecha = $fecha;
	}

	function getId(){
		return $this->id;
	}
	function getUrl(){
		return $this->url;
	}
	function getNombre(){
		return $this->nombre;
	}
	function getIdusuario(){
		return $this->idusuario;
	}
	function getTipo(){
		return $this->tipo;
	}
	function getFecha(){
		return $this->fecha;
	}
}