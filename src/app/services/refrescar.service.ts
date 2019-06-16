import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

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
