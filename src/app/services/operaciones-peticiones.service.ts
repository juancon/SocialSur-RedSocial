import { Injectable } from '@angular/core';
//servicio que contiene las urls
import { UrlsService } from '../services/urls.service'
//Importamos el modulo http al servicio
import {Http, Response, Headers} from "@angular/http";
//Importamos la funcion map
import { map } from 'rxjs/operators';
//importamos la clase peticion
import {Peticion} from '../PeticionesAmistad/peticion-amistad';
//servivioc que me indica el usuario en local
import { RecogerUsuarioLocalService } from '../services/recoger-usuario-local.service';

@Injectable({
  providedIn: 'root'
})
export class OperacionesPeticionesService {
  private urlPeticiones:string;
  constructor(
    private _urls: UrlsService,
		private _http: Http
  ) {
    this.urlPeticiones = this._urls.getUrl("peticiones");
  }
}
