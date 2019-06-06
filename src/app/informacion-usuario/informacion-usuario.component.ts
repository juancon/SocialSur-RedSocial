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
import { RefrescarService } from '../services/refrescar.service';

@Component({
  selector: 'app-informacion-usuario',
  templateUrl: './informacion-usuario.component.html',
  styleUrls: ['./informacion-usuario.component.css'],
  providers: [RecogerUsuarioLocalService, UrlsService]
})
export class InformacionUsuarioComponent implements OnInit {
	//url de los ficheros php
	public urlModificarUsuario:string;
	public urlSubirArchivo:string;
	//variables referentes al usuario
	public usuario:Usuario;
	public avatar:string;
	public nombre:string;
	public apellido:string;
	public apodo:string;
	public bio:string;
	public aux:string;
	//variable para cambiar el avatar
	public textoBoton:string = "Cambiar";
	public ocultarMostrar:boolean;

	constructor(
		public _cookies: CookieService,
		public _recogerUsuario: RecogerUsuarioLocalService,
		public _http: Http,
		public _urls: UrlsService,
		public _subirArchivo: SubirArchivoService,
		public _refrescar: RefrescarService
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

	public guardarBio():void{
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

	public guardarUsuario():void{
		//cambiamos el almacenamiento local por el nuevo
		sessionStorage.setItem("usuario",JSON.stringify(this.usuario));

		//si existe el localstorage tambien lo cambiamos
		if(localStorage.getItem("usuario") != null){
			localStorage.setItem("usuario",JSON.stringify(this.usuario));
		}

		setTimeout(this._refrescar.refrescar, 1000);
	}

	public modificarUsuarioBD(parametros:Object,tipo:string):void{
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

	public devolverValor(tipo:string){
		//preguntamos cual era la variable
		if(tipo == "bio"){
			//cambiamos su valor
			this.bio = this.aux;
		}
	}

	public subirAvatar(ev):void{
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
					//llamamos a la funcion que cambia el avatar
					this.cambiarAvatar(resp.avatar)
				}
			);
		}
	}

	public cambiarAvatar(ruta:string){
		this.usuario.setAvatar(ruta);
		this.guardarUsuario();
	}

	public mostarOcultar():void{
		if(!this.ocultarMostrar){
			this.ocultarMostrar = true;
			this.textoBoton="Cancelar";
		}else{
			this.ocultarMostrar = false;
			this.textoBoton="Cambiar";
		}
	}

	public abrirAyuda():void{
		window.open("../../assets/SocialSurManualdeUsuario.pdf");
	}

	
}
