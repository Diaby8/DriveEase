CREATE DATABASE  IF NOT EXISTS `car_rental` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `car_rental`;
-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: car_rental
-- ------------------------------------------------------
-- Server version	9.1.0

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
-- Table structure for table `administrators`
--

DROP TABLE IF EXISTS `administrators`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administrators` (
  `EMAIL_ADMIN` varchar(100) NOT NULL,
  `PASSWORD_ADMIN` varchar(50) NOT NULL,
  `FIRST_NAME_ADMIN` varchar(50) NOT NULL,
  `LAST_NAME_ADMIN` varchar(50) NOT NULL,
  PRIMARY KEY (`EMAIL_ADMIN`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrators`
--

LOCK TABLES `administrators` WRITE;
/*!40000 ALTER TABLE `administrators` DISABLE KEYS */;
INSERT INTO `administrators` VALUES ('anys.hadjidj@efrei.net','AnysEfrei2025','Anys','Hadjidj'),('diaby.diakite@efrei.net','DiabyEfrei2025','Diaby','Diakite'),('mina.belmokhtar@efrei.net','MinaEfrei2025','Mina','Belmokhtar'),('venuka.dias-sucharitharatne@efrei.net','VenukaEfrei2025','Venuka','Dias'),('zainab.amalal@efrei.net','ZainabEfrei2025','Zainab','Amalal');
/*!40000 ALTER TABLE `administrators` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `agencies`
--

DROP TABLE IF EXISTS `agencies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agencies` (
  `ID_AGENCY` int NOT NULL AUTO_INCREMENT,
  `CITY_AGENCY` varchar(50) NOT NULL,
  `ADRESS_AGENCY` varchar(200) NOT NULL,
  `PHONE_AGENCY` varchar(50) NOT NULL,
  `EMAIL_AGENCY` varchar(100) NOT NULL,
  PRIMARY KEY (`ID_AGENCY`),
  UNIQUE KEY `EMAIL_AGENCY` (`EMAIL_AGENCY`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agencies`
--

LOCK TABLES `agencies` WRITE;
/*!40000 ALTER TABLE `agencies` DISABLE KEYS */;
INSERT INTO `agencies` VALUES (1,'Paris','10 Rue de Rivoli, 75001 Paris','01 23 45 67 89','paris@driveease.com'),(2,'Marseille','5 Boulevard Longchamp, 13001 Marseille','04 91 22 33 44','marseille@driveease.com'),(3,'Lyon','15 Avenue des Champs, 69001 Lyon','04 56 78 90 12','lyon@driveease.com');
/*!40000 ALTER TABLE `agencies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cars`
--

DROP TABLE IF EXISTS `cars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cars` (
  `BRAND` varchar(50) NOT NULL,
  `MODEL` varchar(100) NOT NULL,
  `FUEL` varchar(50) NOT NULL,
  `TRANSMISSION` varchar(50) NOT NULL,
  `COLOR` varchar(50) NOT NULL,
  `PRICE_DAY` float NOT NULL,
  `IMAGE_URL` varchar(200) NOT NULL,
  `TYPE_CARS` varchar(50) NOT NULL,
  `IMMATRICULATION` varchar(50) NOT NULL,
  `CURRENT_LOCATION` int NOT NULL,
  `DEPOSIT_CAR` float NOT NULL,
  PRIMARY KEY (`IMMATRICULATION`),
  KEY `CURRENT_LOCATION` (`CURRENT_LOCATION`),
  CONSTRAINT `cars_ibfk_1` FOREIGN KEY (`CURRENT_LOCATION`) REFERENCES `agencies` (`ID_AGENCY`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cars`
--

LOCK TABLES `cars` WRITE;
/*!40000 ALTER TABLE `cars` DISABLE KEYS */;
INSERT INTO `cars` VALUES ('Renault','Capture','PETROL','MANUAL','WHITE',60,'/images/cars/Renault_Capture_White.jpg','CROSSOVER','AD-124-YI',2,1500),('Renault','Clio','DIESEL','MANUAL','BLACK',40,'/images/cars/Renault_Clio_Black.jpg','CITYCAR','AT-020-HV',2,1500),('Renault','Clio','DIESEL','MANUAL','BLACK',40,'/images/cars/Renault_Clio_Black.jpg','CITYCAR','CU-883-UY',1,1500),('Renault','Clio','PETROL','AUTOMATIC','BLUE',50,'/images/cars/Renault_Clio_Blue.jpg','CITYCAR','DS-703-GF',2,1500),('Mercedes','A45S','PETROL','AUTOMATIC','GREY',300,'/images/cars/Mercedes_A45S_Grey.jpg','LUXURY','DW-904-FL',2,5000),('Peugeot','3008','DIESEL','MANUAL','GREY',60,'/images/cars/Peugeot_3008_Grey.jpg','SUV','DY-176-FL',1,1800),('Peugeot','3008','DIESEL','MANUAL','GREY',60,'/images/cars/Peugeot_3008_Grey.jpg','SUV','HB-690-KM',2,1800),('Mercedes','A45S','PETROL','AUTOMATIC','YELLOW',300,'/images/cars/Mercedes_A45S_Yellow.jpg','LUXURY','HG-341-NB',1,5000),('Peugeot','208','DIESEL','MANUAL','BLACK',40,'/images/cars/Peugeot_208_Black.jpg','CITYCAR','JJ-953-TW',2,1500),('Audi','RS3','PETROL','AUTOMATIC','BLACK',300,'/images/cars/Audi_RS3_Black.jpg','LUXURY','KP-217-ZD',1,5000),('Mercedes','A45S','PETROL','AUTOMATIC','GREY',300,'/images/cars/Mercedes_A45S_Grey.jpg','LUXURY','LR-728-TY',1,5000),('Audi','RS3','PETROL','AUTOMATIC','GREY',300,'/images/cars/Audi_RS3_Grey.jpg','LUXURY','MN-453-BL',1,5000),('Peugeot','208','PETROL','AUTOMATIC','WHITE',50,'/images/cars/Peugeot_208_White.jpg','CITYCAR','PL-482-ZX',2,1500),('Mercedes','A45S','PETROL','AUTOMATIC','YELLOW',300,'/images/cars/Mercedes_A45S_Yellow.jpg','LUXURY','PM-687-ZR',3,5000),('Peugeot','3008','PETROL','AUTOMATIC','GREY',70,'/images/cars/Peugeot_3008_Grey.jpg','SUV','QK-754-ER',1,1800),('Renault','Capture','PETROL','MANUAL','WHITE',60,'/images/cars/Renault_Capture_White.jpg','CROSSOVER','QV-310-UW',1,1500),('Audi','RS6','PETROL','AUTOMATIC','BLACK',600,'/images/cars/Audi_RS6_Black.jpg','LUXURY','QZ-015-KL',3,8000),('Peugeot','3008','PETROL','AUTOMATIC','GREY',70,'/images/cars/Peugeot_3008_Grey.jpg','SUV','RJ-874-NT',3,1800),('Audi','RS3','PETROL','AUTOMATIC','GREY',300,'/images/cars/Audi_RS3_Grey.jpg','LUXURY','TD-580-XJ',2,5000),('Peugeot','208','DIESEL','MANUAL','WHITE',40,'/images/cars/Peugeot_208_White.jpg','CITYCAR','US-123-ZY',1,1500),('Peugeot','3008','PETROL','AUTOMATIC','GREY',70,'/images/cars/Peugeot_3008_Grey.jpg','SUV','VG-341-PW',2,1800),('Audi','RS6','PETROL','AUTOMATIC','BLACK',600,'/images/cars/Audi_RS6_Black.jpg','LUXURY','VN-437-JX',2,8000),('Renault','Clio','PETROL','AUTOMATIC','BLACK',50,'/images/cars/Renault_Clio_Black.jpg','CITYCAR','XE-974-KL',1,1500),('Audi','RS3','PETROL','AUTOMATIC','GREY',300,'/images/cars/Audi_RS3_Grey.jpg','LUXURY','XR-273-WV',3,5000),('Peugeot','208','PETROL','AUTOMATIC','GREEN',50,'/images/cars/Peugeot_208_Green.jpg','CITYCAR','XT-923-YH',3,1500),('Renault','Clio','PETROL','AUTOMATIC','BLUE',50,'/images/cars/Renault_Clio_Blue.jpg','CITYCAR','XX-224-KU',3,1500),('Audi','RS6','PETROL','AUTOMATIC','BLACK',600,'/images/cars/Audi_RS6_Black.jpg','LUXURY','YT-689-PL',1,8000),('Peugeot','208','PETROL','AUTOMATIC','BLACK',50,'/images/cars/Peugeot_208_Black.jpg','CITYCAR','ZS-852-HE',1,1500);
/*!40000 ALTER TABLE `cars` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clients` (
  `EMAIL_CLIENT` varchar(100) NOT NULL,
  `FIRST_NAME_CLIENT` varchar(50) NOT NULL,
  `LAST_NAME_CLIENT` varchar(50) NOT NULL,
  `PHONE_CLIENT` varchar(50) NOT NULL,
  `PASSWORD_CLIENT` varchar(255) NOT NULL,
  `ADDRESS_CLIENT` varchar(255) NOT NULL,
  PRIMARY KEY (`EMAIL_CLIENT`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contracts`
--

DROP TABLE IF EXISTS `contracts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contracts` (
  `ID_CONTRACT` int NOT NULL AUTO_INCREMENT,
  `CLIENT_EMAIL` varchar(100) NOT NULL,
  `CAR_IMMATRICULATION` varchar(50) NOT NULL,
  `PICKUP_AGENCY_ID` int NOT NULL,
  `RETURN_AGENCY_ID` int NOT NULL,
  `PICKUP_DATE` date NOT NULL,
  `RETURN_DATE` date NOT NULL,
  `TOTAL_PRICE` float NOT NULL,
  `CREATED_AT` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID_CONTRACT`),
  KEY `CLIENT_EMAIL` (`CLIENT_EMAIL`),
  KEY `CAR_IMMATRICULATION` (`CAR_IMMATRICULATION`),
  KEY `PICKUP_AGENCY_ID` (`PICKUP_AGENCY_ID`),
  KEY `RETURN_AGENCY_ID` (`RETURN_AGENCY_ID`),
  CONSTRAINT `contracts_ibfk_1` FOREIGN KEY (`CLIENT_EMAIL`) REFERENCES `clients` (`EMAIL_CLIENT`),
  CONSTRAINT `contracts_ibfk_2` FOREIGN KEY (`CAR_IMMATRICULATION`) REFERENCES `cars` (`IMMATRICULATION`),
  CONSTRAINT `contracts_ibfk_3` FOREIGN KEY (`PICKUP_AGENCY_ID`) REFERENCES `agencies` (`ID_AGENCY`),
  CONSTRAINT `contracts_ibfk_4` FOREIGN KEY (`RETURN_AGENCY_ID`) REFERENCES `agencies` (`ID_AGENCY`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contracts`
--

LOCK TABLES `contracts` WRITE;
/*!40000 ALTER TABLE `contracts` DISABLE KEYS */;
/*!40000 ALTER TABLE `contracts` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-05 16:07:57
