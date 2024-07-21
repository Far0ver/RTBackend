import jwt from "jsonwebtoken";
import key from "../config/key.js";

async function authMiddleware(req, res, next) {
  try {
    const token = req.cookies.token;
    req.token = token;
    if (!token) {
      return res.status(401).json({ message: "Необходимо авторизоваться" });
    }

    // Декодируем токен
    const decoded = jwt.decode(token, key.jwt_key);

    // Устанавливаем ID пользователя в объект запроса
    req.user = { id: decoded.userId };

    // Передаем управление следующему middleware или обработчику маршрута
    next();
  } catch (error) {
    console.error("Ошибка аутентификации:", error);
    return res.status(401).json({ message: "Неверный токен" });
  }
}

export default authMiddleware;
