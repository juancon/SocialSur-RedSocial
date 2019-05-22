<?php
	//importamos la clase que contiene las funciones de los usuarios
	include 'clasesphp/FuncionesUsuarios.php';
	//instanciamos la calse que contiene todas las funciones de los usuarios
	$funcionesUsuarios = new FuncionesUsuarios;
	//llamamos a la funcion que desconecta a los usuarios conectado
	$funcionesUsuarios::desconectarUsuarios();

?>