-- for create database on thie project

CREATE DATABASE Project_01 ;

USE Project_01;

CREATE TABLE stock (
	id INT AUTO_INCREMENT,
    product_name VARCHAR(255),
    stock_left INT,
    category VARCHAR(255),
    PRIMARY KEY (id)
);

INSERT INTO stock (product_name,stock_left,category) VALUES 
("Lamb - Rack",15,"Raw-product"),
("Red Currants",76,"Vegetable"),
("Chicken - Breast, 5 - 7 Oz",99,"Raw-product"),
("Nut - Pine Nuts, Whole",16,"Grain"),
("Initation Crab Meat",82,"Raw-product"),
("Longan",72,"Fruit"),
("Alize Sunset",59,"Beverage"),
("Snapple - Mango Maddness",39,"Beverage"),
("Beer - Sleeman Fine Porter",83,"Beverage"),
("Mushroom - Chantrelle, Fresh",32,"Vegetable"),
("Beef Flat Iron Steak",31,"Meal"),
("Miso - Soy Bean Paste",26,"Seasoning"),
("Curry Powder",47,"Seasoning"),
("Pasta - Agnolotti - Butternut",34,"General-product"),
("Fenngreek Seed",52,"Seed"),
("Kolrabi",26,"Vegetable"),
("Langers - Cranberry Cocktail",87,"Beverage"),
("Beef - Shank",23,"Meal"),
("Bread - Bagels, Mini",10,"Bread"),
("Cheese - Cambozola",93,"Food"); 


