import React from 'react';
import { ProductsContext } from './ProductsContext';

const products = [
  {
    id: 1,
    imageUrl: 'images/Fjallraven-FoldsackNo.1Backpack-Fits-15-Laptops.png',
    title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    price: 1000,
  },
  {
    id: 2,
    imageUrl: 'images/Mens-Casual-Premium-Slim-Fit-T-Shirts.png',
    title: 'Mens Casual Premium Slim Fit T-Shirts ',
    price: 2000,
  },
  {
    id: 3,
    imageUrl: 'images/Mens-Cotton-Jacket.png',
    title: 'Mens Cotton Jacket',
    price: 3000,
  },
  {
    id: 4,
    imageUrl: 'images/Jean-Jacket.png',
    title: 'Mens Casual Slim Fit',
    price: 4000,
  },
  {
    id: 5,
    imageUrl: "images/John-Hardy-Womens-Legends-Naga-Gold-&-Silver-Dragon-Station-Chain-Bracelet.png",
    title: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    price: 5000,
  },
];

interface ProductsProviderProps {
  children: React.ReactNode;
}

export const ProductsProvider: React.FC<ProductsProviderProps> = ({ children }) => {
  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};
