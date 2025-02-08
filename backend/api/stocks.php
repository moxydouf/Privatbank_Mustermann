<?php
require_once './db.php';


function addStock($data) {
    global $conn;

    $company_name = $data['company_name'];
    $ticker_symbol = $data['ticker_symbol'];
    $bid_price = isset($data['bid_price']) ? $data['bid_price'] : 99.00;
    $ask_price = isset($data['ask_price']) ? $data['ask_price'] : 100.00;
    $total_shares = isset($data['total_shares']) ? $data['total_shares'] : 0;

    // Check if all fields are filled
    if (empty($company_name) || empty($ticker_symbol)) {
        return ["status" => "error", "message" => "Company name and ticker symbol are required."];
    }

    // Check if ticker symbol already exists in the database
    $checkStmt = $conn->prepare("SELECT * FROM stocks WHERE ticker_symbol = ?");
    $checkStmt->bind_param("s", $ticker_symbol);
    $checkStmt->execute();
    $checkResult = $checkStmt->get_result();
    if ($checkResult->num_rows > 0) {
        return ["status" => "error", "message" => "Ticker symbol already exists."];
    }

    // Insert new stock record
    $stmt = $conn->prepare("INSERT INTO stocks (company_name, ticker_symbol, bid_price, ask_price, total_shares) VALUES (?, ?, ?, ?, ?)");
    if (!$stmt) {
        return ["status" => "error", "message" => "Database error: " . $conn->error];
    }

    $stmt->bind_param("sssdi", $company_name, $ticker_symbol, $bid_price, $ask_price, $total_shares);
    
    if ($stmt->execute()) {
        return ["status" => "success", "message" => "Stock added successfully."];
    } else {
        return ["status" => "error", "message" => "Failed to add stock: " . $stmt->error];
    }
}

function getAllStocks() {
    global $conn;

    $stmt = $conn->prepare("SELECT * FROM stocks");
    if (!$stmt) {
        return ["status" => "error", "message" => "Database error: " . $conn->error];
    }

    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $stocks = [];
        while ($row = $result->fetch_assoc()) {
            $stocks[] = $row;
        }
        return ["status" => "success", "data" => $stocks];
    } else {
        return ["status" => "error", "message" => "No stocks available."];
    }
}

function updateStockPrice($data) {
    global $conn;

    $stockId = $data['id'];
    $bid_price = isset($data['bid_price']) ? $data['bid_price'] : null;
    $ask_price = isset($data['ask_price']) ? $data['ask_price'] : null;

    // Make sure either bid price or ask price is provided
    if (is_null($bid_price) && is_null($ask_price)) {
        return ["status" => "error", "message" => "At least one price (bid or ask) is required."];
    }

    // Prepare the SQL query to update prices
    $query = "UPDATE stocks SET ";
    $params = [];
    
    if (!is_null($bid_price)) {
        $query .= "bid_price = ?";
        $params[] = $bid_price;
    }
    if (!is_null($ask_price)) {
        $query .= (count($params) > 0 ? ", " : "") . "ask_price = ?";
        $params[] = $ask_price;
    }

    $query .= " WHERE id = ?";
    $params[] = $stockId;

    $stmt = $conn->prepare($query);
    if (!$stmt) {
        return ["status" => "error", "message" => "Database error: " . $conn->error];
    }

    $types = str_repeat("d", count($params) - 1) . "i"; // Prepare bind types
    $stmt->bind_param($types, ...$params);
    
    if ($stmt->execute()) {
        return ["status" => "success", "message" => "Stock prices updated successfully."];
    } else {
        return ["status" => "error", "message" => "Failed to update stock prices: " . $stmt->error];
    }
}

