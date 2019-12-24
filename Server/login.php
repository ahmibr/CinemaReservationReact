<?php
include("db.php");
$conn = openConnection();

$obj = new stdClass();

if (isset($_POST['username']) && isset($_POST['password'])) {
   $username = $_POST['username'];
   $password = $_POST['password'];

   // $hash = password_hash($password, PASSWORD_DEFAULT);

   $query_text = "SELECT * FROM Users WHERE Username = '$username' and Password = '$password'";

   $query = mysqli_query($conn, $query_text);
   while ($r = mysqli_fetch_assoc($query)) {
      $_SESSION['username'] = $username;
      $_SESSION['type'] = $r['Type'];
   }

   if (isset($_SESSION['username'])) {
      $obj->status = 'true';
      $obj->type = $_SESSION['type'];
   } else {
      $obj->status = 'false';
   }
} else {
   $obj->status = 'false';
}
echo json_encode($obj);
closeConnection($conn);
