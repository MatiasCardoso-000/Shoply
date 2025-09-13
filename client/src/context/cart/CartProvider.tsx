import React, { useEffect, useState } from "react";
import { CartContext, type CartItem } from "./CartContext";
import type { Product } from "../../types/products.types";
import {
  addProductToCartRequest,
  getCartRequest,
  updateCartRequest,
} from "../../../api/cart/cart";
interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const getCart = async () => {
    const res = await getCartRequest();
    const cartData = await res.json();
    
    setCart(cartData);
  };

  const addToCart = async (product: Product) => {
    const productInCartIndex = cart.findIndex((p) => p.id === product.id);

    const newCart = [...cart];
    if (productInCartIndex >= 0) {
      newCart[productInCartIndex].quantity++;
      setCart(newCart);
      await updateCartRequest({
        productId: newCart[productInCartIndex].id,
        quantity: newCart[productInCartIndex].quantity,
      });
    } else {
      setCart([...newCart, { ...product, quantity: 1 }]);
      console.log(product.id);
      
      await addProductToCartRequest(product.id, 1);
    }
  };

  const removeFromCart = async(productId: number) => {
    const productInCartIndex = cart.findIndex((p) => p.id === productId);

    if (productInCartIndex >= 0) {
      const newCart = [...cart];
      await updateCartRequest({
        productId: newCart[productInCartIndex].id,
        quantity: newCart[productInCartIndex].quantity - 1,
      });
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

  useEffect(() => {
    getCart();
  }, []);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
