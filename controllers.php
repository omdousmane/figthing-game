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
  $statementCheck = $pdo->prepare('SELECT * FROM `user` WHERE `pseudo` =:pseudo OR `mail` = :mail');
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
  $statementcheckPseudo = $pdo->prepare('SELECT  `pseudo` FROM `user` WHERE `pseudo`LIKE :pseudo AND `pseudo` =:pseudo');
  $statementcheckPseudo->bindValue(':pseudo', "%" . $pseudo . "%");
  $statementcheckPseudo->bindValue(':pseudo', $pseudo);
  $statementcheckPseudo->execute();
  $user = $statementcheckPseudo->fetch();
  return $user ?? false;
}


// fonction de recuperation du niveau
function getLevelUSer(): array | false
{
  global $pdo;
  $stmtGetLevel = $pdo->prepare('SELECT * FROM `level` INNER JOIN user ON user.id = level.idUser');
  $stmtGetLevel->execute();
  $level = $stmtGetLevel->fetch();
  return $level ?? false;
}



if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $countTab = count($_POST);
  if ($countTab != 1) {
    // 1. Analyser les paramètres passés en POST 
    if (array_key_exists('pseudo', $_POST) && array_key_exists('mail', $_POST)) {
      $pseudo = $_POST['pseudo'];
      $mail = $_POST['mail'];

      $checkRegister = checkUser($pseudo, $mail);
      if ($checkRegister) {
        echo json_encode([
          'status' => 'le pseudo ou le mail exist deja'
        ]);
      } else {
        $register = register($pseudo, $mail);
        if ($register === 0) {
          echo json_encode([
            'status' => 'problème d\'enregistrement'
          ]);
        } else {
          echo json_encode([
            'status' => "succes enregistrement"
          ]);
        }
      }
    }
  } else {


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

  if (array_key_exists('pseudo', $_GET)) {
    $pseudo = $_GET['pseudo'];
    $login = checkPseudo($pseudo);
    if ($login) {
      echo json_encode([
        'status' => "choisir un autre celui la est indesponible",
        'error' => "error"
      ]);
    } else {
      echo json_encode([
        'status' => "pseudo disponible"
      ]);
    }
  }
}