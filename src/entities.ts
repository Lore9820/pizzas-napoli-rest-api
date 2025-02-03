export class PizzaEntity {
  id: number;
  name: string;
  ingredients: string[];
  price: number;
  base: "Nature" | "Tomate" | "Crème";

  constructor(
    id: number,
    name: string,
    ingredients: Array<string> = [],
    price: number,
    base: "Nature" | "Tomate" | "Crème"
  ) {
    this.id = id;
    this.name = name;
    this.ingredients = ingredients;
    this.base = base;
    this.price = price;
  }
}
