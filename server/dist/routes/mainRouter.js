"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_route_1 = __importDefault(require("./product.route"));
const history_route_1 = __importDefault(require("./history.route"));
const mainRouter = (0, express_1.Router)();
mainRouter.use("/products", product_route_1.default);
mainRouter.use("/histories", history_route_1.default);
exports.default = mainRouter;
