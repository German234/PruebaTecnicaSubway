import { Router } from "express";
import productRouter from "./product.route";
import listRouter from "./list.route";
import listDetails from "./listXProduct.route";

const mainRouter = Router();

mainRouter.use("/products", productRouter);

mainRouter.use("/lists", listRouter);

mainRouter.use("/listsDetails", listDetails);

export default mainRouter;
