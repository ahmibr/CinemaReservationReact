<?php
include("db.php");
$conn = openConnection();

if(isset($_GET['movieID'])){
   $movieID = $_GET['movieID'];
   $query = mysqli_query($conn,"SELECT * FROM MovieScreening WHERE MovieID = $movieID");
   $rows = array();
   while ($r = mysqli_fetch_assoc($query)) {
      $rows[] = $r;
   }
   echo json_encode($rows);
}
closeConnection($conn);
