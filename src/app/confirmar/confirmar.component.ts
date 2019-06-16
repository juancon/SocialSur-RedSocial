import { EmailConfirmacionService } from './../services/email-confirmacion.service';
import { RecogerUsuarioLocalService } from './../services/recoger-usuario-local.service';
import { Usuario } from './../Usuario/usuario';
import { Component, OnInit,  Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styleUrls: ['./confirmar.component.css']
})
export class ConfirmarComponent implements OnInit {
  // variable con el usuario
  public usuario:Usuario;
  // varaible que se enviara al componente que lo llama
  @Output() ocultar:EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(
    public _recogerUsuario:RecogerUsuarioLocalService,
    public _emailConfirmacion: EmailConfirmacionService
  ) {
    this.usuario = this._recogerUsuario.getUsuario();
  }

  ngOnInit() {
  }
  //funcion para reenviar el correo de confirmacion
  public enviarEmail():void{
    // llamamos al servicio para enviar el emnsaje
    this._emailConfirmacion.enviarEmail(this.usuario.getEmai(),this.usuario.getNombre()+" "+this.usuario.getApellido(),this.usuario.getApodo());
    //enviamos false para informar que se ha enviado el mensaje
    this.ocultar.emit(false);
  }
  //funcion para cerrar el componente
  public cerrar():void{
    // enviamos true para informar de que se ha cerrado el componente
    this.ocultar.emit(true);
  }
}
