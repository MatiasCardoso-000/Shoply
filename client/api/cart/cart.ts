import { apiFetch } from "../auth/api";

export const addProductToCartRequest = async (id:number, quantity:number) => {


  return await apiFetch(`/cart`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({id, quantity}),
  });
};

export const updateCartRequest = async ({productId, quantity}) => {
  return await apiFetch("/cart", {
    method: "PUT",
    credentials: "include",
    body: JSON.stringify({ productId, quantity }),
  });
};

export const getCartRequest = async () => {
  return await apiFetch(`/cart`, {
    method: "GET",
    credentials: "include",
  });
};
