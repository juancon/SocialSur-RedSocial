import { Injectable } from '@angular/core';
//importamos el servicio para obtener las urls
import { UrlsService } from './urls.service';
//Importamos el modulo http al servicio
import {Http, Response, Headers} from "@angular/http";
//Importamos la funcion map
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class BorrarArchivoService {
  private urlArchivos:string;

  constructor(
    private _http: Http,
    private _urls: UrlsService
  ){
    this.urlArchivos = this._urls.getUrl("archivos");
  }

  public borrarArchivo(idelemento:number):void{
    let parametros = {
			idelemento : idelemento,
			accion : "borrararchivo"
		}

		//funcion http.post para enviar los datos
		let enviar = this._http.post(this.urlArchivos, JSON.stringify(parametros)).pipe(map(res => res.json()));
		//llamamos a la funcion subscribe para completar la llamada php
		enviar.subscribe(
			result => {
				
			}
		);
  }
  
}
