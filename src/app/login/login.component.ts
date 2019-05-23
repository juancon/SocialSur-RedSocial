import { Component, OnInit,   NgZone } from '@angular/core';
//modulo del los formualrios
import { FormsModule } from '@angular/forms';
//Importaos el componente que nos permite redirigir
import {Router} from '@angular/router';
//cookies
import { CookieService } from 'ngx-cookie-service';
//Importamos el modulo http al servicio
import {Http, Response, Headers} from "@angular/http";
//Importamos la funcion map
import { map } from 'rxjs/operators';
//importamos la clase usuario
import {Usuario} from '../Usuario/usuario';
//importamos el servicio que refresca la pantalla
import {RefrescarService} from '../services/refrescar.service';
//importamos el servicio que contiene las urls
import {UrlsService} from '../services/urls.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [RefrescarService,UrlsService]
})
export class LoginComponent implements OnInit {
	//direccion del fichero php
  private urlLogin:string;
  //variables relacionadas al HTML
	private correo :string = "";
	private password:string = "";
	private recordar:boolean = false;
	private enviar:boolean = false;
  //variables que informan al usuario
	private correoInfo:string;
  private passwordInfo:string;
	private emailPassIncorreto:string;
	//variables de validacion
	private email:boolean = false;
	private pass:boolean = false;
  private error:boolean = false;
  //otras variables
  private usuario:Usuario;


  constructor(
    private _router: Router,
    private _http: Http,
    private _zone: NgZone,
    private _cookies: CookieService,
    private _refrescar: RefrescarService,
    private _urls: UrlsService
  	) {
    //asignamos el valor a la variable url con el servicio que continene todas las urls
    this.urlLogin = _urls.getUrl("login");
  }

  ngOnInit() {}
  //validar compos vacios
  private validarCorreo():void{
  	if(this.correo != "" || this.correo == null){
  		this.correoInfo = "";
  		this.email = true;
  	}else{
  		this.correoInfo = "Escribe una dirección de correo";
  		this.email = false;
  	}
  }
  private validarPassword():void{
  	if(this.password != "" || this.password == null){
  		this.passwordInfo = "";
  		this.pass = true;
  	}else{
  		this.passwordInfo = "Escribe una contraseña";
  		this.pass = false;
  	}
  }
  //validar boton
  private validar():void{
    //si los campos son correctos
  	if(this.email && this.pass){
      //llamamos al servicio de inicio se sesion pasandole el correo y la contraseña
  		this.iniciarSesion(this.correo,this.password);
  	}else{
      this.validarCorreo();
      this.validarPassword();
  	}
  }

  private iniciarSesion(correo,password):void{
    //datos que vamos a enviar
     let parametros = {
      email: correo,
      pass: password
    }
    //funcion http.post para enviar los datos
    let login = this._http.post(this.urlLogin, JSON.stringify(parametros)).pipe(map(res => res.json()));
    //llamamos a la funcion subscribe para poder obtener los datos que ha devuelto php
    login.subscribe(
      result => {
        //recogemos solo la respuesta del PHP y la pasamos a una variable
        let datos = result;
        //comprobamos que no haya devuleto error
        if(typeof(datos['error']) == "undefined"){
          this.crearCookie(datos);
        }else{
          //si da error llamamos a ala funcion que informa al usuario
          this.emailPassMal();
        }
     }
    );
  }

  private emailPassMal():void{
    //Avaisamos al usuario de que su correo o contraseña son incorrectos
    this.emailPassIncorreto = "Usuario o Contraseña Incorrectos";
    this.error = true;
  }

  private redirigir():void{
    this._router.navigateByUrl("http://localhost:4200/");
  }

  private crearCookie(datos):void{
    //creamos un nuevo usuario con los datos que hemos recibido
    this.usuario = new Usuario(
      datos['id'],
      datos['nombre'],
      datos['apellido'],
      datos['email'],
      datos['password'],
      datos['bio'],
      datos['avatar'],
      datos['conectado'],
      datos['activado'],
      datos['admin']
    );
    //preguntamos si el usuario ha marcado la casilla de recordar
    if(this.recordar == true){
      //creamos una cookie con ese usuario
      localStorage.setItem("usuario",JSON.stringify(this.usuario));
    }
    //guardamos el usuario en el navegador
    sessionStorage.setItem("usuario",JSON.stringify(this.usuario));
    //redirigimos al usuario
    this._refrescar.refrescar();
    //this._router.navigate(['']);
    //this._zone.run(() => this._router.navigate(['/inicio']));
    //this._router.navigate(['login']);
  }
}


