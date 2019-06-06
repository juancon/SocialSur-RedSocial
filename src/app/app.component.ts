import { ConfirmarComponent } from './confirmar/confirmar.component';
import { Component, ViewChild } from '@angular/core';
//servicio que contiene las urls
import { UrlsService } from './services/urls.service'
//Importamos el modulo http al servicio
import {Http, Response, Headers} from "@angular/http";
//Importamos la funcion map
import { map } from 'rxjs/operators';
//importamos el modulo que nos permite redireccionar
import { Router, ActivatedRoute, Params,NavigationEnd } from '@angular/router';
//servivioc que me indica el usuario en local
import { RecogerUsuarioLocalService } from './services/recoger-usuario-local.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  //agregamos los servicios
})
export class AppComponent {
	//variables referentes a las url
	public urlConectar:string;
	//variable para saber si el usuario esta logueado
	public usarioLogueado:boolean;
	//variables para mostrar un contenido u otro
	public login:boolean = false;
	public registro:boolean = false;
	public contenidoUsuario:boolean = false;
	public perfil:boolean = false;
	public amigos:boolean = false;
	public mensajes:boolean = false;
	public peticiones:boolean = false;
	public buscar:boolean = false;
	public otrosusuarios:boolean = false;
	public informarActivado:boolean = false;
	public correoEnviado:boolean = false;
	//variable para saber si es admin
	public esAdmin:boolean = false;
	@ViewChild('activar') activar: ConfirmarComponent; //variabla para recoger cuando se ha cerrado el mensaje de activar

	constructor(
	//instanciamos las variables de los componentes que hemos importado
	public _route: ActivatedRoute,
	public _router: Router,
	public _http: Http,
	public _recogerUsuario: RecogerUsuarioLocalService,
	public _urls: UrlsService
	) {
		//asignas la url de los ficheros php
		this.urlConectar = this._urls.getUrl("conectar")
		//comprobamos si la cookie esta creada y la sesion no
		if(localStorage.getItem("usuario") != null && sessionStorage.getItem("usuario") == null){
			//de ser asi creamos la sesion a partir de la cookie
			sessionStorage.setItem("usuario",localStorage.getItem("usuario"));
		}
		//this.usarioLogueado = this._cookies.check('usuario');
		//comprobamos si existe un localstyorage del usuario
		if(sessionStorage.getItem("usuario") == null){
			this.usarioLogueado = false;
		}else{
			this.usarioLogueado = true;
			//comprobamos si el usuario es administrador
			if(this._recogerUsuario.getUsuario().getAdmin() == 1){
				this.esAdmin = true;
			}
		}
	}

	ngOnInit() {
		this._router.events.subscribe(event => {
			//preguntamos si se ha accedido a la pagina correctamente
			if(event instanceof NavigationEnd) {
				// obetnemos la url a traves de  NavigationEnd  
				let url = event.urlAfterRedirects;
				//comprobamos la variable usuarioLogueado
				//Para saber si hay un usuario logeado
				
				if(url == "/login" && !this.usarioLogueado){
					this.registro = false;
					this.login = true;
				}else if(url == "/registro" && !this.usarioLogueado){
					this.login = false;
					this.registro = true;
				}else{
					//si no esta logueado redirigimos al login
					if(!this.usarioLogueado){
						this._router.navigate(['login']);
					}else{
						//comprobamos que en que pagina estamos
						this.mostrarComponentes(url);
					}
				}
			}
		});
		if(sessionStorage.getItem("usuario") != null){
			//llamamos a la funcion que cambia el estado a conectado cada segundo
			setInterval(this.ponerConectado.bind(this),1000);
		}

		setInterval(this.ocultar.bind(this),1000)
	}

	public ocultar():void{
		if(this.informarActivado){
			this.activar.ocultar
			.subscribe(
				res => {
					this.informarActivado = false;
					if(!res){
						this.correoEnviado = true;				
					}
				}
			);
		}
	}

	public cerrar():void{
		this.correoEnviado = false;
	}

	//funcion para poner el estado en conectado
	public ponerConectado():void{
		let idusuario = this._recogerUsuario.getUsuario().getId();
		let parametros = {
			"id" : idusuario,
			accion : "conectar"
		}
		//funcion http.post para enviar los datos
		let login = this._http.post(this.urlConectar, JSON.stringify(parametros)).pipe(map(res => res.json()));
		//llamamos a la funcion subscribe para terminar de ejecutar el script
		login.subscribe(
			result => {
			}
		);
	}

	public mostrarComponentes(componente:string):void{
		this.amigos = false;
		this.perfil = false;
		this.mensajes = false;
		this.peticiones = false;
		this.contenidoUsuario = false;
		this.buscar = false;
		this.otrosusuarios = false;
		this.informarActivado = false;

		if(componente == "/amigos"){
			//si estamos en la pagina de amigos mostramos el componente de amigo
			this.amigos = true;
		}else if(componente == "/mensajes"){
			//si estamos en la página de mensaje mostramos el componente de mensajes
			this.mensajes = true;
		}else if(componente == "/perfil"){
			//si estamos en la pagina de perfil mostramos el componente de informacion
			this.perfil = true;
		}else if(componente == "/peticiones"){
			//si estamos en la pagina de peticiones mostramos el componente de peticiones
			this.peticiones = true;
		}else if(componente.substring(0,7) == "/buscar"){
			//si estamos en la pagina de buscar mostramos el componente de buscar
			this.buscar = true;
		}else if(componente.substring(0,8) == "/usuario"){
			//si no estamos en ninguna de estas paginas motramos el componente de contenido del usuario
			this.otrosusuarios = true;
			if(this._recogerUsuario.getUsuario().getActivado() == 0){
				this.informarActivado = true;
			}
		}else{
			this.contenidoUsuario = true;
			if(this._recogerUsuario.getUsuario().getActivado() == 0){
				this.informarActivado = true;
			}
		}

	}
}
