//importamos la clase usuario
import { Usuario } from '../Usuario/usuario';

export class Peticion{
	private usuariofrom:number;
	private usuarioto:number;
	private mensaje:string;
	private otroUsuario:Usuario;
	private fecha:string;
  
	constructor(
		usuariofrom:number,
		usuarioto:number,
		mensaje:string,
		otroUsuario:Usuario,
		fecha:string
	) {
		this.usuariofrom = usuariofrom;
		this.usuarioto = usuarioto;
		this.mensaje = mensaje;
		this.otroUsuario = otroUsuario;
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
	public getOtroUsuario():Usuario{
		return this.otroUsuario;
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
	public setOtroUsuario(otroUsuario:Usuario):void{
		this.otroUsuario = otroUsuario;
	}
	public setFecha(fecha:string):void{
		this.fecha = fecha;
	}
}