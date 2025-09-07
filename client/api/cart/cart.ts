import type { CartItem } from "../../src/context/cart/CartContext";
import { BASE_URL } from "../auth/api";

export const addProductToCartRequest = async (cart: CartItem[]) => {
  // console.log(...cart);

  return await fetch(`${BASE_URL}/cart`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cart),
  });
};

export const getCartRequest = async () => {
  return await fetch(`${BASE_URL}/cart`, {
    method: "GET",
    credentials: "include",
  });
};
