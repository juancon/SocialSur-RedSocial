import { RefrescarService } from './refrescar.service';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class CerrarSesionService {

	constructor(
		private _refrescar: RefrescarService
	){}

	public cerrarSesion():void{
		sessionStorage.clear();		
		localStorage.clear();
		//refrescamos la página
		setTimeout(this._refrescar.refrescar,500);
	}

}
