import { Component, OnInit } from '@angular/core';
import { CambiarPasswordService } from './../services/cambiar-password.service';
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
//importamos el componente para realizar un md5 hash
import {Md5} from 'ts-md5/dist/md5';

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
	//variables para cambiar la contraseña
	public passAntiguo:string = "";
	public passNuevo:string = "";
	public passNuevoConfirmacion:string = "";
	public infoAntigua:string = "";
	public infoNueva:string = "";
	public infoNuevaConfirmacion:string = "";
	public infoCambio:string = "";

	constructor(
		public _cookies: CookieService,
		public _recogerUsuario: RecogerUsuarioLocalService,
		public _http: Http,
		public _urls: UrlsService,
		public _subirArchivo: SubirArchivoService,
		public _refrescar: RefrescarService,
		public _cambiarPassword: CambiarPasswordService
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
	//funcion para guardar la bio
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
		// llamamos a la funcion que modifica la bio
		this.modificarUsuarioBD(parametros,"bio");
		
	}
	// funcion que guarda el  usuario modificado en local
	public guardarUsuario():void{
		//cambiamos el almacenamiento local por el nuevo
		sessionStorage.setItem("usuario",JSON.stringify(this.usuario));

		//si existe el localstorage tambien lo cambiamos
		if(localStorage.getItem("usuario") != null){
			localStorage.setItem("usuario",JSON.stringify(this.usuario));
		}
		setTimeout(this._refrescar.refrescar, 1000);
	}
	// funcion que modifica el usuairo en la base de datos
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
	//funcion que restable la bio en caso de fallo
	public devolverValor(tipo:string){
		//preguntamos cual era la variable
		if(tipo == "bio"){
			//cambiamos su valor
			this.bio = this.aux;
		}
	}
	//funcion que cambia y sube la foto de perfil
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
	//funcion que cambia el avatar
	public cambiarAvatar(ruta:string){
		// cambiamos del usaurio en variable
		this.usuario.setAvatar(ruta);
		// cambiamos la ruta del usuario en sesion o en local
		this.guardarUsuario();
	}
	//fucnion para mostrar u coultar el input file para cambiar el avatar
	public mostarOcultar():void{
		// si esta oculto lo mostramos
		if(!this.ocultarMostrar){
			this.ocultarMostrar = true;
			this.textoBoton="Cancelar";
		}else{
			// si no esta oculto lo ocultamos
			this.ocultarMostrar = false;
			this.textoBoton="Cambiar";
		}
	}
	// funcion para abrir la ayuda de la aplicacion
	public abrirAyuda():void{
		// con la funcion windows.open abirmos el pdf en una pestaña nueva
		window.open("../../assets/SocialSurManualdeUsuario.pdf");
	}
	//funcion que cambia la contraseña
	public cambiarPassword():void{
		//variables de comprobacion
		let antiguo = false;
		let nuevo = false;
		let confirmacion = false;
		let md5Antiguo = new Md5();
		let md5NuevoComprobar = new Md5();
		let md5Nuevo = new Md5();

		//comprobamos la contraseña antigua y si falla informamos al usuario de que ha fallado
		if(this.passAntiguo.trim() == ""){
			$("#antigua").addClass("parpadear");
			setTimeout(function(){
				$("#antigua").removeClass("parpadear");
			},5000);
			this.infoAntigua = "";
		}else{
			if(this.usuario.getPassword() == md5Antiguo.appendStr(this.passAntiguo).end().toString()){
				antiguo = true;
				this.infoAntigua = "";
			}else{
				this.infoAntigua = "La contraseña no coincide con la actual."
			}
		}

		//comprobamos la contraseña nueva y si falla informamos al usuairo de que ha fallado
		if(this.passNuevo.trim() == ""){
			$("#nueva").addClass("parpadear");
			setTimeout(function(){
				$("#nueva").removeClass("parpadear");
			},5000);
			this.infoNueva = "";
		}else{
			var nuevaMd5 = md5Nuevo.appendStr(this.passNuevo).end();
			if(nuevaMd5 == this.usuario.getPassword()){
				this.infoNueva = "La contraseña no puede ser igual a la anterior";
			}else if(this.passNuevo.length >= 8 && this.passNuevo.length <= 32){
				nuevo = true;
				this.infoNueva = "";
			}else{
				this.infoNueva = "La contraseña debe tener entre 8 y 32 caracteres."
			}
		}

		//comprobamos la contraseña nueva y si falla informamos al usuairo de que ha fallado
		if(this.passNuevoConfirmacion.trim() == ""){
			$("#confirmacion").addClass("parpadear");
			setTimeout(function(){
				$("#confirmacion").removeClass("parpadear");
			},5000);
			this.infoNuevaConfirmacion = "";
		}else{
			if(this.passNuevoConfirmacion == this.passNuevo){
				confirmacion = true;
				this.infoNueva = "";
			}else{
				this.infoNuevaConfirmacion = "Las contraseñas no coinciden."
			}
		}

		//si todo se ha introducido correctamente actualzamos la contraseña
		if(antiguo && nuevo && confirmacion){
			this._cambiarPassword.cambiarPassword(this.usuario.getId(),nuevaMd5.toString());
			this.infoCambio = "Contraseña cambiada con éxito.";
			this.usuario.setPassword(nuevaMd5.toString());
			//reinicamos las variables
			this.passAntiguo = "";
			this.passNuevo = "";
			this.passNuevoConfirmacion = "";
		}
	}
}
