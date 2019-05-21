
export class Peticion{
	private usuariofrom:number;
	private usuarioto:number;
	private mensaje:string;
	private aceptado:number;
	private fecha:string;
  
	constructor(
		usuariofrom:number,
		usuarioto:number,
		mensaje:string,
		aceptado:number,
		fecha:string
	) {
		this.usuariofrom = usuariofrom;
		this.usuarioto = usuarioto;
		this.mensaje = mensaje;
		this.aceptado = aceptado;
		this.fecha = fecha;
	}
	// getters/setter
	public getUsuariofrom():number{
		return this.usuariofrom;
	}
	public getusuarioto():number{
		return this.usuarioto;
	}
	public getMensaje():string{
		return this.mensaje;
	}
	public getAceptado():number{
		return this.aceptado;
	}
	public getFecha():string{
		return this.fecha;
	}

	public setUsuariofrom(usuariofrom:number):void{
		this.usuariofrom = usuariofrom;
	}
	public setusuarioto(usuarioto:number):void{
		this.usuarioto = usuarioto;
	}
	public setMensaje(mensaje:string):void{
		this.mensaje = mensaje;
	}
	public setAceptado(aceptado:number):void{
		this.aceptado = aceptado;
	}
	public setFecha(fecha:string):void{
		this.fecha = fecha;
	}
}