"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const history_controller_1 = require("../controllers/history.controller");
const router = (0, express_1.Router)();
router.route("/").get(history_controller_1.HistoryController.getAll).post(history_controller_1.HistoryController.create);
router
    .route("/:id")
    .get(history_controller_1.HistoryController.get)
    .put(history_controller_1.HistoryController.update)
    .delete(history_controller_1.HistoryController.remove);
router.route("/product/:productId").get(history_controller_1.HistoryController.getAllByProductId);
exports.default = router;
