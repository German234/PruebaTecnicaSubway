import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  ForeignKey,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
} from "sequelize-typescript";
import { Optional } from "sequelize";
import { Product } from "./product.model";
import { List } from "./list.model";

interface ListXProductAttributes {
  id: string;
  productId: string;
  listId: string;
  quantity_sold: number;
  isBought: boolean;
  totalProduct: number;
  createdAt: Date;
  updatedAt: Date;
}
interface ListXProductCreationAttributes
  extends Optional<
    ListXProductAttributes,
    "id" | "createdAt" | "updatedAt"
  > {}

@Table({ tableName: "ListDetails" })
export class ListXProduct
  extends Model<ListXProductAttributes, ListXProductCreationAttributes>
  implements ListXProductAttributes
{
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  id!: string;

  @ForeignKey(() => Product)
  @Column({ type: DataType.UUID, allowNull: false })
  productId!: string;
  @BelongsTo(() => Product) product!: Product;

  @ForeignKey(() => List)
  @Column({ type: DataType.UUID, allowNull: false })
  listId!: string;
  @BelongsTo(() => List) list!: List;

  @Column({ type: DataType.INTEGER, allowNull: false })
  quantity_sold!: number;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  totalProduct!: number;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  isBought!: boolean

  @CreatedAt
  createdAt!: Date;
  @UpdatedAt
  updatedAt!: Date;
}
