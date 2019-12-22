<?php

session_start();
// $_SESSION['username'] = "medo";

function openConnection()
{
    
    define("DB_HOST","localhost");
    define("DB_USER","root");
    define("DB_PASS","");
    define("DB_NAME","cinema");

    $conn = new mysqli("localhost", "root", "","cinema") or die("Connect failed: %s\n". $conn -> error);

    return $conn;
}
 
function closeConnection($conn)
{
    $conn -> close();
}

?>