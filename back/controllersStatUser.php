<?php

//connexion a la base de donnée
$pdo = require 'database.php';

// fonction de recuperation des données en base 
function getGameState($idUser)
{
  global $pdo;
  $stmtGetGameState = $pdo->prepare('SELECT * FROM `part` WHERE idUser =:idUser');
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

//recuperation des données en post

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $countTab = count($_POST);
  if ($countTab != 1) {
    // echo json_encode($_POST);

    if (array_key_exists('idUser', $_POST) && array_key_exists('result', $_POST)) {
      $input = filter_input_array(INPUT_POST, [
        'idUser' => FILTER_SANITIZE_NUMBER_INT,
        'result' => FILTER_SANITIZE_SPECIAL_CHARS,
      ]);
      // creation du tableau de donnée 
      $stat = [
        'idUser' => $input['idUser'],
        'idMap' => $_POST['idMap'],
        'score' => $_POST['score'],
        'result' => $input['result'],
        'speed' => $_POST['speed'],
        'degats' => $_POST['degats'],
        'bossLive' => $_POST['bossLive'],
        'gameEnd' => $_POST['gameEnd']
      ];

      $StatRegister = registerGameState($stat);
      if ($StatRegister === 0) {
        echo json_encode([
          'status' => 'problème d\'enregistrement'
        ]);
      } else {
        echo json_encode($StatRegister);
      }
    }
  }
}

// echo json_encode($_GET);


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  //Recuperation des states
  if (array_key_exists('idUser', $_GET)) {
    $input = filter_input_array(INPUT_GET, [
      'idUser' => FILTER_SANITIZE_NUMBER_INT,
    ]);
    $idUser = $input['idUser'] ?? "";
    $stat = getGameState($idUser);
    if ($stat) {
      echo json_encode($stat);
    } else {
      echo json_encode([
        'error' => "Aucune information disponible 😒",
      ]);
    }
  }
}