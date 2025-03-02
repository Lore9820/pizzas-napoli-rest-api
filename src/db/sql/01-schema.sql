BEGIN TRANSACTION;
CREATE TABLE "pizzas" (
	"pizza_id"	    INTEGER NOT NULL,
	"name"	        TEXT NOT NULL UNIQUE,
	"ingredients"	TEXT NOT NULL,
	"price"	        REAL NOT NULL,
	"base"	        TEXT NOT NULL,
	PRIMARY KEY("pizza_id" AUTOINCREMENT)
);
CREATE TABLE "customers" (
	"customer_id"	INTEGER NOT NULL,
	"firstname"	    TEXT NOT NULL,
	"lastname"	    TEXT NOT NULL,
	"email"	        TEXT NOT NULL UNIQUE,
	"password"	    TEXT NOT NULL,
	"createdAt"	    TEXT,
	"lastSignedInAt" TEXT,
	PRIMARY KEY("customer_id" AUTOINCREMENT)
);
CREATE TABLE "orders" (
	"order_id"	    INTEGER,
	"customer_id"	INTEGER NOT NULL,
	"createdAt"	    TEXT,
	"amount"	    REAL NOT NULL,
	"status"	    TEXT NOT NULL,
	PRIMARY KEY("order_id" AUTOINCREMENT),
	FOREIGN KEY("customer_id") REFERENCES ""
);
CREATE TABLE "orderlines" (
	"line_id"	    INTEGER,
	"order_id"	    INTEGER NOT NULL,
	"pizza_id"	    INTEGER NOT NULL,
	"unitprice"	    REAL NOT NULL,
	"quantity"	    INTEGER NOT NULL,
    "amount"        REAL NOT NULL,
    PRIMARY KEY("line_id", "order_id"),
	FOREIGN KEY("order_id") REFERENCES "",
    FOREIGN KEY("pizza_id") REFERENCES ""
);
COMMIT;