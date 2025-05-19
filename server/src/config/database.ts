import { Sequelize } from "sequelize-typescript";
import { Product } from "../models/product.model";
import dotenv from "dotenv";
import { List } from "../models/list.model";
import { ListXProduct } from "../models/listXProduct.model";
dotenv.config();

export const sequelize = new Sequelize({
  dialect: "mssql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  models: [Product, List, ListXProduct],
  dialectOptions: {
    options: { encrypt: false },
  },
  logging: false,
});
