import User from "../models/user.js";
import { isTokenExpired } from "../helpers/removeNoValidTokens.js";
import createNewToken from "../helpers/createNewToken.js";

async function updateTokenMiddleware(req, res, next) {
  try {
    const userId = req.user.id; // Добавьте проверку аутентификации

    const receivedToken = req.token;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({ message: `Пользователь не найден` });
    }

    const isTokenExists = user.tokens.includes(receivedToken);

    if (isTokenExists) {
      const isExpired = await isTokenExpired(receivedToken);
      if (isExpired) {
        await user.updateOne({ $pull: { tokens: receivedToken } });
        return res.status(401).json({ message: `Токен истек` });
      }

      const newToken = await createNewToken(userId);

      await user.updateOne({ $pull: { tokens: receivedToken } });
      await user.updateOne({ $push: { tokens: newToken } });
      res.cookie("token", newToken, { maxAge: 2592000000, httpOnly: true });

      next();
    } else {
      return res.status(401).json({ message: `Токен не найден` });
    }
  } catch (error) {
    return res.status(500).json({ message: "Ошибка обновления токена" });
  }
}

export default updateTokenMiddleware;
