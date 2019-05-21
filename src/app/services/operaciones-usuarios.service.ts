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
//importamos la clase archivos
import {Comentario} from '../Comentario/comentario';

@Injectable({
  providedIn: 'root'
})
export class OperacionesUsuariosService {
	private urlUsuarios:string;

	constructor(
		private _urls:UrlsService,
		private _http:Http,
		private _httpClient:HttpClient
	) {
		this.urlUsuarios = this._urls.getUrl("usuarios");
	}

	

}


