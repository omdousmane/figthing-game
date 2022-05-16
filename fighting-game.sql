-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 13 mai 2022 à 16:38
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
  `IdMap` int(11) NOT NULL,
  `avatar` varchar(45) NOT NULL,
  `idUser` int(11) NOT NULL,
  `speed` int(11) NOT NULL,
  `degats` int(11) NOT NULL,
  `bossLive` int(11) NOT NULL,
  `gameBegin` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `gameEnd` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idUser` (`idUser`),
  KEY `IdMap` (`IdMap`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `level`
--

INSERT INTO `level` (`id`, `IdMap`, `avatar`, `idUser`, `speed`, `degats`, `bossLive`, `gameBegin`, `gameEnd`) VALUES
(2, 1, 'fffffff', 9, 0, 0, 0, '2022-05-13 14:42:10', '2022-05-13 14:42:39'),
(3, 3, 'ddddd', 16, 0, 0, 0, '2022-05-13 14:42:10', '2022-05-13 14:42:39'),
(4, 2, 'fffffff', 16, 0, 0, 0, '2022-05-13 14:42:10', '2022-05-13 14:42:39');

-- --------------------------------------------------------

--
-- Structure de la table `maps`
--

DROP TABLE IF EXISTS `maps`;
CREATE TABLE IF NOT EXISTS `maps` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `maps` varchar(20) NOT NULL,
  `mapName` varchar(50) NOT NULL,
  `map_link` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `maps`
--

INSERT INTO `maps` (`id`, `maps`, `mapName`, `map_link`) VALUES
(1, 'map1', 'Ville', 'levelOne.html'),
(2, 'map2', 'Prisson', 'levelTwo.html'),
(3, 'map3', 'Desert', 'levelTree.html'),
(4, 'map4', 'Forêt', 'levelFour.html'),
(5, 'map5', 'Grotte', 'levelFive.html'),
(6, 'map6', 'Humm', 'levelSix.html');

-- --------------------------------------------------------

--
-- Structure de la table `part`
--

DROP TABLE IF EXISTS `part`;
CREATE TABLE IF NOT EXISTS `part` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idUser` int(11) NOT NULL,
  `idMap` int(11) NOT NULL,
  `score` int(11) NOT NULL,
  `result` enum('win','lost') NOT NULL,
  `speed` int(11) NOT NULL,
  `degats` int(11) NOT NULL,
  `bossLive` int(11) NOT NULL,
  `gameBegin` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `gameEnd` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idUser` (`idUser`),
  KEY `idMap` (`idMap`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `progress`
--

DROP TABLE IF EXISTS `progress`;
CREATE TABLE IF NOT EXISTS `progress` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `level` tinyint(1) NOT NULL DEFAULT '1',
  `num_part` int(11) NOT NULL,
  `id_map` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `progress_ibfk_1` (`id_user`),
  KEY `idLevel` (`level`),
  KEY `progress_ibfk_2` (`id_map`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `progress`
--

INSERT INTO `progress` (`id`, `id_user`, `level`, `num_part`, `id_map`) VALUES
(4, 16, 1, 4, 3),
(5, 16, 2, 6, 2),
(6, 1, 1, 10, 1),
(7, 9, 1, 9, 2);

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
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `pseudo`, `mail`, `created_at`) VALUES
(1, 'omdousmane', 'omdousmane@gmail.com', '2022-05-10 17:47:05'),
(9, 'dddd', 'fdxhbfdxcgb', '2022-05-11 00:07:02'),
(16, 'ddd', 'dsgvdb', '2022-05-12 11:38:47'),
(17, 'dhfgsfdb', '', '2022-05-12 23:50:24'),
(23, 'dhfgsfdbs', 'omdousmane@yahosezo.com', '2022-05-13 00:05:28'),
(24, 'dhfgsfdbss', 'omdousmane@yahossso.com', '2022-05-13 00:06:17'),
(25, 'qqqqqq', 'omdousmane@yahaaaaoo.com', '2022-05-13 00:07:03'),
(26, 'dhfgsfdbeee', 'fdxhbfdxcgbs@ghhh.coh', '2022-05-13 00:11:29'),
(27, 'sssss', 'sssss', '2022-05-13 00:13:34'),
(28, 'dddddd', 'ddddd', '2022-05-13 00:13:58'),
(29, 'ssssss', 'ssssss', '2022-05-13 00:17:43'),
(30, 'dhfgsfdbe', 'omdousmane@yaheeeeoo.com', '2022-05-13 00:20:43'),
(31, 'edee', 'sdwvdsxwfc@dddd0.cpm', '2022-05-13 00:21:46'),
(32, 'dhfgsfdbw', 'omdousmane@ydahoo.comd', '2022-05-13 00:23:20'),
(33, 'dhfgsfggg', 'omdousmane@yahodfgto.com', '2022-05-13 08:44:55'),
(34, 'dddg', 'omdousmane@ycsdfgahoo.com', '2022-05-13 12:46:40'),
(35, 'dhfgsfdbd', 'omdousmane@yahdxsfoo.com', '2022-05-13 15:46:47');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `level`
--
ALTER TABLE `level`
  ADD CONSTRAINT `level_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `level_ibfk_2` FOREIGN KEY (`IdMap`) REFERENCES `maps` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `part`
--
ALTER TABLE `part`
  ADD CONSTRAINT `part_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `part_ibfk_2` FOREIGN KEY (`idMap`) REFERENCES `maps` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `progress`
--
ALTER TABLE `progress`
  ADD CONSTRAINT `progress_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `progress_ibfk_2` FOREIGN KEY (`id_map`) REFERENCES `maps` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
