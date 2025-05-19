"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const product_model_1 = require("../models/product.model");
exports.ProductController = {
    async create(req, res, next) {
        try {
            if (!req.body || Object.keys(req.body).length === 0) {
                res
                    .status(400)
                    .json({ error: "El cuerpo de la petición no puede estar vacío." });
                return;
            }
            const { name, image, price, description, quantity } = req.body;
            if (!name ||
                !image ||
                price == null ||
                !description ||
                quantity == null) {
                res.status(400).json({
                    error: "Faltan campos requeridos",
                });
                return;
            }
            const product = await product_model_1.Product.create(req.body);
            res.status(201).json(product);
        }
        catch (err) {
            next(err);
        }
    },
    async getAll(_req, res, next) {
        try {
            const products = await product_model_1.Product.findAll();
            if (products.length === 0) {
                res.status(404).json({ error: "No hay productos registrados." });
                return;
            }
            res.json(products);
        }
        catch (err) {
            next(err);
        }
    },
    async get(req, res, next) {
        try {
            const product = await product_model_1.Product.findByPk(req.params.id);
            if (!product) {
                res.status(404).json({ error: "Producto no encontrado." });
                return;
            }
            res.json(product);
        }
        catch (err) {
            next(err);
        }
    },
    async update(req, res, next) {
        try {
            const product = await product_model_1.Product.findByPk(req.params.id);
            if (!product) {
                res.status(404).json({ error: "Producto no encontrado." });
                return;
            }
            const updated = await product.update(req.body);
            res.json(updated);
        }
        catch (err) {
            next(err);
        }
    },
    async remove(req, res, next) {
        try {
            const deleted = await product_model_1.Product.destroy({ where: { id: req.params.id } });
            if (!deleted) {
                res.status(404).json({ error: "Producto no encontrado." });
                return;
            }
            res.sendStatus(204);
        }
        catch (err) {
            next(err);
        }
    },
};
