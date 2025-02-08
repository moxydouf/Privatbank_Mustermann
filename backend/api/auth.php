<?php
require_once './db.php';

function registerUser($data) {
    global $conn;

    // Validate input
    $name = trim($data['name'] ?? '');
    $email = trim($data['email'] ?? '');
    $password = trim($data['password'] ?? '');
    $dob = trim($data['date_of_birth'] ?? '');
    $postal_code = trim($data['postal_code'] ?? '');

    if (empty($name) || empty($email) || empty($password) || empty($dob) || empty($postal_code)) {
        return ["status" => "error", "message" => "All fields are required."];
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return ["status" => "error", "message" => "Invalid email format."];
    }

    // Check if email already exists
    $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
    if (!$stmt) {
        return ["status" => "error", "message" => "Database error: " . $conn->error];
    }
    
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();
    
    if ($stmt->num_rows > 0) {
        return ["status" => "error", "message" => "Email already registered."];
    }
    $stmt->close();

    // Hash password
    $password_hash = password_hash($password, PASSWORD_BCRYPT);

    // Insert new user with initial balance
    $initial_balance = 50000.00;
    $stmt = $conn->prepare("INSERT INTO users (name, email, password, date_of_birth, postal_code, balance) VALUES (?, ?, ?, ?, ?, ?)");
    if (!$stmt) {
        return ["status" => "error", "message" => "Database error: " . $conn->error];
    }
    
    $stmt->bind_param("sssssd", $name, $email, $password_hash, $dob, $postal_code, $initial_balance);

    if ($stmt->execute()) {
        return ["status" => "success", "message" => "Registration successful!", "user_id" => $conn->insert_id];
    } else {
        return ["status" => "error", "message" => "Registration failed: " . $stmt->error];
    }

    $stmt->close();
}

function loginUser($data) {
    global $conn;

    $email = trim($data['email'] ?? '');
    $password = $data['password'] ?? '';

    if (empty($email) || empty($password)) {
        return ["status" => "error", "message" => "Email and password are required."];
    }

    // Fetch user from database
    $stmt = $conn->prepare("SELECT id, name, email, password, date_of_birth, postal_code, balance FROM users WHERE email = ?");
    if (!$stmt) {
        return ["status" => "error", "message" => "Database error: " . $conn->error];
    }
    
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        return ["status" => "error", "message" => "User not found."];
    }

    $user = $result->fetch_assoc();

    // Verify password
    if (!password_verify($password, $user['password'])) {
        return ["status" => "error", "message" => "Invalid password."];
    }

    // Remove password from user data before returning
    unset($user['password']);

    return ["status" => "success", "message" => "Login successful.", "user" => $user];
}

function getCurrentUser($userId) {
    global $conn;

    $stmt = $conn->prepare("SELECT id, name, email, date_of_birth, postal_code, balance FROM users WHERE id = ?");
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        return ["status" => "success", "user" => $result->fetch_assoc()];
    } else {
        return ["status" => "error", "message" => "User not found."];
    }
}

function logoutUser() {

    return ["status" => "success", "message" => "Logout successful."];
}
?>
