import { Hono } from "hono";
import { connectDatabase, createSchema, seedData } from "./db/database";
import pizzasEndpoint from "./routes/pizzasEndpoint";
import ordersEndpoint from "./routes/ordersEndpoint";
import customersEndpoint from "./routes/customersEndpoint";

const app = new Hono();

app.get("/", (c) => {
  return c.json({ message: "Pizzas Napoli REST API" });
});

app.route("/pizzas", pizzasEndpoint);
app.route("/orders", ordersEndpoint);
app.route("/customers", customersEndpoint);

export default app;
