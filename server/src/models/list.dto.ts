
export interface ProductItemDto {
  productId: string;
  quantity_sold: number;
  isBought: boolean;
  totalProduct: number;
}

export interface CreateListDto {
  products: ProductItemDto[];
  totalGeneral: number;
}
