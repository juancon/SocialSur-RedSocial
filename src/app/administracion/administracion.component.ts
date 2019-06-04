import { RecogerUsuarioLocalService } from './../services/recoger-usuario-local.service';
import { Component, OnInit } from '@angular/core';
//importamos la clase con las operacions de las denuncias
import { OperacionesDenunciasService } from './../services/operaciones-denuncias.service';
//importamos la clase denuncias
import { Denuncias } from '../Denuncias/denuncias';
//improtamos la clase archivo
import { Archivo } from '../Archivo/archivo';
//importamos las funciones de las fechas. los usuarios, los comentarios y borrar archivoss
import { OperacionesFechasService } from '../services/operaciones-fechas.service';
import { OperacionesUsuariosService } from '../services/operaciones-usuarios.service';
import { ComentariosService } from '../services/comentarios.service';
import { BorrarArchivoService } from './../services/borrar-archivo.service';
import {UrlsService} from '../services/urls.service';
import { Comentario } from '../Comentario/comentario';
import { Usuario } from '../Usuario/usuario';
//servicio para cerrar sesion
import { CerrarSesionService } from '../services/cerrar-sesion.service';
//Importamos el modulo http al servicio
import {Http, Response, Headers} from "@angular/http";
//Importamos la funcion map
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent implements OnInit {
	public urlRegistro:string;
	public urlComprobarCorreo:string;
	public denuncias:Array<Denuncias>;
	public admin:Usuario;
	public admins:Array<Usuario> = new Array();
	//Variables que almacena todo el contenido subido por el usuario (fotos,videos,comentarios)
	public contenidoUsuario:Array<Archivo> = new Array();
	//variables para ordenar
	public ordenarPor:string = "nada";
	//variable para dar de alta a nuevos administradores
	public altaAdmin:boolean = false;
	//variables relacionadas al HTML
	public correo :string = "";
	public password:string = "";
	public password2:string = "";
	public enviar:boolean = false;
	//variables que informan al usuario
	public correoInfo:string;
	public correoExiste:string;
	public passwordInfo:string;
	public password2Info:string;
	public errorRegistro:string;
	public errorRegistro2:string;
	//variables de validacion
	public email:boolean = false;
	public emailExist:boolean = false;
	public pass:boolean = false;
	public passlon:boolean = false;
	public pass2:boolean = false;
	public error:boolean = false;
  
  constructor(
		public _cerrarSesion: CerrarSesionService,
    public _operacionesDenuncias: OperacionesDenunciasService,
		public _operacionesFechas: OperacionesFechasService,
		public _operacionesUsuarios: OperacionesUsuariosService,
		public _borrarArchivo: BorrarArchivoService,
		public _comentarios: ComentariosService,
		public _http: Http,
		public _urls: UrlsService,
		public _recogerUsuario: RecogerUsuarioLocalService
  ) {
		this.urlRegistro = _urls.getUrl("crearUsuario");
		this.urlComprobarCorreo = _urls.getUrl("comprobarCorreo");
		this.admin = _recogerUsuario.getUsuario();
		this.obtenerDenuncias();
		setInterval(this.obtenerDenuncias.bind(this),300000)
  }
	
  ngOnInit() {
	}

	public obtenerAdmins(){
		this.admins = this._operacionesUsuarios.getAdmins(this.admin.getId(),this.admins);
	}

	public altaAdminFormulario():void{
		this.altaAdmin = true;
		this.obtenerAdmins();
	}

	public irDenuncias(){
		this.altaAdmin = false;
	}

	public validar():void{
		// preguntamos si todos los campos son validos
		if(this.email && this.pass && this.pass2 && this.emailExist){
			//creamos un array con los valores de los campos
			let parametros = {
				tipo: "admin",
				email: this.correo,
				pass: this.password
			}
			//funcion http.post para enviar los datos
			let registro = this._http.post(this.urlRegistro, JSON.stringify(parametros)).pipe(map(res => res.json()));
			//llamamos a la funcion subscribe para poder obtener los datos que ha devuelto php
			registro.subscribe(
				result => {
					//recogemos solo la respuesta del PHP y la pasamos a una variable
					let datos = result;
					//comprobamos que no haya devuleto error
					if(typeof(datos['error']) == "undefined"){
						this.correo = "";
						this.password = "";
						this.password2 = "";
						this.email = false;
						this.emailExist = false;
						this.pass = false;
						this.pass2 = false;
						this.obtenerAdmins();
					}else{
						//si da error se lo informamos al usuario
						this.errorRegistro = "Se ha producido un error.";
						this.errorRegistro2 = "Por favor, inténtelo más tarde.";
					}
				}
			);
		}else{
			//si no lo son informamos de los campos incorrectos al usuario
			this.validarCorreo();
			this.validarPassword();
			this.validarPassword2();
		}
	}

	public validarCorreo():void{
		if(this.correo != "" || this.correo == null){
			if(this.expresionCorreo(this.correo)){
				this.correoInfo = "";
				this.email = true;
			}else{
				this.correoInfo = "Correo no válido.";
				this.email = false;
			}
		}else{
			this.correoInfo = "Escribe una dirección de correo.";
			this.email = false;
		}
	}
	public validarPassword():void{
		if(this.password != "" || this.password == null){
			if(this.passlon){
				this.passwordInfo = "";
				this.pass = true;
			}
			this.validarPassword2();
		}else{
			this.passwordInfo = "Escribe una contraseña.";
			this.pass = false;
		}
	}
	public validarPassword2():void{
		if(this.password2 != "" || this.password2 == null){
			//comprobamos si las contraseñas son iguales
			if(this.password == this.password2){
				this.password2Info = "";
				this.pass2 = true;
			}else{
				this.password2Info = "Las contraseñas no coinciden.";
				this.pass2 = false;	
			}
		}else{
			this.password2Info = "Escribe una contraseña.";
			this.pass2 = false;
		}
	}
	public longitudCorreo():void{
		if(this.correo.length > 100){
			this.correo = this.correo.substring(0,99);
			this.correoInfo = "Máximo 100 caracteres.";
		}
		this.comprobarCorreo();
	}
	public longitudPassword():void{
		if(this.password.length < 8){
			this.passwordInfo = "Mínimo 8 caracteres.";
		}else if(this.password.length > 7 && this.password.length < 33){
			this.passwordInfo = "";
			this.passlon = true;
		}else if(this.password.length > 33){
			this.password = this.password.substring(0,32);
			this.passwordInfo = "Máximo 32 caracteres.";
		}
	}
	public expresionCorreo(cadena):boolean{
		//patron que valida el 99% de los correos existentes
		let expresion = new RegExp("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$");
		//comprobamos el patron con la cadena que se nos ha pasado
		if(expresion.test(cadena)){
			return true;
		}
		return false;
	}

	//comprobar si un correo existe
	public comprobarCorreo():void{
		//creamos un array con los valores de los campos
		let parametros = {
			email: this.correo,
			accion : "comprobarcorreo"
		};
		//funcion http.post para enviar los datos
		let correo = this._http.post(this.urlComprobarCorreo, JSON.stringify(parametros)).pipe(map(res => res.json()));
		//llamamos a la funcion subscribe para poder obtener los datos que ha devuelto php
		correo.subscribe(
			result => {
				//recogemos solo la respuesta del PHP y la pasamos a una variable
				let datos = result;
				this.correoInformar(datos['existe'])
			}
		);
	}
	public correoInformar(existe:string):void{
		//comprobamos el resultado e informamos al usuario
		if(existe == "1"){
			this.correoExiste = "El correo ya esta en uso.";
			this.emailExist = false;
		}else{
			this.correoExiste = "";
			this.emailExist = true;
		}
	}

	public borraAdmin(idusuario:number):void{
		this._operacionesUsuarios.borrarUsuario(idusuario);
		
		for(var i = 0; i < this.admins.length; i++){
			if(this.admins[i].getId() == idusuario){
				this.admins.splice(i,1);
			}
		}
	}
	
	public ordenarPorNumero():void{
		//ordenamos por numero de deuncias de manera descendente
		this.denuncias.sort(function (a, b) {
			if (a.getNumdenuncias() > b.getNumdenuncias()) {
				return -1;
			}
			if (a.getNumdenuncias() < b.getNumdenuncias()) {
				return 1;
			}
			// a must be equal to b
			return 0;
		});

		this.ordenarPor = "numero";
	}

	public ordenarPorFecha():void{
		//ordenamos por fecha
		this.denuncias = this._operacionesFechas.ordenarPorFechaDesc(this.denuncias);
		this.ordenarPor = "fecha";
	}

  public obtenerDenuncias():void{
		this.denuncias = this._operacionesDenuncias.getDenuncias();
		//comprobamos si el admin ha ordenado el array para ordenar el array
		if(this.ordenarPor == "numero"){
			this.ordenarPorNumero();
		}else if(this.ordenarPor == "fecha"){
			this.ordenarPorFecha();
		}
	}
	
	//comprobamos si hay denuncias
	public hayDenuncias():boolean{
		if(this.denuncias.length > 0){
			return true;
		}
		return false;
	}

	//comprobar si el archivo es un video
	public comprobarVideo(tipo:string):boolean{
		if(tipo == "video"){
			return true;
		}
		return false;
	}

	//comprobar si el archivo es un foto
	public comprobarFoto(tipo:string):boolean{
		if(tipo == "foto"){
			return true;
		}
		return false;
	}

	//saber si un array esta vacio
	public esVacio(array:Array<any>):boolean{
		if(array.length > 0){
			return false;
		}

		return true;
	}

	public borrarComentario(idcomentario:number,idelemento:number):void{
		//borramos el comentario de la base de datos
		this._comentarios.borrarComentario(idcomentario);
		//lo sacamos del array
		for(var i = 0; i < this.denuncias.length; i++){
			//comprobamos que el lemento sea el mismo
			if(this.denuncias[i].getElemento().getId() == idelemento){
				//recorremos los comentarios de dicho elemento
				for(var j = 0; j < this.denuncias[i].getElemento().getComentarios().length ; j++){
					//comprobamos que sea el ismo comentario
					if(this.denuncias[i].getElemento().getComentarios()[j].getId() == idcomentario){
						//creamos una rraay auxiliar
						let aux = this.denuncias[i].getElemento().getComentarios();
						//eliminamos el comentario
						aux.splice(j,1);

						//cambiamos el array actual por el auxiliar
						this.denuncias[i].getElemento().setComentarios(aux);
						break;
					}
				}
				break;
			}
		}
	}

	public borrarPublicacion(idelemento:number):void{
		//borramos las denuncias de ese lemetno
		this.borrarDenuncias(idelemento);
		//borramos ese elemeto de la base de datos
		this._borrarArchivo.borrarArchivo(idelemento);


	}

	public borrarComentarios(idelemento:number):void{
		this._comentarios.borrarComentarios(idelemento);

		//quitamos los comentarios del array
		for (var i = 0; i < this.denuncias.length;i++){
			if(this.denuncias[i].getElemento().getId() == idelemento){
				this.denuncias[i].getElemento().setComentarios(new Array());
			}
		}
	}

	public borrarDenuncias(idlemento:number):void{
		this._operacionesDenuncias.borrarDenuncias(idlemento);

		//eliminamos el elemento de las denuncias
		for(var i = 0; i < this.denuncias.length; i++ ){
			if(this.denuncias[i].getElemento().getId() == idlemento){
				this.denuncias.splice(i,1);
			}
		}
	}

	public cerrarModal(): void {
    //recorremos la ventana modal y la cerramos
    //usar esta linea puede dar error ya que modal no es una funcion jquery si no una del propio
    //componente que esta recogiendo con @ts-ignore se puede hacer que tipe script ignore este error
    //@ts-ignore
    $('#enviarmensaje').modal('hide');
	}

	//funcion para cerrar sesion
	public cerrarSesion():void{
		//borramos datos de sesion
		this._cerrarSesion.cerrarSesion();
	}
}
