import jwt  from "jsonwebtoken";

export const generateTokens = (payload ) => {
  if (!process.env.REFRESH_TOKEN_SECRET || !process.env.ACCESS_TOKEN_SECRET) {
    throw new Error( "Las claves secretas para JWT no están definidas en las variables de entorno.");
  }

  const refreshToken = jwt.sign( payload,process.env.REFRESH_TOKEN_SECRET, { 
    expiresIn: "1d",
  });

  const accessToken = jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,  {
    expiresIn: "15",
  });

  return {
    refreshToken,
    accessToken,
  };
};
