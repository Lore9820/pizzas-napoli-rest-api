import { Hono } from "hono";
import { connectDatabase, createSchema, seedData } from "./db/database";

import pizzasEndpoint from "./routes/pizzasEndpoint";

const app = new Hono();

const db = connectDatabase();
//penser à créer les tables de données et les remplir (cf. README.md)

app.get("/", (c) => {
  return c.json({ message: "Pizzas Napoli REST API" });
});

app.route("/pizzas", pizzasEndpoint);

export default app;
