export const BASE_URL = "http://localhost:3000/api";

const refreshToken = async () => {
  try {
    const response = await fetch(`${BASE_URL}/auth/refresh-token`, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      localStorage.removeItem("accessToken");
      throw new Error(
        "La sesión ha expirado. Por favor, inicia sesión de nuevo."
      );
    }

    const { accessToken } = await response.json();

    localStorage.setItem("accessToken", accessToken);
    return accessToken;
  } catch (error) {
    localStorage.removeItem("accessToken");
    throw error;
  }
};

export const apiFetch = async (url:string, options:RequestInit = {}) => {
  const accessToken = localStorage.getItem("accessToken");

  //cabeceras por defecto
  const headers: Record<string,string> = {
    "Content-type": "application/json",
    ...options.headers as Record<string,string>,
  };

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  options.headers = headers;

  //Primera peticion
  let response = await fetch(`${BASE_URL}${url}`, options);

  //Si falla por token expirado intentamos refrescar

  if (response.status === 401) {
    console.log("Access token expirado. Intentando refrescar...");
    try {
      const newAccessToken = await refreshToken();
      // Actualizamos la cabecera de la petición original con el nuevo token.
      if (options.headers) {
        options.headers["Authorization"] = `Bearer ${newAccessToken}`;
      }

      response = await fetch(`${BASE_URL}${url}`, options);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  return response;
};
