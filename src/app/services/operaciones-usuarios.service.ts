import { Injectable } from '@angular/core';
//servicio que contiene las urls
import { UrlsService } from '../services/urls.service'
//Importamos el modulo http al servicio
import {Http, Response, Headers} from "@angular/http";
import {HttpClient} from "@angular/common/http";
//Importamos la funcion map
import { map } from 'rxjs/operators';
//importamos la clase usuario
import {Usuario} from '../Usuario/usuario';
//importamos el servicio con las operaciones de los amigos
import { OperacioneAmigosService } from './operacione-amigos.service';
//importamos el servicio con las operaciones de los amigos
import { RecogerUsuarioLocalService } from './recoger-usuario-local.service';


@Injectable({
  providedIn: 'root'
})
export class OperacionesUsuariosService {
	// variable que alamcena la rutal al fichero PHP
	private urlUsuarios:string;
	// variabvle que almacena la respuestas de las funciones
	private usuario: Usuario;
	private usuarios:Array<Usuario>;
	private otroUsuario:Array<Usuario>;

	constructor(
		private _urls:UrlsService,
		private _http:Http,
		private _httpClient:HttpClient,
		private _operacionesAmigos: OperacioneAmigosService,
		private _recogerUsuario: RecogerUsuarioLocalService
	) {
		this.urlUsuarios = this._urls.getUrl("usuarios");
		this.usuario = this._recogerUsuario.getUsuario();
	}
	// funcion para buscar un usuario por su nombre o apodo
	public buscarUsuarioCadena(idusuario:number,cadena:string,arrayUsuarios:Array<Usuario>):Array<Usuario>{
		this.usuarios = [];
		// variable que almacena los parámetros que se enviaran a PHP
		let parametros = {
			idusuario : idusuario,
			cadena : cadena,
			accion : "buscarusuario"
			}
		
		//funcion http.post para enviar los datos
		let obtener = this._http.post(this.urlUsuarios, JSON.stringify(parametros)).pipe(map(res => res.json()));
		//llamamos a la funcion subscribe para poder obtener los datos que ha devuelto php
		obtener.subscribe(
			result => {
				//recogemos solo la respuesta del PHP y la pasamos a una variable
				let datos = result;
				//llamamos a la funcion que añade los usuarios al array principal
				this.addUsuarios(datos);
			}
		);

		return this.usuarios;
	}

	private addUsuarios(datos:Array<string>):void{
		//recorremos los amigos recibidos
		for (var i = 0; i <  datos.length; i++){
			//creamos u objeto usuario en el array por cada amigo recibido
			this.usuarios[i] = new Usuario(
					datos[i]["id"],
					datos[i]["nombre"],
					datos[i]["apellido"],
					datos[i]["apodo"],
					"",
					datos[i]["email"],
					datos[i]["bio"],
					datos[i]["avatar"],
					datos[i]["conectado"],
					1,
					0
			);
			// cambiamos el paramtro de amistad del usuario
			this.usuarios[i].setAmistad(datos[i]["amistad"]);
		}

		//ordenamos los amigos por nombre
		this.usuarios.sort(function(a:Usuario,b:Usuario){
			//recogemos los nombre
			let usuarioA = a.getNombre();
			let usuarioB = b.getNombre();
			//los comparamos
			if(usuarioA > usuarioB){
				return 1;
			}else if(usuarioA < usuarioB){
				return -1;
			}
			
			return 0;
		});
	}
	// funcion que devulve un usuario por su apodo
	public getUsuarioByApodo(apodo:string):void{
		this.usuarios = [];
		// variable que almacena los parámetros que se enviaran a PHP
		let parametros = {
			idusuario: this.usuario.getId(),
			apodo : apodo,
			accion : "buscarapodo"
		}
		//funcion http.post para enviar los datos
		let obtener = this._http.post(this.urlUsuarios, JSON.stringify(parametros)).pipe(map(res => res.json()));
		//llamamos a la funcion subscribe para poder obtener los datos que ha devuelto php
		obtener.subscribe(
			result => {
				//recogemos solo la respuesta del PHP y la pasamos a una variable
				let datos = result;
				//llamamos a la funcion crea una sesion con el usuario
				this.addOtroUsuario(datos);
			}
		);
		
	}
		
	// funcion que crea una sesion con el usuario recibido desde PHP
	private addOtroUsuario(datos:Array<string>):void{
		//creamos una seesion con el usuario
		sessionStorage.setItem("otrousuario",JSON.stringify(datos[0]))
		
	}
	//funcion que obtinen todos los usuarios administradores
	public getAdmins(idusuario:number,arrayAdmins:Array<Usuario>):Array<Usuario>{
		this.usuarios = arrayAdmins;
		// variable que almacena los parámetros que se enviaran a PHP
		let parametros = {
			idusuario: idusuario,
			accion : "obteneradmins"
		}
		//funcion http.post para enviar los datos
		let obtener = this._http.post(this.urlUsuarios, JSON.stringify(parametros)).pipe(map(res => res.json()));
		//llamamos a la funcion subscribe para poder obtener los datos que ha devuelto php
		obtener.subscribe(
			result => {
				//recogemos solo la respuesta del PHP y la pasamos a una variable
				let datos = result;
				//llamamos a la funcion queañade los usuarios al array principal
				this.addUsuarios(datos);
			}
		);

		return this.usuarios;
	}
	// funcion que obtiene todos los usuarios nomales
	public getUsuarios(arrayAdmins:Array<Usuario>):Array<Usuario>{
		this.usuarios = arrayAdmins;
		// variable que almacena los parámetros que se enviaran a PHP
		let parametros = {
			accion : "obtenerusuarios"
		}
		//funcion http.post para enviar los datos
		let obtener = this._http.post(this.urlUsuarios, JSON.stringify(parametros)).pipe(map(res => res.json()));
		//llamamos a la funcion subscribe para poder obtener los datos que ha devuelto php
		obtener.subscribe(
			result => {
				//recogemos solo la respuesta del PHP y la pasamos a una variable
				let datos = result;
				//llamamos a la funcion que añade los usuarios al array principal
				this.addUsuarios(datos);
			}
		);

		return this.usuarios;
	}
	//funcion que borra un usuario
	public borrarUsuario(idusuario:number):void{
		// variable que almacena los parámetros que se enviaran a PHP
		let parametros = {
			idusuario: idusuario,
			accion : "borrarusuario"
		}
		//funcion http.post para enviar los datos
		let obtener = this._http.post(this.urlUsuarios, JSON.stringify(parametros)).pipe(map(res => res.json()));
		//llamamos a la funcion subscribe para completar la llamada phps
		obtener.subscribe(result => {});
	}
}


