import { Component, OnInit } from '@angular/core';
//Importamos el modulo http al servicio
import {Http, Response, Headers} from "@angular/http";
//Importamos la funcion map
import { map } from 'rxjs/operators';
//Importamos la clase usuario
import { Usuario } from '../Usuario/usuario';
//importamos el servicio que refresca la pantalla
import {RefrescarService} from '../services/refrescar.service';
//importamos el servicio que contiene las urls
import {UrlsService} from '../services/urls.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  providers: [RefrescarService,UrlsService]
})
export class RegistroComponent implements OnInit {
	//url del fichero php
	private urlRegistro:string;
	private urlComprobarCorreo:string;
	//variables relacionadas al HTML
	private nombre:string = "";
	private apellido:string = "";
	private correo :string = "";
	private password:string = "";
	private password2:string = "";
	private enviar:boolean = false;
	//variables que informan al usuario
	private nombreInfo:string;
	private apellidoInfo:string;
	private correoInfo:string;
	private correoExiste:string;
	private passwordInfo:string;
	private password2Info:string;
	private errorRegistro:string;
	private errorRegistro2:string;
	//variables de validacion
	private name:boolean = false;
	private lastName:boolean = false;
	private email:boolean = false;
	private emailExist:boolean = false;
	private pass:boolean = false;
	private passlon:boolean = false;
	private pass2:boolean = false;
	private error:boolean = false;
	//otras variables	
	private usuario:Usuario;

	constructor(
		private _http: Http,
		private _refrescar: RefrescarService,
		private _urls: UrlsService
	) {
		//asignamos el valor a las urls
		this.urlRegistro = _urls.getUrl("crearUsuario");
		this.urlComprobarCorreo = _urls.getUrl("comprobarCorreo");
	}

	ngOnInit() {
	}
	//validacion boton
	private validar():void{
		// preguntamos si todos los campos son validos
		if(this.name && this.lastName && this.email && this.pass && this.pass2 && this.emailExist){
			//creamos un array con los valores de los campos
			let parametros = {
				name: this.nombre,
				lastname: this.apellido,
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
						//creamos un nuevo usuario con los datos que hemos recibido
						this.usuario = new Usuario(
						datos['id'],
						datos['nombre'],
						datos['apellido'],
						datos['email'],
						datos['password'],
						datos['bio'],
						datos['avatar'],
						datos['conectado'],
						datos['activado'],
						datos['admin']
						);
						//guardamos el usuario en el navegador
						localStorage.setItem("usuario",JSON.stringify(this.usuario))
						//redirigimos al usuario
						this._refrescar.refrescar();
					}else{
						//si da error se lo informamos al usuario
						this.errorRegistro = "Se ha producido un error.";
						this.errorRegistro2 = "Por favor, inténtelo más tarde.";
					}
				}
			);
		}else{
			//si no lo son informamos de los campos incorrectos al usuario
			this.validarNombre();
			this.validarApellido();
			this.validarCorreo();
			this.validarPassword();
			this.validarPassword2();
		}
	}
	//validaciones campos vacios
	private validarNombre():void{
		if(this.nombre != "" || this.nombre == null){
			if(this.expresionNombreApellido(this.nombre)){
				this.nombreInfo = "";
				this.name = true;
			}else{
				this.nombreInfo = "Nombre no válido.";
				this.name = false;
			}
		}else{
			this.nombreInfo = "Escribe un nombre.";
			this.name = false;
		}
	}
	private validarApellido():void{
		if(this.apellido != "" || this.apellido == null){
			if(this.expresionNombreApellido(this.apellido)){
				this.apellidoInfo = "";
				this.lastName = true;
			}else{
				this.apellidoInfo = "Apellido no válido.";
				this.lastName = false;
			}
		}else{
			this.apellidoInfo = "Escribe un apellido.";
			this.lastName = false;
		}
	}
	private validarCorreo():void{
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
	private validarPassword():void{
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
	private validarPassword2():void{
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

	//Validaciones longitud de campo
	private longitudNombre():void{
		if(this.nombre.length > 50){
			this.nombre = this.nombre.substring(0,49);
			this.nombreInfo = "Maximo 50 caracteres.";
		}
	}
	private longitudApellido():void{
		if(this.apellido.length > 50){
			this.apellido = this.apellido.substring(0,49);
			this.apellidoInfo = "Maximo 50 caracteres.";
		}
	}
	private longitudCorreo():void{
		if(this.correo.length > 100){
			this.correo = this.correo.substring(0,99);
			this.correoInfo = "Maximo 100 caracteres.";
		}
		this.comprobarCorreo();
	}
	private longitudPassword():void{
		if(this.password.length < 8){
			this.passwordInfo = "Minimo 8 caracteres.";
		}else if(this.password.length > 7 && this.password.length < 33){
			this.passwordInfo = "";
			this.passlon = true;
		}else if(this.password.length > 33){
			this.password = this.password.substring(0,32);
			this.passwordInfo = "Maximo 32 caracteres.";
		}
	}
	//validaciones de expresiones regulares
	private expresionNombreApellido(cadena):boolean{
		//patron que solo permite introducir palabras espacios, tildes y la ñ
		let expresion = new RegExp('^([a-zA-Z ñÑáÁéÉíÍóÓúÚ]{2,50})');
		//comprobamos el patron con la cadena que se nos ha pasado
		if(expresion.test(cadena)){
			return true;
		}
		console.log(this.correoExiste);
		return false;
	}
	private expresionCorreo(cadena):boolean{
		//patron que valida el 99% de los correos existentes
		let expresion = new RegExp("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$");
		//comprobamos el patron con la cadena que se nos ha pasado
		if(expresion.test(cadena)){
			return true;
		}
		return false;
	}
	//comprobar si un correo existe
	private comprobarCorreo():void{
		//creamos un array con los valores de los campos
		let parametros = {
			email: this.correo
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
	private correoInformar(existe:string):void{
		//comprobamos el resultado e informamos al usuario
		if(existe == "1"){
			this.correoExiste = "El correo ya esta en uso.";
			this.emailExist = false;
		}else{
			this.correoExiste = "";
			this.emailExist = true;
		}
	}
}
