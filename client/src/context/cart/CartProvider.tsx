import React, { useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import type { Product } from "../../types/products.types";
import {
  addProductToCartRequest,
  clearCartRequest,
  getCartRequest,
  updateCartRequest,
} from "../../../api/cart/cart";
interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Product[]>([]);

  const getCart = async () => {
    const res = await getCartRequest();
    const cartData = await res.json();

    setCart(cartData);
  };

  const addToCart = async (product: Product) => {
    const productInCartIndex = cart.findIndex(
      (p) => p.product_id === product.product_id
    );

    const newCart = [...cart];
    if (productInCartIndex >= 0) {
      newCart[productInCartIndex].quantity++;
      setCart(newCart);
      await updateCartRequest({
        product_id: newCart[productInCartIndex].product_id,
        quantity: newCart[productInCartIndex].quantity,
      });
    } else {
      setCart([...newCart, { ...product, quantity: 1 }]);

      await addProductToCartRequest({
        product_id: product.product_id,
        quantity: 1,
      });
    }
  };

  const removeFromCart = async (productId: number) => {
    const productInCartIndex = cart.findIndex(
      (p) => p.product_id === productId
    );

    if (productInCartIndex >= 0) {
      const newCart = [...cart];
      await updateCartRequest({
        product_id: newCart[productInCartIndex].product_id,
        quantity: newCart[productInCartIndex].quantity - 1,
      });
      if (newCart[productInCartIndex].quantity > 1) {
        newCart[productInCartIndex].quantity--;
        setCart(newCart);
      } else {
        setCart(cart.filter((p) => p.product_id !== productId));
      }
    }
  };

  const clearCart = async () => {
    setCart([]);
    await clearCartRequest();
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
