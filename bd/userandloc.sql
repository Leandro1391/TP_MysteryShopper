-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-06-2016 a las 23:38:29
-- Versión del servidor: 5.6.21
-- Versión de PHP: 5.6.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `segundoparcial2016`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mislocales`
--

CREATE TABLE IF NOT EXISTS `mislocales` (
`id` int(11) NOT NULL,
  `nombre` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `porcentaje` int(50) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `mislocales`
--

INSERT INTO `mislocales` (`id`, `nombre`, `porcentaje`) VALUES
(1, 'Hoyts Quilmes', '90'),
(2, 'McDonalds', '60'),
(3, 'Garbarino', '25');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `misusuarios`
--

CREATE TABLE IF NOT EXISTS `misusuarios` (
`id` int(11) NOT NULL,
  `correo` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `nombre` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `clave` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `tipo` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `foto` varchar(50) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `misusuarios`
--

INSERT INTO `misusuarios` (`id`, `correo`, `nombre`, `clave`, `tipo`, `foto`) VALUES
(1, 'user@user.com', 'roger', '123', 'usuario', '333333.jpg'),
(2, 'admin@admin.com', 'admin', '321', 'administrador', 'pordefecto.png'),
(4, 'cliente@cliente.com', 'julia', '987', 'cliente', '888888.jpg'),
(5, 'fox@fox.com', 'michael', 'abcd', 'usuario', '444444.jpg'),
(6, 'jobs@jobs.com', 'steve', '987', 'cliente', '111111.jpg'),
(7, 'bulzara@bulzara.com', 'freddy', 'qwer', 'cliente', '999999.jpg'),
(8, 'cruise@cruise.com', 'tom', '987', 'cliente', '777777.jpg');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `misproductos`
--
ALTER TABLE `mislocales`
 ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `misusuarios`
--
ALTER TABLE `misusuarios`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `mislocales`
--
ALTER TABLE `mislocales`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `misusuarios`
--
ALTER TABLE `misusuarios`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
