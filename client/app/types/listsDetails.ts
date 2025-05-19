export interface ProductItem {
  productId: string;       
  quantity_sold: number;    
  totalProduct: number;   
}

export interface AddProductToList {
  id: string;              
  products: ProductItem[];
  totalGeneral: number;  
}

export interface ListProductDetail {
  id: string;
  quantity_sold: number;
  totalProduct: number;
  isBought: boolean
  product: {
    id:string;
    name: string;
    image: string;
  };
}


export interface ListResponse {
  id: string;
  total_sold: number;               
  listXProduct: ListProductDetail[];
  totalProducts: number;
  totalBought: number;
}
