<?php 
  require('db-info.php');

  $query = '';

  if ($_SERVER['REQUEST_METHOD'] == 'GET') {

    $query = "SELECT * from `holders`";

  } else if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $postData = ['name' => $_POST['name'], 'current' => $_POST['current']];

    $query = 'INSERT INTO `holders`
      (`name`, `current`)
      VALUES
      ({$postData["name"]}, {$postData["current"]})
      ON DUPLICATE KEY UPDATE
      SET `current` = {$postData["current"]} WHERE `name` = {$postData["name"]}';
  }

  try {
    $conn = new PDO('mysql:host={$host};dbname={$db}', $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $data = $conn->query($query);

    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
      $len = count($data);
      $output = '{';
      foreach ($data as $key => $value) {
        $output += $key . ': ' . $value;

        if ($data[$len - 1] != $value) {
          $output += ',';
        }
      }
      $output += '}'
    } else {
      echo '{"status": "success"}';
    }

  } catch(PDOException $e) {
      echo 'ERROR: ' . $e->getMessage();
  }
?>