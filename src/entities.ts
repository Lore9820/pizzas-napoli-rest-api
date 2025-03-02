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

export class OrderEntity {
  id: number;
  customer_id: number;
  createdAt: string;
  amount: number;
  status: string;

  constructor(
    id: number,
    customer_id: number,
    createdAt: string,
    amount: number,
    status: string
  ) {
    this.id = id;
    this.customer_id = customer_id;
    this.createdAt = createdAt;
    this.amount = amount;
    this.status = status;
  }
}

export class OrderlineEntity {
  id: number;
  order_id: number;
  pizza_id: number;
  unitPrice: number;
  quantity: number;
  amount: number;

  constructor(
    id: number,
    order_id: number,
    pizza_id: number,
    unitPrice: number,
    quantity: number,
    amount: number
  ) {
    this.id = id;
    this.order_id = order_id;
    this.pizza_id = pizza_id;
    this.unitPrice = unitPrice;
    this.quantity = quantity;
    this.amount = amount;
  }
}

export class CustomerEntity {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  createdAt: string;
  lastSignedInAt: string;

  constructor(
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    createdAt: string,
    lastSignedInAt: string
  ) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.lastSignedInAt = lastSignedInAt
  }
}