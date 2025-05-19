import { NextFunction, Request, Response } from "express";
import { Product } from "../models/product.model";

export const ProductController = {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.body || Object.keys(req.body).length === 0) {
        res
          .status(400)
          .json({ error: "El cuerpo de la petición no puede estar vacío." });
        return;
      }

      const { name, image, price, description, stock } = req.body;

      if (!name || !image || price == null || !description || stock == null) {
        res.status(400).json({
          error: "Faltan campos requeridos",
        });
        return;
      }

      const product = await Product.create(req.body);
      res.status(201).json({
        message: "Producto creado correctamente"});
    } catch (err) {
      next(err);
      console.log(err);
    }
  },

  async getAll(
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const products = await Product.findAll();
      if (products.length === 0) {
        res.status(404).json({ error: "No hay productos registrados." });
        return;
      }
      res.json(products);
    } catch (err) {
      next(err);
    }
  },

  async get(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) {
        res.status(404).json({ error: "Producto no encontrado." });
        return;
      }
      res.json(product);
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) {
        res.status(404).json({ error: "Producto no encontrado." });
        return;
      }
      const updated = await product.update(req.body);
      res.json({"message": "Producto actualizado correctamente"});
    } catch (err) {
      next(err);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const deleted = await Product.destroy({ where: { id: req.params.id } });
      if (!deleted) {
        res.status(404).json({ error: "Producto no encontrado." });
        return;
      }
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  },
};
