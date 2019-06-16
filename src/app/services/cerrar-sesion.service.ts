import { RefrescarService } from './refrescar.service';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class CerrarSesionService {

	constructor(
		private _refrescar: RefrescarService
	){}
	//funncion para borrar sesion
	public cerrarSesion():void{
		//borramos tanto los datos de sesion como los locales
		sessionStorage.clear();		
		localStorage.clear();
		//refrescamos la página
		setTimeout(this._refrescar.refrescar,500);
	}

}
