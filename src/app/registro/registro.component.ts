import { Router } from '@angular/router';
import { EmailConfirmacionService } from './../services/email-confirmacion.service';
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
	public urlRegistro:string;
	public urlComprobarCorreo:string;
	//variables relacionadas al HTML
	public nombre:string = "";
	public apellido:string = "";
	public apodo:string = "";
	public correo :string = "";
	public password:string = "";
	public password2:string = "";
	public enviar:boolean = false;
	//variables que informan al usuario
	public nombreInfo:string;
	public apellidoInfo:string;
	public apodoInfo:string;
	public correoInfo:string;
	public correoExiste:string;
	public apodoExiste:string;
	public passwordInfo:string;
	public password2Info:string;
	public errorRegistro:string;
	public errorRegistro2:string;
	//variables de validacion
	public name:boolean = false;
	public lastName:boolean = false;
	public nick:boolean = false;
	public nickExist:boolean = false;
	public email:boolean = false;
	public emailExist:boolean = false;
	public pass:boolean = false;
	public passlon:boolean = false;
	public pass2:boolean = false;
	public error:boolean = false;
	//otras variables	
	public usuario:Usuario;

	constructor(
		public _http: Http,
		public _router: Router,
		public _refrescar: RefrescarService,
		public _urls: UrlsService,
		public _confirmacion: EmailConfirmacionService
	) {
		//asignamos el valor a las urls
		this.urlRegistro = _urls.getUrl("crearUsuario");
		this.urlComprobarCorreo = _urls.getUrl("comprobarCorreo");
	}

	ngOnInit() {
	}
	//validacion boton
	public validar():void{
		// preguntamos si todos los campos son validos
		if(this.name && this.lastName && this.nick && this.email && this.pass && this.pass2 && this.emailExist && this.nickExist){
			//creamos un array con los valores de los campos
			let parametros = {
				tipo: "usuario",
				name: this.nombre.toLowerCase(),
				lastname: this.apellido.toLowerCase(),
				nick: this.apodo,
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
						datos['apodo'],
						datos['email'],
						datos['password'],
						datos['bio'],
						datos['avatar'],
						datos['conectado'],
						datos['activado'],
						datos['admin']
						);
						//guardamos el usuario en el navegador
						//localStorage.setItem("usuario",JSON.stringify(this.usuario));
						sessionStorage.setItem("usuario",JSON.stringify(this.usuario));
						//enviamos el meail de confirmacion
						this._confirmacion.enviarEmail(datos['password'],datos['nombre']+" "+datos['apellido'],datos['apodo']);
						//redirigimos al usuario
						window.open("/inicio","_self");
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
			this.validarApodo();
			this.validarCorreo();
			this.validarPassword();
			this.validarPassword2();
		}
	}
	//validaciones campos vacios
	public validarNombre():void{
		if(this.nombre.trim() != "" || this.nombre == null){
			//comprobamos la expresion regular del nombre
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
	public validarApellido():void{
		if(this.apellido.trim() != "" || this.apellido == null){
			//comprobamos la expresion regular del apellido
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
	public validarApodo():void{
		if(this.apodo.trim() != "" || this.apodo == null){
			//comprobamos la expresion regular del apodo
			if(this.expresionApodo(this.apodo)){
				this.apodoInfo = "";
				this.nick = true;
			}else{
				this.apodoInfo = "Apodo no válido.";
				this.nick = false;
			}
		}else{
			this.apodoInfo = "Escribe un apodo.";
			this.nick = false;
		}
	}
	public validarCorreo():void{
		if(this.correo.trim() != "" || this.correo == null){
			//comprobamos la expresion regular del correo
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
		if(this.password.trim() != "" || this.password == null){
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
		if(this.password2.trim() != "" || this.password2 == null){
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
	public longitudNombre():void{
		if(this.nombre.length > 50){
			this.nombre = this.nombre.substring(0,49);
			this.nombreInfo = "Máximo 50 caracteres.";
		}
	}
	public longitudApellido():void{
		if(this.apellido.length > 50){
			this.apellido = this.apellido.substring(0,49);
			this.apellidoInfo = "Máximo 50 caracteres.";
		}
	}
	public longitudApodo():void{
		if(this.apodo.length > 49){
			this.apodo = this.apodo.substring(0,48);
			this.apodoInfo = "Máximo 49 caracteres.";
		}
		this.comprobarApodo();
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
	//validaciones de expresiones regulares
	public expresionNombreApellido(cadena):boolean{
		//patron que solo permite introducir palabras espacios, tildes y la ñ
		let expresion = new RegExp('^([a-zA-Z ñÑáÁéÉíÍóÓúÚ]{2,50})');
		//comprobamos el patron con la cadena que se nos ha pasado
		if(expresion.test(cadena)){
			return true;
		}
		return false;
	}
	public expresionApodo(cadena):boolean{
		//patron que solo permite introducir palabras espacios, tildes y la ñ
		let expresion = new RegExp('^([a-zA-Z0-9]{6,50})');
		//comprobamos el patron con la cadena que se nos ha pasado
		if(expresion.test(cadena)){
			return true;
		}
		return false;
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
	//comprobar si un apodo existe
	public comprobarApodo():void{
		//creamos un array con los valores de los campos
		let parametros = {
			apodo: this.apodo,
			accion: "comprobarapodo"
		};
		//funcion http.post para enviar los datos
		let correo = this._http.post(this.urlComprobarCorreo, JSON.stringify(parametros)).pipe(map(res => res.json()));
		//llamamos a la funcion subscribe para poder obtener los datos que ha devuelto php
		correo.subscribe(
			result => {
				//recogemos solo la respuesta del PHP y la pasamos a una variable
				let datos = result;
				this.apodoInformar(datos['existe'])
			}
		);
	}
	public apodoInformar(existe:string):void{
		//comprobamos el resultado e informamos al usuario
		if(existe == "1"){
			this.apodoExiste = "El apodo ya esta en uso.";
			this.nickExist = false;
		}else{
			this.apodoExiste = "";
			this.nickExist = true;
		}
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
}
