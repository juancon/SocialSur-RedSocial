import { Component, OnInit } from '@angular/core';
//importamos los servicios para poder interactuar con las urls
import { Router, ActivatedRoute, Params,NavigationEnd } from '@angular/router';
//Importamos el modulo http al servicio
import {Http, Response, Headers} from "@angular/http";
//Importamos la funcion map
import { map } from 'rxjs/operators';
//Importamos el servicio para recoger el usuario en local
import { RecogerUsuarioLocalService } from '../services/recoger-usuario-local.service';
//importamos el servicio que contiene las urls
import {UrlsService} from '../services/urls.service';
//Importamos el servicio que realiza operaciones con las fechas
import { OperacionesFechasService } from '../services/operaciones-fechas.service';
//importamos el servicio que contiene las operaciones de los megustas
import {OperacionesMeGustasService} from '../services/operaciones-me-gustas.service';
//importamos el servicio que contiene las operaciones de los amigos
import {OperacioneAmigosService} from '../services/operacione-amigos.service';
//Importamos la clase usuario
import { Usuario } from '../Usuario/usuario';
//Importamos la clase archivo
import { Archivo } from '../Archivo/archivo';
//Importamos la clase comentario
import { Comentario } from '../Comentario/comentario';
//importamos el servicio con las funciones de los comentarios
import {ComentariosService } from '../services/comentarios.service';
//importamos el servicio con las funciones de los usuarios
import {OperacionesUsuariosService } from '../services/operaciones-usuarios.service';
//importamos el servicio con las funciones de loas peticiones
import {OperacionesPeticionesService } from '../services/operaciones-peticiones.service';
//importamos el servicio con las funciones de loas peticiones
import {MensajesService } from '../services/mensajes.service';
//importamos el servicio de las denuncias
import {OperacionesDenunciasService} from '../services/operaciones-denuncias.service';


@Component({
  selector: 'app-otrosusuarios',
  templateUrl: './otrosusuarios.component.html',
  styleUrls: ['./otrosusuarios.component.css']
})
export class OtrosusuariosComponent implements OnInit {
  //variables referentes a las urls
	public urlRecogerArchivos:string;
	//Variables referentes al usuario
	public miUsuario:Usuario;
	public otroUsuario:Usuario;
	public apodo:string;
	//Variables que almacena todo el contenido subido por el usuario (fotos,videos,comentarios)
	public contenidoUsuario:Array<Archivo> = new Array();
	public hayContenido:boolean = true;
	//variables referentes a subir archivos
	public nombreArchivo:string = "";
	public fichero:File;
	public infoNombre:string = "";
	public infoFichero:string = "";
	public archivo:any;
	//variables referentes a los comentarios de los archivos
	public comentarios:Array<Comentario> = new Array();
	public comentando:boolean = false;
	public ocultar:boolean = false;
	public nuevoComentario:string = "";
	public comentarioinfo:string = "";
	//variable referente a los mensajes
	public mensaje:string = "";
	//variable referente a la redireccion a un archivo en concreto
	public referencia:string = "";


	constructor(
		public _router: Router,
		public _recogerUsuario: RecogerUsuarioLocalService,
		public _urls: UrlsService,
		public _http: Http,
		public _operacionesFechas: OperacionesFechasService,
		public _operacionesMegustas: OperacionesMeGustasService,
		public _operacionesUsuarios: OperacionesUsuariosService,
		public _operacionesPeticiones: OperacionesPeticionesService,
		public _operacionesDenuncias: OperacionesDenunciasService,
		public _operacionesAmigos: OperacioneAmigosService,
		public _comentarios: ComentariosService,
		public _mensajes: MensajesService
	) {
		this.miUsuario = this._recogerUsuario.getUsuario();
		this.obtenerUrl();
		setTimeout(this.iniciar.bind(this),500);
		setTimeout(this.irA.bind(this),1000);
		setTimeout(this.comprobarContenido.bind(this),1000);

	}


	ngOnInit() {
    
		//ocultamos loc comentarios cuando no se este comentado
    setInterval(this.oculatr.bind(this),500);
    
	}

	public comprobarContenido():void{
		if(this.contenidoUsuario.length == 0){
			this.hayContenido = false;
		}else{
			this.hayContenido = true;
		}
	}

	public esActivado():boolean{
		if(this.miUsuario.getActivado() == 1){
			return true;
		}

		return false;
	}

