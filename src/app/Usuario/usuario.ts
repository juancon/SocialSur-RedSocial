export class Usuario {
	private id:number;
	private nombre:string;
	private apellido:string;
	private apodo:string;
	private password:string;
	private email:string;
	private bio:string;
	private avatar:string;
	private conectado:string;
	private activado:number;
	private admin:number
	private amistad: number;


	constructor(
		id:number,
		nombre:string,
		apellido:string,
		apodo:string,
		password:string,
		email:string,
		bio:string,
		avatar:string,
		conectado:string,
		activado:number,
		admin:number
	){
		this.id = id;
		this.nombre = nombre;
		this.apellido = apellido;
		this.apodo = apodo;
		this.password = password;
		this.email = email;
		this.bio = bio;
		this.avatar = avatar;
		this.conectado = conectado;
		this.activado = activado;
		this.admin = admin;
	}
	//getters y setters
	public getId():number{
		return this.id;
	}
	public getNombre():string{
		return this.nombre;
	}
	public getApellido():string{
		return this.apellido;
	}
	public getApodo():string{
		return this.apodo;
	}
	public getPassword():string{
		return this.password;
	}
	public getEmai():string{
		return this.email;
	}
	public getBio():string{
		return this.bio;
	}
	public getAvatar():string{
		return this.avatar;
	}
	public getConectado():string{
		return this.conectado;
	}
	public getActivado():number{
		return this.activado;
	}
	public getAdmin():number{
		return this.admin;
	}
	public getAmistad():number {
		return this.amistad;
	}

	public setId(id:number):void{
		this.id = id;
	}
	public setNombre(nombre:string):void{
		this.nombre = nombre;
	}
	public setApellido(apellido:string):void{
		this.apellido = apellido;
	}
	public setApodo(apodo:string):void{
		this.apodo = apodo;
	}
	public setPassword(password:string):void{
		this.password = password;
	}
	public setEmai(email:string):void{
		this.email = email;
	}
	public setBio(bio:string):void{
		this.bio = bio;
	}
	public setAvatar(avatar:string):void{
		this.avatar = avatar;
	}
	public setConectado(conectado:string):void{
		this.conectado = conectado;
	}
	public setActivado(activado:number):void{
		this.activado = activado;
	}
	public setAdmin(admin:number):void{
		this.admin = admin;
	}
	public setAmistad(amistad: number):void {
		this.amistad = amistad;
	}

}
