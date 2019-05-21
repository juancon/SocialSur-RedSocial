import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Importamos los componentes
import {AppComponent } from './app.component';
import {LoginComponent } from './login/login.component';
import {RegistroComponent } from './registro/registro.component';


const routes: Routes = [
	//indicamos la ruta que tendra cada componente
	//{path: '**', component: ErrorComponent},
	{path: '', component: AppComponent},
	{path: 'inicio', component: AppComponent},
	{path: 'inicio/:page', component: AppComponent},
	{path: 'login', component: LoginComponent},
	{path: 'login/:page', component: LoginComponent},
	{path: 'amigos', component: AppComponent},
	{path: 'mensajes', component: AppComponent},
	{path: 'registro', component: RegistroComponent},
	{path: 'perfil', component: AppComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
