import { Injectable } from '@angular/core';
//Importamos el modulo http al servicio
import {Http, Response, Headers} from "@angular/http";
//Importamos la funcion map
import { map } from 'rxjs/operators';
import { RecogerUsuarioLocalService } from './recoger-usuario-local.service';
import { Usuario } from './../Usuario/usuario';
import { UrlsService } from './urls.service';

@Injectable({
  providedIn: 'root'
})
export class CambiarPasswordService {
  // url del fichero PHP en el servidor
  public urlCambiarPass:string;
  // variable que almacenara el usuario
  public usuario:Usuario;
  constructor(
    public _urls: UrlsService,
    public _recogerUsuario: RecogerUsuarioLocalService,
    public _http: Http
  ) {
    this.urlCambiarPass = this._urls.getUrl("usuarios");
    this.usuario = this._recogerUsuario.getUsuario();
  }

  //funcion para cambiar la contraseña
  public cambiarPassword(idusuario:number,passwordnueva:string):void{
    //variable que se enviara al fichero PHP
    let parametros = {
      accion: "cambiarpassword",
      idusuario: idusuario,
      password: passwordnueva
    }

    //funcion http.post para enviar los datos
    let cambiarPass = this._http.post(this.urlCambiarPass, JSON.stringify(parametros)).pipe(map(res => res.json()));
    //llamamos a la funcion subscribe para completar la llamada
    cambiarPass.subscribe(
      result => {
        //cambiamos la contraseña del usuario
        this.usuario.setPassword(passwordnueva.toString());
        //remplazamos el usuario almacenado en local
        sessionStorage.setItem("usuario",JSON.stringify(this.usuario));
      }
    );
  }
}
