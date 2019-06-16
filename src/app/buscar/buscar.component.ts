import { Component, OnInit } from '@angular/core';
//importamos los modulos que nos permiten obtener el paramtero en la url
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router'
//servicio que contiene las urls
import { UrlsService } from '../services/urls.service'
//importamos la clase usuario
import { Usuario } from '../Usuario/usuario';
//servivioc que me indica el usuario en local
import { RecogerUsuarioLocalService } from '../services/recoger-usuario-local.service';
//importar servicio con las funciones de los amigos
import { OperacioneAmigosService } from '../services/operacione-amigos.service';
//importar servicio que continene las funciones de los mensajes
import { MensajesService } from '../services/mensajes.service';
//importar servicio que continene las funciones de las solicitudes de amistad
import { OperacionesPeticionesService } from '../services/operaciones-peticiones.service';
//importamos el servicio que nos permite buscar usuarios
import { OperacionesUsuariosService } from '../services/operaciones-usuarios.service';
import { } from 'jquery';
//servicio para redirigir
import { RefrescarService } from './../services/refrescar.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {
  // variable que almacena la busqueda realizada
  public busqueda:string = "";
  public usuario: Usuario;
  //variables referentes a los amigos
  public usuarios: Array<Usuario> = new Array();
  public amigoActivo: Usuario = null;
  //variables referentes a los mensajes
  public mensaje:string = "";
  //ventana modal
  public ventanaModal: any = null;
  constructor(
    public _recogerUsuario: RecogerUsuarioLocalService,
    public _operacionesUsuario: OperacionesUsuariosService,
    public _operacionesAmigos: OperacioneAmigosService,
    public _operacionesPeticiones: OperacionesPeticionesService,
    public _redirigir: RefrescarService,
    public _mensajes: MensajesService,
    public _route: ActivatedRoute,
    public _router: Router
  ) {
    this.usuario = this._recogerUsuario.getUsuario();
    //inicializamos la variuable amigoActivo para que no de problemas
    this.amigoActivo = new Usuario(0, "", "","", "", "", "", "", "", 0, 0)
    
  }

  ngOnInit() {
    // llamamos a la funcion para obtener la busqueda
    this.obtenerBusqueda();
  }
  // funcin que obtiene la busqueda
  public obtenerBusqueda():void{
    //obtenemos el parametro que queremos de la url
    let test = this._router.parseUrl(this._router.url);
    this.busqueda = test.queryParams['busqueda'];
    //llamamos a la funcion para obtener a los usuario que coincidad
    this.obtenerUsuarios()

  }
  // funcion para obtener los usuarios que coinciden con esa cadena
  public obtenerUsuarios(): void {
    //llamamos a la funcion para obetener los usuarios
    this.usuarios = this._operacionesUsuario.buscarUsuarioCadena(this.usuario.getId(),decodeURI(this.busqueda),this.usuarios);
  }

  //recogemos el usuario sobre el que queremos realizar la accion
  public recogerAmigoAccion(amigo: Usuario): void {
    this.amigoActivo = amigo;
  }
  //funcion paera enviar el mensaje
  public enviarMensaje(): void {
    //comprobamos que el mensaje no este vacio
    if (this.mensaje.trim() != "") {
      // enviamos el mensaje
      this._mensajes.enviarMensaje(this.usuario.getId(), this.amigoActivo.getId(), this.mensaje);
      // llamamos a la funcion que cierra la ventana modal
      this.cerrarModal();
    }else{
      // si esta vacio remarcamos el cuadro del mensaje en rojo
      $("#mensaje").addClass("parpadear");
      // a los 5 segundo dejamos de remarcarlo
      setTimeout(function () {
        $("#mensaje").removeClass("parpadear");
      }, 5000)
    }
  }
  // funcion que envia una solicitud de amistad
  public enviarSolicitud(): void {
    //comprobamos que el mensaje no este vacio
    if (this.mensaje.trim() != "") {
      // enviamos el mensaje
      this._operacionesPeticiones.enviarSolicitud(this.usuario.getId(), this.amigoActivo.getId(), this.mensaje)
      // cerramos la ventana modal
      this.cerrarModal();
      //cambiamos el estado de la amistad con el otro usuario
      for(var i = 0; i < this.usuarios.length; i++){
        if(this.usuarios[i].getId() == this.amigoActivo.getId()){
          this.usuarios[i].setAmistad(2);
        }
      }
    }else{
      // si esta vacio remarcamos el cuadro del mensaje durante 5 segundos
      $("#peticion").addClass("parpadear");
      setTimeout(function () {
        $("#peticion").removeClass("parpadear");
      }, 5000)
    }
  }

  //funcion par aborrar amigo
  public borrarAmigo():void{
    //borramos el amigo
    this._operacionesAmigos.borrarAmigo(this.usuario.getId(),this.amigoActivo.getId())
    //eliminamos al amigo del array y recargarmos el arry de amigos
    for(var i = 0; i < this.usuarios.length; i++){
      if(this.usuarios[i].getId() == this.amigoActivo.getId()){
        this.usuarios[i].setAmistad(0);
      }
    }
  }

  //funcion para cerrar la ventana modal
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

  //comprobamos si los usuarios son amigos
  public comprobarAmistad(amistad:number):boolean{
    if(amistad == 1){
      return true;
    }

    return false;
  }
  // funcion que comprueba si se ha envidao una solicitud
  public comprobarSocilitud(amistad:number):boolean{
    if(amistad == 2){
      return false;
    }
    return true;
  }
  // fucnion que redirige al perfil del usaurio
  public redirigir(apodo:string):void{
    let url = "/usuario?apodo="+apodo;
    window.location.href = url;
  }
  // funcion que muestra si se han encontrado resultados
  public hayResultados():boolean{
    if(this.usuarios.length == 0){
      return false;
    }
    return true;
  }
}
