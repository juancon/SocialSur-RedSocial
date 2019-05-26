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
	//variables referentes a responder mensajes
	private respondiendo:boolean = false;
	private respuesta:string = "";


	constructor(
		private _mensajes: MensajesService,
		private _recogerUsuario: RecogerUsuarioLocalService
	) {
		this.usuario = this._recogerUsuario.getUsuario();
		this.obtenerMensajes();
		this.cambiarEstilo("recibidos");

		setInterval(this.obtenerMensajes.bind(this),15000);
		
	}

	ngOnInit() {
		setInterval(this.ocultar.bind(this),1);
	}

	private ocultar():void{
		//si no se esta respondiendo se puden ocultar los textareas
		if(!this.respondiendo){
			$('[id^="responder"]').hide();
		}
		//recogemos los textareas de las respuestas
	}

	private obtenerMensajes():void{
		//si no se esta respondiendo se pueden recargar los mensajes
		if(!this.respondiendo){
			this.mensajes = this._mensajes.obtenerMensajes(this.mensajes,this.usuario.getId());
		}
	}
	
	//funciones que muestran u ocultan contenido
	private mostrarSoloRecibidos():void{
		//ocultamos los recibidos y mostramoslos enviados
		this.mostrarRecibidos = true;
		this.mostrarEnviados = false;
		this.respondiendo = false;
		this.cambiarEstilo("recibidos");
	}
	private mostrarSoloEnviados():void{
		//ocultamos los enviados y mostramoslos recibidos
		this.mostrarEnviados = true;
		this.mostrarRecibidos = false;
		this.respondiendo = false;		
		this.cambiarEstilo("enviados");
	}

	private cambiarEstilo(mostrar:string):void{
		// le quitamos el estido a todos por defecto
		this.estiloEnviados = "";
		this.estiloRecibidos = "";
		// dependiendo de a que boton este seleccionado le añadimos el estilo
		if(mostrar == "enviados"){
			this.estiloEnviados = "seleccionado";
		}else if(mostrar == "recibidos"){
			this.estiloRecibidos = "seleccionado";
		}
	}
	// funciones para saber si un mensaje ha sido enviado o recibido y mostrarlo o no
	private mensajeEnviado(mensaje:Mensaje):boolean{
		//comprobamos si el que envio el mensaje es el Usuario
		if(this.mostrarEnviados){
			if(mensaje.getIdusuariofrom() == this.usuario.getId()){
				return true
			}
		}
		//si no elo es devolvemos false
		return false
	}
	private mensajeRecibido(mensaje:Mensaje):boolean{
		//comprobamos si el que envio el mensaje es el Usuario
		if(mensaje.getIdusuarioto() == this.usuario.getId() && this.mostrarRecibidos){
			return true
		}
		//si no elo es devolvemos false
		return false
	}

	private borrarMensaje(mensaje:Mensaje,tipomensaje:string):void{
		this._mensajes.borrarMensaje(mensaje.getId(),tipomensaje);

		for(var i = 0; i < this.mensajes.length;i++){
			//borramos el mensaje del array
			if(this.mensajes[i].getId() == mensaje.getId()){
				this.mensajes.splice(i,1);
			}
		}

	}

	private comprobarNoLeido(mensaje:Mensaje):boolean{
		//comprobamos si el usuario no ha leido el mensaje
		if(mensaje.getLeido() == 0){
			return true;
		}
		return false;
	}

	private marcarLeido(mensaje:Mensaje):void{
		this._mensajes.marcarLeido(mensaje.getId());
		//refrescamos el array
		this.obtenerMensajes();
	}

	private mostrarResponder(idmensaje:number):void{
		if(this.respondiendo){
			this.respondiendo = false;
			this.respuesta = "";
		}else{
			this.respondiendo = true;
			//@ts-ignore
			$("#responder"+idmensaje).show();
		}

		this.ocultar();
	}

	private enviar(idusuarioto:number,idmensaje:number){
		//enviamos el comentario a la base de datos
		this.enviarMensaje(this.usuario.getId(),idusuarioto,this.respuesta);
		//ocultamos el textarea y reseteamos los avriables
		this.respondiendo = false;
		this.respuesta = "";
		
		//actualizamos el array actual
		this.obtenerMensajes();
	}


	private enviarMensaje(idusuario:number,idusuarioto:number,mensaje:string):void{
		this._mensajes.enviarMensaje(idusuario,idusuarioto,mensaje);
	}
}
