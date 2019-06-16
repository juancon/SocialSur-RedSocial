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
	public urlRecogerAmigos:string;
	public urlGetConversacion:string;
	public urlEnviarMensajeChat:string;
	public usuario:Usuario;
	//variables refrentes a los amigos y el chat
	public amigos:Array<Usuario> = new Array();
	public amigosConectados:Array<Usuario> = new Array();
	public amigoHablando:Usuario;
	public idAmigoActual:number = 0;
	// variable que enviara datos al componente chat
	@Output() enviarHablando:EventEmitter<boolean> = new EventEmitter<boolean>();
	public hablando:boolean = false;
	public conversaciones:Array<string>;
	public conversacionesSinLeer:Array<string> = new Array();
	public mensaje:string = "";

	constructor(
		public _recogerUsuario: RecogerUsuarioLocalService,
		public _http: Http,
		public _urls: UrlsService,
		public _operacionesFechas: OperacionesFechasService,
		public _operacionesAmigos: OperacioneAmigosService
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
	public recogerAmigos():void{
		//llamamos al servicio que recoge a los amigos
		this.amigos = this._operacionesAmigos.obtenerAmigos(this.amigos);
	}

	//mostrar el chat
	public mostrarChat():void{
		// cambiamos el estado de hablando a true para mostrar el chat
		this.hablando = true;
		//enviamos la variable al componente chat
		this.enviarHablando.emit(this.hablando);
	}
	//ocultar el chat
	public ocultarChat():void{
		// cambiamos el estado de hablando a true para ocultar el chat
		this.hablando = false;
		//enviamos la variable al componente chat
		this.enviarHablando.emit(this.hablando);
	}
	//funcion para mostrar el chat de la persona indicada
	public hablarAmigo(amigo:Usuario):void{
		// preguntamos si le estamos hablando ya a un amigo
		if(typeof(this.amigoHablando) == "undefined"){
			// si no, guardamos el amigo
			this.amigoHablando = amigo;
			// mostramos el chat
			this.mostrarChat();
			// guardamos el amigo en sesion
			sessionStorage.setItem("amigoHablando",JSON.stringify(amigo));

		}else{
			// comprobamos si le estamos hablando al mismo amigo
			if(this.amigoHablando.getId() == amigo.getId()){
				// si es asi simplemente mostramos u ocultamos el chat
				if(this.hablando){
					this.ocultarChat();
				}else{
					this.mostrarChat();
				}
			}else{
				// si no, guardamos el amigo
				this.amigoHablando = amigo;
				// mostramos el chat
				this.mostrarChat();
				// guardamos el amigo en sesion
				sessionStorage.setItem("amigoHablando",JSON.stringify(amigo));
			}
		}
		//marcamos la conversacion con el amigo como leida
		this.marcarConversacionLeido();
	}
	// funcion que marca las conversaciones como leidas
	public marcarConversacionLeido(){
		//enviamos los parametros al fichero PHP
		let parametros = {
			id : this.usuario.getId(),
			idAmigo : this.amigoHablando.getId(),
			accion : "marcarleido"
		}
		//funcion http.post para enviar los datos
		let leidos = this._http.post(this.urlGetConversacion, JSON.stringify(parametros)).pipe(map(res => res.json()));
		//llamamos a la funcion subscribe para completar la llamada a PHP
		leidos.subscribe(result => {});
	}

	//comprobamos quien envia el mensaje
	public comprobarUsuarioFrom(id:number):boolean{
		if( id == this.usuario.getId()){
			return true;
		}else{
			return false;
		}
	}

	//Borrar el texto en el cuadro de mensaje del chat
	public borrarText():void{
		this.mensaje = "";
	}
	//funcion para obtener los amigos conectados
	public obtenerAmigosConectados():void{
		//creamos un array auxiliar donde guardaremos los amigos conectado
		let amigosAux = [];
		//rrecorremos el array de amigos
		for (var i = 0; i < this.amigos.length; i++) {
			//si esta conectado lo agregamos al array
			if(this.amigos[i].getConectado() == "1"){
				amigosAux.push(this.amigos[i]);
			}
		}
		//cuando tengamos todos los amigos conectado simplemnete comparamos la
		//longitud del array de miagos conectado con el auxiliar para comprobar
		//que se hayan desconectado o conectado amigos nuevos

		if(this.amigosConectados.length != amigosAux.length){
			this.amigosConectados = amigosAux;
		}
	}
	//funcion para obtener las conversaciones sin leer
	public getConversacionesSinLeer():void{
		// variable con los paremtros que enviaremos a PHP
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
				// convertimos las fechas segun si son de hoy
				this.conversacionesSinLeer = this._operacionesFechas.convertirfechas(datos);
			}
		);
	}
	// funcion que comprueba si hay hay una conversacion sin leer con un amigo
	public comprobarSinLeido(idusuario:number):boolean{
		// recorremos el array de conversaciones sin leer
		for(var i = 0; i < this.conversacionesSinLeer.length; i++){
			// comprobamos que la conversacion este en el array de sin leer
			if(idusuario == this.conversacionesSinLeer[i]["iduserfrom"] || idusuario == this.conversacionesSinLeer[i]["iduserto"]){
				return true;
			}
		}
		return false;
	}

	//funcion pra comprobar si hay amigos conectado
	public comprobarAmigosConectado():boolean{
		//si el array es nulo o no hay datos devolvemos false
		if(this.amigosConectados == null || this.amigosConectados.length == 0){
			return false;
		}

		return true;
	}
}
