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
import { Optional } from "sequelize";
import { ListXProduct } from "./listXProduct.model";

interface ListAttributes {
  id: string;
  name: string;
  total_sold: number;
  totalProducts?: number;
  totalBought?: number;
  createdAt: Date;
  updatedAt: Date;
}

interface ListCreationAttributes
  extends Optional<ListAttributes, "id" | "createdAt" | "updatedAt"> {}

@Table({ tableName: "List" })
export class List
  extends Model<ListAttributes, ListCreationAttributes>
  implements ListAttributes
{
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  id!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  total_sold!: number;

  @HasMany(() => ListXProduct)
  listXProduct!: ListXProduct[];

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;
}
