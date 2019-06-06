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

	/**
	 * devuelve el id del mensaje
	 * @return int
	*/
	function getId(){
		return $this->id;
	}

	/**
	 * devuelve el id del usuario que ha enviado el mensaje
	 * @return int
	*/
	function getIdusuariofrom(){
		return $this->idusuariofrom;
	}

	/**
	 * devuelve el id del usuario que ha recibido el mensaje
	 * @return int
	*/
	function getIdusuarioto(){
		return $this->idusuarioto;
	}

	/**
	 * devuelve el mensaje
	 * @return string
	*/
	function getMensaje(){
		return $this->mensaje;
	}

	/**
	 * devuelve si el usuario que ha recibido el mensaje lo ha leido
	 * @return int
	*/
	function getLeido(){
		return $this->leido;
	}

	/**
	 * devuelve si el usuario que ha enviado el mensaje lo ha borrado
	 * @return int
	*/
	function getBorradofrom(){
		return $this->borradofrom;
	}

	/**
	 * devuelve si el usuario que ha recibido el mensaje lo ha borrado
	 * @return int
	*/
	function getBorradoto(){
		return $this->borradoto;
	}

	/**
	 * devuelve la fecha del mensaje
	 * @return string
	*/
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