-- ============================================================
-- MIGRACIÓN: Panel de Administración (Proyectos y Noticias)
-- Ejecuta este archivo UNA sola vez en tu base de datos de
-- Clever Cloud (phpMyAdmin, Adminer, o consola MySQL).
-- No borra ni afecta las tablas existentes (user, image, voluntario).
-- ============================================================

CREATE TABLE IF NOT EXISTS `proyecto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL,
  `fecha` varchar(50) NOT NULL,
  `anio` int(11) NOT NULL,
  `resumen` text NOT NULL,
  `descripcion` text NOT NULL,
  `imagen` varchar(500) NOT NULL,
  `fotos` longtext DEFAULT NULL,
  `video` varchar(500) DEFAULT NULL,
  `etiqueta` varchar(100) NOT NULL,
  `color` varchar(100) NOT NULL DEFAULT 'from-[#1a3a6b] to-[#2251a3]',
  `emoji` varchar(10) NOT NULL DEFAULT '💙',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3) ON UPDATE current_timestamp(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `noticia` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL,
  `resumen` text NOT NULL,
  `contenido` text NOT NULL,
  `imagen` varchar(500) NOT NULL,
  `video` varchar(500) DEFAULT NULL,
  `fecha` varchar(50) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3) ON UPDATE current_timestamp(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
