import { Hono } from "hono";
import { pizzasCollection } from "../data";

const pizzasEndpoint = new Hono();

pizzasEndpoint.get("/:id", (c) => {
  const id = parseInt(c.req.param('id'));
  const pizza = pizzasCollection.find((element) => element.id === id);
  return c.json({ pizza });
  //return c.json({ pizza: { id: Number.parseInt(id) } }); // à remplacer par la vraie pizza issue du tableau pizzasCollection
});

pizzasEndpoint.get("/", (c) => {
  const query = c.req.query();
  console.log(query); //retourne un objet avec pour chaque variable dans l'URL, une clé dans l'objet du même nom

  const basePizza = query.base; //accès direct à la clé base (si elle existe)
  console.log(basePizza);

  const { base, price } = c.req.query(); //création dynamique d'une variable base, par destructuration de l'objet retourné par c.req.query()
  console.log(base);

  let pizzas = pizzasCollection;

  if(base){
     pizzas = pizzas.filter(p=>p.base===base);
  }

  if(price){
    const priceNumber = Number(price);
    pizzas = pizzas.filter(p=>p.price===priceNumber);
  }

  return c.json({ pizzas });
});

export default pizzasEndpoint;
