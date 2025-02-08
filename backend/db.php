<?php
$host = 'localhost';
$db = 'bank_game';
$user = 'root';
$password = '';

$conn = new mysqli($host, $user, $password, $db);

if ($conn->connect_error) {
  die(json_encode(["status" => "error", "message" => "Database connection failed: " . $conn->connect_error]));
}

// Enable MySQLi error reporting

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
?>
