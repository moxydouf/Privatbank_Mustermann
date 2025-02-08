-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 07, 2025 at 11:04 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bank_game`
--

-- --------------------------------------------------------

--
-- Table structure for table `game_events`
--

CREATE TABLE `game_events` (
  `id` int(11) NOT NULL,
  `event_type` enum('BULL_MARKET','BEAR_MARKET','CRASH') NOT NULL,
  `stock_id` int(11) NOT NULL,
  `change_percentage` decimal(5,2) NOT NULL,
  `event_timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `limit_orders`
--

CREATE TABLE `limit_orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `stock_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `limit_price` decimal(10,2) NOT NULL,
  `type` enum('buy','sell') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `portfolio`
--

CREATE TABLE `portfolio` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `stock_id` int(11) NOT NULL,
  `shares_owned` int(11) NOT NULL CHECK (`shares_owned` >= 0),
  `total_investment` decimal(12,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `portfolio`
--

INSERT INTO `portfolio` (`id`, `user_id`, `stock_id`, `shares_owned`, `total_investment`) VALUES
(1, 1, 2, 10, 860.00),
(2, 2, 3, 1, 610.00),
(3, 2, 2, 11, 1089.00),
(4, 2, 3, 1, 970.00),
(5, 2, 2, 15, 1320.00),
(6, 2, 2, 11, 1100.00),
(7, 2, 3, 1, -826.00),
(8, 2, 2, 1, 50.00),
(9, 2, 2, 15, 1125.00),
(10, 2, 3, 1, -760.00),
(11, 2, 2, 1, 70.00),
(12, 2, 3, 1, -370.00),
(13, 2, 5, 15, 300.00),
(14, 2, 3, 1, 900.00);

-- --------------------------------------------------------

--
-- Table structure for table `stocks`
--

CREATE TABLE `stocks` (
  `id` int(11) NOT NULL,
  `company_name` varchar(100) NOT NULL,
  `ticker_symbol` varchar(10) NOT NULL,
  `bid_price` decimal(10,2) NOT NULL,
  `ask_price` decimal(10,2) NOT NULL,
  `total_shares` int(11) NOT NULL DEFAULT 0,
  `last_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stocks`
--

INSERT INTO `stocks` (`id`, `company_name`, `ticker_symbol`, `bid_price`, `ask_price`, `total_shares`, `last_updated`) VALUES
(2, 'Mustermann AG', 'MUST', 99.00, 100.00, 9916, '2025-02-05 20:52:48'),
(3, 'Finance Solutions', 'FIN', 120.00, 121.50, 5956, '2025-02-06 14:58:43'),
(4, 'Health Plus Ltd.', 'HEALTH', 200.00, 202.00, 3000, '2025-02-04 22:19:45'),
(5, 'Green Energy Corp.', 'GREEN', 75.00, 76.00, 7985, '2025-02-06 03:59:22'),
(6, 'Tech Innovators Inc.', 'TECH', 150.50, 151.00, 5000, '2025-02-04 22:20:04');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `stock_id` int(11) NOT NULL,
  `transaction_type` enum('BUY','SELL') NOT NULL,
  `shares` int(11) NOT NULL CHECK (`shares` > 0),
  `price_per_share` decimal(10,2) NOT NULL,
  `total_cost` decimal(12,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `user_id`, `stock_id`, `transaction_type`, `shares`, `price_per_share`, `total_cost`, `created_at`) VALUES
(1, 1, 2, 'BUY', 20, 88.00, 1769.99, '2025-02-05 13:41:16'),
(2, 1, 2, 'SELL', 10, 90.00, 890.01, '2025-02-05 13:52:33'),
(3, 2, 3, 'BUY', 12, 120.00, 1449.99, '2025-02-05 14:48:23'),
(4, 2, 2, 'BUY', 11, 99.00, 1098.99, '2025-02-05 19:15:15'),
(5, 2, 3, 'BUY', 15, 120.00, 1809.99, '2025-02-05 20:01:02'),
(6, 2, 2, 'BUY', 15, 88.00, 1329.99, '2025-02-05 20:03:34'),
(7, 2, 2, 'BUY', 11, 100.00, 1109.99, '2025-02-05 20:07:19'),
(8, 2, 3, 'BUY', 2, 2.00, 13.99, '2025-02-05 20:22:14'),
(9, 2, 2, 'BUY', 1, 50.00, 59.99, '2025-02-05 20:23:48'),
(10, 2, 2, 'BUY', 15, 75.00, 1134.99, '2025-02-05 20:24:25'),
(11, 2, 3, 'BUY', 1, 70.00, 79.99, '2025-02-05 20:26:06'),
(12, 2, 2, 'BUY', 1, 70.00, 79.99, '2025-02-05 20:52:48'),
(13, 2, 3, 'SELL', 1, 130.00, 120.01, '2025-02-05 23:30:22'),
(14, 2, 3, 'BUY', 5, 66.00, 339.99, '2025-02-06 03:53:44'),
(15, 2, 5, 'BUY', 15, 20.00, 309.99, '2025-02-06 03:59:22'),
(16, 2, 3, 'BUY', 20, 80.00, 1609.99, '2025-02-06 14:58:17'),
(17, 2, 3, 'SELL', 10, 70.00, 690.01, '2025-02-06 14:58:43');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `date_of_birth` date NOT NULL,
  `postal_code` varchar(5) NOT NULL,
  `balance` decimal(10,2) NOT NULL DEFAULT 50000.00,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `date_of_birth`, `postal_code`, `balance`, `created_at`, `updated_at`) VALUES
(1, 'John Doe', 'john.doe@example.com', '$2y$10$4ma7DmjxjByrAbOInmUgeuRa0NRKLVGsfkP0Hj8D04FF5loaCv9Tm', '1990-01-01', '12345', 47350.03, '2025-02-04 23:08:37', '2025-02-05 13:52:33'),
(2, 'Justice Bajeri', 'jbajeri12@gmail.com', '$2y$10$liML9oKy7bJfl08645CfXOEWPHXlr1P.fC1AAFbz9a4ETjMyGa8sG', '2001-06-21', '00233', 40382.15, '2025-02-04 23:25:03', '2025-02-06 14:58:43');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `game_events`
--
ALTER TABLE `game_events`
  ADD PRIMARY KEY (`id`),
  ADD KEY `stock_id` (`stock_id`);

--
-- Indexes for table `limit_orders`
--
ALTER TABLE `limit_orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `portfolio`
--
ALTER TABLE `portfolio`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `stock_id` (`stock_id`);

--
-- Indexes for table `stocks`
--
ALTER TABLE `stocks`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ticker_symbol` (`ticker_symbol`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `stock_id` (`stock_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `game_events`
--
ALTER TABLE `game_events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `limit_orders`
--
ALTER TABLE `limit_orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `portfolio`
--
ALTER TABLE `portfolio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `stocks`
--
ALTER TABLE `stocks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `game_events`
--
ALTER TABLE `game_events`
  ADD CONSTRAINT `game_events_ibfk_1` FOREIGN KEY (`stock_id`) REFERENCES `stocks` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `portfolio`
--
ALTER TABLE `portfolio`
  ADD CONSTRAINT `portfolio_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `portfolio_ibfk_2` FOREIGN KEY (`stock_id`) REFERENCES `stocks` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `transactions_ibfk_2` FOREIGN KEY (`stock_id`) REFERENCES `stocks` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
