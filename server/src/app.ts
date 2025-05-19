import express from "express";
import cors from "cors";
import { sequelize } from "./config/database";
import mainRouter from "./routes/mainRouter";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", mainRouter);

async function start() {
  try {
    await sequelize.authenticate();
    console.log("Conectado a la BD");
    await sequelize.sync({ alter: true });
    app.listen(process.env.PORT, () =>
      console.log(` Server en http://localhost:${process.env.PORT}`)
    );
  } catch (err) {
    console.error("Error al iniciar:", err);
  }
}

start();
