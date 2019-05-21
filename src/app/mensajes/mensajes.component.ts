import { Component, OnInit } from '@angular/core';
//importamos la clase mensaje
import {Mensaje} from '../Mensaje/mensaje';
//importamos la clase usuario
import {Usuario } from '../Usuario/usuario';
//importamos el servicio con las funciones de los mensajes
import { MensajesService } from '../services/mensajes.service';
//importamos el servicio que me permite recoger el usuario en local
import { RecogerUsuarioLocalService } from '../services/recoger-usuario-local.service';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {
	//variables referentes a los usuarios
	private usuario:Usuario;
	//variables referentes a los mensajes
	private mensajes:Array<Mensaje> = new Array();
	//variables para mostrar o no contenido
	private mostrarRecibidos:boolean = true;
	private mostrarEnviados:boolean = false;
	private estiloEnviados:string;
	private estiloRecibidos:string;


	constructor(
		private _mensajes: MensajesService,
		private _recogerUsuario: RecogerUsuarioLocalService
	) {
		this.usuario = this._recogerUsuario.getUsuario();
		this.mensajes = this._mensajes.obtenerMensajes(this.mensajes,this.usuario.getId());
		this.cambiarEstilo("recibidos");
	}

	ngOnInit() {
	}

	
	//funciones que muestran u ocultan contenido
	private mostrarSoloRecibidos():void{
		//ocultamos los recibidos y mostramoslos enviados
		this.mostrarRecibidos = true;
		this.mostrarEnviados = false;

		this.cambiarEstilo("recibidos");
	}
	private mostrarSoloEnviados():void{
		//ocultamos los enviados y mostramoslos recibidos
		this.mostrarEnviados = true;
		this.mostrarRecibidos = false;
		
		this.cambiarEstilo("enviados");
	}

	private cambiarEstilo(mostrar:string):void{
		//le quitamos el estido a todos por defecto
		this.estiloEnviados = "";
		this.estiloRecibidos = "";
		//dependiendo de a que boton este seleccionado le añadimos el estilo
		if(mostrar == "enviados"){
			this.estiloEnviados = "seleccionado";
		}else if(mostrar == "recibidos"){
			this.estiloRecibidos = "seleccionado";
		}
	}
	//funciones para saber si un mensaje ha sido enviado o recibido y mostrarlo o no
	private mensajeEnviado(mensaje:Mensaje):boolean{
		//comprobamos si el que envio el mensaje es el Usuario
		if(mensaje.getIdusuariofrom() == this.usuario.getId() && this.mostrarEnviados){
			return true
		}
		//si no elo es devolvemos false
		return false
	}
	private mensajeRecibido(mensaje:Mensaje):boolean{
		//comprobamos si el que envio el mensaje es el Usuario
		if(mensaje.getIdusuariofrom() == this.usuario.getId() && this.mostrarRecibidos){
			return true
		}
		//si no elo es devolvemos false
		return false
	}

	aCadena(mensaje:Mensaje){
		console.log(JSON.stringify(mensaje));
	}
}
