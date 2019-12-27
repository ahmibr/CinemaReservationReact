<?php
include("db.php");
$conn = openConnection();

$obj = new stdClass();

if (isset($_POST['username']) && isset($_POST['password']) && isset($_POST['email'])) {
   $username = $_POST['username'];
   $password = $_POST['password'];
   $email = $_POST['email'];
   // $hash = password_hash($password, PASSWORD_DEFAULT);
   
   $query_text = "INSERT INTO Users (`Username`, `Password`,`Email`,`Type`) VALUES ('$username','$password','$email','Customer')";
   // echo $query_text;
   $query = mysqli_query($conn, $query_text);
   echo json_encode($query);
}
closeConnection($conn);
