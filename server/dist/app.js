"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const mainRouter_1 = __importDefault(require("./routes/mainRouter"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api", mainRouter_1.default);
async function start() {
    try {
        await database_1.sequelize.authenticate();
        console.log("Conectado a la BD");
        await database_1.sequelize.sync({ alter: true });
        app.listen(process.env.PORT, () => console.log(` Server en http://localhost:${process.env.PORT}`));
    }
    catch (err) {
        console.error("Error al iniciar:", err);
    }
}
start();