function buyStock($userId, $stockId, $quantity, $currentPrice, $limitPrice = null) {
    global $conn;

    // Determine the price at which to buy
    $buy_price = $limitPrice ? $limitPrice : $currentPrice;

    // Calculate total cost and fees
    $totalCost = $quantity * $buy_price;
    $fee = max(9.99, min(59.99, 4.95 + 0.0025 * $totalCost));
    $totalCostWithFee = $totalCost + $fee;

    // Check if user has enough balance
    $stmt = $conn->prepare("SELECT balance FROM users WHERE id = ?");
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows === 0) {
        return ["status" => "error", "message" => "User not found."];
    }
    $user = $result->fetch_assoc();
    if ($user['balance'] < $totalCostWithFee) {
        return ["status" => "error", "message" => "Insufficient balance."];
    }

    // Check if there are enough shares available
    $stmt = $conn->prepare("SELECT total_shares FROM stocks WHERE id = ?");
    $stmt->bind_param("i", $stockId);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows === 0) {
        return ["status" => "error", "message" => "Stock not found."];
    }
    $stock = $result->fetch_assoc();
    if ($stock['total_shares'] < $quantity) {
        return ["status" => "error", "message" => "Not enough shares available."];
    }

    // If it's a limit order, store it and return
    if ($limitPrice) {
        $stmt = $conn->prepare("INSERT INTO limit_orders (user_id, stock_id, quantity, limit_price, type) VALUES (?, ?, ?, ?, 'buy')");
        if (!$stmt) {
            return ["status" => "error", "message" => "Database error: " . $conn->error];
        }
        $stmt->bind_param("iiid", $userId, $stockId, $quantity, $limitPrice);
        if ($stmt->execute()) {
            return ["status" => "success", "message" => "Limit order placed successfully."];
        } else {
            return ["status" => "error", "message" => "Failed to place limit order: " . $stmt->error];
        }
    }

    // Deduct cost from user's balance
    $newBalance = $user['balance'] - $totalCostWithFee;
    $stmt = $conn->prepare("UPDATE users SET balance = ? WHERE id = ?");
    $stmt->bind_param("di", $newBalance, $userId);
    if (!$stmt->execute()) {
        return ["status" => "error", "message" => "Failed to update balance: " . $stmt->error];
    }

    // Deduct shares from stock
    $newTotalShares = $stock['total_shares'] - $quantity;
    $stmt = $conn->prepare("UPDATE stocks SET total_shares = ? WHERE id = ?");
    $stmt->bind_param("ii", $newTotalShares, $stockId);
    if (!$stmt->execute()) {
        return ["status" => "error", "message" => "Failed to update stock shares: " . $stmt->error];
    }

    // Insert transaction
    $stmt = $conn->prepare("INSERT INTO transactions (user_id, stock_id, transaction_type, shares, price_per_share, total_cost) VALUES (?, ?, 'BUY', ?, ?, ?)");
    if (!$stmt) {
        return ["status" => "error", "message" => "Database error: " . $conn->error];
    }
    $stmt->bind_param("iiidd", $userId, $stockId, $quantity, $buy_price, $totalCostWithFee);
    if (!$stmt->execute()) {
        return ["status" => "error", "message" => "Failed to record transaction: " . $stmt->error];
    }

    // Update portfolio
    $stmt = $conn->prepare("INSERT INTO portfolio (user_id, stock_id, shares_owned, total_investment) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE shares_owned = shares_owned + VALUES(shares_owned), total_investment = total_investment + VALUES(total_investment)");
    if (!$stmt) {
        return ["status" => "error", "message" => "Database error: " . $conn->error];
    }
    $stmt->bind_param("iiid", $userId, $stockId, $quantity, $totalCost);
    if ($stmt->execute()) {
        return ["status" => "success", "message" => "Stock bought successfully."];
    } else {
        return ["status" => "error", "message" => "Failed to update portfolio: " . $stmt->error];
    }
}

