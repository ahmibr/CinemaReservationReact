<?php
include("db.php");
$conn = openConnection();

$obj = new stdClass();
if (isset($_SESSION['username'])) {
   $obj->status = 'true';
   $obj->type = $_SESSION['type'];
}
else{
   $obj->status = 'false';
}

echo json_encode($obj);
closeConnection($conn);
