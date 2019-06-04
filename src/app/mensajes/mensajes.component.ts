import { Component, OnInit } from '@angular/core';
//importamos la clase mensaje
import {Mensaje} from '../Mensaje/mensaje';
//importamos la clase usuario
import {Usuario } from '../Usuario/usuario';
//importamos el servicio con las funciones de los mensajes
import { MensajesService } from '../services/mensajes.service';
//importamos el servicio que me permite recoger el usuario en local
import { RecogerUsuarioLocalService } from '../services/recoger-usuario-local.service';
//importamos el servicio que contine las funciones referentes a los amigos
import { OperacioneAmigosService } from '../services/operacione-amigos.service';

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
	//variables referentes a responder/enviar mensajes
	private respondiendo:boolean = false;
	private nuevoMensaje:boolean = false;
	private respuesta:string = "";
	private mensaje:string = "";
	private destinatario:number = 0;
	//variables referentyes a los amigos
	private amigos:Array<Usuario> = new Array();


	constructor(
		private _mensajes: MensajesService,
		private _recogerUsuario: RecogerUsuarioLocalService,
		private _operacionesAmigos: OperacioneAmigosService
	) {
		this.usuario = this._recogerUsuario.getUsuario();
		this.obtenerMensajes();
		this.cambiarEstilo("recibidos");

		this.amigos = this._operacionesAmigos.obtenerAmigos(this.amigos);
		setInterval(this.obtenerMensajes.bind(this),10000);
		
	}

	ngOnInit() {
		setTimeout(this.ocultar.bind(this),250);
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
		if(!this.respondiendo && !this.nuevoMensaje){
			this.mensajes = this._mensajes.obtenerMensajes(this.mensajes,this.usuario.getId());
			setTimeout(this.ocultar.bind(this),50);
		}
	}
	
	//funciones que muestran u ocultan contenido
	private mostrarSoloRecibidos():void{
		//ocultamos los recibidos y mostramoslos enviados
		this.mostrarRecibidos = true;
		this.mostrarEnviados = false;
		this.respondiendo = false;
		this.cambiarEstilo("recibidos");
		setTimeout(this.ocultar.bind(this),1);
	}
	private mostrarSoloEnviados():void{
		//ocultamos los enviados y mostramoslos recibidos
		this.mostrarEnviados = true;
		this.mostrarRecibidos = false;
		this.respondiendo = false;		
		this.cambiarEstilo("enviados");
		this.ocultar();
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
		//cambiamos el mensaje a leidp
		for(var i = 0; i < this.mensajes.length ; i++){
			if(this.mensajes[i].getId() == mensaje.getId()){
				this.mensajes[i].setLeido(1);
			}
		}
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

	private responder(idusuarioto:number,idtextarea:string,mensaje){
		//comprobamos que se halla escrito una respuesta
		if(this.respuesta.trim() != ""){
			//enviamos el comentario a la base de datos
			this.enviarMensaje(this.usuario.getId(),idusuarioto,this.respuesta);
			//ocultamos el textarea y reseteamos los avriables
			this.respondiendo = false;
			this.respuesta = "";
			this.marcarLeido(mensaje);
			
			//actualizamos el array actual
			this.obtenerMensajes();
		}else{
			//indicamos al usuario que debe de introducir una respuesta
			$("#"+idtextarea).addClass("parpadear");
			setTimeout(function(){
				$("#"+idtextarea).removeClass("parpadear");
			},5000)
		}
	}

	private mensajeNuevo():void{
		//indicamos que estamos escribiendop un nuevo mensaje
		this.nuevoMensaje = true;
	}

	private enviar():void{
		//comprobamos que se halla escrito una respuesta
		if(this.mensaje.trim() != "" && this.destinatario != 0){
			//enviamos el comentario a la base de datos
			this.enviarMensaje(this.usuario.getId(),this.destinatario,this.mensaje);
			//cerramos la ventana y reinicamos las variables
			this.cerrarModal();
		}else{

			//indicamos al usuario que no ha introducido
			if(this.mensaje.trim() == ""){
				$("#mensaje").addClass("parpadear");
				setTimeout(function(){
					$("#mensaje").removeClass("parpadear");
				},5000)
			}

			if(this.destinatario == 0){
				$("#para").addClass("parpadear");
				setTimeout(function(){
					$("#para").removeClass("parpadear");
				},5000)
			}
		}
	}
	  

	private enviarMensaje(idusuario:number,idusuarioto:number,mensaje:string):void{
		this._mensajes.enviarMensaje(idusuario,idusuarioto,mensaje);
		this.ocultar();
	}

	//funcion para cerrar la ventana modal
	private cerrarModal(): void {
		//recorremos la ventana modal y la cerramos
		//usar esta linea puede dar error ya que modal no es una funcion jquery si no una del propio
		//componente que esta recogiendo con @ts-ignore se puede hacer que tipe script ignore este error
		//@ts-ignore
		$('#enviarmensaje').modal('hide');
		//reinicamos sus variables
		this.nuevoMensaje = false;
		this.destinatario = 0;
		this.mensaje = "";
	}

	private hayRecibidos():boolean{
		if(this.mostrarRecibidos){
			//comprobamos si hay mensajes recibidor
			for (var i = 0; i < this.mensajes.length; i++){
				if(this.mensajeRecibido(this.mensajes[i])){
					return true;
				}
			}

			return false;
		}
		return true;
	}

	private hayEnviados():boolean{
		if(this.mostrarEnviados){
			//comprobamos si hay mensajes recibidor
			for (var i = 0; i < this.mensajes.length; i++){
				if(this.mensajeEnviado(this.mensajes[i])){
					return true;
				}
			}
			return false
		}

		return true;
	}
	
}
