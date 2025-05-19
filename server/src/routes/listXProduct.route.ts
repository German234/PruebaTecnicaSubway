import { Router } from "express";
import { ListxProductController } from "../controllers/listXProduct.controller";

const router = Router();

router
  .route("/")
  .get(ListxProductController.getAll)
  .put(ListxProductController.setBought)

router.route("/:id")

.post(ListxProductController.create)
.delete(ListxProductController.delete);

router
  .route("/list/:listId/product/:productId")
  .delete(ListxProductController.deleteByListIdAndProductID);

export default router;
