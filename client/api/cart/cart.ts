import { apiFetch } from "../auth/api";

export const addProductToCartRequest = async ({
  product_id,
  quantity,
}: {
  product_id: number;
  quantity: number;
}) => {
  console.log(product_id, quantity);

  return await apiFetch(`/cart`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ product_id, quantity }),
  });
};

export const updateCartRequest = async ({
  product_id,
  quantity,
}: {
  product_id: number;
  quantity: number;
}) => {
  return await apiFetch("/cart", {
    method: "PUT",
    credentials: "include",
    body: JSON.stringify({ product_id, quantity }),
  });
};

export const getCartRequest = async () => {
  return await apiFetch(`/cart`, {
    method: "GET",
    credentials: "include",
  });
};

export const clearCartRequest = () => {
  return apiFetch(`/cart`, {
    method: "DELETE",
    credentials: "include",
  });
};