	public iniciar():void{
		
		this.urlRecogerArchivos = this._urls.getUrl("recogerArchivos");
		//obtenemos los archivos
		this.recogerArchivos();
		setInterval(this.recogerArchivos.bind(this),300000)
	}

	public obtenerUrl():void{
		//obtenemos el parametro que queremos de la url
    let url = this._router.parseUrl(this._router.url);
		this.apodo = url.queryParams['apodo'];
		//si esxites la referencia la obtenemos
		if(typeof(url.queryParams['ref']) != "undefined"){
			this.referencia = url.queryParams['ref'];
		}

		if(this.apodo == this.miUsuario.getApodo()){
			this._router.navigate([""]);
		}
    //llamamos a la funcion para obtener a los usuario que coincidad
		this._operacionesUsuarios.getUsuarioByApodo(this.apodo);
    setTimeout(this.obtenerOtroUsuario.bind(this),500);
	}

	public irA():void{
		if(this.referencia != ""){
			$("html, body").animate({
				scrollTop: $("[name='"+this.referencia+"']").offset().top-100
			}, 0);
		}
	}

	public obtenerOtroUsuario(){
		this.otroUsuario =  this._recogerUsuario.getOtroUsuario();
	}

	public oculatr():void{
		//recogemos los textareas de los comentarios y los ocultamos siempre que no se ente comentando
		if(!this.comentando){
			$('[id^="textcomentario"]').hide();
		}
	}

	public recogerArchivos():void{
		if(!this.comentando){
			//enviamos el id del usuario
			let parametros = {
				id : this.otroUsuario.getId()
			}
			//funcion http.post para enviar los datos
			let notificaciones = this._http.post(this.urlRecogerArchivos, JSON.stringify(parametros)).pipe(map(res => res.json()));
			//llamamos a la funcion subscribe para poder obtener los datos que ha devuelto php
			notificaciones.subscribe(
				result => {
					//recogemos solo la respuesta del PHP y la pasamos a una variable
					let datos = result;
					//llamamos a la funcion que almacena los datos en el array en local
					this.agregarArchivosArray(datos);
				}
			);
		}
	}

	//funcion para actualizar el array con las fotos y los videos en local
	public agregarArchivosArray(datos:Array<string>):void{
		//recogemos el array
		for ( var i = 0; i < datos.length; i++){
			//modifico la fecha en funcion si es de hoy
			datos[i]["fecha"] = this._operacionesFechas.convertirFecha(datos[i]["fecha"]);
			//añadimos el archivo al array
			this.contenidoUsuario[i] = new Archivo(
				datos[i]["id"],
				datos[i]["url"],
				datos[i]["nombre"],
				datos[i]["idusuario"],
				datos[i]["tipo"],
				0,
				"",
				datos[i]["fecha"]
			);
			
		}
	
		//llamamos al servicio que actualiza los megustas a los megustas reales de los contenidos
		this.contenidoUsuario = this._operacionesMegustas.obtenerMegustas(this.contenidoUsuario);
		//llamamos al servicio que actualiza las ruta en funcion si se ha dado megusta o no
		this.contenidoUsuario = this._operacionesMegustas.actualizarRuta(this.contenidoUsuario);
		//llamamos al servicio que el ordena el array por fecha descendente
		this.contenidoUsuario = this._operacionesFechas.ordenarPorFechaDesc(this.contenidoUsuario);
		//obetenemos los comentarios de los archivos
		this.contenidoUsuario = this.obtenerComentariosArchivos();
	}

	//comprobar si el archivo es un video
	public comprobarVideo(tipo:string):boolean{
		if(tipo == "video"){
			return true;
		}
		return false;
	}

	//comprobar si el archivo es un foto
	public comprobarFoto(tipo:string):boolean{
		if(tipo == "foto"){
			return true;
		}
		return false;
	}
	
	//funcion para dar o quitar un megusta
	public darQuitarMegusta(idelemento:number):void{
		//llamamos al servicio que me permite dar un nuevo megusta
		this.contenidoUsuario = this._operacionesMegustas.darMegusta(this.miUsuario.getId(),idelemento,this.contenidoUsuario);
		//this.actualizarRuta();
	}

	/* public actualizarRuta():void{
		//llamamos al servicio que actualiza las ruta en funcion si se ha dado megusta o no
		this.contenidoUsuario = this._operacionesMegustas.actualizarRuta(this.contenidoUsuario);
	} */

