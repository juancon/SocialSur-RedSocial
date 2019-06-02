import { Component, OnInit, Output, EventEmitter } from '@angular/core';
//Importamos el modulo http al servicio
import {Http, Response, Headers} from "@angular/http";
//Importamos la funcion map
import { map } from 'rxjs/operators';
//importamos el servicio que contiene las urls
import {UrlsService} from '../services/urls.service';
//Importamos el servicio para recoger el usuario en local
import { RecogerUsuarioLocalService } from '../services/recoger-usuario-local.service';
//Importamos el servicio para recoger el usuario en local
import { OperacioneAmigosService } from '../services/operacione-amigos.service';
//Importamos el servicio que realiza operaciones con las fechas
import { OperacionesFechasService } from '../services/operaciones-fechas.service';
//Importamos la clase usuario
import { Usuario } from '../Usuario/usuario';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [RecogerUsuarioLocalService, UrlsService, OperacionesFechasService]
})
export class ChatComponent implements OnInit {
	//urls
	private urlRecogerAmigos:string;
	private urlGetConversacion:string;
	private urlEnviarMensajeChat:string;
	private usuario:Usuario;
	//variables refrentes a los amigos y el chat
	private amigos:Array<Usuario> = new Array();
	private amigosConectados:Array<Usuario> = new Array();
	private amigoHablando:Usuario;
	private idAmigoActual:number = 0;
	@Output() enviarHablando:EventEmitter<boolean> = new EventEmitter<boolean>();
	private hablando:boolean = false;
	private conversaciones:Array<string>;
	private conversacionesSinLeer:Array<string> = new Array();
	private mensaje:string = "";

	constructor(
		private _recogerUsuario: RecogerUsuarioLocalService,
		private _http: Http,
		private _urls: UrlsService,
		private _operacionesFechas: OperacionesFechasService,
		private _operacionesAmigos: OperacioneAmigosService
	) {
		this.usuario = this._recogerUsuario.getUsuario();
		this.urlRecogerAmigos = this._urls.getUrl("recogerAmigos");
		this.urlGetConversacion = this._urls.getUrl("getConversacion");
		this.urlEnviarMensajeChat = this._urls.getUrl("enviarMensajeChat");
		setInterval(this.getConversacionesSinLeer.bind(this),1000);
		//metemos en un intervalo a las funciones que recogen a los amigos y a los amigos conectados
		setInterval(this.recogerAmigos.bind(this),500);
		setInterval(this.obtenerAmigosConectados.bind(this),900);
	}

	ngOnInit() {
	}
	//recoger los amigos que tiene el usuario
	private recogerAmigos():void{
		this.amigos = this._operacionesAmigos.obtenerAmigos(this.amigos);
	}
	
	//mostrar el chat
	private mostrarChat():void{
		this.hablando = true;
		this.enviarHablando.emit(this.hablando);
	}
	//ocultar el chat
	private ocultarChat():void{
		this.hablando = false;
		this.enviarHablando.emit(this.hablando);
	}
	//funcion para mostrar el chat de la persona indicada
	private hablarAmigo(amigo:Usuario):void{
		if(typeof(this.amigoHablando) == "undefined"){
			this.amigoHablando = amigo;
			this.mostrarChat();
			sessionStorage.setItem("amigoHablando",JSON.stringify(amigo));

		}{
			if(this.amigoHablando.getId() == amigo.getId()){
				if(this.hablando){
					this.ocultarChat();
				}else{
					this.mostrarChat();
				}
			}else{
				this.amigoHablando = amigo;
				this.mostrarChat();
				sessionStorage.setItem("amigoHablando",JSON.stringify(amigo));
			}
		}
		this.marcarConversacionLeido();
	}

	private marcarConversacionLeido(){
		//marcamos las conversaciones como leidas
		let parametros = {
			id : this.usuario.getId(),
			idAmigo : this.amigoHablando.getId(),
			accion : "marcarleido"
		}
		//funcion http.post para enviar los datos
		let leidos = this._http.post(this.urlGetConversacion, JSON.stringify(parametros)).pipe(map(res => res.json()));
		//llamamos a la funcion subscribe para poder obtener los datos que ha devuelto php
		leidos.subscribe(
			result => {
			}
		);
	}

	//comprobamos quien envia el mensaje
	private comprobarUsuarioFrom(id:number):boolean{
		if( id == this.usuario.getId()){
			return true;
		}else{
			return false;
		}
	}

	//Borrar el texto en mi chat
	private borrarText():void{
		this.mensaje = "";
	}
	//funcion para obtener los amigos conectados
	private obtenerAmigosConectados():void{
		//creamos un array auxiliar donde guardaremos los amigos conectado
		let amigosAux = [];
		//rrecorremos el array de amigos
		for (var i = 0; i < this.amigos.length; i++) {
			//si esta conectadolo agregamos al array
			if(this.amigos[i].getConectado() == "1"){
				amigosAux.push(this.amigos[i]);
			}
		}
		//cuando tengamos todos los amigos conectado simplemnete comparamos la longitud del array de miagos conectado con el auxiliar para comprobar que se hayan desconectado o conectado amigos nuevos

		if(this.amigosConectados.length != amigosAux.length){
			this.amigosConectados = amigosAux;
		}
	}

	private getConversacionesSinLeer():void{
		let parametros = {
			id : this.usuario.getId(),
			accion : "getconversaciones"
		}
		//funcion http.post para enviar los datos
		let conversaciones = this._http.post(this.urlGetConversacion, JSON.stringify(parametros)).pipe(map(res => res.json()));
		//llamamos a la funcion subscribe para poder obtener los datos que ha devuelto php
		conversaciones.subscribe(
			result => {
				//recogemos solo la respuesta del PHP y la pasamos a una variable
				let datos = result;
				this.conversacionesSinLeer = this._operacionesFechas.convertirfechas(datos);
			}
		);
	}

	private comprobarSinLeido(idusuario:number):boolean{
		for(var i = 0; i < this.conversacionesSinLeer.length; i++){
			if(idusuario == this.conversacionesSinLeer[i]["iduserfrom"] || idusuario == this.conversacionesSinLeer[i]["iduserto"]){
				return true;
				break;
			}
		}
		return false;
	}

	//funcion pra comprobar si hay amigos conectado
	private comprobarAmigosConectado():boolean{
		//si el array es nulo o no hay datos devolvemos false
		if(this.amigosConectados == null || this.amigosConectados.length == 0){
			return false;
		}

		return true;
	}
}
