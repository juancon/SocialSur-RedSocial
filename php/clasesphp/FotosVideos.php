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

	/**
	 * devuelve el id del elemento
	 * @return int
	*/
	function getId(){
		return $this->id;
	}

	/**
	 * devuelve la ruta donde se encuntra el elemento
	 * @return string
	*/
	function getUrl(){
		return $this->url;
	}

	/**
	 * devuelve el nombre del elemento
	 * @return string
	*/
	function getNombre(){
		return $this->nombre;
	}

	/**
	 * devuelve el id del usuario que ha publicado el elemento
	 * @return int
	*/
	function getIdusuario(){
		return $this->idusuario;
	}

	/**
	 * devuelve el tipo de elemento
	 * @return string
	*/
	function getTipo(){
		return $this->tipo;
	}

	/**
	 * devuelve la fecha del elemento
	 * @return string
	*/
	function getFecha(){
		return $this->fecha;
	}
}