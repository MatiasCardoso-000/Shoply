import React, { useEffect, useState } from "react";
import { ProductsContext } from "./ProductsContext";
import { getProductsRequest } from "../../../api/products/products";
import type { Product } from "../../types/products.types";
interface ProductsProviderProps {
  children: React.ReactNode;
}

export const ProductsProvider: React.FC<ProductsProviderProps> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  

  const getProducts = async (
    maxPrice?: number,
    category?: string
  ): Promise<Product[]> => {
    const productsData = await getProductsRequest(maxPrice, category);

    setProducts(productsData);
    return productsData;
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, getProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};
