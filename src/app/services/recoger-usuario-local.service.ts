import { Injectable } from '@angular/core';
//Importamos la clase usuario
import { Usuario } from '../Usuario/usuario';

@Injectable({
  providedIn: 'root'
})
export class RecogerUsuarioLocalService {
	
	constructor(){
	}

	public getUsuario():Usuario{
		if(sessionStorage.getItem("usuario") != null){
			//recogemos el usuario almacenado en local y lo convertimos a objeto
			let aux = JSON.parse(sessionStorage.getItem("usuario"));
			//creamos un usuario con ese objeto
			let usuarioAux = new Usuario(
					aux.id,
					aux.nombre,
					aux.apellido,
					aux.apodo,
					aux.password,
					aux.email,
					aux.bio,
					aux.avatar,
					aux.conectado,
					aux.activado,
					aux.admin
			);
			//lo devolvemos
			return usuarioAux;
		}else if(localStorage.getItem("usuario") != null){
			sessionStorage.setItem("usuario",localStorage.getItem("usuario"));
			this.getUsuario();
		}
		return null;
	}


	public getAmigoHablando():Usuario{
		if(sessionStorage.getItem("amigoHablando") != null){
			//recogemos el usuario almacenado en local y lo convertimos a objeto
			let aux = JSON.parse(sessionStorage.getItem("amigoHablando"));
			//creamos un usuario con ese objeto
			let usuarioAux = new Usuario(
					aux.id,
					aux.nombre,
					aux.apellido,
					aux.apodo,
					aux.password,
					aux.email,
					aux.bio,
					aux.avatar,
					aux.conectado,
					aux.activado,
					aux.admin
			);
			//lo devolvemos
			return usuarioAux;
		}
		return new Usuario(0," "," "," ",""," "," "," "," ",0,0);
	}

	public getOtroUsuario():Usuario{
		if(sessionStorage.getItem("otrousuario") != null){
			//recogemos el usuario almacenado en local y lo convertimos a objeto
			let aux = JSON.parse(sessionStorage.getItem("otrousuario"));
			//creamos un usuario con ese objeto
			let usuarioAux = new Usuario(
					aux.id,
					aux.nombre,
					aux.apellido,
					aux.apodo,
					aux.password,
					aux.email,
					aux.bio,
					aux.avatar,
					aux.conectado,
					aux.activado,
					aux.admin
			);
			usuarioAux.setAmistad(aux.amistad);
			
			sessionStorage.removeItem("otrousuario")
			//lo devolvemos
			return usuarioAux;
		}
		return new Usuario(0," "," "," ",""," "," "," "," ",0,0);
	}
}
