-- MySQL dump 10.13  Distrib 8.0.23, for macos10.15 (x86_64)
--
-- Host: 127.0.0.1    Database: fsx_datenbank
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


USE fsx_db;

-- table for user verification when registering
CREATE TABLE `fsx_db`.`verification` ( 
  `code_id` INT NOT NULL AUTO_INCREMENT , 
  `verifcode` VARCHAR(6) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL , 
  PRIMARY KEY (`code_id`)
  ) ENGINE = InnoDB; 


-- table for user authentication
CREATE TABLE `users` ( 
  `user_id` INT NOT NULL AUTO_INCREMENT , 
  `username` VARCHAR(20) NOT NULL , 
  `password` VARCHAR(1000) NOT NULL , 
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
  ) ENGINE = InnoDB; 



-- data for storing sessions
CREATE TABLE `fsx_db`.`sessions` (
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
INSERT INTO `arbeitsgruppen` VALUES (1,'Vorstand Trägerverein','','vorstand@freieschulekreuzberg.de'),(2,'Elternvertretung','','elternvertretung@freieschulekreuzberg.de'),(3,'AG Sicherheit','','ag-sicherheit@freieschulekreuzberg.de'),(4,'AG Bau','','ag-bau@freieschulekreuzberg.de'),(5,'AG Renovieren','','ag-renovieren@freieschulekreuzberg.de'),(6,'AG Transport','','ag-transport@freieschulekreuzberg.de'),(7,'AG Sauberkeit','','ag-sauberkeit@freieschulekreuzberg.de'),(8,'AG Party','','ag-party@freieschulekreuzberg.de'),(9,'AG Öffentlichkeit','','ag-oeffentlichkeit@freieschulekreuzberg.de'),(10,'AG Fund FSX!','','glitter@freieschulekreuzberg.de'),(11,'AG IT und Web','','ag-it@freieschulekreuzberg.de'),(12,'AG Betreuung','','ag-betreuung@freieschulekreuzberg.de'),(13,'AG Bewerbungen','','chancen@freieschulekreuzberg.de'),(14,'AG Schulplatzvergabe','','schulplatz@freieschulekreuzberg.de');
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
INSERT INTO `haushalte` VALUES (1,'Adalbertstr. 73','10997','Berlin','','Kreuzberg',0,'','',''),(2,'Admiralstr. 16','10999','Berlin','','Kreuzberg',0,'','',''),(3,'Allerstr. 18','12049','Berlin','','Neukölln',0,'','',''),(4,'Am Alten Wehr 17','61119','Bad Vilbel','','',1,'','',''),(5,'Am Kirchplatz 11','37213','Witzenhausen','','',1,'','',''),(6,'Arndtstr. 43','10965','Berlin','','Kreuzberg',1,'','',''),(7,'Bergfriedstr. 8A','10969','Berlin','','Kreuzberg',1,'','',''),(8,'Birkenstr. 20','10559','Berlin','','Moabit',1,'','',''),(9,'Blücherstr. 18','10961','Berlin','','Kreuzberg',1,'','',''),(10,'Böhmische Str. 10','12055','Berlin','','Neukölln',1,'','',''),(11,'Boppstr. 11','10967','Berlin','','Kreuzberg',1,'','',''),(12,'Bornsdorfer Str. 27','12053','Berlin','','Neukölln',1,'','',''),(13,'Carl-Herz-Ufer 15','10961','Berlin','','Kreuzberg',1,'','',''),(14,'Carl-Herz-Ufer 15','10961','Berlin','','Kreuzberg',1,'','',''),(15,'Charlottenstr. 4','10315','Berlin','','',1,'','',''),(16,'Cuvrystr. 30','10999','Berlin','','Kreuzberg',1,'','',''),(17,'Dieffenbachstr. 38','10967','Berlin','','Kreuzberg',1,'','',''),(18,'Dr.-Ehrhardt-Str. 26','66386','St. Ingbert','','',1,'','',''),(19,'Eberswalderstr. 36','10437','Berlin','','Prenzlauer Berg',0,'','',''),(20,'Eichelkamp 3','14469','Potsdam','','',0,'','',''),(21,'Eichenroder Ring 3','13435','Berlin','','Wittenau',0,'','',''),(22,'Eisenbahnstr. 11','10997','Berlin','','Kreuzberg',0,'','',''),(23,'Engeldamm 40','10179','Berlin','','Mitte',0,'','',''),(24,'Erkelenzdamm 33','10999','Berlin','','Kreuzberg',0,'','',''),(25,'Erkstr. 4','12043','Berlin','','Neukölln',0,'','',''),(26,'Fidicinstr. 35','10965','Berlin','','Kreuzberg',0,'030 22355792','',''),(27,'Finowstr. 39','10247','Berlin','','Friedrichshain',0,'','',''),(28,'Fraenkelufer 28','10999','Berlin','','Kreuzberg',0,'','',''),(29,'Friedelstr. 35','12047','Berlin','','Neukölln',0,'','',''),(30,'Fuldastr. 37','12045','Berlin','','Neukölln',0,'','',''),(31,'Gießener Str. 3','61118','Bad Vilbel','','',0,'','',''),(32,'Görlitzer Str. 44','10997','Berlin','','Kreuzberg',0,'','',''),(33,'Graefestr. 88','10967','Berlin','','Kreuzberg',0,'030 56978454','',''),(34,'Grünberger Str. 55','10245','Berlin','','Friedrichshain',0,'','',''),(35,'Gürtelstr. 13','10247','Berlin','','Friedrichshain',0,'','',''),(36,'Hammerthal 3','16259','Bad Freienwalde','','',0,'','',''),(37,'Hans-Thoma-Str. 3','12435','Berlin','','Plänterwald',0,'','',''),(38,'Hans-Thoma-Str. 3','12435','Berlin','','Plänterwald',0,'','',''),(39,'Haynstr. 1','20249','Hamburg','','',0,'','',''),(40,'Heidelberger Str. 32','12059','Berlin','','',0,'','',''),(41,'Heidelberger Str. 81','12435','Berlin','','Alt-Treptow',0,'','',''),(42,'Heidelberger Str. 81','12435','Berlin','','Alt-Treptow',0,'','',''),(43,'Heidelberger Str. 81','12045','Berlin','','Alt-Treptow',0,'','',''),(44,'Hermannstr. 202','12049','Berlin','','Neukölln',0,'','',''),(45,'Hermannstr. 230','12049','Berlin','','Neukölln',0,'','',''),(46,'Hoenerweg 9','10367','Berlin','','Lichtenberg',0,'','',''),(47,'Hohenfriedbergstraße 9 ','10829','Berlin','','Schöneberg',0,'','bei Binkowski ',''),(48,'Isarstr. 11','12053','Berlin','','Neukölln',0,'030 29001420','',''),(49,'Jahnstr. 13','10967','Berlin','','Kreuzberg',0,'030 81492817','',''),(50,'Josef-Orlopp-Str. 14','10367','Berlin','','Friedrichshain',0,'','',''),(51,'Josef-Orlopp-Str. 52','10365','Berlin','','Lichtenberg',0,'','',''),(52,'Jupiterstr. 9','12057','Berlin','','Neukölln',0,'','',''),(53,'Karl-Kunger-Str. 26','12435','Berlin','','Alt-Treptow',0,'','',''),(54,'Karlsgartenstr. 15','12049','Berlin','','Neukölln',0,'','',''),(55,'Kiefholzstr. 186','12437','Berlin','','Baumschulenweg',0,'','',''),(56,'Kiefholzstr. 6','12435','Berlin','','Alt-Treptow',0,'','',''),(57,'Kohlfurter Str. 40','10999','Berlin','','Kreuzberg',0,'','',''),(58,'Lachmannstr. 4','10967','Berlin','','Kreuzberg',0,'030 6936968','',''),(59,'Landsberger Allee 70 ','10249','Berlin','','Kreuzberg',0,'','',''),(60,'Lausitzer Platz 10','10997','Berlin','','Kreuzberg',0,'','',''),(61,'Lausitzer Platz 16','10997','Berlin','','Kreuzberg',0,'030 44038001','',''),(62,'Lausitzer Platz 9','10997','Berlin','','Kreuzberg',0,'','',''),(63,'Leonberger Str. 30','71638','Ludwigsburg','','',0,'','',''),(64,'Lohmühlenstr. 45','12435','Berlin','','Alt-Treptow',0,'','',''),(65,'Löwestr. 16','10249','Berlin','','Friedrichshain',0,'','',''),(66,'Lübbener Str. 21','10997','Berlin','','Kreuzberg',0,'','',''),(67,'Lübbener Str. 21 ','10997','Berlin','','Kreuzberg',0,'','',''),(68,'Lübbener Str. 27','10997','Berlin','','Kreuzberg',0,'','',''),(69,'Luisenstr. 18','14542','Werder / Havel','','',0,'','',''),(70,'Manteuffelstr. 100','10997','Berlin','','Kreuzberg',0,'','',''),(71,'Manteuffelstr. 20','10997','Berlin','','Kreuzberg',0,'','',''),(72,'Manteuffelstr. 27','10997','Berlin','','Kreuzberg',0,'','',''),(73,'Manteuffelstr. 39','10997','Berlin','','Kreuzberg',0,'','',''),(74,'Manteuffelstr. 7','10997','Berlin','','Kreuzberg',0,'07611371893','',''),(75,'Manteuffelstr. 7','10997','Berlin','','Kreuzberg',0,'','',''),(76,'Manteuffelstr. 86','10997','Berlin','','Kreuzberg',0,'','',''),(77,'Mariannenplatz 1','10997','Berlin','','Kreuzberg',0,'','',''),(78,'Mariannenplatz 1a','10997','Berlin','','Kreuzberg',0,'','',''),(79,'Mariendorfer Weg 35','12051','Berlin','','',0,'','',''),(80,'Märkische Allee 158','12681','Berlin','','Marzahn',0,'','bei Hofmann',''),(81,'Marktstr. 22','21423','Winsen/Luhe','','',0,'','',''),(82,'Matternstr. 3','10249','Berlin','','Friedrichshain',0,'','',''),(83,'Mengerzeile 11','12435','Berlin','','Alt-Treptow',0,'','',''),(84,'Muskauer Str. 35','10997','Berlin','','Kreuzberg',0,'030 82074151','',''),(85,'Muskauerstr. 23','10997','Berlin','','Kreuzberg',0,'','',''),(86,'Naunynstr. 21','10997','Berlin','','Kreuzberg',0,'','',''),(87,'Naunynstr. 23','10997','Berlin','','Kreuzberg',0,'','',''),(88,'Naunynstr. 46','10999','Berlin','','Kreuzberg',0,'','',''),(89,'Naunynstr. 52','10997','Berlin','','Kreuzberg',0,'030 61107213','',''),(90,'Naunynstr. 61','10999','Berlin','','Kreuzberg',0,'','',''),(91,'Naunynstr. 83','10997','Berlin','','Kreuzberg',0,'','',''),(92,'Niederbarnimstr. 15','10247','Berlin','','Friedrichshain',0,'','',''),(93,'Ohlauer Str. 8','10999','Berlin','','Kreuzberg',0,'','',''),(94,'Oppelner Str. 8','10997','Berlin','','Kreuzberg',0,'','',''),(95,'Oranienstr. 176','10999','Berlin','','Kreuzberg',0,'','',''),(96,'Oranienstr. 22','10999','Berlin','','Kreuzberg',0,'','',''),(97,'Ossastr. 17','12045','Berlin','','Neukölln',0,'','',''),(98,'Pannierstr. 57','12047','Berlin','','Neukölln',0,'','',''),(99,'Pariser Str. 63','10719','Berlin','','Wilmersdorf',0,'','',''),(100,'Paul-Lincke-Ufer 44a','10999','Berlin','','Kreuzberg',0,'','',''),(101,'Pestalozzistr. 43','13187','Berlin','','Pankow',0,'','',''),(102,'Pflügerstr. 15','12047','Berlin','','Neukölln',0,'','',''),(103,'Pfuelstr. 6','10997','Berlin','','Kreuzberg',0,'','',''),(104,'Platanenstr. 32','12529','Schönefeld','','',0,'','',''),(105,'Platanenweg 36','12437','Berlin','','',0,'','',''),(106,'Prinzessinnenstr. 2','10969','Berlin','','Kreuzberg',0,'','',''),(107,'Pücklerstr. 25','10997','Berlin','','Kreuzberg',0,'','',''),(108,'Reichenberger Str. 122','10997','Berlin','','Kreuzberg',0,'','',''),(109,'Reichenberger Str. 144','10999','Berlin','','Kreuzberg',0,'','',''),(110,'Reichenberger Str. 144','10999','Berlin','','Kreuzberg',0,'','',''),(111,'Reuterstr. 32A','12047','Berlin','','Neukölln',0,'','',''),(112,'Richardstr. 110','12043','Berlin','','Neukölln',0,'','',''),(113,'Samariterstr. 32','10247','Berlin','','Friedrichshain',0,'','',''),(114,'Scharnweberstr. 38','10245','Berlin','','Friedrichshain',0,'','',''),(115,'Scharnweberstr. 38','10247','Berlin','','Friedrichshain',0,'','',''),(116,'Schillerpromenade 10','12049','Berlin','','Neukölln',0,'','',''),(117,'Schlegelstr. 14','10115','Berlin','','Mitte',0,'','',''),(118,'Schmollerplatz 29','12435','Berlin','','Alt-Treptow',0,'','',''),(119,'Seckbacher Landstraße 22','60389','Frankfurt / Main','','',0,'','',''),(120,'Seumestr. 22','10245','Berlin','','Friedrichshain',0,'','',''),(121,'Sorauer Str. 6','10997','Berlin','','Kreuzberg',0,'','',''),(122,'Spittastr. 33','10317','Berlin','','Rummelsburg',0,'','',''),(123,'Steinrötschstr. 62','52152','Simmerath','','',0,'','',''),(124,'Stralauer Platz 32','10243','Berlin','','Friedrichshain',0,'','',''),(125,'Stralauer Platz 32','10243','Berlin','','Friedrichshain',0,'','',''),(126,'Stubnitzstr. 27A','13189','Berlin','','Pankow',0,'','',''),(127,'Waldemarstr. 24','10999','Berlin','','Kreuzberg',0,'','',''),(128,'Weichselstr 29','10247','Berlin','','Friedrichshain',0,'','',''),(129,'Weichselstr. 48','12045','Berlin','','Neukölln',0,'','',''),(130,'Weserstr. 181','12045','Berlin','','Neukölln',0,'','',''),(131,'Weserstr. 31','10247','Berlin','','Friedrichshain',0,'','',''),(132,'Weserstr. 52','12045','Berlin','','Neukölln',0,'','',''),(133,'Wiener Str. 20','10999','Berlin','','Kreuzberg',0,'030 53211501','',''),(134,'Wilibald-Alexis-Str. 33','10965','Berlin','','Kreuzberg',0,'030 91441710','',''),(135,'Wilsnacker Str. 40','10559','Berlin','','Moabit',0,'','',''),(136,'Winckelmannstr. 73','12487','Berlin','','Johannisthal',0,'030 32304155','',''),(137,'Wrangelstr. 8','10997','Berlin','','Kreuzberg',0,'','',''),(138,'Zeppelinstr. 25','14471','Potsdam','','',0,'','',''),(139,'','','','','',0,'','',''),(140,'','','','','',0,'','',''),(141,'','','','','',0,'','',''),(142,'','','','','',0,'','',''),(143,'','','','','',0,'','',''),(144,'','','','','',0,'','',''),(145,'','','','','',0,'','',''),(146,'','','','','',0,'','',''),(147,'','','','','',0,'','',''),(148,'','','','','',0,'','',''),(149,'','','','','',0,'','',''),(150,'','','','','',0,'','',''),(151,'','','','','',0,'','',''),(152,'','','','','',0,'','',''),(153,'','','','','',0,'','',''),(154,'','','','','',0,'','','');
/*!40000 ALTER TABLE `haushalte` ENABLE KEYS */;
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
  `betreuung_beginn` date DEFAULT NULL,
  `betreuung_ende` date DEFAULT NULL,
  `betreuung_umfang` enum('16:00','18:00') DEFAULT NULL,
  `betreuung_ferien` tinyint(1) DEFAULT NULL,
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
  `but_beginn` date DEFAULT NULL,
  `but_ende` date DEFAULT NULL,
  `berlinpass_but` tinyint(1) DEFAULT NULL,
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
INSERT INTO `kontakt_daten` VALUES ('+49 152 2492375','','','+49 151 56155945','','','nic_ahrens@yahoo.de','','',110),('+49 1577 2727679','','','','','','swamone@riseup.net','','swantje@freieschulekreuzberg.de',112),('+49 15778824126','','','','','','koch@dirty-city-beats.de','','',113),('+49 176 72330027','','','','','','b.avg@hotmail.com','','',114),('+49 17661224110','','','','','','ehsanullahazizi25@gmail.com','','',115),('+49 176 72887244','','','','','','daniel.bargil@gmail.com','','',116),('+49 170 8471112','','','030 69508902','','','emily.barnickel@posteo.de','','',117),('+49 171 9438811','','','','','','lars.barnickel@posteo.de','','',118),('+49 179 6704665','','','','','','danielabellm@gmx.de','','',119),('+49 176 84442891','','','','','','tideofsound@gmail.com','','',120),('+49 151 26593686','','','','','','kombinat.71@gmx.de','','',121),('+49 176 81690086','','','','','','m.biedrzycki@gmx.de','','',122),('+49 152 53384316','','','030 65835479','','','bastian.bienlein@gmx.de','','',123),('+49 170 4961450','','','','','','jubir@gmx.de','','',125),('+49 173 6240390','','','','','','maxphilipblank@gmx.de','','',126),('+49 179 2919874','','','','','','d.boeker71@gmx.de','','',127),('+49 1776830884','','','','','','dop.bolick@gmail.com','','',128),('+49 176 34760746','','','','','','familie.brendle@gmail.com','','',129),('+49 177 1977461','','','','','','tinebreuer@web.de','','',130),('','','','','','','g.brossmer@gmx.net','','',131),('+49 152 54767676','','','','','','janburkamp@gmail.com','','',132),('+49 1573 8028972','','','','','','mayamitierra@yahoo.es','','',133),('+49 15163407675','','','','','','magali.chastaing@gmail.com','','',134),('+49 163 6970188','','','','','','silke@mail36.net','','',135),('+49 1577 4211899','','','','','','circis@yahoo.de','','',136),('+49 15753624997','','','','','','guissi1979@gmail.com','','',137),('+49 152 55747419','','','','','','pitr3no@aim.com','','pietro@freieschulekreuzberg.de',138),('+49 179 5169745','','','','','','vegadamm@gmx.de','','vega@freieschulekreuzberg.de',139),('+49 179 8638339','','','','','','zazaonline@yahoo.fr','','',140),('+49 152 56313468','','','','','','nikolausdietrich@gmail.com','','',141),('+49 1787289769','','','','','','juliusdoerner@gmail.com','','',142),('+49 160 97639316','','','','','','danidottan@gmail.com','','',143),('+49 15205890344','','','','','','nanaburuKu@gmx.net','','',144),('+49 17624338713','','','','','','willi.effenberger@systemli.org','','',145),('+49 176 61994890','','','','','','contact@janehret.de','','',146),('+49 179 1202920 ','','','','','','tobiaseuler@gmx.net','','',147),('+49 179 3150024','','','','','','solysolysol@gmail.com','','',148),('+49 176 72887185','','','','','','norafish81@gmail.com','','',149),('+49 177 3383013','','','','','','globalgestalten@posteo.de','','',150),('+49 176 72344978','','','','','','bea.froehlich@gmx.de','','',151),('+49 163 1360684','','','','','','elfielle@gmail.com','','',152),('+49 172 1646065','','','','','','m.gerstemann@gmx.de','','',153),('+49 176 84442892','','','','','','sarah.giarmoleo@gmail.com','','',154),('+49 176 97572210','','','','','','gregarones@gmail.com','','',157),('+49 175 2018524','','','','','','judy.stern@gmx.de','','',158),('','','','','','','aha16@gmx.net','','',159),('+49 176 23569349','','','','','','michel@mail36.net','','',161),('+49 176 43671944','','','','','','e.hamdan@web.de','','',162),('+49 176 70749161','','','','','','liapavlidis@web.de','','',163),('+49 179 6711617','','','','','','carsten@machlauter.de','','',164),('+49 15775702942','','','','','','kasmo@posteo.de','','',165),('+49 15736581441','','','','','','haeseli@posteo.de','','',166),('+49 176 78801341','','','','','','laura.hassler@posteo.de','','',167),('+49 176 31758362','','','','','','pirjana.h@gmail.com','','',168),('+49 163 9620091','','','','','','daligagatan@gmail.com','','johnny@freieschulekreuzberg.de',169),('+49 177 9716628','','','','','','hoang@posteo.de','','',170),('+49 176 81700700','','','','','','little.nell@gmx.de','','',171),('','','','','','','checkbob@gmx.net','','',172),('+49 176 63761562','','','','','','albinocobra1@yahoo.com','','jason@freieschulekreuzberg.de',173),('+49 179 5414946','','','','','','tilman.hopf@gmx.net','','',174),('+49 176 68693185','','','','','','johnnybottrop@thebottrops.com','','',175),('+49 176 22684313','','','','','','humienna.monika@gmail.com','','',176),('+49 170 6751759','','','','','','luigi.huober@gmx.de','','',177),('+49 1575 6467329','','','','','','jonashuetten@yahoo.in','','',178),('+49 176 39877591','','','','','','ana@janeva.net','','',180),('','','','','','','f.kappeler@gmx.de','','',183),('+49 172 5398218','','','','','','alexanderkasten@gmail.com','','',184),('','','','','','','chr.kendzia@web.de','','',185),('+49 176 75860991','','','','','','angelekengne80@yahoo.fr','','',186),('+49 1776533488','','','','','','hadi.khanjanpour@gmail.com','','',187),('+49 1786154071','','','','','','smuxa@gmx.de','','',189),('+49 178 1877127','','','','','','t-knapp@gmx.net','','',190),('','','','','','','koenigkarin@web.de','','',193),('+49 177 6698686','','','','','','ingokoenig@gmx.de','','',194),('+49 1522 6859810','','','','','','luigika@gmail.com','','',195),('+49 178 2179112','','','','','','kranz.sascha@gmail.com','','',196),('','','','','','','ulikroenke@web.de','','',197),('+49 163 0814801','','','','','','christoph@ghettoking.de','','',198),('+49 176 55379455','','','030 78792789','','','klaaskuehn@hotmail.com','','',199),('+49 176 70562523','','','','','','mischikupfer@gmail.com','','',200),('+49 1577 1212758','','','','','','rufus@moodra.com','','',201),('+49 17671484519','','','','','','ronja.lange@gmx.net','','',202),('+49 15751254147','','','','','','aljona.lazanowski@gmx.net','','',203),('+49 1573 5307811','','','','','','dianalegel@gmail.com','','diana@freieschulekreuzberg.de',205),('+49 177 1896665','','','030 84582253','','','julia.leinweber77@gmail.com','','',206),('+49 1771591530','','','','','','lerch.friederike@gmx.de','','',207),('','','','','','','nele.luetzen@gmx.de','','',210),('+49 177 1977014','','','','','','karen.markert@web.de','','',211),('+49 152 28463006','','','','','','lelektra@live.com','','',213),('+49 176 64656212','','','','','','josiane.mbede@gmx.de','','',215),('+49 160 6244602','','','','','030 747073334','nankeme@gmx.de','','nanke@freieschulekreuzberg.de',216),('+49 177 9384138','','','','','','das_zepped@yahoo.de','','',217),('','','','','','','sidmeyer@gmx.de','','',219),('','','','','','','stefan.monk@web.de','','',220),('+49 178 4370621','','','','','','attilerie@web.de','','',222),('+49 176 83168946','','','','','','tinamuellerblank@posteo.de','','',224),('+49 176 82484218','','','','','','ronel@hotmail.de','','',225),('+49 157 86747922','','','','','','jasper.nicolaisen@gmail.com','','',226),('+49 162 3340739','','','','','','l.l.nicolaisen@gmail.com','','',227),('','','','','','','sonianoyaberlin@gmail.com','','',228),('+49 176 40058215','','','040 306201360','','','irene_pabst@web.de','','',229),('+49 176 32198440','','','','','','ben@ohrbooten.de','','',230),('+49 17681922222','','','','','','lola.pejac@posteo.de','','',231),('+49 176 61473520','','','','','','petzolo@hotmail.com','','',232),('+49 172 7369228','','','','','','keetee@web.de','','',233),('+49 1521 7047958','','','','','','jess06lin@outlook.com','','',234),('+49 177 3294695','','','','','','stephanpose@gmail.com','','',236),('+49 176 96049848','','+49 1577 4106430','','','030 747073334','paul.predatsch@posteo.de','','paul@freieschulekreuzberg.de',238),('','','','','','','','','ve@freieschulekreuzberg.de',239),('','','','','','','jan.puchstein@web.de','','jan@freieschulekreuzberg.de',240),('+49 177 1597297','','','','','','cordiputzki@gmail.com','','',241),('+49 15129027036','','','','','','dora.pandora@hotmail.com','','',242),('+49 179 2418499','','','','','','agnieszka@schnittwerk.eu','','',243),('+49 179 1225625','','','','','','lukas@hainweh.de','','',244),('+49 176 42049605','','','','','','felixarifrhein@posteo.de','','',246),('+49 176 28390806','','','','','','carolina@glueckstueck.ch','','',247),('+49 174 3326690','','','','','','or@port-prince.de','','',248),('+49 163 1526656','','','','','','lieselotte@posteo.de','','',249),('+49 176 61188530','','','','','','johanna@roedisein.de','','johanna@freieschulekreuzberg.de',250),('+49 177 4396887','','','','','','amirumbou@yahoo.gr','','',252),('+49 179 4431996','','','','','','azam.safaei7@gmail.com','','',253),('+49 15141303045','','','','','','','','',254),('','','','','','','eva.schmidt-rohr@web.de','','',255),('+49 176 22244868','','','','','','rouvenschmitt@web.de','','',256),('+49 17643645193','','','','','','scholzsophie@gmail.com','','',257),('+49 162 5874597','','','','','','erwin_schoenthaler@yahoo.de','','',258),('+49 163 1143 059','','','','','','r-schroeder-um@outlook.de','','',259),('+49 176 681100736','','','','','','o.schulhof@gmx.de','','',260),('+49 176 34516192','','','','','','katrinavwlt@yahoo.de','','',262),('+49 177 7374594','','','','','','almut.schwacke@googlemail.com','','',263),('+49 157 88247784','','','','','','babaksharifi1980@gmail.com','','',264),('+49 1736163518','','','','','','ch.siebart@gmail.com','','',265),('+49 159 02148192','','','','','','bremersen@hotmail.com','','',266),('','','','','','','skutta@gmx.net','','',267),('','','','','','','sorgnele@gmail.com','','',269),('+49 170 2913715','','','','','','ulistelzner@yahoo.de','','',270),('+49 179 7632698','','','','','','martinstief@yahoo.de ','','martin@freieschulekreuzberg.de',271),('+49 1514 0519672','','','','','','strohm@reset-studio.de','','',272),('+49 1522 2795434','','','','','','sutschak@gmx.de','','',273),('+49 1573 3993649','','','','','','tinitaa@gmx.de','','tinita@freieschulekreuzberg.de',274),('+49 157 54066365','','','','','','junetempel@gmail.com','','',275),('+49 1573 5651833','','','','','','mo@moetmoi.com','','mo@freieschulekreuzberg.de',276),('','','','','','','records@tillmans.co.uk','','',277),('+49 162 2594325','','','','','','tamborina.tran@gmail.com','','',278),('+49 1577 2679226','','','','','','aylin.turgay@yahoo.de','','',279),('+49 178 3526914','','','','','','koakaok@web.de','','',280),('+49 178 9398607','','','','','','anz@gmx.de','','',281),('','','','','','','hannah.utschak@web.de','','',282),('+49 176 45634701','','','','','','a.k.a.unknownartist@gmail.com','','',284),('+49 176 30192163','','','','','','veselasalutska@gmail.com','','',285),('+49 1578 3860805','','','','','','dagmare21@gmx.de','','',286),('','','','','','','k.v.glahn@gmail.com','','',287),('+49 1575 8979016','','','','','','rosa@systemausfall.org','','denise@freieschulekreuzberg.de',288),('+49 163 4966705','','','','','','anthonyvouardoux@icloud.com','','',289),('+49 176 47605528','','','','','','voulgarikos@yahoo.gr','','',290),('+49 171 2983733','','','','','','ulrich.we@t-online.de','','ulrich@freieschulekreuzberg.de',291),('+49 1575 1112161','','','','','','saratiba@gmx.de','','',292),('+49 1575 7912039','','','','','','sina.we@gmx.de','','sina@freieschulekreuzberg.de',293),('','','','','','','protectyourvision@gmx.de','','',294),('+49 1575 3730866','','','','','','holzkeller@web.de','','',295),('+49 176 64669803','','','','','','b_wolff@hotmail.com','','',296),('+49 1578 9023623','','','','','','wolfruma@cms.hu-berlin.de','','',297),('+49 1523 6802239','','','','','','jens.zerrath@posteo.de','','',298),('+49 178 3584142','','','','','','','','',299);
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
INSERT INTO `lerngruppen` VALUES (1,'','','','unten'),(2,'','','','oben'),(3,'eltern_1-2@freieschulekreuzberg.de','','+49 1578 6423257','1/2'),(4,'eltern_3-4@freieschulekreuzberg.de','','+49 1573 7657982','3/4'),(5,'eltern_5-6@freieschulekreuzberg.de','','+49 1575 0412237','5/6');
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
INSERT INTO `personen` VALUES (58,'Sky','Sky Friedrich','Lange','2009-09-05','2015-08-01',0),(62,'Oscar','','Kendzia','2009-10-04','2016-08-01',0),(63,'Fritz','Fritz Wanja','Ehret','2010-01-22','2016-08-01',0),(64,'Leni Anou','Leni Anou','Schumann','2010-01-20','2016-08-01',0),(65,'Isa','Isa Abdulaye','Naikingar','2010-03-21','2016-08-01',0),(66,'Juan','Juan-Paul Jorge Ringo','Siebart','2010-04-20','2016-08-01',0),(68,'Jaane','Jaane Ella','Strohm','2011-07-22','2017-08-01',0),(69,'Jonas','','Volz','2011-09-22','2017-08-01',0),(70,'Keke','Keke Lasse','Schwacke','2011-06-16','2017-08-01',0),(71,'Obi','Oberon Bodhi','Lane','2011-08-17','2017-08-01',0),(72,'Youma','','Biedrzycki','2010-12-03','2017-08-01',0),(73,'Lilo','Lilo Luna Charlotte','Schönthaler','2011-02-21','2017-08-01',0),(76,'Kumia','Kumia Kaya','Urbach','2012-02-16','2018-08-01',0),(77,'Anton','Anton Edmund','König','2012-04-29','2018-08-01',0),(78,'Gonzo','Gonzalo Che','Rakowiec','2012-07-14','2018-08-01',0),(79,'Lél','','Kovács','2012-09-18','2018-08-01',0),(80,'Louiza','','Voulgari','2011-08-29','2018-08-01',0),(81,'Nafass','','Sharifi','2012-06-27','2018-08-01',0),(82,'Ethonas','Aithon Antonios','Avgoustakis','2012-01-27','2018-08-01',0),(83,'Rosa','Rosa Olin','Reblitz Lomeli','2011-11-16','2018-08-01',0),(84,'Constantine','Constantine Aris','Neumann','2012-07-20','2019-08-01',0),(85,'Luk','Luk Pollux','Meems','2013-05-19','2019-08-01',0),(86,'Ole','Ole Lars','Strohm','2013-05-06','2019-08-01',0),(87,'Polly','','Schumann','2013-04-18','2019-08-01',0),(88,'Radost','','Vasileva','2013-07-22','2019-08-01',0),(89,'Réka','Réka Sophia','Barnickel','2013-03-19','2019-08-01',0),(90,'Sid','','Noya','2013-01-18','2019-08-01',0),(91,'Sol ','','Rihs','2013-03-31','2019-08-01',0),(92,'Yoshio','','Chorus','2012-07-16','2019-08-01',0),(93,'Basti','Bastian','Siebart','2014-01-10','2020-08-01',0),(94,'Dayo','','Urbach','2014-03-18','2020-08-01',0),(95,'Demian','','Ragusa','2014-05-25','2020-08-01',0),(96,'Fayina','Fayina Robin','Lazanowski','2014-09-15','2020-08-01',0),(97,'Leloo','Matilda Amelie Leloo','Péjac','2014-06-21','2020-08-01',0),(98,'Maria ','Maria Paloma','Bellm','2014-03-06','2020-08-01',0),(99,'Meta','Meta Kalliope Zelda Amelie Pauline','Lerch','2013-09-06','2020-08-01',0),(100,'Paul','Gion Paul','Häseli','2014-04-19','2020-08-01',0),(101,'Yanie','','Biedrzycki','2014-05-31','2020-08-01',0),(102,'Yusuf ','Yusuf Abdurahim','Naikingar','2014-09-25','2020-08-01',0),(103,'Anouk','','Chorus','2014-07-09','2021-08-01',0),(104,'Ava','','Khanjanpour','2015-04-03','2021-08-01',0),(105,'Filippa','','Tran','2014-11-09','2021-08-01',0),(106,'Johnny','Johnny Locke','Rakowiec','2015-02-18','2021-08-01',0),(107,'Manou','Viva Manou Malaika','Blank','2014-12-25','2021-08-01',0),(108,'Tilaj','','Kovács','2015-03-15','2021-08-01',0),(110,'Jasmin','Nicole','Ahrens','1980-08-20',NULL,0),(111,'Asal','','Akhavan Abdollahian','1980-08-20',NULL,0),(112,'Swantje','','Ammoneit','1980-08-20',NULL,0),(113,'Michael','','Augustin','1980-08-20',NULL,0),(114,'Vasi','Vasilios','Avgoustakis','1980-08-20',NULL,0),(115,'Esan','Esanullah ','Azizi ','1980-08-20',NULL,0),(116,'Daniel','Daniel Joseph','Bar-Gil','1980-08-20',NULL,0),(117,'Emily','','Barnickel','1980-08-20',NULL,0),(118,'Lars','','Barnickel','1980-08-20',NULL,0),(119,'Dani','Daniela','Bellm','1980-08-20',NULL,0),(120,'Jacobo','','Bertacco','1980-08-20',NULL,0),(121,'Conny','Cornelia','Beyer','1980-08-20',NULL,0),(122,'Muriel','','Biedrzycki','1980-08-20',NULL,0),(123,'Bastian','','Bienlein','1980-08-20',NULL,0),(124,'Yvonne','','Birkefeld','1980-08-20',NULL,0),(125,'Julia','','Birker','1980-08-20',NULL,0),(126,'Philip','','Blank','1980-08-20',NULL,0),(127,'Doris','','Böker','1980-08-20',NULL,0),(128,'Anne','','Bolick','1980-08-20',NULL,0),(129,'Lisa','Elisabeth','Brendle','1980-08-20',NULL,0),(130,'Tine','Christine','Breuer','1980-08-20',NULL,0),(131,'Gisela','','Broßmer','1980-08-20',NULL,0),(132,'Jan','','Burkamp','1980-08-20',NULL,0),(133,'Maria','Maria Cynthia','Canosa Calderón','1980-08-20',NULL,0),(134,'Magali','','Chastaing','1980-08-20',NULL,0),(135,'Silke','','Chorus','1980-08-20',NULL,0),(136,'George','Circis','Çiçek','1980-08-20',NULL,0),(137,'Guissella','Irma Guissella','Cornejo Luján','1980-08-20',NULL,0),(138,'Pietro','','Cucinotta','1980-08-20',NULL,0),(139,'Vega','Vera','Damm','1980-08-20',NULL,0),(140,'Isa','Isabelle Hélène Aurélia','Devise','1980-08-20',NULL,0),(141,'Nikolaus','','Dietrich','1980-08-20',NULL,0),(142,'Julius','','Dörner','1980-08-20',NULL,0),(143,'Danit','','Dottan','1980-08-20',NULL,0),(144,'Christiane','','Duwe','1980-08-20',NULL,0),(145,'Willi','','Effenberger','1980-08-20',NULL,0),(146,'Jan','','Ehret','1980-08-20',NULL,0),(147,'Tobias','','Euler','1980-08-20',NULL,0),(148,'Jana','','Fischer','1980-08-20',NULL,0),(149,'Nora','Nora Elsie','Fischer','1980-08-20',NULL,0),(150,'Katja','','Frenz','1980-08-20',NULL,0),(151,'Bea','Beatrice','Fröhlich','1980-08-20',NULL,0),(152,'Nadine','','Fröhlich','1980-08-20',NULL,0),(153,'Melina','','Gerstemann','1980-08-20',NULL,0),(154,'Sarah','Sarah Jane','Giarmoleo','1980-08-20',NULL,0),(155,'Michael','','Golücke','1980-08-20',NULL,0),(156,'Juliane','','Graf','1980-08-20',NULL,0),(157,'Greg','Paul','Gregory','1980-08-20',NULL,0),(158,'Judy','Judith','Guntermann','1980-08-20',NULL,0),(159,'Anne','','Hackert','1980-08-20',NULL,0),(160,'Werner','','Hackert','1980-08-20',NULL,0),(161,'Michel','Jörg Michael','Hackert','1980-08-20',NULL,0),(162,'Epona','','Hamdam','1980-08-20',NULL,0),(163,'Lia','','Harder-Pavlidis','1980-08-20',NULL,0),(164,'Carsten','','Harner','1980-08-20',NULL,0),(165,'Katharina','','Häseli','1980-08-20',NULL,0),(166,'Thomas','Thomas Markus','Häseli','1980-08-20',NULL,0),(167,'Laura','','Haßler','1980-08-20',NULL,0),(168,'Jana','','Heilmann','1980-08-20',NULL,0),(169,'Johnny','Johnny Tore','Hellqvist','1980-08-20',NULL,0),(170,'Hiéu','Hiéu Dúc','Hoàng','1980-08-20',NULL,0),(171,'Ela','Manuela','Hofmann','1980-08-20',NULL,0),(172,'Tim','','Hollingsworth','1980-08-20',NULL,0),(173,'Jason','Jason Paul','Honea','1980-08-20',NULL,0),(174,'Tilman','','Hopf','1980-08-20',NULL,0),(175,'Jacho','Joachim','Horns','1980-08-20',NULL,0),(176,'Mone','Monika','Humienna','1980-08-20',NULL,0),(177,'Luigi','','Huober','1980-08-20',NULL,0),(178,'Jonas','','Hütten','1980-08-20',NULL,0),(179,'Rami','','Id','1980-08-20',NULL,0),(180,'Ana','','Janeva','1980-08-20',NULL,0),(181,'Susan','','Kade','1980-08-20',NULL,0),(182,'Torsten','','Kade','1980-08-20',NULL,0),(183,'Florian','','Kappeler','1980-08-20',NULL,0),(184,'Alexander','','Kasten','1980-08-20',NULL,0),(185,'Christoph','','Kendzia','1980-08-20',NULL,0),(186,'Angele','Angele Florence','Kengne','1980-08-20',NULL,0),(187,'Hadi','','Khanjanpour','1980-08-20',NULL,0),(188,'Timo','','Kiesel','1980-08-20',NULL,0),(189,'Sarah','','Kindermann','1980-08-20',NULL,1),(190,'Thomas','','Knapp','1980-08-20',NULL,0),(191,'Patricia','','Koelle-Schneider','1980-08-20',NULL,0),(192,'Dieter','Paul Dieter','König','1980-08-20',NULL,0),(193,'Karin','Katharina','König','1980-08-20',NULL,0),(194,'Ingo','','König','1980-08-20',NULL,0),(195,'Luigi','Ludovit','Kovács','1980-08-20',NULL,0),(196,'Sascha','','Kranz','1980-08-20',NULL,0),(197,'Ulrich','','Krönke','1980-08-20',NULL,0),(198,'Chris','Christoph','Krönke','1980-08-20',NULL,0),(199,'Klaas','','Kühn','1980-08-20',NULL,0),(200,'Michael','','Kupfer','1980-08-20',NULL,0),(201,'Rufus','','Lane','1980-08-20',NULL,0),(202,'Ronja','Ronja Maria','Lange','1980-08-20',NULL,0),(203,'Aljona','','Lazanowski','1980-08-20',NULL,0),(204,'Natalia','','Lazarashvili','1980-08-20',NULL,0),(205,'Diana','','Legel','1980-08-20',NULL,0),(206,'Julia','','Leinweber','1980-08-20',NULL,0),(207,'Rieke','Friederike','Lerch','1980-08-20',NULL,0),(208,'Nadine','Nadine Elisabeth','Lockey','1980-08-20',NULL,0),(209,'Luz','','Lomeli','1980-08-20',NULL,0),(210,'Nele','','Lützen','1980-08-20',NULL,0),(211,'Karen','','Markert','1980-08-20',NULL,0),(212,'Robert','','Maruschke','1980-08-20',NULL,0),(213,'Elektra','Elektra-Timea','Maschopoulou','1980-08-20',NULL,0),(214,'Mareike','','Mayer','1980-08-20',NULL,0),(215,'Josi','Josiane','Mbede','1980-08-20',NULL,0),(216,'Nanke','','Meems','1980-08-20',NULL,0),(217,'Zeppy','Josef','Meems','1980-08-20',NULL,0),(218,'Kathrin','','Merz','1980-08-20',NULL,0),(219,'Sid','Roland','Meyer','1980-08-20',NULL,0),(220,'Stefan','','Monk','1980-08-20',NULL,0),(221,'Asif','','Muhammad','1980-08-20',NULL,0),(222,'Atti','Anja','Mülders','1980-08-20',NULL,0),(223,'Anne-Barbara','','Müller','1980-08-20',NULL,0),(224,'Tina','Martina','Müller','1980-08-20',NULL,0),(225,'Ronél','','Naikingar','1980-08-20',NULL,0),(226,'Jasper','','Nicolaisen','1980-08-20',NULL,0),(227,'Lukas','','Nicolaisen','1980-08-20',NULL,0),(228,'Sonia','','Noya','1980-08-20',NULL,0),(229,'Irene','','Pabst','1980-08-20',NULL,0),(230,'Benjamin','','Pavlidis','1980-08-20',NULL,0),(231,'Lola ','','Péjac','1980-08-20',NULL,0),(232,'Jörg','','Petzold','1980-08-20',NULL,0),(233,'Katy','','Peuschel','1980-08-20',NULL,0),(234,'Linzy','','Pierre','1980-08-20',NULL,0),(235,'Daria','','Popova','1980-08-20',NULL,0),(236,'Stephan','','Posé','1980-08-20',NULL,0),(237,'Letti','Lettilee','Powell','1980-08-20',NULL,0),(238,'Paul','','Predatsch','1980-08-20',NULL,0),(239,'Ve','','Preßer','1980-08-20',NULL,0),(240,'Jan','Hans Jan','Puchstein','1980-08-20',NULL,0),(241,'Cordula','','Putzki','1980-08-20',NULL,0),(242,'Dora','','Ragusa','1980-08-20',NULL,0),(243,'Agi','Agnieszka','Rakowiec','1980-08-20',NULL,0),(244,'Lukas','','Reblitz','1980-08-20',NULL,0),(245,'Franziska','','Reinemann','1980-08-20',NULL,0),(246,'Arif','Felix Arif','Rhein','1980-08-20',NULL,0),(247,'Carolina','','Rihs','1980-08-20',NULL,0),(248,'Oliver','','Rihs','1980-08-20',NULL,0),(249,'Elisa','','Ring','1980-08-20',NULL,0),(250,'Johanna','','Rödiger','1980-08-20',NULL,0),(251,'Jennifer','','Rohleder','1980-08-20',NULL,0),(252,'Ami','Artemis','Roumpou','1980-08-20',NULL,0),(253,'Azam','','Safaei','1980-08-20',NULL,0),(254,'Daniel','','Schmidt','1980-08-20',NULL,0),(255,'Eva','','Schmidt-Rohr','1980-08-20',NULL,0),(256,'Rouven','','Schmitt','1980-08-20',NULL,0),(257,'Sophie','','Scholz','1980-08-20',NULL,0),(258,'Erwin','Erwin Christoph','Schönthaler','1980-08-20',NULL,0),(259,'Ralf','','Schröder','1980-08-20',NULL,0),(260,'Olli','','Schulhof','1980-08-20',NULL,0),(261,'Thorsten','','Schulz','1980-08-20',NULL,0),(262,'Katrin','','Schumann','1980-08-20',NULL,0),(263,'Almut','','Schwacke','1980-08-20',NULL,0),(264,'Babak','','Sharifi','1980-08-20',NULL,0),(265,'Schlomo','Christian','Siebart','1980-08-20',NULL,0),(266,'Mattes','Matthias','Sieg','1980-08-20',NULL,0),(267,'Peter','','Skutta','1980-08-20',NULL,0),(268,'Katharina','','Smolorz','1980-08-20',NULL,0),(269,'Nele','Nele Florentine','Sorg','1980-08-20',NULL,0),(270,'Uli','Ulrich','Stelzner','1980-08-20',NULL,0),(271,'Martin','','Stief','1980-08-20',NULL,0),(272,'Philipp','Philipp Pascal ','Strohm','1980-08-20',NULL,0),(273,'Sarah','','Strohm','1980-08-20',NULL,0),(274,'Tinita','Bettina','Süveges','1980-08-20',NULL,0),(275,'June','','Tempel','1980-08-20',NULL,0),(276,'Mo','Moritz','Thorbecke','1980-08-20',NULL,0),(277,'Wolfgang','','Tillmans','1980-08-20',NULL,0),(278,'Tam','Tam-Anh','Tran','1980-08-20',NULL,0),(279,'Aylin','','Turgay','1980-08-20',NULL,0),(280,'Kaja','','Urbach','1980-08-20',NULL,0),(281,'Nicola','','Urbach','1980-08-20',NULL,0),(282,'Hannah','','Utschak','1980-08-20',NULL,0),(283,'Wolf-Dieter','','Utschak','1980-08-20',NULL,0),(284,'Georgi','','Vasilev','1980-08-20',NULL,0),(285,'Vesela','','Vasileva','1980-08-20',NULL,0),(286,'Dagmar','','Volz','1980-08-20',NULL,0),(287,'Kassian','','von Glahn','1980-08-20',NULL,0),(288,'Denise','','Voß','1980-08-20',NULL,0),(289,'Anthony','','Vouardoux','1980-08-20',NULL,0),(290,'Kostas','Konstantinos','Voulgaris','1980-08-20',NULL,0),(291,'Ulrich','Ulrich Michel','Wegner','1980-08-20',NULL,0),(292,'Sara','','Weippert','1980-08-20',NULL,0),(293,'Sina','Sina Elsa Simone','Weippert','1980-08-20',NULL,0),(294,'Oliver','','Wendland','1980-08-20',NULL,0),(295,'André','','Wittig','1980-08-20',NULL,0),(296,'Benjamin','','Wolff','1980-08-20',NULL,0),(297,'Leonie','Anna-Leonie','Wolfrum','1980-08-20',NULL,0),(298,'Jens','','Zerrath','1980-08-20',NULL,0),(299,'Andreas','','','1980-08-20',NULL,0);
/*!40000 ALTER TABLE `personen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `taetigkeit`
--

DROP TABLE IF EXISTS `taetigkeit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `taetigkeit` (
  `person_id` int NOT NULL,
  `taetigkeit_beginn` date DEFAULT NULL,
  `taetigkeit_ende` date DEFAULT NULL,
  `typ` enum('Freiwilligendienst','Ehrenamt','Praktikum','Honorartaetigkeit','extern','Kollektiv','Arbeitsverhaeltniss') DEFAULT NULL,
  `taetigkeit` enum('Lehrkraefte mit Unterrichtsbefaehigung','Lehrkraefte ohne Unterrichtsbefaehigung','Sonstige Lehrkraft','Paedagogische Fachkraefte eFoeB','Sonstige paedagogische Kraft Ganztag','Verwaltungskraft','Kuechenkraft','Kuechenhilfe','Reinigungskraft','Hausmeister*in','Schulhilfe') DEFAULT NULL,
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
