"use client";

import { useProducts } from "../../hooks/useProducts";
import { Product } from "../../types/product";
import ProductCard from "../Cards/ProductCard";

export default function ProductContainer() {
  const {
    productQuery: { data: products, isLoading, error },
  } = useProducts();

  return (
    <main>
      {isLoading && <div>Cargando...</div>}
      {error && <div>Error: {error.message}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mx-25 my-24">
        {products?.map((product: Product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </main>
  );
}
