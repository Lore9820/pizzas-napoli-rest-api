import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { connectDatabase } from "../db_old/database";
import { OrderEntity } from "../entities";

const route = new Hono();

// Pour obtenir tous les orders
route.get("/", (c) => {
  try {
    const db = connectDatabase();
    const { customer_id, status } = c.req.query();
    
    let query;
    if (customer_id) {
      query = db.query("SELECT * FROM orders WHERE customer_id = ?").as(OrderEntity);
      const result = query.all(customer_id);
      return c.json({ orders: result }, 200);
    } else if (status) {
      query = db.query("SELECT * FROM orders WHERE status = ?").as(OrderEntity);
      const result = query.all(status);
      return c.json({ orders: result }, 200);
    } else {
      query = db.query("SELECT * FROM orders").as(OrderEntity);
      const result = query.all();
      return c.json({ orders: result }, 200);
    }
  } catch (error) {
    console.error(error);
    throw new HTTPException(500);
  }
});

// pour obtenir l'order avec un certain id
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

    const query = db.query("SELECT * FROM orders WHERE id = ?").as(OrderEntity);
    const result = query.get(id);

    return c.json({ order : result }, 200);

  } catch (error) {
    console.error(error);
    throw new HTTPException(500);
  }
});

// pour créer un nouveau order
route.post("/", async (c) => {
  try {
    const db = connectDatabase();
    const body = await c.req.json();

    const customer_id = parseInt(body.customer_id);
    const amount = Number(body.amount);

    if (!customer_id || !amount || !Array.isArray(body.orderlines) || body.orderlines.length === 0) {
      throw new HTTPException(400, { message: "Missing required fields or invalid orderlines" });
    }

    db.query("BEGIN TRANSACTION").run();

    try {
      const orderQuery = db.query(
        "INSERT INTO orders (customer_id, amount, status) VALUES (?, ?, 'PENDING')"
      );
      const orderResult = orderQuery.run(customer_id, amount);

      // Insert orderlines
      const orderlineQuery = db.query(
        "INSERT INTO orderlines (order_id, pizza_id, unit_price, quantity, amount) VALUES (?, ?, ?, ?, ?)"
      );

      for (const line of body.orderlines) {
        orderlineQuery.run(
          orderResult.lastInsertRowid,
          line.pizza_id,
          line.unitPrice,
          line.quantity,
          line.amount
        );
      }

      db.query("COMMIT").run();

      if (orderResult.lastInsertRowid) {
        const newOrder = db.query("SELECT * FROM orders WHERE id = ?")
          .as(OrderEntity)
          .get(orderResult.lastInsertRowid);

        // Add Location header with the new resource URI
        c.header('Location', `/orders/${orderResult.lastInsertRowid}`);
        return c.json({ order: newOrder }, 201);
      }

      throw new HTTPException(500);
    } catch (error) {
      db.query("ROLLBACK").run();
      throw error;
    }
  } catch (error) {
    console.error(error);
    throw new HTTPException(500);
  }
});

export default route;