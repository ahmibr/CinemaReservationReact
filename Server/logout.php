<?php
include("db.php");
session_destroy();
echo json_encode(true);
