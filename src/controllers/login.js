import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import key from "../config/key.js";

const generateAccessToken = (id, email) => {
  const payload = {
    userId: id,
    email: email,
  };
  return jwt.sign(payload, key.jwt_key, { expiresIn: "24h" });
};

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: `Пидор ${email} не обнаружен` });
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: `Введен неверный пароль` });
    }

    const token = generateAccessToken(user._id, user.email);

    res.status(200).json({
      success: true,
      data: {
        userId: user.id,
        email: user.email,
        token: token,
      },
    });
  } catch (error) {
    res.status(400).json({ message: "пизда логину" });
  }
}
