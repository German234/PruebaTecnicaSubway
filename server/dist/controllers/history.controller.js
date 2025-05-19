"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoryController = void 0;
const history_model_1 = require("../models/history.model");
const product_model_1 = require("../models/product.model");
exports.HistoryController = {
    async create(req, res, next) {
        const t = await history_model_1.History.sequelize.transaction();
        try {
            if (!req.body || Object.keys(req.body).length === 0) {
                await t.rollback();
                res
                    .status(400)
                    .json({ error: "El cuerpo de la petición no puede estar vacío." });
                return;
            }
            const { productId, quantity_sold } = req.body;
            if (!productId || quantity_sold == null) {
                await t.rollback();
                res.status(400).json({ error: "Faltan campos requeridos" });
                return;
            }
            const product = await product_model_1.Product.findByPk(productId, { transaction: t });
            if (!product) {
                await t.rollback();
                res.status(404).json({ error: `Producto no encontrado.` });
                return;
            }
            if (product.quantity < quantity_sold) {
                await t.rollback();
                res.status(400).json({ error: "Stock insuficiente para esa venta." });
                return;
            }
            const history = await history_model_1.History.create(req.body, { transaction: t });
            await product.decrement("quantity", {
                by: quantity_sold,
                transaction: t,
            });
            await t.commit();
            res.status(201).json(history);
        }
        catch (err) {
            await t.rollback();
            next(err);
        }
    },
    async getAll(_req, res, next) {
        try {
            const histories = await history_model_1.History.findAll();
            if (histories.length === 0) {
                res.status(404).json({ error: "No hay historiales registrados." });
                return;
            }
            res.json(histories);
        }
        catch (err) {
            next(err);
        }
    },
    async get(req, res, next) {
        try {
            const history = await history_model_1.History.findByPk(req.params.id);
            if (!history) {
                res.status(404).json({ error: `Historial no encontrado.` });
                return;
            }
            res.json(history);
        }
        catch (err) {
            next(err);
        }
    },
    async getAllByProductId(req, res, next) {
        try {
            const productId = req.params.productId;
            const histories = await history_model_1.History.findAll({
                where: { productId: productId },
                attributes: { exclude: ["productId"] },
                include: [
                    {
                        model: product_model_1.Product,
                        attributes: ["name", "image", "price", "description", "quantity"],
                    },
                ],
                order: [["createdAt", "DESC"]],
            });
            if (histories.length === 0) {
                res.status(404).json({
                    error: `No se encontraron historiales para ese producto`,
                });
                return;
            }
            res.json(histories);
        }
        catch (err) {
            next(err);
        }
    },
    async update(req, res, next) {
        try {
            const history = await history_model_1.History.findByPk(req.params.id);
            if (!history) {
                res.status(404).json({ error: `Historial no encontrado.` });
                return;
            }
            const updated = await history.update(req.body);
            res.json(updated);
        }
        catch (err) {
            next(err);
        }
    },
    async remove(req, res, next) {
        try {
            const deleted = await history_model_1.History.destroy({ where: { id: req.params.id } });
            if (!deleted) {
                res.status(404).json({ error: `Historial no encontrado.` });
                return;
            }
            res.status(204).json({ mensaje: `Historial no encontrado.` });
        }
        catch (err) {
            next(err);
        }
    },
};
