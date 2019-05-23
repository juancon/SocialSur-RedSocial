import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

//formularios
import { FormsModule } from '@angular/forms';
//cookies
import { CookieService } from 'ngx-cookie-service';
//Modulo http al proyecto
import { HttpModule, JsonpModule  } from '@angular/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { BarraNavegacionComponent } from './barra-navegacion/barra-navegacion.component';
import { InformacionUsuarioComponent } from './informacion-usuario/informacion-usuario.component';
import { ChatComponent } from './chat/chat.component';
import { ContenidoUsuarioComponent } from './contenido-usuario/contenido-usuario.component';
import { AmigosComponent } from './amigos/amigos.component';
import { MensajesComponent } from './mensajes/mensajes.component';
import { PeticionesComponent } from './peticiones-component/peticiones-component.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    BarraNavegacionComponent,
    InformacionUsuarioComponent,
    ChatComponent,
    ContenidoUsuarioComponent,
    AmigosComponent,
    MensajesComponent,
    PeticionesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
