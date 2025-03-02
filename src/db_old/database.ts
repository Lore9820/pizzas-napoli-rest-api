import { Database } from "bun:sqlite";
const dbPath = "./pizzas-napoli.db";

//connexion à la base de données
export function connectDatabase(): Database {
  try {
    return new Database(dbPath);
  } catch (error) {
    console.error(error);
    throw "Can't connect database";
  }
}

//création des tables de données
export function createSchema() {
  let db;

  const sql = `
        CREATE TABLE IF NOT EXISTS pizzas(
            id integer PRIMARY KEY NOT NULL,
            name text,
            price real,
            ingredients blob,
            base text
        )`;

  try {
    db = new Database(dbPath);
    db.exec(sql);
  } catch (error) {
    console.error(error);
  } finally {
    if (db) db.close();
  }
}

//remplissage de la base de données
export function seedData() {
  let db;

  const sql = `
    INSERT INTO "main"."pizzas" ("id", "name", "price", "ingredients", "base") VALUES ('1', 'Margherita', '7.0', '["mozzarella","basilic"]', 'Tomate');
    INSERT INTO "main"."pizzas" ("id", "name", "price", "ingredients", "base") VALUES ('2', 'Marinara', '6.0', '["ail","origan"]', 'Tomate');
    INSERT INTO "main"."pizzas" ("id", "name", "price", "ingredients", "base") VALUES ('3', 'Quattro Stagioni', '12.0', '["jambon","mozzarella","champignons","coeurs d''artichaut"]', 'Tomate');
    INSERT INTO "main"."pizzas" ("id", "name", "price", "ingredients", "base") VALUES ('4', 'Quattro Stagioni', '12.0', '["jambon","mozzarella","champignons","coeurs d''artichaut","olives"]', 'Tomate');
    INSERT INTO "main"."pizzas" ("id", "name", "price", "ingredients", "base") VALUES ('5', 'Boscaiola', '12.0', '["jambon cru","champignons","mozzarella"]', 'Crème');
    INSERT INTO "main"."pizzas" ("id", "name", "price", "ingredients", "base") VALUES ('6', 'Rucola', '12.0', '["jambon cru","roquette","mozzarella","parmesan"]', 'Nature');
    `;

  try {
    db = new Database(dbPath);
    db.exec(sql);
  } catch (error) {
    console.error(error);
  } finally {
    if (db) db.close();
  }
}
