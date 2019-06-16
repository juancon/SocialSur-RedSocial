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
	public usuario:Usuario;
	//variables referentes a los mensajes
	public mensajes:Array<Mensaje> = new Array();
	//variables para mostrar o no contenido
	public mostrarRecibidos:boolean = true;
	public mostrarEnviados:boolean = false;
	public estiloEnviados:string;
	public estiloRecibidos:string;
	public textareaActivo:string = "";
	//variables referentes a responder/enviar mensajes
	public respondiendo:boolean = false;
	public nuevoMensaje:boolean = false;
	public respuesta:string = "";
	public mensaje:string = "";
	public destinatario:number = 0;
	//variables referentyes a los amigos
	public amigos:Array<Usuario> = new Array();


	constructor(
		public _mensajes: MensajesService,
		public _recogerUsuario: RecogerUsuarioLocalService,
		public _operacionesAmigos: OperacioneAmigosService
	) {
		this.usuario = this._recogerUsuario.getUsuario();
		this.obtenerMensajes();
		this.cambiarEstilo("recibidos");

		this.amigos = this._operacionesAmigos.obtenerAmigos3(this.amigos);
		// recogemos los mensajes cada 10 segundos
		setInterval(this.obtenerMensajes.bind(this),10000);
		
	}

	ngOnInit() {
	}
	// funcion para obtener los mensajes
	public obtenerMensajes():void{
		//si no se esta respondiendo se pueden recargar los mensajes
		if(!this.respondiendo && !this.nuevoMensaje){
			//llamamos al servicio para obtener los mensajes
			this.mensajes = this._mensajes.obtenerMensajes(this.mensajes,this.usuario.getId());
		}
	}

	//funciones que muestran u ocultan contenido
	public mostrarSoloRecibidos():void{
		//ocultamos los enviados y mostramos los recibidos
		this.mostrarRecibidos = true;
		this.mostrarEnviados = false;
		this.respondiendo = false;
		this.textareaActivo = "";
		//cambiamos es el estilo de la sollapa de cabecera
		this.cambiarEstilo("recibidos");
	}
	public mostrarSoloEnviados():void{
		//ocultamos los recibidos y mostramoslos enviados
		this.mostrarEnviados = true;
		this.mostrarRecibidos = false;
		this.respondiendo = false;		
		//cambiamos es el estilo de la sollapa de cabecera
		this.cambiarEstilo("enviados");
		this.textareaActivo = "";
	}
	//funcion que cambia el estido de la solapa de cabecera
	public cambiarEstilo(mostrar:string):void{
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
	public mensajeEnviado(mensaje:Mensaje):boolean{
		//comprobamos si el que envio el mensaje es el Usuario
		if(this.mostrarEnviados){
			if(mensaje.getIdusuariofrom() == this.usuario.getId()){
				return true
			}
		}
		//si no elo es devolvemos false
		return false
	}
	public mensajeRecibido(mensaje:Mensaje):boolean{
		//comprobamos si el que envio el mensaje es el Usuario
		if(mensaje.getIdusuarioto() == this.usuario.getId() && this.mostrarRecibidos){
			return true
		}
		//si no elo es devolvemos false
		return false
	}
	//funcion para marcar un mensaje como borrado
	public borrarMensaje(mensaje:Mensaje,tipomensaje:string):void{
		// llamamos a la funcion para marcar el mensaje como borrado
		this._mensajes.borrarMensaje(mensaje.getId(),tipomensaje);
		// recorremos el array de mensajes
		for(var i = 0; i < this.mensajes.length;i++){
			//borramos el mensaje del array
			if(this.mensajes[i].getId() == mensaje.getId()){
				this.mensajes.splice(i,1);
			}
		}

	}
	// funcion que comprueba si un mensaje esta leido
	public comprobarNoLeido(mensaje:Mensaje):boolean{
		//comprobamos si el usuario no ha leido el mensaje
		if(mensaje.getLeido() == 0){
			return true;
		}
		return false;
	}
	// funcion que marca un mensaje como leido
	public marcarLeido(mensaje:Mensaje):void{
		this._mensajes.marcarLeido(mensaje.getId());
		//cambiamos el mensaje a leido
		for(var i = 0; i < this.mensajes.length ; i++){
			if(this.mensajes[i].getId() == mensaje.getId()){
				this.mensajes[i].setLeido(1);
			}
		}
	}
	// funcion que muestra u oculta el cuadro de texto de responder
	public mostrarResponder(idmensaje:number):void{
		// si hay algun cuadro activo
		if(this.respondiendo){
			//lo ocultamos
			this.respondiendo = false;
			this.textareaActivo = "";
			this.respuesta = "";
		}else{
			//si no lo mostramos
			this.respondiendo = true;
			this.textareaActivo = idmensaje+"";
		}
	}

	//funcion para mostrar el textarea de respuesta
	public mostrarTextarea(idelemento: number): boolean {
		if (this.respondiendo) {
			if (this.textareaActivo == idelemento + "") {
				return true;
			}
		}
		return false;
	}
	// funcion para responder a un mensaje
	public responder(idusuarioto:number,idtextarea:string,mensaje){
		//comprobamos que se halla escrito una respuesta
		if(this.respuesta.trim() != ""){
			//enviamos el comentario a la base de datos
			this.enviarMensaje(this.usuario.getId(),idusuarioto,this.respuesta);
			//ocultamos el textarea y reseteamos los avriables
			this.respondiendo = false;
			this.respuesta = "";
			this.textareaActivo = "";
			// marcamos el mensaje como leido
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
	// funcion que indica si estamos escribiendo un mensaje
	public mensajeNuevo():void{
		//indicamos que estamos escribiendop un nuevo mensaje
		this.nuevoMensaje = true;
	}
	// funcion que envia un mensaje
	public enviar():void{
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
		
	//funcion para enviar un mensaje
	public enviarMensaje(idusuario:number,idusuarioto:number,mensaje:string):void{
		// llamamso al servicio que envia el mensaje
		this._mensajes.enviarMensaje(idusuario,idusuarioto,mensaje);
		// oculatmos el mensaje
		this.textareaActivo = "";
	}

	//funcion para cerrar la ventana modal
	public cerrarModal(): void {
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
	// funcion que compreba si hay mensajes recibidos
	public hayRecibidos():boolean{
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
	// funcion que comprueba si hay mensajes enviados
	public hayEnviados():boolean{
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
