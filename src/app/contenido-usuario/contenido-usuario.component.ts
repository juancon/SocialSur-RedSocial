import { Component, OnInit } from '@angular/core';
//importamos los servicios para poder interactuar con las urls
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
//Importamos el modulo http al servicio
import { Http, Response, Headers } from "@angular/http";
//Importamos la funcion map
import { map } from 'rxjs/operators';
//Importamos el servicio para recoger el usuario en local
import { RecogerUsuarioLocalService } from '../services/recoger-usuario-local.service';
//importamos el servicio que contiene las urls
import { UrlsService } from '../services/urls.service';
//Importamos el servicio que realiza operaciones con las fechas
import { OperacionesFechasService } from '../services/operaciones-fechas.service';
//importamos el servicio que contiene las urls
import { OperacionesMeGustasService } from '../services/operaciones-me-gustas.service';
//importamos el servicio que contiene las urls
import { SubirArchivoService } from '../services/subir-archivo.service';
//Importamos la clase usuario
import { Usuario } from '../Usuario/usuario';
//Importamos la clase archivo
import { Archivo } from '../Archivo/archivo';
//Importamos la clase comentario
import { Comentario } from '../Comentario/comentario';
//importamos el servicio con las funciones de los comentarios
import { ComentariosService } from '../services/comentarios.service';

@Component({
	selector: 'app-contenido-usuario',
	templateUrl: './contenido-usuario.component.html',
	styleUrls: ['./contenido-usuario.component.css'],
	providers: [RecogerUsuarioLocalService, UrlsService, OperacionesFechasService, OperacionesMeGustasService, SubirArchivoService]
})
export class ContenidoUsuarioComponent implements OnInit {
	//variables referentes a las urls
	public urlRecogerArchivos: string;
	//Variables referentes al usuario
	public usuario: Usuario;
	//Variables que almacena todo el contenido subido por el usuario (fotos,videos,comentarios)
	public contenidoUsuario: Array<Archivo> = new Array();
	public hayContenido: boolean = true;
	//variables referentes a subir archivos
	public nombreArchivo: string = "";
	public fichero: File;
	public infoNombre: string = "";
	public infoFichero: string = "";
	public menciones:string  = "";
	public archivo: any;
	//variables referentes a los comentarios de los archivos
	public comentarios: Array<Comentario> = new Array();
	public comentando: boolean = false;
	public ocultar: boolean = false;
	public nuevoComentario: string = "";
	public comentarioinfo: string = "";
	public textareaActivo: string = "";
	//variable para la referencia
	public referencia: string = "";


	constructor(
		public _router: Router,
		public _recogerUsuario: RecogerUsuarioLocalService,
		public _urls: UrlsService,
		public _http: Http,
		public _operacionesFechas: OperacionesFechasService,
		public _operacionesMegustas: OperacionesMeGustasService,
		public _subirArchivo: SubirArchivoService,
		public _comentarios: ComentariosService
	) {
		this.usuario = this._recogerUsuario.getUsuario();
		this.urlRecogerArchivos = this._urls.getUrl("recogerArchivos");
		//obtenemos los archivos
		this.recogerArchivos();
		//obetenemos todos los comentarios
		this.obtenerComentariosArchivos();
		this.obtenerReferencia();
		setTimeout(this.irA.bind(this), 1000);
		setTimeout(this.comprobarContenido.bind(this), 1000);
		//ocultamos loc comentarios cuando no se este comentado
		setTimeout(this.oculatr.bind(this), 500);
	}

	ngOnInit() {
	}

	public comprobarContenido(): void {
		if (this.contenidoUsuario.length == 0) {
			this.hayContenido = false;
		} else {
			this.hayContenido = true;
		}
	}

	public obtenerReferencia(): void {
		//obtenemos el parametro que queremos de la url
		let url = this._router.parseUrl(this._router.url);
		//si esxites la referencia la obtenemos
		if (typeof (url.queryParams['ref']) != "undefined") {
			this.referencia = url.queryParams['ref'];

		}

	}

	public irA(): void {
		if (this.referencia != "") {
			//si la referencia no esta vacia movemos el contenido del body hasta el top -100 del nombre de la publicacion
			$("html, body").animate({
				scrollTop: $("[name='" + this.referencia + "']").offset().top - 100
			}, 0);
		}
	}

	public oculatr(): void {
		//recogemos los textareas de los comentarios y los ocultamos siempre que no se ente comentando
		if (!this.comentando)
			$('[id^="textcomentario"]').hide();
	}

