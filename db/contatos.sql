SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

CREATE TABLE IF NOT EXISTS  `contatos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(200) NULL,
  `email` VARCHAR(200) NULL,
  `celular` VARCHAR(45) NULL,
  `telefone` VARCHAR(45) NULL,
  `site` VARCHAR(200) NULL,
  PRIMARY KEY (`id`))
 ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=36 ;

INSERT INTO `contatos` (`id`, `nome`, `email`, `celular`, `telefone`, `site`) VALUES
(1, 'Albert', 'al@min.com', '6546464', '6546464', 'teste@gmail.com'),
(2, 'Sebastian', 'sebastian@hed.com', '987979', '', 'teste@gmail.com'),
(3, 'Mamun', 'm@mun.com', '646465', '6546464', 'teste@gmail.com'),
(9, 'fausto', 'fausto@yahoo.com', '1234556', '6546464', '');

