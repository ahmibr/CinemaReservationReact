<?php
include("db.php");
$conn = openConnection();

if (isset($_SESSION['username']) && $_SESSION['type'] == "Admin" && isset($_GET['movieID']) && isset($_GET['screenNumber'])) {
    $movieID = $_GET['movieID'];
    $screenNumber = $_GET['screenNumber'];
    $screenTime = rand(20200101, 20201212);
    $query_text = "INSERT INTO MovieScreening (`MovieID`, `ScreenNumber`,`ScreenTime`) VALUES ($movieID,$screenNumber,$screenTime)";
    $query = mysqli_query($conn, $query_text);
    echo json_encode($query);
}
closeConnection($conn);
