import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../models/User.js";

const register = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    res.status(201).json({ newUser });
  } catch (error) {
    console.error(error);
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

    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "7d",
      }
    );
    const accessToken = jwt.sign(
      { id: user.id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15m",
      }
    );

    res.cookie("refreshToken", refreshToken);

    res.json({
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Error en el servidor");
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

export const UserControllers = {
  register,
  login,
  updateUser,
  deleteUser,
  getUser,
};
