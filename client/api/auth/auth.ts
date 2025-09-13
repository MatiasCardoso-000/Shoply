import type { User } from "../../src/types/user.types";
import { apiFetch, BASE_URL } from "./api";

export const registerRequest = async (user: User) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(user),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const loginRequest = async (user: User) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(user),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const logoutRequest = async () => {
  const response = await fetch("/api/auth/logout", {
    method: "POST",
  });
  return response.json();
};

export const verifyTokenRequest = async () => {
  try {
    return await apiFetch(`/auth/refresh-token`, {
      method: "POST",
      credentials: "include",
    });
  } catch (error) {
    console.log(error);
  }
};
