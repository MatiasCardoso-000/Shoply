import React, {  useState } from "react";
import { CartContext, type CartItem } from "./CartContext";
import type { Product } from "../../types/products.types";

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    const productInCartIndex = cart.findIndex((p) => p.id === product.id);

    if (productInCartIndex >= 0) {
      const newCart = [...cart];
      newCart[productInCartIndex].quantity++;
      setCart(newCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: number) => {
    const productInCartIndex = cart.findIndex((p) => p.id === productId);

    if (productInCartIndex >= 0) {
      const newCart = [...cart];
      if (newCart[productInCartIndex].quantity > 1) {
        newCart[productInCartIndex].quantity--;
        setCart(newCart);
      } else {
        setCart(newCart.filter((p) => p.id !== productId));
      }
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
