//importamos la clase usuario
import {Usuario} from "../Usuario/usuario";

export class Mensaje{
	private id:number;
	private idusuariofrom:number;
	private idusuarioto:number;
	private otroUsuario:Usuario;
	private mensaje:string;
	private leido:number;
	private borradofrom:number;
	private borradoto:number;
	private fecha:string;
  
	constructor(
		id:number,
		idusuariofrom:number,
		idusuarioto:number,
		otroUsuario:Usuario,
		mensaje:string,
		leido:number,
		borradofrom:number,
		borradoto:number,
		fecha:string
	) {
		this.id = id;
		this.idusuariofrom = idusuariofrom;
		this.idusuarioto = idusuarioto;
		this.otroUsuario = otroUsuario;
		this.mensaje = mensaje;
		this.leido = leido;
		this.borradofrom = borradofrom;
		this.borradoto = borradoto;
		this.fecha = fecha;
	}
	//getters/setters
	public getId():number{
		return this.id;
	}
	public getIdusuariofrom():number{
		return this.idusuariofrom;
	}
	public getIdusuarioto():number{
		return this.idusuarioto;
	}
	public getOtroUsuario():Usuario{
		return this.otroUsuario;
	}
	public getMensaje():string{
		return this.mensaje;
	}
	public getLeido():number{
		return this.leido;
	}
	public getBorradofrom():number{
		return this.borradofrom;
	}
	public getBorradoto():number{
		return this.borradoto;
	}
	public getFecha():string{
		return this.fecha;
	}

	public setId(id:number):void{
		this.id = id;
	}
	public setIdusuariofrom(idusuariofrom:number):void{
		this.idusuariofrom = idusuariofrom;
	}
	public setIdusuarioto(idusuarioto:number):void{
		this.idusuarioto = idusuarioto;
	}
	public setOtroUsuario(otroUsuario:Usuario):void{
		this.otroUsuario = otroUsuario;
	}
	public setMensaje(mensaje:string):void{
		this.mensaje = mensaje;
	}
	public setLeido(leido:number):void{
		this.leido = leido;
	}
	public setBorradofrom(borradofrom:number):void{
		this.borradofrom = borradofrom;
	}
	public setBorradoto(borradoto:number):void{
		this.borradoto = borradoto;
	}
	public setFecha(fecha:string):void{
		this.fecha = fecha;
	}
}