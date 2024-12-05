-- MySQL dump 10.13  Distrib 8.0.38, for macos14 (arm64)
--
-- Host: 127.0.0.1    Database: library
-- ------------------------------------------------------
-- Server version	9.0.1

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
-- Table structure for table `Books`
--

DROP TABLE IF EXISTS `Books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Books` (
  `item_id` int NOT NULL,
  `author_Fname` varchar(50) DEFAULT NULL,
  `author_Lname` varchar(50) DEFAULT NULL,
  `isbn` varchar(20) NOT NULL,
  PRIMARY KEY (`item_id`),
  CONSTRAINT `books_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `MediaItems` (`item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Books`
--

LOCK TABLES `Books` WRITE;
/*!40000 ALTER TABLE `Books` DISABLE KEYS */;
INSERT INTO `Books` VALUES (1,'Harper','Lee','9780061120084'),(2,'George','Orwell','9780451524935'),(3,'F. Scott','Fitzgerald','9780743273565'),(4,'Jane','Austen','9780141439518'),(5,'Herman','Melville','9781503280786'),(6,'Leo','Tolstoy','9781853260629'),(7,'J.D.','Salinger','9780316769488'),(8,'J.R.R.','Tolkien','9780261103573'),(9,'Fyodor','Dostoevsky','9780486454115'),(10,'Aldous','Huxley','9780060850529'),(11,'George','Orwell','9780452284234'),(12,'Emily','Brontë','9781851244413'),(13,'Charles','Dickens','9781853260353'),(14,'Victor','Hugo','9780451417911'),(15,'Charlotte','Brontë','9780142437209'),(16,NULL,'Dante','9780451208637'),(17,'William','Shakespeare','9780743477109'),(18,'Cormac','McCarthy','9780307387134'),(19,'Mary','Shelley','9780486282114'),(20,'Bram','Stoker','9780485132021'),(21,'Paulo','Coelho','9780061122415'),(22,'Markus','Zusak','9780375842207'),(23,'Suzanne','Collins','9780439023528'),(24,'Khaled','Hosseini','9781594480003'),(25,'Yann','Martel','9780156032213'),(26,'Gillian','Flynn','9780307588371'),(27,'George R.R.','Martin','9780553103540'),(28,'Rick','Riordan','9781423101463'),(29,'John','Green','9780525478188'),(30,'Stephen','King','9780385121675');
/*!40000 ALTER TABLE `Books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Borrows`
--

DROP TABLE IF EXISTS `Borrows`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Borrows` (
  `borrow_id` int NOT NULL AUTO_INCREMENT,
  `lib_ID` int DEFAULT NULL,
  `item_id` int DEFAULT NULL,
  `checkout_emp_id` int DEFAULT NULL,
  `date_checkout` date NOT NULL,
  `date_due` date GENERATED ALWAYS AS ((`date_checkout` + interval 14 day)) STORED,
  `date_returned` date DEFAULT NULL,
  PRIMARY KEY (`borrow_id`),
  UNIQUE KEY `item_id` (`item_id`),
  KEY `lib_ID` (`lib_ID`),
  KEY `checkout_emp_id` (`checkout_emp_id`),
  CONSTRAINT `borrows_ibfk_1` FOREIGN KEY (`lib_ID`) REFERENCES `Members` (`lib_ID`),
  CONSTRAINT `borrows_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `MediaItems` (`item_id`),
  CONSTRAINT `borrows_ibfk_3` FOREIGN KEY (`checkout_emp_id`) REFERENCES `Employees` (`emp_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Borrows`
--

LOCK TABLES `Borrows` WRITE;
/*!40000 ALTER TABLE `Borrows` DISABLE KEYS */;
/*!40000 ALTER TABLE `Borrows` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CDs`
--

DROP TABLE IF EXISTS `CDs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CDs` (
  `item_id` int NOT NULL,
  `artist` varchar(100) DEFAULT NULL,
  `duration_minutes` int DEFAULT NULL,
  PRIMARY KEY (`item_id`),
  CONSTRAINT `cds_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `MediaItems` (`item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CDs`
--

LOCK TABLES `CDs` WRITE;
/*!40000 ALTER TABLE `CDs` DISABLE KEYS */;
INSERT INTO `CDs` VALUES (51,'Michael Jackson',42),(52,'Pink Floyd',43),(53,'The Beatles',47),(54,'AC/DC',42),(55,'Fleetwood Mac',39),(56,'Eagles',44),(57,'Adele',48),(58,'Taylor Swift',47),(59,'Bruce Springsteen',47),(60,'Norah Jones',45),(61,'Eminem',77),(62,'Taylor Swift',53),(63,'Prince',43),(64,'Beyoncé',46),(65,'Nirvana',42),(66,'Daft Punk',74),(67,'Pink Floyd',81),(68,'Adele',49),(69,'Taylor Swift',56),(70,'Elton John',76);
/*!40000 ALTER TABLE `CDs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DeviceReservations`
--

DROP TABLE IF EXISTS `DeviceReservations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `DeviceReservations` (
  `reservation_id` int NOT NULL AUTO_INCREMENT,
  `lib_ID` int DEFAULT NULL,
  `device_id` int DEFAULT NULL,
  `reservation_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `start_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  `status` enum('active','fulfilled','cancelled') DEFAULT 'active',
  PRIMARY KEY (`reservation_id`),
  KEY `lib_ID` (`lib_ID`),
  KEY `device_id` (`device_id`),
  CONSTRAINT `devicereservations_ibfk_1` FOREIGN KEY (`lib_ID`) REFERENCES `Members` (`lib_ID`),
  CONSTRAINT `devicereservations_ibfk_2` FOREIGN KEY (`device_id`) REFERENCES `Devices` (`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DeviceReservations`
--

LOCK TABLES `DeviceReservations` WRITE;
/*!40000 ALTER TABLE `DeviceReservations` DISABLE KEYS */;
/*!40000 ALTER TABLE `DeviceReservations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Devices`
--

DROP TABLE IF EXISTS `Devices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Devices` (
  `device_id` int NOT NULL AUTO_INCREMENT,
  `device_name` varchar(100) NOT NULL,
  `device_type` enum('computer','printer') NOT NULL,
  `status` enum('available','in use','maintenance') DEFAULT 'available',
  `location` varchar(100) DEFAULT NULL,
  `purchase_date` date DEFAULT NULL,
  `last_service_date` date DEFAULT NULL,
  `color` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`device_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Devices`
--

LOCK TABLES `Devices` WRITE;
/*!40000 ALTER TABLE `Devices` DISABLE KEYS */;
INSERT INTO `Devices` VALUES (1,'Printer A','printer','available','1st Floor','2022-03-15','2024-09-01',NULL),(2,'Printer B','printer','in use','2nd Floor','2023-01-10','2024-08-15',NULL),(3,'Printer C','printer','maintenance','3rd Floor','2021-07-22','2024-10-20',NULL),(4,'Computer 1','computer','available','Computer Lab 1','2020-11-03','2024-06-12',NULL),(5,'Computer 2','computer','in use','Computer Lab 1','2021-09-18','2024-07-14',NULL),(6,'Computer 3','computer','available','Computer Lab 2','2022-04-25','2024-05-20',NULL),(7,'Computer 4','computer','maintenance','Computer Lab 2','2023-02-17','2024-08-10',NULL),(8,'Computer 5','computer','available','Computer Lab 3','2021-12-01','2024-09-28',NULL);
/*!40000 ALTER TABLE `Devices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Employees`
--

DROP TABLE IF EXISTS `Employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Employees` (
  `emp_id` int NOT NULL AUTO_INCREMENT,
  `Fname` varchar(50) NOT NULL,
  `Lname` varchar(50) NOT NULL,
  `street` varchar(100) DEFAULT NULL,
  `town` varchar(50) DEFAULT NULL,
  `zip` varchar(10) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `salary` decimal(10,2) NOT NULL,
  PRIMARY KEY (`emp_id`),
  UNIQUE KEY `phone` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Employees`
--

LOCK TABLES `Employees` WRITE;
/*!40000 ALTER TABLE `Employees` DISABLE KEYS */;
INSERT INTO `Employees` VALUES (1,'Liam','Green','120 Redwood Dr','Springfield','12345','555-1112',46000.00),(2,'Charlotte','King','85 Lakeview Ave','Greenville','54321','555-2223',49000.00),(3,'Oliver','Perez','142 Maple Rd','Rivertown','67890','555-3334',47500.00),(4,'Amelia','Scott','210 Cedar St','Lakeside','45678','555-4445',50000.00),(5,'Lucas','Evans','17 Oak Ln','Greenville','54321','555-5556',52000.00);
/*!40000 ALTER TABLE `Employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MediaItems`
--

DROP TABLE IF EXISTS `MediaItems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `MediaItems` (
  `item_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `publish_year` int DEFAULT NULL,
  `genre` varchar(30) DEFAULT NULL,
  `is_available` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`item_id`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MediaItems`
--

LOCK TABLES `MediaItems` WRITE;
/*!40000 ALTER TABLE `MediaItems` DISABLE KEYS */;
INSERT INTO `MediaItems` VALUES (1,'To Kill a Mockingbird',1960,'Fiction',1),(2,'1984',1949,'Dystopian',1),(3,'The Great Gatsby',1925,'Classic',1),(4,'Pride and Prejudice',1813,'Romance',1),(5,'Moby Dick',1851,'Adventure',1),(6,'War and Peace',1869,'Historical Fiction',1),(7,'The Catcher in the Rye',1951,'Fiction',1),(8,'The Hobbit',1937,'Fantasy',1),(9,'Crime and Punishment',1866,'Philosophical',1),(10,'Brave New World',1932,'Dystopian',1),(11,'Animal Farm',1945,'Satire',1),(12,'Wuthering Heights',1847,'Gothic',1),(13,'Great Expectations',1861,'Classic',1),(14,'Les Misérables',1862,'Historical Fiction',1),(15,'Jane Eyre',1847,'Romance',1),(16,'The Divine Comedy',1320,'Epic',1),(17,'Hamlet',1603,'Tragedy',1),(18,'The Road',2006,'Post-apocalyptic',1),(19,'Frankenstein',1818,'Science Fiction',1),(20,'Dracula',1897,'Gothic',1),(21,'The Alchemist',1988,'Adventure',1),(22,'The Book Thief',2005,'Historical Fiction',1),(23,'The Hunger Games',2008,'Dystopian',1),(24,'The Kite Runner',2003,'Drama',1),(25,'Life of Pi',2001,'Adventure',1),(26,'Gone Girl',2012,'Thriller',1),(27,'A Game of Thrones',1996,'Fantasy',1),(28,'Percy Jackson: The Lightning Thief',2005,'Fantasy',1),(29,'The Fault in Our Stars',2012,'Romance',1),(30,'The Shining',1977,'Horror',1),(31,'The Godfather',1972,'Crime',1),(32,'The Dark Knight',2008,'Action',1),(33,'Pulp Fiction',1994,'Crime',1),(34,'The Shawshank Redemption',1994,'Drama',1),(35,'The Lord of the Rings: The Return of the King',2003,'Fantasy',1),(36,'Forrest Gump',1994,'Drama',1),(37,'Inception',2010,'Science Fiction',1),(38,'The Matrix',1999,'Science Fiction',1),(39,'Schindler’s List',1993,'Historical Drama',1),(40,'Avengers: Endgame',2019,'Action',1),(41,'Titanic',1997,'Romance',1),(42,'Jurassic Park',1993,'Adventure',1),(43,'Star Wars: A New Hope',1977,'Science Fiction',1),(44,'The Lion King',1994,'Animation',1),(45,'Interstellar',2014,'Science Fiction',1),(46,'The Social Network',2010,'Drama',1),(47,'Frozen',2013,'Animation',1),(48,'Parasite',2019,'Thriller',1),(49,'The Avengers',2012,'Action',1),(50,'Coco',2017,'Animation',1),(51,'Thriller',1982,'Pop',1),(52,'The Dark Side of the Moon',1973,'Rock',1),(53,'Abbey Road',1969,'Rock',1),(54,'Back in Black',1980,'Rock',1),(55,'Rumours',1977,'Rock',1),(56,'Hotel California',1976,'Rock',1),(57,'25',2015,'Pop',1),(58,'1989',2014,'Pop',1),(59,'Born in the U.S.A.',1984,'Rock',1),(60,'Come Away With Me',2002,'Jazz',1),(61,'The Eminem Show',2002,'Hip-Hop',1),(62,'Fearless',2008,'Country',1),(63,'Purple Rain',1984,'Pop',1),(64,'Lemonade',2016,'Pop',1),(65,'Nevermind',1991,'Rock',1),(66,'Random Access Memories',2013,'Electronic',1),(67,'The Wall',1979,'Rock',1),(68,'21',2011,'Pop',1),(69,'Reputation',2017,'Pop',1),(70,'Goodbye Yellow Brick Road',1973,'Rock',1);
/*!40000 ALTER TABLE `MediaItems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Members`
--

DROP TABLE IF EXISTS `Members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Members` (
  `lib_ID` int NOT NULL,
  `Fname` varchar(50) NOT NULL,
  `Lname` varchar(50) NOT NULL,
  `MI` char(1) DEFAULT NULL,
  `Phone` varchar(15) DEFAULT NULL,
  `DOB` date DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `street` varchar(100) DEFAULT NULL,
  `town` varchar(50) DEFAULT NULL,
  `zip` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`lib_ID`),
  UNIQUE KEY `Phone` (`Phone`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Members`
--

LOCK TABLES `Members` WRITE;
/*!40000 ALTER TABLE `Members` DISABLE KEYS */;
INSERT INTO `Members` VALUES (1,'John','Doe','A','555-1234','1990-02-15','johndoe@email.com','123 Maple St','Springfield','12345'),(2,'Jane','Smith','B','555-5678','1985-05-23','janesmith@email.com','456 Oak Ave','Greenville','54321'),(3,'Michael','Brown','C','555-8760','1992-08-08','michaelbrown@email.com','789 Pine Rd','Rivertown','67890'),(4,'Emily','Davis','L','555-2346','1998-11-12','emilydavis@email.com','101 Maple St','Springfield','12345'),(5,'Robert','Wilson','M','555-4320','1978-03-30','robertwilson@email.com','202 Birch Ln','Lakeside','45678'),(6,'Sophia','Martinez','J','555-8761','2001-07-15','sophiamartinez@email.com','303 Cedar Ct','Greenville','54321'),(7,'James','Lee','D','555-6543','1993-09-05','jameslee@email.com','404 Ash Dr','Rivertown','67890'),(8,'Isabella','White','E','555-2347','1996-12-11','isabellawhite@email.com','505 Elm St','Springfield','12345'),(9,'David','Clark','K','555-7891','1980-04-20','davidclark@email.com','606 Willow Blvd','Lakeside','45678'),(10,'Olivia','Lewis','F','555-4321','1999-10-01','olivialewis@email.com','707 Spruce Ln','Greenville','54321');
/*!40000 ALTER TABLE `Members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Videos`
--

DROP TABLE IF EXISTS `Videos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Videos` (
  `item_id` int NOT NULL,
  `director` varchar(100) DEFAULT NULL,
  `duration_minutes` int DEFAULT NULL,
  PRIMARY KEY (`item_id`),
  CONSTRAINT `videos_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `MediaItems` (`item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Videos`
--

LOCK TABLES `Videos` WRITE;
/*!40000 ALTER TABLE `Videos` DISABLE KEYS */;
INSERT INTO `Videos` VALUES (31,'Francis Ford Coppola',175),(32,'Christopher Nolan',152),(33,'Quentin Tarantino',154),(34,'Frank Darabont',142),(35,'Peter Jackson',201),(36,'Robert Zemeckis',142),(37,'Christopher Nolan',148),(38,'Lana Wachowski, Lilly Wachowski',136),(39,'Steven Spielberg',195),(40,'Anthony Russo, Joe Russo',181),(41,'James Cameron',195),(42,'Steven Spielberg',127),(43,'George Lucas',121),(44,'Roger Allers, Rob Minkoff',88),(45,'Christopher Nolan',169),(46,'David Fincher',120),(47,'Jennifer Lee, Chris Buck',102),(48,'Bong Joon-ho',132),(49,'Joss Whedon',143),(50,'Lee Unkrich',105);
/*!40000 ALTER TABLE `Videos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-02 15:31:33
