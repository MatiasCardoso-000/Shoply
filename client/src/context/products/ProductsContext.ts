import { createContext } from 'react';
import type { Product } from '../../types/products.types';

interface ProductsContextType {
  products: Product[];
  getProducts : (maxPrice?:number,category?:string) => Promise<Product[]>;
}

export const ProductsContext = createContext<ProductsContextType | undefined>(undefined);
