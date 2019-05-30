import { Archivo } from './../Archivo/archivo';
import { Injectable } from '@angular/core';
//servicio que contenie las urls
import { UrlsService } from './urls.service';
//Importamos el modulo http al servicio
import {Http, Response, Headers} from "@angular/http";
//Importamos la funcion map
import { map } from 'rxjs/operators';
//importamos la clase con las denuncias
import { Denuncias } from '../Denuncias/denuncias';
//importamos la clase usuario
import { Usuario } from '../Usuario/usuario';
import { Comentario } from '../Comentario/comentario';

@Injectable({
  providedIn: 'root'
})
export class OperacionesDenunciasService {
	private urlDenuncias:string;
	private denuncias:Array<Denuncias>;

  constructor(
    private _urls: UrlsService,
    private _http:Http
  ) {
    this.urlDenuncias = this._urls.getUrl("denuncias");
  }

  public crearDenuncia(idusuario,idelemento,idautor){
    let parametros = {
			idusuario : idusuario,
			idelemento : idelemento,
			idautor : idautor,
			accion : "nuevadenuncia"
		}
		//funcion http.post para enviar los datos
		let enviar = this._http.post(this.urlDenuncias, JSON.stringify(parametros)).pipe(map(res => res.json()));
		//llamamos a la funcion subscribe para completar la llamada a PHP
		enviar.subscribe(
			result => {
			}
		);
	}
	
	public getDenuncias():Array<Denuncias>{
		this.denuncias = [];

		//creamos una variable con los parametros que vamos a pasar a backend
		let parametros = {
			accion : "obtenerdenuncias"
		}
		//funcion http.post para enviar los datos
		let obtener = this._http.post(this.urlDenuncias, JSON.stringify(parametros)).pipe(map(res => res.json()));
		//llamamos a la funcion subscribe para poder obtener los datos que ha devuelto php
		obtener.subscribe(
			result => {
				//recogemos solo la respuesta del PHP y la pasamos a una variable
				let datos = result;
				//llamamos a la funcion que ñade los mensajes al array principal
				this.addDenuncias(datos);
			}
		);

		return this.denuncias;
	}

	private addDenuncias(datos:Array<string>):void{
		for (var i = 0; i < datos.length; i++){
			//recogemos el usuario que ha realizado la denuncia
			let usuario = new Usuario(
				datos[i]["usuario"]["id"],
				datos[i]["usuario"]["nombre"],
				datos[i]["usuario"]["apellido"],
				datos[i]["usuario"]["apodo"],
				"",
				datos[i]["usuario"]["email"],
				datos[i]["usuario"]["bio"],
				datos[i]["usuario"]["avatar"],
				"0",
				1,
				0
			);
			
			//recogemos el elemento
			let elemento = new Archivo(
				datos[i]["elemento"]["id"],
				datos[i]["elemento"]["url"],
				datos[i]["elemento"]["nombre"],
				datos[i]["elemento"]["idusuario"],
				datos[i]["elemento"]["tipo"],
				0,
				"",
				datos[i]["elemento"]["fecha"]
			);


			//añadimos los comentarios al elemento
			for (var j = 0; j < datos[i]["comentarios"].length; j++){
				elemento.addComentario(new Comentario(
					datos[i]["comentarios"][j]['id'],
					datos[i]["comentarios"][j]['idusuario'],
					datos[i]["comentarios"][j]['idelemento'],
					datos[i]["comentarios"][j]["nombre"],
					datos[i]["comentarios"][j]['comentario'],
					datos[i]["comentarios"][j]['fecha']
				))
			}

			//recogemos el usuario que ha relizado la publicacion
			let autor = new Usuario(
				datos[i]["autor"]["id"],
				datos[i]["autor"]["nombre"],
				datos[i]["autor"]["apellido"],
				datos[i]["autor"]["apodo"],
				"",
				datos[i]["autor"]["email"],
				datos[i]["autor"]["bio"],
				datos[i]["autor"]["avatar"],
				"0",
				1,
				0
			);
			
			//creamos la denuncia
			this.denuncias[i] = new Denuncias(
				datos[i]["idusuario"],
				usuario,
				datos[i]["idelemento"],
				elemento,
				datos[i]["idautor"],
				autor,
				datos[i]["fecha"],
			)
			//añadimos el numero de denuncias
			this.denuncias[i].setNumdenuncias(datos[i]["numdenuncias"][0]["numdenuncias"]);
		}
	}
}
