-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 27-05-2019 a las 20:39:20
-- Versión del servidor: 5.7.26-0ubuntu0.18.04.1
-- Versión de PHP: 7.2.17-0ubuntu0.18.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `socialsur`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `amigos`
--

CREATE TABLE `amigos` (
  `usuario1` int(11) NOT NULL,
  `usuario2` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `amigos`
--

INSERT INTO `amigos` (`usuario1`, `usuario2`) VALUES
(2, 3),
(3, 4),
(5, 4),
(2, 5),
(2, 6),
(3, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `chat`
--

CREATE TABLE `chat` (
  `iduserfrom` int(11) NOT NULL,
  `iduserto` int(11) NOT NULL,
  `mensaje` varchar(10000) COLLATE utf8mb4_bin NOT NULL,
  `leido` char(1) COLLATE utf8mb4_bin DEFAULT '0',
  `fecha` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Volcado de datos para la tabla `chat`
--

INSERT INTO `chat` (`iduserfrom`, `iduserto`, `mensaje`, `leido`, `fecha`) VALUES
(2, 3, 'Hola!', '0', '2019-05-11 10:11:04'),
(3, 2, 'hey', '0', '2019-05-11 10:11:04'),
(2, 3, 'Que ase?', '0', '2019-05-11 10:11:27'),
(3, 2, 'nah', '0', '2019-05-11 10:11:27'),
(2, 3, 'vale adios', '0', '2019-05-11 10:11:46'),
(3, 2, 'talue', '0', '2019-05-11 10:11:46'),
(2, 6, 'hey\n', '1', '2019-05-11 11:55:39'),
(6, 2, 'quer pasa\n', '1', '2019-05-11 11:55:47'),
(2, 6, 'que te cuentas\n', '1', '2019-05-11 11:57:30'),
(6, 2, 'hace un via para un chupito de legia                             \n', '1', '2019-05-11 11:57:34'),
(6, 3, '1\n', '0', '2019-05-11 12:09:18'),
(6, 3, '2\n', '0', '2019-05-11 12:09:18'),
(6, 3, '32\n', '0', '2019-05-11 12:09:20'),
(6, 3, '2\n', '0', '2019-05-11 12:09:20'),
(6, 3, '2\n', '0', '2019-05-11 12:09:20'),
(6, 3, '2\n', '0', '2019-05-11 12:09:20'),
(6, 3, '2\n', '0', '2019-05-11 12:09:21'),
(6, 3, '2\n', '0', '2019-05-11 12:09:21'),
(6, 3, '2\n', '0', '2019-05-11 12:09:21'),
(6, 3, '2\n', '0', '2019-05-11 12:09:21'),
(6, 3, '2\n', '0', '2019-05-11 12:09:21'),
(6, 3, '2\n', '0', '2019-05-11 12:09:22'),
(6, 3, '22\n', '0', '2019-05-11 12:09:22'),
(6, 3, '2\n', '0', '2019-05-11 12:09:22'),
(6, 3, '2\n', '0', '2019-05-11 12:09:26'),
(6, 3, 'f\n', '0', '2019-05-11 12:22:37'),
(6, 3, 'f\n', '0', '2019-05-11 12:22:37'),
(6, 3, 'f\n', '0', '2019-05-11 12:22:37'),
(6, 3, 'f\n', '0', '2019-05-11 12:22:37'),
(6, 3, 'f\n', '0', '2019-05-11 12:22:38'),
(6, 3, 'f\n', '0', '2019-05-11 12:22:38'),
(6, 3, 'f\n', '0', '2019-05-11 12:22:38'),
(6, 3, 'f\n', '0', '2019-05-11 12:22:38'),
(6, 3, 'f\n', '0', '2019-05-11 12:22:38'),
(6, 3, 'ff\n', '0', '2019-05-11 12:22:43'),
(6, 3, 'ffff\n', '0', '2019-05-11 12:22:48'),
(2, 5, 'tets\n', '0', '2019-05-11 12:23:03'),
(2, 5, 'tets\n', '0', '2019-05-11 12:23:04'),
(2, 5, 'tets\n', '0', '2019-05-11 12:23:05'),
(2, 5, 'tets\n', '0', '2019-05-11 12:23:05'),
(2, 5, 'tets', '0', '2019-05-11 12:23:05'),
(2, 5, 'tets\n', '0', '2019-05-11 12:23:06'),
(2, 5, 'tets\n', '0', '2019-05-11 12:23:06'),
(2, 5, 'tets\n', '0', '2019-05-11 12:23:07'),
(2, 5, 'tetstets\n', '0', '2019-05-11 12:23:08'),
(2, 5, 'tets\n', '0', '2019-05-11 12:23:08'),
(2, 5, 'tets', '0', '2019-05-11 12:23:09'),
(2, 5, 'tets\n', '0', '2019-05-11 12:23:17'),
(2, 6, 'hey \n', '1', '2019-05-11 18:44:00'),
(6, 2, 'pasa\n', '1', '2019-05-11 18:44:07'),
(2, 3, 'hey\n', '0', '2019-05-12 09:54:08'),
(2, 6, 'to\n', '1', '2019-05-12 14:58:43'),
(2, 6, 'Que pasa loco\n', '1', '2019-05-15 19:24:17'),
(2, 6, 'd+\n', '1', '2019-05-17 09:46:07'),
(2, 6, '😊😁👏\n', '1', '2019-05-18 07:04:28'),
(6, 2, 'hey\n', '1', '2019-05-19 15:37:27'),
(6, 2, 'hola\n', '1', '2019-05-19 15:41:15'),
(6, 2, 'responde\n', '1', '2019-05-19 15:43:52'),
(2, 6, 'vale\n', '1', '2019-05-19 15:44:00'),
(6, 2, 'ya\n', '1', '2019-05-19 15:44:12'),
(2, 6, 'hey\n', '1', '2019-05-21 17:57:20'),
(6, 2, 'que pasa\n', '1', '2019-05-21 17:57:29'),
(2, 6, 'hey\n', '1', '2019-05-21 18:02:19'),
(6, 2, 'hey\n', '1', '2019-05-21 18:02:29'),
(2, 6, 'hey\n', '1', '2019-05-21 18:03:08'),
(6, 2, 'iudkjfb\n', '1', '2019-05-21 18:03:16'),
(2, 6, 'jsaas\n', '1', '2019-05-21 18:04:08'),
(6, 2, 'askjsajs\n', '1', '2019-05-21 18:04:28'),
(2, 6, 'dfgdfgf\n', '1', '2019-05-21 18:05:15'),
(6, 2, 'hey\n', '1', '2019-05-21 18:05:25'),
(2, 6, 'hey\n', '1', '2019-05-21 18:05:57'),
(6, 2, 'testy\n', '1', '2019-05-21 18:06:45'),
(2, 6, 'Que psas\n', '1', '2019-05-21 18:22:02'),
(6, 2, 'tellme why\n', '1', '2019-05-21 18:25:32');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios`
--

CREATE TABLE `comentarios` (
  `id` int(11) NOT NULL,
  `idusuario` int(11) NOT NULL,
  `idelemento` int(11) NOT NULL,
  `comentario` varchar(1000) COLLATE utf8mb4_bin NOT NULL,
  `fecha` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Volcado de datos para la tabla `comentarios`
--

INSERT INTO `comentarios` (`id`, `idusuario`, `idelemento`, `comentario`, `fecha`) VALUES
(3, 2, 1, 'Bien', '2019-05-04 08:59:13'),
(4, 2, 1, 'Bien', '2019-05-04 09:43:00'),
(5, 2, 19, 'Prueba', '2019-05-18 11:34:50'),
(6, 3, 19, 'SEGUNDA PRUEBA', '2019-05-18 11:55:07'),
(7, 3, 19, 'tercera prueba', '2019-05-18 11:58:15'),
(8, 3, 13, 'whoa', '2019-05-18 12:45:03'),
(18, 2, 19, 'annie are you okey?', '2019-05-19 10:35:57'),
(24, 2, 19, 'So, Annie, are you okay? Are you okay, Annie?', '2019-05-19 10:41:52'),
(26, 2, 19, 'escribe tu comentario', '2019-05-19 10:43:04'),
(27, 2, 18, 'So tell me know is this aint love how do we get ou?', '2019-05-19 10:51:56'),
(28, 2, 19, 'You\'ve been hit by—\nYou\'ve been hit by—\nA Smooth Criminal🚶‍♂️🚶‍♂️🚶‍♂️', '2019-05-19 10:59:52'),
(29, 2, 19, 'Annie, are you okay?\nWill you tell us that you\'re okay?', '2019-05-19 11:00:16'),
(30, 2, 19, 'Annie, are you okay?\nWill you tell us that you\'re okay?', '2019-05-19 11:00:20'),
(31, 2, 19, 'do you like that', '2019-05-19 12:02:41'),
(32, 2, 19, 'after the poison summer has gone', '2019-05-19 14:39:16'),
(33, 2, 23, 'hey', '2019-05-26 12:57:46'),
(34, 6, 23, 'pasa', '2019-05-26 12:57:57'),
(35, 2, 19, 'key', '2019-05-26 16:31:13'),
(51, 2, 21, '@juanma', '2019-05-26 17:34:02'),
(52, 2, 21, '@juanma', '2019-05-27 17:25:49'),
(53, 2, 21, '@juanma', '2019-05-27 17:35:26'),
(54, 2, 21, '@juanma', '2019-05-27 17:36:11'),
(55, 6, 18, '@juanma mira aqui', '2019-05-27 18:20:22'),
(56, 2, 18, '@juanma mira aqui', '2019-05-27 18:20:58'),
(57, 2, 18, '@juanma eo', '2019-05-27 18:24:22'),
(58, 6, 18, '@juan ya mire', '2019-05-27 18:25:39');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado`
--

CREATE TABLE `estado` (
  `id` int(11) NOT NULL,
  `idusuario` int(11) NOT NULL,
  `mensaje` varchar(500) COLLATE utf8mb4_bin NOT NULL,
  `fecha` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Volcado de datos para la tabla `estado`
--

INSERT INTO `estado` (`id`, `idusuario`, `mensaje`, `fecha`) VALUES
(2, 2, 'Hola mundo 2', '2019-04-19 22:01:00'),
(3, 4, 'Hola Soy Roberto', '2019-04-20 22:00:00'),
(4, 5, 'Hola Soy Salatti', '2019-04-21 22:00:00'),
(5, 2, 'video killed the radio star', '2019-05-04 10:05:54'),
(6, 2, 'Mama, just killed a man Put a gun against his head Pulled my trigger, now he\'s dead Mama, life had just begun But now I\'ve gone and thrown it all away Mama, oh oh Didn\'t mean to make you cry If I\'m not back again this time tomorrow Carry on, carry on, as if nothing really matters', '2019-05-12 11:43:26'),
(7, 2, 'I think I met her at the minute that the rhythm was set down\nI said I\'m sorry I\'m a little bit of a letdown\nbut all my friends are daring me to come over\nso I come over and over and over\nso let me buy you a drink and we\'ll pretend that you think\nthat I\'m the man of your dreams come to life in a dive bar', '2019-05-13 18:22:32'),
(8, 2, 'Hola', '2019-05-17 09:45:10'),
(9, 2, '😊🤷‍♂️👌🤦‍♂️🌹😘🎶🤞😎', '2019-05-18 07:02:05'),
(10, 2, 'ñ', '2019-05-18 07:02:24');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fotosvideos`
--

CREATE TABLE `fotosvideos` (
  `id` int(11) NOT NULL,
  `url` varchar(150) COLLATE utf8mb4_bin NOT NULL,
  `nombre` varchar(150) COLLATE utf8mb4_bin NOT NULL,
  `idusuario` int(11) NOT NULL,
  `tipo` varchar(5) COLLATE utf8mb4_bin NOT NULL,
  `fecha` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Volcado de datos para la tabla `fotosvideos`
--

INSERT INTO `fotosvideos` (`id`, `url`, `nombre`, `idusuario`, `tipo`, `fecha`) VALUES
(1, 'assets/fotos/foto_1.jpg', 'Museo', 2, 'foto', '2019-04-19 22:00:00'),
(2, 'assets/videos/video_1.mp4', 'Hacking Mode', 2, 'video', '2019-04-19 22:01:00'),
(4, 'assets/fotos/foto_1.jpg', 'Trabajando', 4, 'foto', '2019-04-21 22:00:00'),
(5, 'assets/fotos/foto_2.jpg', 'Relax don\'t do it', 2, 'foto', '2019-05-04 10:41:04'),
(13, './assets/fotos/f96e2510c0e32719d03e564871c76d47.jpg', 'Standing in line to see the Show tonight', 2, 'foto', '2019-05-13 21:09:34'),
(14, './assets/videos/0b93192eb108b2e08b87cda20ea16b12.mp4', 'HackerMan', 2, 'video', '2019-05-13 21:09:49'),
(15, './assets/fotos/ff525afa64728fb1361e8613217932d1.jpg', 'Hotel', 2, 'foto', '2019-05-15 20:35:58'),
(16, './assets/fotos/1356adf33d0a05349750e8503f5f6310.gif', 'Como romper una copa con un megafono', 2, 'foto', '2019-05-16 18:33:32'),
(18, './assets/videos/a575a65c7781f7d32c46cd97db096fa3.mp4', 'juan', 2, 'video', '2019-05-17 09:43:40'),
(19, './assets/fotos/ff2167a409bae3b07939478a0230d286.jpg', '🤷‍♂️', 2, 'foto', '2019-05-18 07:10:35'),
(21, './assets/fotos/de90a88453b7134bdcba97d16abc4874.jpg', 'Nice', 2, 'foto', '2019-05-19 20:07:24'),
(22, './assets/fotos/83e39a617004311bf114b1225b1232a4.jpg', 'Iron Giant', 2, 'foto', '2019-05-22 18:18:14'),
(23, './assets/fotos/791870e2d537079403359833dff06496.jpg', 'Rock it', 6, 'foto', '2019-05-26 11:54:39'),
(24, './assets/fotos/8081dd7904c316243f93bc9fe5d89883.jpg', '5a', 18, 'foto', '2019-05-26 13:49:09');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `megustaestados`
--

CREATE TABLE `megustaestados` (
  `idusuario` int(11) NOT NULL,
  `idelemento` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `megustaestados`
--

INSERT INTO `megustaestados` (`idusuario`, `idelemento`) VALUES
(2, 2),
(5, 3),
(2, 4),
(2, 5),
(2, 6),
(3, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `megustafotosvideos`
--

CREATE TABLE `megustafotosvideos` (
  `idusuario` int(11) NOT NULL,
  `idelemento` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `megustafotosvideos`
--

INSERT INTO `megustafotosvideos` (`idusuario`, `idelemento`) VALUES
(2, 1),
(2, 2),
(2, 13),
(2, 14),
(2, 16),
(2, 18),
(2, 19),
(2, 23),
(3, 4),
(4, 1),
(5, 2),
(6, 23);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensajes`
--

CREATE TABLE `mensajes` (
  `id` int(11) NOT NULL,
  `idusuariofrom` int(11) NOT NULL,
  `idusuarioto` int(11) NOT NULL,
  `mensaje` varchar(10000) COLLATE utf8mb4_bin NOT NULL,
  `leido` char(1) COLLATE utf8mb4_bin DEFAULT '0',
  `borradofrom` char(1) COLLATE utf8mb4_bin DEFAULT '0',
  `borradoto` char(1) COLLATE utf8mb4_bin DEFAULT '0',
  `fecha` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Volcado de datos para la tabla `mensajes`
--

INSERT INTO `mensajes` (`id`, `idusuariofrom`, `idusuarioto`, `mensaje`, `leido`, `borradofrom`, `borradoto`, `fecha`) VALUES
(1, 2, 4, 'Hola Como estas?', '1', '0', '0', '2019-04-21 22:05:00'),
(2, 4, 2, 'Bien y tu?', '1', '0', '0', '2019-04-21 22:15:00'),
(3, 3, 2, 'whasa', '1', '0', '0', '2019-05-10 21:55:45'),
(4, 2, 5, 'Barracuda', '0', '0', '0', '2019-05-15 21:26:10'),
(5, 2, 5, 'She\'s got eyes of the bluest skies\nAs if they thought of rain\nI hate to look into those eyes\nAnd see an ounce of pain\nHer hair reminds me of a warm safe place\nWhere as a child I\'d hide\nAnd pray for the thunder\nAnd the rain\nTo quietly pass me by', '0', '0', '0', '2019-05-15 21:34:25'),
(7, 2, 5, 'hey', '0', '0', '0', '2019-05-15 21:37:32'),
(8, 2, 5, 'run to the hills run for your life', '0', '0', '0', '2019-05-16 17:32:24'),
(9, 2, 5, 'windmill windmill for the land is everybody here?', '0', '0', '0', '2019-05-16 17:55:07'),
(11, 2, 5, 'thats what she said', '0', '0', '0', '2019-05-16 17:58:03'),
(12, 2, 6, 'tengo frio por los ojos', '1', '0', '0', '2019-05-16 18:07:59'),
(25, 2, 5, 'should i stay or should i go', '0', '0', '0', '2019-05-16 18:15:13'),
(26, 2, 5, 'prueba', '0', '1', '0', '2019-05-19 21:14:15'),
(27, 2, 4, 'test', '0', '0', '0', '2019-05-22 19:25:40'),
(28, 2, 4, 'everything its alright\n', '0', '0', '0', '2019-05-22 19:31:35'),
(29, 6, 2, 'si me voy va haber peligro', '1', '0', '1', '2019-05-22 19:36:30'),
(30, 2, 6, 'throw away your television', '1', '0', '0', '2019-05-24 18:21:40'),
(31, 2, 6, 'Stacy\'s mom has got it goin\' on\nShe\'s all I want and I\'ve waited for so long\nStacy, can\'t you see you\'re just not the girl for me\nI know it might be wrong but I\'m in love with Stacy\'s mom', '1', '0', '1', '2019-05-25 09:07:04'),
(32, 2, 6, 'its a sweet sensation over the dub', '1', '0', '0', '2019-05-26 14:29:04'),
(33, 2, 6, 'it\'s a sweet sensation over the dub', '1', '0', '0', '2019-05-26 14:32:44'),
(34, 2, 6, 'Te ha mencionado en su último comentario', '1', '0', '1', '2019-05-26 17:00:09'),
(35, 0, 6, 'Te ha mencionado en su último comentario', '1', '0', '1', '2019-05-26 17:07:42'),
(36, 0, 6, 'Juan Contreras te ha mencionado en su comentario', '1', '0', '1', '2019-05-26 17:14:46'),
(37, 0, 6, 'Juan Contreras te ha mencionado en su comentario', '1', '0', '1', '2019-05-26 17:17:54'),
(38, 0, 6, 'Juan Contreras te ha mencionado en su comentario en la publicación Iron Giant', '1', '0', '1', '2019-05-26 17:20:26'),
(39, 0, 6, 'Juan Contreras te ha mencionado en su comentario en la publicación Iron Giant', '1', '0', '1', '2019-05-26 17:23:51'),
(40, 0, 6, 'Juan Contreras te ha mencionado en su comentario en la publicación Iron Giant', '1', '0', '1', '2019-05-26 17:26:33'),
(41, 0, 6, 'Juan Contreras te ha mencionado en su comentario en la publicación Iron Giant', '1', '0', '1', '2019-05-26 17:27:12'),
(42, 0, 6, 'Juan Contreras te ha mencionado en su comentario en la publicación Iron Giant subida por Juan Contreras.', '1', '0', '1', '2019-05-26 17:29:19'),
(43, 0, 6, 'Juan Contreras te ha mencionado en su comentario en la publicación Nice subida por Juan Contreras.', '1', '0', '1', '2019-05-26 17:34:02'),
(44, 2, 3, 'fe', '0', '0', '0', '2019-05-26 17:55:03'),
(46, 2, 6, 'que pasa', '1', '0', '1', '2019-05-26 18:00:26'),
(47, 2, 6, 'heyses', '1', '0', '1', '2019-05-26 18:05:11'),
(48, 0, 6, 'Juan Contreras te ha mencionado en su <a href=\'/usuario?apodo=@juan\' >comentario</a> en la publicación Nice subida por Juan Contreras.', '1', '0', '1', '2019-05-27 17:25:49'),
(49, 0, 6, '<a href=\'/usuario?apodo=@juan\'>Juan Contreras te ha mencionado en su último <a href=\'/usuario?apodo=@juan&ref=21\'>comentario</a>', '1', '0', '1', '2019-05-27 17:35:26'),
(50, 0, 6, '<a href=\'/usuario?apodo=@juan\'>Juan Contreras</a> te ha mencionado en su último <a href=\'/usuario?apodo=@juan&ref=21\'>comentario</a>', '1', '0', '1', '2019-05-27 17:36:11'),
(51, 0, 2, '<a href=\'/usuario?apodo=@juanma\'>Juan Manuel Hernandez</a> te ha mencionado en su último <a href=\'/usuario?apodo=@juan&ref=18\'>comentario</a>', '0', '0', '0', '2019-05-27 18:20:22'),
(52, 0, 6, '<a href=\'/usuario?apodo=@juan\'>Juan Contreras</a> te ha mencionado en su último <a href=\'/usuario?apodo=@juan&ref=18\'>comentario</a>', '1', '0', '1', '2019-05-27 18:20:58'),
(53, 0, 6, '<a href=\'/usuario?apodo=@juan\'>Juan Contreras</a> te ha mencionado en su último <a href=\'/usuario?apodo=@juan&ref=18\'>comentario</a>', '0', '0', '0', '2019-05-27 18:24:22'),
(54, 0, 2, '<a href=\'/usuario?apodo=@juanma\'>Juan Manuel Hernandez</a> te ha mencionado en su último <a href=\'/inicio?ref=18\'>comentario</a>', '0', '0', '0', '2019-05-27 18:25:39');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitudesamistad`
--

CREATE TABLE `solicitudesamistad` (
  `usuariofrom` int(11) NOT NULL,
  `usuarioto` int(11) NOT NULL,
  `mensaje` varchar(200) COLLATE utf8mb4_bin DEFAULT NULL,
  `aceptado` char(1) COLLATE utf8mb4_bin NOT NULL DEFAULT '0',
  `fecha` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Volcado de datos para la tabla `solicitudesamistad`
--

INSERT INTO `solicitudesamistad` (`usuariofrom`, `usuarioto`, `mensaje`, `aceptado`, `fecha`) VALUES
(18, 2, 'No cure is near 🤢', '0', '2019-05-25 12:14:45');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) COLLATE utf8mb4_bin NOT NULL,
  `apellido` varchar(50) COLLATE utf8mb4_bin NOT NULL,
  `apodo` varchar(50) COLLATE utf8mb4_bin NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_bin NOT NULL,
  `password` varchar(100) COLLATE utf8mb4_bin NOT NULL,
  `bio` varchar(200) COLLATE utf8mb4_bin DEFAULT 'Hey there! I am using SocialSur!',
  `avatar` varchar(500) COLLATE utf8mb4_bin DEFAULT '/assets/iconos/user-3.svg',
  `conectado` char(1) COLLATE utf8mb4_bin NOT NULL DEFAULT '1',
  `activado` char(1) COLLATE utf8mb4_bin DEFAULT '0',
  `admin` char(1) COLLATE utf8mb4_bin DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `apellido`, `apodo`, `email`, `password`, `bio`, `avatar`, `conectado`, `activado`, `admin`) VALUES
(0, 'Información', 'SocialSur', '', 'socialsur@gmail.com', '9fc2931ce49cdec579def68635c38798', '¡Bienvenido a SocialSur!', '/assets/logo.png', '0', '1', '0'),
(1, 'admin', 'admin', '', 'admin@socialsur.com', '21232f297a57a5a743894a0e4a801fc3', '', '/assets/iconos/user-3.svg', '0', '1', '1'),
(2, 'Juan', 'Contreras', '@juan', 'juan@gmail.com', 'a94652aa97c7211ba8954dd15a3cf838', 'Turn it up at five minutes to midnight!', './assets/img/avatar/2.jpg', '0', '1', '0'),
(3, 'Roberto', 'Fernandez', '@roberto', 'roberto@gmail.com', 'c1bfc188dba59d2681648aa0e6ca8c8e', 'Oh there ain\'t no rest for the wicked\nMoney don\'t grow on trees\nI got bills to pay, I got mouths to feed\nThere ain\'t nothing in this world for free', '/assets/iconos/user-3.svg', '0', '1', '0'),
(4, 'José Carlos', 'Salatti', '@salatti', 'salatti@gmail.com', '4199fbdc311bffda6dd704d0801973f5', '', '/assets/iconos/user-3.svg', '0', '1', '0'),
(5, 'Fernando', 'Sanchez', '@fernando', 'fernando@gmail.com', '56437ee14d804bfa14762e0b1782827e', 'This ain\'t no place for no hero This ain\'t no place for no better man This ain\'t no place for no hero To call \"home\"', '/assets/iconos/user-3.svg', '0', '1', '0'),
(6, 'Juan Manuel', 'Hernandez', '@juanma', 'juanma@gmail.com', '65a368f66ad6b9ee45263577713d8a95', 'A  seven nation army couldn\'t hold me back 🐱‍👤', '/assets/iconos/user-3.svg', '0', '0', '0'),
(10, 'Another', 'One', '@another', 'bites@the.dust', 'b32d73e56ec99bc5ec8f83871cde708a', 'And another one gone, and another one gone', '/assets/iconos/user-3.svg', '0', '0', '0'),
(11, 'I\'m going', 'Off the rails', '@rails', 'run@i.run', '9e6417ebffecef071eaeeb2ed0ca654b', 'On the crazy train', '/assets/iconos/user-3.svg', '0', '1', '0'),
(18, 'test', 'test', '@test', 'test@test.com', '098f6bcd4621d373cade4e832627b4f6', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam non ante augue. Sed vehicula fermentum purus, eget sollicitudin erat sollicitudin a.', '/assets/iconos/user-3.svg', '0', '0', '0'),
(19, 'Antonio', 'Hernandez', '@antonio', 'antonio@gmail.com', '1e3a746dfb254de3bdf400c45137a389', NULL, '/assets/iconos/user-3.svg', '0', '0', '0'),
(20, 'Eduardo', 'Herrera', '@eduardo', 'eduardo@gmail.com', '3b7c2688d955cf91d6ce42e2fa9ebbe3', NULL, '/assets/iconos/user-3.svg', '0', '0', '0');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `amigos`
--
ALTER TABLE `amigos`
  ADD PRIMARY KEY (`usuario1`,`usuario2`),
  ADD KEY `amigos_usuarios_usuario2_fk` (`usuario2`);

--
-- Indices de la tabla `chat`
--
ALTER TABLE `chat`
  ADD KEY `iduserto` (`iduserto`),
  ADD KEY `iduserfrom` (`iduserfrom`);

--
-- Indices de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `comentarios_archivos_fk` (`idelemento`),
  ADD KEY `comentarios_usuarios_fk` (`idusuario`);

--
-- Indices de la tabla `estado`
--
ALTER TABLE `estado`
  ADD PRIMARY KEY (`id`),
  ADD KEY `estado_usuarios_fk` (`idusuario`);

--
-- Indices de la tabla `fotosvideos`
--
ALTER TABLE `fotosvideos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `archivos_usuarios_fk` (`idusuario`);

--
-- Indices de la tabla `megustaestados`
--
ALTER TABLE `megustaestados`
  ADD PRIMARY KEY (`idusuario`,`idelemento`),
  ADD KEY `megusta_estado_fk` (`idelemento`);

--
-- Indices de la tabla `megustafotosvideos`
--
ALTER TABLE `megustafotosvideos`
  ADD PRIMARY KEY (`idelemento`,`idusuario`),
  ADD KEY `megustaestadosv1_usuarios_fk` (`idusuario`);

--
-- Indices de la tabla `mensajes`
--
ALTER TABLE `mensajes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `mensajes_usuarios_from_fk` (`idusuariofrom`),
  ADD KEY `mensajes_usuarios_to_fk` (`idusuarioto`);

--
-- Indices de la tabla `solicitudesamistad`
--
ALTER TABLE `solicitudesamistad`
  ADD PRIMARY KEY (`usuariofrom`,`usuarioto`),
  ADD KEY `solicitudes_usuarios_to_fk` (`usuarioto`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;
--
-- AUTO_INCREMENT de la tabla `estado`
--
ALTER TABLE `estado`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT de la tabla `fotosvideos`
--
ALTER TABLE `fotosvideos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
--
-- AUTO_INCREMENT de la tabla `mensajes`
--
ALTER TABLE `mensajes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;
--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `amigos`
--
ALTER TABLE `amigos`
  ADD CONSTRAINT `amigos_usuarios_usuario1_fk` FOREIGN KEY (`usuario1`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `amigos_usuarios_usuario2_fk` FOREIGN KEY (`usuario2`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `chat`
--
ALTER TABLE `chat`
  ADD CONSTRAINT `chat_ibfk_1` FOREIGN KEY (`iduserto`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `chat_ibfk_2` FOREIGN KEY (`iduserfrom`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD CONSTRAINT `comentarios_archivos_fk` FOREIGN KEY (`idelemento`) REFERENCES `fotosvideos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comentarios_usuarios_fk` FOREIGN KEY (`idusuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `estado`
--
ALTER TABLE `estado`
  ADD CONSTRAINT `estado_usuarios_fk` FOREIGN KEY (`idusuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `fotosvideos`
--
ALTER TABLE `fotosvideos`
  ADD CONSTRAINT `archivos_usuarios_fk` FOREIGN KEY (`idusuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `megustaestados`
--
ALTER TABLE `megustaestados`
  ADD CONSTRAINT `megusta_estado_fk` FOREIGN KEY (`idelemento`) REFERENCES `estado` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `megusta_usuarios_fk` FOREIGN KEY (`idusuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `megustafotosvideos`
--
ALTER TABLE `megustafotosvideos`
  ADD CONSTRAINT `megustaestadosv1_archivos_fk` FOREIGN KEY (`idelemento`) REFERENCES `fotosvideos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `megustaestadosv1_usuarios_fk` FOREIGN KEY (`idusuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `mensajes`
--
ALTER TABLE `mensajes`
  ADD CONSTRAINT `mensajes_usuarios_from_fk` FOREIGN KEY (`idusuariofrom`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `mensajes_usuarios_to_fk` FOREIGN KEY (`idusuarioto`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `solicitudesamistad`
--
ALTER TABLE `solicitudesamistad`
  ADD CONSTRAINT `solicitudes_usuarios_from_fk` FOREIGN KEY (`usuariofrom`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `solicitudes_usuarios_to_fk` FOREIGN KEY (`usuarioto`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
