import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlsService {
	//direccion del servidor
	//casa
	private servidor:string = "http://192.168.1.150/";
	//otros
	//private servidor:string = "http://192.168.114.56/";

	//array que contiene los nombres y las funciones de los ficheros php
	private urls:Array<{nombre:string,fichero:string}>;

	constructor() {
		//añadimos el nombre del fichero y su accion al array
		this.urls = [
			 {nombre: "login", fichero: "login.php"},
			 {nombre: "crearUsuario", fichero: "crearUsuario.php"},
			 {nombre: "comprobarCorreo", fichero: "comprobarCorreo.php"},
			 {nombre: "logout", fichero: "logout.php"},
			 {nombre: "buscarUsuario", fichero: "buscarUsuario.php"},
			 {nombre: "crearUsuario", fichero: "crearUsuario.php"},
			 {nombre: "modificarUsuario", fichero: "modificarUsuario.php"},
			 {nombre: "cambiarAvatar", fichero: "cambiarAvatar.php"},
			 {nombre: "getNumNotificaciones", fichero: "getNumNotificaciones.php"},
			 {nombre: "Amigos", fichero: "amigos.php"},
			 {nombre: "getConversacion", fichero: "getConversacion.php"},
			 {nombre: "enviarMensajeChat", fichero: "enviarMensajeChat.php"},
			 {nombre: "recogerArchivos", fichero: "recogerArchivos.php"},
			 {nombre: "enviarMensajeChat", fichero: "recogerComentarios.php"},
			 {nombre: "megustas", fichero: "megustas.php"},
			 {nombre: "nuevoEstado", fichero: "nuevoEstado.php"},
			 {nombre: "conectar", fichero: "conectar.php"},
			 {nombre: "subirArchivo", fichero: "subirArchivo.php"},
			 {nombre: "mensajes", fichero: "mensajes.php"},
			 {nombre: "comentarios", fichero: "comentarios.php"},
			 {nombre: "usuarios", fichero: "usuarios.php"}

			 
		]
	}

	public getUrl(accion:string):string{
		let cadena = this.servidor;
		//recorremos el array
		for (let i = 0; i < this.urls.length; i++) {
			//comprobamos que el nombre sea igual a la accion
			if(this.urls[i].nombre == accion){
				//añadimos el nombre del fichero a la cadena
				cadena += this.urls[i].fichero;
				//lo devolvemos
				return cadena;
			}
		};
		//si no lo encuentra devolvemos null
		return null;
	}
}
