-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(50) NOT NULL,
  `sobrenome` VARCHAR(50) NOT NULL,
  `email` VARCHAR(75) NOT NULL,
  `senha` VARCHAR(250) NOT NULL,
  `reputacao` FLOAT NOT NULL,
  `admin` TINYINT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`posto_combustivel`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`posto_combustivel` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(50) NOT NULL,
  `bandeira` VARCHAR(45) NOT NULL,
  `localizao_latitude` FLOAT NOT NULL,
  `localizao_longitude` FLOAT NOT NULL,
  `aprovado` TINYINT NULL,
  `usuario_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_posto_combustivel_usuario1_idx` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_posto_combustivel_usuario1`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `mydb`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`combustivel`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`combustivel` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `preco` FLOAT NOT NULL,
  `aprovado` TINYINT NULL,
  `posto_combustivel_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_combustivel_posto_combustivel_idx` (`posto_combustivel_id` ASC) VISIBLE,
  CONSTRAINT `fk_combustivel_posto_combustivel`
    FOREIGN KEY (`posto_combustivel_id`)
    REFERENCES `mydb`.`posto_combustivel` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`automovel`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`automovel` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `tipo` VARCHAR(45) NOT NULL,
  `consumo_medio` FLOAT NOT NULL,
  `capacidade_tanque` FLOAT NOT NULL,
  `usuario_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_automovel_usuario1_idx` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_automovel_usuario1`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `mydb`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`endereco`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`endereco` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `rua` VARCHAR(45) NOT NULL,
  `bairro` VARCHAR(45) NOT NULL,
  `cidade` VARCHAR(45) NOT NULL,
  `posto_combustivel_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_endereco_posto_combustivel1_idx` (`posto_combustivel_id` ASC) VISIBLE,
  CONSTRAINT `fk_endereco_posto_combustivel1`
    FOREIGN KEY (`posto_combustivel_id`)
    REFERENCES `mydb`.`posto_combustivel` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;