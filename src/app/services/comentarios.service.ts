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
	private urlComentarios:string;
	private archivos:Array<Archivo>;
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
		let parametros = {
			idusuario : idusuario,
			idelemento : idelemento,
			comentario : comentario,
			accion : "nuevocomentario"
		}
		//funcion http.post para enviar los datos
		let enviar = this._http.post(this.urlComentarios, JSON.stringify(parametros)).pipe(map(res => res.json()));
		//llamamos a la funcion subscribe para poder obtener los datos que ha devuelto php
		enviar.subscribe(
			result => {
				//recogemos solo la respuesta del PHP y la pasamos a una variable
				let datos = result;
			}
		);
	}

	//funcion para obetenr los comentarios de un elemento
	public getComentariosElementos(idelemento:number,arrayContenido:Array<Archivo>):Array<Archivo>{
		this.archivos = arrayContenido;

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

	public refrescarComentarios(idelemento:number,arrayComentarios:Array<Comentario>):Array<Comentario>{
		this.comentarios = arrayComentarios;

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

	private refreshComentarios(datos:Array<string>):void{
		//recorremos el array de datops
		for (var i = 0; i< datos.length ; i++){
			//recorremos el array de comentarios
			for(var j = 0; j < this.comentarios.length; j++){
				//comprobamos que los id de los datos y los comentarios coincidan
				if(datos[i]["id"] == this.comentarios[j].getId()){
					//cambiamos las fechas en funcion si son de hoy
					datos[i]['fecha'] = this._operacionesFechas.convertirFecha(datos[i]['fecha']);
					//añadimos el comentario
					this.comentarios[j] = new Comentario(
						datos[i]['id'],
						datos[i]['idusuario'],
						datos[i]['idelemento'],
						datos[i]["nombre"],
						datos[i]['comentario'],
						datos[i]['fecha']
					);
				}
			}
		}
	}
}
