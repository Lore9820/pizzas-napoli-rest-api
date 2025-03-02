BEGIN TRANSACTION;
INSERT INTO "pizzas" (pizza_id, name, ingredients, price, base)
VALUES (
        1,
        'Margherita',
        '["mozzarella","basilic"]',
        7.0,
        'Tomate'
    );
INSERT INTO "pizzas" (pizza_id, name, ingredients, price, base)
VALUES (
        2,
        'Marinara',
        '["ail","origan"]',
        6.0,
        'Tomate'
    );
INSERT INTO "pizzas" (pizza_id, name, ingredients, price, base)
VALUES (
        3,
        'Quattro Stagioni',
        '["jambon","mozzarella","champignons","coeurs d''artichaut"]',
        12.0,
        'Tomate'
    );
INSERT INTO "pizzas" (pizza_id, name, ingredients, price, base)
VALUES (
        4,
        'Capricciosa',
        '["jambon","mozzarella","champignons","coeurs d''artichaut","olives"]',
        12.0,
        'Tomate'
    );
INSERT INTO "pizzas" (pizza_id, name, ingredients, price, base)
VALUES (
        5,
        'Boscaiola',
        '["jambon cru","champignons","mozzarella"]',
        12.0,
        'Crème'
    );
INSERT INTO "pizzas" (pizza_id, name, ingredients, price, base)
VALUES (
        6,
        'Rucola',
        '["jambon cru","roquette","mozzarella","parmesan"]',
        12.0,
        'Nature'
    );
INSERT INTO "pizzas" (pizza_id, name, ingredients, price, base)
VALUES (
        7,
        'Jambon',
        '["jambon","mozzarella"]',
        8.0,
        'Tomate'
    );
INSERT INTO "pizzas" (pizza_id, name, ingredients, price, base)
VALUES (
        8,
        'Reine',
        '["jambon","champignons","mozzarella"]',
        10.0,
        'Tomate'
    );
INSERT INTO "customers"
VALUES (
        1,
        'John',
        'Doe',
        'johnny22@gmail.com',
        'password',
        '2021-01-01 12:02:33',
        '2021-01-03 12:02:40'
    );
INSERT INTO "customers"
VALUES (
        2,
        'Jane',
        'Hero',
        'jane.hero@outlook.fr',
        '12345',
        '2021-07-06 17:02:33',
        '2022-01-03 12:02:40'
    );
INSERT INTO "orders"
VALUES (
        1,
        1,
        '2021-01-01 12:02:35',
        7.0,
        'En cours'
    );
INSERT INTO "orderlines"
VALUES (
        1,
        1, 
        1, 
        7.0, 
        1, 
        7.0
    );
INSERT INTO "orders"
VALUES (
        2,
        1,
        '2021-07-06 18:02:35',
        12.0,
        'Livre'
    );
INSERT INTO "orderlines"
VALUES (
        1,
        2, 
        3, 
        12.0, 
        1, 
        12.0
    );
INSERT INTO "orders"
VALUES (
        3,
        2,
        '2021-07-08 19:02:35',
        26.0,
        'Livre'
    );
INSERT INTO "orderlines"
VALUES (
        1,
        3, 
        1, 
        7.0, 
        2, 
        14.0
    );
INSERT INTO "orderlines"
VALUES (
        2,
        3, 
        3, 
        12.0, 
        1, 
        12.0
    );
COMMIT;