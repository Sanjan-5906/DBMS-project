-- ==========================================================
-- BANKING MANAGEMENT SYSTEM - UPDATED DATASET (GOLDEN THEME)
-- ==========================================================

DROP DATABASE IF EXISTS banking_management_system;
CREATE DATABASE banking_management_system;
USE banking_management_system;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `Audit_Logs`;
DROP TABLE IF EXISTS `Users`;
DROP TABLE IF EXISTS `Cards`;
DROP TABLE IF EXISTS `Transactions`;
DROP TABLE IF EXISTS `Loan`;
DROP TABLE IF EXISTS `Employee`;
DROP TABLE IF EXISTS `Account`;
DROP TABLE IF EXISTS `Customer`;
DROP TABLE IF EXISTS `Branch`;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE `Branch` (
    branch_id INT AUTO_INCREMENT PRIMARY KEY,
    branch_name VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `Customer` (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address VARCHAR(255) NOT NULL,
    email VARCHAR(100),
    dob DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uk_customer_phone (phone),
    UNIQUE KEY uk_customer_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `Users` (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'employee', 'customer') DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `Account` (
    account_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    branch_id INT NOT NULL,
    account_type ENUM('Savings', 'Current', 'Salary', 'Fixed Deposit') NOT NULL,
    balance DECIMAL(15, 2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES Customer(customer_id),
    FOREIGN KEY (branch_id) REFERENCES Branch(branch_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `Transactions` (
    transaction_id INT AUTO_INCREMENT PRIMARY KEY,
    account_id INT NOT NULL,
    transaction_type ENUM('deposit', 'withdrawal', 'transfer', 'wire') NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (account_id) REFERENCES Account(account_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Data
INSERT INTO Branch (branch_name, location) VALUES 
('Golden Plaza', 'San Francisco'),
('Royal Heights', 'Dubai'),
('Elite Harbor', 'Singapore');

INSERT INTO Customer (name, phone, address, email, dob) VALUES
('Sanjan-5906', '987-6543', '789 Gold St', 'sanjan@royalbank.com', '1995-08-22'),
('Siddharth Rao', '987-0001', '123 Elite Ave', 'sid@elite.com', '1988-12-10'),
('Priya Sharma', '987-0002', '456 Royal Rd', 'priya@sharma.io', '1993-04-05');

INSERT INTO Users (username, password_hash, role) VALUES 
('admin', 'admin', 'admin'); -- Note: The app expects plain 'admin' for demo login based on login.tsx

INSERT INTO Account (customer_id, branch_id, account_type, balance) VALUES 
(1, 1, 'Savings', 1250000.00),
(1, 1, 'Current', 450000.75),
(2, 2, 'Salary', 890000.00),
(3, 3, 'Fixed Deposit', 2500000.00);

INSERT INTO Transactions (account_id, transaction_type, amount) VALUES 
(1, 'deposit', 50000.00),
(1, 'withdrawal', 5000.00),
(2, 'deposit', 120000.00),
(3, 'deposit', 75000.00),
(4, 'deposit', 500000.00);
