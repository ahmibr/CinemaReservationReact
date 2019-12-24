<?php
include("db.php");
$conn = openConnection();

if (isset($_SESSION['username']) && $_SESSION ['type'] == "Admin" && isset ($_GET ['movieID']) && isset($_GET['screenNumber'])) {
   $movieID = $_GET['movieID'];
   $screenNumber = $_GET['screenNumber'];

   $query_text = "INSERT INTO MovieScreening (`MovieID`, `ScreenNumber`) VALUES ($movieID,$screenNumber)";
   $query = mysqli_query($conn, $query_text);
   echo json_encode($query);
}
closeConnection($conn);
