<?php
include("db.php");
$conn = openConnection();

if (isset($_POST['username']) && isset($_POST['password'])) {
   $username = $_POST['username'];
   $password = $_POST['password'];

   // $hash = password_hash($password, PASSWORD_DEFAULT);

   $query_text = "SELECT * FROM Users WHERE Username = '$username' and Password = '$password'";

   $query = mysqli_query($conn, $query_text);
   while ($r = mysqli_fetch_assoc($query)) {
      $_SESSION['username'] = $username;
   }
   if (isset($_SESSION['username']))
      echo json_encode(true);
   else
      echo json_encode(false);
} else {
   echo json_encode(false);
}
closeConnection($conn);
