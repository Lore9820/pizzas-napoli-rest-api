import { Hono } from "hono";
import { pizzasCollection } from "../data";
import { HTTPException } from "hono/http-exception";

const pizzasEndpoint = new Hono();

pizzasEndpoint.get("/:id", (c) => {
  const id: number = parseInt(c.req.param("id"));

  //si la conversion de l'id ne permet pas d'obtenir un nombre (undefined, null ou NaN)
  if (!id) {
    //on déclenche une exception qui sera convertie en réponse HTTP avec le code 400
    throw new HTTPException(400);
  }

  //récupère l'id dans le path de l'URI
  //on convertit l'id en nombre
  const pizza = pizzasCollection.find((p) => p.id === id);
  //on cherche la pizza dont l'id est égal au paramètre id récupéré

  return c.json({ pizza });
});

pizzasEndpoint.get("/", (c) => {
  const { base, price } = c.req.query(); //création dynamique d'une variable base, par destructuration de l'objet retourné par c.req.query()

  let pizzas = pizzasCollection;

  if (base) {
    pizzas = pizzas.filter((p) => p.base === base);
  }


  if (price) {
    const priceNumber = Number(price);
    pizzas = pizzas.filter((p) => p.price === priceNumber);
  }

  return c.json({ pizzas });
});

export default pizzasEndpoint;
