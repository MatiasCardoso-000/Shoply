import jwt from "jsonwebtoken";

export const validateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json("No token provided");
  }

  const token = authHeader.split(" ")[1];
 
  
  if (!process.env.ACCESS_TOKEN_SECRET) {
    return res.status(403).json("Invalid token");
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    
    if (err) {
      return res.status(403).json("Invalid token");
    }
    req.user = decoded;
  });
  next();
};
