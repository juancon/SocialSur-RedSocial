//importamos la clase comentario
import {Comentario} from '../Comentario/comentario';

export class Archivo{
	private id:number;
	private url:string;
	private nombre:string;
	private idusuario:number;
	private tipo:string;
	private megustas:number;ç
	private rutamegusta:string;
	private fecha:string;
	private comentarios:Array<Comentario>;
  
	constructor(
		id:number,
		url:string,
		nombre:string,
		idusuario:number,
		tipo:string,
		megustas:number,
		rutamegusta:string,
		fecha:string
	) {
		this.id = id;
		this.url = url;
		this.nombre = nombre;
		this.idusuario = idusuario;
		this.tipo = tipo;
		this.megustas = megustas;
		this.rutamegusta = rutamegusta;
		this.fecha = fecha;
		this.comentarios = new Array();
	}
	//Getters settters
	public getId():number{
		return this.id;
	}
	public getUrl():string{
		return this.url;
	}
	public getNombre():string{
		return this.nombre;
	}
	public getIdusuario():number{
		return this.idusuario;
	}
	public getTipo():string{
		return this.tipo;
	}
	public getMegustas():number{
		return this.megustas;
	}
	public getRutamegustas():string{
		return this.rutamegusta;
	}
	public getFecha():string{
		return this.fecha;
	}
	public getComentarios():Array<Comentario>{
		return this.comentarios;
	}

	public setId(id:number):void{
		this.id = id;
	}
	public setUrl(url:string):void{
		this.url = url;
	}
	public setNombre(nombre:string):void{
		this.nombre = nombre;
	}
	public setIdusuario(idusuario:number):void{
		this.idusuario = idusuario;
	}
	public setTipo(tipo:string):void{
		this.tipo = tipo;
	}
	public setMegustas(megustas:number):void{
		this.megustas = megustas;
	}
	public setRutamegustas(rutamegusta:string):void{
		this.rutamegusta = rutamegusta;
	}
	public setFecha(fecha:string):void{
		this.fecha = fecha;
	}
	public setComentarios(comentarios:Array<Comentario>):void{
		this.comentarios = comentarios;
	}


	public addComentario(comentario:Comentario):void{
		this.comentarios.push(comentario);
	}
}