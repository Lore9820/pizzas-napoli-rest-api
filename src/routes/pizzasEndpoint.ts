import { Hono } from "hono";
//import { pizzasCollection } from "../data";
import { HTTPException } from "hono/http-exception";
import { Database } from "bun:sqlite";
import type { Pizza } from "../types";
import { connectDatabase } from "../db/database";

const pizzasEndpoint = new Hono();
const dbPath = "./pizzas-napoli.db";

pizzasEndpoint.get("/:id", (c) => {
  //récupère l'id dans le path de l'URI
  //on convertit l'id en nombre
  const id: number = parseInt(c.req.param("id"));

  //si la conversion de l'id ne permet pas d'obtenir un nombre (undefined, null ou NaN)
  if (!id) {
    //on déclenche une exception qui sera convertie en réponse HTTP avec le code 400
    throw new HTTPException(400);
  }

  //on cherche la pizza dont l'id est égal au paramètre id récupéré

  try {
    const db = connectDatabase();

    const query = await db.query("SELECT * FROM pizzas").as(Pizza);
    //const pizzas = query.all();
    const pizza_demande = query.find((p:Pizza) => p.id === id);

    return pizza_demande;

  } catch (error) {
    console.error(error);
  }

});

// pizzasEndpoint.get("/", (c) => {
//   const { base, price } = c.req.query(); //création dynamique d'une variable base, par destructuration de l'objet retourné par c.req.query()

//   let pizzas = pizzasCollection;

//   if (base) {
//     pizzas = pizzas.filter((p) => p.base === base);
//   }


//   if (price) {
//     const priceNumber = Number(price);
//     pizzas = pizzas.filter((p) => p.price === priceNumber);
//   }

//   return c.json({ pizzas });
// });

export default pizzasEndpoint;
