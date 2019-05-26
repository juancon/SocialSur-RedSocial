import { Injectable } from '@angular/core';
//servicio que contiene las urls
import { UrlsService } from '../services/urls.service'
//Importamos el modulo http al servicio
import {Http, Response, Headers} from "@angular/http";
//Importamos la funcion map
import { map } from 'rxjs/operators';
//importamos la clase usuario
import {Usuario} from '../Usuario/usuario';
//servivioc que me indica el usuario en local
import { RecogerUsuarioLocalService } from '../services/recoger-usuario-local.service';

@Injectable({
  providedIn: 'root'
})
export class OperacioneAmigosService {
	private urlAmigos:string;
	private usuario:Usuario;
	//variables referentes a los amigos
	private amigos:Array<Usuario> = new Array();
	private respuesta:boolean;

	constructor(
		private _recogerUsuario: RecogerUsuarioLocalService,
		private _http: Http,
		private _urls: UrlsService,
	) {
		this.usuario = this._recogerUsuario.getUsuario();
		this.urlAmigos = this._urls.getUrl("Amigos");
	}

	public obtenerAmigos(listaAmigos:Array<Usuario>):Array<Usuario>{
		this.amigos = listaAmigos;
		//recogemos la id de nuestro usuario
		let parametros = {
			id : this.usuario.getId(),
			accion : "obteneramigos"
		}
		//funcion http.post para enviar los datos
		let recogerAmigos = this._http.post(this.urlAmigos, JSON.stringify(parametros)).pipe(map(res => res.json()));
		//llamamos a la funcion subscribe para poder obtener los datos que ha devuelto php
		recogerAmigos.subscribe(
			result => {
				//recogemos solo la respuesta del PHP y la pasamos a una variable
				let datos = result;
				this.agregarAmigosArray(datos);
			}
		);

		return this.amigos;
	}
	//guardar los amigos en el array
	private agregarAmigosArray(amigos:Array<string>):void{
		//recorremos los amigos recibidos
		for (var i = 0; i <  amigos.length; i++){
			//creamos u objeto usuario en el array por cada amigo recibido
			this.amigos[i] = new Usuario(
					amigos[i]["id"],
					amigos[i]["nombre"],
					amigos[i]["apellido"],
					amigos[i]["apodo"],
					"",
					amigos[i]["email"],
					amigos[i]["bio"],
					amigos[i]["avatar"],
					amigos[i]["conectado"],
					1,
					0
			);
		}

		//ordenamos los amigos por nombre
		this.amigos.sort(function(a:Usuario,b:Usuario){
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


	public borrarAmigo(idusuario:number,idamigo:number):void{
		let parametros = {
			idusuario : idusuario,
			idamigo : idamigo,
			accion : "borraramigo"
		}
		//funcion http.post para enviar los datos
		let borrarAmigo = this._http.post(this.urlAmigos, JSON.stringify(parametros)).pipe(map(res => res.json()));
		//subcribimos la funcion para que se ejecute correctamente
		borrarAmigo.subscribe(
			result => {
			}
		);
	}
}
