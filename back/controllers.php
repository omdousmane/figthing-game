<?php
$pdo = require 'database.php';

// fonction de connection
function login($pseudo)
{
  global $pdo;
  $stmtLogin = $pdo->prepare('SELECT * FROM `user` WHERE `pseudo` =:pseudo');
  $stmtLogin->bindValue(':pseudo', $pseudo);
  $stmtLogin->execute();
  $pseudo = $stmtLogin->fetch();
  return $pseudo ?? false;
}


// fonction d'insertion de données
function register($pseudo, $mail)
{
  global $pdo;
  $statementRegister = $pdo->prepare('INSERT INTO user (`id`, `pseudo`, `mail`)VALUES(
            DEFAULT,
            :pseudo,
            :mail)
            ');
  $statementRegister->bindValue(':pseudo', $pseudo);
  $statementRegister->bindValue(':mail', $mail);
  $statementRegister->execute();
  $id = $pdo->lastInsertId();
  return $id ?? false;
}

// fonction de controle d'un utilisateur
function checkUser($pseudo, $mail): array | false
{
  global $pdo;
  $statementCheck = $pdo->prepare('SELECT * FROM `user` WHERE `pseudo` =:pseudo OR `mail` =:mail');
  $statementCheck->bindValue(':pseudo', $pseudo);
  $statementCheck->bindValue(':mail', $mail);
  $statementCheck->execute();
  $user = $statementCheck->fetch();
  return $user ?? false;
}
// fonction de controle de pseudo 
function checkPseudo($pseudo)
{
  global $pdo;
  $statementcheckPseudo = $pdo->prepare('SELECT  `pseudo`, `id` FROM `user` WHERE `pseudo`LIKE :pseudo AND `pseudo` =:pseudo');
  $statementcheckPseudo->bindValue(':pseudo', "%" . $pseudo . "%");
  $statementcheckPseudo->bindValue(':pseudo', $pseudo);
  $statementcheckPseudo->execute();
  $user = $statementcheckPseudo->fetch();
  return $user ?? false;
}


// fonction de recuperation du niveau
function getLevelUSer($idUser): array | false
{
  global $pdo;
  $stmtGetLevel = $pdo->prepare('SELECT * FROM level LEFT JOIN maps ON level.IdMap = maps.id LEFT JOIN progress ON progress.id_map = maps.id LEFT JOIN user ON progress.id_user = user.id WHERE user.id =:idUser');
  $stmtGetLevel->bindValue(':idUser', $idUser);
  $stmtGetLevel->execute();
  $level = $stmtGetLevel->fetchAll();
  return $level ?? false;
}

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


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $countTab = count($_POST);
  if ($countTab != 1) {
    // 1. Analyser les paramètres passés en POST 
    if (array_key_exists('pseudo', $_POST) && array_key_exists('mail', $_POST)) {
      $input = filter_input_array(INPUT_POST, [
        'pseudo' => FILTER_SANITIZE_SPECIAL_CHARS,
        'mail' => FILTER_SANITIZE_EMAIL,
      ]);
      $pseudo = $input['pseudo'] ?? "";
      $mail = $input['mail'] ?? "";

      if (!$mail) {
        echo json_encode([
          'status' => 'Le mail est requis'
        ]);
      } elseif (!filter_var($mail, FILTER_VALIDATE_EMAIL)) {
        echo json_encode([
          'status' => 'Mauvais format'
        ]);
      }

      $checkRegister = checkUser($pseudo, $mail);
      if ($checkRegister) {
        echo json_encode([
          'status' => 'le mail exist deja'
        ]);
      } else {
        $register = register($pseudo, $mail);
        if ($register === 0) {
          echo json_encode([
            'status' => 'problème d\'enregistrement'
          ]);
        } else {
          echo json_encode($register);
        }
      }
    }

    // if (array_key_exists('idUser', $_POST) && array_key_exists('result', $_POST)) {
    //   // creation du tableau de donnée 
    //   $stat = [
    //     'idUser' => $stat['idUser'],
    //     'idMap' => $stat['idMap'],
    //     'score' => $stat['score'],
    //     'result' => $stat['result'],
    //     'speed' => $stat['speed'],
    //     'degats' => $stat['degats'],
    //     'bossLive' => $stat['bossLive'],
    //     'gameEnd' => $stat['gameEnd']
    //   ];

    //   $StatRegister = registerGameState($stat);
    //   if ($StatRegister === 0) {
    //     echo json_encode([
    //       'status' => 'problème d\'enregistrement'
    //     ]);
    //   } else {
    //     echo json_encode($StatRegister);
    //   }
    // }
  } else {
    // envois du pseudo en base 
    if (array_key_exists('pseudo', $_POST)) {
      $pseudo = $_POST['pseudo'];
      $login = login($pseudo);
      if ($login) {
        echo json_encode([
          'status' => "vous êtes connecter"
        ]);
      } else {
        echo json_encode([
          'status' => "aucun pseudo ne corespond inscrivez-vous"
        ]);
      }
    }
  }
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  // recuperation des donnée a partier du pseudo
  if (array_key_exists('pseudo', $_GET)) {
    $input = filter_input_array(INPUT_GET, [
      'pseudo' => FILTER_SANITIZE_SPECIAL_CHARS,
    ]);
    $pseudo = $input['pseudo'] ?? "";
    $register = checkPseudo($pseudo);
    if ($register == false) {
      echo json_encode([
        'success' => "pseudo disponible ✌",
        'login' => "Bon login ✔ ✌",

      ]);
    } else {
      echo json_encode([
        'error' => "pseudo indisponible 😒",
      ]);
    }
  }

  // recuperation des donnée a partier du pseudoLogin
  if (array_key_exists('pseudoLogin', $_GET)) {
    $input = filter_input_array(INPUT_GET, [
      'pseudoLogin' => FILTER_SANITIZE_SPECIAL_CHARS,
    ]);
    $pseudoLogin = $_GET['pseudoLogin'];
    $login = checkPseudo($pseudoLogin);
    if ($login) {
      echo json_encode([
        'login' => "Bon login ✔ ✌",
        'idUser' => $login['id']
      ]);
    } else {
      echo json_encode([
        'error' => "pseudo indisponible 😒",
      ]);
    }
  }

  // recuperation des données stat du gamer
  if (array_key_exists('idUser', $_GET)) {
    $input = filter_input_array(INPUT_GET, [
      'idUser' => FILTER_SANITIZE_NUMBER_INT,
    ]);
    $idUser = $input['idUser'] ?? "";
    $level = getLevelUSer($idUser);
    if ($level) {
      echo json_encode($level);
    } else {
      echo json_encode([
        'error' => "Aucune information disponible 😒",
      ]);
    }
  }

  //Recuperation des states
  // if (array_key_exists('idUser', $_GET)) {
  //   $input = filter_input_array(INPUT_GET, [
  //     'idUser' => FILTER_SANITIZE_NUMBER_INT,
  //   ]);
  //   $idUser = $input['idUser'] ?? "";
  //   $stat = getGameState($idUser);
  //   if ($stat) {
  //     echo json_encode($stat);
  //   } else {
  //     echo json_encode([
  //       'error' => "Aucune information disponible 😒",
  //     ]);
  //   }
  // }
}