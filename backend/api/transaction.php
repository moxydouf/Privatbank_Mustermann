<?php
require_once './db.php';

function addTransaction($userId, $stockId, $type, $shares, $price_per_share) {
    global $conn;

    // Calculate total cost
    $total_cost = $shares * $price_per_share;

    $stmt = $conn->prepare("INSERT INTO transactions (user_id, stock_id, transaction_type, shares, price_per_share, total_cost) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("iisidd", $userId, $stockId, $type, $shares, $price_per_share, $total_cost);
    
    if ($stmt->execute()) {
        return ["status" => "success", "message" => "Transaction recorded successfully."];
    } else {
        return ["status" => "error", "message" => "Failed to record transaction."];
    }
}

function getUserTransactions($userId) {
    global $conn;

    $stmt = $conn->prepare("SELECT t.id, s.company_name, s.ticker_symbol, t.transaction_type, t.shares, t.price_per_share, t.total_cost, t.created_at FROM transactions t
                            JOIN stocks s ON t.stock_id = s.id
                            WHERE t.user_id = ?
                            ORDER BY t.created_at DESC");
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $transactions = [];
        while ($row = $result->fetch_assoc()) {
            $transactions[] = $row;
        }
        return ["status" => "success", "data" => $transactions];
    } else {
        return ["status" => "error", "message" => "No transactions found."];
    }
}

function getOrderBook() {
    global $conn;

    $stmt = $conn->prepare("SELECT t.transaction_type AS type, s.ticker_symbol AS symbol, t.price_per_share AS price, t.shares AS quantity, t.created_at AS time
                            FROM transactions t
                            JOIN stocks s ON t.stock_id = s.id
                            ORDER BY t.created_at DESC");
    if (!$stmt) {
        return ["status" => "error", "message" => "Database error: " . $conn->error];
    }

    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $orderBook = [];
        while ($row = $result->fetch_assoc()) {
            $orderBook[] = $row;
        }
        return ["status" => "success", "data" => $orderBook];
    } else {
        return ["status" => "error", "message" => "No transactions found."];
    }
}
?>
