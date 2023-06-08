-- MariaDB dump 10.19  Distrib 10.6.12-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: db_flashcard
-- ------------------------------------------------------
-- Server version	10.6.12-MariaDB-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Flashcards`
--

DROP TABLE IF EXISTS `Flashcards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Flashcards` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `question` varchar(255) NOT NULL,
  `answer` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `PileId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `PileId` (`PileId`),
  CONSTRAINT `Flashcards_ibfk_1` FOREIGN KEY (`PileId`) REFERENCES `Piles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Flashcards`
--

LOCK TABLES `Flashcards` WRITE;
/*!40000 ALTER TABLE `Flashcards` DISABLE KEYS */;
INSERT INTO `Flashcards` VALUES (1,'When was the first version of JavaScript created ?','May 1996','2023-06-08 17:02:27','2023-06-08 17:02:27',1),(2,'What command will make \'hello world\' on the console ?','console.log(\'hello world\')','2023-06-08 17:04:13','2023-06-08 17:04:13',1),(3,'What are the or and the and opérator in JavaScript ?','|| and &&','2023-06-08 17:05:00','2023-06-08 17:05:00',1),(4,'What are the two modern way to create a variable in JavaScript ?','declare const name = ... or let name = ...','2023-06-08 17:05:54','2023-06-08 17:05:54',1),(5,'Who was the creator of the Ruby language ?','Yukihiro Matsumoto','2023-06-08 17:06:58','2023-06-08 17:06:58',4),(6,'When was Napoléon Bonaparte born ?','August 15th 1769','2023-06-08 17:09:56','2023-06-08 17:09:56',5),(7,'Where did Napoléon died ? In which year ?','At the island of Sainte-Hélène in 1821','2023-06-08 17:12:07','2023-06-08 17:12:07',5);
/*!40000 ALTER TABLE `Flashcards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Folders`
--

DROP TABLE IF EXISTS `Folders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Folders` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `Folders_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Folders`
--

LOCK TABLES `Folders` WRITE;
/*!40000 ALTER TABLE `Folders` DISABLE KEYS */;
INSERT INTO `Folders` VALUES (1,'JavaScript','2023-06-08 17:00:52','2023-06-08 17:00:52',1),(2,'Ruby','2023-06-08 17:00:59','2023-06-08 17:00:59',1),(3,'Rails','2023-06-08 17:01:06','2023-06-08 17:01:06',1),(4,'History','2023-06-08 17:08:19','2023-06-08 17:08:19',2),(5,'English','2023-06-08 17:08:26','2023-06-08 17:08:26',2);
/*!40000 ALTER TABLE `Folders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Piles`
--

DROP TABLE IF EXISTS `Piles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Piles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `FolderId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FolderId` (`FolderId`),
  CONSTRAINT `Piles_ibfk_1` FOREIGN KEY (`FolderId`) REFERENCES `Folders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Piles`
--

LOCK TABLES `Piles` WRITE;
/*!40000 ALTER TABLE `Piles` DISABLE KEYS */;
INSERT INTO `Piles` VALUES (1,'History','2023-06-08 17:01:19','2023-06-08 17:01:19',1),(2,'OOP','2023-06-08 17:01:26','2023-06-08 17:01:26',1),(3,'Syntax','2023-06-08 17:01:36','2023-06-08 17:01:36',1),(4,'History','2023-06-08 17:06:37','2023-06-08 17:06:37',2),(5,'Napoléon','2023-06-08 17:08:38','2023-06-08 17:08:38',4);
/*!40000 ALTER TABLE `Piles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'Benjamin','ben@gmail.com','4d4a114028d1d12101c5c7724a83544c7c6ca05b55aac3e8f228b05f0ed2a1117eabbdb6b4d0c7e1af09d006c720a4e7cffd5117df8485466eaf30f4034e4dbd','2023-06-08 17:00:33','2023-06-08 17:00:33'),(2,'Marie','marie@mail.com','a2e60e51993c8ac939dcaf8e4fe7299c2b89911cf3ae3fd8670445d9643dae7ef61449706cf94bb7a0895d5e9e8d638f19891b5e87287b2d10eebbca25767861','2023-06-08 17:08:08','2023-06-08 17:08:08');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-08 19:13:58
