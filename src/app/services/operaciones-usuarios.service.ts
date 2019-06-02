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
	private urlUsuarios:string;
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

	public buscarUsuarioCadena(idusuario:number,cadena:string,arrayUsuarios:Array<Usuario>):Array<Usuario>{
		this.usuarios = [];

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
				//llamamos a la funcion que ñade los mensajes al array principal
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

	public getUsuarioByApodo(apodo:string):void{
		this.usuarios = [];

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
				//llamamos a la funcion que ñade los mensajes al array principal
				this.addOtroUsuario(datos);
			}
		);
		
	}
		
		
	private addOtroUsuario(datos:Array<string>):void{
		//creamos una seesion con el usuario
		sessionStorage.setItem("otrousuario",JSON.stringify(datos[0]))
		
	}

	public getAdmins(idusuario:number,arrayAdmins:Array<Usuario>):Array<Usuario>{
		this.usuarios = arrayAdmins;

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
				//llamamos a la funcion que ñade los mensajes al array principal
				this.addUsuarios(datos);
			}
		);

		return this.usuarios;
	}

	public borrarUsuario(idusuario:number):void{
		let parametros = {
			idusuario: idusuario,
			accion : "borrarusuario"
		}
		//funcion http.post para enviar los datos
		let obtener = this._http.post(this.urlUsuarios, JSON.stringify(parametros)).pipe(map(res => res.json()));
		//llamamos a la funcion subscribe para completar la llamada phps
		obtener.subscribe(
			result => {
			}
		);
	}
}


