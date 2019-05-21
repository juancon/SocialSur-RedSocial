export class Estado{
	private id:number;
	private idusuario:number;
	private mensaje:string;
	private tipo:string;
	private megustas:number;
	private rutamegusta:string;
	private fecha:string;
  
	constructor(
		id:number,
		idusuario:number,
		mensaje:string,
		tipo:string,
		megustas:number,
		rutamegusta:string,
		fecha:string
	) {
		this.id = id;
		this.idusuario = idusuario;
		this.mensaje = mensaje;
		this.tipo = tipo;
		this.megustas = megustas;
		this.rutamegusta = rutamegusta;
		this.fecha = fecha;
	}
	// getters setters
	public getId():number{
		return this.id;
	}
	public getIdusuario():number{
		return this.idusuario;
	}
	public getMensaje():string{
		return this.mensaje;
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

	public setId(id:number):void{
		this.id = id;
	}
	public setIdusuario(idusuario:number):void{
		this.idusuario = idusuario;
	}
	public setMensaje(mensaje:string):void{
		this.mensaje = mensaje;
	}
	public setTipo(tipo:string):void{
		this.mensaje = tipo;
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
}