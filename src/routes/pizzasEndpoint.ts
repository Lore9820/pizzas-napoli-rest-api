import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { connectDatabase } from "../db/database";
import { PizzaEntity } from "../entities";

const route = new Hono();

route.get("/", (c) => {
  try {
    const db = connectDatabase();

    const query = db.query("SELECT * FROM pizzas").as(PizzaEntity);
    const result = query.all();

    return c.json({ pizzas: result }, 200);
  } catch (error) {
    console.error(error);
    throw new HTTPException(500);
  }
});

export default route;