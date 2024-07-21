import User from "../../models/user.js";
import bcrypt from "bcrypt";

export async function updateUser(req, res) {
  try {
    const userId = req.user.id;
    const { password, newEmail, newPassword } = req.body;

    const user = await User.findById(userId);
    const email = user.email;

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    if (password) {
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: "Неверный текущий пароль" });
      }
    }

    if (newEmail) {
      const existingUser = await User.findOne({ email: newEmail });
      if (newEmail === email) {
        return res.status(400).json({ message: "Email идентичен старому" });
      }

      if (existingUser) {
        return res.status(400).json({ message: "Этот email уже используется" });
      }
      user.email = newEmail;
    }

    if (newPassword) {
      if (newPassword === password) {
        return res.status(400).json({ message: "Пароль идентичен старому" });
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
    }

    await user.save();

    res.status(200).json({
      success: true,
      data: {
        userId: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Ошибка обновления пользователя(проебали)" });
  }
}
