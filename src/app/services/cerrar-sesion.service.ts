import { Injectable } from '@angular/core';

//cookies
import { CookieService } from 'ngx-cookie-service';
//Importamos el modulo http al servicio
import {Http, Response, Headers} from "@angular/http";
//Importamos la funcion map
import { map } from 'rxjs/operators';
//Importaos el componente que nos permite redirigir
import {Router} from '@angular/router';
//servicio que continen las urls de los ficheros php
import { UrlsService } from './urls.service';

@Injectable({
  providedIn: 'root'
})
export class CerrarSesionService {
	private urlConectar:string;

	constructor(
		//creamos la variable http y la variable router;
		private _http: Http,
		private _router: Router,
		private _cookies: CookieService,
		private _urls: UrlsService
	) { 
		this.urlConectar = this._urls.getUrl("conectar");
	}

	public cerrarSesion(idusuario:number):void{
		console.log("entra")
		//borramos todas las cookies y las sesiones
		let parametros = {
			"id" : idusuario,
			accion : "desconectar"
		}
		//funcion http.post para enviar los datos
		let logout = this._http.post(this.urlConectar, JSON.stringify(parametros)).pipe(map(res => res.json()));
		//llamamos a la funcion subscribe para terminar de ejecutar el script
		logout.subscribe(
			result => {
				let datos = result
				console.log(datos["desconectado"])
			}
		);
		this._cookies.deleteAll();;
		localStorage.clear();
	}

}
