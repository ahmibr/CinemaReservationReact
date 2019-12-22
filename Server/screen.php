<?php
include("db.php");
$conn = openConnection();

$obj = new stdClass();

if (isset($_GET['screeningID']) && isset($_SESSION['username'])) {
   $screeningID = $_GET['screeningID'];
   $username = $_SESSION['username'];

   $sub_query = "SELECT DISTINCT ScreenNumber FROM MovieScreening WHERE ID = $screeningID";
   $query = mysqli_query($conn, "SELECT * FROM Screens WHERE ScreenNumber = ($sub_query)");


   while ($r = mysqli_fetch_assoc($query)) {
      $obj->numberOfRows = $r["Rows"];
      $obj->numberOfColumns = $r["Columns"];
      $obj->screenNumber = $r['ScreenNumber'];
   }

   $query = mysqli_query($conn, "SELECT * FROM Reservations WHERE ScreeningID = $screeningID");
   $rows = array();
   $my_rows = array();
   while ($r = mysqli_fetch_assoc($query)) {
      if ($r['Username'] == $username) {
         $my_rows[] = $r['SeatNumber'];
      }
      $rows[] = $r['SeatNumber'];
   }
   $obj->reservedSeats = $rows;
   $obj->myReservedSeats = $my_rows;
   echo json_encode($obj);
}

closeConnection($conn);
