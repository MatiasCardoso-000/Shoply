import type { User } from "../../src/types/user.types";
import { BASE_URL } from "./api";

export const registerRequest = async (user: User) => {
  return await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(user),
  });
};

export const loginRequest = async (user: User) => {
  return await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(user),
  });
};

export const logoutRequest = async () => {
  const response = await fetch("/api/auth/logout", {
    method: "POST",
  });
  return response.json();
};

export const verifyTokenRequest = async () => {
  return await fetch(`${BASE_URL}/auth/refresh-token`, {
    method: "POST",
    credentials: "include",
  });
};
