import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  CreatedAt,
  UpdatedAt,
  HasMany,
} from "sequelize-typescript";
import { List } from "./list.model";
import { ListXProduct } from "./listXProduct.model";

@Table({ tableName: "Product" })
export class Product extends Model<Product> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  id!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  image!: string;

  @Column({ type: DataType.DECIMAL, allowNull: false })
  price!: number;

  @Column({ type: DataType.STRING, allowNull: false })
  description!: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  stock!: number;

  @HasMany(() => ListXProduct)
  historiesXProduct!: ListXProduct[];

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;
}
