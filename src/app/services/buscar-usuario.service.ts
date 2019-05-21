import { Injectable } from '@angular/core';

//Importamos el modulo http al servicio
import {Http, Response, Headers} from "@angular/http";
//servicio que continen las urls de los ficheros php
import { UrlsService } from './urls.service';

@Injectable({
  providedIn: 'root'
})
export class BuscarUsuarioService {
	private urlBuscarUsuario:string;
	constructor(
		private _http: Http,
		private _urls: UrlsService
	) { 
		this.urlBuscarUsuario = this._urls.getUrl("buscarUsuario");
	}

	public buscarUsuarioEmailPass(correo,password):void{
		let array = {
			"tipo" : "emailPass", 
			"correo" : correo,
			"password" : password
		}
		this._http.post(this.urlBuscarUsuario, array);
	}
}
