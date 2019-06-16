import { Injectable } from '@angular/core';
//importamos el modulo para poder subir archivos
import {HttpClient} from '@angular/common/http';
//tipo de variable
import { Observable } from 'rxjs';
//importamos el servicio que contiene las urls
import {UrlsService} from '../services/urls.service';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {
	// varaiables para alamcenar las rutas de los ficheros PHP
	private urlSubirArchivo:string;
	private urlCambiarAvatar:string;
	constructor(
		private http:HttpClient,
		private _urls: UrlsService 
	){
		this.urlCambiarAvatar = this._urls.getUrl("cambiarAvatar");
		this.urlSubirArchivo = this._urls.getUrl("subirArchivo")
	}
	//funcion para subir avtar y cambiar lo en la bse de datos
	public cambiarAvatar(datos:any):Observable<any>{
		// devolvemos la llmada a falta de un suscribe
		return this.http.post(this.urlCambiarAvatar, datos);
	}
	//funcion para subir una publicacion
	public subirArchivo(datos:any):Observable<any>{
		// devolvemos la llmada a falta de un suscribe
		return this.http.post(this.urlSubirArchivo, datos);
	}
}
