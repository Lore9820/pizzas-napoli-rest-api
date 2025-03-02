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
export async function createSchema() {
  let db;

  try {
    const sqlSchemaFile = Bun.file("src/db/sql/01-schema.sql");
    const sql = await sqlSchemaFile.text();
    db = connectDatabase();
    db.exec(sql);
  } catch (error) {
    console.error(error);
  } finally {
    if (db) db.close();
  }
}

//remplissage de la base de données
export async function seedData() {
  let db;

  try {
    const sqlDataFile = Bun.file("src/db/sql/02-data.sql");
    const sql = await sqlDataFile.text();
    db = connectDatabase();
    db.exec(sql);
  } catch (error) {
    console.error(error);
  } finally {
    if (db) db.close();
  }
}
