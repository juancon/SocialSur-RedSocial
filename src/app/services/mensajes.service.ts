import { Injectable } from '@angular/core';
//servicio que contiene las urls
import { UrlsService } from '../services/urls.service'
//Importamos el modulo http al servicio
import {Http, Response, Headers} from "@angular/http";
//Importamos la funcion map
import { map } from 'rxjs/operators';
//importamos la clase mensaje
import {Mensaje} from '../Mensaje/mensaje';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {
	//variable que almacena la direccion del fichero PHP
	private urlMensajes:string;
	//variables referentes a los mensajes
	private mensaje:Mensaje;
	private mensajes:Array<Mensaje> = new Array();

	constructor(
		private _urls:UrlsService,
		private _http:Http
	) {
		this.urlMensajes = this._urls.getUrl("mensajes");
	}
	//funcion para obetner los mensajes de un usuario
	public obtenerMensajes(arrayMensajes:Array<Mensaje>,idusuario):Array<Mensaje>{
		this.mensajes = arrayMensajes;
		//creamos una variable con los parametros que vamos a pasar a backend
		let parametros = {
			idusuario : idusuario,
			accion : "obtenermensajes"
		}
		//funcion http.post para enviar los datos
		let obtener = this._http.post(this.urlMensajes, JSON.stringify(parametros)).pipe(map(res => res.json()));
		//llamamos a la funcion subscribe para poder obtener los datos que ha devuelto php
		obtener.subscribe(
			result => {
				//recogemos solo la respuesta del PHP y la pasamos a una variable
				let datos = result;
				//llamamos a la funcion que ñade los mensajes al array principal
				this.addMensajes(datos);
			}
		);
		
		return this.mensajes;
	}
	//funcion que pasa los resultado del fichero php al array de mensajes
	private addMensajes(datos:Array<string>):void{
		//comprobamos que las longitudes sean diferentes
		if(this.mensajes.length != datos.length){
			//recorremos los mensajes recibidos
			for (var i = 0; i <  datos.length; i++){
				//creamos u objeto mensaje en el array por cada mensaje recibido
				this.mensajes[i] = new Mensaje(
						datos[i]["id"],
						datos[i]["idusuariofrom"],
						datos[i]["idusuarioto"],
						datos[i]["otroUsuario"],
						datos[i]["mensaje"],
						datos[i]["leido"],
						datos[i]["borradofrom"],
						datos[i]["borradoto"],
						datos[i]["fecha"]
				);
			}

		}
	}
	// para enviar un mensaje
	public enviarMensaje(idusuariofrom:number,idusuarioto:number,mensaje:string){
		//creamos una variable con los parametros que vamos a pasar a backend
		let parametros = {
			idusuariofrom : idusuariofrom,
			idusuarioto : idusuarioto,
			mensaje : mensaje,
			accion : "enviarmensaje"
		}
		//funcion http.post para enviar los datos
		let enviar = this._http.post(this.urlMensajes, JSON.stringify(parametros)).pipe(map(res => res.json()));
		//llamamos a la funcion subscribe para completar la llamada a PHP
		enviar.subscribe(
			result => {
			}
		);
	}
	// funcion para marcar un mnesaje como borrado
	public borrarMensaje(idmensaje:number,tipomensaje:string):void{
		//creamos una variable con los parametros que vamos a pasar a backend
		let parametros = {
			idmensaje : idmensaje,
			tipomensaje : tipomensaje,
			accion : "borrarmensaje"
		}
		//funcion http.post para enviar los datos
		let enviar = this._http.post(this.urlMensajes, JSON.stringify(parametros)).pipe(map(res => res.json()));
		//llamamos a la funcion subscribe para completar la llamada a PHP
		enviar.subscribe(
			result => {
			}
		);
	}
	// funicon para marcar un mensaje como leido
	public marcarLeido(idmensaje:number):void{
		//creamos una variable con los parametros que vamos a pasar a backend
		let parametros = {
			idmensaje : idmensaje,
			accion : "marcarleido"
		}
		//funcion http.post para enviar los datos
		let enviar = this._http.post(this.urlMensajes, JSON.stringify(parametros)).pipe(map(res => res.json()));
		//llamamos a la funcion subscribe para completar la llamada a PHP
		enviar.subscribe(
			result => {
			}
		);
	}
}
