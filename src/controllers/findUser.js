import User from "../models/user.js";
import generateAccessToken from "../helpers/jwt.js";

export async function findUser(req, res) {
  try {
    // var cert = "хуесос ты ебаный, я твои рты ебал"; // get public key
    // jwt.verify(token, cert, function (err, decoded) {});
    const { userId } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    const token = generateAccessToken(user._id, user.email);

    res.status(200).json({
      success: true,
      data: {
        userId: user._id,
        email: user.email,
        token: token,
      },
    });
  } catch (error) {
    res.status(400).json({ message: "Ошибка при поиске пользователя" });
  }
}
