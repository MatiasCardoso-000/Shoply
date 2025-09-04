import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../models/User.js";
import { RevokedTokensModel } from "../../models/RevokedTokens.js";
import { generateTokens } from "../../utils/generateTokens.js";

const register = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      return res.status(409).json({ message: "Email is already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    const { refreshToken, accessToken } = generateTokens({ id: newUser.id });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const registerUser = {
      username: newUser.username,
      email: newUser.email,
      user_id: newUser.id,
    };

    res.status(201).json({ registerUser, accessToken });
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json({ message: "Server error while creating user" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const { refreshToken, accessToken } = generateTokens({ id: user.id });

    res.cookie("refreshToken", refreshToken);

    res.json({
      accessToken: accessToken,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json("Error en el servidor");
  }
};

const updateUser = async (req, res) => {
  const { id } = req.user;
  const { email, username, password } = req.body;

  const [numberOfAffectedRows] = await User.update(
    {
      id,
      email,
      username,
      password,
    },
    {
      where: {
        id: id,
      },
    }
  );

  if (numberOfAffectedRows === 0) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  res.json({ message: "Usuario actualizado correctamente" });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  const numberOfRowsDeleted = await User.destroy({
    where: {
      id: id,
    },
  });

  if (numberOfRowsDeleted === 0) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  res.status(204).send();
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      // Si es null, enviamos un error 404 (No Encontrado)
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    const isRevoked = await RevokedTokensModel.findOne({
      where: { token: refreshToken },
    });

    if (isRevoked) {
      return res.status(400).json({ message: "Error al eliminar el token" });
    }

    await RevokedTokensModel.create({ token: refreshToken });

    res.clearCookie("refreshToken");
    return res.status(200).json({ message: "User logged out" });
  } catch (error) {
    console.error("Error en el logout:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json({
        message: "Acceso denegado. No se proveyó un token de refresco.",
      });
    }

    //verificar que la sesion se haya cerrado
    const isRevoked = await RevokedTokensModel.findByPk(refreshToken);

    //Si el token esta revocado la sesion se cerro
    if (isRevoked) {
      return res.status(403).json({
        message: "Token inválido o sesión cerrada.",
      });
    }
    //Comprabamos que exista la clave secreta del refreshToken
    if (!process.env.REFRESH_TOKEN_SECRET) {
      throw new Error("Secret key is not defined");
    }

    //VERIFICAMOS  REFRESH_TOKEN_SECRET
    const decodedPayload = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    //Buscamos el usuario existe en la base de datos
    const user = await User.findByPk(decodedPayload.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //VERIFICAMOS  ACCESS_TOKEN_SECRET

    if (!process.env.ACCESS_TOKEN_SECRET) {
      throw new Error(
        "La clave secreta para el Access Token no está definida."
      );
    }

    //Creamos un nuevo accessToken
    const newAccessToken = jwt.sign(
      { id: decodedPayload.id }, //id del usuario verificado
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15m",
      }
    );

    //Enviamos el nuevo accessToken al cliente
    return res.json({ accesToken: newAccessToken });
  } catch (error) {
    console.error("Error al refrescar el token:", error);
    return res
      .status(403)
      .json({ message: "Token de refresco inválido o expirado." });
  }
};

export const UserControllers = {
  register,
  login,
  updateUser,
  deleteUser,
  getUser,
  logout,
  refreshToken,
};