	//funcion para obetener los comentarios de cada archivo
	public obtenerComentariosArchivos():Array<Archivo>{
		//creamos un array que devolveremos
		let ret = this.contenidoUsuario;
		//recorremos el array actual
		for (var i = 0; i < this.contenidoUsuario.length; i++){
			//por cada elemento llamaremos a la funcion del servicio que se encarga de obtener los comentrios
			ret = this._comentarios.getComentariosElementos(ret[i].getId(),ret);
		}
		return ret;
	}

	//saber si un array esta vacio
	public esVacio(array:Array<any>):boolean{
		if(array.length > 0){
			return false;
		}

		return true;
	}

	public comentar(idelemento:number,arrayComentarios:Array<Comentario>):void{
		if(this.comentando){
			//comprobamos que el comentario no este vacio
			if(this.nuevoComentario != ""){
				//enviamos el comentario a la base de datos
				this._comentarios.nuevoComentario(this.miUsuario.getId(),idelemento,this.nuevoComentario);
				//ocultamos el textarea y reseteamos los avriables
				this.comentando = false;
				$("#textcomentario"+idelemento).hide();
				this.comentarioinfo = "";
				this.nuevoComentario = "";
				//recorremos el array actual para actualizar los comentarios
				for(var i = 0 ; i < this.contenidoUsuario.length ; i++){
					//comprobamos que el id sea igual
					if(this.contenidoUsuario[i].getId() == idelemento){
						//llamamos a la funcion para obtener los comentarios actualizados
						let aux = this._comentarios.refrescarComentarios(idelemento,this.contenidoUsuario[i].getComentarios())
						//solo DIOS sabe porque esta linea añade el nuevo comentario
						this.contenidoUsuario[i].setComentarios(new Array());
						break;
					}
				}
			}else{
				$("#textcomentario"+idelemento).hide();
				this.comentando = false;
			}
		}else{
			$("#textcomentario"+idelemento).show();
			this.comentando = true;
		}
	}

	//comprobamos si los usuarios son amigos
  public comprobarAmistad(amistad:number):boolean{
    if(amistad == 1){
      return true;
    }

    return false;
  }

  public comprobarSocilitud(amistad:number):boolean{
    if(amistad == 2){
      return false;
    }
    return true;
	}
	
	public enviarSolicitud(): void {
    //comprobamos que el mensaje no este vacio
    if (this.mensaje.trim() != "") {
      this._operacionesPeticiones.enviarSolicitud(this.miUsuario.getId(), this.otroUsuario.getId(), this.mensaje)
			this.otroUsuario.setAmistad(2);
      this.cerrarModal();
    }else{
      $("#peticion").addClass("parpadear");
			setTimeout(function () {
				$("#peticion").removeClass("parpadear");
			}, 5000)
    }
	}
	
	//funcion paera enviar el mensaje
  public enviarMensaje(): void {
    //comprobamos que el mensaje no este vacio
    if (this.mensaje.trim() != "") {
      this._mensajes.enviarMensaje(this.miUsuario.getId(), this.otroUsuario.getId(), this.mensaje);
      this.cerrarModal();
    }else{
      $("#mensaje").addClass("parpadear");
			setTimeout(function () {
				$("#mensaje").removeClass("parpadear");
			}, 5000)
    }
	}
	
	//funcion par aborrar amigo
	public borrarAmigo():void{
		//borramos el amigo
		this._operacionesAmigos.borrarAmigo(this.miUsuario.getId(),this.otroUsuario.getId())
		this.otroUsuario.setAmistad(0);
	}

	public cerrarModal(): void {
    //recorremos la ventana modal y la cerramos
    //usar esta linea puede dar error ya que modal no es una funcion jquery si no una del propio
    //componente que esta recogiendo con @ts-ignore se puede hacer que tipe script ignore este error
    //@ts-ignore
    $('#enviarmensaje').modal('hide');
    //@ts-ignore
    $('#solicitaramistad').modal('hide');
    //reinicamos sus variables
    this.mensaje = "";
	}
	
	//funcion para denunciar un contenido
	public denunciar(idelemento,idautor):void{
		this._operacionesDenuncias.crearDenuncia(this.miUsuario.getId(),idelemento,idautor);
	}
}
