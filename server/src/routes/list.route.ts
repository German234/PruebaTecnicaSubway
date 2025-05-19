import { Router } from "express";
import { ListController } from "../controllers/list.controller";

const router = Router();

router.route("/").get(ListController.getAll).post(ListController.create);

router
  .route("/:id")
  .get(ListController.get)
  .put(ListController.update)
  .delete(ListController.remove);


export default router;
