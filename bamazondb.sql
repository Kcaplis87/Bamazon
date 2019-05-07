DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("basketball", "sporting goods", 30, 95);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("football", "sporting goods", 25, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("ping pong ball", "sporting goods", 1, 400);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("t-shirt", "clothing", 12, 25);
