-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: marketplace_apuntes
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `administrador`
--

DROP TABLE IF EXISTS `administrador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administrador` (
  `numero_usuario` int NOT NULL AUTO_INCREMENT,
  `nombre_apellido_alumno` varchar(45) NOT NULL,
  `email_usuario` varchar(45) NOT NULL,
  `nombre_usuario` varchar(45) NOT NULL,
  `telefono_usuario` int NOT NULL,
  `contraseña_usuario` varchar(45) NOT NULL,
  `rol_usuario` varchar(45) NOT NULL,
  PRIMARY KEY (`numero_usuario`),
  UNIQUE KEY `email_usuario_UNIQUE` (`email_usuario`),
  UNIQUE KEY `nombre_usuario_UNIQUE` (`nombre_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrador`
--

LOCK TABLES `administrador` WRITE;
/*!40000 ALTER TABLE `administrador` DISABLE KEYS */;
/*!40000 ALTER TABLE `administrador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alumno`
--

DROP TABLE IF EXISTS `alumno`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alumno` (
  `numero_usuario` int NOT NULL AUTO_INCREMENT,
  `nombre_apellido_alumno` varchar(45) NOT NULL,
  `email_usuario` varchar(45) NOT NULL,
  `nombre_usuario` varchar(45) NOT NULL,
  `telefono_usuario` int NOT NULL,
  `contraseña_usuario` varchar(45) NOT NULL,
  `legajo_usuario` int NOT NULL,
  `reputacion_usuario` int DEFAULT NULL,
  `fecha_hora_suspension` datetime DEFAULT NULL,
  `motivo_suspension` varchar(60) DEFAULT NULL,
  `duracion_suspension` time DEFAULT NULL,
  `numero_admin` int NOT NULL,
  PRIMARY KEY (`numero_usuario`),
  UNIQUE KEY `nombre_usuario_UNIQUE` (`nombre_usuario`),
  UNIQUE KEY `email_usuario_UNIQUE` (`email_usuario`),
  UNIQUE KEY `legajo_usuario_UNIQUE` (`legajo_usuario`),
  KEY `numero_admin_idx` (`numero_admin`),
  CONSTRAINT `CF_ADMIN_ALUMNO` FOREIGN KEY (`numero_admin`) REFERENCES `administrador` (`numero_usuario`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumno`
--

LOCK TABLES `alumno` WRITE;
/*!40000 ALTER TABLE `alumno` DISABLE KEYS */;
/*!40000 ALTER TABLE `alumno` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `apunte`
--

DROP TABLE IF EXISTS `apunte`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `apunte` (
  `id_apunte` int NOT NULL AUTO_INCREMENT,
  `titulo_apunte` varchar(45) NOT NULL,
  `descripcion_apunte` varchar(45) DEFAULT NULL,
  `calificacion_apunte` int DEFAULT NULL,
  `fecha_hora_publicacion` datetime NOT NULL,
  `fecha_hora_baja_apunte` datetime DEFAULT NULL,
  `fecha_hora_borrado_apunte` datetime DEFAULT NULL,
  `motivo_borrado` varchar(45) DEFAULT NULL,
  `numero_alumno` int NOT NULL,
  `numero_admin` int DEFAULT NULL,
  `cod_materia` int NOT NULL,
  `archivo_apunte` longblob NOT NULL,
  `archivo_caratula` longblob NOT NULL,
  PRIMARY KEY (`id_apunte`),
  KEY `CF_APUNTE_ALUMNO_idx` (`numero_alumno`),
  KEY `CF_APUNTE_ADMIN_idx` (`numero_admin`),
  KEY `CF_APUNTE_MATERIA_idx` (`cod_materia`),
  CONSTRAINT `CF_APUNTE_ADMIN` FOREIGN KEY (`numero_admin`) REFERENCES `administrador` (`numero_usuario`) ON DELETE CASCADE,
  CONSTRAINT `CF_APUNTE_ALUMNO` FOREIGN KEY (`numero_alumno`) REFERENCES `alumno` (`numero_usuario`) ON DELETE CASCADE,
  CONSTRAINT `CF_APUNTE_MATERIA` FOREIGN KEY (`cod_materia`) REFERENCES `materia` (`cod_materia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apunte`
--

LOCK TABLES `apunte` WRITE;
/*!40000 ALTER TABLE `apunte` DISABLE KEYS */;
/*!40000 ALTER TABLE `apunte` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `compra`
--

DROP TABLE IF EXISTS `compra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `compra` (
  `numero_alumno` int NOT NULL,
  `id_apunte` int NOT NULL,
  `fecha_hora_compra` datetime NOT NULL,
  `calificacion_apunte_comprador` int DEFAULT NULL,
  PRIMARY KEY (`numero_alumno`,`id_apunte`),
  KEY `CF_APUNTE_COMPRA_idx` (`id_apunte`),
  CONSTRAINT `CF_ALUMNO_COMPRA` FOREIGN KEY (`numero_alumno`) REFERENCES `alumno` (`numero_usuario`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `CF_APUNTE_COMPRA` FOREIGN KEY (`id_apunte`) REFERENCES `apunte` (`id_apunte`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compra`
--

LOCK TABLES `compra` WRITE;
/*!40000 ALTER TABLE `compra` DISABLE KEYS */;
/*!40000 ALTER TABLE `compra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `materia`
--

DROP TABLE IF EXISTS `materia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `materia` (
  `cod_materia` int NOT NULL AUTO_INCREMENT,
  `nombre_materia` varchar(45) NOT NULL,
  `nivel_carrera` int NOT NULL,
  `fecha_hora_alta_materia` datetime NOT NULL,
  `fecha_hora_baja_materia` datetime DEFAULT NULL,
  `numero_admin` int NOT NULL,
  PRIMARY KEY (`cod_materia`),
  UNIQUE KEY `nombre_materia_UNIQUE` (`nombre_materia`),
  KEY `CF_ADMIN_MATERIA_idx` (`numero_admin`),
  CONSTRAINT `CF_ADMIN_MATERIA` FOREIGN KEY (`numero_admin`) REFERENCES `administrador` (`numero_usuario`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materia`
--

LOCK TABLES `materia` WRITE;
/*!40000 ALTER TABLE `materia` DISABLE KEYS */;
/*!40000 ALTER TABLE `materia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modificacion_apunte`
--

DROP TABLE IF EXISTS `modificacion_apunte`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `modificacion_apunte` (
  `id_apunte` int NOT NULL,
  `fecha_hora_mod_apunte` datetime NOT NULL,
  `descripcion_mod_apunte` varchar(60) NOT NULL,
  PRIMARY KEY (`id_apunte`,`fecha_hora_mod_apunte`),
  CONSTRAINT `CF_APUNTE_MODAPUNTE` FOREIGN KEY (`id_apunte`) REFERENCES `apunte` (`id_apunte`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modificacion_apunte`
--

LOCK TABLES `modificacion_apunte` WRITE;
/*!40000 ALTER TABLE `modificacion_apunte` DISABLE KEYS */;
/*!40000 ALTER TABLE `modificacion_apunte` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modificacion_materia`
--

DROP TABLE IF EXISTS `modificacion_materia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `modificacion_materia` (
  `cod_materia` int NOT NULL,
  `fecha_hora_mod_materia` datetime NOT NULL,
  `desc_mod_materia` varchar(60) NOT NULL,
  PRIMARY KEY (`cod_materia`,`fecha_hora_mod_materia`),
  CONSTRAINT `CF_MATERIA_MODMAT` FOREIGN KEY (`cod_materia`) REFERENCES `materia` (`cod_materia`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modificacion_materia`
--

LOCK TABLES `modificacion_materia` WRITE;
/*!40000 ALTER TABLE `modificacion_materia` DISABLE KEYS */;
/*!40000 ALTER TABLE `modificacion_materia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `precio`
--

DROP TABLE IF EXISTS `precio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `precio` (
  `id_apunte` int NOT NULL,
  `fecha_hora_inicio_precio` datetime NOT NULL,
  `fecha_hora_fin_precio` datetime DEFAULT NULL,
  `monto_precio` int NOT NULL,
  PRIMARY KEY (`id_apunte`,`fecha_hora_inicio_precio`),
  CONSTRAINT `CF_APUNTE_PRECIO` FOREIGN KEY (`id_apunte`) REFERENCES `apunte` (`id_apunte`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `precio`
--

LOCK TABLES `precio` WRITE;
/*!40000 ALTER TABLE `precio` DISABLE KEYS */;
/*!40000 ALTER TABLE `precio` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-28 18:16:39
