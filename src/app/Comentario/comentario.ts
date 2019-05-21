export class Comentario{
	private id:number;
	private idusuario:number;
	private nombreUsuario:string;
	private idelemento:number;
	private comentario:string;
	private fecha:string;

	constructor(id:number,
		idusuario:number,
		idelemento:number,
		nombreUsuario:string,
		comentario:string,
		fecha:string
	) {
		this.id = id;
		this.idusuario = idusuario;
		this.idelemento = idelemento;
		this.nombreUsuario = nombreUsuario;
		this.comentario = comentario;
		this.fecha = fecha;
	}
	// getters y setters
	public getId():number{
		return this.id;
	}
	public getIdusuario():number{
		return this.idusuario;
	}
	public getIdelemento():number{
		return this.idelemento;
	}
	public getNombreUsuario():string{
		return this.nombreUsuario;
	}
	public getComentario():string{
		return this.comentario;
	}
	public getFecha():string{
		return this.fecha;
	}

	public setId(id:number):void{
		this.id = id;
	}
	public setIdusuario(idusuario:number):void{
		this.idusuario = idusuario;
	}
	public setIdelemento(idelemento:number):void{
		this.idelemento = idelemento;
	}
	public setNombreUsuario(nombreUsuario:string):void{
		this.nombreUsuario = nombreUsuario;
	}
	public setComentario(comentario:string):void{
		this.comentario = comentario;
	}
	public setFecha(fecha:string):void{
		this.fecha = fecha;
	}
}