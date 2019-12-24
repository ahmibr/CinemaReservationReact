<?php
include("db.php");
$conn = openConnection();

if (isset($_SESSION['username']) && $_SESSION ['type'] == "Admin" && isset ($_GET ['movieName'])) {
   $movieName = $_GET['movieName'];
  
   $query_text = "INSERT INTO Movies (`MovieName`) VALUES ('$movieName')";
   $query = mysqli_query($conn, $query_text);
   echo json_encode($query);
}
closeConnection($conn);
