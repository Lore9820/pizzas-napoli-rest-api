import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { connectDatabase } from "../db_old/database";
import { PizzaEntity } from "../entities";

const route = new Hono();

// Pour obtenir tous les pizzas
route.get("/", (c) => {
  try {
    const db = connectDatabase();
    const { base, price, name } = c.req.query();
    
    let query;
    if (name) {
      query = db.query("SELECT * FROM pizzas WHERE name LIKE ?").as(PizzaEntity);
      const result = query.all(`%${name}%`);
      return c.json({ pizzas: result }, 200);
    } else if (base && price) {
      query = db.query("SELECT * FROM pizzas WHERE base = ? AND price = ?").as(PizzaEntity);
      const result = query.all(base, price);
      return c.json({ pizzas: result }, 200);
    } else if (base) {
      query = db.query("SELECT * FROM pizzas WHERE base = ?").as(PizzaEntity);
      const result = query.all(base);
      return c.json({ pizzas: result }, 200);
    } else if (price) {
      query = db.query("SELECT * FROM pizzas WHERE price = ?").as(PizzaEntity);
      const result = query.all(price);
      return c.json({ pizzas: result }, 200);
    } else {
      query = db.query("SELECT * FROM pizzas").as(PizzaEntity);
      const result = query.all();
      return c.json({ pizzas: result }, 200);
    }
  } catch (error) {
    console.error(error);
    throw new HTTPException(500);
  }
});

// pour obtenir le pizza avec un certain id
route.get("/:id", async (c) => {
  const id: number = parseInt(c.req.param("id"));
  //const {id} = c.req.param();

  //si la conversion de l'id ne permet pas d'obtenir un nombre (undefined, null ou NaN)
  if (!id) {
    //on déclenche une exception qui sera convertie en réponse HTTP avec le code 400
    throw new HTTPException(400);
  }

  try {
    const db = connectDatabase();

    const query = db.query("SELECT * FROM pizzas WHERE id = ?").as(PizzaEntity);
    const result = query.get(id);
    //const result = query.get(parseInt(id));

    return c.json({ pizza : result }, 200);

  } catch (error) {
    console.error(error);
    throw new HTTPException(500);
  }
});

// pour créer une nouvelle pizza
route.post("/", async (c) => {
  try {
    const db = connectDatabase();
    const body = await c.req.json();

    if (!body.name || !body.base || !body.price || !Array.isArray(body.ingredients)) {
      throw new HTTPException(400, { message: "Missing required fields or ingredients is not an array" });
    }

    // Convertir ingredients array to JSON string
    const ingredientsJson = JSON.stringify(body.ingredients);

    const query = db.query(
      "INSERT INTO pizzas (name, base, price, ingredients) VALUES (?, ?, ?, ?)"
    );
    const result = query.run(body.name, body.base, body.price, ingredientsJson);

    if (result.lastInsertRowid) {
      const newPizza = db.query("SELECT * FROM pizzas WHERE id = ?")
        .as(PizzaEntity)
        .get(result.lastInsertRowid);
      
      // Parse ingredients to array avant d'envoyer la réponse
      if (newPizza && typeof newPizza.ingredients === 'string') {
        (newPizza as any).ingredients = JSON.parse(newPizza.ingredients);
      }

      // Add Location header with the new resource URI
      c.header('Location', `/pizzas/${result.lastInsertRowid}`);
      return c.json({ pizza: newPizza }, 201);
    }

    throw new HTTPException(500);
  } catch (error) {
    console.error(error);
    throw new HTTPException(500);
  }
});

export default route;