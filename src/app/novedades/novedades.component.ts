import { OperacionesDenunciasService } from './../services/operaciones-denuncias.service';
import { Component, OnInit } from '@angular/core';
import { Comentario } from './../Comentario/comentario';
import { ComentariosService } from './../services/comentarios.service';
import { OperacionesMeGustasService } from './../services/operaciones-me-gustas.service';
import { OperacionesFechasService } from './../services/operaciones-fechas.service';
//Importamos el modulo http al servicio
import {Http, Response, Headers} from "@angular/http";
//Importamos la funcion map
import { map } from 'rxjs/operators';
import { RecogerUsuarioLocalService } from './../services/recoger-usuario-local.service';
import { UrlsService } from '../services/urls.service';
import { Usuario } from '../Usuario/usuario';
import { Archivo } from '../Archivo/archivo';

@Component({
  selector: 'app-novedades',
  templateUrl: './novedades.component.html',
  styleUrls: ['./novedades.component.css']
})
export class NovedadesComponent implements OnInit {
  //variables referentes a las urls
  public urlRecogerArchivos:string;
  public miUsuario:Usuario;
  //variable para los archivos
  public contenidos:Array<Archivo> = new Array();
  public hayContenido:boolean = true;
  //variables para los comentarios
  public comentando:boolean = false;
  public nuevoComentario:string = "";
  public comentarioinfo:string = "";
  public textareaActivo = "";
  
  constructor(
    public _urls: UrlsService,
    public _recogerUsuario: RecogerUsuarioLocalService,
    public _operacionesFechas: OperacionesFechasService,
    public _operacionesMegustas: OperacionesMeGustasService,
    public _operacionesDenuncias: OperacionesDenunciasService,
    public _comentarios: ComentariosService,
    public _http: Http
  ) {
    //recogemos la url de php y el usuario local
    this.urlRecogerArchivos = this._urls.getUrl("archivos");
    this.miUsuario = this._recogerUsuario.getUsuario();
    this.recogerArchivos();
    setInterval(this.recogerArchivos.bind(this),30000);
  }

  ngOnInit() {
  }

  //funcion para obetner los archivos de los amigos
  public recogerArchivos():void{
    if(!this.comentando){
			//enviamos el id del usuario
			let parametros = {
        accion: "getpublicacionesamigos",
				idusuario : this.miUsuario.getId()
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

  //fucnion para agregar los archvios al array
  public agregarArchivosArray(datos:Array<string>):void{
    
    //comprobamos que el array tenga datos
    if(datos.length != 0){
      
      //recogemos el array
      for ( var i = 0; i < datos.length; i++){
        //añadimos el archivo al array
        this.contenidos[i] = new Archivo(
          datos[i]["id"],
          datos[i]["url"],
          datos[i]["nombre"],
          datos[i]["idusuario"],
          datos[i]["tipo"],
          0,
          "",
          datos[i]["fecha"]
        );

        this.contenidos[i].setAutor(datos[i]["autor"]);
        this.contenidos[i].setApodoAutor(datos[i]["apodo"]);
      }
    
      //llamamos al servicio que actualiza los megustas a los megustas reales de los contenidos
      this.contenidos = this._operacionesMegustas.obtenerMegustas(this.contenidos);
      //llamamos al servicio que actualiza las ruta en funcion si se ha dado megusta o no
      this.contenidos = this._operacionesMegustas.actualizarRuta(this.contenidos);
      //llamamos al servicio que el ordena el array por fecha descendente
      this.contenidos = this._operacionesFechas.ordenarPorFechaDesc(this.contenidos);
      //obetenemos los comentarios de los archivos
      this.contenidos = this.obtenerComentariosArchivos();
      //modifico la fecha en funcion si es de hoy
      for(let i=0 ; i < this.contenidos.length; i++){
        this.contenidos[i].setFecha(this._operacionesFechas.convertirFecha(this.contenidos[i].getFecha()));

      }
    }else{
      this.comprobarContenido();
    }
  }
  
  //funcion para obetener los comentarios de cada archivo
	public obtenerComentariosArchivos():Array<Archivo>{
		//creamos un array que devolveremos
		let ret = this.contenidos;
		//recorremos el array actual
		for (var i = 0; i < this.contenidos.length; i++){
			//por cada elemento llamaremos a la funcion del servicio que se encarga de obtener los comentrios
			ret = this._comentarios.getComentariosElementos(ret[i].getId(),ret);
		}
		return ret;
  }

  //funcion para dar o quitar un megusta
	public darQuitarMegusta(idelemento:number):void{
		//llamamos al servicio que me permite dar un nuevo megusta
		this.contenidos = this._operacionesMegustas.darMegusta(this.miUsuario.getId(),idelemento,this.contenidos);
		//this.actualizarRuta();
	}

  //funcion para comprabar si se han obtenido archivos
  public comprobarContenido():void{
    this.hayContenido = !this.esVacio(this.contenidos);
	}
  
  //saber si el array esta vacio
	public esVacio(array:Array<any>):boolean{
		if(array.length > 0){
			return false;
		}

		return true;
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

  
  
  //comprobar si el usuairo esta activado
  public esActivado():boolean{
		if(this.miUsuario.getActivado() == 1){
			return true;
		}

		return false;
  }

  public mostrarTextarea(idelemento:number):boolean{
    if(this.comentando){
      if(this.textareaActivo == idelemento+""){
        return true;
      }
    }
    return false;
  }
  
  //funcion para realizar el comentario
  public comentar(idelemento:number,arrayComentarios:Array<Comentario>):void{
		if(this.comentando){
			//comprobamos que el comentario no este vacio
			if(this.nuevoComentario != ""){
				//enviamos el comentario a la base de datos
				this._comentarios.nuevoComentario(this.miUsuario.getId(),idelemento,this.nuevoComentario);
				//ocultamos el textarea y reseteamos los avriables
				this.comentando = false;
				this.textareaActivo = "";
				this.comentarioinfo = "";
				this.nuevoComentario = "";
				//recorremos el array actual para actualizar los comentarios
				for(var i = 0 ; i < this.contenidos.length ; i++){
					//comprobamos que el id sea igual
					if(this.contenidos[i].getId() == idelemento){
						//llamamos a la funcion para obtener los comentarios actualizados
						let aux = this._comentarios.refrescarComentarios(idelemento,this.contenidos[i].getComentarios())
						//solo DIOS sabe porque esta linea añade el nuevo comentario
						this.contenidos[i].setComentarios(new Array());
						break;
					}
				}
			}else{
				this.textareaActivo = "";
				this.comentando = false;
			}
		}else{
			this.comentando = true;
			this.textareaActivo = idelemento+"";
		}
  }
  //funcion para denunciar un contenido
	public denunciar(idelemento,idautor):void{
		this._operacionesDenuncias.crearDenuncia(this.miUsuario.getId(),idelemento,idautor);
	}
}
