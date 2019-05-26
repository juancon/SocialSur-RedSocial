import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RefrescarService {

	constructor(
		private router: Router
	) { }

	//metodo para refrescar la ventana
	public refrescar(): void {
		window.location.reload();
	}

	public redirigirByApodo(apodo:string){
		this.router.navigate(['/usuario/'+apodo])
	}
}
