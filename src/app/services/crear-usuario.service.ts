import { Injectable } from '@angular/core';

//Importamos el modulo http al servicio
import {Http, Response, Headers} from "@angular/http";
//servicio que continen las urls de los ficheros php
import { UrlsService } from './urls.service';

@Injectable({
  providedIn: 'root'
})
export class CrearUsuarioService {
	private urlCrearUsuario:string;

	constructor(
		//creamos la variable http y la variable router;
		private _http: Http,
		private _urls: UrlsService
	) {
		this.urlCrearUsuario = this._urls.getUrl("crearUsuario");
	}

	public crearUsuario(correo,password,nombre,apellido):void{
		let array = {
			"correo" : correo,
			"password" : password,
			"nombre" : nombre,
			"apellido" : apellido

		};
		this._http.post(this.urlCrearUsuario, array);
	}
}
