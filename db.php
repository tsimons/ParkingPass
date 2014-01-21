<?php 
  require('db-info.php');

  $query = '';

  if ($_SERVER['REQUEST_METHOD'] == 'GET') {

    $query = "SELECT * FROM `holders` LIMIT 0 , 30";

  } else if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $postData = ['name' => $_POST['name'], 'current' => $_POST['current']];

    $query = 'INSERT INTO `holders`
      (`name`, `current`)
      VALUES
      ('.$postData["new"]["name"] . ', ' . $postData["new"]["current"] . '),
      ('.$postData["old"]["name"] . ', ' . $postData["old"]["current"] . ')
      ON DUPLICATE KEY UPDATE
      SET `current` = {$postData["current"]} WHERE `name` = {$postData["name"]}';
  }

  try {
    $conn = new PDO('mysql:host='.$host.';dbname='.$db, $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $data = $conn->query($query);
 

    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
      foreach($data as $row) {
        print_r(json_encode($row)."|");
      }


    } else {
      echo '{"status": "success"}';
    }

  } catch(PDOException $e) {
    echo 'ERROR: ' . $e->getMessage();
  }
?>