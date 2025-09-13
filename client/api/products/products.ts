import { apiFetch, BASE_URL } from "../auth/api";
import { type Product } from "../../src/types/products.types";

export const getProductsRequest = async (): Promise<Product[]> => {
  const response = await fetch(`${BASE_URL}/products`, {
    method: "GET",
    credentials: "include",
  });
  return response.json();
};

export const getProductRequest = async (id: string): Promise<Product> => {
  const response = await apiFetch(`/products/${id}`);
  return response.json();
};

export type ProductToSave = Omit<Product, "id">;

export const createProduct = async (
  product: ProductToSave
): Promise<Product> => {
  const response = await apiFetch("/products", {
    method: "POST",
    body: JSON.stringify(product),
  });
  return response.json();
};

export const updateProduct = async (
  id: number,
  product: ProductToSave
): Promise<Product> => {
  const response = await apiFetch(`/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(product),
  });
  return response.json();
};

export const deleteProduct = async (id: number): Promise<void> => {
  await apiFetch(`/products/${id}`, {
    method: "DELETE",
  });
};
