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
	//variable para moverse por los menus
	public publicaciones:boolean = true;
	public altaAdmin:boolean = false;
	public mostrarUsuarios:boolean = false;
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
	//variables para la página ver usuarios
	public usuarios:Array<Usuario> = new Array();

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
	// funcion para odtener todos los usuarios administradores
	public obtenerAdmins():void{
		// llamamso al servicio que obtiene los administradores
		this.admins = this._operacionesUsuarios.getAdmins(this.admin.getId(),this.admins);
	}
	// funcion para odtener todos los usuarios nomrales
	public obtenerUsuarios():void{
		// llamamso al servicio que obtiene los nomrales
		this.usuarios = this._operacionesUsuarios.getUsuarios(this.usuarios);
	}
	// funcion para mostrar solo la parta que da de alta a un adminitrador
	public altaAdminFormulario():void{
		// dejamos activo solo el boolean que muestra el formulario de alta
		this.publicaciones = false;
		this.mostrarUsuarios = false;
		this.altaAdmin = true;
		// llamamos a la funcion para obtener a los adminitradores
		this.obtenerAdmins();
	}
	// funcion para mostrar solo las publicaciones denunciadas
	public irDenuncias():void{
		// dejamos activo solo el boolean que muestra la publicaciones
		this.altaAdmin = false;
		this.mostrarUsuarios = false;
		this.publicaciones = true;
	}
	// funcion para mostrar solo los usuarios registrados
	public verUsuarios():void{
		// dejamos activo solo el boolean que muestra los usuarios registrados
		this.altaAdmin = false;
		this.publicaciones = false;
		this.mostrarUsuarios = true;
		// llamamos a la funcion para obtener a los usuarios normales
		this.obtenerUsuarios();
	}
	//funcion que valida el formulari de alta
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
						// llamamos a la funcion que recoge todos los admins
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
	// funcion que valida el campo del correo
	public validarCorreo():void{
		// preguntamos si el campo esta vacio
		if(this.correo != "" || this.correo == null){
			// preguntamos si el correo cumple la expresion regular
			if(this.expresionCorreo(this.correo)){
				// si la cumple
				// riciniamos ala variable que informa al usuario
				this.correoInfo = "";
				// cambiamos la variable de validacion del campo
				this.email = true;
			}else{
				// informamos al usuairo del error
				this.correoInfo = "Correo no válido.";
				// cambiamos la variable de validacion del campo
				this.email = false;
			}
		}else{
			//informamos al usuario del error
			this.correoInfo = "Escribe una dirección de correo.";
			// cambiamos la variable de validacion del campo
			this.email = false;
		}
	}
	// funcion que el campo de la contraseña
	public validarPassword():void{
		//comprobamos que la contraseña no este vacia
		if(this.password != "" || this.password == null){
			//comprobamos la longitud de la contraseña
			if(this.passlon){
				// riniciamos la variable que informa al usuario
				this.passwordInfo = "";
				// cambiamos la variable de validacion del campo
				this.pass = true;
			}
			// llamamosa la funcion que valida la confirmacion de la contraseña
			this.validarPassword2();
		}else{
			//informamops al usuairo del error
			this.passwordInfo = "Escribe una contraseña.";
			// cambiamos la variable de validacion del campo
			this.pass = false;
		}
	}
	// funcion que validad la confirmacion de la contraseña
	public validarPassword2():void{
		// comprobamos que la confirmacion no este vacía
		if(this.password2 != "" || this.password2 == null){
			//comprobamos si las contraseñas son iguales
			if(this.password == this.password2){
				// reiniciamos la variable que informa al usuario
				this.password2Info = "";
				// cambiamos la variable de validacion del campo
				this.pass2 = true;
			}else{
				// informamos al usuario del error
				this.password2Info = "Las contraseñas no coinciden.";
				// cambiamos la variable de validacion del campo
				this.pass2 = false;	
			}
		}else{
			// informamos al usuario del error
			this.password2Info = "Escribe una contraseña.";
			// cambiamos la variable de validacion del campo
			this.pass2 = false;
		}
	}
	// funcion que comprueba la langitud del correo
	public longitudCorreo():void{
		//comprobamos que la longitud sea inferior a 100
		if(this.correo.length > 100){
			// si supera ña longitud cortamos el correo a 100 caracteres
			this.correo = this.correo.substring(0,99);
			// informamos al usuario
			this.correoInfo = "Máximo 100 caracteres.";
		}
		// llamamos a la funcion que valida el correo
		this.comprobarCorreo();
	}
	// funcion que valida la longitud de la contraseña
	public longitudPassword():void{
		// comprobamos si la longitud es inferior a 8
		if(this.password.length < 8){
			// si lo es informamos al usuario
			this.passwordInfo = "Mínimo 8 caracteres.";
		}else if(this.password.length > 7 && this.password.length < 33){
			//si la longitud se encuentra entre 8 y 32
			// reiniciamos la variable que informa al usuairo
			this.passwordInfo = "";
			// cambiamos la variable de validacion del campo
			this.passlon = true;
		}else if(this.password.length > 33){
			// si la longitud es superior a 32
			// cortamos la contraseña a 32 caracteres
			this.password = this.password.substring(0,32);
			// informamos al usuairo
			this.passwordInfo = "Máximo 32 caracteres.";
		}
	}
	// funcion que valida la expresion regular del correo
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
				// llamamos a la funccion que avisa al usuario si el correo existe
				this.correoInformar(datos['existe'])
			}
		);
	}
	// funcion que avisa al usuario si el correo existe
	public correoInformar(existe:string):void{
		//comprobamos el resultado e informamos al usuario
		if(existe == "1"){
			// si existe informamos al usuario
			this.correoExiste = "El correo ya esta en uso.";
			// cambiamos la variable de validacion del campo
			this.emailExist = false;
		}else{
			// si no existe no informamos al usuario
			this.correoExiste = "";
			// cambiamos la variable de validacion del campo
			this.emailExist = true;
		}
	}
	// funcion que borra un usuario
	public borrarUsuario(idusuario:number,tipo:string):void{
		// lalamos al servioc que borra al usuario
		this._operacionesUsuarios.borrarUsuario(idusuario);
		// preguntamos si es admin o no
		if(tipo == "admin"){
			// si es admin lo borramos del array de admins
			for(var i = 0; i < this.admins.length; i++){
				if(this.admins[i].getId() == idusuario){
					this.admins.splice(i,1);
				}
			}
		}else{
			// si no es admin lo borramos del array de usuarios normales
			for(var i = 0; i < this.usuarios.length; i++){
				if(this.usuarios[i].getId() == idusuario){
					this.usuarios.splice(i,1);
				}
			}
		}
		
	}
	// funcion que ordena las denuncias por numero de denuncias
	public ordenarPorNumero():void{
		//ordenamos por numero de deuncias de manera descendente
		this.denuncias.sort(function (a, b) {
			if (a.getNumdenuncias() > b.getNumdenuncias()) {
				return -1;
			}
			if (a.getNumdenuncias() < b.getNumdenuncias()) {
				return 1;
			}
			
			return 0;
		});
		// cambiamos la variable ordenarPor por 'numero'
		this.ordenarPor = "numero";
	}
	//funcion que ordena las denuncias por fecha
	public ordenarPorFecha():void{
		//ordenamos por fecha
		this.denuncias = this._operacionesFechas.ordenarPorFechaDesc(this.denuncias);
		// cambiamos la variable ordenarPor por 'fecha'
		this.ordenarPor = "fecha";
	}
	// funcion que obtiene las denuncias
	public obtenerDenuncias():void{
		// llamamos al servicio que obtine las denuncias
		this.denuncias = this._operacionesDenuncias.getDenuncias();
		//comprobamos si el admin ha ordenado el array para ordenar el array
		if(this.ordenarPor == "numero"){
			// llamamos a la funcion que ordena por numero de denuncias
			this.ordenarPorNumero();
		}else if(this.ordenarPor == "fecha"){
			//llamamos a la funcion que ordena por fecha
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
	//funcion para borrar un comentario
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
	// funcion para borrar la publicacion
	public borrarPublicacion(idelemento:number):void{
		//borramos las denuncias de ese lemetno
		this.borrarDenuncias(idelemento);
		//borramos ese elemeto de la base de datos
		this._borrarArchivo.borrarArchivo(idelemento);
	}
	//funcion para borrar todolos los comentarios
	public borrarComentarios(idelemento:number):void{
		// llamamos al servico que borra los comentarios
		this._comentarios.borrarComentarios(idelemento);

		//quitamos los comentarios del array
		for (var i = 0; i < this.denuncias.length;i++){
			if(this.denuncias[i].getElemento().getId() == idelemento){
				this.denuncias[i].getElemento().setComentarios(new Array());
			}
		}
	}
	//funcion para borrar las denuncias
	public borrarDenuncias(idlemento:number):void{
		// llamamos a la funciuon que borra las denuncias
		this._operacionesDenuncias.borrarDenuncias(idlemento);

		//eliminamos el elemento de las denuncias
		for(var i = 0; i < this.denuncias.length; i++ ){
			if(this.denuncias[i].getElemento().getId() == idlemento){
				this.denuncias.splice(i,1);
			}
		}
	}
	//funcion para cerrar la ventana modal
	public cerrarModal(): void {
	//recorremos la ventana modal y la cerramos
	//usar esta linea puede dar error ya que modal no es una funcion jquery si no una del propio
	//componente que esta recogiendo. Con @ts-ignore se puede hacer que tipe script ignore este error
	//@ts-ignore
	$('#enviarmensaje').modal('hide');
	}

	//funcion para cerrar sesion
	public cerrarSesion():void{
		//borramos datos de sesion
		this._cerrarSesion.cerrarSesion();
	}
}
