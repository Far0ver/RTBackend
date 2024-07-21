import User from "../../models/user.js";

export async function findUser(req, res) {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    res.status(200).json({
      success: true,
      data: {
        userId: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(400).json({ message: "Ошибка при поиске пользователя" });
  }
}
