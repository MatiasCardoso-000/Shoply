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

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const getProducts = async () => {
    const productsData = await getProductsRequest();
    setProducts(productsData);
  };

  useEffect(()=> {
    getProducts()
  },[])



  return (
    <ProductsContext.Provider value={{ products,loading,error }}>
      {children}
    </ProductsContext.Provider>
  );
};
