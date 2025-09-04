import { createContext } from 'react';
import type { Product } from '../../types/products.types';

interface ProductsContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export const ProductsContext = createContext<ProductsContextType | undefined>(undefined);
