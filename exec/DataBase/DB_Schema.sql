-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema a504
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema a504
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `a504` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `a504` ;

-- -----------------------------------------------------
-- Table `a504`.`studies`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `a504`.`studies` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME(6) NOT NULL,
  `updated_at` DATETIME(6) NOT NULL,
  `expiration_date` DATE NOT NULL,
  `hashtag_codes` VARCHAR(5),
  `is_onair` BIT(1) NULL DEFAULT FALSE,
  `member_capacity` INT NOT NULL,
  `notice` VARCHAR(1500) NOT NULL,
  `session_id` VARCHAR(100) NULL DEFAULT NULL,
  `status` VARCHAR(15) NOT NULL,
  `title` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `a504`.`meetings`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `a504`.`meetings` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_date` DATETIME(6) NOT NULL,
  `ended_at` DATETIME(6),
  `study_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK8myegch6at8tnnswu2obfc2uu` (`study_id` ASC) VISIBLE,
  CONSTRAINT `FK8myegch6at8tnnswu2obfc2uu`
    FOREIGN KEY (`study_id`)
    REFERENCES `a504`.`studies` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `a504`.`members`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `a504`.`members` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME(6) NOT NULL,
  `updated_at` DATETIME(6) NOT NULL,
  `identifier` VARCHAR(50) NOT NULL,
  `is_passed` BIT(1) NOT NULL DEFAULT FALSE,
  `member_name` VARCHAR(20) NULL DEFAULT NULL,
  `nickname` VARCHAR(20) NULL DEFAULT NULL,
  `password` VARCHAR(100) NOT NULL,
  `refresh_token` VARCHAR(200) NULL DEFAULT NULL,
  `role` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `a504`.`analysis_data`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `a504`.`analysis_data` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME(6) NOT NULL,
  `updated_at` DATETIME(6) NOT NULL,
  `time` INT NOT NULL,
  `interviewee` INT NOT NULL,
  `meeting_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FKlhgq7gltfeoo91bm92guonvkg` (`interviewee` ASC) VISIBLE,
  INDEX `FKk59q6l1r0v641gckc3scmbctm` (`meeting_id` ASC) VISIBLE,
  CONSTRAINT `FKk59q6l1r0v641gckc3scmbctm`
    FOREIGN KEY (`meeting_id`)
    REFERENCES `a504`.`meetings` (`id`),
  CONSTRAINT `FKlhgq7gltfeoo91bm92guonvkg`
    FOREIGN KEY (`interviewee`)
    REFERENCES `a504`.`members` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `a504`.`emotions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `a504`.`emotions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `count` INT NOT NULL,
  `real_analyzed_time` INT NOT NULL,
  `type` VARCHAR(255) NOT NULL,
  `data_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK72dvrwr3594y5n5608i8hnrfo` (`data_id` ASC) VISIBLE,
  CONSTRAINT `FK72dvrwr3594y5n5608i8hnrfo`
    FOREIGN KEY (`data_id`)
    REFERENCES `a504`.`analysis_data` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `a504`.`feedbacks`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `a504`.`feedbacks` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME(6) NOT NULL,
  `updated_at` DATETIME(6) NOT NULL,
  `interviewee` INT NOT NULL,
  `interviewer` INT NOT NULL,
  `meeting_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK5tdivh2n2u7ooh1fimxmffwgd` (`interviewee` ASC) VISIBLE,
  INDEX `FK67e626l741pol30m03yvxaco6` (`interviewer` ASC) VISIBLE,
  INDEX `FK28rfqyorvx4n38h7rfgmvql6s` (`meeting_id` ASC) VISIBLE,
  CONSTRAINT `FK28rfqyorvx4n38h7rfgmvql6s`
    FOREIGN KEY (`meeting_id`)
    REFERENCES `a504`.`meetings` (`id`),
  CONSTRAINT `FK5tdivh2n2u7ooh1fimxmffwgd`
    FOREIGN KEY (`interviewee`)
    REFERENCES `a504`.`members` (`id`),
  CONSTRAINT `FK67e626l741pol30m03yvxaco6`
    FOREIGN KEY (`interviewer`)
    REFERENCES `a504`.`members` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `a504`.`feedback_contents`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `a504`.`feedback_contents` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `answer` VARCHAR(500) NOT NULL,
  `number` INT NOT NULL,
  `question` VARCHAR(250) NOT NULL,
  `type` VARCHAR(15) NOT NULL,
  `feedback_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FKgor2movg3fdi00bf9t8vsty5y` (`feedback_id` ASC) VISIBLE,
  CONSTRAINT `FKgor2movg3fdi00bf9t8vsty5y`
    FOREIGN KEY (`feedback_id`)
    REFERENCES `a504`.`feedbacks` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `a504`.`feeds`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `a504`.`feeds` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME(6) NOT NULL,
  `updated_at` DATETIME(6) NOT NULL,
  `contents` VARCHAR(200) NOT NULL,
  `is_deleted` BIT(1) NOT NULL,
  `parent_id` INT DEFAULT 0,
  `study_id` INT NOT NULL,
  `member_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FKkpnydpgu005tyyvqq7kj308qx` (`parent_id` ASC) VISIBLE,
  INDEX `FKorfrn53524sy26opri8eje4xn` (`study_id` ASC) VISIBLE,
  INDEX `FK4itbxlri5qb3cymon3tlqhb3h` (`member_id` ASC) VISIBLE,
  CONSTRAINT `FK4itbxlri5qb3cymon3tlqhb3h`
    FOREIGN KEY (`member_id`)
    REFERENCES `a504`.`members` (`id`),
  CONSTRAINT `FKkpnydpgu005tyyvqq7kj308qx`
    FOREIGN KEY (`parent_id`)
    REFERENCES `a504`.`feeds` (`id`),
  CONSTRAINT `FKorfrn53524sy26opri8eje4xn`
    FOREIGN KEY (`study_id`)
    REFERENCES `a504`.`studies` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `a504`.`hashtags`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `a504`.`hashtags` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(1) NOT NULL,
  `name` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `a504`.`inquiries`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `a504`.`inquiries` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME(6) NOT NULL,
  `updated_at` DATETIME(6) NOT NULL,
  `contents` VARCHAR(200) NOT NULL,
  `is_deleted` BIT(1) NOT NULL,
  `parent_id` INT DEFAULT 0,
  `study_id` INT NOT NULL,
  `member_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FKgool88mcf1x0jon5s534a28ag` (`parent_id` ASC) VISIBLE,
  INDEX `FKcqc53u8w8gfplv2nijq1k7bi5` (`study_id` ASC) VISIBLE,
  INDEX `FKbu0nxcd71x327o77d8n8a4ffn` (`member_id` ASC) VISIBLE,
  CONSTRAINT `FKbu0nxcd71x327o77d8n8a4ffn`
    FOREIGN KEY (`member_id`)
    REFERENCES `a504`.`members` (`id`),
  CONSTRAINT `FKcqc53u8w8gfplv2nijq1k7bi5`
    FOREIGN KEY (`study_id`)
    REFERENCES `a504`.`studies` (`id`),
  CONSTRAINT `FKgool88mcf1x0jon5s534a28ag`
    FOREIGN KEY (`parent_id`)
    REFERENCES `a504`.`inquiries` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `a504`.`meeting_participants`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `a504`.`meeting_participants` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME(6) NOT NULL,
  `updated_at` DATETIME(6) NOT NULL,
  `meeting_id` INT NOT NULL,
  `member_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK7uds89kvog9etbdnn653vsf6y` (`meeting_id` ASC) VISIBLE,
  INDEX `FK9g97m1f64twfbvoc3dcwn82rr` (`member_id` ASC) VISIBLE,
  CONSTRAINT `FK7uds89kvog9etbdnn653vsf6y`
    FOREIGN KEY (`meeting_id`)
    REFERENCES `a504`.`meetings` (`id`),
  CONSTRAINT `FK9g97m1f64twfbvoc3dcwn82rr`
    FOREIGN KEY (`member_id`)
    REFERENCES `a504`.`members` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `a504`.`notification`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `a504`.`notification` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `content` VARCHAR(255) NULL DEFAULT NULL,
  `url` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `a504`.`oauth2_clients`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `a504`.`oauth2_clients` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME(6) NOT NULL,
  `updated_at` DATETIME(6) NOT NULL,
  `access_token` VARCHAR(300) NULL DEFAULT NULL,
  `client_registration_id` VARCHAR(30) NULL DEFAULT NULL,
  `principal_name` VARCHAR(50) NULL DEFAULT NULL,
  `refreshtoken` VARCHAR(300) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `a504`.`participants`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `a504`.`participants` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME(6) NOT NULL,
  `updated_at` DATETIME(6) NOT NULL,
  `is_leader` BIT(1) NOT NULL DEFAULT FALSE,
  `withdrawal` BIT(1) NOT NULL DEFAULT FALSE,
  `member_id` INT NOT NULL,
  `study_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FKpnd4mhdnqv8o2ewk21o59eam3` (`member_id` ASC) VISIBLE,
  INDEX `FKjmitckxtm1jjcmqnryw8asgrm` (`study_id` ASC) VISIBLE,
  CONSTRAINT `FKjmitckxtm1jjcmqnryw8asgrm`
    FOREIGN KEY (`study_id`)
    REFERENCES `a504`.`studies` (`id`),
  CONSTRAINT `FKpnd4mhdnqv8o2ewk21o59eam3`
    FOREIGN KEY (`member_id`)
    REFERENCES `a504`.`members` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `a504`.`postures`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `a504`.`postures` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `count` INT NOT NULL,
  `type` VARCHAR(255) NOT NULL,
  `data_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FKrwsj0nx9shdcjg0e4p1i66v4m` (`data_id` ASC) VISIBLE,
  CONSTRAINT `FKrwsj0nx9shdcjg0e4p1i66v4m`
    FOREIGN KEY (`data_id`)
    REFERENCES `a504`.`analysis_data` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

insert into a504.hashtags (id, code, name)
values
(1, '1', 'IT/인터넷'),
(2, '2', '경영/기획/컨설팅'),
(3, '3', '교육'),
(4, '4', '금융/재무'),
(5, '5', '디자인'),
(6, '6', '마케팅/시장조사'),
(7, '7', '미디어/홍보'),
(8, '8', '법률/법무'),
(9, '9', '생산관리/품질관리'),
(10, 'A', '서비스/고객지원'),
(11, 'B', '연구개발'),
(12, 'C', '영업/제휴'),
(13, 'D', '인사/총무'),
(14, 'E', '전문직');
