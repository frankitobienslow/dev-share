-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-11-2024 a las 03:30:33
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `devshare_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`id`) VALUES
(22),
(27);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `desarrollador`
--

CREATE TABLE `desarrollador` (
  `id` int(11) NOT NULL,
  `activo` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `desarrollador`
--

INSERT INTO `desarrollador` (`id`, `activo`) VALUES
(26, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipo`
--

CREATE TABLE `equipo` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `equipo`
--

INSERT INTO `equipo` (`id`, `nombre`) VALUES
(1, 'EQUIPO LOCO'),
(2, 'LOS MUERDE ALMOHADA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipo_desarrollador`
--

CREATE TABLE `equipo_desarrollador` (
  `id` int(11) NOT NULL,
  `id_desarrollador` int(11) NOT NULL,
  `id_equipo` int(11) NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `equipo_desarrollador`
--

INSERT INTO `equipo_desarrollador` (`id`, `id_desarrollador`, `id_equipo`, `activo`) VALUES
(1, 26, 1, 1),
(2, 26, 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `etapa`
--

CREATE TABLE `etapa` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `etapa`
--

INSERT INTO `etapa` (`id`, `nombre`) VALUES
(1, 'Planificación'),
(2, 'Desarrollo'),
(3, 'Pruebas'),
(4, 'Despliegue');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evaluacion`
--

CREATE TABLE `evaluacion` (
  `id` int(11) NOT NULL,
  `id_desarrollador` int(11) DEFAULT NULL,
  `id_habilidad` int(11) DEFAULT NULL,
  `id_nivel` int(11) DEFAULT NULL,
  `resultado` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `evaluacion`
--

INSERT INTO `evaluacion` (`id`, `id_desarrollador`, `id_habilidad`, `id_nivel`, `resultado`, `fecha`) VALUES
(25, 26, 7, 1, 80, '2024-10-15'),
(26, 26, 24, 0, 120, '2024-10-15'),
(27, 26, 19, 2, 80, '2024-10-15'),
(28, 26, 14, 2, 80, '2024-10-15'),
(29, 26, 14, 3, 60, '2024-10-22'),
(30, 26, 16, 1, 80, '2024-10-22'),
(31, 26, 18, 2, NULL, NULL),
(32, 26, 14, 2, 20, '2024-10-30');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `experiencia`
--

CREATE TABLE `experiencia` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `puesto` varchar(255) DEFAULT NULL,
  `empresa` varchar(255) DEFAULT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `feedback`
--

CREATE TABLE `feedback` (
  `id` int(11) NOT NULL,
  `descripcion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `feedback`
--

INSERT INTO `feedback` (`id`, `descripcion`) VALUES
(1, 'No recomiendo colaborar con esta persona.'),
(2, 'Colaborar con esta persona fue una experiencia insatisfactoria.'),
(3, 'La colaboración fue aceptable, pero podría mejorar.'),
(4, 'Recomiendo colaborar con esta persona.'),
(5, 'Definitivamente recomiendo colaborar con esta persona, excelente trabajo.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `feedback_usuario`
--

CREATE TABLE `feedback_usuario` (
  `id` int(11) NOT NULL,
  `id_feedback` int(11) DEFAULT NULL,
  `id_autor` int(11) DEFAULT NULL,
  `id_destino` int(11) DEFAULT NULL,
  `detalle` text DEFAULT NULL,
  `fecha` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `feedback_usuario`
--

INSERT INTO `feedback_usuario` (`id`, `id_feedback`, `id_autor`, `id_destino`, `detalle`, `fecha`) VALUES
(1, 1, 26, 22, 'ss', NULL),
(2, 1, 26, 22, 'puto', NULL),
(3, 1, 26, 22, 'hdp', NULL),
(4, 1, 26, 22, 'PUTIO', NULL),
(5, 1, 26, 22, 'aaaaaaaaaa', NULL),
(6, 1, 26, 22, 'HDP', NULL),
(7, 1, 26, 22, 'HDP', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `habilidad`
--

CREATE TABLE `habilidad` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `id_rol` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `habilidad`
--

INSERT INTO `habilidad` (`id`, `nombre`, `descripcion`, `id_rol`) VALUES
(7, 'Bootstrap', 'Framework de CSS para diseño responsivo y rápido.', 1),
(8, 'React', 'Librería de JavaScript para construir interfaces de usuario interactivas.', 2),
(9, 'Node.js', 'Entorno de ejecución de JavaScript en el servidor.', 3),
(10, 'Agile', 'Metodología de gestión de proyectos basada en iteraciones rápidas.', 4),
(11, 'Pruebas Manuales', 'Proceso de verificación de software mediante pruebas manuales.', 5),
(12, 'Docker', 'Plataforma para desarrollar, enviar y ejecutar aplicaciones en contenedores.', 6),
(13, 'Python', 'Lenguaje de programación versátil, ideal para análisis de datos y desarrollo web.', 3),
(14, 'SQL', 'Lenguaje utilizado para gestionar y manipular bases de datos.', 4),
(15, 'HTML', 'Lenguaje de marcado utilizado para estructurar contenido en la web.', 2),
(16, 'Java', 'Lenguaje de programación popular, especialmente en desarrollo de aplicaciones empresariales.', 3),
(17, 'Marketing en Redes Sociales', 'Estrategias para promover productos a través de plataformas sociales.', 5),
(18, 'Ciberseguridad', 'Prácticas para proteger sistemas y datos de ataques cibernéticos.', 6),
(19, 'PHP', 'Lenguaje de programación de scripts del lado del servidor, utilizado en el desarrollo web.', 3),
(20, 'Angular', 'Framework de JavaScript para construir aplicaciones web dinámicas.', 2),
(21, 'Vue.js', 'Framework progresivo para construir interfaces de usuario.', 2),
(22, 'SASS', 'Preprocesador de CSS que permite escribir estilos de forma más eficiente.', 1),
(23, 'Testeo Automatizado', 'Uso de herramientas y scripts para ejecutar pruebas de software automáticamente.', 5),
(24, 'Cloud Computing', 'Uso de servicios en la nube para almacenar y gestionar datos y aplicaciones.', 6),
(25, 'Swift', 'Lenguaje de programación para el desarrollo de aplicaciones iOS y macOS.', 3),
(26, 'Kotlin', 'Lenguaje de programación moderno para aplicaciones Android.', 3),
(27, 'SEO', 'Prácticas para optimizar sitios web y mejorar su posicionamiento en buscadores.', 5),
(28, 'Machine Learning', 'Uso de algoritmos para que las máquinas aprendan de los datos.', 4),
(29, 'UX/UI Design', 'Diseño de experiencia y interfaz de usuario para aplicaciones y sitios web.', 1),
(30, 'RESTful APIs', 'Estándar para crear interfaces de programación de aplicaciones basadas en HTTP.', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nivel`
--

CREATE TABLE `nivel` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `nivel`
--

INSERT INTO `nivel` (`id`, `nombre`) VALUES
(0, 'Trainee'),
(1, 'Junior'),
(2, 'Semi-Senior'),
(3, 'Senior'),
(4, 'Lead');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `postulacion`
--

CREATE TABLE `postulacion` (
  `id` int(11) NOT NULL,
  `id_desarrollador` int(11) DEFAULT NULL,
  `id_requerimiento_habilidad` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyecto`
--

CREATE TABLE `proyecto` (
  `id` int(11) NOT NULL,
  `titulo` varchar(255) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `id_cliente` int(11) NOT NULL,
  `id_equipo` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `proyecto`
--

INSERT INTO `proyecto` (`id`, `titulo`, `descripcion`, `id_cliente`, `id_equipo`) VALUES
(1, 'PROYECTO PRUEBA', 'Este es un proyecto de prueba', 22, 1),
(2, 'Desarrollo de Plataforma Web', 'Creación de una plataforma web para gestión de proyectos.', 22, 2),
(3, 'Aplicación Móvil', 'Desarrollo de una aplicación móvil para seguimiento de tareas.', 22, NULL),
(4, 'Sistema de Gestión', 'Implementación de un sistema de gestión empresarial integral.', 22, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyecto_etapa`
--

CREATE TABLE `proyecto_etapa` (
  `id` int(11) NOT NULL,
  `id_proyecto` int(11) DEFAULT NULL,
  `id_etapa` int(11) DEFAULT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `proyecto_etapa`
--

INSERT INTO `proyecto_etapa` (`id`, `id_proyecto`, `id_etapa`, `fecha_inicio`, `fecha_fin`) VALUES
(1, 1, 1, '2024-10-16', '2024-10-31'),
(2, 1, 2, '2024-11-01', '2024-12-15'),
(3, 1, 3, '2024-12-16', '2025-01-15'),
(4, 1, 4, '2025-01-16', NULL),
(5, 2, 1, '2024-10-16', '2024-10-31'),
(6, 2, 2, '2024-11-01', '2025-06-15'),
(7, 2, 3, '2025-06-16', '2025-07-15'),
(8, 2, 4, '2025-07-16', '2025-08-15'),
(9, 3, 1, '2024-09-16', '2024-09-30'),
(10, 3, 2, '2024-10-01', '2024-12-15'),
(11, 3, 3, '2024-12-16', '2025-01-15'),
(12, 3, 4, '2025-01-16', '2025-02-15');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `requerimiento`
--

CREATE TABLE `requerimiento` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `id_proyecto_etapa` int(11) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `disponible` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `requerimiento`
--

INSERT INTO `requerimiento` (`id`, `nombre`, `id_proyecto_etapa`, `descripcion`, `disponible`) VALUES
(1, 'Definir Alcance', 1, 'Establecer los objetivos y alcance del proyecto.', 0),
(2, 'Diseñar UI/UX', 1, 'Crear los diseños de interfaz y experiencia de usuario.', 0),
(3, 'Desarrollar Backend', 2, 'Implementar la lógica del servidor y base de datos.', 0),
(4, 'Desarrollar Frontend', 2, 'Crear la interfaz de usuario y la interacción.', 0),
(5, 'Realizar Pruebas Unitarias', 3, 'Verificar el funcionamiento de componentes individuales.', 0),
(6, 'Desplegar Aplicación', 4, 'Lanzar la aplicación en el entorno de producción.', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `requerimiento_habilidad`
--

CREATE TABLE `requerimiento_habilidad` (
  `id` int(11) NOT NULL,
  `id_requerimiento` int(11) DEFAULT NULL,
  `id_habilidad` int(11) DEFAULT NULL,
  `id_nivel` int(11) DEFAULT NULL,
  `id_desarrollador` int(11) DEFAULT NULL,
  `id_desarrollador` int(11) DEFAULT NULL,
  `terminado` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `requerimiento_habilidad`
--

INSERT INTO `requerimiento_habilidad` (`id`, `id_requerimiento`, `id_habilidad`, `id_nivel`, `id_desarrollador`, `terminado`) VALUES
(1, 1, 15, 1, 26, 0),
(2, 2, 29, 2, NULL, 0),
(3, 3, 9, 3, 26, 0),
(4, 4, 8, 2, NULL, 0),
(5, 5, 11, 2, NULL, 0),
(6, 6, 24, 3, NULL, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`id`, `nombre`, `descripcion`) VALUES
(1, 'Diseño UI', NULL),
(2, 'Desarrollo Frontend', NULL),
(3, 'Desarrollo Backend', NULL),
(4, 'Gestión de Proyectos', NULL),
(5, 'QA', NULL),
(6, 'DevOps', NULL),
(7, 'Analista de Datos', NULL),
(8, 'Arquitecto de Software', NULL),
(9, 'Marketing Digital', NULL),
(10, 'Administración de Bases de Datos', NULL),
(11, 'Ciberseguridad', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `dni` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `nombre`, `apellido`, `password`, `email`, `dni`) VALUES
(22, 'lokillo', 'AAA', '$2a$10$x0ICM2jTRN9oP//FL2.KS.sD9T/c2b.4wlkTJcwL3ud3zvQT84gAi', 'marianoturner@hotmail.com', '848418'),
(26, 'Francisco', 'insua', '$2a$10$vRzCZyPaMYYakF2M/4Wsi.pCQJ1SgEUytSQnh/bU4LErNIV/APOQS', 'franinsua7@gmail.com', '44103173'),
(27, 'prueba', 'prueba', '$2a$10$jL0FQGidvu50pVfwQqNY6u3QWytfPKQhNTFQLsYXV8nOvLpA1Jj5G', 'prueba@prueba.com', '1111111');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `desarrollador`
--
ALTER TABLE `desarrollador`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `equipo`
--
ALTER TABLE `equipo`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `equipo_desarrollador`
--
ALTER TABLE `equipo_desarrollador`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_desarrollador` (`id_desarrollador`),
  ADD KEY `id_equipo` (`id_equipo`);

--
-- Indices de la tabla `etapa`
--
ALTER TABLE `etapa`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `evaluacion`
--
ALTER TABLE `evaluacion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_desarrollador` (`id_desarrollador`),
  ADD KEY `id_habilidad` (`id_habilidad`),
  ADD KEY `id_nivel` (`id_nivel`);

--
-- Indices de la tabla `experiencia`
--
ALTER TABLE `experiencia`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `feedback_usuario`
--
ALTER TABLE `feedback_usuario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_feedback` (`id_feedback`),
  ADD KEY `id_autor` (`id_autor`),
  ADD KEY `id_destino` (`id_destino`);

--
-- Indices de la tabla `habilidad`
--
ALTER TABLE `habilidad`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_rol` (`id_rol`);

--
-- Indices de la tabla `nivel`
--
ALTER TABLE `nivel`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `postulacion`
--
ALTER TABLE `postulacion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_desarrollador` (`id_desarrollador`),
  ADD KEY `id_requerimiento_rol` (`id_requerimiento_habilidad`);

--
-- Indices de la tabla `proyecto`
--
ALTER TABLE `proyecto`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_cliente` (`id_cliente`),
  ADD KEY `id_equipo` (`id_equipo`);

--
-- Indices de la tabla `proyecto_etapa`
--
ALTER TABLE `proyecto_etapa`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_proyecto` (`id_proyecto`),
  ADD KEY `id_etapa` (`id_etapa`);

--
-- Indices de la tabla `requerimiento`
--
ALTER TABLE `requerimiento`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_proyecto_etapa` (`id_proyecto_etapa`);

--
-- Indices de la tabla `requerimiento_habilidad`
--
ALTER TABLE `requerimiento_habilidad`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_requerimiento` (`id_requerimiento`),
  ADD KEY `requerimiento_rol_ibfk_habilidad` (`id_habilidad`),
  ADD KEY `requerimiento_rol_ibfk_nivel` (`id_nivel`),
  ADD KEY `fk_requerimiento_habilidad_desarrollador` (`id_desarrollador`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `desarrollador`
--
ALTER TABLE `desarrollador`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `equipo`
--
ALTER TABLE `equipo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `equipo_desarrollador`
--
ALTER TABLE `equipo_desarrollador`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `etapa`
--
ALTER TABLE `etapa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `evaluacion`
--
ALTER TABLE `evaluacion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de la tabla `experiencia`
--
ALTER TABLE `experiencia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `feedback_usuario`
--
ALTER TABLE `feedback_usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `habilidad`
--
ALTER TABLE `habilidad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de la tabla `nivel`
--
ALTER TABLE `nivel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `postulacion`
--
ALTER TABLE `postulacion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `proyecto`
--
ALTER TABLE `proyecto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `proyecto_etapa`
--
ALTER TABLE `proyecto_etapa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `requerimiento`
--
ALTER TABLE `requerimiento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `requerimiento_habilidad`
--
ALTER TABLE `requerimiento_habilidad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD CONSTRAINT `fk_cliente_usuario` FOREIGN KEY (`id`) REFERENCES `usuario` (`id`);

--
-- Filtros para la tabla `desarrollador`
--
ALTER TABLE `desarrollador`
  ADD CONSTRAINT `fk_desarrollador_usuario` FOREIGN KEY (`id`) REFERENCES `usuario` (`id`);

--
-- Filtros para la tabla `equipo_desarrollador`
--
ALTER TABLE `equipo_desarrollador`
  ADD CONSTRAINT `equipo_desarrollador_ibfk_1` FOREIGN KEY (`id_desarrollador`) REFERENCES `desarrollador` (`id`),
  ADD CONSTRAINT `equipo_desarrollador_ibfk_2` FOREIGN KEY (`id_equipo`) REFERENCES `equipo` (`id`);

--
-- Filtros para la tabla `evaluacion`
--
ALTER TABLE `evaluacion`
  ADD CONSTRAINT `evaluacion_ibfk_1` FOREIGN KEY (`id_desarrollador`) REFERENCES `desarrollador` (`id`),
  ADD CONSTRAINT `evaluacion_ibfk_2` FOREIGN KEY (`id_habilidad`) REFERENCES `habilidad` (`id`),
  ADD CONSTRAINT `evaluacion_ibfk_3` FOREIGN KEY (`id_nivel`) REFERENCES `nivel` (`id`);

--
-- Filtros para la tabla `experiencia`
--
ALTER TABLE `experiencia`
  ADD CONSTRAINT `experiencia_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`);

--
-- Filtros para la tabla `feedback_usuario`
--
ALTER TABLE `feedback_usuario`
  ADD CONSTRAINT `feedback_usuario_ibfk_1` FOREIGN KEY (`id_feedback`) REFERENCES `feedback` (`id`),
  ADD CONSTRAINT `feedback_usuario_ibfk_2` FOREIGN KEY (`id_autor`) REFERENCES `usuario` (`id`),
  ADD CONSTRAINT `feedback_usuario_ibfk_3` FOREIGN KEY (`id_destino`) REFERENCES `usuario` (`id`);

--
-- Filtros para la tabla `habilidad`
--
ALTER TABLE `habilidad`
  ADD CONSTRAINT `habilidad_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id`);

--
-- Filtros para la tabla `postulacion`
--
ALTER TABLE `postulacion`
  ADD CONSTRAINT `postulacion_ibfk_1` FOREIGN KEY (`id_desarrollador`) REFERENCES `desarrollador` (`id`),
  ADD CONSTRAINT `postulacion_ibfk_2` FOREIGN KEY (`id_requerimiento_habilidad`) REFERENCES `requerimiento_habilidad` (`id`);

--
-- Filtros para la tabla `proyecto`
--
ALTER TABLE `proyecto`
  ADD CONSTRAINT `proyecto_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id`),
  ADD CONSTRAINT `proyecto_ibfk_2` FOREIGN KEY (`id_equipo`) REFERENCES `equipo` (`id`);

--
-- Filtros para la tabla `proyecto_etapa`
--
ALTER TABLE `proyecto_etapa`
  ADD CONSTRAINT `proyecto_etapa_ibfk_1` FOREIGN KEY (`id_proyecto`) REFERENCES `proyecto` (`id`),
  ADD CONSTRAINT `proyecto_etapa_ibfk_2` FOREIGN KEY (`id_etapa`) REFERENCES `etapa` (`id`);

--
-- Filtros para la tabla `requerimiento`
--
ALTER TABLE `requerimiento`
  ADD CONSTRAINT `requerimiento_ibfk_1` FOREIGN KEY (`id_proyecto_etapa`) REFERENCES `proyecto_etapa` (`id`);

--
-- Filtros para la tabla `requerimiento_habilidad`
--
ALTER TABLE `requerimiento_habilidad`
  ADD CONSTRAINT `fk_requerimiento_habilidad_desarrollador` FOREIGN KEY (`id_desarrollador`) REFERENCES `desarrollador` (`id`),
  ADD CONSTRAINT `requerimiento_habilidad_ibfk_1` FOREIGN KEY (`id_requerimiento`) REFERENCES `requerimiento` (`id`),
  ADD CONSTRAINT `requerimiento_habilidad_ibfk_habilidad` FOREIGN KEY (`id_habilidad`) REFERENCES `habilidad` (`id`),
  ADD CONSTRAINT `requerimiento_habilidad_ibfk_nivel` FOREIGN KEY (`id_nivel`) REFERENCES `nivel` (`id`);
  ADD CONSTRAINT `requerimiento_habilidad_ibfk_desarrollador` FOREIGN KEY (`id_desarrollador`) REFERENCES `desarrollador` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
