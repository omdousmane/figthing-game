<?php

//connexion a la base de donnée
$pdo = require 'database.php';

// fonction de recuperation des données en base 
function getGameState($idUser): array | false
{
  global $pdo;
  $stmtGetGameState = $pdo->prepare('SELECT * FROM level LEFT JOIN maps ON level.IdMap = maps.id LEFT JOIN progress ON progress.id_map = maps.id LEFT JOIN user ON progress.id_user = user.id WHERE user.id =:idUser');
  $stmtGetGameState->bindValue(':idUser', $idUser);
  $stmtGetGameState->execute();
  $level = $stmtGetGameState->fetchAll();
  return $level ?? false;
}

// fonction d'insertion de données
function registerGameState($stat)
{
  global $pdo;
  $stmtRegisterGameState = $pdo->prepare('INSERT INTO `part`(`id`, `idUser`, `idMap`, `score`, `result`, `speed`, `degats`, `bossLive`, `gameEnd`)VALUES(
            DEFAULT,
            :idUser,
            :idMap,
            :score,
            :result,
            :speed,
            :degats,
            :bossLive,
            :gameEnd)');
  $stmtRegisterGameState->bindValue(':idUser', $stat['idUser']);
  $stmtRegisterGameState->bindValue(':idMap', $stat['idMap']);
  $stmtRegisterGameState->bindValue(':score', $stat['score']);
  $stmtRegisterGameState->bindValue(':result', $stat['result']);
  $stmtRegisterGameState->bindValue(':speed', $stat['speed']);
  $stmtRegisterGameState->bindValue(':degats', $stat['degats']);
  $stmtRegisterGameState->bindValue(':bossLive', $stat['bossLive']);
  $stmtRegisterGameState->bindValue(':gameEnd', $stat['gameEnd']);
  $stmtRegisterGameState->execute();
  $id = $pdo->lastInsertId();
  return $id ?? false;
}

echo json_encode($_POST);


//recuperation des données en post

// if ($_SERVER['REQUEST_METHOD'] === 'POST') {
//   $countTab = count($_POST);
//   if ($countTab != 1) {

//     if (array_key_exists('idUser', $_POST) && array_key_exists('result', $_POST)) {
//       $input = filter_input_array(INPUT_POST, [
//         'idUser' => FILTER_SANITIZE_NUMBER_INT,
//         'result' => FILTER_SANITIZE_SPECIAL_CHARS,
//       ]);
//       // creation du tableau de donnée 
//       $stat = [
//         'idUser' => $stat['idUser'],
//         'idMap' => $stat['idMap'],
//         'score' => $stat['score'],
//         'result' => $stat['result'],
//         'speed' => $stat['speed'],
//         'degats' => $stat['degats'],
//         'bossLive' => $stat['bossLive'],
//         'gameEnd' => $stat['gameEnd']
//       ];

//       $StatRegister = registerGameState($stat);
//       if ($StatRegister === 0) {
//         echo json_encode([
//           'status' => 'problème d\'enregistrement'
//         ]);
//       } else {
//         echo json_encode($StatRegister);
//       }
//     }
//   }
// }

echo json_encode($_GET);


// if ($_SERVER['REQUEST_METHOD'] === 'GET') {
//   //Recuperation des states
//   if (array_key_exists('idUser', $_GET)) {
//     $input = filter_input_array(INPUT_GET, [
//       'idUser' => FILTER_SANITIZE_NUMBER_INT,
//     ]);
//     $idUser = $input['idUser'] ?? "";
//     $stat = getGameState($idUser);
//     if ($stat) {
//       echo json_encode($stat);
//     } else {
//       echo json_encode([
//         'error' => "Aucune information disponible 😒",
//       ]);
//     }
//   }
// }