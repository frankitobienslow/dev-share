SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;


CREATE TABLE `cliente` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `contrato` (
  `id` int(11) NOT NULL,
  `monto` int(11) NOT NULL,
  `id_cliente` int(11) DEFAULT NULL,
  `id_desarrollador` int(11) DEFAULT NULL,
  `detalle` text DEFAULT NULL,
  `activo` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `desarrollador` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `equipo` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `equipo_desarrollador` (
  `id` int(11) NOT NULL,
  `id_desarrollador` int(11) NOT NULL,
  `id_equipo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `etapa` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `duracion_estimada` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `evaluacion` (
  `id` int(11) NOT NULL,
  `id_desarrollador` int(11) DEFAULT NULL,
  `id_habilidad` int(11) DEFAULT NULL,
  `id_nivel` int(11) DEFAULT NULL,
  `resultado` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `experiencia` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `puesto` varchar(255) DEFAULT NULL,
  `empresa` varchar(255) DEFAULT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `feedback` (
  `id` int(11) NOT NULL,
  `descripcion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `feedback` (`id`, `descripcion`) VALUES
(1, 'No recomiendo colaborar con esta persona.'),
(2, 'Colaborar con esta persona fue una experiencia insatisfactoria.'),
(3, 'La colaboración fue aceptable, pero podría mejorar.'),
(4, 'Recomiendo colaborar con esta persona.'),
(5, 'Definitivamente recomiendo colaborar con esta persona, excelente trabajo.');

CREATE TABLE `feedback_usuario` (
  `id` int(11) NOT NULL,
  `id_feedback` int(11) DEFAULT NULL,
  `id_autor` int(11) DEFAULT NULL,
  `id_destino` int(11) DEFAULT NULL,
  `detalle` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `habilidad` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `id_rol` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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

CREATE TABLE `nivel` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `nivel` (`id`, `nombre`) VALUES
(1, 'Trainee'),
(2, 'Junior'),
(3, 'Semi-Senior'),
(4, 'Senior'),
(5, 'Lead');

CREATE TABLE `postulacion` (
  `id` int(11) NOT NULL,
  `id_desarrollador` int(11) DEFAULT NULL,
  `id_requerimiento_rol` int(11) DEFAULT NULL,
  `activa` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `proyecto` (
  `id` int(11) NOT NULL,
  `duracion_estimada` date DEFAULT NULL,
  `titulo` varchar(255) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `id_cliente` int(11) NOT NULL,
  `id_equipo` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `proyecto_etapa` (
  `id` int(11) NOT NULL,
  `id_proyecto` int(11) DEFAULT NULL,
  `id_etapa` int(11) DEFAULT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `requerimiento` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `id_proyecto_etapa` int(11) DEFAULT NULL,
  `descripcion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `requerimiento_rol` (
  `id` int(11) NOT NULL,
  `id_requerimiento` int(11) DEFAULT NULL,
  `id_rol` int(11) DEFAULT NULL,
  `cantidad_desarrolladores` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `rol` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `dni` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `contrato`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_cliente` (`id_cliente`),
  ADD KEY `id_desarrollador` (`id_desarrollador`);

ALTER TABLE `desarrollador`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `equipo`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `equipo_desarrollador`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_desarrollador` (`id_desarrollador`),
  ADD KEY `id_equipo` (`id_equipo`);

ALTER TABLE `etapa`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `evaluacion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_desarrollador` (`id_desarrollador`),
  ADD KEY `id_habilidad` (`id_habilidad`),
  ADD KEY `id_nivel` (`id_nivel`);

ALTER TABLE `experiencia`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`);

ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `feedback_usuario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_feedback` (`id_feedback`),
  ADD KEY `id_autor` (`id_autor`),
  ADD KEY `id_destino` (`id_destino`);

ALTER TABLE `habilidad`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_rol` (`id_rol`);

ALTER TABLE `nivel`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `postulacion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_desarrollador` (`id_desarrollador`),
  ADD KEY `id_requerimiento_rol` (`id_requerimiento_rol`);

ALTER TABLE `proyecto`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_cliente` (`id_cliente`),
  ADD KEY `id_equipo` (`id_equipo`);

ALTER TABLE `proyecto_etapa`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_proyecto` (`id_proyecto`),
  ADD KEY `id_etapa` (`id_etapa`);

ALTER TABLE `requerimiento`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_proyecto_etapa` (`id_proyecto_etapa`);

ALTER TABLE `requerimiento_rol`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_requerimiento` (`id_requerimiento`),
  ADD KEY `id_rol` (`id_rol`);

ALTER TABLE `rol`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `cliente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `contrato`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `desarrollador`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `equipo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `equipo_desarrollador`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `etapa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `evaluacion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `experiencia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `feedback`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

ALTER TABLE `feedback_usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `habilidad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

ALTER TABLE `nivel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

ALTER TABLE `postulacion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `proyecto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `proyecto_etapa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `requerimiento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `requerimiento_rol`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `rol`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;


ALTER TABLE `contrato`
  ADD CONSTRAINT `contrato_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id`),
  ADD CONSTRAINT `contrato_ibfk_2` FOREIGN KEY (`id_desarrollador`) REFERENCES `desarrollador` (`id`);

ALTER TABLE `equipo_desarrollador`
  ADD CONSTRAINT `equipo_desarrollador_ibfk_1` FOREIGN KEY (`id_desarrollador`) REFERENCES `desarrollador` (`id`),
  ADD CONSTRAINT `equipo_desarrollador_ibfk_2` FOREIGN KEY (`id_equipo`) REFERENCES `equipo` (`id`);

ALTER TABLE `evaluacion`
  ADD CONSTRAINT `evaluacion_ibfk_1` FOREIGN KEY (`id_desarrollador`) REFERENCES `desarrollador` (`id`),
  ADD CONSTRAINT `evaluacion_ibfk_2` FOREIGN KEY (`id_habilidad`) REFERENCES `habilidad` (`id`),
  ADD CONSTRAINT `evaluacion_ibfk_3` FOREIGN KEY (`id_nivel`) REFERENCES `nivel` (`id`);

ALTER TABLE `experiencia`
  ADD CONSTRAINT `experiencia_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`);

ALTER TABLE `feedback_usuario`
  ADD CONSTRAINT `feedback_usuario_ibfk_1` FOREIGN KEY (`id_feedback`) REFERENCES `feedback` (`id`),
  ADD CONSTRAINT `feedback_usuario_ibfk_2` FOREIGN KEY (`id_autor`) REFERENCES `usuario` (`id`),
  ADD CONSTRAINT `feedback_usuario_ibfk_3` FOREIGN KEY (`id_destino`) REFERENCES `usuario` (`id`);

ALTER TABLE `habilidad`
  ADD CONSTRAINT `habilidad_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id`);

ALTER TABLE `postulacion`
  ADD CONSTRAINT `postulacion_ibfk_1` FOREIGN KEY (`id_desarrollador`) REFERENCES `desarrollador` (`id`),
  ADD CONSTRAINT `postulacion_ibfk_2` FOREIGN KEY (`id_requerimiento_rol`) REFERENCES `requerimiento_rol` (`id`);

ALTER TABLE `proyecto`
  ADD CONSTRAINT `proyecto_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id`),
  ADD CONSTRAINT `proyecto_ibfk_2` FOREIGN KEY (`id_equipo`) REFERENCES `equipo` (`id`);

ALTER TABLE `proyecto_etapa`
  ADD CONSTRAINT `proyecto_etapa_ibfk_1` FOREIGN KEY (`id_proyecto`) REFERENCES `proyecto` (`id`),
  ADD CONSTRAINT `proyecto_etapa_ibfk_2` FOREIGN KEY (`id_etapa`) REFERENCES `etapa` (`id`);

ALTER TABLE `requerimiento`
  ADD CONSTRAINT `requerimiento_ibfk_1` FOREIGN KEY (`id_proyecto_etapa`) REFERENCES `proyecto_etapa` (`id`);

ALTER TABLE `requerimiento_rol`
  ADD CONSTRAINT `requerimiento_rol_ibfk_1` FOREIGN KEY (`id_requerimiento`) REFERENCES `requerimiento` (`id`),
  ADD CONSTRAINT `requerimiento_rol_ibfk_2` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
