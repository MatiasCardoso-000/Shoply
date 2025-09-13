import jwt from "jsonwebtoken";

export const validateToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json("No token provided");
    }

    const token = authHeader.split(" ")[1];

    // console.log(token);
    if (!process.env.ACCESS_TOKEN_SECRET) {
      throw new Error(
        "La clave secreta para el Access Token no está definida."
      );
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.user = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
