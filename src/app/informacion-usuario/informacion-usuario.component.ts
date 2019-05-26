import { Component, OnInit } from '@angular/core';
//Importamos el modulo http al servicio
import {Http, Response, Headers} from "@angular/http";
//Importamos la funcion map
import { map } from 'rxjs/operators';
//Importamos el servicio para recoger el usuario en local
import { RecogerUsuarioLocalService } from '../services/recoger-usuario-local.service';
//cookies
import { CookieService } from 'ngx-cookie-service';
//Importamos la clase usuario
import { Usuario } from '../Usuario/usuario';
//importamos el servicio que contiene las urls
import {UrlsService} from '../services/urls.service';
//importamos el servicio que contiene las urls
import {SubirArchivoService} from '../services/subir-archivo.service';

@Component({
  selector: 'app-informacion-usuario',
  templateUrl: './informacion-usuario.component.html',
  styleUrls: ['./informacion-usuario.component.css'],
  providers: [RecogerUsuarioLocalService, UrlsService]
})
export class InformacionUsuarioComponent implements OnInit {
	//url de los ficheros php
	private urlModificarUsuario:string;
	private urlSubirArchivo:string;
	//variables referentes al usuario
	private usuario:Usuario;
	private avatar:string;
	private nombre:string;
	private apellido:string;
	private apodo:string;
	private bio:string;
	private aux:string;
	//variable para cambiar el avatar
	private textoBoton:string = "Cambiar";
	private ocultarMostrar:boolean;

	constructor(
		private _cookies: CookieService,
		private _recogerUsuario: RecogerUsuarioLocalService,
		private _http: Http,
		private _urls: UrlsService,
		private _subirArchivo: SubirArchivoService
	){
		//recogemos la url del fichero php
		this.urlModificarUsuario = this._urls.getUrl("modificarUsuario");
		this.urlSubirArchivo = this._urls.getUrl("cambiarAvatar");
		//Obtenemos el usuario guardado en local
		this.usuario = this._recogerUsuario.getUsuario();
		//recogemos los campos que usaremos en nuestro componente
		this.avatar = this.usuario.getAvatar();
		this.nombre = this.usuario.getNombre();
		this.apellido = this.usuario.getApellido();
		this.apodo = this.usuario.getApodo();
		this.bio = this.usuario.getBio();
		this.ocultarMostrar = false;
	}

	ngOnInit() {
	}

	private guardarBio():void{
		//guardamos la anterior descipcion en una variable auxiliar
		this.aux = this.bio;
		//cambiamos la bio del usuario por la actual
		this.usuario.setBio(this.bio);
		
		//creamos la variable que se pasara como parametro al fichero PHP
		let parametros = {
			tipo : "bio",
			id : this.usuario.getId(),
			bio : this.usuario.getBio()
		};
		this.modificarUsuarioBD(parametros,"bio");
		
	}

	private guardarUsuario():void{
		//cambiamos el almacenamiento local por el nuevo
		localStorage.setItem("usuario",JSON.stringify(this.usuario));
		//si existe la cookie tambien la cambiamos
		if(this._cookies.check("usuario")){
			this._cookies.set("usuario",JSON.stringify(this.usuario));
		};
	}

	private modificarUsuarioBD(parametros:Object,tipo:string):void{
		//funcion http.post para enviar los datos
		let login = this._http.post(this.urlModificarUsuario, JSON.stringify(parametros)).pipe(map(res => res.json()));
		//llamamos a la funcion subscribe para poder obtener los datos que ha devuelto php
		login.subscribe(
			result => {
				//recogemos solo la respuesta del PHP y la pasamos a una variable
				let datos = result;
				//comprobamos que no haya devuleto error
				if(datos["actualizacion"] == "1"){
					//si no da error
					//llamamos a la funcion que cambia el usuario almacenado en el navegador
					this.guardarUsuario();
				}else{
					//si da error devolvemos el valor de la variable a su estado anterior
					this.devolverValor(tipo);
				}
				
			}
		);
	}

	private devolverValor(tipo:string){
		//preguntamos cual era la variable
		if(tipo == "bio"){
			//cambiamos su valor
			this.bio = this.aux;
		}
	}

	private subirAvatar(ev):void{
		//recogemos los parametros del input type file
		let img:any = ev.target;
		//files es una propiedad array que contiene todos los archivos del input file
		if(img.files.length > 0){
			//creamos un objeto formulario
			let parametros = new FormData();
			//le añadimos los campos que deseamos pasar al PHP
			parametros.append('file',img.files[0]);
			parametros.append('id',this.usuario.getId()+"");
			parametros.append('tipo',"avatar");
			//llamamos al servicio
			this._subirArchivo.cambiarAvatar(parametros).subscribe(
				resp => {
					//si no da error modificamos el usuario guardado en local con el nuevo avatar
					if(typeof(resp.error) == "undefined"){
						this.usuario.setAvatar(resp.avatar);
						this.guardarUsuario();
					}
				}
			);
		}
	}

	private mostarOcultar():void{
		if(!this.ocultarMostrar){
			this.ocultarMostrar = true;
			this.textoBoton="Cancelar";
		}else{
			this.ocultarMostrar = false;
			this.textoBoton="Cambiar";
		}
	}
}
