-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema transtun
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema transtun
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `transtun` DEFAULT CHARACTER SET utf8mb3 ;
USE `transtun` ;

-- -----------------------------------------------------
-- Table `transtun`.`transportation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `transtun`.`transportation` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(250) NOT NULL,
  `number` VARCHAR(45) NOT NULL,
  `capacity` INT NOT NULL,
  `type` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `transtun`.`trips`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `transtun`.`trips` (
  `idtrips` INT NOT NULL AUTO_INCREMENT,
  `departure` VARCHAR(45) NOT NULL,
  `destination` VARCHAR(45) NOT NULL,
  `date` DATETIME NOT NULL,
  `price` DECIMAL(4,3) NOT NULL,
  `transid` INT NOT NULL,
  PRIMARY KEY (`idtrips`),
  INDEX `transid_idx` (`transid` ASC) VISIBLE,
  CONSTRAINT `transid`
    FOREIGN KEY (`transid`)
    REFERENCES `transtun`.`transportation` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `transtun`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `transtun`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(45) NOT NULL,
  `isAdmin` TINYINT(1) NULL DEFAULT '0',
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `transtun`.`tickets`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `transtun`.`tickets` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user` INT NOT NULL,
  `status` SET('pending', 'confirmed', 'cancelled') NOT NULL DEFAULT 'pending',
  `tripid` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `user_idx` (`user` ASC) VISIBLE,
  INDEX `tripid_idx` (`tripid` ASC) VISIBLE,
  CONSTRAINT `tripid`
    FOREIGN KEY (`tripid`)
    REFERENCES `transtun`.`trips` (`idtrips`),
  CONSTRAINT `user`
    FOREIGN KEY (`user`)
    REFERENCES `transtun`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `transtun`.`payment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `transtun`.`payment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `ticket_id` INT NOT NULL,
  `amount` DECIMAL(10,2) NOT NULL,
  `paymentMethod` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `ticketId_idx` (`ticket_id` ASC) VISIBLE,
  INDEX `userId_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `ticket_id`
    FOREIGN KEY (`ticket_id`)
    REFERENCES `transtun`.`tickets` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `transtun`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
