export type Pizza = {
  id: number;
  name: string;
  ingredients: string[];
  price: number;

  base: "Nature" | "Tomate" | "Crème";
};
