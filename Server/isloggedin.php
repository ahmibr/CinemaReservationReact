<?php
include("db.php");
$conn = openConnection();

if (isset($_SESSION['username'])) {
   echo json_encode(true);
}
else{
   echo json_encode(false);
}
closeConnection($conn);