function sellStock($userId, $stockId, $quantity, $currentPrice, $limitPrice = null) {
    global $conn;

    // Determine the price at which to sell
    $sell_price = $limitPrice ? $limitPrice : $currentPrice;

    // Calculate total revenue and fees
    $totalRevenue = $quantity * $sell_price;
    $fee = max(9.99, min(59.99, 4.95 + 0.0025 * $totalRevenue));
    $totalRevenueAfterFee = $totalRevenue - $fee;

    // Check if user owns enough shares
    $stmt = $conn->prepare("SELECT shares_owned FROM portfolio WHERE user_id = ? AND stock_id = ?");
    $stmt->bind_param("ii", $userId, $stockId);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows === 0) {
        return ["status" => "error", "message" => "Stock not found in portfolio."];
    }
    $portfolio = $result->fetch_assoc();
    if ($portfolio['shares_owned'] < $quantity) {
        return ["status" => "error", "message" => "Insufficient shares."];
    }

    // If it's a limit order, store it and return
    if ($limitPrice) {
        $stmt = $conn->prepare("INSERT INTO limit_orders (user_id, stock_id, quantity, limit_price, type) VALUES (?, ?, ?, ?, 'sell')");
        if (!$stmt) {
            return ["status" => "error", "message" => "Database error: " . $conn->error];
        }
        $stmt->bind_param("iiid", $userId, $stockId, $quantity, $limitPrice);
        if ($stmt->execute()) {
            return ["status" => "success", "message" => "Limit order placed successfully."];
        } else {
            return ["status" => "error", "message" => "Failed to place limit order: " . $stmt->error];
        }
    }

    // Update user's balance
    $stmt = $conn->prepare("UPDATE users SET balance = balance + ? WHERE id = ?");
    $stmt->bind_param("di", $totalRevenueAfterFee, $userId);
    if (!$stmt->execute()) {
        return ["status" => "error", "message" => "Failed to update balance: " . $stmt->error];
    }

    // Add shares back to stock
    $stmt = $conn->prepare("UPDATE stocks SET total_shares = total_shares + ? WHERE id = ?");
    $stmt->bind_param("ii", $quantity, $stockId);
    if (!$stmt->execute()) {
        return ["status" => "error", "message" => "Failed to update stock shares: " . $stmt->error];
    }

    // Insert transaction
    $stmt = $conn->prepare("INSERT INTO transactions (user_id, stock_id, transaction_type, shares, price_per_share, total_cost) VALUES (?, ?, 'SELL', ?, ?, ?)");
    if (!$stmt) {
        return ["status" => "error", "message" => "Database error: " . $conn->error];
    }
    $stmt->bind_param("iiidd", $userId, $stockId, $quantity, $sell_price, $totalRevenueAfterFee);
    if (!$stmt->execute()) {
        return ["status" => "error", "message" => "Failed to record transaction: " . $stmt->error];
    }

    // Update portfolio
    $newSharesOwned = $portfolio['shares_owned'] - $quantity;
    if ($newSharesOwned > 0) {
        $stmt = $conn->prepare("UPDATE portfolio SET shares_owned = ?, total_investment = total_investment - ? WHERE user_id = ? AND stock_id = ?");
        $stmt->bind_param("idii", $newSharesOwned, $totalRevenue, $userId, $stockId);
    } else {
        $stmt = $conn->prepare("DELETE FROM portfolio WHERE user_id = ? AND stock_id = ?");
        $stmt->bind_param("ii", $userId, $stockId);
    }
    if ($stmt->execute()) {
        return ["status" => "success", "message" => "Stock sold successfully."];
    } else {
        return ["status" => "error", "message" => "Failed to update portfolio: " . $stmt->error];
    }
}

function getStockDetails($stockId) {
    global $conn;

    $stmt = $conn->prepare("SELECT DATE(t.created_at) AS date, t.price_per_share AS price, t.shares AS volume, 
                            MIN(t.price_per_share) OVER (PARTITION BY DATE(t.created_at)) AS daily_low, 
                            MAX(t.price_per_share) OVER (PARTITION BY DATE(t.created_at)) AS daily_high
                            FROM transactions t
                            WHERE t.stock_id = ?
                            AND t.created_at >= DATE_SUB(CURDATE(), INTERVAL 10 DAY)
                            ORDER BY t.created_at DESC");
    if (!$stmt) {
        return ["status" => "error", "message" => "Database error: " . $conn->error];
    }

    $stmt->bind_param("i", $stockId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $stockDetails = [];
        while ($row = $result->fetch_assoc()) {
            $row['daily_range'] = $row['daily_low'] . ' - ' . $row['daily_high'];
            unset($row['daily_low'], $row['daily_high']);
            $stockDetails[] = $row;
        }
        return ["status" => "success", "data" => $stockDetails];
    } else {
        return ["status" => "error", "message" => "No data available for the last ten days."];
    }
}

?>

