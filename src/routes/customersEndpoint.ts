import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { connectDatabase } from "../db_old/database";
import { CustomerEntity } from "../entities";

const route = new Hono();
