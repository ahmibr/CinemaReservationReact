<?php
include("db.php");
$conn = openConnection();

if (isset($_GET['screeningID']) && isset($_SESSION['username']) && isset($_GET['selectedSeats'])) {
   $screeningID = $_GET['screeningID'];
   $username = $_SESSION['username'];
   $selectedSeats = $_GET['selectedSeats'];

   $query_text = "INSERT INTO Reservations (`Username`, `ScreeningID`, `SeatNumber`) VALUES ";
   $seats_values = [];
   foreach ($selectedSeats as $seat) {
      array_push($seats_values, "('$username',$screeningID,$seat)");
   }
   $query_text .= join(",",$seats_values);

   $query = mysqli_query($conn, $query_text);
   echo json_encode($query);
}
closeConnection($conn);
