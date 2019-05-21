import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RefrescarService {

	constructor() { }

	//metodo para refrescar la ventana
	public refrescar(): void {
		window.location.reload();
	}
}
