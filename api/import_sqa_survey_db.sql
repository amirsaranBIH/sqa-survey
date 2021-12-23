-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.27 - MySQL Community Server - GPL
-- Server OS:                    Linux
-- HeidiSQL Version:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for sqa_survey_app
CREATE DATABASE IF NOT EXISTS `sqa_survey_app` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `sqa_survey_app`;

-- Dumping structure for table sqa_survey_app.surveys
CREATE TABLE IF NOT EXISTS `surveys` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(500) NOT NULL DEFAULT '0',
  `uuid` varchar(100) NOT NULL DEFAULT '0',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table sqa_survey_app.survey_answers
CREATE TABLE IF NOT EXISTS `survey_answers` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `surveySubmission` int unsigned NOT NULL DEFAULT '0',
  `questionId` int unsigned NOT NULL DEFAULT '0',
  `answer` text NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `FK_surveySubmission__survey_submissions_id` (`surveySubmission`),
  KEY `FK_questionId__survey_questions_id` (`questionId`),
  CONSTRAINT `FK_questionId__survey_questions_id` FOREIGN KEY (`questionId`) REFERENCES `survey_questions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_surveySubmission__survey_submissions_id` FOREIGN KEY (`surveySubmission`) REFERENCES `survey_submissions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table sqa_survey_app.survey_questions
CREATE TABLE IF NOT EXISTS `survey_questions` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `surveyId` int unsigned NOT NULL DEFAULT '0',
  `question` varchar(500) NOT NULL DEFAULT '0',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `FK_surveyId__surveys_id` (`surveyId`),
  CONSTRAINT `FK_surveyId__surveys_id` FOREIGN KEY (`surveyId`) REFERENCES `surveys` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table sqa_survey_app.survey_submissions
CREATE TABLE IF NOT EXISTS `survey_submissions` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `surveyId` int unsigned NOT NULL DEFAULT '0',
  `ipv4` varchar(100) NOT NULL DEFAULT '0',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ipv4` (`ipv4`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table sqa_survey_app.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(320) NOT NULL DEFAULT '0',
  `password` varchar(64) NOT NULL DEFAULT '0',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
