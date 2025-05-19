import { NextFunction, Request, Response } from "express";
import { List } from "../models/list.model";
import { Product } from "../models/product.model";
import { ListXProduct } from "../models/listXProduct.model";

export const ListController = {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.body || Object.keys(req.body).length === 0) {
        res
          .status(400)
          .json({ error: "El cuerpo de la petición no puede estar vacío." });
        return;
      }

      const { total_sold, name } = req.body;

      if (!total_sold && total_sold !== 0 && !name) {
        res.status(400).json({
          error: "Faltan campos requeridos",
        });
        return;
      }
      const list = await List.create(req.body);
      res.status(201).json({
        message: "Lista creada correctamente",
      });
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
      const histories = await List.findAll({
        attributes: ["id", "total_sold", "name", "createdAt"],
      });
      if (histories.length === 0) {
        res.status(404).json({ error: "No hay Listas registradas." });
        return;
      }
      res.json(histories);
    } catch (err) {
      next(err);
    }
  },

  async get(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const list = await List.findByPk(req.params.id, {
        attributes: [ "id", "total_sold", "name"],
        include: [
          {
            model: ListXProduct,
            attributes: ["id", "quantity_sold", "totalProduct", "isBought"],
            include: [
              {
                model: Product,
                attributes: ["id","name", "image"],
              },
            ],
          },
        ],
      });

      if (!list) {
        res.status(404).json({ error: "Lista no encontrada." });
        return;
      }

      const products = (list.listXProduct || []) as ListXProduct[];
      const totalProducts = products.length;
      const totalBought = products.filter(p => p.isBought).length;

      list.setDataValue("totalProducts", totalProducts);
      list.setDataValue("totalBought", totalBought);

      res.json(list);
    } catch (err) {
      next(err);
    }
  },


  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const list = await List.findByPk(req.params.id);
      if (!list) {
        res.status(404).json({ error: `Lista no encontrada.` });
        return;
      }
      const updated = await list.update(req.body);
      res.json(updated);
    } catch (err) {
      next(err);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const deleted = await List.destroy({ where: { id: req.params.id } });
      if (!deleted) {
        res.status(404).json({ error: `Lista no encontrada.` });
        return;
      }
      res.status(204).json({ mensaje: `Lista no encontrada.` });
    } catch (err) {
      next(err);
    }
  },
};
