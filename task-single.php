<?php
  include('database.php');

  if(isset($_POST['id'])) {
    $id = $_POST['id'];
    $query = "SELECT * FROM task WHERE id = $id";
    $result = mysqli_query($connection, $query);
    if(!$result) {
      die("Query Error" . mysqli_error($connection));
    }

    $json = array();
    while($row = mysqli_fetch_array($result)) {
      $json[] = array(
        'id' => $row['id'],
        'name' => $row['name'],
        'description' => $row['description'],
      );
    }

    $json_string = json_encode($json[0]);
    echo $json_string;
  }
?>
