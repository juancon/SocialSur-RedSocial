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
	private urlSubirArchivo:string;
	private urlCambiarAvatar:string;
	constructor(
		private http:HttpClient,
		private _urls: UrlsService 
	){
		this.urlCambiarAvatar = this._urls.getUrl("cambiarAvatar");
		this.urlSubirArchivo = this._urls.getUrl("subirArchivo")
	}

	public cambiarAvatar(datos:any):Observable<any>{
		return this.http.post(this.urlCambiarAvatar, datos);
	}

	public subirArchivo(datos:any):Observable<any>{
		return this.http.post(this.urlSubirArchivo, datos);
	}
}
