-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-07-2021 a las 05:17:31
-- Versión del servidor: 10.4.18-MariaDB
-- Versión de PHP: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `presupuesto_personal`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `presupuesto`
--

CREATE TABLE `presupuesto` (
  `fecha` date NOT NULL,
  `concepto` varchar(100) NOT NULL,
  `monto` int(11) NOT NULL,
  `tipo` tinyint(1) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `presupuesto`
--

INSERT INTO `presupuesto` (`fecha`, `concepto`, `monto`, `tipo`, `id`) VALUES
('2021-06-30', 'Alimentos', 500, 0, 3),
('2021-07-22', 'Salario', 50000, 1, 5),
('2021-07-10', 'Aguinaldo', 25000, 0, 6),
('2021-07-15', 'varios', 100, 0, 7),
('2021-07-08', 'Ropa', 5675, 0, 11),
('2021-07-20', 'Ventas', 30000, 1, 12),
('2021-07-13', 'Cobros adeudados', 2314, 1, 13),
('2021-07-24', 'Gas', 600, 1, 14),
('2021-07-24', 'Luz', 1500, 0, 15),
('2021-07-24', 'Telefono', 2000, 0, 16),
('2021-07-24', 'Tarjerta de credito', 10000, 0, 19);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `presupuesto`
--
ALTER TABLE `presupuesto`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `presupuesto`
--
ALTER TABLE `presupuesto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
