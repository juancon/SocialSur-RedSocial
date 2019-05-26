import { Component, OnInit, ViewChild, Input } from '@angular/core';
//Importamos el modulo http al servicio
import {Http, Response, Headers} from "@angular/http";
//Importamos la funcion map
import { map } from 'rxjs/operators';
//Importamos el servicio de que cierra sesion
import { CerrarSesionService } from '../services/cerrar-sesion.service';
//Importamos el servicio para refrescar la pantalla
import { RefrescarService } from '../services/refrescar.service';
//Importamos el servicio para recoger el usuario en local
import { RecogerUsuarioLocalService } from '../services/recoger-usuario-local.service';
//Importamos el servicio para manipular fechas
import { OperacionesFechasService } from '../services/operaciones-fechas.service';
//importamos el servicio que contiene las urls
import {UrlsService} from '../services/urls.service';
//Importamos la clase usuario
import { Usuario } from '../Usuario/usuario';
//Importamos la clase mensaje
import { Mensaje } from '../Mensaje/mensaje';
//importamos el componente chat
import {ChatComponent} from "../chat/chat.component";
//importamos el modulo que nos permite redireccionar
import { Router, ActivatedRoute, Params,NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-barra-navegacion',
  templateUrl: './barra-navegacion.component.html',
  styleUrls: ['./barra-navegacion.component.css'],
  providers: [CerrarSesionService, RefrescarService, RecogerUsuarioLocalService, UrlsService]
})
export class BarraNavegacionComponent implements OnInit {
	private urlGetNumNotificaciones:string;
	private urlGetConversacion:string;
	private urlEnviarMensajeChat:string;
	private usuario:Usuario;
	//variables referentes a las notificaciones
	private peticionesIco:string;
	private numPeticiones:string;
	//variables referentes a los mensajes
	private mensajesIco:string;
	private numMensajes:string;
	//variables referentes al chat
	@ViewChild('chat') chat:ChatComponent; //variabla para recoger cuando se ha activado el chat
	private hablando:boolean = false;
	private amigoHablando:Usuario ;
	private conversaciones:Array<string>;
	private mensaje:string = "";
	//variable referente a buscar
	private buscar:string = "";

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _cerrarSesion: CerrarSesionService,
		private _refrescar:RefrescarService,
		private _recogerUsuario: RecogerUsuarioLocalService,
		private _urls: UrlsService,
		private _http: Http,
		private _operacionesFechas: OperacionesFechasService
	) { 
		this.urlGetNumNotificaciones = this._urls.getUrl("getNumNotificaciones");
		this.urlGetConversacion = this._urls.getUrl("getConversacion");
		this.urlEnviarMensajeChat = this._urls.getUrl("enviarMensajeChat");
		this.usuario = _recogerUsuario.getUsuario();
		this.obtenerNotificaciones();
		this.obtenerMensajes();
		setInterval(this.obtenerNotificaciones.bind(this),10000);
		setInterval(this.obtenerMensajes.bind(this),10000);
	}

	ngOnInit() {
		setInterval(this.obtenerHablando.bind(this),1000)
	}


	private obtenerHablando():void{
		this.amigoHablando = this._recogerUsuario.getAmigoHablando();
		
		setTimeout(this.mostrarChat.bind(this),500)
		this.getMensajesChat();
	}

	private mostrarChat():void{
		this.chat.enviarHablando
		.subscribe(
			res =>
			{
				this.hablando = res;
			}
		);
	}

	//ocultar el chat
	private ocultarChat():void{
		this.hablando = false;
	}

	private getMensajesChat():void{
		//recogemos la id de nuestro usuario y del usuario con quien queremos hablar
		let parametros = {
			id : this.usuario.getId(),
			idAmigo : this.amigoHablando.getId(),
			accion : "getconversacion"
		}
		//funcion http.post para enviar los datos
		let conversaciones = this._http.post(this.urlGetConversacion, JSON.stringify(parametros)).pipe(map(res => res.json()));
		//llamamos a la funcion subscribe para poder obtener los datos que ha devuelto php
		conversaciones.subscribe(
			result => {
				//recogemos solo la respuesta del PHP y la pasamos a una variable
				let datos = result;
				this.conversaciones = this._operacionesFechas.convertirfechas(datos);
			}
		);
	}
	

	//funcion para cerrar sesion
	private cerrarSesion():void{
		//redirigimos al usuario
		this._cerrarSesion.cerrarSesion(this.usuario.getId());
		//refrescamos la página
		setTimeout(this._refrescar.refrescar,500);
	}

	//enviar mensaje
	private enviar():void{
		if(this.mensaje.length-1 > 0){
			//recogemos los parametros que vamos a enviar
			let parametros = {
				id : this.usuario.getId(),
				idAmigo : this.amigoHablando.getId(),
				mensaje : this.mensaje,
			}
			//funcion http.post para enviar los datos
			let nuevoMensaje = this._http.post(this.urlEnviarMensajeChat, JSON.stringify(parametros)).pipe(map(res => res.json()));
			//llamamos a la funcion subscribe para poder obtener los datos que ha devuelto php
			nuevoMensaje.subscribe(
				result => {
					//recogemos solo la respuesta del PHP y la pasamos a una variable
					let datos = result;
					this.getMensajesChat();
					
					
				}
			);
		}
		this.borrarText();
	}
	//Borrar el texto en mi chat
	private borrarText():void{
		this.mensaje = "";
	}
	//comprobamos quien envia el mensaje
	private comprobarUsuarioFrom(id:number):boolean{
		if( id == this.usuario.getId()){
			return true;
		}else{
			return false;
		}
	}

	//obtener las notificaciones
	private obtenerNotificaciones():void{
		let parametros = {
			id : this.usuario.getId(),
			tipo : "peticiones"
		}
		//funcion http.post para enviar los datos
		let notificaciones = this._http.post(this.urlGetNumNotificaciones, JSON.stringify(parametros)).pipe(map(res => res.json()));
		//llamamos a la funcion subscribe para poder obtener los datos que ha devuelto php
		notificaciones.subscribe(
			result => {
				//recogemos solo la respuesta del PHP y la pasamos a una variable
				let datos = result;
				//llamamos a la funcion que cambia el icono y el titulo de las notificaciones
				//pasandole el resultado de php
				this.cambiarIcoNoti(datos['total'])
				
			}
		);
	}

	public cambiarIcoNoti(num:number):void{
		//Asignamos el icono de varias peticiones de amistad por defecto
		this.peticionesIco = "../../assets/iconos/alarm-1.svg";
		if(num == 0){
			//si no hay peticiones de amistad cambiamos el icono y el titulo de la imagen
			this.peticionesIco = "../../assets/iconos/alarm.svg";
			this.numPeticiones = "0 Notificaciones Nuevas";
		}else if(num == 1){
			//dependiendo de si hay una o mas peticiones de amistad ponemos un titulo u otro
			this.numPeticiones = num+" Notificación Nueva";
		}else{	
			this.numPeticiones = num+" Notificaciones Nuevas";
		}
	}

	//obtener los mensajes
	private obtenerMensajes():void{
		let parametros = {
			id : this.usuario.getId(),
			tipo : "mensajes"
		}
		//funcion http.post para enviar los datos
		let mensajes = this._http.post(this.urlGetNumNotificaciones, JSON.stringify(parametros)).pipe(map(res => res.json()));
		//llamamos a la funcion subscribe para poder obtener los datos que ha devuelto php
		mensajes.subscribe(
			result => {
				//recogemos solo la respuesta del PHP y la pasamos a una variable
				let datos = result;
				//llamamos a la funcion que cambia el icono y el titulo del icono de mensajes
				//pasandole el resultado de php
				this.cambiarIcoMensajes(datos['total'])
				
			}
		);
	}

	public cambiarIcoMensajes(num:number):void{
		//Asignamos el icono de mensajes nuevos por defecto
		this.mensajesIco = "../../assets/iconos/mensaje-1.svg";
		if(num == 0){
			//si no hay mensajes cambiamos el icono y el titulo de la imagen
			this.mensajesIco = "../../assets/iconos/mensaje.svg";
			this.numMensajes = "0 Mensajes Nuevos";
		}else if(num == 1){
			//dependiendo de si hay una o mas mensajes ponemos un titulo u otro
			this.numMensajes = num+" Mensaje Nuevo";
		}else{	
			this.numMensajes = num+" Mensajes Nuevos";
		}
	}

	public buscarUsuario(){
		if(this.buscar.trim() != ""){
			let url = "/buscar?nombre="+this.buscar.trim();
			window.location.href = url;
		}
	}

}
