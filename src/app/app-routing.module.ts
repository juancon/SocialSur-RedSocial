import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Importamos los componentes
import {AppComponent } from './app.component';
import {LoginComponent } from './login/login.component';
import {RegistroComponent } from './registro/registro.component';


const routes: Routes = [
	//indicamos la ruta que tendra cada componente
	{path: '**', component: AppComponent},//ruta para todas las demas rutas
	{path: '', component: AppComponent},//ruta por defecto
	{path: 'inicio', component: AppComponent},
	{path: 'inicio/:page', component: AppComponent},//indicamos que la ruta puede tener parametros
	{path: 'login', component: LoginComponent},
	{path: 'login/:page', component: LoginComponent},//indicamos que la ruta puede tener parametros
	{path: 'amigos', component: AppComponent},
	{path: 'mensajes', component: AppComponent},
	{path: 'peticiones', component: AppComponent},
	{path: 'buscar', component: AppComponent},
	{path: 'buscar/:page', component: AppComponent},//indicamos que la ruta puede tener parametros
	{path: 'usuario', component: AppComponent},
	{path: 'navegacion', component: AppComponent},
	{path: 'usuario/:page', component: AppComponent},//indicamos que la ruta puede tener parametros
	{path: 'registro', component: RegistroComponent},
	{path: 'perfil', component: AppComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
