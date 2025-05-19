import { NextFunction, Request, Response } from "express";
import { Transaction } from "sequelize";
import { List } from "../models/list.model";
import { Product } from "../models/product.model";
import { ListXProduct } from "../models/listXProduct.model";
import { CreateListDto } from "../models/list.dto";

export const ListxProductController = {
  async create(
    req: Request<{ id: string }, any, CreateListDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { products, totalGeneral } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      res.status(400).json({ error: "'products' debe ser un array no vacío." });
      return;
    }
    if (typeof totalGeneral !== "number" || isNaN(totalGeneral)) {
      res
        .status(400)
        .json({ error: "'totalGeneral' es obligatorio y debe ser número." });
      return;
    }

    const t: Transaction = await List.sequelize!.transaction();
    try {
      

      const ids = products.map((p) => p.productId);
      const dbProducts = await Product.findAll({
        where: { id: ids },
        transaction: t,
      });
      const map = new Map(dbProducts.map((p) => [p.id, p]));

      for (const item of products) {
        const { productId, quantity_sold, totalProduct } = item;

        if (
          typeof productId !== "string" ||
          typeof quantity_sold !== "number" ||
          isNaN(quantity_sold) ||
          typeof totalProduct !== "number" ||
          isNaN(totalProduct)
        ) {
          await t.rollback();
          res.status(400).json({
            error:
              "Faltan campos requeridos o tipos incorrectos en el producto.",
          });
          return;
        }
        const prod = map.get(productId);
        if (!prod) {
          await t.rollback();
          res
            .status(404)
            .json({ error: `Producto no existe.` });
          return;
        }
        if (prod.stock < quantity_sold) {
          await t.rollback();
          res.status(400).json({
            error: `Stock insuficiente para el producto ${prod.name}.`,
          });
          return;
        }

        await prod.decrement("stock", {
          by: quantity_sold,
          transaction: t,
        });
        await ListXProduct.create(
          {
            listId: req.params.id,
            productId,
            quantity_sold,
            isBought: false,
            totalProduct,
          },
          { transaction: t }
        );
        await List.increment(
          { total_sold: totalProduct },
          { where: { id: req.params.id }, transaction: t }
        );
      }

      await t.commit();
      res.status(201).json({
        message: "Productos agregados correctamente.",
      });
      return;
    } catch (err) {
      await t.rollback();
      next(err);
    }
  },

  async getAll(
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const listDetails = await ListXProduct.findAll({
        attributes: { exclude: ["productId", "listId"] },
        include: [
          {
            model: Product,
            attributes: ["name", "image", "price", "description", "stock"],
          },
          { model: List, attributes: ["total_sold"] },
        ],
        order: [["createdAt", "DESC"]],
      });
      if (listDetails.length === 0) {
        res
          .status(404)
          .json({ error: "No existe el registro." });
        return;
      }
      res.json(listDetails);
    } catch (err) {
      next(err);
    }
  },

  async delete(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;
    const t: Transaction = await ListXProduct.sequelize!.transaction();
    try {
      const listXProduct = await ListXProduct.findByPk(id, { transaction: t });
      if (!listXProduct) {
        await t.rollback();
        res.status(404).json({ error: "Registro no encontrado." });
        return;
      }

      const product = await Product.findByPk(listXProduct.productId, { transaction: t });
      if (product && typeof listXProduct.quantity_sold === "number") {
        await product.increment("stock", {
          by: listXProduct.quantity_sold,
          transaction: t,
        });
      }

      await listXProduct.destroy({ transaction: t });
      await t.commit();
      res.json({ message: "Registro eliminado correctamente." });
    } catch (err) {
      await t.rollback();
      next(err);
    }
  },
 async setBought(
  req: Request<{}, { ids: string[] }>,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { ids } = req.body;

  if (!Array.isArray(ids) || ids.length === 0) {
    res.status(400).json({ error: "'ids' debe ser un array de IDs no vacío." });
    return;
  }

  try {
    const [updatedCount] = await ListXProduct.update(
      { isBought: true },
      { where: { id: ids } }
    );

    if (updatedCount === 0) {
      res.status(404).json({ error: "No se encontraron registros para esos productos" });
      return;
    }

    res.json({
      message: `${updatedCount} registro(s) marcado(s) como comprados.`
    });
  } catch (err) {
    next(err);
  }
},

async deleteByListIdAndProductID(
    req: Request<{ listId: string; productId: string }>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { listId, productId } = req.params;
    const t: Transaction = await List.sequelize!.transaction();

    try {
      const detail = await ListXProduct.findOne({
        where: { listId, productId },
        transaction: t,
      });

      if (!detail) {
        await t.rollback();
        res.status(404).json({ error: "No se encontró el registro para eliminar." });
        return;
      }

      const { quantity_sold, totalProduct } = detail;

      const prod = await Product.findByPk(productId, { transaction: t });
      if (prod) {
        await prod.increment("stock", {
          by: quantity_sold,
          transaction: t,
        });
      }

      await List.decrement("total_sold", {
        by: totalProduct,
        where: { id: listId },
        transaction: t,
      });

      await detail.destroy({ transaction: t });

      await t.commit();
      res.json({ message: "Registro eliminado correctamente y stock/total actualizados." });
    } catch (err) {
      await t.rollback();
      next(err);
    }
  },
};
