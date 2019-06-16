import { Injectable } from '@angular/core';
//importamos el modulo para poder subir archivos
import {HttpClient} from '@angular/common/http';
//tipo de variable
import { Observable } from 'rxjs';
//servicio que continen las urls de los ficheros php
import { UrlsService } from './urls.service';
//importamos la clase usuario
import { Usuario } from '../Usuario/usuario';
@Injectable({
  providedIn: 'root'
})
export class EmailConfirmacionService {
  // variable que almcena la url del fichero PHP
  private urlEmailConfirmacion:string;
  constructor(
    private http:HttpClient,
    private _urls: UrlsService
  ) {
    this.urlEmailConfirmacion = this._urls.getUrl("emailConfirmacion");
  }
  // funcion pra enviar el correo
  public enviarEmail(correo:string,nombre:string,apodo:string):void{
    //creamos la varible que pasaremos al servidor
    let parametros = new FormData();
    //le añadimos los campos que deseamos pasar al PHP
    parametros.append('correo',correo);
    parametros.append('nombre',nombre);
    parametros.append('apodo',apodo);
    // usamos la funcion post de HttpClient para enviar los datos a PHP
    //y luego la funcion subcribe para completar la llamada a PHP
    this.http.post(this.urlEmailConfirmacion, parametros).subscribe(
      resp => {
      }
    );
  }
}
