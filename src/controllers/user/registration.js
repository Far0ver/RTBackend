import User from "../../models/user.js";
import bcrypt from "bcrypt"; // Импортируем bcrypt для шифрования паролей
import createNewToken from "../../helpers/createNewToken.js";

export async function register(req, res) {
  const { email, password } = req.body;

  try {
    // Проверка на существование пользователя с таким email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Пользователь с таким email уже существует" });
    }

    // Шифрование пароля перед сохранением в базу данных
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword,
    });

    try {
      await user.save();
    } catch {
      return res
        .status(666)
        .json({ message: "Ошибка сохранения пользователя" });
    }

    const token = await createNewToken(user._id);

    await user.updateOne({ $push: { tokens: token } });
    res.cookie("token", token, { maxAge: 2592000000, httpOnly: true });
    res.status(200).json({
      success: true,
      data: {
        userId: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Ошибка при регистрации" });
  }
}
