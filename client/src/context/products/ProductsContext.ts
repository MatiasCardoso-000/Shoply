import { createContext } from 'react';

interface Product {
  id: number;
  imageUrl: string;
  title: string;
  price: number;
}

interface ProductsContextType {
  products: Product[];
}

export const ProductsContext = createContext<ProductsContextType | undefined>(undefined);
