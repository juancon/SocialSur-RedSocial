<?php
class Mensaje{
	private $id;
	private $idusuariofrom;
	private $idusuarioto;
	private $mensaje;
	private $leido;
	private $borradofrom;
	private $borradoto;
	private $fecha;
  
	function __construct($id, $idusuariofrom,$idusuarioto,$mensaje,$leido,$borradofrom,$borradoto, $fecha) {
		$this->id = $id;
		$this->idusuariofrom = $idusuariofrom;
		$this->idusuarioto = $idusuarioto;
		$this->mensaje = $mensaje;
		$this->leido = $leido;
		$this->borradofrom = $borradofrom;
		$this->borradoto = $borradoto;
		$this->fecha = $fecha;
	}

	function getId(){
		return $this->id;
	}
	function getIdusuariofrom(){
		return $this->idusuariofrom;
	}
	function getIdusuarioto(){
		return $this->idusuarioto;
	}
	function getMensaje(){
		return $this->mensaje;
	}
	function getLeido(){
		return $this->leido;
	}
	function getBorradofrom(){
		return $this->borradofrom;
	}
	function getBorradoto(){
		return $this->borradoto;
	}
	function getFecha(){
		return $this->fecha;
	}

	public function __toString(){
		$ret = array(
			'id' => $this->id,
			'idusuariofrom' => $this->idusuariofrom,
			'idusuarioto' => $this->idusuarioto,
			'mensaje' => $this->mensaje,
			'fecha' => $this->fecha
		);
		return json_encode($ret);
	}
}