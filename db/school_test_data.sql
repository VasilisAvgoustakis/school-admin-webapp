-- MySQL dump 10.13  Distrib 8.0.23, for macos10.15 (x86_64)
--
-- Host: 127.0.0.1    Database: school_db
-- ------------------------------------------------------
-- Server version	8.0.20

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


USE school_db;

-- table for user verification when registering
CREATE TABLE `verification` ( 
  `code_id` INT NOT NULL AUTO_INCREMENT , 
  `verifcode` VARCHAR(6) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL , 
  PRIMARY KEY (`code_id`)
  ) ENGINE = InnoDB; 

--
-- Dumping data for table `verification`
--
LOCK TABLES `verification` WRITE;
INSERT INTO `verification` (`code_id`, `verifcode`) VALUES
(1, '123456'),
(2, '123456'),
(3, '123456');
UNLOCK TABLES;

-- table for user authentication
CREATE TABLE `users` ( 
  `user_id` INT NOT NULL AUTO_INCREMENT , 
  `username` VARCHAR(20) NOT NULL , 
  `password` VARCHAR(1000) NOT NULL , 
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
  ) ENGINE = InnoDB; 



-- data for storing sessions
CREATE TABLE `sessions` (
   `session_id` VARCHAR(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL , 
   `expires` INT(11) UNSIGNED NOT NULL , 
   `data` MEDIUMTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL , 
   PRIMARY KEY (`session_id`)
   ) ENGINE = InnoDB; 

--
-- Table structure for table `arbeitsgruppen`
--

DROP TABLE IF EXISTS `arbeitsgruppen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `arbeitsgruppen` (
  `arbeitsgruppe_id` int NOT NULL AUTO_INCREMENT,
  `bezeichnung` varchar(50) DEFAULT NULL,
  `beschreibung` mediumtext,
  `email` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`arbeitsgruppe_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `arbeitsgruppen`
--

LOCK TABLES `arbeitsgruppen` WRITE;
/*!40000 ALTER TABLE `arbeitsgruppen` DISABLE KEYS */;
INSERT INTO `arbeitsgruppen` VALUES (1, 'Vorstand Trägerverein', '', 'vorstand@testschule.de'),
(2, 'Elternvertretung', '', 'elternvertretung@testschule.de'),
(3, 'AG Sicherheit', '', 'ag-sicherheit@testschule.de'),
(4, 'AG Bau', 'Bauen und ', 'ag-bau@testschule.de'),
(5, 'AG Renovieren', '', 'ag-renovieren@testschule.de'),
(6, 'AG Transport', '', 'ag-transport@testschule.de'),
(7, 'AG Sauberkeit', '', 'ag-sauberkeit@testschule.de'),
(8, 'AG Party', '', 'ag-party@testschule.de'),
(9, 'AG Öffentlichkeit', '', 'ag-oeffentlichkeit@testschule.de'),
(10, 'AG Fund FSX!', '', 'glitter@testschule.de'),
(11, 'AG IT und Web', NULL, 'ag-it@testschule.de'),
(12, 'AG Betreuung', 'Eltern Betreuung während Ferien oder Tema Tage!', 'ag-betreuung@testschule.de'),
(13, 'AG Bewerbungen', '', 'chancen@testschule.de'),
(14, 'AG Schulplatzvergabe', '', 'schulplatz@testschule.de'),
(15, 'AG Test', 'Testing ', 'testing@testschule.debug');
/*!40000 ALTER TABLE `arbeitsgruppen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bezugsperson_kind`
--

DROP TABLE IF EXISTS `bezugsperson_kind`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bezugsperson_kind` (
  `person_id_1` int NOT NULL,
  `person_id_2` int NOT NULL,
  `beziehung_zu_person2` enum('Elternteil','Andere') DEFAULT NULL,
  `recht_gegenueber_person_2` enum('Sorgerecht','Umgangsrecht/Abholen','Keine') DEFAULT NULL,
  PRIMARY KEY (`person_id_2`,`person_id_1`),
  KEY `PersonID_2_idx` (`person_id_2`),
  KEY `fk_PersonID_1` (`person_id_1`),
  CONSTRAINT `fk_PersonID_1` FOREIGN KEY (`person_id_1`) REFERENCES `personen` (`person_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_PersonID_2` FOREIGN KEY (`person_id_2`) REFERENCES `personen` (`person_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bezugsperson_kind`
--

LOCK TABLES `bezugsperson_kind` WRITE;
/*!40000 ALTER TABLE `bezugsperson_kind` DISABLE KEYS */;
INSERT INTO `bezugsperson_kind` VALUES (145,58,'Elternteil','Sorgerecht'),(202,58,'Andere','Sorgerecht'),(150,62,'Elternteil','Sorgerecht'),(185,62,'Andere','Sorgerecht'),(299,62,'Andere','Sorgerecht'),(139,63,'Elternteil','Sorgerecht'),(146,63,'Elternteil','Sorgerecht'),(262,64,'Andere','Sorgerecht'),(298,64,'Andere','Sorgerecht'),(225,65,'Andere','Sorgerecht'),(259,65,'Andere','Sorgerecht'),(137,66,'Elternteil','Sorgerecht'),(265,66,'Andere','Sorgerecht'),(272,68,'Andere','Sorgerecht'),(273,68,'Andere','Sorgerecht'),(136,69,'Elternteil','Sorgerecht'),(286,69,'Andere','Sorgerecht'),(196,70,'Andere','Sorgerecht'),(263,70,'Andere','Sorgerecht'),(201,71,'Andere','Sorgerecht'),(206,71,'Andere','Sorgerecht'),(122,72,'Elternteil','Sorgerecht'),(132,72,'Elternteil','Sorgerecht'),(140,73,'Elternteil','Sorgerecht'),(258,73,'Andere','Sorgerecht'),(280,76,'Andere','Sorgerecht'),(281,76,'Andere','Sorgerecht'),(171,77,'Andere','Sorgerecht'),(194,77,'Andere','Sorgerecht'),(198,78,'Andere','Sorgerecht'),(243,78,'Andere','Sorgerecht'),(168,79,'Andere','Sorgerecht'),(195,79,'Andere','Sorgerecht'),(252,80,'Andere','Sorgerecht'),(290,80,'Andere','Sorgerecht'),(111,81,'Elternteil','Sorgerecht'),(253,81,'Andere','Sorgerecht'),(264,81,'Andere','Sorgerecht'),(114,82,'Elternteil','Sorgerecht'),(213,82,'Andere','Sorgerecht'),(209,83,'Andere','Sorgerecht'),(244,83,'Andere','Sorgerecht'),(226,84,'Andere','Sorgerecht'),(227,84,'Andere','Sorgerecht'),(216,85,'Andere','Sorgerecht'),(217,85,'Andere','Sorgerecht'),(272,86,'Andere','Sorgerecht'),(273,86,'Andere','Sorgerecht'),(262,87,'Andere','Sorgerecht'),(298,87,'Andere','Sorgerecht'),(284,88,'Andere','Sorgerecht'),(285,88,'Andere','Sorgerecht'),(117,89,'Elternteil','Sorgerecht'),(118,89,'Elternteil','Sorgerecht'),(228,90,'Elternteil','Sorgerecht'),(247,91,'Andere','Sorgerecht'),(248,91,'Andere','Sorgerecht'),(135,92,'Elternteil','Sorgerecht'),(161,92,'Andere','Sorgerecht'),(134,93,'Elternteil','Sorgerecht'),(265,93,'Andere','Sorgerecht'),(280,94,'Andere','Sorgerecht'),(281,94,'Andere','Sorgerecht'),(242,95,'Andere','Sorgerecht'),(254,95,'Andere','Sorgerecht'),(203,96,'Andere','Sorgerecht'),(221,96,'Andere','Sorgerecht'),(142,97,'Elternteil','Sorgerecht'),(231,97,'Andere','Sorgerecht'),(119,98,'Elternteil','Sorgerecht'),(256,98,'Andere','Sorgerecht'),(113,99,'Elternteil','Sorgerecht'),(207,99,'Andere','Sorgerecht'),(165,100,'Andere','Sorgerecht'),(166,100,'Andere','Sorgerecht'),(122,101,'Elternteil','Sorgerecht'),(132,101,'Elternteil','Sorgerecht'),(225,102,'Andere','Sorgerecht'),(259,102,'Andere','Sorgerecht'),(135,103,'Elternteil','Sorgerecht'),(161,103,'Andere','Sorgerecht'),(128,104,'Elternteil','Sorgerecht'),(187,104,'Andere','Sorgerecht'),(184,105,'Andere','Sorgerecht'),(278,105,'Andere','Sorgerecht'),(198,106,'Andere','Sorgerecht'),(243,106,'Andere','Sorgerecht'),(126,107,'Elternteil','Sorgerecht'),(224,107,'Andere','Sorgerecht'),(168,108,'Andere','Sorgerecht'),(195,108,'Andere','Sorgerecht');
/*!40000 ALTER TABLE `bezugsperson_kind` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `haushalte`
--

DROP TABLE IF EXISTS `haushalte`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `haushalte` (
  `haushalt_id` int NOT NULL AUTO_INCREMENT,
  `bezeichnung` varchar(100) DEFAULT NULL,
  `strasse` varchar(50) DEFAULT NULL,
  `postleitzahl` varchar(6) DEFAULT NULL,
  `ort` varchar(50) DEFAULT NULL,
  `region` varchar(5) DEFAULT NULL,
  `ortsteil_berlin` varchar(50) DEFAULT NULL,
  `quartiersmanagement_gebiet` tinyint(1) DEFAULT '0',
  `telefon` varchar(20) DEFAULT NULL,
  `adress_zusatz` varchar(50) DEFAULT NULL,
  `land` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`haushalt_id`),
  UNIQUE KEY `HaushaltID_UNIQUE` (`haushalt_id`)
) ENGINE=InnoDB AUTO_INCREMENT=155 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `haushalte`
--

LOCK TABLES `haushalte` WRITE;
/*!40000 ALTER TABLE `haushalte` DISABLE KEYS */;
INSERT INTO `haushalte` VALUES 
(1, '', 'Adalbertstr. 73','10997','Berlin','','Kreuzberg',0,'','',''),
(2, 'testa', 'Admiralstr. 16', '10999', 'Brandenburg', 'BER', 'Kreuzberg', 1, '49305645652342', '10999', 'DE'),
(3, 'test bezeichnung3', 'Allerstr. 18', '12049', 'Berlin', NULL, 'Neukölln', NULL, '0030554665465', NULL, NULL),
(4, NULL, 'Am Alten Wehr 17', '61119', 'Bad Vilbel', '', '', 1, '', '', ''),
(5, NULL, 'Am Kirchplatz 11', '37213', 'Witzenhausen', '', '', 1, '', '', ''),
(6, 'dis is bez', 'Arndtstr. 43', '10965', 'Berlin', '', 'Kreuzberg', 1, '', '', ''),
(7, NULL, 'Bergfriedstr. 8A', '10969', 'Berlin', '', 'Kreuzberg', 1, '', '', ''),
(8, NULL, 'Birkenstr. 20', '10559', 'Berlin', '', 'Moabit', 1, '', '', ''),
(9, NULL, 'Blücherstr. 18', '10961', 'Berlin', '', 'Kreuzberg', 1, '', '', ''),
(10, NULL, 'Böhmische Str. 10', '12055', 'Berlin', '', 'Neukölln', 1, '', '', ''),
(11, NULL, 'Boppstr. 11', '10967', 'Berlin', '', 'Kreuzberg', 1, '', '', ''),
(12, NULL, 'Bornsdorfer Str. 27', '12053', 'Berlin', '', 'Neukölln', 1, '', '', ''),
(13, NULL, 'Carl-Herz-Ufer 15', '10961', 'Berlin', '', 'Kreuzberg', 1, '', '', ''),
(14, NULL, 'Carl-Herz-Ufer 15', '10961', 'Berlin', '', 'Kreuzberg', 1, '', '', ''),
(15, NULL, 'Charlottenstr. 4', '10315', 'Berlin', '', '', 1, '', '', ''),
(16, NULL, 'Cuvrystr. 30', '10999', 'Berlin', '', 'Kreuzberg', 1, '', '', ''),
(17, NULL, 'Dieffenbachstr. 38', '10967', 'Berlin', '', 'Kreuzberg', 1, '', '', ''),
(18, NULL, 'Dr.-Ehrhardt-Str. 26', '66386', 'St. Ingbert', '', '', 1, '', '', ''),
(19, NULL, 'Eberswalderstr. 36', '10437', 'Berlin', '', 'Prenzlauer Berg', 0, '', '', ''),
(20, NULL, 'Eichelkamp 3', '14469', 'Potsdam', '', '', 0, '', '', ''),
(21, NULL, 'Eichenroder Ring 3', '13435', 'Berlin', '', 'Wittenau', 0, '', '', ''),
(22, NULL, 'Eisenbahnstr. 11', '10997', 'Berlin', '', 'Kreuzberg', 0, '', '', ''),
(23, NULL, 'Engeldamm 40', '10179', 'Berlin', '', 'Mitte', 0, '', '', ''),
(24, NULL, 'Erkelenzdamm 33', '10999', 'Berlin', '', 'Kreuzberg', 0, '', '', ''),
(25, NULL, 'Erkstr. 4', '12043', 'Berlin', '', 'Neukölln', 0, '', '', ''),
(26, NULL, 'Fidicinstr. 35', '10965', 'Berlin', '', 'Kreuzberg', 0, '030 22355792', '', ''),
(27, NULL, 'Finowstr. 39', '10247', 'Berlin', '', 'Friedrichshain', 0, '', '', ''),
(28, NULL, 'Fraenkelufer 28', '10999', 'Berlin', '', 'Kreuzberg', 0, '', '', ''),
(29, NULL, 'Friedelstr. 35', '12047', 'Berlin', '', 'Neukölln', 0, '', '', ''),
(30, NULL, 'Fuldastr. 37', '12045', 'Berlin', '', 'Neukölln', 0, '', '', ''),
(31, NULL, 'Gießener Str. 3', '61118', 'Bad Vilbel', '', '', 0, '', '', ''),
(32, NULL, 'Görlitzer Str. 44', '10997', 'Berlin', '', 'Kreuzberg', 0, '', '', ''),
(33, NULL, 'Graefestr. 88', '10967', 'Berlin', '', 'Kreuzberg', 0, '030 56978454', '', ''),
(34, NULL, 'Grünberger Str. 55', '10245', 'Berlin', '', 'Friedrichshain', 0, '', '', ''),
(35, NULL, 'Gürtelstr. 13', '10247', 'Berlin', '', 'Friedrichshain', 0, '', '', ''),
(36, NULL, 'Hammerthal 3', '16259', 'Bad Freienwalde', '', '', 0, '', '', ''),
(37, NULL, 'Hans-Thoma-Str. 3', '12435', 'Berlin', '', 'Plänterwald', 0, '', '', ''),
(38, NULL, 'Hans-Thoma-Str. 3', '12435', 'Berlin', '', 'Plänterwald', 0, '', '', ''),
(39, NULL, 'Haynstr. 1', '20249', 'Hamburg', '', '', 0, '', '', ''),
(40, NULL, 'Heidelberger Str. 32', '12059', 'Berlin', '', '', 0, '', '', ''),
(41, NULL, 'Heidelberger Str. 81', '12435', 'Berlin', '', 'Alt-Treptow', 0, '', '', ''),
(42, NULL, 'Heidelberger Str. 81', '12435', 'Berlin', '', 'Alt-Treptow', 0, '', '', ''),
(43, NULL, 'Heidelberger Str. 81', '12045', 'Berlin', '', 'Alt-Treptow', 0, '', '', ''),
(44, NULL, 'Hermannstr. 202', '12049', 'Berlin', '', 'Neukölln', 0, '', '', ''),
(45, NULL, 'Hermannstr. 230', '12049', 'Berlin', '', 'Neukölln', 0, '', '', ''),
(46, NULL, 'Hoenerweg 9', '10367', 'Berlin', '', 'Lichtenberg', 0, '', '', ''),
(47, NULL, 'Hohenfriedbergstraße 9 ', '10829', 'Berlin', '', 'Schöneberg', 0, '', 'bei Binkowski ', ''),
(48, NULL, 'Isarstr. 11', '12053', 'Berlin', '', 'Neukölln', 0, '030 29001420', '', ''),
(49, NULL, 'Jahnstr. 13', '10967', 'Berlin', '', 'Kreuzberg', 0, '030 81492817', '', ''),
(50, NULL, 'Josef-Orlopp-Str. 14', '10367', 'Berlin', '', 'Friedrichshain', 0, '', '', ''),
(51, NULL, 'Josef-Orlopp-Str. 52', '10365', 'Berlin', '', 'Lichtenberg', 0, '', '', ''),
(52, NULL, 'Jupiterstr. 9', '12057', 'Berlin', '', 'Neukölln', 0, '', '', ''),
(53, NULL, 'Karl-Kunger-Str. 26', '12435', 'Berlin', '', 'Alt-Treptow', 0, '', '', ''),
(54, NULL, 'Karlsgartenstr. 15', '12049', 'Berlin', '', 'Neukölln', 0, '', '', ''),
(55, NULL, 'Kiefholzstr. 186', '12437', 'Berlin', '', 'Baumschulenweg', 0, '', '', ''),
(56, NULL, 'Kiefholzstr. 6', '12435', 'Berlin', '', 'Alt-Treptow', 0, '', '', ''),
(57, NULL, 'Kohlfurter Str. 40', '10999', 'Berlin', '', 'Kreuzberg', 0, '', '', ''),
(58, NULL, 'Lachmannstr. 4', '10967', 'Berlin', '', 'Kreuzberg', 0, '030 6936968', '', ''),
(59, NULL, 'Landsberger Allee 70 ', '10249', 'Berlin', '', 'Kreuzberg', 0, '', '', ''),
(60, NULL, 'Lausitzer Platz 10', '10997', 'Berlin', '', 'Kreuzberg', 0, '', '', ''),
(61, NULL, 'Lausitzer Platz 16', '10997', 'Berlin', '', 'Kreuzberg', 0, '030 44038001', '', ''),
(62, NULL, 'Lausitzer Platz 9', '10997', 'Berlin', '', 'Kreuzberg', 0, '', '', ''),
(63, NULL, 'Leonberger Str. 30', '71638', 'Ludwigsburg', '', '', 0, '', '', ''),
(64, NULL, 'Lohmühlenstr. 45', '12435', 'Berlin', '', 'Alt-Treptow', 0, '', '', ''),
(65, NULL, 'Löwestr. 16', '10249', 'Berlin', '', 'Friedrichshain', 0, '', '', ''),
(66, NULL, 'Lübbener Str. 21', '10997', 'Berlin', '', 'Kreuzberg', 0, '', '', ''),
(67, NULL, 'Lübbener Str. 21 ', '10997', 'Berlin', '', 'Kreuzberg', 0, '', '', ''),
(68, NULL, 'Lübbener Str. 27', '10997', 'Berlin', '', 'Kreuzberg', 0, '', '', ''),
(69, NULL, 'Luisenstr. 18', '14542', 'Werder / Havel', '', '', 0, '', '', ''),
(70, NULL, 'Manteuffelstr. 100', '10997', 'Berlin', '', 'Kreuzberg', 0, '', '', ''),
(71, NULL, 'Manteuffelstr. 20', '10997', 'Berlin', '', 'Kreuzberg', 0, '', '', ''),
(72, NULL, 'Manteuffelstr. 27', '10997', 'Berlin', '', 'Kreuzberg', 0, '', '', ''),
(73, NULL, 'Manteuffelstr. 39', '10997', 'Berlin', '', 'Kreuzberg', 0, '', '', ''),
(74, NULL, 'Manteuffelstr. 7', '10997', 'Berlin', '', 'Kreuzberg', 0, '07611371893', '', ''),
(75, NULL, 'Manteuffelstr. 7', '10997', 'Berlin', '', 'Kreuzberg', 0, '', '', ''),
(76, NULL, 'Manteuffelstr. 86', '10997', 'Berlin', '', 'Kreuzberg', 0, '', '', ''),
(77, NULL, 'Mariannenplatz 1', '10997', 'Berlin', '', 'Kreuzberg', 0, '', '', ''),
(78, NULL, 'Mariannenplatz 1a', '10997', 'Berlin', '', 'Kreuzberg', 0, '', '', ''),
(79, NULL, 'Mariendorfer Weg 35', '12051', 'Berlin', '', '', 0, '', '', ''),
(80, NULL, 'Märkische Allee 158', '12681', 'Berlin', '', 'Marzahn', 0, '', 'bei Hofmann', ''),
(81, NULL, 'Marktstr. 22', '21423', 'Winsen/Luhe', '', '', 0, '', '', ''),
(82, NULL, 'Matternstr. 3', '10249', 'Berlin', '', 'Friedrichshain', 0, '', '', ''),
(83, NULL, 'Mengerzeile 11', '12435', 'Berlin', '', 'Alt-Treptow', 0, '', '', ''),
(84, NULL, 'Muskauer Str. 35', '10997', 'Berlin', '', 'Kreuzberg', 0, '030 82074151', '', ''),
(85, NULL, 'Muskauerstr. 23', '10997', 'Berlin', '', 'Kreuzberg', 0, '', '', ''),
(86, NULL, 'Naunynstr. 21', '10997', 'Berlin', '', 'Kreuzberg', 0, '', '', ''),
(87, NULL, 'Naunynstr. 23', '10997', 'Berlin', '', 'Kreuzberg', 0, '', '', ''),
(88, NULL, 'Naunynstr. 46', '10999', 'Berlin', '', 'Kreuzberg', 0, '', '', ''),
(89, NULL, 'Naunynstr. 52', '10997', 'Berlin', '', 'Kreuzberg', 0, '030 61107213', '', ''),
(90, NULL, 'Naunynstr. 61', '10999', 'Berlin', '', 'Kreuzberg', 0, '', '', ''),
(91, NULL, 'Naunynstr. 83', '10997', 'Berlin', '', 'Kreuzberg', 0, '', '', ''),
(92, NULL, 'Niederbarnimstr. 15', '10247', 'Berlin', '', 'Friedrichshain', 0, '', '', ''),
(93, NULL, 'Ohlauer Str. 8', '10999', 'Berlin', '', 'Kreuzberg', 0, '', '', ''),
(94, NULL, 'Oppelner Str. 8', '10997', 'Berlin', '', 'Kreuzberg', 0, '', '', ''),
(95, NULL, 'Oranienstr. 176', '10999', 'Berlin', '', 'Kreuzberg', 0, '', '', ''),
(96, NULL, 'Oranienstr. 22', '10999', 'Berlin', '', 'Kreuzberg', 0, '', '', ''),
(97, NULL, 'Ossastr. 17', '12045', 'Berlin', '', 'Neukölln', 0, '', '', ''),
(98, NULL, 'Pannierstr. 57', '12047', 'Berlin', '', 'Neukölln', 0, '', '', ''),
(99, NULL, 'Pariser Str. 63', '10719', 'Berlin', '', 'Wilmersdorf', 0, '', '', ''),
(100, NULL, 'Paul-Lincke-Ufer 44a', '10999', 'Berlin', '', 'Kreuzberg', 0, '', '', ''),
(101, NULL, 'Pestalozzistr. 43', '13187', 'Berlin', '', 'Pankow', 0, '', '', ''),
(102, NULL, 'Pflügerstr. 15', '12047', 'Berlin', '', 'Neukölln', 0, '', '', ''),
(103, NULL, 'Pfuelstr. 6', '10997', 'Berlin', '', 'Kreuzberg', 0, '', '', ''),
(104, NULL, 'Platanenstr. 32', '12529', 'Schönefeld', '', '', 0, '', '', ''),
(105, NULL, 'Platanenweg 36', '12437', 'Berlin', '', '', 0, '', '', ''),
(106, NULL, 'Prinzessinnenstr. 2', '10969', 'Berlin', '', 'Kreuzberg', 0, '', '', ''),
(107, NULL, 'Pücklerstr. 25', '10997', 'Berlin', '', 'Kreuzberg', 0, '', '', ''),
(108, NULL, 'Reichenberger Str. 122', '10997', 'Berlin', '', 'Kreuzberg', 0, '', '', ''),
(109, NULL, 'Reichenberger Str. 144', '10999', 'Berlin', '', 'Kreuzberg', 0, '', '', ''),
(110, NULL, 'Reichenberger Str. 144', '10999', 'Berlin', '', 'Kreuzberg', 0, '', '', ''),
(111, NULL, 'Reuterstr. 32A', '12047', 'Berlin', '', 'Neukölln', 0, '', '', ''),
(112, NULL, 'Richardstr. 110', '12043', 'Berlin', '', 'Neukölln', 0, '', '', ''),
(113, NULL, 'Samariterstr. 32', '10247', 'Berlin', '', 'Friedrichshain', 0, '', '', ''),
(114, NULL, 'Scharnweberstr. 38', '10245', 'Berlin', '', 'Friedrichshain', 0, '', '', ''),
(115, NULL, 'Scharnweberstr. 38', '10247', 'Berlin', '', 'Friedrichshain', 0, '', '', ''),
(116, NULL, 'Schillerpromenade 10', '12049', 'Berlin', '', 'Neukölln', 0, '', '', ''),
(117, NULL, 'Schlegelstr. 14', '10115', 'Berlin', '', 'Mitte', 0, '', '', ''),
(118, NULL, 'Schmollerplatz 29', '12435', 'Berlin', '', 'Alt-Treptow', 0, '', '', ''),
(119, NULL, 'Seckbacher Landstraße 22', '60389', 'Frankfurt / Main', '', '', 0, '', '', ''),
(120, NULL, 'Seumestr. 22', '10245', 'Berlin', '', 'Friedrichshain', 0, '', '', ''),
(121, NULL, 'Sorauer Str. 6', '10997', 'Berlin', '', 'Kreuzberg', 0, '', '', ''),
(122, NULL, 'Spittastr. 33', '10317', 'Berlin', '', 'Rummelsburg', 0, '', '', ''),
(123, NULL, 'Steinrötschstr. 62', '52152', 'Simmerath', '', '', 0, '', '', ''),
(124, NULL, 'Stralauer Platz 32', '10243', 'Berlin', '', 'Friedrichshain', 0, '', '', ''),
(125, NULL, 'Stralauer Platz 32', '10243', 'Berlin', '', 'Friedrichshain', 0, '', '', ''),
(126, NULL, 'Stubnitzstr. 27A', '13189', 'Berlin', '', 'Pankow', 0, '', '', ''),
(127, NULL, 'Waldemarstr. 24', '10999', 'Berlin', '', 'Kreuzberg', 0, '', '', ''),
(128, NULL, 'Weichselstr 29', '10247', 'Berlin', '', 'Friedrichshain', 0, '', '', ''),
(129, NULL, 'Weichselstr. 48', '12045', 'Berlin', '', 'Neukölln', 0, '', '', ''),
(130, NULL, 'Weserstr. 181', '12045', 'Berlin', '', 'Neukölln', 0, '', '', ''),
(131, NULL, 'Weserstr. 31', '10247', 'Berlin', '', 'Friedrichshain', 0, '', '', ''),
(132, NULL, 'Weserstr. 52', '12045', 'Berlin', '', 'Neukölln', 0, '', '', ''),
(133, NULL, 'Wiener Str. 20', '10999', 'Berlin', '', 'Kreuzberg', 0, '030 53211501', '', ''),
(134, NULL, 'Wilibald-Alexis-Str. 33', '10965', 'Berlin', '', 'Kreuzberg', 0, '030 91441710', '', ''),
(135, NULL, 'Wilsnacker Str. 40', '10559', 'Berlin', '', 'Moabit', 0, '', '', ''),
(136, NULL, 'Winckelmannstr. 73', '12487', 'Berlin', '', 'Johannisthal', 0, '030 32304155', '', ''),
(137, NULL, 'Wrangelstr. 8', '10997', 'Berlin', '', 'Kreuzberg', 0, '', '', ''),
(138, NULL, 'Zeppelinstr. 25', '14471', 'Potsdam', '', '', 0, '', '', ''),
(139, NULL, 'Astr. 139', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(140, 'TestBez', 'Teststr. 202', '10999', NULL, NULL, NULL, 0, NULL, NULL, NULL),
(141, 'dasfd', 'fasdfasdf. 123', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(142, 'dis is bez', 'Aabstr. 122', '10999', 'Brandenburg', 'BER', 'Kreuzberg', 0, '42034238', '10999', 'DE'),
(143, NULL, '', '', '', '', '', 0, '', '', ''),
(144, NULL, '', '', '', '', '', 0, '', '', ''),
(145, NULL, '', '', '', '', '', 0, '', '', ''),
(146, NULL, '', '', '', '', '', 0, '', '', ''),
(147, NULL, '', '', '', '', '', 0, '', '', ''),
(148, NULL, '', '', '', '', '', 0, '', '', ''),
(149, NULL, '', '', '', '', '', 0, '', '', ''),
(150, NULL, '', '', '', '', '', 0, '', '', ''),
(151, NULL, '', '', '', '', '', 0, '', '', ''),
(152, NULL, '', '', '', '', '', 0, '', '', ''),
(153, NULL, '', '', '', '', '', 0, '', '', ''),
(154, NULL, '', '', '', '', '', 0, '', '', ''),
(155, 'dis is new', 'Newstrs. 202', '12049', NULL, NULL, NULL, 0, NULL, NULL, NULL),
(156, 'dis is new2', 'Newstrs. 203', '12049', NULL, NULL, NULL, 0, NULL, NULL, 'DE'),
(157, 'test Haus', 'teststr. 12', '12049', 'Berlin', 'KZB', 'Kreuzberg', 0, '423749', NULL, 'DE');/*!40000 ALTER TABLE `haushalte` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jahrgangswechsel`
--

DROP TABLE IF EXISTS `jahrgangswechsel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jahrgangswechsel` (
  `person_id` int NOT NULL,
  `datum` date NOT NULL,
  `wert` int NOT NULL DEFAULT '0',
  `grund` enum('Verkuerzung Schulanfangsphase (Klasse 1 und 2)','Ueberspringen (Klasse 3 bis 6)','Verlaengerung Schulanfangsphase (Klasse 1 und2)','Wiederholung (Klasse 3 bis 6)','Freiwillige Wiederholung (Klasse 3 bis 6)','Ruecktritt (Klasse 3 bis 6)') NOT NULL,
  PRIMARY KEY (`person_id`,`datum`),
  CONSTRAINT `fk_Person_Jahrgangswechsel` FOREIGN KEY (`person_id`) REFERENCES `personen` (`person_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jahrgangswechsel`
--

LOCK TABLES `jahrgangswechsel` WRITE;
/*!40000 ALTER TABLE `jahrgangswechsel` DISABLE KEYS */;
INSERT INTO `jahrgangswechsel` VALUES (58,'2021-07-31',-1,'Freiwillige Wiederholung (Klasse 3 bis 6)'),(64,'2021-07-31',-1,'Freiwillige Wiederholung (Klasse 3 bis 6)'),(76,'2021-07-31',-1,'Freiwillige Wiederholung (Klasse 3 bis 6)');
/*!40000 ALTER TABLE `jahrgangswechsel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kind_betreuung`
--

DROP TABLE IF EXISTS `kind_betreuung`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kind_betreuung` (
  `person_id` int NOT NULL,
  `betreuung_beginn` date NOT NULL,
  `betreuung_ende` date NOT NULL,
  `betreuung_umfang` enum('16:00','18:00') DEFAULT NULL,
  `betreuung_ferien` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`person_id`,`betreuung_beginn`,`betreuung_ende`),
  KEY `fk_Kind_Finanzierung` (`person_id`),
  CONSTRAINT `fk_Kind_Finanzierung` FOREIGN KEY (`person_id`) REFERENCES `personen` (`person_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kind_betreuung`
--

LOCK TABLES `kind_betreuung` WRITE;
/*!40000 ALTER TABLE `kind_betreuung` DISABLE KEYS */;
INSERT INTO `kind_betreuung` VALUES (62,'2016-08-01','2020-07-31','16:00',1),(63,'2016-09-01','2020-07-31','18:00',1),(64,'2017-06-01','2020-07-31','16:00',0),(68,'2017-08-01','2021-07-31','16:00',1),(69,'2017-08-01','2021-07-31','18:00',1),(70,'2017-08-01','2021-07-31','18:00',1),(71,'2017-08-01','2021-07-31','18:00',1),(72,'2017-08-01','2021-07-31','18:00',1),(65,'2018-02-01','2018-04-30','18:00',0),(76,'2018-08-01','2022-07-31','18:00',1),(77,'2018-08-01','2022-07-31','18:00',1),(78,'2018-08-01','2022-07-31','18:00',1),(79,'2018-08-01','2022-07-31','16:00',1),(80,'2018-08-01','2022-07-31','16:00',1),(82,'2018-09-01','2022-07-31','16:00',1),(65,'2018-10-22','2021-07-31','16:00',0),(84,'2019-08-01','2023-07-31','16:00',1),(85,'2019-08-01','2023-07-31','18:00',1),(86,'2019-08-01','2021-07-31','16:00',0),(87,'2019-08-01','2021-07-31','16:00',0),(88,'2019-08-01','2023-07-31','16:00',1),(89,'2019-08-01','2023-07-31','18:00',1),(90,'2019-08-01','2021-07-31','16:00',0),(91,'2019-08-01','2023-07-31','18:00',1),(92,'2019-08-01','2023-07-31','18:00',1),(81,'2019-08-06','2022-07-31','16:00',0),(66,'2020-02-01','2020-07-31','18:00',0),(63,'2020-08-01','2022-07-31','18:00',0),(64,'2020-08-01','2022-07-31','16:00',0),(94,'2020-08-01','2024-07-31','18:00',1),(95,'2020-08-01','2024-07-31','18:00',1),(96,'2020-08-01','2024-07-31','16:00',1),(97,'2020-08-01','2024-07-31','16:00',1),(98,'2020-08-01','2024-07-31','16:00',1),(99,'2020-08-01','2024-07-31','16:00',1),(100,'2020-08-01','2024-07-31','18:00',1),(101,'2020-08-01','2024-07-31','16:00',1),(102,'2020-08-01','2024-07-31','16:00',1),(58,'2020-09-21','2022-07-31','16:00',0),(66,'2020-11-01','2022-07-31','18:00',0),(93,'2020-11-01','2024-07-31','18:00',1),(73,'2021-04-01','2021-07-31','16:00',0),(68,'2021-08-01','2023-07-31','16:00',0),(69,'2021-08-01','2023-07-31','16:00',0),(70,'2021-08-01','2023-07-31','18:00',0),(72,'2021-08-01','2023-07-31','16:00',0),(73,'2021-08-01','2023-07-31','16:00',0),(86,'2021-08-01','2023-07-31','16:00',0),(87,'2021-08-01','2023-07-31','16:00',0),(103,'2021-08-01','2025-07-31','16:00',0),(105,'2021-08-01','2023-07-31','16:00',0),(106,'2021-08-01','2025-07-31','18:00',1),(107,'2021-08-01','2023-07-31','18:00',0),(108,'2021-08-01','2023-07-31','18:00',0);
/*!40000 ALTER TABLE `kind_betreuung` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kind_but`
--

DROP TABLE IF EXISTS `kind_but`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kind_but` (
  `person_id` int NOT NULL,
  `but_beginn` date NOT NULL,
  `but_ende` date DEFAULT NULL,
  `berlinpass_but` tinyint(1) DEFAULT NULL,
  PRIMARY KEY(`person_id`, `but_beginn`),
  KEY `fk_Kind_BuT_idx` (`person_id`),
  CONSTRAINT `fk_Kind_BuT` FOREIGN KEY (`person_id`) REFERENCES `personen` (`person_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kind_but`
--

LOCK TABLES `kind_but` WRITE;
/*!40000 ALTER TABLE `kind_but` DISABLE KEYS */;
/*!40000 ALTER TABLE `kind_but` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kind_daten`
--

DROP TABLE IF EXISTS `kind_daten`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kind_daten` (
  `staatsangehoerigkeit` varchar(20) DEFAULT NULL,
  `geburtsort` varchar(50) DEFAULT NULL,
  `geschlecht` enum('m','f','n') DEFAULT NULL,
  `nichtdeutsche_herkunftssprache` tinyint(1) DEFAULT NULL,
  `person_id` int NOT NULL,
  UNIQUE KEY `PersonID_UNIQUE` (`person_id`),
  CONSTRAINT `fk_KindDaten_Person` FOREIGN KEY (`person_id`) REFERENCES `personen` (`person_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kind_daten`
--

LOCK TABLES `kind_daten` WRITE;
/*!40000 ALTER TABLE `kind_daten` DISABLE KEYS */;
INSERT INTO `kind_daten` VALUES ('DE',NULL,'m',0,58),('DE',NULL,'m',0,62),('DE',NULL,'m',0,63),('DE',NULL,'f',0,64),('DE',NULL,'m',0,65),('DE',NULL,'m',0,66),('DE',NULL,'f',0,68),('DE',NULL,'m',0,69),('DE',NULL,'m',0,70),('DE',NULL,'m',0,71),('DE',NULL,'f',0,72),('DE',NULL,'f',0,73),('DE',NULL,'m',0,76),('DE',NULL,'m',0,77),('DE',NULL,'m',0,78),('DE',NULL,'m',1,79),('GR',NULL,'f',1,80),('IR',NULL,'f',1,81),('GR',NULL,'m',1,82),('DE',NULL,'f',0,83),('DE',NULL,'n',0,84),('DE',NULL,'m',0,85),('DE',NULL,'m',0,86),('DE',NULL,'f',0,87),('BG',NULL,'f',1,88),('DE',NULL,'f',0,89),('CH/ES',NULL,'m',1,90),('CH',NULL,'m',0,91),('DE',NULL,'m',0,92),('DE/FR',NULL,'m',0,93),('DE',NULL,'m',0,94),(NULL,NULL,'m',1,95),('DE',NULL,'f',0,96),('DE',NULL,'f',0,97),('DE',NULL,'f',0,98),('DE',NULL,'f',0,99),('DE',NULL,'m',0,100),('DE',NULL,'f',0,101),('DE',NULL,'m',0,102),('DE',NULL,'f',1,103),('DE',NULL,'f',1,104),(NULL,NULL,'f',1,105),('DE',NULL,'m',0,106),('DE/CH',NULL,'f',0,107),('DE',NULL,'m',0,108);
/*!40000 ALTER TABLE `kind_daten` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kind_lerngruppe`
--

DROP TABLE IF EXISTS `kind_lerngruppe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kind_lerngruppe` (
  `person_id` int NOT NULL,
  `lerngruppe_id` int NOT NULL,
  `eintrittsdatum` date NOT NULL,
  PRIMARY KEY (`person_id`,`lerngruppe_id`,`eintrittsdatum`),
  KEY `Learngruppe_idx` (`lerngruppe_id`),
  CONSTRAINT `Learngruppe_Person` FOREIGN KEY (`lerngruppe_id`) REFERENCES `lerngruppen` (`lerngruppe_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Person_Lerngruppe` FOREIGN KEY (`person_id`) REFERENCES `personen` (`person_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kind_lerngruppe`
--

LOCK TABLES `kind_lerngruppe` WRITE;
/*!40000 ALTER TABLE `kind_lerngruppe` DISABLE KEYS */;
INSERT INTO `kind_lerngruppe` VALUES (62,1,'2016-08-01'),(63,1,'2016-09-01'),(64,1,'2017-05-15'),(65,1,'2018-01-22'),(68,1,'2017-08-01'),(69,1,'2017-08-01'),(70,1,'2017-08-01'),(71,1,'2017-08-01'),(72,1,'2017-08-01'),(76,1,'2018-08-01'),(77,1,'2018-08-01'),(78,1,'2018-08-01'),(79,1,'2018-08-01'),(80,1,'2018-08-01'),(81,1,'2018-08-01'),(82,1,'2019-10-30'),(84,1,'2019-08-01'),(85,1,'2019-08-01'),(86,1,'2019-08-01'),(87,1,'2019-08-01'),(88,1,'2019-08-01'),(89,1,'2019-08-01'),(90,1,'2019-08-01'),(91,1,'2019-08-01'),(92,1,'2019-08-01'),(93,1,'2020-08-01'),(94,1,'2020-08-01'),(95,1,'2020-08-01'),(96,1,'2020-08-01'),(97,1,'2020-08-01'),(98,1,'2020-08-01'),(99,1,'2020-08-01'),(100,1,'2020-08-01'),(101,1,'2020-08-01'),(102,1,'2020-08-01'),(58,2,'2018-08-01'),(58,2,'2020-08-01'),(62,2,'2019-08-01'),(63,2,'2019-08-01'),(64,2,'2019-08-01'),(65,2,'2019-08-01'),(66,2,'2019-08-01'),(66,2,'2020-01-20'),(68,2,'2020-08-01'),(69,2,'2020-08-01'),(70,2,'2020-08-01'),(71,2,'2020-08-01'),(72,2,'2020-08-01'),(73,2,'2021-04-01'),(93,3,'2021-08-01'),(94,3,'2021-08-01'),(95,3,'2021-08-01'),(96,3,'2021-08-01'),(97,3,'2021-08-01'),(98,3,'2021-08-01'),(99,3,'2021-08-01'),(100,3,'2021-08-01'),(101,3,'2021-08-01'),(102,3,'2021-08-01'),(103,3,'2021-08-01'),(104,3,'2021-08-01'),(105,3,'2021-08-01'),(106,3,'2021-08-01'),(107,3,'2021-08-01'),(108,3,'2021-08-01'),(76,4,'2021-08-01'),(77,4,'2021-08-01'),(78,4,'2021-08-01'),(79,4,'2021-08-01'),(80,4,'2021-08-01'),(81,4,'2021-08-01'),(82,4,'2021-08-01'),(83,4,'2021-08-01'),(84,4,'2021-08-01'),(85,4,'2021-08-01'),(86,4,'2021-08-01'),(87,4,'2021-08-01'),(88,4,'2021-08-01'),(89,4,'2021-08-01'),(90,4,'2021-08-01'),(91,4,'2021-08-01'),(92,4,'2021-08-01'),(58,5,'2021-08-01'),(62,5,'2021-08-01'),(63,5,'2021-08-01'),(64,5,'2021-08-01'),(65,5,'2021-08-01'),(66,5,'2021-08-01'),(68,5,'2021-08-01'),(69,5,'2021-08-01'),(70,5,'2021-08-01'),(71,5,'2021-08-01'),(72,5,'2021-08-01'),(73,5,'2021-08-01');
/*!40000 ALTER TABLE `kind_lerngruppe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kind_schule`
--

DROP TABLE IF EXISTS `kind_schule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kind_schule` (
  `person_id` int NOT NULL,
  `zugangsdatum_zur_fsx` date NOT NULL,
  `abgangsdatum_von_fsx` date DEFAULT NULL,
  `abgangsgrund` enum('Elternwunsch','Wegzug','Umzug','Uebergang Sekundarstufe','Sonstiges') DEFAULT NULL,
  `mittag` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`person_id`,`zugangsdatum_zur_fsx`),
  KEY `Kind_idx` (`person_id`),
  CONSTRAINT `fk_Kind_schule` FOREIGN KEY (`person_id`) REFERENCES `personen` (`person_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kind_schule`
--

LOCK TABLES `kind_schule` WRITE;
/*!40000 ALTER TABLE `kind_schule` DISABLE KEYS */;
INSERT INTO `kind_schule` VALUES (58,'2020-08-01','2020-07-31','Elternwunsch',1),(62,'2016-08-01','2020-07-31','Elternwunsch',1),(63,'2016-09-01','2020-07-31','Elternwunsch',1),(64,'2017-05-15',NULL,NULL,1),(65,'2018-01-22',NULL,NULL,1),(66,'2020-01-20',NULL,NULL,1),(68,'2017-08-01',NULL,NULL,1),(69,'2017-08-01',NULL,NULL,1),(70,'2017-08-01','2020-07-31','Umzug',1),(71,'2017-08-01','2020-07-31','Umzug',1),(72,'2017-08-01','2020-07-31','Umzug',1),(73,'2021-04-01',NULL,NULL,1),(76,'2018-08-01',NULL,NULL,1),(77,'2018-08-01',NULL,NULL,1),(78,'2018-08-01',NULL,NULL,1),(79,'2018-08-01',NULL,NULL,1),(80,'2018-08-01',NULL,NULL,1),(81,'2019-08-01',NULL,NULL,1),(82,'2019-10-30','2020-07-31','Elternwunsch',1),(83,'2021-08-01','2020-07-31','Elternwunsch',1),(84,'2019-08-01','2020-07-31','Elternwunsch',1),(85,'2019-08-01',NULL,NULL,1),(86,'2019-08-01',NULL,NULL,1),(87,'2019-08-01',NULL,NULL,1),(88,'2019-08-01',NULL,NULL,1),(89,'2019-08-01',NULL,NULL,1),(90,'2019-08-01',NULL,NULL,1),(91,'2019-08-01',NULL,NULL,1),(92,'2019-08-01',NULL,NULL,1),(93,'2020-08-01',NULL,NULL,1),(94,'2020-08-01',NULL,NULL,1),(95,'2020-08-01',NULL,NULL,1),(96,'2020-08-01',NULL,NULL,1),(97,'2020-08-01','2020-07-31','Umzug',1),(98,'2020-08-01','2020-07-31','Umzug',1),(99,'2020-08-01','2020-07-31','Umzug',1),(100,'2020-08-01',NULL,NULL,1),(101,'2020-08-01',NULL,NULL,1),(102,'2020-08-01',NULL,NULL,1),(103,'2021-08-01',NULL,NULL,1),(104,'2021-08-01',NULL,NULL,1),(105,'2021-08-01',NULL,NULL,1),(106,'2021-08-01',NULL,NULL,1),(107,'2021-08-01',NULL,NULL,1),(108,'2021-08-01',NULL,NULL,1);
/*!40000 ALTER TABLE `kind_schule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kontakt_daten`
--

DROP TABLE IF EXISTS `kontakt_daten`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kontakt_daten` (
  `mobil_telefon_1` varchar(20) DEFAULT NULL,
  `mobil_telefon_2` varchar(20) DEFAULT NULL,
  `mobil_telefon_fsx` varchar(20) DEFAULT NULL,
  `telefon_1` varchar(20) DEFAULT NULL,
  `telefon_2` varchar(20) DEFAULT NULL,
  `telefon_fsx` varchar(20) DEFAULT NULL,
  `email_1` varchar(50) DEFAULT NULL,
  `email_2` varchar(50) DEFAULT NULL,
  `email_fsx` varchar(45) DEFAULT NULL,
  `person_id` int NOT NULL,
  UNIQUE KEY `PersonID_UNIQUE` (`person_id`),
  CONSTRAINT `Person_Kontaktdaten` FOREIGN KEY (`person_id`) REFERENCES `personen` (`person_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kontakt_daten`
--

LOCK TABLES `kontakt_daten` WRITE;
/*!40000 ALTER TABLE `kontakt_daten` DISABLE KEYS */;
INSERT INTO `kontakt_daten` VALUES ('264-251-4212x33633',NULL,NULL,'826-258-1980',NULL, NULL,'wconn@example.net','', '',77),
('932-833-6573x5363',NULL,NULL,'(526)768-5465',NULL, NULL,'chahn@example.org','', '',110),
('270-849-2937x9239',NULL,NULL,'840.621.4107x068',NULL, NULL,'leonor60@example.org','', '',112),
('3754287723',NULL,NULL,'137-058-8457',NULL, NULL,'garett.parker@example.net','', '',113),
('228.190.3502x3680',NULL,NULL,'696.231.2096',NULL, NULL,'pietro.steuber@example.net','', '',114),
('1-764-190-1619x32630',NULL,NULL,'1-201-410-1523',NULL, NULL,'stark.trystan@example.org','', '',115),
('010.887.3138',NULL,NULL,'399.964.6811',NULL, NULL,'xmorissette@example.com','', '',116),
('(563)328-9485x282',NULL,NULL,'+48(3)8661012917',NULL, NULL,'mitchell84@example.org','', '',117),
('805.725.0266x81147',NULL,NULL,'1-255-184-1662x5747',NULL, NULL,'maymie.roob@example.net','', '',118),
('1617468996',NULL,NULL,'(878)322-6331x98347',NULL, NULL,'ida18@example.org','', '',119),
('257.998.0853',NULL,NULL,'(742)853-9459',NULL, NULL,'hegmann.noe@example.org','', '',120),
('+86(0)2456313149',NULL,NULL,'119.113.2105x839',NULL, NULL,'conn.eva@example.com','', '',121),
('673.676.0102x9577',NULL,NULL,'146.571.1198',NULL, NULL,'branson79@example.org','', '',122),
('(127)835-8122',NULL,NULL,'8475185357',NULL, NULL,'gokeefe@example.com','', '',123),
('8135208510',NULL,NULL,'(714)625-9723x8975',NULL, NULL,'spencer.kellen@example.net','', '',125),
('(386)768-0174x91939',NULL,NULL,'5304604119',NULL, NULL,'bwyman@example.com','', '',126),
('1-547-766-5534',NULL,NULL,'(225)086-3155x5145',NULL, NULL,'gretchen35@example.net','', '',127),
('741.868.4353',NULL,NULL,'(400)177-8605',NULL, NULL,'daija.jakubowski@example.com','', '',128),
('(218)373-5716',NULL,NULL,'1-968-551-1475x8405',NULL, NULL,'sylvester.volkman@example.net','', '',129),
('1-392-492-6885',NULL,NULL,'393-922-5715x00951',NULL, NULL,'blaze73@example.com','', '',130),
('1-725-241-5142',NULL,NULL,'144-275-1916',NULL, NULL,'dschneider@example.org','', '',131),
('194.281.5329',NULL,NULL,'6873578007',NULL, NULL,'flavio68@example.org','', '',132),
('833-829-5415x5072',NULL,NULL,'1-963-591-6725x53274',NULL, NULL,'joseph76@example.org','', '',133),
('1-973-513-0302',NULL,NULL,'380.686.8422',NULL, NULL,'lcollins@example.org','', '',134),
('(842)937-0433',NULL,NULL,'913.786.1588x854',NULL, NULL,'zwindler@example.com','', '',135),
('+90(1)0131519932',NULL,NULL,'+28(9)0865892652',NULL, NULL,'ttillman@example.net','', '',136),
('1-145-443-0781',NULL,NULL,'071-973-7458',NULL, NULL,'molly27@example.net','', '',137),
('1-265-931-3695',NULL,NULL,'1-109-702-0594x57081',NULL, NULL,'kareem76@example.com','', '',138),
('(990)745-1259x62447',NULL,NULL,'291.797.4499x1124',NULL, NULL,'cschiller@example.net','', '',139),
('1-167-415-6891',NULL,NULL,'263-124-6870x8003',NULL, NULL,'hcorkery@example.net','', '',140),
('283-563-5185x9185',NULL,NULL,'4543124205',NULL, NULL,'stoltenberg.willis@example.org','', '',141),
('+03(0)8518365184',NULL,NULL,'101.568.8453x9458',NULL, NULL,'iwisoky@example.com','', '',142),
('451.365.2293',NULL,NULL,'1-451-273-9606x8372',NULL, NULL,'gwhite@example.net','', '',143),
('449-729-5972x0765',NULL,NULL,'214-751-2710',NULL, NULL,'lonie82@example.com','', '',144),
('(470)012-7286',NULL,NULL,'918-120-0408x90333',NULL, NULL,'julie.halvorson@example.com','', '',145),
('938-125-4591x1097',NULL,NULL,'915.534.9007',NULL, NULL,'gmurphy@example.net','', '',146),
('+11(8)4016810661',NULL,NULL,'1-016-628-1864x902',NULL, NULL,'jhalvorson@example.com','', '',147),
('(852)512-4165x898',NULL,NULL,'1-930-801-6467x3754',NULL, NULL,'consuelo28@example.org','', '',148),
('1-569-476-2335',NULL,NULL,'1-032-925-6042x4807',NULL, NULL,'darmstrong@example.com','', '',149),
('1-594-534-9220',NULL,NULL,'(655)588-2654x02974',NULL, NULL,'skiles.jackeline@example.net','', '',150),
('577-165-4751x603',NULL,NULL,'(329)366-9034x522',NULL, NULL,'brekke.tevin@example.org','', '',151),
('741-328-2659',NULL,NULL,'998-039-1681',NULL, NULL,'stewart.stehr@example.org','', '',152),
('148.776.1263x296',NULL,NULL,'4526279635',NULL, NULL,'ulemke@example.net','', '',153),
('1-181-575-0389x3162',NULL,NULL,'(098)644-8405x126',NULL, NULL,'king.edward@example.com','', '',154),
('(330)759-3634',NULL,NULL,'+02(8)4045316848',NULL, NULL,'mspencer@example.com','', '',157),
('(942)386-0014x876',NULL,NULL,'913-107-8948',NULL, NULL,'yvonne90@example.org','', '',158),
('(279)718-5837x3460',NULL,NULL,'(399)237-9633x248',NULL, NULL,'grady.maxine@example.net','', '',159),
('+63(2)2739275708',NULL,NULL,'+11(6)4951866722',NULL, NULL,'juanita18@example.com','', '',161),
('1-068-463-1297x352',NULL,NULL,'1-434-783-9192',NULL, NULL,'gottlieb.matilde@example.org','', '',162),
('(901)030-7795x410',NULL,NULL,'1-699-777-9894',NULL, NULL,'lori.towne@example.org','', '',163),
('1-426-339-1901',NULL,NULL,'1-511-258-9541',NULL, NULL,'maud.spinka@example.com','', '',164),
('152.972.9457x747',NULL,NULL,'1-577-901-2300x0579',NULL, NULL,'myriam.fritsch@example.org','', '',165),
('390-936-4441x1628',NULL,NULL,'555.307.5763',NULL, NULL,'daniel.brendon@example.org','', '',166),
('(573)385-8175x8445',NULL,NULL,'889-677-3236x891',NULL, NULL,'ebert.lois@example.com','', '',167),
('1-408-370-4033x9004',NULL,NULL,'2932712914',NULL, NULL,'cleve49@example.org','', '',168),
('736-617-2456x66474',NULL,NULL,'077.379.1724x80292',NULL, NULL,'lindsey30@example.org','', '',169),
('(838)876-2989',NULL,NULL,'(388)077-7793',NULL, NULL,'rosie11@example.net','', '',170),
('697-809-7375',NULL,NULL,'123-414-5168x8964',NULL, NULL,'wehner.kiana@example.net','', '',171),
('270-977-5009x724',NULL,NULL,'105-289-3427',NULL, NULL,'tgorczany@example.net','', '',172),
('1-319-333-0891x10806',NULL,NULL,'(447)437-7746',NULL, NULL,'cgreenholt@example.com','', '',173),
('1-599-568-7714x280',NULL,NULL,'1-911-197-8552',NULL, NULL,'baumbach.dusty@example.net','', '',174),
('206-937-8531x0850',NULL,NULL,'(779)129-0051x57089',NULL, NULL,'kerluke.lucie@example.net','', '',175),
('559.564.1764x028',NULL,NULL,'+86(6)5295497574',NULL, NULL,'nolan.oceane@example.com','', '',176),
('+08(7)3012859620',NULL,NULL,'427-612-5902',NULL, NULL,'langworth.wilmer@example.org','', '',177),
('(399)181-2406x321',NULL,NULL,'(082)727-0230x11452',NULL, NULL,'meagan.damore@example.org','', '',178),
('800-439-7215x63726',NULL,NULL,'8196192646',NULL, NULL,'jschuppe@example.org','', '',180),
('133.195.7359x900',NULL,NULL,'305.972.7395x0320',NULL, NULL,'lhaley@example.org','', '',183),
('+27(4)5392547614',NULL,NULL,'852.459.0850',NULL, NULL,'tjohnson@example.net','', '',184),
('(268)062-7410x2262',NULL,NULL,'1-993-517-8507x292',NULL, NULL,'mrunolfsson@example.com','', '',185),
('863.945.7905',NULL,NULL,'+29(1)5790033029',NULL, NULL,'nschowalter@example.net','', '',186),
('(228)799-2618x597',NULL,NULL,'1-881-216-6410',NULL, NULL,'qjohnston@example.org','', '',187),
('1-946-307-0928x5381',NULL,NULL,'(489)909-0571x76957',NULL, NULL,'ntorphy@example.com','', '',189),
('1-626-728-1912',NULL,NULL,'(491)506-6364x2952',NULL, NULL,'fgottlieb@example.com','', '',190),
('1-883-605-9357',NULL,NULL,'898.874.4079',NULL, NULL,'gmertz@example.org','', '',193),
('780.358.6882',NULL,NULL,'(227)841-7422x669',NULL, NULL,'bbrown@example.com','', '',194),
('598.825.9464x518',NULL,NULL,'(761)480-0866',NULL, NULL,'krau@example.net','', '',195),
('(553)100-5616',NULL,NULL,'(909)151-9771x768',NULL, NULL,'rlesch@example.net','', '',196),
('807.579.0800',NULL,NULL,'841.123.7216',NULL, NULL,'juston56@example.net','', '',197),
('(842)629-1484',NULL,NULL,'(922)394-3573x91329',NULL, NULL,'karina10@example.com','', '',198),
('580.399.8622x5174',NULL,NULL,'1-352-273-0981x3732',NULL, NULL,'stevie48@example.net','', '',199),
('1-214-534-8618x8627',NULL,NULL,'1-913-242-5468x322',NULL, NULL,'johnathan82@example.org','', '',200),
('840-620-9237x68440',NULL,NULL,'1-982-657-0239',NULL, NULL,'larry04@example.com','', '',201),
('+13(8)6855706495',NULL,NULL,'065.391.4460',NULL, NULL,'beaulah.beier@example.org','', '',202),
('1-020-578-0933',NULL,NULL,'448.275.8565x81264',NULL, NULL,'tdicki@example.com','', '',203),
('(973)526-9951x319',NULL,NULL,'(539)811-6739',NULL, NULL,'bgibson@example.org','', '',205),
('+37(5)4130307209',NULL,NULL,'1-051-743-3517',NULL, NULL,'price.maribel@example.org','', '',206),
('1028372903',NULL,NULL,'404.503.3169',NULL, NULL,'nwalsh@example.org','', '',207),
('481.977.5897',NULL,NULL,'9387028262',NULL, NULL,'micaela00@example.com','', '',210),
('1-216-295-2990x588',NULL,NULL,'+06(3)6671697123',NULL, NULL,'orville.herzog@example.org','', '',211),
('3574263907',NULL,NULL,'938.131.1566x977',NULL, NULL,'jessyca12@example.org','', '',213),
('(527)671-6190x59956',NULL,NULL,'1-212-335-1513x88287',NULL, NULL,'iolson@example.net','', '',215),
('869-593-6204x141',NULL,NULL,'747-141-5662x642',NULL, NULL,'nathanial13@example.net','', '',216),
('182-434-9790x3230',NULL,NULL,'(857)709-9712x32343',NULL, NULL,'fframi@example.com','', '',217),
('676-210-0835x4948',NULL,NULL,'(366)635-9220x301',NULL, NULL,'vritchie@example.com','', '',219),
('8688938263',NULL,NULL,'1-275-638-3739',NULL, NULL,'jany.schneider@example.org','', '',220),
('756.670.2874x2753',NULL,NULL,'624-048-6885x18674',NULL, NULL,'xzavier.murray@example.org','', '',222),
('321-496-5837',NULL,NULL,'549.567.9017',NULL, NULL,'liliana37@example.net','', '',224),
('7799285570',NULL,NULL,'+53(7)2865143922',NULL, NULL,'tshields@example.com','', '',225),
('1-109-841-3920x05645',NULL,NULL,'1222266600',NULL, NULL,'arlene97@example.com','', '',226),
('1-101-994-1034',NULL,NULL,'754-532-3506x73298',NULL, NULL,'fdare@example.net','', '',227),
('(117)746-2186x68232',NULL,NULL,'(975)299-1307',NULL, NULL,'treva08@example.com','', '',228),
('1-960-622-4204x5409',NULL,NULL,'1-811-343-6313x18904',NULL, NULL,'abernhard@example.net','', '',229),
('000.632.4995',NULL,NULL,'(292)781-5666x55103',NULL, NULL,'lorena40@example.org','', '',230),
('(808)568-0926',NULL,NULL,'1-967-072-3261x3344',NULL, NULL,'schroeder.lukas@example.org','', '',231),
('437-076-3609x438',NULL,NULL,'1-417-451-4180',NULL, NULL,'hickle.justina@example.org','', '',232),
('168.766.7827x4663',NULL,NULL,'307.135.3895x61149',NULL, NULL,'powlowski.kaleb@example.org','', '',233),
('1-338-088-8932',NULL,NULL,'(737)904-4320x45153',NULL, NULL,'thad39@example.com','', '',234),
('5327106613',NULL,NULL,'1-497-930-0592x011',NULL, NULL,'flakin@example.com','', '',236),
('(309)782-2888',NULL,NULL,'667-481-4320',NULL, NULL,'stiedemann.noemie@example.org','', '',238),
('1-792-890-7485x5310',NULL,NULL,'225-915-7717x85695',NULL, NULL,'urban12@example.org','', '',239),
('036.350.7557x618',NULL,NULL,'9246332050',NULL, NULL,'giovanny.muller@example.net','', '',240),
('1-825-272-8538x241',NULL,NULL,'(047)718-6237x04818',NULL, NULL,'simonis.breanne@example.org','', '',241),
('1-502-371-6554x20615',NULL,NULL,'093.480.5647x69511',NULL, NULL,'koch.lily@example.org','', '',242),
('(797)528-9981x6460',NULL,NULL,'112-366-4033',NULL, NULL,'veda81@example.org','', '',243),
('(640)850-3382x499',NULL,NULL,'(373)300-3300',NULL, NULL,'rowe.jazmyne@example.net','', '',244),
('1-317-864-4814x261',NULL,NULL,'(527)692-0225x0262',NULL, NULL,'chance.davis@example.org','', '',246),
('893.458.0312x1140',NULL,NULL,'+31(7)0711965809',NULL, NULL,'rowland.beatty@example.com','', '',247),
('+39(4)5554482555',NULL,NULL,'338-702-9573x18991',NULL, NULL,'emanuel15@example.net','', '',248),
('1-252-434-2718',NULL,NULL,'+11(5)2053017804',NULL, NULL,'becker.bernadette@example.net','', '',249),
('730-763-5656x69617',NULL,NULL,'(587)114-9428x46841',NULL, NULL,'winnifred.rath@example.com','', '',250),
('645-288-2431x8681',NULL,NULL,'1-987-146-2476x07842',NULL, NULL,'jaylon15@example.org','', '',252),
('470.837.4456',NULL,NULL,'(675)139-6100x164',NULL, NULL,'dangelo.emard@example.org','', '',253),
('(055)614-3240',NULL,NULL,'(564)039-6156x58221',NULL, NULL,'kklocko@example.com','', '',254),
('6148635193935',NULL,NULL,'5901719640',NULL, NULL,'aiden95@example.com','', '',255),
('1-098-531-1920x437',NULL,NULL,'705-488-6736x8279',NULL, NULL,'gorczany.edwardo@example.net','', '',256),
('(760)601-5463x10075',NULL,NULL,'314-493-9905',NULL, NULL,'okuneva.roselyn@example.com','', '',257),
('(428)354-6196',NULL,NULL,'125-680-6952',NULL, NULL,'towne.shanel@example.com','', '',258),
('1-109-841-3920x05645',NULL,NULL,'1222266600',NULL, NULL,'arlene97@example.com','', '',259),
('1-101-994-1034',NULL,NULL,'754-532-3506x73298',NULL, NULL,'fdare@example.net','', '',260),
('(117)746-2186x68232',NULL,NULL,'(975)299-1307',NULL, NULL,'treva08@example.com','', '',262),
('1-960-622-4204x5409',NULL,NULL,'1-811-343-6313x18904',NULL, NULL,'abernhard@example.net','', '',264),
('000.632.4995',NULL,NULL,'(292)781-5666x55103',NULL, NULL,'lorena40@example.org','', '',265),
('(808)568-0926',NULL,NULL,'1-967-072-3261x3344',NULL, NULL,'schroeder.lukas@example.org','', '',266),
('437-076-3609x438',NULL,NULL,'1-417-451-4180',NULL, NULL,'hickle.justina@example.org','', '',267),
('168.766.7827x4663',NULL,NULL,'307.135.3895x61149',NULL, NULL,'powlowski.kaleb@example.org','', '',269),
('1-338-088-8932',NULL,NULL,'(737)904-4320x45153',NULL, NULL,'thad39@example.com','', '',270),
('5327106613',NULL,NULL,'1-497-930-0592x011',NULL, NULL,'flakin@example.com','', '',271),
('(309)782-2888',NULL,NULL,'667-481-4320',NULL, NULL,'stiedemann.noemie@example.org','', '',272),
('1-792-890-7485x5310',NULL,NULL,'225-915-7717x85695',NULL, NULL,'urban12@example.org','', '',273),
('036.350.7557x618',NULL,NULL,'9246332050',NULL, NULL,'giovanny.muller@example.net','', '',274),
('1-825-272-8538x241',NULL,NULL,'(047)718-6237x04818',NULL, NULL,'simonis.breanne@example.org','', '',275),
('1-502-371-6554x20615',NULL,NULL,'093.480.5647x69511',NULL, NULL,'koch.lily@example.org','', '',276),
('(797)528-9981x6460',NULL,NULL,'112-366-4033',NULL, NULL,'veda81@example.org','', '',277),
('(640)850-3382x499',NULL,NULL,'(373)300-3300',NULL, NULL,'rowe.jazmyne@example.net','', '',278),
('1-317-864-4814x261',NULL,NULL,'(527)692-0225x0262',NULL, NULL,'chance.davis@example.org','', '',279),
('893.458.0312x1140',NULL,NULL,'+31(7)0711965809',NULL, NULL,'rowland.beatty@example.com','', '',280),
('+39(4)5554482555',NULL,NULL,'338-702-9573x18991',NULL, NULL,'emanuel15@example.net','', '',281),
('1-252-434-2718',NULL,NULL,'+11(5)2053017804',NULL, NULL,'becker.bernadette@example.net','', '',282),
('730-763-5656x69617',NULL,NULL,'(587)114-9428x46841',NULL, NULL,'winnifred.rath@example.com','', '',284),
('645-288-2431x8681',NULL,NULL,'1-987-146-2476x07842',NULL, NULL,'jaylon15@example.org','', '',285),
('470.837.4456',NULL,NULL,'(675)139-6100x164',NULL, NULL,'dangelo.emard@example.org','', '',286),
('(055)614-3240',NULL,NULL,'(564)039-6156x58221',NULL, NULL,'kklocko@example.com','', '',287),
('+61(4)8635193935',NULL,NULL,'5901719640',NULL, NULL,'aiden95@example.com','', '',288),
('1-098-531-1920x437',NULL,NULL,'705-488-6736x8279',NULL, NULL,'gorczany.edwardo@example.net','', '',289),
('(760)601-5463x10075',NULL,NULL,'314-493-9905',NULL, NULL,'okuneva.roselyn@example.com','', '',290),
('(428)354-6196',NULL,NULL,'125-680-6952',NULL, NULL,'towne.shanel@example.com','', '',291),
('893.458.0312x1140',NULL,NULL,'+31(7)0711965809',NULL, NULL,'rowland.beatty@example.com','', '',292),
('+39(4)5554482555',NULL,NULL,'338-702-9573x18991',NULL, NULL,'emanuel15@example.net','', '',293),
('1-252-434-2718',NULL,NULL,'+11(5)2053017804',NULL, NULL,'becker.bernadette@example.net','', '',294),
('730-763-5656x69617',NULL,NULL,'(587)114-9428x46841',NULL, NULL,'winnifred.rath@example.com','', '',295),
('645-288-2431x8681',NULL,NULL,'1-987-146-2476x07842',NULL, NULL,'jaylon15@example.org','', '',296),
('470.837.4456',NULL,NULL,'(675)139-6100x164',NULL, NULL,'dangelo.emard@example.org','', '',297),
('(055)614-3240',NULL,NULL,'(564)039-6156x58221',NULL, NULL,'kklocko@example.com','', '',298),
('+61(4)8635193935',NULL,NULL,'5901719640',NULL, NULL,'aiden95@example.com','', '',299),
('1-098-531-1920x437',NULL,NULL,'705-488-6736x8279',NULL, NULL,'gorczany.edwardo@example.net','', '',300);
/*!40000 ALTER TABLE `kontakt_daten` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lerngruppen`
--

DROP TABLE IF EXISTS `lerngruppen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lerngruppen` (
  `lerngruppe_id` int NOT NULL AUTO_INCREMENT,
  `email_eltern` varchar(50) DEFAULT NULL,
  `email_team` varchar(50) DEFAULT NULL,
  `telefon_team` varchar(20) DEFAULT NULL,
  `bezeichnung` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`lerngruppe_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lerngruppen`
--

LOCK TABLES `lerngruppen` WRITE;
/*!40000 ALTER TABLE `lerngruppen` DISABLE KEYS */;
INSERT INTO `lerngruppen` VALUES (1,'','','','unten'),(2,'','','','oben'),(3,'eltern_1-2@testschule.de','','+49 1578 3454257','1/2'),(4,'eltern_3-4@testschule.de','','+49 1573 2345982','3/4'),(5,'eltern_5-6@testschule.de','','+49 1575 0423433','5/6');
/*!40000 ALTER TABLE `lerngruppen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `person_arbeitsgruppe`
--

DROP TABLE IF EXISTS `person_arbeitsgruppe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `person_arbeitsgruppe` (
  `person_id` int NOT NULL,
  `arbeitsgruppe_id` int NOT NULL,
  `koordination_der_ag` tinyint(1) DEFAULT '0',
  `datum_mitgliedschaftsbeginn` date DEFAULT NULL,
  `datum_mitgliedschaftsende` date DEFAULT NULL,
  PRIMARY KEY (`person_id`,`arbeitsgruppe_id`),
  KEY `AG_idx` (`arbeitsgruppe_id`),
  CONSTRAINT `AG_Person` FOREIGN KEY (`arbeitsgruppe_id`) REFERENCES `arbeitsgruppen` (`arbeitsgruppe_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Person_AG` FOREIGN KEY (`person_id`) REFERENCES `personen` (`person_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `person_arbeitsgruppe`
--

LOCK TABLES `person_arbeitsgruppe` WRITE;
/*!40000 ALTER TABLE `person_arbeitsgruppe` DISABLE KEYS */;
INSERT INTO `person_arbeitsgruppe` VALUES (114,7,0,'2019-08-21',NULL),(114,11,0,'2019-08-21',NULL),(117,1,0,'2019-08-21',NULL),(119,8,0,'2019-08-21',NULL),(122,5,0,'2019-08-21',NULL),(126,4,0,'2020-08-20','2021-08-20'),(126,6,0,'2021-08-20','2021-11-20'),(130,10,0,'2019-08-21',NULL),(132,2,0,'2019-08-20','2020-08-20'),(132,7,0,'2019-08-21',NULL),(134,7,0,'2019-08-21',NULL),(135,8,0,'2019-08-21',NULL),(135,12,0,'2019-08-21',NULL),(139,14,0,'2019-08-21',NULL),(142,4,0,'2020-08-20','2021-08-20'),(145,3,0,'2019-08-20','2020-08-20'),(150,12,1,'2019-08-21',NULL),(161,10,0,'2019-08-21',NULL),(161,12,0,'2019-08-21',NULL),(164,4,1,'2020-08-20','2021-08-20'),(165,8,0,'2019-08-21',NULL),(166,3,0,'2019-08-20','2020-08-20'),(166,6,0,'2021-08-20','2021-11-20'),(166,12,0,'2019-08-21',NULL),(168,4,0,'2020-08-20','2021-08-20'),(168,5,1,'2021-08-20','2021-11-20'),(171,12,0,'2019-08-21',NULL),(195,5,0,'2021-08-20','2021-11-20'),(196,3,0,'2019-08-20','2020-08-20'),(196,7,0,'2019-08-21',NULL),(201,4,0,'2020-08-20','2021-08-20'),(201,7,0,'2019-08-21',NULL),(201,11,0,'2019-08-21',NULL),(203,7,0,'2019-08-21',NULL),(203,12,0,'2019-08-21',NULL),(205,1,1,'2019-08-20','2020-08-20'),(213,2,0,'2019-08-20','2020-08-20'),(213,4,0,'2020-08-20','2021-08-20'),(213,5,0,'2021-08-20','2021-11-20'),(213,7,0,'2019-08-21',NULL),(213,8,0,'2019-08-21',NULL),(213,12,0,'2019-08-21',NULL),(217,1,0,'2019-08-20','2020-08-20'),(217,4,0,'2020-08-20','2021-08-20'),(224,7,0,'2019-08-21',NULL),(226,12,0,'2019-08-21',NULL),(227,10,0,'2019-08-21',NULL),(227,12,0,'2019-08-21',NULL),(228,7,0,'2019-08-21',NULL),(231,4,0,'2020-08-20','2021-08-20'),(242,7,0,'2019-08-21',NULL),(242,12,0,'2019-08-21',NULL),(243,8,1,'2019-08-21',NULL),(247,8,0,'2019-08-21',NULL),(247,12,0,'2019-08-21',NULL),(248,10,0,'2019-08-21',NULL),(252,7,0,'2019-08-21',NULL),(256,4,0,'2020-08-20','2021-08-20'),(259,4,0,'2019-08-21',NULL),(262,7,0,'2019-08-21',NULL),(263,6,0,'2019-08-21',NULL),(263,7,0,'2019-08-21',NULL),(264,4,0,'2019-08-21',NULL),(264,8,0,'2019-08-21',NULL),(265,7,0,'2019-08-21',NULL),(266,3,0,'2019-08-20','2020-08-20'),(266,4,0,'2019-08-21',NULL),(266,5,0,'2021-08-20','2021-11-20'),(271,1,0,'2019-08-20','2020-08-20'),(271,3,0,'2020-08-20','2021-08-20'),(272,4,0,'2019-08-21',NULL),(273,5,0,'2021-08-20','2021-11-20'),(274,14,0,'2019-08-21',NULL),(280,4,0,'2019-08-21',NULL),(280,5,0,'2021-08-20','2021-11-20'),(280,6,0,'2019-08-21',NULL),(284,5,0,'2021-08-20','2021-11-20'),(285,7,0,'2019-08-21',NULL),(285,8,0,'2019-08-21',NULL),(285,12,0,'2019-08-21',NULL),(286,7,0,'2019-08-21',NULL),(286,8,0,'2019-08-21',NULL),(289,7,0,'2019-08-21',NULL),(290,7,0,'2019-08-21',NULL),(290,11,1,'2019-08-21',NULL),(291,1,0,'2019-08-20','2020-08-20'),(299,4,0,'2019-08-21',NULL),(299,5,0,'2021-08-20','2021-11-20');
/*!40000 ALTER TABLE `person_arbeitsgruppe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `person_haushalt`
--

DROP TABLE IF EXISTS `person_haushalt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `person_haushalt` (
  `haushalt_id` int NOT NULL,
  `person_id` int NOT NULL,
  `meldeanschrift` tinyint(1) DEFAULT NULL,
  `datum_einzug` date DEFAULT NULL,
  PRIMARY KEY (`haushalt_id`,`person_id`),
  KEY `Person_idx` (`person_id`),
  CONSTRAINT `fk_Haushalt_Person` FOREIGN KEY (`haushalt_id`) REFERENCES `haushalte` (`haushalt_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_Person_Haushalt` FOREIGN KEY (`person_id`) REFERENCES `personen` (`person_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `person_haushalt`
--

LOCK TABLES `person_haushalt` WRITE;
/*!40000 ALTER TABLE `person_haushalt` DISABLE KEYS */;
INSERT INTO `person_haushalt` VALUES (1,98,0,NULL),(1,119,0,NULL),(1,256,0,NULL),(2,80,1,NULL),(2,252,0,NULL),(2,290,0,NULL),(3,179,0,NULL),(3,214,0,NULL),(4,131,0,NULL),(4,283,0,NULL),(5,178,0,NULL),(6,163,0,NULL),(6,230,0,NULL),(7,89,1,NULL),(7,117,0,NULL),(7,118,0,NULL),(8,81,1,NULL),(8,264,0,NULL),(9,205,0,NULL),(10,147,0,NULL),(11,97,1,NULL),(11,142,0,NULL),(12,200,0,NULL),(13,72,0,NULL),(13,101,0,NULL),(13,122,0,NULL),(14,141,0,NULL),(14,143,0,NULL),(15,239,0,NULL),(16,62,1,NULL),(16,150,0,NULL),(17,68,1,NULL),(17,86,0,NULL),(17,272,0,NULL),(17,273,0,NULL),(18,159,0,NULL),(18,160,0,NULL),(19,64,1,NULL),(19,87,0,NULL),(19,298,0,NULL),(20,112,0,NULL),(21,191,0,NULL),(22,93,1,NULL),(22,134,0,NULL),(23,96,1,NULL),(23,189,0,NULL),(23,203,0,NULL),(24,97,1,NULL),(24,231,0,NULL),(25,271,0,NULL),(26,190,0,NULL),(27,212,0,NULL),(27,245,0,NULL),(28,116,0,NULL),(28,149,0,NULL),(29,72,1,NULL),(29,101,0,NULL),(29,132,0,NULL),(30,267,0,NULL),(31,220,0,NULL),(32,110,0,NULL),(33,100,0,NULL),(33,165,0,NULL),(33,166,0,NULL),(34,156,0,NULL),(35,204,0,NULL),(36,241,0,NULL),(37,115,0,NULL),(38,85,0,NULL),(38,216,0,NULL),(38,217,0,NULL),(39,255,0,NULL),(40,95,1,NULL),(40,254,0,NULL),(41,104,0,NULL),(41,128,0,NULL),(42,104,0,NULL),(42,187,0,NULL),(43,215,0,NULL),(44,82,1,NULL),(44,114,0,NULL),(44,213,0,NULL),(45,77,1,NULL),(45,194,0,NULL),(46,288,0,NULL),(47,169,0,NULL),(48,199,0,NULL),(48,229,0,NULL),(49,91,1,NULL),(49,247,0,NULL),(49,248,0,NULL),(50,58,0,NULL),(50,202,0,NULL),(51,129,0,NULL),(52,81,1,NULL),(52,253,0,NULL),(53,153,0,NULL),(54,63,1,NULL),(54,139,0,NULL),(55,84,0,NULL),(55,226,0,NULL),(55,227,0,NULL),(56,162,0,NULL),(57,270,0,NULL),(58,76,1,NULL),(58,94,1,NULL),(58,280,0,NULL),(58,281,0,NULL),(59,249,0,NULL),(60,251,0,NULL),(61,211,0,NULL),(62,181,0,NULL),(63,197,0,NULL),(64,182,0,NULL),(65,292,0,NULL),(66,107,0,NULL),(66,126,0,NULL),(66,224,0,NULL),(67,170,0,NULL),(68,130,0,NULL),(69,188,0,NULL),(69,223,0,NULL),(70,90,1,NULL),(70,289,0,NULL),(71,183,0,NULL),(72,77,1,NULL),(72,171,0,NULL),(73,79,1,NULL),(73,108,0,NULL),(73,168,0,NULL),(73,195,0,NULL),(74,63,1,NULL),(74,146,0,NULL),(75,293,0,NULL),(76,73,1,NULL),(76,258,0,NULL),(77,157,0,NULL),(78,295,0,NULL),(79,105,0,NULL),(79,184,0,NULL),(79,278,0,NULL),(80,186,0,NULL),(81,287,0,NULL),(82,123,0,NULL),(83,279,0,NULL),(84,69,1,NULL),(84,136,0,NULL),(84,286,0,NULL),(85,144,0,NULL),(86,240,0,NULL),(87,234,0,NULL),(88,70,1,NULL),(88,196,0,NULL),(88,263,0,NULL),(89,127,0,NULL),(90,64,1,NULL),(90,87,0,NULL),(90,262,0,NULL),(91,148,0,NULL),(91,175,0,NULL),(92,274,0,NULL),(93,125,0,NULL),(93,177,0,NULL),(94,133,0,NULL),(95,138,0,NULL),(96,83,1,NULL),(96,244,0,NULL),(97,120,0,NULL),(97,154,0,NULL),(98,66,1,NULL),(98,137,0,NULL),(99,155,0,NULL),(100,172,0,NULL),(100,180,0,NULL),(101,218,0,NULL),(102,297,0,NULL),(103,90,1,NULL),(103,228,0,NULL),(104,237,0,NULL),(105,275,0,NULL),(106,277,0,NULL),(107,73,1,NULL),(107,140,0,NULL),(108,276,0,NULL),(109,158,0,NULL),(110,66,1,NULL),(110,93,1,NULL),(110,265,0,NULL),(111,210,0,NULL),(112,236,0,NULL),(113,124,0,NULL),(114,99,0,NULL),(114,113,0,NULL),(115,291,0,NULL),(116,164,0,NULL),(117,246,0,NULL),(118,71,0,NULL),(118,201,0,NULL),(118,206,0,NULL),(119,282,0,NULL),(120,99,0,NULL),(120,207,0,NULL),(121,208,0,NULL),(122,88,1,NULL),(122,284,0,NULL),(122,285,0,NULL),(123,192,0,NULL),(123,193,0,NULL),(124,174,0,NULL),(125,176,0,NULL),(126,238,0,NULL),(127,173,0,NULL),(128,95,1,NULL),(128,242,0,NULL),(129,92,1,NULL),(129,103,0,NULL),(129,135,0,NULL),(129,161,0,NULL),(130,235,0,NULL),(131,151,0,NULL),(132,78,1,NULL),(132,106,0,NULL),(132,198,0,NULL),(132,243,0,NULL),(133,232,0,NULL),(133,233,0,NULL),(134,65,1,NULL),(134,102,0,NULL),(134,225,0,NULL),(135,167,0,NULL),(136,121,0,NULL),(136,260,0,NULL),(137,261,0,NULL),(138,250,0,NULL),(139,81,1,NULL),(139,111,0,NULL),(140,58,1,NULL),(140,145,0,NULL),(141,152,0,NULL),(142,62,1,NULL),(142,185,0,NULL),(143,83,1,NULL),(143,209,0,NULL),(144,219,0,NULL),(145,96,1,NULL),(145,221,0,NULL),(146,222,0,NULL),(147,257,0,NULL),(148,65,1,NULL),(148,102,0,NULL),(148,259,0,NULL),(149,266,0,NULL),(150,268,0,NULL),(151,269,0,NULL),(152,294,0,NULL),(153,296,0,NULL),(154,62,1,NULL),(154,299,0,NULL);
/*!40000 ALTER TABLE `person_haushalt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personen`
--

DROP TABLE IF EXISTS `personen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personen` (
  `person_id` int NOT NULL AUTO_INCREMENT,
  `rufname` varchar(50) DEFAULT NULL,
  `amtlicher_vorname` varchar(50) DEFAULT NULL,
  `nachname` varchar(50) DEFAULT NULL,
  `geburtsdatum` date DEFAULT NULL,
  `einschulungsdatum` date DEFAULT NULL,
  `nicht_auf_listen` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`person_id`),
  UNIQUE KEY `PersonID_UNIQUE` (`person_id`)
) ENGINE=InnoDB AUTO_INCREMENT=300 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personen`
--

LOCK TABLES `personen` WRITE;
/*!40000 ALTER TABLE `personen` DISABLE KEYS */;
INSERT INTO `personen` VALUES (58,'Fabiola','Kristina','Franecki','2009-09-05', '2015-08-01',0),
(62,'Drake','Claudine','Leuschke','2009-10-04', '2016-08-01',0),
(63,'Eliza','Domingo','Dietrich','2010-01-22', '2016-08-01',0),
(64,'Moshe','Earlene','Ferry','2010-01-20', '2016-08-01',0),
(65,'Sarah','Annabell','Grady','2010-03-21', '2016-08-01',0),
(66,'Rachel','Ressie','Gibson','2010-04-20', '2016-08-01',0),
(68,'Lily','Casimer','Powlowski','2011-07-22', '2017-08-01',0),
(69,'Ike','Fabian','Zemlak','2011-09-22', '2017-08-01',0),
(70,'Lew','Stephania','Gulgowski','2011-06-16', '2017-08-01',0),
(71,'Jose','King','Schuppe','2011-08-17', '2017-08-01',0),
(72,'Aaron','Major','Auer','2010-12-03', '2017-08-01',0),
(73,'Zetta','Marquise','Kirlin','2011-02-21', '2017-08-01',0),
(76,'Cindy','Dasia','Dach','2012-02-16', '2018-08-01',0),
(77,'Estevan','Buck','Kovacek','2012-04-29', '2018-08-01',NULL),
(79,'Fermin','Kieran','Bruen','2012-09-18', '2018-08-01',0),
(80,'Blair','Josh','OKon','2011-08-29', '2018-08-01',0),
(81,'Jordi','Arvid','Corwin','2012-06-27', '2018-08-01',0),
(82,'Raphaelle','Edyth','Barrows','2012-01-27', '2018-08-01',NULL),
(83,'Art','Zelma','Kihn','2011-11-16', '2018-08-01',0),
(84,'Elliot','Julianne','Ullrich','2012-07-20', '2019-08-01',0),
(85,'Zakary','Jordi','King','2013-05-19', '2019-08-01',0),
(86,'Freddie','Sarah','Koss','2013-05-06', '2019-08-01',0),
(87,'Jeramy','Gilbert','Stracke','2013-04-18', '2019-08-01',0),
(88,'Dashawn','Rowena','Mante','2013-07-22', '2019-08-01',0),
(89,'Kip','Trent','Spinka','2013-03-19', '2019-08-01',0),
(90,'Walton','Kaley','Kuhn','2013-01-18', '2019-08-01',0),
(91,'Jasen','Leopold','OConner','2013-03-31', '2019-08-01',0),
(92,'Sidney','Deanna','Stiedemann','2012-07-16', '2019-08-01',0),
(93,'Cleora','Neoma','Kreiger','2014-01-10', '2020-08-01',0),
(94,'Roderick','Travis','Wyman','2014-03-18', '2020-08-01',NULL),
(95,'Larry','Gilda','Nienow','2014-05-25', '2020-08-01',0),
(96,'Clinton','Frederick','Rolfson','2014-09-15', '2020-08-01',0),
(97,'Ruth','Herman','Cummings','2014-06-21', '2020-08-01',0),
(98,'Merritt','Kelly','Hermiston','2014-03-06', '2020-08-01',0),
(99,'Dora','Wilson','Fisher','2013-09-06', '2020-08-01',0),
(100,'Werner','Ari','Marvin','2014-04-19', '2020-08-01',0),
(101,'Annalise','Sofia','Howe','2014-05-31', '2020-08-01',0),
(102,'Kolby','Letitia','Deckow','2014-09-25', '2020-08-01',0),
(103,'Sabryna','Rebecca','Fadel','2014-07-09', '2021-08-01',0),
(104,'Yasmeen','Charlie','Schuppe','2015-04-03', '2021-08-01',0),
(105,'Kali','Collin','Wiegand','2014-11-09', '2021-08-01',0),
(106,'Casey','Carole','OKeefe','2015-02-18', '2021-08-01',0),
(107,'Preston','Sonny','Cassin','2014-12-25', '2021-08-01',0),
(108,'Heather','Kathleen','Klocko','2015-03-15', '2021-08-01',0),
(110,'Devin','Vernie','Kessler','1980-08-20', NULL,0),
(111,'Keegan','Annetta','Anderson','1980-08-20', NULL,0),
(112,'Jayne','Henriette','Bauch','1980-08-20', NULL,0),
(113,'Yessenia','Johann','Yost','1980-08-20', NULL,0),
(114,'Tiara','Leon','Bernier','1980-08-20', NULL,NULL),
(115,'Ansel','Lulu','Jones','1980-08-20', NULL,0),
(116,'Nicholas','Cynthia','Homenick','1980-08-20', NULL,0),
(117,'Antoinette','Daryl','Keebler','1980-08-20', NULL,0),
(118,'Miguel','Rachael','Collier','1980-08-20', NULL,0),
(119,'Candace','Lera','Welch','1980-08-20', NULL,0),
(120,'Gage','Leta','Hagenes','1980-08-20', NULL,0),
(121,'Romaine','Alessia','Jacobs','1980-08-20', NULL,0),
(122,'Mckayla','Anais','Auer','1980-08-20', NULL,0),
(123,'Lucy','Catherine','Hackett','1980-08-20', NULL,0),
(124,'Manley','Pascale','Klocko','1980-08-20', NULL,0),
(125,'Lorenz','Lazaro','Cummerata','1980-08-20', NULL,0),
(126,'Shanel','Moriah','Moore','1980-08-20', NULL,0),
(127,'Leola','Larue','Harris','1980-08-20', NULL,0),
(128,'Angelo','Delmer','Lindgren','1980-08-20', NULL,0),
(129,'Shanna','King','Thiel','1980-08-20', NULL,0),
(130,'Brandi','Elbert','Schowalter','1980-08-20', NULL,0),
(131,'Raquel','Amir','Rolfson','1980-08-20', NULL,0),
(132,'Antone','Porter','Treutel','1980-08-20', NULL,0),
(133,'Raquel','Felipe','Gulgowski','1980-08-20', NULL,0),
(134,'Juana','Dorcas','Lebsack','1980-08-20', NULL,0),
(135,'Friedrich','Joey','Emmerich','1980-08-20', NULL,0),
(136,'Pinkie','Rosalyn','Mertz','1980-08-20', NULL,0),
(137,'Christa','Arjun','Upton','1980-08-20', NULL,0),
(138,'Lexus','Antonio','Monahan','1980-08-20', NULL,0),
(139,'Shanon','Nikolas','Bruen','1980-08-20', NULL,0),
(140,'Earl','Gideon','Ondricka','1980-08-20', NULL,0),
(141,'Joana','Gustave','Nitzsche','1980-08-20', NULL,0),
(142,'Kane','Brain','Mayer','1980-08-20', NULL,0),
(143,'Joaquin','Angela','Hoeger','1980-08-20', NULL,0),
(144,'Drew','Felicity','Mertz','1980-08-20', NULL,0),
(145,'Otilia','Gertrude','Sauer','1980-08-20', NULL,0),
(146,'Gideon','Estrella','Batz','1980-08-20', NULL,0),
(147,'Ceasar','Wilhelm','Kuhlman','1980-08-20', NULL,0),
(148,'Anibal','Megane','Fritsch','1980-08-20', NULL,0),
(149,'Anne','Trudie','Hermiston','1980-08-20', NULL,0),
(150,'Marquis','Saige','Hane','1980-08-20', NULL,0),
(151,'Edison','Madaline','Runte','1980-08-20', NULL,0),
(152,'Gisselle','Genesis','Predovic','1980-08-20', NULL,0),
(153,'Elvis','Alexanne','Wintheiser','1980-08-20', NULL,0),
(154,'Nathan','Rylan','Stamm','1980-08-20', NULL,0),
(155,'Christian','Dessie','Botsford','1980-08-20', NULL,0),
(156,'Estrella','Maryjane','Konopelski','1980-08-20', NULL,0),
(157,'Jailyn','Arnaldo','Stracke','1980-08-20', NULL,0),
(158,'Modesto','Andre','Greenholt','1980-08-20', NULL,0),
(159,'Polly','Theresa','Barton','1980-08-20', NULL,0),
(160,'Nathanial','Lazaro','Pfannerstill','1980-08-20', NULL,0),
(161,'Lindsey','Duane','Ledner','1980-08-20', NULL,0),
(162,'Charlotte','Fleta','Conroy','1980-08-20', NULL,0),
(163,'George','Mellie','Jacobson','1980-08-20', NULL,0),
(164,'Roderick','Pattie','Bayer','1980-08-20', NULL,0),
(165,'Claude','Callie','Bogan','1980-08-20', NULL,0),
(166,'Mike','Dandre','OConnell','1980-08-20', NULL,0),
(167,'Madie','Sister','Konopelski','1980-08-20', NULL,0),
(168,'Eino','Marilou','Hagenes','1980-08-20', NULL,0),
(169,'Andreanne','Dino','Denesik','1980-08-20', NULL,0),
(170,'Anabelle','Bernhard','Langosh','1980-08-20', NULL,0),
(171,'Mckayla','Alysson','Kreiger','1980-08-20', NULL,0),
(172,'Mac','Linnie','Hegmann','1980-08-20', NULL,0),
(173,'Destinee','Vivian','Reichel','1980-08-20', NULL,0),
(174,'Jennings','Hildegard','Fritsch','1980-08-20', NULL,0),
(175,'Delphia','Terrence','Bartoletti','1980-08-20', NULL,0),
(176,'Elton','Dagmar','Goyette','1980-08-20', NULL,0),
(177,'Abdullah','Jessica','Strosin','1980-08-20', NULL,0),
(178,'Clemens','Fausto','Mann','1980-08-20', NULL,0),
(179,'Ocie','Reta','Ratke','1980-08-20', NULL,0),
(180,'Beatrice','Mikayla','West','1980-08-20', NULL,NULL),
(181,'Wyatt','Donato','Dooley','1980-08-20', NULL,0),
(182,'Kameron','Henderson','Shanahan','1980-08-20', NULL,0),
(183,'Brad','Kelley','OKon','1980-08-20', NULL,0),
(184,'Miller','Marlin','Schultz','1980-08-04', NULL,NULL),
(185,'Nils','Dashawn','Reichel','1980-08-20', NULL,0),
(186,'Ethyl','Lucious','Kutch','1980-08-20', NULL,0),
(187,'Tanner','Malinda','Gibson','1980-08-20', NULL,0),
(188,'Ozella','Bria','Okuneva','1980-08-20', NULL,0),
(189,'Mercedes','Piper','Lynch','1980-08-20', NULL,1),
(190,'Beulah','Hope','Klein','1980-08-20', NULL,0),
(191,'Brady','Edgar','Bogisich','1980-08-20', NULL,0),
(192,'Elinor','Adan','Schroeder','1980-08-20', NULL,0),
(193,'Maryse','Jermaine','Donnelly','1980-08-20', NULL,0),
(194,'Barton','Jovani','Wuckert','1980-08-20', NULL,0),
(195,'Freeda','Kristina','Kertzmann','1980-08-20', NULL,0),
(196,'Natalia','Nicklaus','Aufderhar','1980-08-20', NULL,0),
(197,'Keyon','Mossie','Becker','1980-08-20', NULL,0),
(198,'Brain','Marge','Boyer','1980-08-20', NULL,0),
(199,'Bethany','Charley','Aufderhar','1980-08-20', NULL,0),
(200,'Eleanore','Gussie','Kshlerin','1980-08-20', NULL,0),
(201,'Pietro','Parker','Kutch','1980-08-20', NULL,0),
(202,'Felicia','Camille','Veum','1980-08-20', NULL,0),
(203,'Isabel','Prudence','Gorczany','1980-08-20', NULL,NULL),
(204,'Mertie','Mabel','Lind','1980-08-20', NULL,0),
(205,'Jody','Elmore','Hauck','1980-08-20', NULL,0),
(206,'Oran','Theodore','Hahn','1980-08-20', NULL,0),
(207,'Trudie','Faye','Erdman','1980-08-20', NULL,0),
(208,'Vincenzo','Alessia','Cremin','1980-08-20', NULL,0),
(209,'Ivah','Melvina','Skiles','1980-08-20', NULL,0),
(210,'Daphney','Anastasia','Mayer','1980-08-20', NULL,0),
(211,'Jamir','Mckenzie','Abshire','1980-08-20', NULL,0),
(212,'Gwendolyn','Natalie','Hintz','1980-08-20', NULL,0),
(213,'Emory','Garry','Welch','1980-08-20', NULL,NULL),
(214,'Brant','Mertie','Deckow','1980-08-20', NULL,0),
(215,'Pamela','Hailie','Marquardt','1980-08-20', NULL,0),
(216,'Jayden','Jeremie','Runte','1980-08-20', NULL,0),
(217,'Angelo','Janie','Grimes','1980-08-20', NULL,0),
(218,'Candace','Josefina','McKenzie','1980-08-20', NULL,0),
(219,'Camryn','Taylor','Herman','1980-08-20', NULL,0),
(220,'Blair','Eileen','Spinka','1980-08-20', NULL,0),
(221,'Rylee','Orpha','Wolf','1980-08-20', NULL,0),
(222,'Vicente','Enid','Brakus','1980-08-20', NULL,0),
(223,'Susan','Teresa','Kiehn','1980-08-20', NULL,0),
(224,'Kaylah','Colby','Streich','1980-08-20', NULL,0),
(225,'Kasey','Allan','Hammes','1980-08-20', NULL,0),
(226,'Rowan','Osborne','Oberbrunner','1980-08-20', NULL,0),
(227,'Lourdes','Helen','Ziemann','1980-08-20', NULL,0),
(228,'Mollie','Benjamin','Shields','1980-08-20', NULL,0),
(229,'Gino','Lillian','Luettgen','1980-08-20', NULL,0),
(230,'Modesto','Rhoda','Kautzer','1980-08-20', NULL,0),
(231,'Kurtis','Chester','Doyle','1980-08-20', NULL,0),
(232,'Rogers','Esteban','Cremin','1980-08-20', NULL,0),
(233,'Marietta','Mose','Ryan','1980-08-20', NULL,0),
(234,'Jalen','Maximillia','Harber','1980-08-20', NULL,0),
(235,'Allison','Chasity','Homenick','1980-08-20', NULL,0),
(236,'Amparo','Vella','Cummings','1980-08-20', NULL,0),
(237,'Gregg','Nick','Thompson','1980-08-20', NULL,0),
(238,'Emanuel','Stanton','Schuppe','1980-08-20', NULL,0),
(239,'Verona','Abigale','Gottlieb','1980-08-20', NULL,0),
(240,'Katelynn','Trycia','Conn','1980-08-20', NULL,0),
(241,'Cleveland','Jules','Adams','1980-08-20', NULL,0),
(242,'Jesus','Daniella','Hickle','1980-08-20', NULL,0),
(243,'Eladio','Santiago','Flatley','1980-05-07', NULL,NULL),
(244,'Zoey','Jake','Gusikowski','1980-08-20', NULL,0),
(245,'Ada','Rosa','Wiegand','1980-08-20', NULL,0),
(246,'Kennedy','Kelsi','Ortiz','1980-08-20', NULL,0),
(247,'Jordan','Alexis','Hackett','1980-08-20', NULL,0),
(248,'Albertha','Haley','Ruecker','1980-08-20', NULL,0),
(249,'Zackary','Dustin','Barrows','1980-08-20', NULL,0),
(250,'Margarette','Reed','Roberts','1980-08-20', NULL,0),
(251,'Anibal','Mary','Mayer','1980-08-20', NULL,0),
(252,'Geovany','Elnora','Emard','1980-08-20', NULL,NULL),
(253,'Alfred','Mabel','Zboncak','1980-08-20', NULL,0),
(254,'Liza','Chandler','Strosin','1980-08-20', NULL,0),
(255,'Janie','Rosanna','Parisian','1980-08-20', NULL,0),
(256,'Christophe','Mohamed','Zboncak','1980-08-20', NULL,0),
(257,'Llewellyn','Crawford','Harber','1980-08-20', NULL,0),
(258,'Maurine','Modesta','Swift','1980-08-20', NULL,0),
(259,'Paris','Ona','Reilly','1980-08-20', NULL,0),
(260,'Sophie','Gregg','Sporer','1980-08-20', NULL,0),
(261,'Alfredo','Katelin','Doyle','1980-08-20', NULL,0),
(262,'Marcos','Dejon','Klein','1980-08-20', NULL,0),
(264,'Mae','Kara','Koss','1980-08-20', NULL,NULL),
(265,'Micheal','Taryn','Douglas','1980-08-20', NULL,0),
(266,'Sophie','Elwin','Klocko','1980-08-20', NULL,0),
(267,'Wilfred','Rubie','Price','1980-08-20', NULL,0),
(268,'Teresa','Rickie','Spinka','1980-08-20', NULL,0),
(269,'Dana','Vincent','Bosco','1980-08-20', NULL,0),
(270,'Stewart','Quentin','Reichert','1980-08-20', NULL,0),
(271,'Nicola','Grayson','Jenkins','1980-08-20', NULL,0),
(272,'Alexandre','Abbie','Roob','1980-08-20', NULL,0),
(273,'Eulah','Nicholas','Grady','1980-08-20', NULL,0),
(274,'Terence','Morris','Dooley','1980-08-20', NULL,0),
(275,'Dylan','Travon','Schmidt','1980-08-20', NULL,0),
(276,'Adeline','Santos','Schultz','1980-08-20', NULL,0),
(277,'Marjorie','Precious','Fisher','1980-08-20', NULL,0),
(278,'Judy','Kailey','Smith','1980-08-20', NULL,0),
(279,'Kane','Yvonne','Aufderhar','1980-08-20', NULL,0),
(280,'Albert','Ryder','Heller','1980-08-20', NULL,0),
(281,'Laron','Edna','Becker','1980-08-20', NULL,0),
(282,'Ada','Boris','Dickens','1980-08-20', NULL,0),
(283,'Marianne','Dawson','Ruecker','1980-08-20', NULL,0),
(284,'Alysson','Anahi','Cummerata','1980-08-20', NULL,0),
(285,'Lauretta','Melody','Miller','1980-08-20', NULL,0),
(286,'Issac','Kennedy','Macejkovic','1980-08-20', NULL,0),
(287,'Rosie','Jacynthe','Kunze','1980-08-20', NULL,0),
(288,'Ernie','Gabrielle','Gorczany','1980-08-20', NULL,0),
(289,'Edmond','Meredith','Douglas','1980-08-20', NULL,0),
(290,'Domenick','Nels','Anderson','1980-08-20', NULL,0),
(291,'Haven','Dimitri','Mosciski','1980-08-20', NULL,0),
(292,'Jaylin','Marcia','Bradtke','1980-08-20', NULL,0),
(293,'Jeromy','Rosanna','Kiehn','1980-08-20', NULL,0),
(294,'Scottie','Eladio','Crist','1980-08-20', NULL,0),
(295,'Dolores','Jasen','Lowe','1980-08-20', NULL,0),
(296,'Lou','Justus','Kirlin','1980-08-20', NULL,0),
(297,'Brayan','Stephany','Marvin','1980-08-20', NULL,0),
(298,'Emmett','Josiah','Heidenreich','1980-08-20', NULL,0),
(299,'Veda','Vella','Dare','1980-08-20', NULL,0),
(300,'Lucio','Ansel','Conn','1990-01-11', NULL,NULL);/*!40000 ALTER TABLE `personen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `taetigkeit`
--

DROP TABLE IF EXISTS `taetigkeit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `taetigkeit` (
  `person_id` int NOT NULL,
  `taetigkeit_beginn` date NOT NULL,
  `taetigkeit_ende` date DEFAULT NULL,
  `typ` enum('Freiwilligendienst','Ehrenamt','Praktikum','Honorartaetigkeit','extern','Kollektiv','Arbeitsverhaeltniss') DEFAULT NULL,
  `taetigkeit` enum('Lehrkraefte mit Unterrichtsbefaehigung','Lehrkraefte ohne Unterrichtsbefaehigung','Sonstige Lehrkraft','Paedagogische Fachkraefte eFoeB','Sonstige paedagogische Kraft Ganztag','Verwaltungskraft','Kuechenkraft','Kuechenhilfe','Reinigungskraft','Hausmeister*in','Schulhilfe') DEFAULT NULL,
  PRIMARY KEY(`person_id`, `taetigkeit_beginn`),
  KEY `fk_Taetigkeit_Person_idx` (`person_id`),
  CONSTRAINT `fk_Taetigkeit_Person` FOREIGN KEY (`person_id`) REFERENCES `personen` (`person_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taetigkeit`
--

LOCK TABLES `taetigkeit` WRITE;
/*!40000 ALTER TABLE `taetigkeit` DISABLE KEYS */;
INSERT INTO `taetigkeit` VALUES (58,'2008-08-20',NULL,'Freiwilligendienst','Kuechenhilfe'),(62,'2008-08-20',NULL,'extern','Lehrkraefte mit Unterrichtsbefaehigung'),(63,'2008-08-20',NULL,'extern','Schulhilfe'),(64,'2008-08-20',NULL,'Ehrenamt','Hausmeister*in'),(65,'2008-08-20',NULL,'Kollektiv','Kuechenkraft'),(66,'2008-08-20',NULL,'Kollektiv','Kuechenkraft'),(68,'2008-08-20',NULL,'Kollektiv','Reinigungskraft'),(69,'2008-08-20',NULL,'Kollektiv','Verwaltungskraft'),(70,'2008-08-20',NULL,'Kollektiv','Verwaltungskraft'),(71,'2008-08-20',NULL,'Kollektiv','Reinigungskraft'),(72,'2008-08-20',NULL,'Kollektiv','Lehrkraefte ohne Unterrichtsbefaehigung'),(73,'2008-08-20',NULL,'Kollektiv','Lehrkraefte mit Unterrichtsbefaehigung'),(76,'2008-08-20',NULL,'Kollektiv','Lehrkraefte mit Unterrichtsbefaehigung'),(77,'2008-08-20',NULL,'Kollektiv','Lehrkraefte ohne Unterrichtsbefaehigung'),(78,'2008-08-20',NULL,'Kollektiv','Lehrkraefte mit Unterrichtsbefaehigung'),(79,'2008-08-20',NULL,'Kollektiv','Lehrkraefte mit Unterrichtsbefaehigung'),(80,'2008-08-20',NULL,'Kollektiv','Lehrkraefte ohne Unterrichtsbefaehigung'),(81,'2008-08-20',NULL,'Kollektiv','Lehrkraefte mit Unterrichtsbefaehigung'),(82,'2008-08-20',NULL,'Kollektiv','Paedagogische Fachkraefte eFoeB'),(83,'2008-08-20',NULL,'Kollektiv','Paedagogische Fachkraefte eFoeB'),(84,'2008-08-20',NULL,'Kollektiv','Lehrkraefte ohne Unterrichtsbefaehigung'),(85,'2008-08-20',NULL,'Kollektiv','Paedagogische Fachkraefte eFoeB');
/*!40000 ALTER TABLE `taetigkeit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vereinsmitgliedschaft`
--

DROP TABLE IF EXISTS `vereinsmitgliedschaft`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vereinsmitgliedschaft` (
  `person_id` int NOT NULL,
  `mitgliedschaftsbeginn` date NOT NULL,
  `typ` enum('aktiv','foerdernd') DEFAULT NULL,
  `mitgliedschaftsende` date DEFAULT NULL,
  `grund_fuer_mitgliedschaftsende` enum('Austritt','Ausschluss','Tod','Streichung','Ende des Schulbesuchs','Ende des Arbeitsverhaeltnisses','Sonstiges') DEFAULT NULL,
  PRIMARY KEY (`mitgliedschaftsbeginn`,`person_id`),
  KEY `fk_Person_Verein` (`person_id`),
  CONSTRAINT `fk_Person_Verein` FOREIGN KEY (`person_id`) REFERENCES `personen` (`person_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vereinsmitgliedschaft`
--

LOCK TABLES `vereinsmitgliedschaft` WRITE;
/*!40000 ALTER TABLE `vereinsmitgliedschaft` DISABLE KEYS */;
INSERT INTO `vereinsmitgliedschaft` VALUES (274,'2006-03-27','aktiv',NULL,NULL),(222,'2007-12-13','aktiv','2017-05-31','Ende des Arbeitsverhaeltnisses'),(232,'2009-07-14','aktiv','2018-07-31','Ende des Schulbesuchs'),(216,'2010-03-25','aktiv',NULL,NULL),(148,'2010-04-19','aktiv','2017-07-31','Ende des Schulbesuchs'),(210,'2010-04-27','aktiv','2016-07-31','Ende des Schulbesuchs'),(294,'2010-05-03','aktiv','2018-03-06','Streichung'),(175,'2010-06-28','aktiv','2017-07-31','Ende des Schulbesuchs'),(176,'2012-05-03','aktiv','2018-07-31','Ende des Schulbesuchs'),(190,'2012-06-13','aktiv','2021-07-31','Ende des Schulbesuchs'),(211,'2012-06-13','aktiv','2021-07-31','Ende des Schulbesuchs'),(219,'2012-10-30','aktiv','2016-09-30','Ende des Arbeitsverhaeltnisses'),(292,'2013-04-11','aktiv','2019-07-31','Ende des Schulbesuchs'),(136,'2013-04-22','aktiv','2019-12-31','Austritt'),(158,'2013-05-03','aktiv','2019-07-31','Ende des Schulbesuchs'),(141,'2013-06-23','aktiv','2019-07-31','Ende des Schulbesuchs'),(143,'2013-06-23','aktiv','2019-07-31','Ende des Schulbesuchs'),(228,'2013-08-10','aktiv',NULL,NULL),(293,'2013-10-24','aktiv',NULL,NULL),(125,'2014-11-21','aktiv','2020-12-31','Ende des Schulbesuchs'),(297,'2014-11-25','aktiv','2018-09-24','Austritt'),(164,'2014-11-26','aktiv','2021-07-31','Ende des Schulbesuchs'),(199,'2014-11-28','aktiv','2020-07-31','Ende des Schulbesuchs'),(117,'2014-12-18','aktiv',NULL,NULL),(196,'2015-02-13','aktiv',NULL,NULL),(263,'2015-02-13','aktiv',NULL,NULL),(127,'2016-01-12','aktiv','2017-07-31','Ende des Schulbesuchs'),(139,'2016-07-14','aktiv',NULL,NULL),(177,'2016-07-14','aktiv','2020-12-31','Ende des Schulbesuchs'),(180,'2016-07-14','aktiv','2017-07-31','Ende des Schulbesuchs'),(224,'2016-07-14','aktiv',NULL,NULL),(243,'2016-07-14','aktiv','2017-07-31','Ende des Schulbesuchs'),(169,'2016-08-10','aktiv',NULL,NULL),(240,'2016-08-10','aktiv',NULL,NULL),(119,'2016-09-14','aktiv',NULL,NULL),(256,'2016-09-14','aktiv',NULL,NULL),(276,'2016-09-14','aktiv',NULL,NULL),(279,'2016-09-14','aktiv','2020-03-04','Ende des Schulbesuchs'),(150,'2017-01-17','aktiv',NULL,NULL),(154,'2017-01-17','aktiv','2021-07-31','Ende des Schulbesuchs'),(200,'2017-01-17','aktiv','2019-07-31','Ende des Schulbesuchs'),(126,'2017-02-15','aktiv',NULL,NULL),(162,'2017-02-15','aktiv','2020-07-31','Ende des Schulbesuchs'),(170,'2017-02-15','aktiv','2021-07-31','Ende des Schulbesuchs'),(246,'2017-02-15','aktiv','2020-01-31','Ende des Arbeitsverhaeltnisses'),(153,'2017-02-21','aktiv','2020-12-31','Ende des Schulbesuchs'),(130,'2017-03-07','aktiv','2021-07-31','Ende des Schulbesuchs'),(272,'2017-03-09','aktiv','2020-10-26','Austritt'),(273,'2017-03-09','aktiv','2020-10-26','Austritt'),(241,'2017-04-03','aktiv','2020-08-15','Ende des Arbeitsverhaeltnisses'),(122,'2017-05-10','aktiv',NULL,NULL),(206,'2017-06-22','aktiv',NULL,NULL),(110,'2018-04-24','aktiv','2019-05-07','Ende des Schulbesuchs'),(168,'2018-04-24','aktiv',NULL,NULL),(194,'2018-04-24','aktiv','2020-12-22','Austritt'),(195,'2018-04-24','aktiv',NULL,NULL),(280,'2018-05-23','aktiv',NULL,NULL),(281,'2018-05-23','aktiv',NULL,NULL),(171,'2018-09-19','aktiv','2020-12-23','Austritt'),(205,'2018-10-12','aktiv',NULL,NULL),(271,'2018-10-12','aktiv',NULL,NULL),(290,'2018-10-12','aktiv',NULL,NULL),(155,'2019-01-17','foerdernd',NULL,NULL),(192,'2019-02-01','foerdernd',NULL,NULL),(193,'2019-02-01','foerdernd',NULL,NULL),(197,'2019-02-01','foerdernd',NULL,NULL),(288,'2019-02-20','aktiv','2021-08-31','Ende des Arbeitsverhaeltnisses'),(220,'2019-03-06','foerdernd','2019-12-06','Tod'),(282,'2019-03-06','foerdernd',NULL,NULL),(131,'2019-04-01','foerdernd',NULL,NULL),(277,'2019-04-01','foerdernd',NULL,NULL),(283,'2019-04-01','foerdernd',NULL,NULL),(247,'2019-04-03','aktiv',NULL,NULL),(248,'2019-04-03','aktiv',NULL,NULL),(284,'2019-04-03','aktiv',NULL,NULL),(285,'2019-04-03','aktiv',NULL,NULL),(161,'2019-04-30','aktiv',NULL,NULL),(226,'2019-06-12','aktiv',NULL,NULL),(227,'2019-06-12','aktiv',NULL,NULL),(121,'2019-10-02','aktiv','2019-11-30','Ende des Schulbesuchs'),(260,'2019-10-02','aktiv','2019-11-30','Ende des Schulbesuchs'),(186,'2020-03-04','foerdernd','2020-07-31','Ende des Schulbesuchs'),(118,'2020-05-27','aktiv',NULL,NULL),(165,'2020-05-27','aktiv',NULL,NULL),(213,'2020-05-27','aktiv',NULL,NULL),(242,'2020-05-27','aktiv',NULL,NULL),(231,'2020-06-10','aktiv',NULL,NULL),(202,'2020-08-06','aktiv',NULL,NULL),(207,'2020-08-06','aktiv',NULL,NULL),(183,'2020-08-19','foerdernd','2021-08-16','Austritt'),(166,'2020-08-27','aktiv',NULL,NULL),(217,'2020-08-27','aktiv',NULL,NULL),(238,'2020-08-27','aktiv',NULL,NULL),(250,'2020-08-27','aktiv','2021-07-31','Ende des Arbeitsverhaeltnisses'),(291,'2020-08-27','aktiv',NULL,NULL),(138,'2020-09-01','aktiv',NULL,NULL),(113,'2020-09-09','aktiv',NULL,NULL),(255,'2020-10-01','foerdernd',NULL,NULL),(267,'2020-10-15','foerdernd',NULL,NULL),(128,'2021-04-15','aktiv',NULL,NULL),(135,'2021-04-15','aktiv',NULL,NULL),(140,'2021-04-15','aktiv',NULL,NULL),(184,'2021-08-05','aktiv',NULL,NULL),(244,'2021-08-05','aktiv',NULL,NULL),(112,'2021-08-06','aktiv',NULL,NULL);
/*!40000 ALTER TABLE `vereinsmitgliedschaft` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-15 17:16:31
