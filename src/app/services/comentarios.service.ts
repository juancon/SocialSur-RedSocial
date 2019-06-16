import { Injectable } from '@angular/core';
//servicio que contiene las urls
import { UrlsService } from '../services/urls.service';
//servicio que contiene las operacions de las fechas
import { OperacionesFechasService } from '../services/operaciones-fechas.service';
//servicio que contiene las operacions de los usuarios
import { OperacionesUsuariosService } from '../services/operaciones-usuarios.service';
//Importamos el modulo http al servicio
import {Http, Response, Headers} from "@angular/http";
//Importamos la funcion map
import { map } from 'rxjs/operators';
//importamos la clase comentarios
import {Comentario} from '../Comentario/comentario';
//importamos la clase archivo
import {Archivo} from '../Archivo/archivo';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {
	// variable para almacenar la url del archivo PHP
	private urlComentarios:string;
	// array para almacenar las publicaciones que se devuelven
	private archivos:Array<Archivo>;
	// array par almacenar los comentarios que se devuelven
	private comentarios:Array<Comentario> = new Array();

	constructor(
		private _http: Http,
		private _urls: UrlsService,
		private _operacionesFechas: OperacionesFechasService,
		private _usuarios: OperacionesUsuariosService,
	) {
		this.urlComentarios = this._urls.getUrl("comentarios");
	}
	//funcion para publicar un nuevo comentario
	public nuevoComentario(idusuario:number,idelemento:number,comentario:string):void{
		// variable que se enviara al servidor
		let parametros = {
			idusuario : idusuario,
			idelemento : idelemento,
			comentario : comentario,
			accion : "nuevocomentario"
		}
		//funcion http.post para enviar los datos
		let enviar = this._http.post(this.urlComentarios, JSON.stringify(parametros)).pipe(map(res => res.json()));
		//llamamos a la funcion subscribe para completar la llamada a php
		enviar.subscribe(
			result => {
			}
		);
	}

	//funcion para obetenr los comentarios de un elemento
	public getComentariosElementos(idelemento:number,arrayContenido:Array<Archivo>):Array<Archivo>{
		this.archivos = arrayContenido;
		// variable que enveara al archivo PHP
		let parametros = {
			idelemento : idelemento,
			accion : "obtenercomentarios"
		}
		//funcion http.post para enviar los datos
		let enviar = this._http.post(this.urlComentarios, JSON.stringify(parametros)).pipe(map(res => res.json()));
		//llamamos a la funcion subscribe para poder obtener los datos que ha devuelto php
		enviar.subscribe(
			result => {
				//recogemos solo la respuesta del PHP y la pasamos a una variable
				let datos = result;
				//llamamos a la funcion que añade los mensajes al array principal
				this.addComentarios(datos);
			}
		);

		//devolvemos el array
		return this.archivos;
	}

	//Funcion que añade los comentarios al array local
	private addComentarios(datos:Array<any>):void{
		//recorremos el array de archivos
		for(var i = 0; i < this.archivos.length ; i++){
			//rrecorremos el array de datos
			for (var j = 0; j < datos.length; j++){
				//comprobamos que el id de los archivos sean los mismos
				if(this.archivos[i].getId() == datos[j]["idelemento"]){
					//modificamos la fecha en funcion de si es hoy u otro dia
					datos[j]['fecha'] = this._operacionesFechas.convertirFecha(datos[j]['fecha']);
					
					//añadimos el comentario al array
					this.archivos[i].addComentario(new Comentario(
						datos[j]['id'],
						datos[j]['idusuario'],
						datos[j]['idelemento'],
						datos[j]["nombre"],
						datos[j]['comentario'],
						datos[j]['fecha']
					));
				}
			}
		}
	}

	// funcion para actualiozar los comentarios
	public refrescarComentarios(idelemento:number,arrayComentarios:Array<Comentario>):Array<Comentario>{
		this.comentarios = arrayComentarios;
		// variable que se enviara al fichero PHP
		let parametros = {
			idelemento : idelemento,
			accion : "obtenercomentarios"
		}

		//funcion http.post para enviar los datos
		let enviar = this._http.post(this.urlComentarios, JSON.stringify(parametros)).pipe(map(res => res.json()));
		//llamamos a la funcion subscribe para poder obtener los datos que ha devuelto php
		enviar.subscribe(
			result => {
				//recogemos solo la respuesta del PHP y la pasamos a una variable
				let datos = result;
				//llamamos a la funcion que añade los mensajes al array principal
				this.addComentarios(datos);
			}
		);

		return this.comentarios;
	}

	// funcion para borrar todos los comentarios de una publicacion
	public borrarComentario(idcomentario:number):void{
		//parametros que se enviaran al servidor
		let parametros = {
			idcomentario : idcomentario,
			accion : "borrarcomentario"
		}

		//funcion http.post para enviar los datos
		let enviar = this._http.post(this.urlComentarios, JSON.stringify(parametros)).pipe(map(res => res.json()));
		//llamamos a la funcion subscribe para completar la llamada php
		enviar.subscribe(
			result => {
				
			}
		);
	}
	// funcion para borrar un comentario de una publicacion
	public borrarComentarios(idelemento:number):void{
		let parametros = {
			idelemento : idelemento,
			accion : "borrarcomentarios"
		}

		//funcion http.post para enviar los datos
		let enviar = this._http.post(this.urlComentarios, JSON.stringify(parametros)).pipe(map(res => res.json()));
		//llamamos a la funcion subscribe para completar la llamada php
		enviar.subscribe(
			result => {
				
			}
		);
	}
}
