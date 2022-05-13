-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 11 mai 2022 à 09:27
-- Version du serveur : 5.7.36
-- Version de PHP : 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `fighting-game`
--

-- --------------------------------------------------------

--
-- Structure de la table `level`
--

DROP TABLE IF EXISTS `level`;
CREATE TABLE IF NOT EXISTS `level` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `univers` varchar(45) NOT NULL,
  `avatar` varchar(45) NOT NULL,
  `idUser` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idUser` (`idUser`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `level`
--

INSERT INTO `level` (`id`, `univers`, `avatar`, `idUser`) VALUES
(1, 'foret', 'fffffff', 1);

-- --------------------------------------------------------

--
-- Structure de la table `part`
--

DROP TABLE IF EXISTS `part`;
CREATE TABLE IF NOT EXISTS `part` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idUser` int(11) NOT NULL,
  `start_at` int(11) NOT NULL,
  `score` int(11) NOT NULL,
  `result` enum('win','lost') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idUser` (`idUser`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `progress`
--

DROP TABLE IF EXISTS `progress`;
CREATE TABLE IF NOT EXISTS `progress` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idUser` int(11) NOT NULL,
  `level1` tinyint(1) NOT NULL DEFAULT '1',
  `level2` tinyint(1) NOT NULL DEFAULT '0',
  `level3` tinyint(1) NOT NULL DEFAULT '0',
  `level4` tinyint(1) NOT NULL DEFAULT '0',
  `level5` tinyint(1) NOT NULL DEFAULT '0',
  `level6` tinyint(1) NOT NULL DEFAULT '0',
  `num_part` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `progress_ibfk_1` (`idUser`),
  KEY `idLevel` (`level1`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pseudo` varchar(45) NOT NULL,
  `mail` varchar(120) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `pseudo`, `mail`, `created_at`) VALUES
(1, 'omdousmane', 'omdousmane@gmail.com', '2022-05-10 17:47:05'),
(4, 'dhfgsfdb', 'omdousmane@yahoo.com', '2022-05-10 23:49:27'),
(5, 'edee', 'omdousmane@gg.com', '2022-05-10 23:53:19'),
(6, 'dhfgsfdb', 'omdousmane@yashoo.com', '2022-05-10 23:54:17'),
(7, '55555', 'omdousmane@yaohoo.com', '2022-05-10 23:54:40'),
(8, '55555s', 'omdousmane@yaouhoo.com', '2022-05-11 00:03:02'),
(9, 'dddd', 'fdxhbfdxcgb', '2022-05-11 00:07:02'),
(10, 'dddd', 'fdxhbfdxcgb', '2022-05-11 00:07:19'),
(11, 'dddds', 'omdousmane@ysssahoo.com', '2022-05-11 00:11:31');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `level`
--
ALTER TABLE `level`
  ADD CONSTRAINT `level_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `part`
--
ALTER TABLE `part`
  ADD CONSTRAINT `part_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `progress`
--
ALTER TABLE `progress`
  ADD CONSTRAINT `progress_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

SELECT * FROM level INNER JOIN maps ON level.IdMap = maps.id INNER JOIN progress ON progress.Id_map = maps.id INNER JOIN user ON progress.id_user = user.id WHERE user.id = 16;

SELECT level1, maps, idUser, pseudo, IdMap FROM level LEFT JOIN maps ON level.IdMap = maps.id LEFT JOIN progress ON progress.Id_map = maps.id LEFT JOIN user ON progress.id_user = user.id WHERE user.id = 16;