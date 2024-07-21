import User from "../../models/user.js";
import bcrypt from "bcrypt";

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

    res.status(200).json({
      success: true,
      data: {
        userId: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(400).json({ message: "пизда логину" });
  }
}
