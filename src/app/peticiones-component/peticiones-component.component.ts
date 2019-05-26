import { Component, OnInit } from '@angular/core';
//importamos la clase petcion
import { Peticion } from './../PeticionesAmistad/peticion-amistad';
//importamos la clase usuario
import {Usuario } from '../Usuario/usuario';
//importamos el servicio con las funciones de los mensajes
import { OperacionesPeticionesService } from '../services/operaciones-peticiones.service';
//importamos el servicio que me permite recoger el usuario en local
import { RecogerUsuarioLocalService } from '../services/recoger-usuario-local.service';
//importamos el servicio que me permite redirigr
import {RefrescarService} from '../services/refrescar.service'

@Component({
  selector: 'app-peticiones-component',
  templateUrl: './peticiones-component.component.html',
  styleUrls: ['./peticiones-component.component.css']
})
export class PeticionesComponent implements OnInit {
	//variables referentes a los usuarios
	private usuario:Usuario;
	//variables referentes a los mensajes
	private peticiones:Array<Peticion> = new Array();


	constructor(
		private _redirigir: RefrescarService,
		private _peticiones: OperacionesPeticionesService,
		private _recogerUsuario: RecogerUsuarioLocalService,
	) {
		this.usuario = this._recogerUsuario.getUsuario();
		this.obtenerPeticiones();
		setInterval(this.obtenerPeticiones.bind(this),10000);
		
	}

	ngOnInit() {
		
	}

	private obtenerPeticiones():void{
		//si no se esta respondiendo se pueden recargar los mensajes
		this.peticiones = this._peticiones.obtenerPeticiones(this.usuario.getId(),this.peticiones);
	}

	private responder(idusuariofrom:number,respuesta:string):void{
		for(var i = 0; i < this.peticiones.length; i++){
			if(this.peticiones[i].getOtroUsuario()["id"] == idusuariofrom){
				this.peticiones.splice(i,1)
			}
		}
		//llamamos al servicio encargado de aceotar las peticiones
		this._peticiones.responder(idusuariofrom,this.usuario.getId(),respuesta);
		//eliminamos la peticion del array
	}
	private comprobarMensaje(peticion:Peticion):boolean{
		if(peticion.getMensaje() == null && peticion.getMensaje() == ""){
			return false;
		}

		return true;
	}

	private redirigir(apodo:string):void{
		let url = "/usuario?apodo="+apodo;
		window.location.href = url;
	}

}
