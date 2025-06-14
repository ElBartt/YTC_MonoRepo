-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: youtube
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `apianalytics`
--

DROP TABLE IF EXISTS `apianalytics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `apianalytics` (
  `id` int NOT NULL AUTO_INCREMENT,
  `api_key` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `timestamp` datetime NOT NULL,
  `route` varchar(100) NOT NULL DEFAULT '',
  `parameters` varchar(200) NOT NULL DEFAULT '',
  `method` varchar(10) NOT NULL DEFAULT '',
  `status_code` int NOT NULL DEFAULT '0',
  `response_time` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `api_key` (`api_key`),
  CONSTRAINT `FK_apianalytics_apikey` FOREIGN KEY (`api_key`) REFERENCES `apikey` (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apianalytics`
--
-- ORDER BY:  `id`

LOCK TABLES `apianalytics` WRITE;
/*!40000 ALTER TABLE `apianalytics` DISABLE KEYS */;
/*!40000 ALTER TABLE `apianalytics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `apikey`
--

DROP TABLE IF EXISTS `apikey`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `apikey` (
  `key` varchar(64) NOT NULL,
  `name` varchar(50) NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`key`),
  KEY `FK_apikey_user` (`user_id`),
  CONSTRAINT `FK_apikey_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apikey`
--
-- ORDER BY:  `key`

LOCK TABLES `apikey` WRITE;
/*!40000 ALTER TABLE `apikey` DISABLE KEYS */;
INSERT INTO `apikey` VALUES ('ZbVegepUgA3Y-NxodkGjXpnjcJdFne7qxcjHB0_rdPtsticBf-VD0C_yT8vJinHA','default',1);
/*!40000 ALTER TABLE `apikey` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `channel`
--

DROP TABLE IF EXISTS `channel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `channel` (
  `id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `thumbnail` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `FK_channel_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Represent a youtube channel';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `channel`
--
-- ORDER BY:  `id`

LOCK TABLES `channel` WRITE;
/*!40000 ALTER TABLE `channel` DISABLE KEYS */;
INSERT INTO `channel` VALUES ('UCAhaFPP6v3WCfK5Tjao0B7A','Mastu','https://yt3.googleusercontent.com/ytc/AGIKgqMkGkUHOIjSOsjtXzN2dyO8PcfRcyWdQ9kJesPg2Q=s900-c-k-c0x00ffffff-no-rj',2);
/*!40000 ALTER TABLE `channel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `commenter` varchar(64) DEFAULT NULL,
  `comment` varchar(10000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `relevance_order` int DEFAULT NULL,
  `like_count` int DEFAULT NULL,
  `reply_count` int DEFAULT NULL,
  `gpt` varchar(512) DEFAULT NULL,
  `unwanted` int DEFAULT NULL,
  `question` int DEFAULT NULL,
  `feedback` int DEFAULT NULL,
  `idea` int DEFAULT NULL,
  `collaboration` int DEFAULT NULL,
  `video_id` varchar(50) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `FK_comments_youtube.video` (`video_id`),
  CONSTRAINT `FK_comments_youtube.video` FOREIGN KEY (`video_id`) REFERENCES `videos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--
-- ORDER BY:  `id`

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'NAME',
  `is_admin` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--
-- ORDER BY:  `id`

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Default',0),(2,'Mastu',0),(3,'ElBartt',1),(4,'Sydowh',1),(5,'Khwaja',1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `videos`
--

DROP TABLE IF EXISTS `videos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `videos` (
  `id` varchar(50) NOT NULL,
  `title` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `date` date DEFAULT NULL,
  `channel_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_video_channel` (`channel_id`) USING BTREE,
  CONSTRAINT `FK_video_channel` FOREIGN KEY (`channel_id`) REFERENCES `channel` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Represent a youtube video';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `videos`
--
-- ORDER BY:  `id`

LOCK TABLES `videos` WRITE;
/*!40000 ALTER TABLE `videos` DISABLE KEYS */;
INSERT INTO `videos` VALUES ('6nFlKS-15X8','Re ! SI ├çA MARCHE, JÔÇÖEXPLOSE MON CR├éNE ­ƒñ» (Exp├®riences Tiktok improbables) #4','2023-02-18','UCAhaFPP6v3WCfK5Tjao0B7A'),('8_pemCDfQq8','JE REPRODUIS DES RECETTES DE CUISINE TIKTOK TR├êS SP├ëCIALES','2022-11-20','UCAhaFPP6v3WCfK5Tjao0B7A'),('8RBEoqndm9w','J&#39;OUVRE DES COLIS D&#39;ABONN├ëS #6 (Et y&#39;a des sacr├®s flops ­ƒÿ¡)','2023-04-01','UCAhaFPP6v3WCfK5Tjao0B7A'),('GVnGlkJ_ecw','JE R├ëALISE VOS D├ëFIS ET JE REGRETTE (ma barbe bordel ­ƒÿ¡)','2023-02-25','UCAhaFPP6v3WCfK5Tjao0B7A'),('KAQlI52dYQE','PHOTO FAITE PAR UNE IA OU VRAIE PHOTO ? (Avec JOYCA)','2023-05-20','UCAhaFPP6v3WCfK5Tjao0B7A'),('KspTPpOTHws','Mon chaton a eu un accident (fracture)','2023-04-29','UCAhaFPP6v3WCfK5Tjao0B7A'),('nJIdcnsuXMY','J&#39;ai besoin d&#39;une pause','2022-12-21','UCAhaFPP6v3WCfK5Tjao0B7A'),('O4ZEKE5p7so','ON ACCOSTE DES GENS EN VOITURE ­ƒÜù (Avec Th├®odort)','2023-05-06','UCAhaFPP6v3WCfK5Tjao0B7A'),('VhdwKmxgM7w','Je me suis fait arr├¬ter par la douaneÔÇª','2023-03-11','UCAhaFPP6v3WCfK5Tjao0B7A'),('vvh-jcSUCnc','JE ME DEMANDAIS QUI GAGNE ├Ç LA BAGARRE ENTRE LES DEUX...','2023-03-04','UCAhaFPP6v3WCfK5Tjao0B7A');
/*!40000 ALTER TABLE `videos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-04 22:42:05