	public recogerArchivos(): void {
		//enviamos el id del usuario
		let parametros = {
			id: this.usuario.getId()
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

	//funcion para actualizar el array con las fotos y los videos en local
	public agregarArchivosArray(datos: Array<string>): void {
		//recogemos el array
		for (var i = 0; i < datos.length; i++) {
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

		this.comprobarContenido();
	}

	//comprobar si el archivo es un video
	public comprobarVideo(tipo: string): boolean {
		if (tipo == "video") {
			return true;
		}
		return false;
	}

	//comprobar si el archivo es un foto
	public comprobarFoto(tipo: string): boolean {
		if (tipo == "foto") {
			return true;
		}
		return false;
	}

	//funcion para dar o quitar un megusta
	public darQuitarMegusta(idelemento: number): void {
		//llamamos al servicio que me permite dar un nuevo megusta
		this.contenidoUsuario = this._operacionesMegustas.darMegusta(this.usuario.getId(), idelemento, this.contenidoUsuario);
	}

	//funcion para almacenar un archivo en local
	public almacenarFichero(ev): void {
		this.archivo = ev.target;
	}
	//funcion subir ficheros
	public subirFichero(): void {
		//comprobamos que se halla introducido un nombre
		if (this.nombreArchivo.trim() != "") {
			//comprobamos que se ha introducido un fichero
			if (this.fichero != null) {
				//creamos la variable donde almacenaremos el tipo de archivo
				let tipoArchivo;
				//comprobamos si es una imagen o un video
				//obtenemos la extension del archivo
				let extension = (this.fichero + "").split(".").pop();
				//creamos los patrones con los que sabremos si es un video
				let patronVideo = /(mp4|m4v|avi|mpeg)$/i;
				//comprobamos el patron
				if (patronVideo.exec(extension)) {
					//si es un video cambiamos el tipo de por video
					tipoArchivo = "video";
				} else {
					//si no es un video es una foto
					tipoArchivo = "foto";
				}
				//creamos la varible que pasaremos al servidor
				let parametros = new FormData();
				//le añadimos los campos que deseamos pasar al PHP

				parametros.append('file', this.archivo.files[0]);
				parametros.append('idusuario', this.usuario.getId() + "");
				parametros.append('nombre', this.nombreArchivo);
				parametros.append('tipo', tipoArchivo);
				parametros.append('extension', extension);
				parametros.append('menciones', this.menciones);

				//funcion http.post para enviar los datos
				this._subirArchivo.subirArchivo(parametros).subscribe(
					resp => {
						//si el resultado es 1
						if (resp.resultado == 1) {
							//llamamos a la funcion que recoge los archivos del usuario
							this.recogerArchivos();
							this.cerrarModal();
							this.comentando = false;
							this.textareaActivo = "";
							this.nuevoComentario = "";
						}
					}
				);

			} else {
				this.infoFichero = "Selecciona una imágen o un vídeo Fichero"
			}
		} else {
			this.infoNombre = "Introduce un Nombre para el Fichero"
		}
	}

	//funcion para cerrar la ventana modal
	public cerrarModal() {
		//recorremos la ventana modal y la cerramos
		//usar esta linea puede dar error ya que modal no es una funcion jquery si no una del propio
		//componente que esta recogiendo con @ts-ignore se puede hacer que tipe script ignore este error
		//@ts-ignore
		$('#subirarchivo').modal('toggle');
		//reinicamos sus variables
		this.nombreArchivo = "";
		this.fichero = null;
		this.menciones = "";

	}

	//funcion para obetener los comentarios de cada archivo
	public obtenerComentariosArchivos(): Array<Archivo> {
		//creamos un array que devolveremos
		let ret = this.contenidoUsuario;
		//recorremos el array actual
		for (var i = 0; i < this.contenidoUsuario.length; i++) {
			//por cada elemento llamaremos a la funcion del servicio que se encarga de obtener los comentrios
			ret = this._comentarios.getComentariosElementos(ret[i].getId(), ret);
		}
		return ret;
	}

	//saber si un array esta vacio
	public esVacio(array: Array<any>): boolean {
		if (array.length > 0) {
			return false;
		}

		return true;
	}

	//funcion para mostrar el textarea del comentario
	public mostrarTextarea(idelemento: number): boolean {
		if (this.comentando) {
			if (this.textareaActivo == idelemento + "") {
				return true;
			}
		}
		return false;
	}

	public comentar(idelemento: number, arrayComentarios: Array<Comentario>): void {
		if (this.comentando) {
			//comprobamos que el comentario no este vacio
			if (this.nuevoComentario != "") {
				//enviamos el comentario a la base de datos
				this._comentarios.nuevoComentario(this.usuario.getId(), idelemento, this.nuevoComentario);
				//ocultamos el textarea y reseteamos los avriables
				this.comentando = false;
				this.textareaActivo = "";
				this.comentarioinfo = "";
				this.nuevoComentario = "";
				//recorremos el array actual para actualizar los comentarios
				for (var i = 0; i < this.contenidoUsuario.length; i++) {
					//comprobamos que el id sea igual
					if (this.contenidoUsuario[i].getId() == idelemento) {
						//llamamos a la funcion para obtener los comentarios actualizados
						let aux = this._comentarios.refrescarComentarios(idelemento, this.contenidoUsuario[i].getComentarios())
						//solo DIOS sabe porque esta linea añade el nuevo comentario
						this.contenidoUsuario[i].setComentarios(new Array());
						break;
					}
				}
			} else {
				this.textareaActivo = "";
				this.comentando = false;
			}
		} else {
			this.comentando = true;
			this.textareaActivo = idelemento + "";
		}
	}
}