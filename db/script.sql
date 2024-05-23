-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema pi2bd
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema pi2bd
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `pi2bd` DEFAULT CHARACTER SET utf8 ;
USE `pi2bd` ;

-- -----------------------------------------------------
-- Table `pi2bd`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pi2bd`.`usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome_completo` VARCHAR(50) NULL,
  `usuario` VARCHAR(50) NULL,
  `email` VARCHAR(255) NULL,
  `senha` VARCHAR(100) NULL,
  `tipo` ENUM("Administrador", "Funcionário", "Cliente") NULL,
  `telefone` VARCHAR(20) NULL,
  `nascimento` DATE NULL,
  `cpf` CHAR(11) NULL,
  `cnpj` CHAR(14) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pi2bd`.`ingresso`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pi2bd`.`ingresso` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `cliente_id` INT NULL,
  `codigo` VARCHAR(100) NULL,
  `valor_pago` DECIMAL(8,2) NULL,
  `data_pedido` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `data_visita` DATE NULL,
  `data_utilizacao` TIMESTAMP NULL,
  `ingresso_tipo` ENUM("Inteira", "Meia-Entrada", "Isenção") NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_pedido_cliente1_idx` (`cliente_id` ASC),
  UNIQUE INDEX `codigo_ingresso_UNIQUE` (`codigo` ASC),
  CONSTRAINT `fk_pedido_cliente1`
    FOREIGN KEY (`cliente_id`)
    REFERENCES `pi2bd`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pi2bd`.`preco`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pi2bd`.`preco` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `preco` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
