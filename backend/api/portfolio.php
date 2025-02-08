<?php
require_once './db.php';

function addStockToPortfolio($userId, $stockId, $quantity, $avgBuyPrice) {
    global $conn;

    // Check if stock already exists in the user's portfolio
    $stmt = $conn->prepare("SELECT * FROM portfolio WHERE user_id = ? AND stock_id = ?");
    $stmt->bind_param("ii", $userId, $stockId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Stock exists, so we update the portfolio
        $row = $result->fetch_assoc();
        $newQuantity = $row['shares_owned'] + $quantity;
        $newTotalInvestment = $row['total_investment'] + ($avgBuyPrice * $quantity);

        // Update the portfolio with the new quantity and total investment
        $updateStmt = $conn->prepare("UPDATE portfolio SET shares_owned = ?, total_investment = ? WHERE id = ?");
        $updateStmt->bind_param("idi", $newQuantity, $newTotalInvestment, $row['id']);
        if ($updateStmt->execute()) {
            return ["status" => "success", "message" => "Stock quantity updated in portfolio."];
        } else {
            return ["status" => "error", "message" => "Failed to update portfolio."];
        }
    } else {
        // Stock doesn't exist, so we add a new record
        $stmt = $conn->prepare("INSERT INTO portfolio (user_id, stock_id, shares_owned, total_investment) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("iiid", $userId, $stockId, $quantity, $avgBuyPrice * $quantity);
        
        if ($stmt->execute()) {
            return ["status" => "success", "message" => "Stock added to portfolio."];
        } else {
            return ["status" => "error", "message" => "Failed to add stock to portfolio."];
        }
    }
}

function getUserPortfolio($userId) {
    global $conn;

    $stmt = $conn->prepare("SELECT p.id, s.company_name, s.ticker_symbol, p.shares_owned, p.total_investment FROM portfolio p
                            JOIN stocks s ON p.stock_id = s.id
                            WHERE p.user_id = ?");
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $portfolio = [];
        while ($row = $result->fetch_assoc()) {
            $portfolio[] = $row;
        }
        return ["status" => "success", "data" => $portfolio];
    } else {
        return ["status" => "error", "message" => "No stocks found in portfolio."];
    }
}

function getUserFinancialSummary($userId) {
    global $conn;

    // Get available balance
    $stmt = $conn->prepare("SELECT balance FROM users WHERE id = ?");
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows === 0) {
        return ["status" => "error", "message" => "User not found."];
    }
    $user = $result->fetch_assoc();
    $availableBalance = $user['balance'];

    // Get depot value and total shares owned
    $stmt = $conn->prepare("SELECT SUM(total_investment) AS depot_value, SUM(shares_owned) AS total_shares FROM portfolio WHERE user_id = ?");
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();
    $portfolio = $result->fetch_assoc();
    $depotValue = $portfolio['depot_value'] ?? 0;
    $totalShares = $portfolio['total_shares'] ?? 0;

    // Calculate profit/loss
    $stmt = $conn->prepare("SELECT SUM((t.price_per_share - p.total_investment / p.shares_owned) * t.shares) AS profit_loss
                            FROM transactions t
                            JOIN portfolio p ON t.stock_id = p.stock_id
                            WHERE t.user_id = ? AND p.user_id = ?");
    $stmt->bind_param("ii", $userId, $userId);
    $stmt->execute();
    $result = $stmt->get_result();
    $profitLoss = $result->fetch_assoc()['profit_loss'] ?? 0;

    return [
        "status" => "success",
        "data" => [
            "available_balance" => $availableBalance,
            "profit_loss" => $profitLoss,
            "depot_value" => $depotValue,
            "total_shares" => $totalShares
        ]
    ];
}
?>
