import { Router } from "express";
import { ProductController } from "../controllers/product.controller";

const router = Router();

router.route("/").get(ProductController.getAll).post(ProductController.create);

router
  .route("/:id")
  .get(ProductController.get)
  .put(ProductController.update)
  .delete(ProductController.remove);

export default router;  
