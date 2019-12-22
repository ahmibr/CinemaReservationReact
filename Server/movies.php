<?php
include("db.php");
$conn = openConnection();

$query = mysqli_query($conn,"SELECT * FROM Movies");
$rows = array();
while ($r = mysqli_fetch_assoc($query)) {
   $rows[] = $r;
}
echo json_encode($rows);
closeConnection($conn);
