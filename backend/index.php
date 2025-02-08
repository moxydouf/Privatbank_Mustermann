<?php
header('Access-Control-Allow-Origin: *'); // Allow all origins
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS'); // Allow specific HTTP methods
header('Access-Control-Allow-Headers: Content-Type, Authorization'); // Allow specific headers

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once './db.php';
require_once './api/auth.php';
require_once './api/stocks.php';
require_once './api/portfolio.php';
require_once './api/transaction.php';

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Set header to return JSON
header('Content-Type: application/json');

// Get the request method
$method = $_SERVER['REQUEST_METHOD'];
$endpoint = isset($_GET['endpoint']) ? $_GET['endpoint'] : '';

// Decode JSON input
$input = json_decode(file_get_contents('php://input'), true);

// Routing based on endpoint
switch ($endpoint) {
    case 'register':
        if ($method === 'POST') {
            $response = registerUser($input);
            echo json_encode($response);
        } else {
            echo json_encode(["status" => "error", "message" => "Invalid request method. Use POST."]);
        }
        break;

    case 'login':
        if ($method === 'POST') {
            $response = loginUser($input);
            echo json_encode($response);
        } else {
            echo json_encode(["status" => "error", "message" => "Invalid request method. Use POST."]);
        }
        break;
    
    case 'getCurrentUser':
        if ($method === 'POST') {
            $userId = $input['user_id'];
            $response = getCurrentUser($userId);
            echo json_encode($response);
        } else {
            echo json_encode(["status" => "error", "message" => "Invalid request method. Use POST."]);
        }
        break;

    case 'logout':
        if ($method === 'POST') {
            $response = logoutUser();
            echo json_encode($response);
        } else {
            echo json_encode(["status" => "error", "message" => "Invalid request method. Use POST."]);
        }
        break;

    case 'addStock':
        if ($method === 'POST') {
            $response = addStock($input);
            echo json_encode($response);
        } else {
            echo json_encode(["status" => "error", "message" => "Invalid request method. Use POST."]);
        }
        break;

    case 'getAllStocks':
        if ($method === 'GET') {
            $response = getAllStocks();
            echo json_encode($response);
        } else {
            echo json_encode(["status" => "error", "message" => "Invalid request method. Use GET."]);
        }
        break;

    case 'addStockToPortfolio':
        if ($method === 'POST') {
            $response = addStockToPortfolio($input['user_id'], $input['stock_id'], $input['quantity'], $input['avg_buy_price']);
            echo json_encode($response);
        } else {
            echo json_encode(["status" => "error", "message" => "Invalid request method. Use POST."]);
        }
        break;
    
    case 'buyStock':
        if ($method === 'POST') {
            $userId = $input['user_id'];
            $stockId = $input['stock_id'];
            $quantity = $input['quantity'];
            $currentPrice = $input['current_price'];
            $limitPrice = $input['limit_price'] ?? null;
            $response = buyStock($userId, $stockId, $quantity, $currentPrice, $limitPrice);
            echo json_encode($response);
        } else {
            echo json_encode(["status" => "error", "message" => "Invalid request method. Use POST."]);
        }
        break;
        
    case 'sellStock':
        if ($method === 'POST') {
            $userId = $input['user_id'];
            $stockId = $input['stock_id'];
            $quantity = $input['quantity'];
            $currentPrice = $input['current_price'];
            $limitPrice = $input['limit_price'] ?? null;
            $response = sellStock($userId, $stockId, $quantity, $currentPrice, $limitPrice);
            echo json_encode($response);
        } else {
            echo json_encode(["status" => "error", "message" => "Invalid request method. Use POST."]);
        }
        break;
    
    case 'getUserPortfolio':
        if ($method === 'GET') {
            $response = getUserPortfolio($_GET['user_id']);
            echo json_encode($response);
        } else {
            echo json_encode(["status" => "error", "message" => "Invalid request method. Use GET."]);
        }
        break;

    case 'getOrderBook':
        if ($method === 'GET') {
            $response = getOrderBook();
            echo json_encode($response);
        } else {
            echo json_encode(["status" => "error", "message" => "Invalid request method. Use GET."]);
        }
        break;

    case 'getStockDetails':
        if ($method === 'GET') {
            $stockId = isset($_GET['stock_id']) ? intval($_GET['stock_id']) : null;
            if ($stockId) {
                $response = getStockDetails($stockId);
                echo json_encode($response);
            } else {
                echo json_encode(["status" => "error", "message" => "Stock ID is required."]);
            }
        } else {
            echo json_encode(["status" => "error", "message" => "Invalid request method. Use GET."]);
        }
        break;

    case 'getUserFinancialSummary':
        if ($method === 'GET') {
            $userId = isset($_GET['user_id']) ? intval($_GET['user_id']) : null;
            if ($userId) {
                $response = getUserFinancialSummary($userId);
                echo json_encode($response);
            } else {
                echo json_encode(["status" => "error", "message" => "User ID is required."]);
            }
        } else {
            echo json_encode(["status" => "error", "message" => "Invalid request method. Use GET."]);
        }
        break;

    default:
        echo json_encode(["status" => "error", "message" => "Invalid API endpoint."]);
        break;
}

?>
