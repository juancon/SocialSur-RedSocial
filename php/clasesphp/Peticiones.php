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

	/**
	 * devuelve el id del usaurio que ha enviado la peticion
	 * @return int
	*/
	function getUsuariofrom(){
		return $this->usuariofrom;
	}

	/**
	 * devuelve el id del usuario que ha recibido la peticion
	 * @return int
	*/
	function getusuarioto(){
		return $this->usuarioto;
	}

	/**
	 * devuelve el mensaje
	 * @return string
	*/
	function getMensaje(){
		return $this->mensaje;
	}

	/**
	 * devuelve si se ha aceptado la peticion
	 * @return int
	*/
	function getAceptado(){
		return $this->aceptado;
	}

	/**
	 * devuelve la fecha de la peticion
	 * @return snting
	*/
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