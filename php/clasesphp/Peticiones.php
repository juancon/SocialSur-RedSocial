<?php
class Peticion{
	private $usuariofrom;
	private $usuarioto;
	private $mensaje;
	private $aceptado;
	private $fecha;
  
	function __construct($usuariofrom,$usuarioto,$mensaje,$aceptado, $fecha) {
		$this->usuariofrom = $usuariofrom;
		$this->usuarioto = $usuarioto;
		$this->mensaje = $mensaje;
		$this->$aceptado = $aceptado;
		$this->fecha = $fecha;
	}

	function getUsuariofrom(){
		return $this->usuariofrom;
	}
	function getusuarioto(){
		return $this->usuarioto;
	}
	function getMensaje(){
		return $this->mensaje;
	}
	function getAceptado(){
		return $this->aceptado;
	}
	function getFecha(){
		return $this->fecha;
	}

	public function __toString(){
		$ret = array(
			'usuariofrom' => $this->usuariofrom,
			'usuarioto' => $this->usuarioto,
			'mensaje' => $this->mensaje,
			'aceptado' => $this->aceptado,
			'fecha' => $this->fecha
		);
		return json_encode($ret);
	}
}